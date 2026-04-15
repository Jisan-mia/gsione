import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { getRepositoryPath, githubRequest } from "./github-api.mjs";
import { getSectionById } from "./content-workflow-config.mjs";

const repositoryPath = getRepositoryPath();
const rootDirectory = process.cwd();
const statusMarker = "<!-- content-submission-status -->";
const eventPath = process.env.GITHUB_EVENT_PATH;

if (!eventPath || !fs.existsSync(eventPath)) {
  throw new Error("GITHUB_EVENT_PATH is not available.");
}

const eventPayload = JSON.parse(fs.readFileSync(eventPath, "utf8"));
const issue = eventPayload.issue;
const defaultBranch = eventPayload.repository?.default_branch || "main";

if (!issue || issue.pull_request) {
  console.log("No issue submission payload found; skipping.");
  process.exit(0);
}

function normalizeHeading(value) {
  return value.trim().toLowerCase();
}

function unwrapOptionalValue(value) {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim();
  if (!normalized || normalized === "_No response_") {
    return undefined;
  }

  const fencedMatch = normalized.match(/^```[a-zA-Z0-9_-]*\n([\s\S]*?)\n```$/);
  return fencedMatch ? fencedMatch[1].trim() : normalized;
}

function parseIssueForm(body) {
  const fields = new Map();
  const lines = body.split(/\r?\n/);
  let currentHeading = null;
  let currentLines = [];
  let inCodeFence = false;

  const flush = () => {
    if (!currentHeading) {
      return;
    }

    fields.set(normalizeHeading(currentHeading), unwrapOptionalValue(currentLines.join("\n")));
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      inCodeFence = !inCodeFence;
      if (currentHeading) {
        currentLines.push(line);
      }
      continue;
    }

    if (!inCodeFence && line.startsWith("### ")) {
      flush();
      currentHeading = line.slice(4);
      currentLines = [];
      continue;
    }

    if (currentHeading) {
      currentLines.push(line);
    }
  }

  flush();

  return fields;
}

function getField(fields, name, { required = true } = {}) {
  const value = fields.get(normalizeHeading(name));
  if (!value && required) {
    throw new Error(`The issue form is missing the "${name}" response.`);
  }

  return value;
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function normalizeBoolean(value) {
  return String(value).trim().toLowerCase() === "yes";
}

function splitList(value) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function isValidDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function stringifyScalar(value) {
  return JSON.stringify(String(value));
}

function renderArrayField(name, values) {
  return `${name}:\n${values.map((value) => `  - ${stringifyScalar(value)}`).join("\n")}`;
}

function renderFrontmatter(entries) {
  return entries
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return renderArrayField(key, value);
      }

      if (typeof value === "boolean") {
        return `${key}: ${value}`;
      }

      return `${key}: ${stringifyScalar(value)}`;
    })
    .join("\n");
}

function buildArticleSubmission(fields) {
  const title = getField(fields, "Article title");
  const existingSlug = getField(fields, "Existing article slug (optional)", {
    required: false,
  });
  const publishedAt =
    getField(fields, "Publish date (optional)", { required: false }) ||
    issue.created_at.slice(0, 10);

  if (publishedAt && !isValidDateString(publishedAt)) {
    throw new Error('Article "Publish date (optional)" must use the YYYY-MM-DD format.');
  }

  return {
    section: getSectionById("articles"),
    title,
    slug: existingSlug ? slugify(existingSlug) : slugify(title),
    isUpdate: Boolean(existingSlug),
    body: getField(fields, "Article body"),
    fileEntries: [
      ["title", title],
      ["excerpt", getField(fields, "Article excerpt")],
      ["category", getField(fields, "Category")],
      ["author", getField(fields, "Author name")],
      ["authorRole", getField(fields, "Author role")],
      ["publishedAt", publishedAt],
      ["sourceLabel", getField(fields, "Source label")],
      ["sourceUrl", getField(fields, "Source URL (optional)", { required: false })],
      ["featured", normalizeBoolean(getField(fields, "Feature this article?"))],
      ["tags", splitList(getField(fields, "Tags"))],
    ],
  };
}

function buildTrainingSubmission(fields) {
  const title = getField(fields, "Programme title");
  const existingSlug = getField(fields, "Existing programme slug (optional)", {
    required: false,
  });
  const publishedAt =
    getField(fields, "Publish date (optional)", { required: false }) ||
    issue.created_at.slice(0, 10);

  if (publishedAt && !isValidDateString(publishedAt)) {
    throw new Error('Training "Publish date (optional)" must use the YYYY-MM-DD format.');
  }

  return {
    section: getSectionById("training"),
    title,
    slug: existingSlug ? slugify(existingSlug) : slugify(title),
    isUpdate: Boolean(existingSlug),
    body: getField(fields, "Programme body"),
    fileEntries: [
      ["title", title],
      ["summary", getField(fields, "Summary")],
      ["level", getField(fields, "Level")],
      ["duration", getField(fields, "Duration")],
      ["format", getField(fields, "Format")],
      ["publishedAt", publishedAt],
      ["featured", normalizeBoolean(getField(fields, "Feature this programme?"))],
      ["audience", splitList(getField(fields, "Audience"))],
      ["focusAreas", splitList(getField(fields, "Focus areas"))],
      ["outcomes", splitList(getField(fields, "Outcomes"))],
    ],
  };
}

function buildSubmission(fields) {
  if (fields.has("article title")) {
    return buildArticleSubmission(fields);
  }

  if (fields.has("programme title")) {
    return buildTrainingSubmission(fields);
  }

  return null;
}

function ensureExistingTarget(filePath, isUpdate) {
  if (isUpdate && !fs.existsSync(filePath)) {
    throw new Error(`The requested file does not exist yet: ${path.relative(rootDirectory, filePath)}`);
  }
}

function resolveFilePath(submission) {
  const filePath = path.join(rootDirectory, submission.section.directory, `${submission.slug}.md`);

  if (!submission.isUpdate && fs.existsSync(filePath)) {
    return path.join(
      rootDirectory,
      submission.section.directory,
      `${submission.slug}-${issue.number}.md`,
    );
  }

  return filePath;
}

function renderMarkdownFile(submission) {
  const frontmatter = renderFrontmatter(submission.fileEntries);
  return `---\n${frontmatter}\n---\n\n${submission.body.trim()}\n`;
}

function runGit(command) {
  execSync(command, {
    cwd: rootDirectory,
    stdio: "inherit",
  });
}

function hasStagedChanges() {
  try {
    execSync("git diff --cached --quiet", { cwd: rootDirectory, stdio: "ignore" });
    return false;
  } catch {
    return true;
  }
}

async function upsertIssueComment(body) {
  const comments = await githubRequest(`${repositoryPath}/issues/${issue.number}/comments`);
  const existing = comments.find((comment) => comment.body?.includes(statusMarker));

  if (existing) {
    await githubRequest(`${repositoryPath}/issues/comments/${existing.id}`, {
      method: "PATCH",
      body: { body: `${statusMarker}\n${body}` },
    });
    return;
  }

  await githubRequest(`${repositoryPath}/issues/${issue.number}/comments`, {
    method: "POST",
    body: { body: `${statusMarker}\n${body}` },
  });
}

async function findOpenPullRequest(branchName) {
  const [owner] = process.env.GITHUB_REPOSITORY.split("/");
  const result = await githubRequest(
    `${repositoryPath}/pulls?state=open&head=${owner}:${encodeURIComponent(branchName)}`,
  );

  return Array.isArray(result) ? result[0] : null;
}

function getPullRequestBody(submission, relativePath) {
  if (submission.isUpdate) {
    return `## Summary
- Section: ${submission.section.id}
- Content type: update to existing Markdown content
- Update type: routine refresh
- Intended audience: internal reviewers, public readers
- Publication intent: merge when approved

## Update checklist
- [x] I updated an existing Markdown file under \`${submission.section.directory}/\`
- [x] I reviewed the frontmatter and body for consistency with the current section requirements
- [ ] I noted whether this should also carry the manual \`type:correction\` label
- [ ] I described any reviewer follow-up needed below

## Reviewer notes
- Reason for the update: Captured from GitHub issue #${issue.number}
- Editorial considerations:
- Sources or supporting links:
- Requested publication timing:
- Generated file: \`${relativePath}\``;
  }

  return `## Summary
- Section: ${submission.section.id}
- Content type: new Markdown content
- Intended audience: internal reviewers, public readers
- Publication intent: publish immediately after approval

## Submission checklist
- [x] I added Markdown content under \`${submission.section.directory}/\`
- [x] I used the required frontmatter for this section
- [x] I confirmed the title, summary/excerpt, and metadata are review-ready
- [ ] I identified any factual or editorial sensitivities for maintainers below

## Reviewer notes
- Editorial considerations:
- Sources or supporting links:
- Requested publication timing:
- Follow-up actions after merge:
- Generated file: \`${relativePath}\`
- Intake issue: #${issue.number}`;
}

async function createOrUpdatePullRequest(
  branchName,
  submission,
  relativePath,
  existingPullRequest,
) {
  const titlePrefix = submission.isUpdate ? "Update" : "Submit";
  const title = `${titlePrefix} ${submission.section.id}: ${submission.title}`;
  const body = getPullRequestBody(submission, relativePath);

  if (existingPullRequest) {
    const updated = await githubRequest(`${repositoryPath}/pulls/${existingPullRequest.number}`, {
      method: "PATCH",
      body: {
        title,
        body,
      },
    });
    return updated;
  }

  return githubRequest(`${repositoryPath}/pulls`, {
    method: "POST",
    body: {
      title,
      body,
      head: branchName,
      base: defaultBranch,
      draft: true,
    },
  });
}

try {
  const fields = parseIssueForm(issue.body || "");
  const submission = buildSubmission(fields);

  if (!submission) {
    console.log("Issue did not use a recognized content submission form; skipping.");
    process.exit(0);
  }

  const branchName = `content-submission/issue-${issue.number}`;
  const filePath = resolveFilePath(submission);
  const relativePath = path.relative(rootDirectory, filePath).split(path.sep).join("/");

  ensureExistingTarget(filePath, submission.isUpdate);

  runGit("git config user.name 'github-actions[bot]'");
  runGit("git config user.email '41898282+github-actions[bot]@users.noreply.github.com'");
  runGit(`git checkout -B ${branchName}`);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, renderMarkdownFile(submission), "utf8");

  runGit(`git add ${relativePath}`);
  const stagedChanges = hasStagedChanges();
  const existingPullRequest = await findOpenPullRequest(branchName);

  if (stagedChanges) {
    runGit(`git commit -m ${JSON.stringify(`content: sync issue #${issue.number}`)}`);
    runGit(`git push --force-with-lease origin HEAD:${branchName}`);
  } else if (!existingPullRequest) {
    await upsertIssueComment(
      `The submission matched the existing repository content, so no draft PR was created.\n\n- Target file: \`${relativePath}\``,
    );
    console.log(`No content changes detected for issue #${issue.number}; skipping PR creation.`);
    process.exit(0);
  }

  const pullRequest = await createOrUpdatePullRequest(
    branchName,
    submission,
    relativePath,
    existingPullRequest,
  );
  await upsertIssueComment(
    `Draft PR #${pullRequest.number} is ready for review.\n\n- Branch: \`${branchName}\`\n- File: \`${relativePath}\`\n- PR: ${pullRequest.html_url}`,
  );

  console.log(`Prepared ${relativePath} from issue #${issue.number} and linked pull request #${pullRequest.number}.`);
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown content submission error.";
  await upsertIssueComment(`The content submission could not be processed automatically.\n\n- Error: ${message}`);
  throw error;
}

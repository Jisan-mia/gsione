import fs from "node:fs";
import { autoManagedLabels, getSectionForRelativePath, workflowLabels } from "./content-workflow-config.mjs";
import { getRepositoryPath, githubRequest, paginate } from "./github-api.mjs";

const repositoryPath = getRepositoryPath();
const eventPath = process.env.GITHUB_EVENT_PATH;

if (!eventPath || !fs.existsSync(eventPath)) {
  throw new Error("GITHUB_EVENT_PATH is not available.");
}

const eventPayload = JSON.parse(fs.readFileSync(eventPath, "utf8"));
const pullRequest = eventPayload.pull_request;

if (!pullRequest) {
  console.log("No pull request payload found; skipping label management.");
  process.exit(0);
}

async function ensureLabelsExist() {
  const existingLabels = await paginate(`${repositoryPath}/labels`);
  const existingByName = new Set(existingLabels.map((label) => label.name));

  for (const label of workflowLabels) {
    if (existingByName.has(label.name)) {
      continue;
    }

    await githubRequest(`${repositoryPath}/labels`, {
      method: "POST",
      body: {
        name: label.name,
        color: label.color,
        description: label.description,
      },
    });
  }
}

async function getPullRequestFiles(number) {
  return paginate(`${repositoryPath}/pulls/${number}/files`);
}

async function getPullRequestReviews(number) {
  return paginate(`${repositoryPath}/pulls/${number}/reviews`);
}

async function getHeadCheckState(headSha) {
  const [commitStatus, checkRunsResponse] = await Promise.all([
    githubRequest(`${repositoryPath}/commits/${headSha}/status`),
    githubRequest(`${repositoryPath}/commits/${headSha}/check-runs`),
  ]);

  const checkRuns = checkRunsResponse.check_runs || [];
  const hasSignals = (commitStatus.total_count || 0) > 0 || checkRuns.length > 0;
  const statusOk = ["success", null].includes(commitStatus.state) || commitStatus.total_count === 0;
  const checkRunsOk = checkRuns.every((run) => {
    if (run.status !== "completed") {
      return false;
    }

    return ["success", "neutral", "skipped"].includes(run.conclusion);
  });

  return {
    hasSignals,
    allPassing: hasSignals && statusOk && checkRunsOk,
  };
}

function getLatestReviewStates(reviews) {
  const latestByReviewer = new Map();

  for (const review of reviews) {
    const login = review.user?.login;
    if (!login) {
      continue;
    }

    latestByReviewer.set(login, review.state);
  }

  return [...latestByReviewer.values()];
}

function getDesiredTypeLabels(files) {
  const contentFiles = files.filter((file) => file.filename.startsWith("content/"));

  if (contentFiles.length === 0) {
    return [];
  }

  const hasNewContent = contentFiles.some((file) => file.status === "added");
  return [hasNewContent ? "type:new-content" : "type:update"];
}

function getDesiredSectionLabels(files) {
  const labels = new Set();

  for (const file of files) {
    if (!file.filename.startsWith("content/")) {
      continue;
    }

    const section = getSectionForRelativePath(file.filename);
    if (section) {
      labels.add(section.label);
    }
  }

  return [...labels];
}

function withoutManagedLabels(labels) {
  return labels.filter((label) => !autoManagedLabels.includes(label.name));
}

async function replaceLabels(number, desiredLabels) {
  const existingIssue = await githubRequest(`${repositoryPath}/issues/${number}`);
  const preservedLabels = withoutManagedLabels(existingIssue.labels || []).map((label) => label.name);
  const nextLabels = [...new Set([...preservedLabels, ...desiredLabels])];

  await githubRequest(`${repositoryPath}/issues/${number}`, {
    method: "PATCH",
    body: { labels: nextLabels },
  });
}

await ensureLabelsExist();

const files = await getPullRequestFiles(pullRequest.number);
const contentFiles = files.filter((file) => file.filename.startsWith("content/"));

if (contentFiles.length === 0) {
  console.log(`Pull request #${pullRequest.number} does not change Markdown content; skipping.`);
  process.exit(0);
}

const reviews = await getPullRequestReviews(pullRequest.number);
const reviewStates = getLatestReviewStates(reviews);
const changesRequested = reviewStates.includes("CHANGES_REQUESTED");
const hasApproval = reviewStates.includes("APPROVED") && !changesRequested;
const checks = await getHeadCheckState(pullRequest.head.sha);

let stateLabel = "state:review";
if (pullRequest.draft) {
  stateLabel = "state:draft";
} else if (hasApproval && checks.allPassing) {
  stateLabel = "state:approved";
}

const desiredLabels = [
  ...getDesiredSectionLabels(files),
  ...getDesiredTypeLabels(files),
  stateLabel,
];

if (changesRequested) {
  desiredLabels.push("needs:revision");
}

if (!pullRequest.draft && hasApproval && checks.allPassing) {
  desiredLabels.push("ready:publish");
}

await replaceLabels(pullRequest.number, desiredLabels);

console.log(`Updated editorial labels for pull request #${pullRequest.number}: ${desiredLabels.join(", ")}`);

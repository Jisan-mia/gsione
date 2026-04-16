import fs from "node:fs";
import { autoManagedLabels, workflowLabels } from "./content-workflow-config.mjs";
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

const desiredLabels = [pullRequest.draft ? "state:draft" : "state:review"];

await replaceLabels(pullRequest.number, desiredLabels);

console.log(`Updated editorial labels for pull request #${pullRequest.number}: ${desiredLabels.join(", ")}`);

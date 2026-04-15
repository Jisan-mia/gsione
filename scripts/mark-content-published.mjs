import fs from "node:fs";
import { workflowLabels } from "./content-workflow-config.mjs";
import { getRepositoryPath, githubRequest, paginate } from "./github-api.mjs";

const repositoryPath = getRepositoryPath();
const eventPath = process.env.GITHUB_EVENT_PATH;

if (!eventPath || !fs.existsSync(eventPath)) {
  throw new Error("GITHUB_EVENT_PATH is not available.");
}

const eventPayload = JSON.parse(fs.readFileSync(eventPath, "utf8"));
const workflowRun = eventPayload.workflow_run;

if (!workflowRun) {
  console.log("No workflow_run payload found; skipping publication labels.");
  process.exit(0);
}

if (
  workflowRun.conclusion !== "success" ||
  workflowRun.event !== "push" ||
  workflowRun.head_branch !== "main"
) {
  console.log("Workflow run was not a successful push deployment on main; skipping.");
  process.exit(0);
}

const associatedPullRequests = await githubRequest(
  `${repositoryPath}/commits/${workflowRun.head_sha}/pulls`,
);

const publicationLabels = workflowLabels.filter((label) => label.name === "state:published");
for (const label of publicationLabels) {
  try {
    await githubRequest(`${repositoryPath}/labels`, {
      method: "POST",
      body: {
        name: label.name,
        color: label.color,
        description: label.description,
      },
    });
  } catch {
    // Label already exists.
  }
}

for (const pullRequest of associatedPullRequests) {
  if (!pullRequest.merged_at) {
    continue;
  }

  const files = await paginate(`${repositoryPath}/pulls/${pullRequest.number}/files`);
  if (!files.some((file) => file.filename.startsWith("content/"))) {
    continue;
  }

  const issue = await githubRequest(`${repositoryPath}/issues/${pullRequest.number}`);
  const labels = (issue.labels || [])
    .map((label) => label.name)
    .filter((label) => !["state:draft", "state:review", "state:approved", "needs:revision", "ready:publish"].includes(label));

  labels.push("state:published");

  await githubRequest(`${repositoryPath}/issues/${pullRequest.number}`, {
    method: "PATCH",
    body: { labels: [...new Set(labels)] },
  });

  console.log(`Marked pull request #${pullRequest.number} as published.`);
}

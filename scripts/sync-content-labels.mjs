import { getRepositoryPath, githubRequest, paginate } from "./github-api.mjs";
import { workflowLabels } from "./content-workflow-config.mjs";

const repositoryPath = getRepositoryPath();
const existingLabels = await paginate(`${repositoryPath}/labels`);
const existingByName = new Map(existingLabels.map((label) => [label.name, label]));

for (const label of workflowLabels) {
  const existing = existingByName.get(label.name);

  if (existing) {
    await githubRequest(`${repositoryPath}/labels/${encodeURIComponent(label.name)}`, {
      method: "PATCH",
      body: {
        new_name: label.name,
        color: label.color,
        description: label.description,
      },
    });
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

console.log(`Synchronized ${workflowLabels.length} editorial workflow labels.`);

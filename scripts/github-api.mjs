const apiBaseUrl = process.env.GITHUB_API_URL || "https://api.github.com";

function getRepositoryContext() {
  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository?.includes("/")) {
    throw new Error("GITHUB_REPOSITORY is not set.");
  }

  const [owner, repo] = repository.split("/");
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN is not set.");
  }

  return { owner, repo, token };
}

export async function githubRequest(path, { method = "GET", body } = {}) {
  const { token } = getRepositoryContext();
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "github-content-workflow",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || `GitHub API request failed with ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export function getRepositoryPath() {
  const { owner, repo } = getRepositoryContext();
  return `/repos/${owner}/${repo}`;
}

export async function paginate(path) {
  const items = [];
  let page = 1;

  while (true) {
    const separator = path.includes("?") ? "&" : "?";
    const response = await githubRequest(`${path}${separator}per_page=100&page=${page}`);

    if (!Array.isArray(response) || response.length === 0) {
      return items;
    }

    items.push(...response);

    if (response.length < 100) {
      return items;
    }

    page += 1;
  }
}

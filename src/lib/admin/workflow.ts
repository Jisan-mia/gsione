import { githubAdminConfig, type AdminRole } from "@/lib/admin/github";
import {
  getContentPath,
  stringifyMarkdownFile,
  type AdminContentSection,
  type AdminContentItem,
  type AdminEditableContent,
  type UploadedAssetDraft,
} from "@/lib/admin/content";

type GitHubMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface AdminCheckRun {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  detailsUrl: string;
  htmlUrl: string;
  completedAt: string | null;
}

export interface AdminPullRequestStatus {
  number: number;
  title: string;
  state: string;
  draft: boolean;
  htmlUrl: string;
  body: string;
  userLogin: string;
  headRef: string;
  headSha: string;
  mergeable: boolean | null;
  mergeableState: string;
  updatedAt: string;
  checks: AdminCheckRun[];
  files: string[];
  checksPassing: boolean;
  mergeBlockedReason: string;
  previewUrl: string;
}

export interface DraftSaveResult {
  branch: string;
  commitSha: string;
  contentPath: string;
  pullRequest: AdminPullRequestStatus;
}

export interface PullRequestFileDiff {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  patch: string;
}

class GitHubWorkflowError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GitHubWorkflowError";
    this.status = status;
  }
}

async function githubRequest<T>(
  token: string,
  path: string,
  options: {
    method?: GitHubMethod;
    body?: unknown;
    accept?: string;
  } = {},
): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    method: options.method || "GET",
    headers: {
      Accept: options.accept || "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    let message = `GitHub request failed with ${response.status}.`;

    try {
      const body = (await response.json()) as { message?: string };
      message = body.message || message;
    } catch {
      message = response.statusText || message;
    }

    throw new GitHubWorkflowError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function isNotFound(error: unknown) {
  return error instanceof GitHubWorkflowError && error.status === 404;
}

function isPermissionDenied(error: unknown) {
  return (
    error instanceof GitHubWorkflowError &&
    (error.status === 403 || error.status === 404) &&
    /resource not accessible|not found/i.test(error.message)
  );
}

function dataUrlToBase64(dataUrl: string) {
  return dataUrl.split(",", 2)[1] || "";
}

function getDisplayTitle(content: AdminEditableContent) {
  if (content.section === "team") {
    return String(content.frontmatter.name || "Untitled team member");
  }

  return String(content.frontmatter.title || "Untitled content");
}

export function getDashboardBranchName(
  section: AdminContentSection,
  slug: string,
) {
  return `dashboard/${section}/${slug}`;
}

function getPrTitle(content: AdminEditableContent) {
  const title = getDisplayTitle(content);

  if (content.frontmatter.status === "archived") {
    return `Archive ${content.section}: ${title}`;
  }

  if (content.originalSlug) {
    return `Edit ${content.section}: ${title}`;
  }

  return `Add ${content.section}: ${title}`;
}

function getPrBody(content: AdminEditableContent, contentPath: string) {
  return [
    "Dashboard content update.",
    "",
    `- Section: ${content.section}`,
    `- File: \`${contentPath}\``,
    `- Slug: \`${content.slug}\``,
    `- Status: \`${String(content.frontmatter.status || "published")}\``,
    "",
    "Checks must pass before publishing.",
    "",
    "<!-- gsi-dashboard-pr -->",
  ].join("\n");
}

async function getBranchRef(token: string, branch: string) {
  return githubRequest<{
    object: { sha: string; type: string };
  }>(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/git/ref/heads/${branch}`,
  );
}

async function createBranch(token: string, branch: string, sha: string) {
  return githubRequest(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/git/refs`,
    {
      method: "POST",
      body: {
        ref: `refs/heads/${branch}`,
        sha,
      },
    },
  );
}

async function getMainSha(token: string) {
  const ref = await getBranchRef(token, "main");
  return ref.object.sha;
}

async function ensureDashboardBranchFromLatestMain(
  token: string,
  branch: string,
) {
  const mainSha = await getMainSha(token);

  try {
    await getBranchRef(token, branch);
  } catch (error) {
    if (!isNotFound(error)) throw error;
    await createBranch(token, branch, mainSha);
  }

  return mainSha;
}

async function createBlob(
  token: string,
  content: string,
  encoding: "utf-8" | "base64",
) {
  const blob = await githubRequest<{ sha: string }>(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/git/blobs`,
    {
      method: "POST",
      body: {
        content,
        encoding,
      },
    },
  );

  return blob.sha;
}

async function createCommitWithFiles({
  token,
  branch,
  parentSha,
  message,
  files,
  deletedPaths,
  forceUpdate = false,
}: {
  token: string;
  branch: string;
  parentSha: string;
  message: string;
  files: Array<{ path: string; content: string; encoding: "utf-8" | "base64" }>;
  deletedPaths: string[];
  forceUpdate?: boolean;
}) {
  const parentCommit = await githubRequest<{ tree: { sha: string } }>(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/git/commits/${parentSha}`,
  );

  const blobs = await Promise.all(
    files.map(async (file) => ({
      path: file.path,
      sha: await createBlob(token, file.content, file.encoding),
    })),
  );

  const tree = await githubRequest<{ sha: string }>(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/git/trees`,
    {
      method: "POST",
      body: {
        base_tree: parentCommit.tree.sha,
        tree: [
          ...blobs.map((blob) => ({
            path: blob.path,
            mode: "100644",
            type: "blob",
            sha: blob.sha,
          })),
          ...deletedPaths.map((path) => ({
            path,
            mode: "100644",
            type: "blob",
            sha: null,
          })),
        ],
      },
    },
  );

  const commit = await githubRequest<{ sha: string }>(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/git/commits`,
    {
      method: "POST",
      body: {
        message,
        tree: tree.sha,
        parents: [parentSha],
      },
    },
  );

  await githubRequest(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/git/refs/heads/${branch}`,
    {
      method: "PATCH",
      body: {
        sha: commit.sha,
        force: forceUpdate,
      },
    },
  );

  return commit.sha;
}

async function findOpenPullRequestForBranch(token: string, branch: string) {
  const pulls = await githubRequest<
    Array<{
      number: number;
      head: { ref: string };
    }>
  >(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/pulls?state=open&base=main&per_page=100`,
  );

  return pulls.find((pull) => pull.head.ref === branch) || null;
}

async function createOrUpdatePullRequest({
  token,
  branch,
  title,
  body,
}: {
  token: string;
  branch: string;
  title: string;
  body: string;
}) {
  const existingPull = await findOpenPullRequestForBranch(token, branch);

  if (existingPull) {
    await githubRequest(
      token,
      `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/pulls/${existingPull.number}`,
      {
        method: "PATCH",
        body: {
          title,
          body,
        },
      },
    );

    return existingPull.number;
  }

  const pull = await githubRequest<{ number: number }>(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/pulls`,
    {
      method: "POST",
      body: {
        title,
        head: branch,
        base: "main",
        body,
        draft: false,
      },
    },
  );

  return pull.number;
}

async function getPullRequestFiles(token: string, number: number) {
  const files = await githubRequest<Array<{ filename: string }>>(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/pulls/${number}/files?per_page=100`,
  );

  return files.map((file) => file.filename);
}

async function getCheckRuns(token: string, sha: string) {
  let response: {
    check_runs: Array<{
      id: number;
      name: string;
      status: string;
      conclusion: string | null;
      details_url: string;
      html_url: string;
      completed_at: string | null;
    }>;
  };

  try {
    response = await githubRequest(
      token,
      `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/commits/${sha}/check-runs?per_page=100`,
      {
        accept: "application/vnd.github+json",
      },
    );
  } catch (error) {
    if (isPermissionDenied(error)) {
      return [];
    }

    throw error;
  }

  return response.check_runs.map((check) => ({
    id: check.id,
    name: check.name,
    status: check.status,
    conclusion: check.conclusion,
    detailsUrl: check.details_url,
    htmlUrl: check.html_url,
    completedAt: check.completed_at,
  }));
}

function getPreviewUrl(checks: AdminCheckRun[]) {
  return (
    checks.find((check) => /deploy|pages|next/i.test(check.name))?.detailsUrl ||
    checks[0]?.detailsUrl ||
    ""
  );
}

function getChecksPassing(checks: AdminCheckRun[]) {
  if (!checks.length) return false;

  return checks.every(
    (check) =>
      check.status === "completed" &&
      ["success", "neutral", "skipped"].includes(check.conclusion || ""),
  );
}

function getMergeBlockedReason({
  checks,
  checksPassing,
  mergeable,
  mergeableState,
  files,
}: {
  checks: AdminCheckRun[];
  checksPassing: boolean;
  mergeable: boolean | null;
  mergeableState: string;
  files: string[];
}) {
  const hasUnsafeFiles = files.some(
    (file) =>
      !file.startsWith("content/") && !file.startsWith("public/uploads/"),
  );

  if (hasUnsafeFiles) {
    return "This PR includes files outside content and uploads.";
  }

  if (mergeable === false || mergeableState === "dirty") {
    return "This PR has merge conflicts.";
  }

  if (!checks.length) {
    return "Checks are unavailable or have not reported yet. Confirm the token has Checks read permission.";
  }

  if (!checksPassing) {
    return "Required preview/build checks are not passing yet.";
  }

  return "";
}

export async function getPullRequestStatus(token: string, number: number) {
  const pull = await githubRequest<{
    number: number;
    title: string;
    state: string;
    draft: boolean;
    html_url: string;
    body: string | null;
    user: { login: string };
    head: { ref: string; sha: string };
    mergeable: boolean | null;
    mergeable_state: string;
    updated_at: string;
  }>(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/pulls/${number}`,
  );
  const checks = await getCheckRuns(token, pull.head.sha);
  const files = await getPullRequestFiles(token, pull.number);
  const checksPassing = getChecksPassing(checks);

  return {
    number: pull.number,
    title: pull.title,
    state: pull.state,
    draft: pull.draft,
    htmlUrl: pull.html_url,
    body: pull.body || "",
    userLogin: pull.user.login,
    headRef: pull.head.ref,
    headSha: pull.head.sha,
    mergeable: pull.mergeable,
    mergeableState: pull.mergeable_state,
    updatedAt: pull.updated_at,
    checks,
    files,
    checksPassing,
    mergeBlockedReason: getMergeBlockedReason({
      checks,
      checksPassing,
      mergeable: pull.mergeable,
      mergeableState: pull.mergeable_state,
      files,
    }),
    previewUrl: getPreviewUrl(checks),
  } satisfies AdminPullRequestStatus;
}

export async function loadDashboardPullRequests(token: string) {
  const pulls = await githubRequest<
    Array<{
      number: number;
      head: { ref: string };
    }>
  >(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/pulls?state=open&base=main&per_page=100`,
  );
  const dashboardPulls = pulls.filter((pull) =>
    pull.head.ref.startsWith("dashboard/"),
  );

  return Promise.all(
    dashboardPulls.map((pull) => getPullRequestStatus(token, pull.number)),
  );
}

export async function loadPullRequestDiff(
  token: string,
  pullNumber: number,
): Promise<PullRequestFileDiff[]> {
  const files = await githubRequest<
    Array<{
      filename: string;
      status: string;
      additions: number;
      deletions: number;
      patch?: string;
    }>
  >(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/pulls/${pullNumber}/files?per_page=100`,
  );

  return files.map((file) => ({
    filename: file.filename,
    status: file.status,
    additions: file.additions,
    deletions: file.deletions,
    patch: file.patch || "",
  }));
}

export async function saveDashboardDraft({
  token,
  content,
  assets,
}: {
  token: string;
  content: AdminEditableContent;
  assets: UploadedAssetDraft[];
}) {
  const branch = getDashboardBranchName(content.section, content.slug);
  const contentPath = getContentPath(content.section, content.slug);
  const originalPath = content.originalSlug
    ? getContentPath(content.section, content.originalSlug)
    : "";
  const parentSha = await ensureDashboardBranchFromLatestMain(token, branch);
  const markdown = stringifyMarkdownFile(content);
  const commitSha = await createCommitWithFiles({
    token,
    branch,
    parentSha,
    message: `${getPrTitle(content)} via dashboard`,
    files: [
      {
        path: contentPath,
        content: markdown,
        encoding: "utf-8",
      },
      ...assets.map((asset) => ({
        path: `public${asset.path}`,
        content: dataUrlToBase64(asset.dataUrl),
        encoding: "base64" as const,
      })),
    ],
    deletedPaths:
      originalPath && originalPath !== contentPath ? [originalPath] : [],
    forceUpdate: true,
  });
  const pullNumber = await createOrUpdatePullRequest({
    token,
    branch,
    title: getPrTitle(content),
    body: getPrBody(content, contentPath),
  });
  const pullRequest = await getPullRequestStatus(token, pullNumber);

  return {
    branch,
    commitSha,
    contentPath,
    pullRequest,
  } satisfies DraftSaveResult;
}

export async function createDeleteContentPullRequest({
  token,
  item,
}: {
  token: string;
  item: AdminContentItem;
}) {
  const branch = `dashboard/${item.section}/delete-${item.slug}`;
  const parentSha = await ensureDashboardBranchFromLatestMain(token, branch);
  await createCommitWithFiles({
    token,
    branch,
    parentSha,
    message: `Delete ${item.section}: ${item.title} via dashboard`,
    files: [],
    deletedPaths: [item.path],
    forceUpdate: true,
  });
  const pullNumber = await createOrUpdatePullRequest({
    token,
    branch,
    title: `Delete ${item.section}: ${item.title}`,
    body: [
      "Dashboard delete request.",
      "",
      `- Section: ${item.section}`,
      `- File: \`${item.path}\``,
      "",
      "This PR must be reviewed and published before the file is removed from main.",
      "",
      "<!-- gsi-dashboard-pr -->",
    ].join("\n"),
  });

  return getPullRequestStatus(token, pullNumber);
}

export async function publishDashboardPullRequest({
  token,
  role,
  pullNumber,
}: {
  token: string;
  role: AdminRole;
  pullNumber: number;
}) {
  if (role !== "superAdmin") {
    throw new Error("Only super admins can publish dashboard pull requests.");
  }

  let status = await getPullRequestStatus(token, pullNumber);

  if (status.mergeable === null) {
    await new Promise((resolve) => window.setTimeout(resolve, 1200));
    status = await getPullRequestStatus(token, pullNumber);
  }

  if (status.mergeBlockedReason) {
    throw new Error(status.mergeBlockedReason);
  }

  await githubRequest(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/pulls/${pullNumber}/merge`,
    {
      method: "PUT",
      body: {
        commit_title: status.title,
        commit_message: "Published from the GSi dashboard.",
        merge_method: "squash",
      },
    },
  );

  return getPullRequestStatus(token, pullNumber);
}

export async function loadBranchProtection(token: string) {
  try {
    return await githubRequest<{
      required_pull_request_reviews?: unknown;
      required_status_checks?: {
        contexts?: string[];
        checks?: Array<{ context: string }>;
      };
      enforce_admins?: { enabled?: boolean };
      allow_force_pushes?: { enabled?: boolean };
    }>(
      token,
      `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/branches/main/protection`,
    );
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

export async function discardDashboardPullRequest({
  token,
  pullNumber,
}: {
  token: string;
  pullNumber: number;
}) {
  const status = await getPullRequestStatus(token, pullNumber);

  await githubRequest(
    token,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/pulls/${pullNumber}`,
    {
      method: "PATCH",
      body: { state: "closed" },
    },
  );

  try {
    await githubRequest(
      token,
      `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/git/refs/heads/${status.headRef}`,
      { method: "DELETE" },
    );
  } catch {
    // Branch may already be deleted or protected — ignore
  }
}

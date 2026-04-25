export const githubAdminConfig = {
  owner: "Jisan-mia",
  repo: "gsione",
  superAdminLogin: "jisan-mia",
  tokenStorageKey: "gsi-admin-github-token",
  sessionTokenStorageKey: "gsi-admin-session-token",
} as const;

export type AdminRole = "superAdmin" | "editor" | "viewer";

export interface GitHubUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  profileUrl: string;
}

export interface RepositoryPermissions {
  admin?: boolean;
  maintain?: boolean;
  push?: boolean;
  triage?: boolean;
  pull?: boolean;
}

export interface RepositoryAccess {
  fullName: string;
  htmlUrl: string;
  private: boolean;
  permissions: RepositoryPermissions;
}

export interface VerifiedAdminSession {
  token: string;
  user: GitHubUser;
  repository: RepositoryAccess;
  role: AdminRole;
}

class GitHubApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
  }
}

async function githubRequest<T>(token: string, path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    let message = "GitHub request failed.";

    try {
      const body = (await response.json()) as { message?: string };
      message = body.message || message;
    } catch {
      message = response.statusText || message;
    }

    throw new GitHubApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

function mapRole(login: string, permissions: RepositoryPermissions): AdminRole {
  const isSuperAdmin =
    login.toLowerCase() === githubAdminConfig.superAdminLogin ||
    permissions.admin === true;

  if (isSuperAdmin) {
    return "superAdmin";
  }

  if (permissions.maintain || permissions.push) {
    return "editor";
  }

  return "viewer";
}

function hasRepositoryAccess(permissions: RepositoryPermissions) {
  return (
    permissions.admin ||
    permissions.maintain ||
    permissions.push ||
    permissions.triage ||
    permissions.pull
  );
}

export function getGitHubTokenInstructionsUrl() {
  return "https://github.com/settings/personal-access-tokens/new";
}

export function getRoleLabel(role: AdminRole) {
  if (role === "superAdmin") return "Super admin";
  if (role === "editor") return "Editor";
  return "Viewer";
}

export function getRoleDescription(role: AdminRole) {
  if (role === "superAdmin") {
    return "Can manage dashboard drafts and use guarded publish controls after checks pass.";
  }

  if (role === "editor") {
    return "Can create and edit draft content through pull requests, without publishing directly.";
  }

  return "Can view dashboard status. Editing can be enabled later if this role is needed.";
}

export function getStoredAdminToken() {
  if (typeof window === "undefined") return "";

  return (
    window.sessionStorage.getItem(githubAdminConfig.sessionTokenStorageKey) ||
    window.localStorage.getItem(githubAdminConfig.tokenStorageKey) ||
    ""
  );
}

export function isAdminTokenRemembered(token: string) {
  if (typeof window === "undefined") return false;

  return window.localStorage.getItem(githubAdminConfig.tokenStorageKey) === token;
}

export function saveAdminToken(token: string, remember: boolean) {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(githubAdminConfig.sessionTokenStorageKey, token);

  if (remember) {
    window.localStorage.setItem(githubAdminConfig.tokenStorageKey, token);
  } else {
    window.localStorage.removeItem(githubAdminConfig.tokenStorageKey);
  }
}

export function clearAdminTokens() {
  if (typeof window === "undefined") return;

  window.sessionStorage.removeItem(githubAdminConfig.sessionTokenStorageKey);
  window.localStorage.removeItem(githubAdminConfig.tokenStorageKey);
}

export async function verifyAdminToken(
  token: string,
): Promise<VerifiedAdminSession> {
  const trimmedToken = token.trim();

  if (!trimmedToken) {
    throw new Error("Enter a GitHub fine-grained token to continue.");
  }

  const userResponse = await githubRequest<{
    login: string;
    name: string | null;
    avatar_url: string;
    html_url: string;
  }>(trimmedToken, "/user");

  const repositoryResponse = await githubRequest<{
    full_name: string;
    html_url: string;
    private: boolean;
    permissions?: RepositoryPermissions;
  }>(
    trimmedToken,
    `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}`,
  );

  const permissions = repositoryResponse.permissions || {};

  if (!hasRepositoryAccess(permissions)) {
    throw new Error(
      "This GitHub account does not have access to the GSi repository.",
    );
  }

  return {
    token: trimmedToken,
    user: {
      login: userResponse.login,
      name: userResponse.name,
      avatarUrl: userResponse.avatar_url,
      profileUrl: userResponse.html_url,
    },
    repository: {
      fullName: repositoryResponse.full_name,
      htmlUrl: repositoryResponse.html_url,
      private: repositoryResponse.private,
      permissions,
    },
    role: mapRole(userResponse.login, permissions),
  };
}

export function getGitHubErrorMessage(error: unknown) {
  if (error instanceof GitHubApiError) {
    if (error.status === 401) {
      return "GitHub rejected this token. Check that it is active and has not expired.";
    }

    if (error.status === 403) {
      return "GitHub blocked the request. Check token permissions and repository access.";
    }

    if (error.status === 404) {
      return "This token cannot access the GSi repository. Add the GitHub account to the repo or update the token repository scope.";
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to verify GitHub access.";
}

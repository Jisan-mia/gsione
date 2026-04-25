"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Github,
  Loader2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import {
  getGitHubErrorMessage,
  getGitHubTokenInstructionsUrl,
  getStoredAdminToken,
  githubAdminConfig,
  saveAdminToken,
  verifyAdminToken,
  type VerifiedAdminSession,
} from "@/lib/admin/github";
import { siteConfig } from "@/lib/site";

const permissionRows = [
  {
    title: "Repository permission gate",
    description:
      "The dashboard verifies the signed-in GitHub account against repository permissions before showing admin tools.",
  },
  {
    title: "No public allowlist",
    description:
      "Access is not stored in the public source code. GitHub repository membership is the source of truth.",
  },
  {
    title: "Dashboard route separation",
    description:
      "This page only authenticates. Successful sessions continue into the private dashboard app.",
  },
];

function AdminLogin({
  onVerified,
}: {
  onVerified: (session: VerifiedAdminSession, remember: boolean) => void;
}) {
  const [token, setToken] = useState("");
  const [remember, setRemember] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedToken = getStoredAdminToken();

    if (!storedToken) return;

    setToken(storedToken);
    setRemember(true);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsVerifying(true);
    setError("");

    try {
      const session = await verifyAdminToken(token);
      onVerified(session, remember);
    } catch (verificationError) {
      setError(getGitHubErrorMessage(verificationError));
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-muted/40 text-foreground"
    >
      <div className="grid min-h-screen lg:grid-cols-[1fr_1fr]">
        {/* Left branding panel */}
        <section className="relative hidden overflow-hidden border-r border-border/60 bg-card lg:block">
          <div
            className="absolute inset-0 hero-grid opacity-30"
            aria-hidden="true"
          />
          <div className="relative flex h-full flex-col justify-between p-10">
            <div>
              <div className="inline-flex items-center gap-2.5 rounded-lg border border-primary/15 bg-primary/5 px-3.5 py-2 text-xs font-semibold text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                GitHub-protected dashboard
              </div>
              <h1 className="mt-8 max-w-lg text-4xl font-bold leading-[1.15] tracking-tight text-foreground text-balance">
                Sign in before entering the content workspace.
              </h1>
              <p className="mt-4 max-w-lg text-[0.9375rem] leading-7 text-muted-foreground">
                Admin access is verified through GitHub repository permissions.
                After verification, editors continue to the dashboard overview
                and route-based content tools.
              </p>
            </div>

            <div className="grid gap-2.5">
              {permissionRows.map((row) => (
                <div
                  key={row.title}
                  className="rounded-xl border border-border/60 bg-background/60 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <h2 className="text-[0.8125rem] font-semibold text-foreground">
                        {row.title}
                      </h2>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {row.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right login form */}
        <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-3">
              <span className="relative flex h-11 w-11 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-border/50">
                <Image
                  src="/logo.webp"
                  alt={`${siteConfig.name} logo`}
                  fill
                  sizes="44px"
                  className="object-contain p-1.5"
                  priority
                />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {siteConfig.shortName} Admin
                </p>
                <p className="text-xs text-muted-foreground">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <LockKeyhole className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    Verify GitHub access
                  </h1>
                  <p className="mt-1.5 text-[0.8125rem] leading-6 text-muted-foreground">
                    Enter a fine-grained GitHub token scoped only to{" "}
                    <span className="font-medium text-foreground">
                      {githubAdminConfig.owner}/{githubAdminConfig.repo}
                    </span>
                    .
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
                <div>
                  <label
                    htmlFor="github-token"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Fine-grained token
                  </label>
                  <input
                    id="github-token"
                    type="password"
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                    placeholder="github_pat_..."
                    autoComplete="off"
                    className="mt-1 h-11 w-full rounded-xl border border-border/60 bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5 text-[0.8125rem] leading-5 text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
                  />
                  <span>
                    Remember on this device. Leave unchecked for a session-only
                    token that clears when the browser session ends.
                  </span>
                </label>

                {error ? (
                  <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 text-sm leading-6 text-destructive">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isVerifying ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Github className="h-4 w-4" />
                  )}
                  {isVerifying ? "Verifying access" : "Continue to dashboard"}
                </button>
              </form>

              <div className="mt-4 rounded-xl border border-border/60 bg-muted/30 p-3.5 text-xs leading-5 text-muted-foreground">
                Required permissions: Metadata read, Contents read/write, Pull
                requests read/write, and Actions/checks read for status.
                <Link
                  href={getGitHubTokenInstructionsUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 font-medium text-primary hover:underline"
                >
                  Create a token
                </Link>
                .
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export function AdminAuthPage() {
  const router = useRouter();

  function handleVerified(
    nextSession: VerifiedAdminSession,
    remember: boolean,
  ) {
    saveAdminToken(nextSession.token, remember);
    router.push("/dashboard");
  }

  return <AdminLogin onVerified={handleVerified} />;
}

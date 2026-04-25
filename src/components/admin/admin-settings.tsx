"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Shield, ShieldAlert } from "lucide-react";
import type { VerifiedAdminSession } from "@/lib/admin/github";
import { loadBranchProtection } from "@/lib/admin/workflow";
import { cn } from "@/lib/utils";

export function AdminSettings({ session }: { session: VerifiedAdminSession }) {
  const [protection, setProtection] = useState<Awaited<
    ReturnType<typeof loadBranchProtection>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      setIsLoading(true);
      setError("");

      try {
        const nextProtection = await loadBranchProtection(session.token);
        if (isMounted) setProtection(nextProtection);
      } catch (settingsError) {
        if (!isMounted) return;
        setError(
          settingsError instanceof Error
            ? settingsError.message
            : "Unable to load repository settings.",
        );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadSettings();

    return () => {
      isMounted = false;
    };
  }, [session.token]);

  const rows = useMemo(
    () => [
      {
        label: "Main branch protected",
        passing: Boolean(protection),
      },
      {
        label: "Pull request review gate",
        passing: Boolean(protection?.required_pull_request_reviews),
      },
      {
        label: "Status checks required",
        passing: Boolean(protection?.required_status_checks),
      },
      {
        label: "Force pushes blocked",
        passing: protection
          ? protection.allow_force_pushes?.enabled === false
          : false,
      },
      {
        label: "Admins included",
        passing: Boolean(protection?.enforce_admins?.enabled),
      },
    ],
    [protection],
  );

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            Loading repository protection
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl space-y-4">
      {error ? (
        <div className="flex items-start gap-2.5 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <div className="flex items-center gap-2.5 border-b border-border/40 px-5 py-3.5">
          <Shield className="h-4 w-4 text-primary" />
          <h2 className="text-[0.8125rem] font-semibold text-foreground">
            Branch protection
          </h2>
        </div>
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 border-b border-border/40 px-5 py-3 last:border-b-0"
          >
            <span className="text-sm text-foreground">{row.label}</span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium",
                row.passing
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
              )}
            >
              {row.passing ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <ShieldAlert className="h-3.5 w-3.5" />
              )}
              {row.passing ? "OK" : "Review"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

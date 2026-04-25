"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Eye,
  ExternalLink,
  FileText,
  Loader2,
  Minus,
  Plus,
  RefreshCw,
  Rocket,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import type { VerifiedAdminSession } from "@/lib/admin/github";
import {
  loadDashboardPullRequests,
  loadPullRequestDiff,
  publishDashboardPullRequest,
  discardDashboardPullRequest,
  type AdminPullRequestStatus,
  type PullRequestFileDiff,
} from "@/lib/admin/workflow";
import { cn } from "@/lib/utils";

function friendlyTitle(pull: AdminPullRequestStatus) {
  return pull.title
    .replace(/^dashboard\/(articles|analysis|podcast|training|team)\//i, "")
    .replace(/-/g, " ");
}

function friendlyType(pull: AdminPullRequestStatus): {
  label: string;
  color: string;
} {
  const title = pull.title.toLowerCase();
  if (title.includes("delete")) {
    return {
      label: "Delete",
      color: "bg-red-500/10 text-red-600 dark:text-red-400",
    };
  }
  return {
    label: "Content update",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  };
}

function friendlySection(pull: AdminPullRequestStatus): string {
  const match = pull.headRef.match(
    /^dashboard\/(articles|analysis|podcast|training|team)\//,
  );
  if (match) {
    const s = match[1];
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  return "General";
}

function friendlyStatus(pull: AdminPullRequestStatus): {
  label: string;
  icon: typeof CheckCircle2;
  color: string;
} {
  if (pull.mergeBlockedReason) {
    return {
      label: "Needs attention",
      icon: ShieldAlert,
      color: "text-amber-600 dark:text-amber-400",
    };
  }
  if (pull.checksPassing) {
    return {
      label: "Ready to publish",
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
    };
  }
  return { label: "Processing", icon: Clock, color: "text-muted-foreground" };
}

function formatTimeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function humanizeBlockedReason(reason: string) {
  return reason
    .replace(
      "This PR includes files outside content and uploads.",
      "This update touches system files and needs developer review.",
    )
    .replace(
      "This PR has merge conflicts.",
      "This update conflicts with recent changes. Please re-save the draft.",
    )
    .replace(
      /Required preview\/build checks are not passing yet\./,
      "The site preview is still being generated. Please wait a moment.",
    )
    .replace(
      /Checks are unavailable.*/,
      "Verification is still in progress. This usually takes a minute.",
    );
}

// ── Diff Viewer ──────────────────────────────────────

function DiffLine({
  type,
  content,
}: {
  type: "add" | "remove" | "context";
  content: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[1.375rem] gap-2 px-3 font-mono text-xs leading-relaxed",
        type === "add" &&
          "bg-emerald-500/8 text-emerald-700 dark:text-emerald-300",
        type === "remove" && "bg-red-500/8 text-red-700 dark:text-red-300",
        type === "context" && "text-muted-foreground/70",
      )}
    >
      <span className="w-4 shrink-0 select-none text-right opacity-50">
        {type === "add" ? "+" : type === "remove" ? "−" : " "}
      </span>
      <pre className="whitespace-pre-wrap break-all">{content}</pre>
    </div>
  );
}

function FileDiff({ file }: { file: PullRequestFileDiff }) {
  const [expanded, setExpanded] = useState(true);
  const lines = file.patch ? file.patch.split("\n") : [];

  const statusBadge = {
    added: {
      label: "New file",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    removed: { label: "Deleted", color: "text-red-600 dark:text-red-400" },
    modified: { label: "Changed", color: "text-blue-600 dark:text-blue-400" },
    renamed: {
      label: "Renamed",
      color: "text-violet-600 dark:text-violet-400",
    },
  }[file.status] || { label: file.status, color: "text-muted-foreground" };

  return (
    <div className="overflow-hidden rounded-lg border border-border/50 bg-card">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors hover:bg-muted/30"
      >
        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        )}
        <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
        <span className="min-w-0 truncate text-xs font-medium text-foreground">
          {file.filename
            .replace(/^content\//, "")
            .replace(/^public\/uploads\//, "uploads/")}
        </span>
        <span
          className={cn(
            "shrink-0 text-[0.6875rem] font-medium",
            statusBadge.color,
          )}
        >
          {statusBadge.label}
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-2 text-[0.6875rem]">
          {file.additions > 0 && (
            <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
              <Plus className="h-3 w-3" />
              {file.additions}
            </span>
          )}
          {file.deletions > 0 && (
            <span className="flex items-center gap-0.5 text-red-600 dark:text-red-400">
              <Minus className="h-3 w-3" />
              {file.deletions}
            </span>
          )}
        </span>
      </button>

      {expanded && lines.length > 0 && (
        <div className="max-h-80 overflow-auto border-t border-border/40">
          {lines.map((line, i) => {
            if (line.startsWith("@@")) {
              return (
                <div
                  key={i}
                  className="bg-muted/40 px-3 py-1 font-mono text-[0.625rem] text-muted-foreground/50"
                >
                  {line}
                </div>
              );
            }
            const type = line.startsWith("+")
              ? "add"
              : line.startsWith("-")
                ? "remove"
                : "context";
            return (
              <DiffLine key={i} type={type} content={line.slice(1) || " "} />
            );
          })}
        </div>
      )}

      {expanded && !lines.length && (
        <div className="border-t border-border/40 px-4 py-3 text-xs text-muted-foreground/60">
          Binary file or no text changes to show.
        </div>
      )}
    </div>
  );
}

function DiffViewer({
  pullNumber,
  token,
}: {
  pullNumber: number;
  token: string;
}) {
  const [files, setFiles] = useState<PullRequestFileDiff[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    loadPullRequestDiff(token, pullNumber)
      .then((result) => {
        if (!cancelled) {
          setFiles(result);
          setError("");
        }
      })
      .catch((err) => {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : "Unable to load changes.",
          );
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token, pullNumber]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-1 py-4 text-xs text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Loading changes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 px-1 py-3 text-xs text-destructive">
        <AlertCircle className="h-3.5 w-3.5" />
        {error}
      </div>
    );
  }

  if (!files?.length) {
    return (
      <p className="px-1 py-3 text-xs text-muted-foreground/60">
        No file changes found.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <FileDiff key={file.filename} file={file} />
      ))}
    </div>
  );
}

// ── Queue Item Card ──────────────────────────────────

function QueueItem({
  pull,
  session,
  publishingNumber,
  discardingNumber,
  onPublish,
  onDiscard,
}: {
  pull: AdminPullRequestStatus;
  session: VerifiedAdminSession;
  publishingNumber: number | null;
  discardingNumber: number | null;
  onPublish: (pull: AdminPullRequestStatus) => void;
  onDiscard: (pull: AdminPullRequestStatus) => void;
}) {
  const [showDiff, setShowDiff] = useState(false);
  const type = friendlyType(pull);
  const section = friendlySection(pull);
  const status = friendlyStatus(pull);
  const StatusIcon = status.icon;
  const isPublishing = publishingNumber === pull.number;
  const isDiscarding = discardingNumber === pull.number;
  const isBusy = isPublishing || isDiscarding;
  const canPublish =
    session.role === "superAdmin" &&
    pull.checksPassing &&
    !pull.mergeBlockedReason;

  return (
    <article className="overflow-hidden rounded-xl border border-border/60 bg-card transition-shadow hover:shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-[0.6875rem] font-medium",
                type.color,
              )}
            >
              {type.label}
            </span>
            <span className="rounded-md bg-muted/60 px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground">
              {section}
            </span>
          </div>
          <h3 className="mt-1.5 truncate text-sm font-semibold text-foreground">
            {friendlyTitle(pull)}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <span>{pull.userLogin}</span>
            <span>·</span>
            <span>{formatTimeAgo(pull.updatedAt)}</span>
            <span>·</span>
            <span>
              {pull.files.length} file{pull.files.length !== 1 ? "s" : ""}
            </span>
          </p>
        </div>

        <span
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium",
            status.color,
          )}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {status.label}
        </span>
      </div>

      {/* Actions bar */}
      <div className="flex flex-wrap items-center gap-2 border-t border-border/40 bg-muted/20 px-4 py-2.5">
        <button
          type="button"
          onClick={() => setShowDiff(!showDiff)}
          className={cn(
            "inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors",
            showDiff
              ? "border-primary/30 bg-primary/5 text-primary"
              : "border-border/60 text-muted-foreground hover:text-foreground",
          )}
        >
          <Eye className="h-3 w-3" />
          {showDiff ? "Hide changes" : "Review changes"}
        </button>

        {pull.previewUrl && (
          <Link
            href={pull.previewUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border/60 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ExternalLink className="h-3 w-3" />
            Live preview
          </Link>
        )}

        <Link
          href={pull.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border/60 px-2.5 text-xs font-medium text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          title="View technical details on GitHub"
        >
          <ExternalLink className="h-3 w-3" />
          Details
        </Link>

        {canPublish && (
          <button
            type="button"
            onClick={() => onPublish(pull)}
            disabled={isBusy}
            className="ml-auto inline-flex h-7 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPublishing ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Rocket className="h-3 w-3" />
            )}
            Publish now
          </button>
        )}

        <button
          type="button"
          onClick={() => onDiscard(pull)}
          disabled={isBusy}
          className={cn(
            "inline-flex h-7 items-center gap-1.5 rounded-md border border-red-500/30 px-2.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/5 disabled:cursor-not-allowed disabled:opacity-40 dark:text-red-400",
            canPublish ? "" : "ml-auto",
          )}
        >
          {isDiscarding ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Trash2 className="h-3 w-3" />
          )}
          Discard
        </button>
      </div>

      {/* Warning */}
      {pull.mergeBlockedReason && (
        <div className="flex items-start gap-2 border-t border-amber-500/20 bg-amber-500/5 px-4 py-2.5">
          <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-xs text-amber-700 dark:text-amber-300">
            {humanizeBlockedReason(pull.mergeBlockedReason)}
          </p>
        </div>
      )}

      {/* Inline diff */}
      {showDiff && (
        <div className="border-t border-border/40 p-4">
          <DiffViewer pullNumber={pull.number} token={session.token} />
        </div>
      )}
    </article>
  );
}

// ── Main Component ───────────────────────────────────

export function AdminPullRequests({
  session,
}: {
  session: VerifiedAdminSession;
}) {
  const [pulls, setPulls] = useState<AdminPullRequestStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [publishingNumber, setPublishingNumber] = useState<number | null>(null);
  const [discardingNumber, setDiscardingNumber] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshPulls = useCallback(async () => {
    if (pulls.length) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError("");

    try {
      setPulls(await loadDashboardPullRequests(session.token));
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load pending items.",
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [session.token, pulls.length]);

  useEffect(() => {
    void refreshPulls();
  }, [refreshPulls]);

  async function publishPull(pull: AdminPullRequestStatus) {
    const confirmed = window.confirm(
      `Publish "${friendlyTitle(pull)}"? This will make it live on the website.`,
    );
    if (!confirmed) return;

    setPublishingNumber(pull.number);
    setError("");

    try {
      await publishDashboardPullRequest({
        token: session.token,
        role: session.role,
        pullNumber: pull.number,
      });
      await refreshPulls();
    } catch (publishError) {
      setError(
        publishError instanceof Error
          ? publishError.message
          : "Unable to publish.",
      );
    } finally {
      setPublishingNumber(null);
    }
  }

  async function discardPull(pull: AdminPullRequestStatus) {
    const confirmed = window.confirm(
      `Discard "${friendlyTitle(pull)}"? This will permanently remove this pending update.`,
    );
    if (!confirmed) return;

    setDiscardingNumber(pull.number);
    setError("");

    try {
      await discardDashboardPullRequest({
        token: session.token,
        pullNumber: pull.number,
      });
      await refreshPulls();
    } catch (discardError) {
      setError(
        discardError instanceof Error
          ? discardError.message
          : "Unable to discard.",
      );
    } finally {
      setDiscardingNumber(null);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Loading publish queue</p>
        </div>
      </div>
    );
  }

  const readyCount = pulls.filter(
    (p) => p.checksPassing && !p.mergeBlockedReason,
  ).length;
  const pendingCount = pulls.length - readyCount;

  return (
    <section className="mx-auto max-w-4xl space-y-4">
      {/* Summary bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-card px-4 py-3">
        <div className="flex items-center gap-4 text-xs">
          <span className="font-medium text-foreground">
            {pulls.length} pending {pulls.length === 1 ? "update" : "updates"}
          </span>
          {readyCount > 0 && (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3 w-3" />
              {readyCount} ready
            </span>
          )}
          {pendingCount > 0 && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              {pendingCount} processing
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => void refreshPulls()}
          disabled={isRefreshing}
          className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border/60 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        >
          <RefreshCw
            className={cn("h-3 w-3", isRefreshing && "animate-spin")}
          />
          Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {pulls.length ? (
        <div className="space-y-3">
          {pulls.map((pull) => (
            <QueueItem
              key={pull.number}
              pull={pull}
              session={session}
              publishingNumber={publishingNumber}
              discardingNumber={discardingNumber}
              onPublish={publishPull}
              onDiscard={discardPull}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            All caught up
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            No pending content updates. New drafts will appear here when saved
            from the editor.
          </p>
        </div>
      )}
    </section>
  );
}

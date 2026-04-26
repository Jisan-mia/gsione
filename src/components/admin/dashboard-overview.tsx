"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileStack,
  GitPullRequest,
  Loader2,
  PenLine,
  TrendingUp,
} from "lucide-react";
import { useDashboardSession } from "@/components/admin/dashboard-context";
import {
  adminSections,
  loadAdminContent,
  type AdminContentItem,
} from "@/lib/admin/content";
import {
  loadDashboardPullRequests,
  type AdminPullRequestStatus,
} from "@/lib/admin/workflow";
import { cn } from "@/lib/utils";

function countByStatus(
  items: AdminContentItem[],
  status: AdminContentItem["status"],
) {
  return items.filter((item) => item.status === status).length;
}

const sectionRouteMap: Record<string, string> = {
  articles: "articles",
  analysis: "analysis",
  podcast: "podcasts",
  training: "training",
  team: "team",
};

export function DashboardOverview() {
  const { session } = useDashboardSession();
  const [items, setItems] = useState<AdminContentItem[]>([]);
  const [pulls, setPulls] = useState<AdminPullRequestStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadOverview() {
      setIsLoading(true);
      setError("");

      try {
        const [nextItems, nextPulls] = await Promise.all([
          loadAdminContent(session.token),
          loadDashboardPullRequests(session.token),
        ]);

        if (isMounted) {
          setItems(nextItems);
          setPulls(nextPulls);
        }
      } catch (loadError) {
        if (!isMounted) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load dashboard overview.",
        );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadOverview();

    return () => {
      isMounted = false;
    };
  }, [session.token]);

  const statusCards = useMemo(
    () => [
      {
        label: "Published",
        value: countByStatus(items, "published"),
        icon: CheckCircle2,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500/10",
      },
      {
        label: "Drafts",
        value: countByStatus(items, "draft"),
        icon: PenLine,
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-500/10",
      },
      {
        label: "Archived",
        value: countByStatus(items, "archived"),
        icon: FileStack,
        color: "text-muted-foreground",
        bg: "bg-muted",
      },
      {
        label: "Open PRs",
        value: pulls.length,
        icon: GitPullRequest,
        color: "text-primary",
        bg: "bg-primary/10",
      },
    ],
    [items, pulls.length],
  );

  const sectionRows = useMemo(
    () =>
      adminSections.map((section) => {
        const sectionItems = items.filter(
          (item) => item.section === section.id,
        );

        return {
          ...section,
          total: sectionItems.length,
          published: countByStatus(sectionItems, "published"),
          draft: countByStatus(sectionItems, "draft"),
          archived: countByStatus(sectionItems, "archived"),
        };
      }),
    [items],
  );

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Loading overview</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm leading-6 text-destructive">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-5">
      {/* Stat cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statusCards.map((card) => (
          <article
            key={card.label}
            className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[0.8125rem] font-medium text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                  {card.value}
                </p>
              </div>
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  card.bg,
                )}
              >
                <card.icon className={cn("h-5 w-5", card.color)} />
              </div>
            </div>
            <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </article>
        ))}
      </section>

      {/* Sections breakdown */}
      <section className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="text-[0.8125rem] font-semibold text-foreground">
              Content breakdown
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">
            {items.length} total items
          </span>
        </div>

        <div className="grid grid-cols-[1.5fr_repeat(4,0.6fr)_0.4fr] items-center border-b border-border/40 px-5 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground/70">
          <span>Section</span>
          <span>Total</span>
          <span>Live</span>
          <span>Draft</span>
          <span>Archive</span>
          <span />
        </div>

        {sectionRows.map((row) => (
          <div
            key={row.id}
            className="group grid grid-cols-[1.5fr_repeat(4,0.6fr)_0.4fr] items-center border-b border-border/40 px-5 py-3 text-sm transition-colors last:border-b-0 hover:bg-muted/30"
          >
            <span className="font-medium text-foreground">{row.label}</span>
            <span className="tabular-nums text-foreground">{row.total}</span>
            <span className="tabular-nums text-emerald-600 dark:text-emerald-400">
              {row.published}
            </span>
            <span className="tabular-nums text-amber-600 dark:text-amber-400">
              {row.draft}
            </span>
            <span className="tabular-nums text-muted-foreground">
              {row.archived}
            </span>
            <Link
              href={`/dashboard/${sectionRouteMap[row.id] || row.id}`}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-primary/10 hover:text-primary group-hover:opacity-100"
              aria-label={`View ${row.label}`}
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Edit3,
  ExternalLink,
  Loader2,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useDashboardSession } from "@/components/admin/dashboard-context";
import {
  adminSections,
  loadAdminContent,
  type AdminContentItem,
  type AdminContentSection,
} from "@/lib/admin/content";
import {
  createDeleteContentPullRequest,
  loadDashboardPullRequests,
  type AdminPullRequestStatus,
} from "@/lib/admin/workflow";
import { cn } from "@/lib/utils";

function getRouteFromSection(section: AdminContentSection) {
  return section === "podcast" ? "podcasts" : section;
}

function getPrForItem(item: AdminContentItem, prs: AdminPullRequestStatus[]) {
  return prs.find(
    (pr) => pr.headRef === `dashboard/${item.section}/${item.slug}`,
  );
}

export function AdminContentList({
  section,
}: {
  section: AdminContentSection;
}) {
  const { session } = useDashboardSession();
  const [items, setItems] = useState<AdminContentItem[]>([]);
  const [pulls, setPulls] = useState<AdminPullRequestStatus[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const route = getRouteFromSection(section);
  const sectionLabel =
    adminSections.find((sectionItem) => sectionItem.id === section)?.label ||
    "Content";

  async function loadList() {
    setIsLoading(true);
    setError("");

    try {
      const [nextItems, nextPulls] = await Promise.all([
        loadAdminContent(session.token),
        loadDashboardPullRequests(session.token),
      ]);
      setItems(nextItems.filter((item) => item.section === section));
      setPulls(nextPulls);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load content.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadList();
  }, [section, session.token]);

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        `${item.title} ${item.summary} ${item.slug}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [items, query],
  );

  async function handleDelete(item: AdminContentItem) {
    const confirmed = window.confirm(
      `Create a delete PR for "${item.title}"? This will not delete from main until the PR is published.`,
    );

    if (!confirmed) return;

    setDeletingSlug(item.slug);
    setMessage("");
    setError("");

    try {
      const pull = await createDeleteContentPullRequest({
        token: session.token,
        item,
      });
      setMessage("Deletion request submitted. It will be processed shortly.");
      await loadList();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to create delete PR.",
      );
    } finally {
      setDeletingSlug("");
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            Loading {sectionLabel.toLowerCase()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-4">
      {/* Search + Create bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${sectionLabel.toLowerCase()}`}
            className="h-10 w-full rounded-lg border border-border/60 bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <Link
          href={`/dashboard/${route}/create`}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">
            Create {sectionLabel.slice(0, -1).toLowerCase()}
          </span>
          <span className="sm:hidden">Create</span>
        </Link>
      </div>

      {/* Alerts */}
      {error ? (
        <div className="flex items-start gap-2.5 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      ) : null}
      {message ? (
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
          {message}
        </div>
      ) : null}

      {/* Content table */}
      <section className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <div className="grid grid-cols-[2fr_0.6fr_1fr_0.8fr] items-center gap-0 border-b border-border/40 px-5 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground/70 lg:grid-cols-[2fr_0.6fr_1fr_0.8fr_auto]">
          <span>Title</span>
          <span>Status</span>
          <span>Slug</span>
          <span>PR</span>
          <span className="hidden lg:block">Actions</span>
        </div>

        {filteredItems.length ? (
          filteredItems.map((item) => {
            const pr = getPrForItem(item, pulls);

            return (
              <div
                key={item.path}
                className="group grid grid-cols-[2fr_0.6fr_1fr_0.8fr] items-center gap-0 border-b border-border/40 px-5 py-3 text-sm transition-colors last:border-b-0 hover:bg-muted/30 lg:grid-cols-[2fr_0.6fr_1fr_0.8fr_auto]"
              >
                <div className="min-w-0 pr-3">
                  <p className="truncate font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground/70">
                    {item.summary || item.path}
                  </p>
                </div>
                <div>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                      item.status === "published"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : item.status === "draft"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {item.status}
                  </span>
                </div>
                <span className="truncate pr-2 text-xs text-muted-foreground">
                  {item.slug}
                </span>
                <span className="text-sm text-muted-foreground">
                  {pr ? (
                    <Link
                      href={pr.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary transition-colors hover:text-primary/80"
                    >
                      #{pr.number}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  ) : (
                    <span className="text-muted-foreground/50">&mdash;</span>
                  )}
                </span>
                <div className="col-span-4 mt-2 flex flex-wrap gap-1.5 lg:col-span-1 lg:mt-0 lg:justify-end">
                  <Link
                    href={`/dashboard/${route}/edit/${item.slug}`}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border/60 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                  {session.role === "superAdmin" ? (
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      disabled={deletingSlug === item.slug}
                      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border/60 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/30 hover:text-destructive disabled:opacity-50"
                    >
                      {deletingSlug === item.slug ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      Delete
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">
            No {sectionLabel.toLowerCase()} found.
          </div>
        )}
      </section>
    </div>
  );
}

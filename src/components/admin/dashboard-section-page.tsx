"use client";

import Link from "next/link";
import { AdminContentList } from "@/components/admin/admin-content-list";
import { AdminPullRequests } from "@/components/admin/admin-pull-requests";
import { AdminSettings } from "@/components/admin/admin-settings";
import { useDashboardSession } from "@/components/admin/dashboard-context";
import type {
  AdminContentSection,
  AdminDashboardSectionRoute,
} from "@/lib/admin/content";

export const routeToSection: Partial<
  Record<AdminDashboardSectionRoute, AdminContentSection>
> = {
  articles: "articles",
  analysis: "analysis",
  podcasts: "podcast",
  training: "training",
  team: "team",
};

function MediaPage() {
  return (
    <section className="mx-auto max-w-3xl rounded-xl border border-border/60 bg-card p-6">
      <h2 className="text-[0.9375rem] font-semibold text-foreground">Media</h2>
      <p className="mt-2 text-[0.8125rem] leading-6 text-muted-foreground">
        Image uploads are attached inside create and edit flows. Add alt text,
        choose an image, then save the draft PR to commit the optimized WebP
        with the content file.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/dashboard/articles/create"
          className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm"
        >
          Create article
        </Link>
        <Link
          href="/dashboard/team/create"
          className="inline-flex h-9 items-center rounded-lg border border-border/60 px-4 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Create team member
        </Link>
      </div>
    </section>
  );
}

export function DashboardSectionPage({
  sectionRoute,
}: {
  sectionRoute: string;
}) {
  const { session } = useDashboardSession();
  const route = sectionRoute as AdminDashboardSectionRoute;
  const section = routeToSection[route];

  if (section) return <AdminContentList section={section} />;
  if (route === "media") return <MediaPage />;
  if (route === "pull-requests") return <AdminPullRequests session={session} />;
  if (route === "settings") return <AdminSettings session={session} />;

  return (
    <section className="mx-auto max-w-3xl rounded-xl border border-border/60 bg-card p-6">
      <h2 className="text-[0.9375rem] font-semibold text-foreground">
        Unknown route
      </h2>
      <Link
        href="/dashboard"
        className="mt-4 inline-flex h-9 items-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm"
      >
        Back to overview
      </Link>
    </section>
  );
}

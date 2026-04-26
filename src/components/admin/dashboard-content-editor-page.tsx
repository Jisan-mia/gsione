"use client";

import { AdminContentManager } from "@/components/admin/admin-content-manager";
import { useDashboardSession } from "@/components/admin/dashboard-context";
import type { AdminContentSection } from "@/lib/admin/content";

export function DashboardContentEditorPage({
  section,
  mode,
  slug,
}: {
  section: AdminContentSection;
  mode: "create" | "edit";
  slug?: string;
}) {
  const { session } = useDashboardSession();

  return (
    <AdminContentManager
      session={session}
      section={section}
      mode={mode}
      slug={slug}
    />
  );
}

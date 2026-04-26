import type { Metadata } from "next";
import { DashboardContentEditorPage } from "@/components/admin/dashboard-content-editor-page";
import type { AdminContentSection } from "@/lib/admin/content";
import { siteConfig } from "@/lib/site";

const routeToSection: Record<string, AdminContentSection> = {
  articles: "articles",
  analysis: "analysis",
  podcasts: "podcast",
  training: "training",
  team: "team",
};

export const metadata: Metadata = {
  title: `Create | ${siteConfig.shortName}`,
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return Object.keys(routeToSection).map((section) => ({ section }));
}

export default async function DashboardCreatePage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const contentSection = routeToSection[section] || "articles";

  return <DashboardContentEditorPage section={contentSection} mode="create" />;
}

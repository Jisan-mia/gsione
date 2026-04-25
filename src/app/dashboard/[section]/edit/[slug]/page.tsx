import { readdirSync } from "node:fs";
import { join } from "node:path";
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

const sectionDirectories: Record<string, string> = {
  articles: "content/articles",
  analysis: "content/analysis",
  podcasts: "content/podcast",
  training: "content/training",
  team: "content/team",
};

export const metadata: Metadata = {
  title: `Edit | ${siteConfig.shortName}`,
  robots: {
    index: false,
    follow: false,
  },
};

function getSlugs(directory: string) {
  try {
    return readdirSync(join(process.cwd(), directory))
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

export function generateStaticParams() {
  return Object.entries(sectionDirectories).flatMap(([section, directory]) =>
    getSlugs(directory).map((slug) => ({ section, slug })),
  );
}

export default async function DashboardEditPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const contentSection = routeToSection[section] || "articles";

  return (
    <DashboardContentEditorPage
      section={contentSection}
      mode="edit"
      slug={slug}
    />
  );
}

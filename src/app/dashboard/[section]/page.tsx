import type { Metadata } from "next";
import { DashboardSectionPage } from "@/components/admin/dashboard-section-page";
import { adminDashboardRoutes } from "@/lib/admin/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Dashboard | ${siteConfig.shortName}`,
  description: "Private route-based GitHub content dashboard for GSi.",
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return adminDashboardRoutes.map((item) => ({
    section: item.route,
  }));
}

export default async function DashboardSectionRoutePage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  return <DashboardSectionPage sectionRoute={section} />;
}

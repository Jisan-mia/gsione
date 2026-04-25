import type { Metadata } from "next";
import { DashboardOverview } from "@/components/admin/dashboard-overview";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Dashboard | ${siteConfig.shortName}`,
  description: "Private GitHub-backed dashboard overview for GSi.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <DashboardOverview />;
}

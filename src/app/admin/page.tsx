import type { Metadata } from "next";
import { AdminAuthPage } from "@/components/admin/admin-dashboard";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Admin | ${siteConfig.shortName}`,
  description: "Private GitHub-backed content dashboard for GSi.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminAuthPage />;
}

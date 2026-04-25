import { DashboardAppShell } from "@/components/admin/dashboard-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardAppShell>{children}</DashboardAppShell>;
}

"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site/footer";
import { GlobalEffects } from "@/components/site/global-effects";
import { SiteHeader } from "@/components/site/header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/");

  if (isAdminRoute) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <GlobalEffects />
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}

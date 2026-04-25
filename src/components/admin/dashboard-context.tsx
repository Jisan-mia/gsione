"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  GraduationCap,
  ImageIcon,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mic2,
  Newspaper,
  Radio,
  Settings,
  UsersRound,
} from "lucide-react";
import {
  clearAdminTokens,
  getRoleLabel,
  getStoredAdminToken,
  isAdminTokenRemembered,
  verifyAdminToken,
  type VerifiedAdminSession,
} from "@/lib/admin/github";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface DashboardSessionContextValue {
  session: VerifiedAdminSession;
  remembered: boolean;
}

const DashboardSessionContext =
  createContext<DashboardSessionContextValue | null>(null);

const navGroups = [
  {
    label: "Main",
    items: [{ label: "Overview", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { label: "Articles", href: "/dashboard/articles", icon: Newspaper },
      { label: "Analysis", href: "/dashboard/analysis", icon: BarChart3 },
      { label: "Podcasts", href: "/dashboard/podcasts", icon: Mic2 },
      { label: "Training", href: "/dashboard/training", icon: GraduationCap },
      { label: "Team", href: "/dashboard/team", icon: UsersRound },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Media", href: "/dashboard/media", icon: ImageIcon },
      { label: "Publish Queue", href: "/dashboard/pull-requests", icon: Radio },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

const titleMap = [
  { match: "/dashboard/articles", title: "Articles", eyebrow: "Content" },
  { match: "/dashboard/analysis", title: "Analysis", eyebrow: "Content" },
  { match: "/dashboard/podcasts", title: "Podcasts", eyebrow: "Content" },
  { match: "/dashboard/training", title: "Training", eyebrow: "Content" },
  { match: "/dashboard/team", title: "Team", eyebrow: "Content" },
  { match: "/dashboard/media", title: "Media", eyebrow: "Assets" },
  {
    match: "/dashboard/pull-requests",
    title: "Publish Queue",
    eyebrow: "Publishing",
  },
  { match: "/dashboard/settings", title: "Settings", eyebrow: "System" },
];

function isNavActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getRouteTitle(pathname: string) {
  return (
    titleMap.find((item) => pathname.startsWith(item.match)) || {
      title: "Overview",
      eyebrow: "Dashboard",
    }
  );
}

export function useDashboardSession() {
  const value = useContext(DashboardSessionContext);

  if (!value) {
    throw new Error(
      "useDashboardSession must be used inside DashboardAppShell.",
    );
  }

  return value;
}

export function DashboardAppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<VerifiedAdminSession | null>(null);
  const [remembered, setRemembered] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const routeTitle = getRouteTitle(pathname);

  const toggleSidebar = useCallback(
    () => setSidebarExpanded((prev) => !prev),
    [],
  );

  useEffect(() => {
    let isMounted = true;

    async function verifyStoredSession() {
      const token = getStoredAdminToken();

      if (!token) {
        router.replace("/admin");
        return;
      }

      try {
        const nextSession = await verifyAdminToken(token);

        if (!isMounted) return;

        setSession(nextSession);
        setRemembered(isAdminTokenRemembered(token));
      } catch {
        clearAdminTokens();
        router.replace("/admin");
      } finally {
        if (isMounted) setIsVerifying(false);
      }
    }

    void verifyStoredSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  function handleSignOut() {
    clearAdminTokens();
    router.replace("/admin");
  }

  if (isVerifying || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Verifying access
          </p>
        </div>
      </main>
    );
  }

  return (
    <DashboardSessionContext.Provider value={{ session, remembered }}>
      <main
        id="main-content"
        className="min-h-screen bg-muted/40 text-foreground"
      >
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border/60 bg-card shadow-sm transition-[width] duration-300 ease-in-out",
            sidebarExpanded ? "w-60" : "w-15",
          )}
        >
          {/* Logo area + toggle */}
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 px-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 overflow-hidden"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-border/50">
                <Image
                  src="/logo.webp"
                  alt={`${siteConfig.name} logo`}
                  width={24}
                  height={24}
                  className="object-contain"
                  priority
                />
              </span>
              <span
                className={cn(
                  "whitespace-nowrap text-sm font-semibold text-foreground transition-opacity duration-200",
                  sidebarExpanded
                    ? "opacity-100"
                    : "pointer-events-none opacity-0",
                )}
              >
                GSi Admin
              </span>
            </Link>
            <button
              type="button"
              onClick={toggleSidebar}
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                !sidebarExpanded &&
                  "absolute -right-3 top-3.5 z-10 rounded-full border border-border/60 bg-card shadow-sm",
              )}
              aria-label={
                sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "transition-transform duration-200",
                  !sidebarExpanded && "rotate-180",
                )}
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
                <path d="m14 9-3 3 3 3" />
              </svg>
            </button>
          </div>

          {/* Nav groups */}
          <nav
            className="flex-1 overflow-y-auto overflow-x-hidden py-3"
            aria-label="Dashboard navigation"
          >
            {navGroups.map((group, groupIndex) => (
              <div key={group.label} className={cn(groupIndex > 0 && "mt-4")}>
                <p
                  className={cn(
                    "mb-1 px-4 text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground/70 transition-opacity duration-200",
                    sidebarExpanded
                      ? "opacity-100"
                      : "pointer-events-none opacity-0",
                  )}
                >
                  {group.label}
                </p>
                <div className="space-y-0.5 px-2">
                  {group.items.map((item) => {
                    const active = isNavActive(pathname, item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={item.label}
                        className={cn(
                          "group/nav relative flex h-9 items-center gap-3 rounded-lg px-2.5 text-[0.8125rem] font-medium transition-all duration-150",
                          active
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <item.icon className="h-4.5 w-4.5 shrink-0" />
                        <span
                          className={cn(
                            "whitespace-nowrap transition-opacity duration-200",
                            sidebarExpanded
                              ? "opacity-100"
                              : "pointer-events-none opacity-0",
                          )}
                        >
                          {item.label}
                        </span>
                        {!sidebarExpanded && (
                          <span className="pointer-events-none absolute left-full z-50 ml-2 hidden whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-lg group-hover/nav:block">
                            {item.label}
                          </span>
                        )}
                        {active && (
                          <span className="absolute left-0 top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-r-full bg-primary" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Sidebar bottom spacer */}
          <div className="shrink-0 border-t border-border/60 p-2" />
        </aside>

        {/* Main area */}
        <section
          className={cn(
            "min-h-screen transition-[padding-left] duration-300 ease-in-out",
            sidebarExpanded ? "pl-60" : "pl-15",
          )}
        >
          {/* Topbar */}
          <header className="sticky top-0 z-40 flex h-14 items-center border-b border-border/60 bg-background/80 backdrop-blur-xl">
            <div className="flex h-full w-full items-center justify-between gap-4 px-5">
              <div className="min-w-0">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                  {routeTitle.eyebrow}
                </p>
                <h1 className="truncate text-[0.9375rem] font-semibold leading-tight text-foreground">
                  {routeTitle.title}
                </h1>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="hidden text-right sm:block">
                  <p className="text-[0.8125rem] font-medium text-foreground">
                    {session.user.name || session.user.login}
                  </p>
                  <p className="text-[0.6875rem] text-muted-foreground">
                    {getRoleLabel(session.role)} ·{" "}
                    {remembered ? "saved" : "session"}
                  </p>
                </div>
                <Image
                  src={session.user.avatarUrl}
                  alt={`${session.user.login} GitHub avatar`}
                  width={32}
                  height={32}
                  className="rounded-full ring-2 ring-border/50"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label="Sign out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="p-5">{children}</div>
        </section>
      </main>
    </DashboardSessionContext.Provider>
  );
}

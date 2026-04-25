"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { primaryNavigation, siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  return (
    <>
      {primaryNavigation.map((item) => {
        const sectionHash = item.href.startsWith("/#")
          ? item.href.slice(1)
          : "";

        const isActive = (() => {
          if (item.href === "/") {
            return pathname === "/" && hash === "";
          }

          if (sectionHash) {
            return pathname === "/" && hash === sectionHash;
          }

          return pathname === item.href;
        })();

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
              isActive
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:text-foreground",
              className,
            )}
          >
            {!isActive && (
              <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            )}
            <span className="relative">{item.label}</span>
          </Link>
        );
      })}
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // Restore document scroll if navigation changes while the menu is closing
  useEffect(() => {
    document.body.style.overflow = '';
  }, [pathname]);

  // Keep --header-h CSS variable in sync with actual header height
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const sync = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`,
      );
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;

    setScrolled(currentY > 20);

    // Hide on scroll down, show on scroll up (after 200px)
    if (currentY > 200) {
      setHidden(currentY > lastScrollY && currentY - lastScrollY > 5);
    } else {
      setHidden(false);
    }

    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile nav is open; always restore on cleanup
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Guarantee scroll is restored when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "border-border/70 bg-background/80 py-0 shadow-lg shadow-background/10 backdrop-blur-2xl"
          : "border-transparent bg-background/60 backdrop-blur-md",
        hidden && !mobileOpen && "-translate-y-full",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 lg:px-8",
          scrolled ? "py-2" : "py-3",
        )}
      >
        <Link href="/" className="group flex items-center gap-3">
          <span
            className={cn(
              "relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500",
              scrolled ? "h-9 w-9" : "h-11 w-11",
            )}
          >
            <Image
              src="/logo.webp"
              alt={`${siteConfig.name} logo`}
              fill
              sizes="44px"
              className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </span>
          <span className="min-w-0 leading-tight">
            <span
              className={cn(
                "block font-semibold tracking-wide text-foreground transition-all duration-500",
                scrolled ? "text-sm" : "text-sm sm:text-base",
              )}
            >
              <span className="sm:hidden">GSi</span>
              <span className="hidden sm:inline">
                Governance and Security Initiative – GSi
              </span>
            </span>
            <span
              className={cn(
                "block text-xs text-muted-foreground transition-all duration-500",
                scrolled && "hidden sm:block",
              )}
            >
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            className="btn-glow hidden rounded-full lg:inline-flex"
          >
            <Link href="/#contact">Start a conversation</Link>
          </Button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full border border-border/70 transition-all duration-300 lg:hidden",
              mobileOpen && "bg-primary text-primary-foreground border-primary",
            )}
          >
            <span
              className={cn(
                "absolute transition-all duration-300",
                mobileOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100",
              )}
            >
              <Menu className="h-5 w-5" />
            </span>
            <span
              className={cn(
                "absolute transition-all duration-300",
                mobileOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0",
              )}
            >
              <X className="h-5 w-5" />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile navigation overlay (portalled to body) ── */}
      {mobileOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-x-0 bottom-0 z-[60] overflow-y-auto bg-background lg:hidden"
            style={{ top: "var(--header-h, 57px)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav
              className="flex min-h-full flex-col px-6 py-8"
              aria-label="Mobile"
            >
              <div className="flex flex-1 flex-col gap-1">
                {primaryNavigation.map((item, i) => {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center gap-4 rounded-2xl px-4 py-4 text-lg font-medium text-foreground transition-all duration-300 hover:bg-primary/10 hover:pl-6"
                      style={{
                        animationDelay: `${i * 60}ms`,
                      }}
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40 transition-all duration-300 group-hover:bg-primary group-hover:scale-150" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-auto border-t border-border/70 pt-6">
                <Button
                  asChild
                  className="btn-glow w-full rounded-full text-base py-6"
                >
                  <Link href="/#contact" onClick={() => setMobileOpen(false)}>
                    Start a conversation
                  </Link>
                </Button>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </header>
  );
}

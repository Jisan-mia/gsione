"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { primaryNavigation, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const policyLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/cookies", label: "Cookie Policy" },
];

const socialLinks = [
  {
    href: siteConfig.socials.companyLinkedIn,
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: siteConfig.socials.facebook,
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: siteConfig.socials.instagram,
    label: "Instagram",
    icon: Instagram,
  },
];

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const columns = el.querySelectorAll(".footer-col");
    const socialIcons = el.querySelectorAll(".footer-social");

    gsap.fromTo(
      columns,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );

    gsap.fromTo(
      socialIcons,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        delay: 0.4,
      },
    );
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-border/70 bg-card/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="footer-col max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            {siteConfig.tagline}
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-balance text-foreground">
            Governance and Security Initiative - GSi
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-6 space-y-3 text-sm text-muted-foreground">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-start gap-3 transition-colors hover:text-foreground"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" />
              <span className="link-animated">{siteConfig.email}</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{siteConfig.location}</span>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
            Navigate
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 transition-all duration-300 hover:text-foreground hover:translate-x-1"
              >
                <span className="h-1 w-1 rounded-full bg-primary/0 transition-all duration-300 group-hover:bg-primary group-hover:w-2" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
            Policies & channels
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
            {policyLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 transition-all duration-300 hover:text-foreground hover:translate-x-1"
              >
                <span className="h-1 w-1 rounded-full bg-primary/0 transition-all duration-300 group-hover:bg-primary group-hover:w-2" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className={cn(
                  "footer-social rounded-full border border-border/70 p-2.5 text-muted-foreground",
                  "transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/10",
                  "hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10",
                )}
              >
                <item.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top + copyright */}
      <div className="border-t border-border/70 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
            aria-label="Scroll back to top"
          >
            Back to top
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

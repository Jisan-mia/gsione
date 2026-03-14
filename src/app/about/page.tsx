import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatedSection,
  StaggerChildren,
} from "@/components/site/animated-section";
import { getBaseMetadata } from "@/lib/content";
import { founderProfile, organizationProfile, siteConfig } from "@/lib/site";

export const metadata: Metadata = getBaseMetadata({
  title: "About",
  description:
    "About the Governance and Security Initiative — leadership, research areas, publications, and public engagement by Asheer Shah.",
  pathName: "/about",
  ogImagePath: "/about/opengraph-image",
  keywords: [
    "GSi leadership",
    "Asheer Shah",
    "Governance and Security Initiative",
    "policy research Bangladesh",
    "gsithinktank about",
  ],
});

export default function AboutPage() {
  return (
    <main id="main-content">
      {/* ── Overview ─────────────────────────────────────────── */}
      <section className="section-space border-b border-border/60">
        <div className="page-shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <AnimatedSection>
            <span className="eyebrow">About GSi</span>
            <h1 className="mt-5 text-5xl font-semibold text-balance text-foreground sm:text-6xl">
              A public-facing platform for governance, security, and technology
              policy.
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              {organizationProfile.overview}
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
              {organizationProfile.positioning}
            </p>
          </AnimatedSection>
          <AnimatedSection animation="slideRight" delay={0.2}>
            <aside className="section-card p-6 sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Principles
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                {organizationProfile.principles.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-[1.5rem] border border-border/70 bg-background p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Location</p>
                <p className="mt-2">{siteConfig.location}</p>
              </div>
            </aside>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────────── */}
      <section className="section-space">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Leadership</span>
              <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                The expertise and vision driving GSi forward.
              </h2>
            </div>
          </AnimatedSection>
          <div className="mt-10">
            <AnimatedSection animation="scaleIn">
              <article
                id={founderProfile.id}
                className="section-card mx-auto grid max-w-6xl gap-8 overflow-hidden p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10 lg:p-8"
              >
                <div className="relative mx-auto w-full max-w-[34rem]">
                  <div className="relative mx-auto aspect-[4/5] max-w-[30rem] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={founderProfile.image}
                      alt={founderProfile.name}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 36vw, 100vw"
                      priority
                    />
                  </div>
                </div>
                <div className="mx-auto flex h-full w-full max-w-[42rem] flex-col justify-center py-2 sm:py-4">
                  <span className="eyebrow w-fit">{founderProfile.role}</span>
                  <h2 className="mt-5 text-4xl font-semibold text-foreground sm:text-5xl">
                    {founderProfile.name}
                  </h2>
                  <p className="mt-3 text-lg text-primary">
                    {founderProfile.affiliation}
                  </p>
                  <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
                    {founderProfile.introduction.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {founderProfile.socialLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                      >
                        {link.label}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </a>
                    ))}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-md"
                    >
                      Contact GSi
                    </a>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Background ───────────────────────────────────────── */}
      <section className="section-space border-y border-border/60 bg-card/45">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Background</span>
              <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                Academic and professional foundations.
              </h2>
            </div>
          </AnimatedSection>
          <div className="mt-10">
            <AnimatedSection animation="fadeUp" delay={0.1}>
              <article className="section-card p-6 sm:p-7">
                <h3 className="text-3xl font-semibold text-foreground">
                  {founderProfile.name}
                </h3>
                <p className="mt-2 text-base text-primary">
                  {founderProfile.role}
                </p>
                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                      Education
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                      {founderProfile.educationList.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                      Experience
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                      {founderProfile.experienceList.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Areas of work ────────────────────────────────────── */}
      <section className="section-space">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Areas of work</span>
              <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                Research and training areas.
              </h2>
            </div>
          </AnimatedSection>
          <StaggerChildren
            className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            staggerDelay={0.08}
          >
            {founderProfile.expertise.map((item) => (
              <article key={item} className="section-card-interactive p-6">
                <h3 className="text-2xl font-semibold text-foreground">
                  {item}
                </h3>
              </article>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Publications ─────────────────────────────────────── */}
      <section className="section-space border-y border-border/60 bg-card/45">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Selected publications</span>
              <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                Publications and writing.
              </h2>
            </div>
          </AnimatedSection>
          <StaggerChildren
            className="mt-10 grid gap-5 lg:grid-cols-2"
            staggerDelay={0.1}
          >
            {founderProfile.publications.map((publication) => (
              <article
                key={publication.title}
                className="section-card-interactive p-6 sm:p-7"
              >
                <p className="text-sm text-primary">{publication.year}</p>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">
                  {publication.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {publication.venue}
                </p>
                {publication.href ? (
                  <a
                    href={publication.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-accent"
                  >
                    Open source
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                ) : null}
              </article>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Public engagement ────────────────────────────────── */}
      <section className="section-space">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Public engagement</span>
              <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                Commentary, dialogue, and public-facing participation.
              </h2>
            </div>
          </AnimatedSection>
          <StaggerChildren
            className="mt-10 grid gap-5 lg:grid-cols-3"
            staggerDelay={0.1}
          >
            {founderProfile.engagements.map((item) => (
              <article
                key={item.title}
                className="section-card-interactive p-6"
              >
                <h3 className="text-2xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {item.detail}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-accent"
                  >
                    Open reference
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                ) : null}
              </article>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-space border-t border-border/60">
        <div className="page-shell">
          <AnimatedSection animation="scaleIn">
            <div className="section-card p-6 sm:p-8">
              <h2 className="text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                Explore our articles and training programmes.
              </h2>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/articles"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                >
                  Read GSi Articles
                </Link>
                <Link
                  href="/training"
                  className="inline-flex items-center justify-center rounded-full border border-border/80 bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-md"
                >
                  Review training areas
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

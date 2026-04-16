import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatedSection,
  StaggerChildren,
} from "@/components/site/animated-section";
import {
  TextReveal,
  RevealMask,
  Magnetic,
  AnimatedLine,
  CursorGlow,
} from "@/components/site/interactive";
import { getBaseMetadata } from "@/lib/content";
import {
  founderProfile,
  organizationProfile,
  siteConfig,
  teamMembers,
} from "@/lib/site";

export const metadata: Metadata = getBaseMetadata({
  title: "About",
  description:
    "About the Governance and Security Initiative — leadership, research team, publications, and public engagement.",
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
            <span className="eyebrow shimmer">About GSi</span>
            <TextReveal
              as="h1"
              className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl lg:text-6xl"
            >
              A public-facing platform for governance, security, and technology
              policy.
            </TextReveal>
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
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-border/70 bg-background p-4 text-sm text-muted-foreground sm:rounded-2xl">
                <p className="font-medium text-foreground">Location</p>
                <p className="mt-2">{siteConfig.location}</p>
              </div>
            </aside>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Founder ──────────────────────────────────────────── */}
      <section className="section-space">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Founder &amp; Director</span>
              <TextReveal
                as="h2"
                className="mt-5 text-3xl font-semibold text-balance text-foreground sm:text-4xl lg:text-5xl"
              >
                The expertise and vision driving GSi forward.
              </TextReveal>
            </div>
          </AnimatedSection>
          <AnimatedLine className="mt-8" />

          <div className="mt-10">
            <AnimatedSection animation="scaleIn">
              <article
                id={founderProfile.id}
                className="section-card grid gap-8 overflow-hidden p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10 lg:p-8"
              >
                <RevealMask direction="left" delay={0.2}>
                  <div className="relative mx-auto w-full max-w-136">
                    <div className="relative mx-auto aspect-4/5 max-w-120 overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl">
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
                </RevealMask>
                <div className="mx-auto flex h-full w-full max-w-2xl flex-col justify-center py-2 sm:py-4">
                  <span className="eyebrow w-fit">{founderProfile.role}</span>
                  <h3 className="mt-5 text-3xl font-semibold text-foreground sm:text-4xl">
                    {founderProfile.name}
                  </h3>
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
                      <Magnetic key={link.href} strength={0.12}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-glow inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                        >
                          {link.label}
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </a>
                      </Magnetic>
                    ))}
                    <Magnetic strength={0.12}>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-md"
                      >
                        Contact GSi
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          </div>

          {/* Founder background - education & experience */}
          <div className="mt-8">
            <AnimatedSection animation="fadeUp" delay={0.1}>
              <div className="section-card p-6 sm:p-7">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                      Education
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                      {founderProfile.educationList.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
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
                          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Research Team ────────────────────────────────────── */}
      <section className="section-space border-y border-border/60 bg-card/45">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Research Team</span>
              <TextReveal
                as="h2"
                className="mt-5 text-3xl font-semibold text-balance text-foreground sm:text-4xl lg:text-5xl"
              >
                Researchers contributing to GSi&apos;s work.
              </TextReveal>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                GSi&apos;s research team brings together emerging scholars
                working across cybersecurity, digital rights, governance, and
                environmental policy.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedLine className="mt-8" />
          <div className="mt-10 space-y-6">
            {teamMembers.map((member, idx) => (
              <AnimatedSection
                key={member.id}
                animation="fadeUp"
                delay={idx * 0.1}
              >
                <article className="section-card overflow-hidden">
                  <div
                    className={`grid gap-0 lg:grid-cols-[0.4fr_0.6fr] ${idx % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
                  >
                    {/* Image or avatar placeholder */}
                    <div
                      className={`relative bg-muted/30 ${idx % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
                    >
                      {member.image ? (
                        <div className="relative aspect-square w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-80">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover object-top"
                            sizes="(min-width: 1024px) 40vw, 100vw"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-square w-full items-center justify-center bg-primary/5 lg:aspect-auto lg:h-full lg:min-h-80">
                          <span className="text-6xl font-bold text-primary/20">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div
                      className={`flex flex-col justify-center p-6 sm:p-8 ${idx % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                        {member.role}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                        {member.name}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                        {member.bio}
                      </p>

                      {/* Articles */}
                      {member.articles.length > 0 && (
                        <div className="mt-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                            Articles
                          </p>
                          <ul className="mt-3 space-y-2">
                            {member.articles.map((article) => (
                              <li
                                key={article}
                                className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <span>{article}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Focus areas as tags */}
                      {member.areas && member.areas.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {member.areas.map((area) => (
                            <span
                              key={area}
                              className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-muted-foreground"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research Areas ───────────────────────────────────── */}
      <section className="section-space">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Areas of work</span>
              <TextReveal
                as="h2"
                className="mt-5 text-3xl font-semibold text-balance text-foreground sm:text-4xl lg:text-5xl"
              >
                Research and training domains.
              </TextReveal>
            </div>
          </AnimatedSection>
          <AnimatedLine className="mt-8" />
          <StaggerChildren
            className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            staggerDelay={0.08}
          >
            {founderProfile.expertise.map((item) => (
              <CursorGlow key={item}>
                <article className="section-card-interactive flex h-full items-center p-6">
                  <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                    {item}
                  </h3>
                </article>
              </CursorGlow>
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
              <TextReveal
                as="h2"
                className="mt-5 text-3xl font-semibold text-balance text-foreground sm:text-4xl lg:text-5xl"
              >
                Published research and writing.
              </TextReveal>
            </div>
          </AnimatedSection>
          <AnimatedLine className="mt-8" />
          <StaggerChildren
            className="mt-10 grid gap-5 lg:grid-cols-2"
            staggerDelay={0.1}
          >
            {founderProfile.publications.map((publication) => (
              <CursorGlow key={publication.title}>
                <article className="section-card-interactive flex h-full flex-col p-6 sm:p-7">
                  <p className="text-sm font-semibold text-primary">
                    {publication.year}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                    {publication.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground sm:text-base">
                    {publication.venue}
                  </p>
                  {publication.href ? (
                    <a
                      href={publication.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent"
                    >
                      View publication
                      <ArrowUpRight className="h-4 w-4 shrink-0" />
                    </a>
                  ) : null}
                </article>
              </CursorGlow>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Public Engagement ────────────────────────────────── */}
      <section className="section-space">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Public engagement</span>
              <TextReveal
                as="h2"
                className="mt-5 text-3xl font-semibold text-balance text-foreground sm:text-4xl lg:text-5xl"
              >
                Commentary, dialogue, and public-facing participation.
              </TextReveal>
            </div>
          </AnimatedSection>
          <AnimatedLine className="mt-8" />
          <StaggerChildren
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.1}
          >
            {founderProfile.engagements.map((item) => (
              <CursorGlow key={item.title}>
                <article className="section-card-interactive flex h-full flex-col p-6">
                  <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground sm:text-base">
                    {item.detail}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent"
                    >
                      View reference
                      <ArrowUpRight className="h-4 w-4 shrink-0" />
                    </a>
                  ) : null}
                </article>
              </CursorGlow>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-space border-t border-border/60">
        <div className="page-shell">
          <AnimatedSection animation="scaleIn">
            <div className="section-card p-6 sm:p-8">
              <TextReveal
                as="h2"
                className="text-3xl font-semibold text-balance text-foreground sm:text-4xl lg:text-5xl"
              >
                Explore our articles and training programmes.
              </TextReveal>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Magnetic strength={0.12}>
                  <Link
                    href="/articles"
                    className="btn-glow inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                  >
                    Read Articles
                  </Link>
                </Magnetic>
                <Magnetic strength={0.12}>
                  <Link
                    href="/training"
                    className="inline-flex items-center justify-center rounded-full border border-border/80 bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-md"
                  >
                    Review training areas
                  </Link>
                </Magnetic>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

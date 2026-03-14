import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Landmark,
  MonitorCog,
  RadioTower,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";
import {
  AnimatedSection,
  AnimatedCounter,
  HeroAnimation,
  StaggerChildren,
} from "@/components/site/animated-section";
import { ContactForm } from "@/components/site/contact-form";
import {
  getFeaturedBlogPosts,
  getFeaturedTrainingPrograms,
} from "@/lib/content";
import { founderProfile, homeContent, siteConfig } from "@/lib/site";

const focusIcons = [
  ShieldCheck,
  MonitorCog,
  RadioTower,
  Landmark,
  Sprout,
  Users,
];

const stats = [
  { value: 6, suffix: "+", label: "Focus Areas" },
  { value: 4, suffix: "+", label: "Training Tracks" },
  { value: 7, suffix: "+", label: "Published Papers" },
  { value: 3, suffix: "+", label: "Countries Spanned" },
];

export default function HomePage() {
  const featuredPosts = getFeaturedBlogPosts().slice(0, 3);
  const featuredPrograms = getFeaturedTrainingPrograms().slice(0, 2);

  return (
    <main id="main-content">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero-gradient overflow-hidden border-b border-border/60">
        <div className="page-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <HeroAnimation>
            <div>
              <span className="eyebrow">{homeContent.hero.eyebrow}</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
              {homeContent.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              {homeContent.hero.description}
            </p>
            <ul className="mt-8 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
              {homeContent.hero.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
              >
                Explore the profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-md"
              >
                Read GSi Articles
              </Link>
            </div>
          </HeroAnimation>

          <AnimatedSection animation="slideRight" delay={0.3}>
            <div className="hero-grid section-card relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              <div className="relative space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    What GSi brings together
                  </p>
                  <div className="mt-4 grid gap-3">
                    {homeContent.proof.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.5rem] border border-border/70 bg-background/85 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-sm"
                      >
                        <h2 className="text-xl font-semibold text-foreground">
                          {item.title}
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-border/70 bg-primary px-5 py-4 text-primary-foreground">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                    Base
                  </p>
                  <p className="mt-2 text-base">{siteConfig.location}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <section className="border-b border-border/60 bg-primary/5">
        <div className="page-shell py-10 sm:py-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary sm:text-5xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section id="services" className="section-space">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">What we do</span>
              <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                Research, training, and policy engagement across critical
                governance challenges.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                GSi works across research, public commentary, training, and
                issue-based initiatives bridging governance, national security,
                cybersecurity, and AI policy.
              </p>
            </div>
          </AnimatedSection>
          <StaggerChildren
            className="mt-10 grid gap-5 lg:grid-cols-2"
            staggerDelay={0.12}
          >
            {homeContent.services.map((service) => (
              <article
                key={service.title}
                className="section-card-interactive p-6 sm:p-7"
              >
                <h3 className="text-2xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Focus areas ──────────────────────────────────────── */}
      <section className="section-space border-y border-border/60 bg-card/45">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Focus areas</span>
              <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                Policy domains that define our work and structure our analysis.
              </h2>
            </div>
          </AnimatedSection>
          <StaggerChildren
            className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            staggerDelay={0.1}
          >
            {homeContent.focusAreas.map((item, index) => {
              const Icon = focusIcons[index];

              return (
                <article
                  key={item.title}
                  className="section-card-interactive p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────────── */}
      <section className="section-space">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Leadership</span>
              <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                Setting the direction for governance-focused research and
                training.
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                GSi is led by a founder with a background in governance,
                international affairs, cybersecurity, policy research, and
                public-facing institutional engagement.
              </p>
            </div>
          </AnimatedSection>
          <div className="mt-10">
            <AnimatedSection animation="scaleIn">
              <article className="section-card mx-auto grid max-w-6xl gap-8 overflow-hidden p-5 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10 lg:p-8">
                <div className="relative mx-auto w-full max-w-[34rem]">
                  <div className="relative mx-auto aspect-[4/5] max-w-[30rem] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={founderProfile.image}
                      alt={founderProfile.name}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      priority
                    />
                  </div>
                </div>
                <div className="mx-auto flex h-full w-full max-w-[42rem] flex-col justify-center py-2 sm:py-4">
                  <span className="eyebrow w-fit">{founderProfile.role}</span>
                  <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                    {founderProfile.name}
                  </h2>
                  <p className="mt-3 text-lg text-primary">
                    {founderProfile.affiliation}
                  </p>
                  <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
                    {founderProfile.introduction
                      .slice(0, 2)
                      .map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                  </div>
                  <ul className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {founderProfile.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/about#${founderProfile.id}`}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                    >
                      View full profile
                    </Link>
                    {founderProfile.socialLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-md"
                      >
                        {link.label}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Training ─────────────────────────────────────────── */}
      <section
        id="training"
        className="section-space border-y border-border/60 bg-card/45"
      >
        <div className="page-shell">
          <AnimatedSection>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <span className="eyebrow">Training</span>
                <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                  Executive training programmes tailored for institutional
                  impact.
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  Credible programme tracks that can be adapted for leadership
                  teams, media organisations, universities, regulators, NGOs,
                  and mission-driven partners.
                </p>
              </div>
              <Link
                href="/training"
                className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                Browse all training areas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
          <StaggerChildren
            className="mt-10 grid gap-5 lg:grid-cols-2"
            staggerDelay={0.15}
          >
            {featuredPrograms.map((program) => (
              <article
                key={program.slug}
                className="section-card-interactive p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    {program.level}
                  </p>
                </div>
                <h3 className="mt-4 text-3xl font-semibold text-foreground">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {program.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {program.focusAreas.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm text-muted-foreground">
                  {program.duration} · {program.format}
                </p>
                <Link
                  href={`/training/${program.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-accent"
                >
                  View programme details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </article>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── GSi Articles ─────────────────────────────────────── */}
      <section id="research" className="section-space">
        <div className="page-shell">
          <AnimatedSection>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <span className="eyebrow">GSi Articles</span>
                <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                  Expert analysis on governance, cybersecurity, and policy
                  reform.
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  In-depth articles covering cybersecurity governance, AI
                  policy, information integrity, environmental risk, and public
                  accountability.
                </p>
              </div>
              <Link
                href="/articles"
                className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                Browse all articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
          <StaggerChildren
            className="mt-10 grid gap-5 lg:grid-cols-3"
            staggerDelay={0.12}
          >
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/articles/${post.slug}`}
                className="group"
              >
                <article className="section-card-interactive flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                      {post.category}
                    </p>
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold text-balance text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground sm:text-base">
                    {post.excerpt}
                  </p>
                  <p className="mt-5 text-sm text-muted-foreground">
                    {post.author} · {post.readingTime}
                  </p>
                  <span className="mt-6 inline-flex items-center text-sm font-medium text-primary transition-colors group-hover:text-accent">
                    Read full article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </article>
              </Link>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Initiatives ──────────────────────────────────────── */}
      <section className="section-space border-y border-border/60 bg-card/45">
        <div className="page-shell">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="eyebrow">Public-interest initiatives</span>
              <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                Connecting policy research with community action.
              </h2>
            </div>
          </AnimatedSection>
          <StaggerChildren
            className="mt-10 grid gap-5 lg:grid-cols-2"
            staggerDelay={0.15}
          >
            {homeContent.initiatives.map((initiative) => (
              <article
                key={initiative.title}
                className="section-card-interactive p-6 sm:p-7"
              >
                <h3 className="text-2xl font-semibold text-foreground">
                  {initiative.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {initiative.description}
                </p>
              </article>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section id="contact" className="section-space">
        <div className="page-shell">
          <AnimatedSection animation="scaleIn">
            <ContactForm />
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import {
  AnimatedSection,
  StaggerChildren,
} from "@/components/site/animated-section";
import {
  TextReveal,
  CursorGlow,
  AnimatedLine,
} from "@/components/site/interactive";
import { getBaseMetadata, getTrainingPrograms } from "@/lib/content";

export const metadata: Metadata = getBaseMetadata({
  title: "Training",
  description:
    "Institutional training programmes in cyber governance, AI policy, strategic risk, and public policy analysis by GSi.",
  pathName: "/training",
  ogImagePath: "/training/opengraph-image",
  keywords: [
    "GSi training",
    "cyber governance training",
    "AI policy workshop",
    "Bangladesh institutional training",
    "public policy training",
    "gsithinktank training",
  ],
});

export default function TrainingPage() {
  const programs = getTrainingPrograms();

  return (
    <main id="main-content">
      <section className="section-space border-b border-border/60">
        <div className="page-shell">
          <AnimatedSection>
            <span className="eyebrow shimmer">Training</span>
            <TextReveal
              as="h1"
              className="mt-5 max-w-4xl text-5xl font-semibold text-balance text-foreground sm:text-6xl"
            >
              Executive training programmes tailored for institutional
              audiences.
            </TextReveal>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              Each programme can be adapted for leadership teams, media
              organisations, universities, regulators, NGOs, and mission-driven
              partners across governance, cybersecurity, AI policy, and
              strategic risk.
            </p>
          </AnimatedSection>
          <AnimatedLine className="mt-8" />
        </div>
      </section>

      <section className="section-space">
        <StaggerChildren
          className="page-shell grid gap-5 lg:grid-cols-2"
          staggerDelay={0.12}
        >
          {programs.map((program) => (
            <Link
              key={program.slug}
              href={`/training/${program.slug}`}
              className="group h-full"
            >
              <CursorGlow>
                <article className="section-card-interactive flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-primary">
                      <span>{program.level}</span>
                      <span className="text-muted-foreground">&middot;</span>
                      <span>{program.duration}</span>
                    </div>
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold text-balance text-foreground transition-colors group-hover:text-primary">
                    {program.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground sm:text-base">
                    {program.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {program.focusAreas.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-muted-foreground transition-colors duration-300 group-hover:border-primary/30"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-sm text-muted-foreground">
                    {program.format}
                  </p>
                  <span className="mt-6 inline-flex items-center text-sm font-medium text-primary transition-colors group-hover:text-accent">
                    View programme details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                </article>
              </CursorGlow>
            </Link>
          ))}
        </StaggerChildren>
      </section>
    </main>
  );
}

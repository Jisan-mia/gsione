import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBaseMetadata, getTrainingPrograms } from '@/lib/content'

export const metadata: Metadata = getBaseMetadata({
  title: 'Training',
  description:
    'Institutional training areas built around GSi’s real work in cyber governance, AI policy, strategic risk, and public policy analysis.',
  pathName: '/training',
  ogImagePath: '/training/opengraph-image',
  keywords: [
    'GSi training',
    'cyber governance training',
    'AI policy workshop',
    'Bangladesh institutional training',
    'public policy training',
  ],
})

export default function TrainingPage() {
  const programs = getTrainingPrograms()

  return (
    <main id="main-content">
      <section className="section-space border-b border-border/60">
        <div className="page-shell">
          <span className="eyebrow">Training</span>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold text-balance text-foreground sm:text-6xl">
            Programme tracks for real institutions, not made-up open-enrolment hype.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            These pages describe the areas GSi can deliver credibly based on the founder’s public
            work and source material. Each programme can be adapted for leadership teams, media
            organisations, universities, regulators, NGOs, and mission-driven partners.
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-5 lg:grid-cols-2">
          {programs.map((program) => (
            <article key={program.slug} className="section-card p-6 sm:p-7">
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-primary">
                <span>{program.level}</span>
                <span className="text-muted-foreground">•</span>
                <span>{program.duration}</span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-balance text-foreground">
                {program.title}
              </h2>
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
              <p className="mt-5 text-sm text-muted-foreground">{program.format}</p>
              <Link
                href={`/training/${program.slug}`}
                className="mt-6 inline-flex items-center text-sm font-medium text-primary"
              >
                View programme details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Markdown } from '@/components/site/markdown'
import {
  getBaseMetadata,
  getTrainingProgramBySlug,
  getTrainingPrograms,
} from '@/lib/content'

export function generateStaticParams() {
  return getTrainingPrograms().map((program) => ({ slug: program.slug }))
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const program = getTrainingProgramBySlug(slug)

    if (!program) {
      return getBaseMetadata({
        title: 'Training programme not found',
        pathName: `/training/${slug}`,
      })
    }

    return getBaseMetadata({
      title: program.title,
      description: program.summary,
      pathName: `/training/${program.slug}`,
    })
  })
}

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const program = getTrainingProgramBySlug(slug)

  if (!program) {
    notFound()
  }

  return (
    <main id="main-content">
      <section className="section-space border-b border-border/60">
        <div className="page-shell max-w-4xl">
          <Link href="/training" className="inline-flex items-center text-sm text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to training
          </Link>
          <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-primary">
            <span>{program.level}</span>
            <span className="text-muted-foreground">•</span>
            <span>{program.duration}</span>
            <span className="text-muted-foreground">•</span>
            <span>{program.format}</span>
          </div>
          <h1 className="mt-5 text-5xl font-semibold text-balance text-foreground sm:text-6xl">
            {program.title}
          </h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
            {program.summary}
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="section-card p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Audience
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
                {program.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="section-card p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Focus areas
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
                {program.focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="section-card p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Outcomes
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
                {program.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell max-w-4xl">
          <article className="section-card p-6 sm:p-8 lg:p-10">
            <Markdown content={program.content} />
          </article>
          <div className="section-card mt-10 p-6 sm:p-7">
            <h2 className="text-3xl font-semibold text-foreground">Discuss this programme</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              GSi can tailor this training area for institutional audiences, leadership teams,
              media organisations, and partner programmes.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              Start a training inquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getBaseMetadata } from '@/lib/content'
import { founderProfile, organizationProfile, siteConfig } from '@/lib/site'

export const metadata: Metadata = getBaseMetadata({
  title: 'About',
  description:
    'About the Governance and Security Initiative and founder Asheer Shah, including biography, research areas, publications, and public engagement.',
  pathName: '/about',
})

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="section-space border-b border-border/60">
        <div className="page-shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className="eyebrow">About GSi</span>
            <h1 className="mt-5 text-5xl font-semibold text-balance text-foreground sm:text-6xl">
              A public-facing platform for governance, security, and technology policy.
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              {organizationProfile.overview}
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
              {organizationProfile.positioning}
            </p>
          </div>
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
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="section-card relative overflow-hidden p-4 sm:p-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src={founderProfile.image}
                alt={founderProfile.name}
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 36vw, 100vw"
                priority
              />
            </div>
          </div>
          <div>
            <span className="eyebrow">Founder</span>
            <h2 className="mt-5 text-4xl font-semibold text-foreground sm:text-5xl">
              {founderProfile.name}
            </h2>
            <p className="mt-3 text-lg text-primary">{founderProfile.role}</p>
            <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
              {founderProfile.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.socials.founderLinkedIn}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                Founder LinkedIn
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Contact GSi
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-border/60 bg-card/45">
        <div className="page-shell grid gap-6 lg:grid-cols-2">
          <div className="section-card p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Education
            </p>
            <div className="mt-5 space-y-5">
              {founderProfile.education.map((entry) => (
                <article key={entry.title}>
                  <h3 className="text-2xl font-semibold text-foreground">{entry.title}</h3>
                  <p className="mt-2 text-base text-primary">{entry.subtitle}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {entry.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="section-card p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Experience
            </p>
            <div className="mt-5 space-y-5">
              {founderProfile.experience.map((entry) => (
                <article key={entry.title}>
                  <h3 className="text-2xl font-semibold text-foreground">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {entry.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Expertise</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              Research and training areas anchored in actual work.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {founderProfile.expertise.map((item) => (
              <article key={item} className="section-card p-6">
                <h3 className="text-2xl font-semibold text-foreground">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-border/60 bg-card/45">
        <div className="page-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Publications</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              Selected writing and research contributions.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {founderProfile.publications.map((publication) => (
              <article key={publication.title} className="section-card p-6 sm:p-7">
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
                    className="mt-5 inline-flex items-center text-sm font-medium text-primary"
                  >
                    Open source
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Public engagement</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              Commentary, dialogue, and public-facing participation.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {founderProfile.engagements.map((item) => (
              <article key={item.title} className="section-card p-6">
                <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {item.detail}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center text-sm font-medium text-primary"
                  >
                    Open reference
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-t border-border/60">
        <div className="page-shell">
          <div className="section-card p-6 sm:p-8">
            <h2 className="text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              Continue with the writing and training pages.
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                Read the blog
              </Link>
              <Link
                href="/training"
                className="inline-flex items-center justify-center rounded-full border border-border/80 bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Review training areas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

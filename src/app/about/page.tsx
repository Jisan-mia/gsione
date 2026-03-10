import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getBaseMetadata } from '@/lib/content'
import {
  founderProfile,
  leadershipProfiles,
  organizationProfile,
  siteConfig,
} from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = getBaseMetadata({
  title: 'About',
  description:
    'About the Governance and Security Initiative, including leadership profiles for Asheer Shah and Mohammad M.H. Joy, research areas, publications, and public engagement.',
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
        <div className="page-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Leadership</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              GSi is built and led through two distinct but complementary profiles.
            </h2>
          </div>
          <div className="mt-10 space-y-8">
            {leadershipProfiles.map((profile, index) => (
              <article
                key={profile.id}
                id={profile.id}
                className="section-card mx-auto grid max-w-6xl gap-8 overflow-hidden p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10 lg:p-8"
              >
                <div
                  className={cn(
                    'relative mx-auto w-full max-w-[34rem]',
                    index % 2 === 1 && 'lg:order-2',
                  )}
                >
                  <div className="relative mx-auto aspect-[4/5] max-w-[30rem] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 36vw, 100vw"
                      priority={index === 0}
                    />
                  </div>
                </div>
                <div
                  className={cn(
                    'mx-auto flex h-full w-full max-w-[42rem] flex-col justify-center py-2 sm:py-4',
                    index % 2 === 1 && 'lg:order-1',
                  )}
                >
                  <span className="eyebrow w-fit">{profile.role}</span>
                  <h2 className="mt-5 text-4xl font-semibold text-foreground sm:text-5xl">
                    {profile.name}
                  </h2>
                  <p className="mt-3 text-lg text-primary">{profile.affiliation}</p>
                  <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
                    {profile.introduction.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {profile.socialLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
                      >
                        {link.label}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </a>
                    ))}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      Contact GSi
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-border/60 bg-card/45">
        <div className="page-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Background</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              Academic and professional backgrounds across both founders.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {leadershipProfiles.map((profile) => (
              <article key={profile.id} className="section-card p-6 sm:p-7">
                <h3 className="text-3xl font-semibold text-foreground">{profile.name}</h3>
                <p className="mt-2 text-base text-primary">{profile.role}</p>
                <div className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Education
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {profile.educationList.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Experience
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {profile.experienceList.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Areas of work</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              Research and training areas.
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
            <span className="eyebrow">Selected publications</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              Publications and writing.
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

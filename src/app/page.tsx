import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Landmark,
  MonitorCog,
  RadioTower,
  ShieldCheck,
  Sprout,
  Users,
} from 'lucide-react'
import { ContactForm } from '@/components/site/contact-form'
import { getFeaturedBlogPosts, getFeaturedTrainingPrograms } from '@/lib/content'
import { homeContent, leadershipProfiles, siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

const focusIcons = [
  ShieldCheck,
  MonitorCog,
  RadioTower,
  Landmark,
  Sprout,
  Users,
]

export default function HomePage() {
  const featuredPosts = getFeaturedBlogPosts().slice(0, 3)
  const featuredPrograms = getFeaturedTrainingPrograms().slice(0, 2)

  return (
    <main id="main-content">
      <section className="overflow-hidden border-b border-border/60">
        <div className="page-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <div>
            <span className="eyebrow">{homeContent.hero.eyebrow}</span>
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
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore the profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Read recent analysis
              </Link>
            </div>
          </div>

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
                      className="rounded-[1.5rem] border border-border/70 bg-background/85 p-4"
                    >
                      <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
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
        </div>
      </section>

      <section id="services" className="section-space">
        <div className="page-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">What the organisation does</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              A sharper structure than a generic brochure site.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              GSi works across research, public commentary, training, and issue-based
              initiatives. The site now reflects that structure directly instead of falling back
              on generic consultancy language.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {homeContent.services.map((service) => (
              <article key={service.title} className="section-card p-6 sm:p-7">
                <h3 className="text-2xl font-semibold text-foreground">{service.title}</h3>
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
          </div>
        </div>
      </section>

      <section className="section-space border-y border-border/60 bg-card/45">
        <div className="page-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Focus areas</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              Policy work shaped by actual subject-matter coverage.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {homeContent.focusAreas.map((item, index) => {
              const Icon = focusIcons[index]

              return (
                <article key={item.title} className="section-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {item.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Leadership</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              Two founders shaping the platform from complementary paths.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              GSi is led by founders with backgrounds in governance, international affairs,
              cybersecurity, policy research, advisory work, and public-facing institutional
              engagement.
            </p>
          </div>
          <div className="mt-10 space-y-6 lg:space-y-8">
            {leadershipProfiles.map((profile, index) => (
              <article
                key={profile.id}
                className="section-card mx-auto grid max-w-6xl gap-8 overflow-hidden p-5 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10 lg:p-8"
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
                      sizes="(min-width: 1024px) 40vw, 100vw"
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
                  <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                    {profile.name}
                  </h2>
                  <p className="mt-3 text-lg text-primary">{profile.affiliation}</p>
                  <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
                    {profile.introduction.slice(0, 2).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <ul className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {profile.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/about#${profile.id}`}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
                    >
                      View full profile
                    </Link>
                    {profile.socialLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        {link.label}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="training" className="section-space border-y border-border/60 bg-card/45">
        <div className="page-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">Training</span>
              <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
                Custom programmes instead of fake cohort marketing.
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                GSi’s public profile supports institutional training, but not invented pricing,
                testimonials, or made-up schedules. The site now presents credible programme tracks
                that can be tailored for real audiences.
              </p>
            </div>
            <Link
              href="/training"
              className="inline-flex items-center text-sm font-medium text-primary"
            >
              Browse all training areas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {featuredPrograms.map((program) => (
              <article key={program.slug} className="section-card p-6 sm:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {program.level}
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-foreground">{program.title}</h3>
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
                  className="mt-6 inline-flex items-center text-sm font-medium text-primary"
                >
                  View programme details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="section-space">
        <div className="page-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
            <span className="eyebrow">Latest analysis</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              Published analysis, now managed through a proper editorial workflow.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The blog is markdown-backed and server-rendered, so the organisation can keep
              publishing essays cleanly without burying them in JSON blobs or placeholder client code.
            </p>
          </div>
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-primary">
            Browse all articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <article key={post.slug} className="section-card flex flex-col p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {post.category}
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-balance text-foreground">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground sm:text-base">
                  {post.excerpt}
                </p>
                <p className="mt-5 text-sm text-muted-foreground">
                  {post.author} · {post.readingTime}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-medium text-primary"
                >
                  Read the article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-border/60 bg-card/45">
        <div className="page-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Public-interest initiatives</span>
            <h2 className="mt-5 text-4xl font-semibold text-balance text-foreground sm:text-5xl">
              Community-facing work belongs on the site too.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {homeContent.initiatives.map((initiative) => (
              <article key={initiative.title} className="section-card p-6 sm:p-7">
                <h3 className="text-2xl font-semibold text-foreground">{initiative.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {initiative.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-space">
        <div className="page-shell">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}

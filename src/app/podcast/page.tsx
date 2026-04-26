import type { Metadata } from "next";
import { CalendarDays, Mic, Radio, UserRound } from "lucide-react";
import { AnimatedSection, StaggerChildren } from "@/components/site/animated-section";
import { TextReveal } from "@/components/site/interactive";
import { Markdown } from "@/components/site/markdown";
import { VideoPlayer } from "@/components/site/video-player";
import {
  formatDisplayDate,
  getBaseMetadata,
  getPodcastEpisodes,
} from "@/lib/content";

export const metadata: Metadata = getBaseMetadata({
  title: "Podcast",
  description:
    "GSi podcast episodes featuring conversations on governance, security, technology, and public-interest issues.",
  pathName: "/podcast",
  ogImagePath: "/podcast/opengraph-image",
  keywords: [
    "GSi podcast",
    "governance podcast",
    "security podcast Bangladesh",
    "policy conversations",
    "gsithinktank podcast",
  ],
});

export default function PodcastPage() {
  const episodes = getPodcastEpisodes();
  const [featuredEpisode, ...archiveEpisodes] = episodes;

  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-border/60 bg-background">
        <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
        <div className="page-shell relative py-10 sm:py-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center xl:gap-12">
            <AnimatedSection className="max-w-2xl">
              <span className="eyebrow">Podcast</span>
              <TextReveal
                as="h1"
                className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-balance text-foreground sm:mt-5 sm:text-5xl"
              >
                Sharp conversations on governance, security, and technology.
              </TextReveal>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-8">
                Watch GSi discussions without the noisy default embed treatment.
                Each episode keeps the focus on the conversation, the guest, and
                the policy questions worth following.
              </p>
              <div className="mt-6 hidden grid-cols-3 gap-2 text-center text-xs text-muted-foreground sm:grid sm:text-sm">
                <span className="rounded-full border border-border/70 bg-card/80 px-3 py-2">
                  Video-first
                </span>
                <span className="rounded-full border border-border/70 bg-card/80 px-3 py-2">
                  Issue-led
                </span>
                <span className="rounded-full border border-border/70 bg-card/80 px-3 py-2">
                  Bangladesh-rooted
                </span>
              </div>
              {featuredEpisode ? (
                <div className="mt-6 hidden gap-2 text-sm text-muted-foreground sm:grid sm:grid-cols-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-2">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    {formatDisplayDate(featuredEpisode.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-2">
                    <Mic className="h-4 w-4 text-primary" />
                    {featuredEpisode.hostName}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-2">
                    <UserRound className="h-4 w-4 text-primary" />
                    {featuredEpisode.guestName}
                  </span>
                </div>
              ) : null}
            </AnimatedSection>
            <AnimatedSection animation="scaleIn" delay={0.12}>
              {featuredEpisode ? (
                <VideoPlayer
                  url={featuredEpisode.youtubeUrl}
                  title={featuredEpisode.title}
                  eyebrow="Latest episode"
                  description={`${featuredEpisode.hostName} with ${featuredEpisode.guestName}`}
                  meta={formatDisplayDate(featuredEpisode.publishedAt)}
                />
              ) : (
                <div className="rounded-[1.75rem] border border-border/70 bg-card/80 p-8 text-center">
                  <p className="text-base text-muted-foreground">
                    No podcast episodes have been published yet.
                  </p>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          {featuredEpisode ? (
            <AnimatedSection animation="fadeUp">
              <article className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6 shadow-sm sm:p-7">
                <div className="max-w-4xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Radio className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      Featured conversation
                    </div>
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold leading-tight text-balance text-foreground sm:text-4xl">
                    {featuredEpisode.title}
                  </h2>
                  <div className="prose prose-slate mt-6 max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground dark:prose-invert">
                    <Markdown content={featuredEpisode.content} />
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ) : (
            <AnimatedSection animation="fadeUp">
              <div className="rounded-[1.75rem] border border-border/70 bg-card/80 p-8 text-center">
                <p className="text-base text-muted-foreground">
                  No podcast episodes have been published yet.
                </p>
              </div>
            </AnimatedSection>
          )}

          {archiveEpisodes.length ? (
            <div className="mt-14">
              <AnimatedSection>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="eyebrow">Archive</span>
                    <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
                      Recent episodes
                    </h2>
                  </div>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                    A cleaner archive for scanning guests, hosts, dates, and
                    episode notes before opening the player.
                  </p>
                </div>
              </AnimatedSection>
              <StaggerChildren
                className="mt-8 grid gap-5 lg:grid-cols-2"
                staggerDelay={0.1}
              >
                {archiveEpisodes.map((episode) => (
                  <article
                    key={episode.slug}
                    className="section-card-interactive overflow-hidden p-4 sm:p-5"
                  >
                    <VideoPlayer
                      url={episode.youtubeUrl}
                      title={episode.title}
                      eyebrow="Podcast episode"
                      description={`${episode.hostName} with ${episode.guestName}`}
                      meta={formatDisplayDate(episode.publishedAt)}
                    />
                    <div className="px-1 pb-1 pt-5">
                      <h3 className="text-2xl font-semibold leading-tight text-balance text-foreground">
                        {episode.title}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full border border-border/70 px-3 py-1.5">
                          Host: {episode.hostName}
                        </span>
                        <span className="rounded-full border border-border/70 px-3 py-1.5">
                          Guest: {episode.guestName}
                        </span>
                        <span className="rounded-full border border-border/70 px-3 py-1.5">
                          {formatDisplayDate(episode.publishedAt)}
                        </span>
                      </div>
                      <div className="prose prose-slate mt-5 max-w-none prose-sm prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground dark:prose-invert">
                        <Markdown content={episode.content} />
                      </div>
                    </div>
                  </article>
                ))}
              </StaggerChildren>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

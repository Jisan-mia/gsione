import type { Metadata } from "next";
import { Mic } from "lucide-react";
import { AnimatedSection } from "@/components/site/animated-section";
import {
  AnimatedLine,
  TextReveal,
} from "@/components/site/interactive";
import { Markdown } from "@/components/site/markdown";
import {
  formatDisplayDate,
  getBaseMetadata,
  getPodcastEpisodes,
  getYouTubeEmbedUrl,
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

  return (
    <main id="main-content">
      <section className="section-space border-b border-border/60">
        <div className="page-shell">
          <AnimatedSection>
            <span className="eyebrow shimmer">Podcast</span>
            <TextReveal
              as="h1"
              className="mt-5 max-w-4xl text-5xl font-semibold text-balance text-foreground sm:text-6xl"
            >
              GSi podcast conversations you can watch directly on the site.
            </TextReveal>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              A growing archive of GSi podcast episodes with embedded video,
              publication dates, guest details, and host information.
            </p>
          </AnimatedSection>
          <AnimatedLine className="mt-8" />
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell space-y-6">
          {episodes.map((episode) => (
            <AnimatedSection key={episode.slug} animation="fadeUp">
              <article className="section-card overflow-hidden p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mic className="h-5 w-5" />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-primary">
                    <span>Podcast</span>
                    <span className="text-muted-foreground">&middot;</span>
                    <span>{formatDisplayDate(episode.publishedAt)}</span>
                  </div>
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-balance text-foreground">
                  {episode.title}
                </h2>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>Host: {episode.hostName}</span>
                  <span>Guest: {episode.guestName}</span>
                </div>
                <div className="mt-6 overflow-hidden rounded-3xl border border-border/70 bg-card/50">
                  <div className="aspect-video">
                    <iframe
                      src={getYouTubeEmbedUrl(episode.youtubeUrl)}
                      title={episode.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">
                  <Markdown content={episode.content} />
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </main>
  );
}

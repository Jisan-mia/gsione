import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/site/animated-section";
import { Markdown } from "@/components/site/markdown";
import {
  formatDisplayDate,
  getAnalysisPostBySlug,
  getAnalysisPosts,
  getBaseMetadata,
  getMetadataImageUrl,
} from "@/lib/content";
import { siteConfig, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return getAnalysisPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getAnalysisPostBySlug(slug);

    if (!post) {
      return getBaseMetadata({
        title: "Analysis not found",
        pathName: `/analysis/${slug}`,
      });
    }

    return getBaseMetadata({
      title: post.title,
      description: post.excerpt,
      pathName: `/analysis/${post.slug}`,
      ogImagePath: `/analysis/${post.slug}/opengraph-image`,
      openGraphType: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
      keywords: [post.category, ...post.tags, post.author, "gsithinktank"],
    });
  });
}

export default async function AnalysisDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getAnalysisPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const analysisSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [getMetadataImageUrl(`/analysis/${post.slug}/opengraph-image`)],
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/android-chrome-512x512.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/analysis/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(analysisSchema) }}
      />

      <section className="section-space border-b border-border/60">
        <div className="page-shell max-w-4xl">
          <AnimatedSection>
            <Link
              href="/analysis"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to GSi Analysis
            </Link>
            <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-primary">
              <span>{post.category}</span>
              <span className="text-muted-foreground">&middot;</span>
              <span>{formatDisplayDate(post.publishedAt)}</span>
            </div>
            <h1 className="mt-5 text-5xl font-semibold text-balance text-foreground sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>
                {post.author} &middot; {post.authorRole}
              </span>
              <span>{post.readingTime}</span>
              {post.sourceLabel ? <span>{post.sourceLabel}</span> : null}
            </div>
            {post.sourceUrl ? (
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                View original source context
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            ) : null}
          </AnimatedSection>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell max-w-4xl">
          <AnimatedSection animation="fadeIn" delay={0.15}>
            <article className="section-card p-6 sm:p-8 lg:p-10">
              <Markdown content={post.content} />
            </article>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.3}>
            <div className="section-card mt-10 p-6 sm:p-7">
              <h2 className="text-3xl font-semibold text-foreground">
                Continue reading
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                Explore more short-form GSi analysis on cyber incidents,
                geopolitics, governance, and public-interest developments.
              </p>
              <Link
                href="/analysis"
                className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
              >
                Browse all analysis
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

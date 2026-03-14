import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  AnimatedSection,
  StaggerChildren,
} from "@/components/site/animated-section";
import {
  formatDisplayDate,
  getBaseMetadata,
  getBlogPosts,
} from "@/lib/content";

export const metadata: Metadata = getBaseMetadata({
  title: "GSi Articles",
  description:
    "In-depth analysis and expert commentary from GSi on cybersecurity, AI policy, governance, environmental risk, and digital rights.",
  pathName: "/articles",
  ogImagePath: "/articles/opengraph-image",
  keywords: [
    "GSi articles",
    "Bangladesh policy analysis",
    "cybersecurity commentary",
    "AI policy Bangladesh",
    "governance writing",
    "gsithinktank articles",
  ],
});

export default function ArticlesPage() {
  const posts = getBlogPosts();

  return (
    <main id="main-content">
      <section className="section-space border-b border-border/60">
        <div className="page-shell">
          <AnimatedSection>
            <span className="eyebrow">GSi Articles</span>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold text-balance text-foreground sm:text-6xl">
              Expert analysis and policy commentary from GSi.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              In-depth articles on cybersecurity governance, AI policy,
              information integrity, environmental risk, and public
              accountability.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-space">
        <StaggerChildren
          className="page-shell grid gap-5 lg:grid-cols-2"
          staggerDelay={0.1}
        >
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/articles/${post.slug}`}
              className="group"
            >
              <article className="section-card-interactive flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-primary">
                    <span>{post.category}</span>
                    <span className="text-muted-foreground">&middot;</span>
                    <span>{formatDisplayDate(post.publishedAt)}</span>
                  </div>
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-balance text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground sm:text-base">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-5 text-sm text-muted-foreground">
                  <span>
                    {post.author} &middot; {post.authorRole}
                  </span>
                  <span>{post.readingTime}</span>
                </div>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-primary transition-colors group-hover:text-accent">
                  Read full article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </article>
            </Link>
          ))}
        </StaggerChildren>
      </section>
    </main>
  );
}

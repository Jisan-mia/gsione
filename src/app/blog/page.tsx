import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatDisplayDate, getBaseMetadata, getBlogPosts } from '@/lib/content'

export const metadata: Metadata = getBaseMetadata({
  title: 'Blog',
  description:
    'Markdown-backed analysis and commentary from GSi on cybersecurity, AI policy, governance, environmental risk, and digital rights.',
  pathName: '/blog',
})

export default function BlogIndexPage() {
  const posts = getBlogPosts()

  return (
    <main id="main-content">
      <section className="section-space border-b border-border/60">
        <div className="page-shell">
          <span className="eyebrow">Blog</span>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold text-balance text-foreground sm:text-6xl">
            Source-backed writing, now published from markdown files.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            This archive pulls from the material you provided for the organisation, then rewrites it
            into structured, indexable pages instead of shallow client-rendered cards.
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-5 lg:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="section-card flex flex-col p-6 sm:p-7">
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-primary">
                <span>{post.category}</span>
                <span className="text-muted-foreground">•</span>
                <span>{formatDisplayDate(post.publishedAt)}</span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-balance text-foreground">
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
                  {post.author} · {post.authorRole}
                </span>
                <span>{post.readingTime}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center text-sm font-medium text-primary"
              >
                Read article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

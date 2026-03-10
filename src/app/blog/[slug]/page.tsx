import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Markdown } from '@/components/site/markdown'
import {
  formatDisplayDate,
  getBaseMetadata,
  getMetadataImageUrl,
  getBlogPostBySlug,
  getBlogPosts,
} from '@/lib/content'
import { siteConfig, siteUrl } from '@/lib/site'

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getBlogPostBySlug(slug)

    if (!post) {
      return getBaseMetadata({
        title: 'Article not found',
        pathName: `/blog/${slug}`,
      })
    }

    return getBaseMetadata({
      title: post.title,
      description: post.excerpt,
      pathName: `/blog/${post.slug}`,
      ogImagePath: `/blog/${post.slug}/opengraph-image`,
      openGraphType: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
      keywords: [post.category, ...post.tags, post.author],
    })
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [getMetadataImageUrl(`/blog/${post.slug}/opengraph-image`)],
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/android-chrome-512x512.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    articleSection: post.category,
    keywords: post.tags.join(', '),
  }

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <section className="section-space border-b border-border/60">
        <div className="page-shell max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
          <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-primary">
            <span>{post.category}</span>
            <span className="text-muted-foreground">•</span>
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
              {post.author} · {post.authorRole}
            </span>
            <span>{post.readingTime}</span>
            <span>{post.sourceLabel}</span>
          </div>
          {post.sourceUrl ? (
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center text-sm font-medium text-primary"
            >
              View original source context
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          ) : null}
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell max-w-4xl">
          <article className="section-card p-6 sm:p-8 lg:p-10">
            <Markdown content={post.content} />
          </article>
        </div>
      </section>
    </main>
  )
}

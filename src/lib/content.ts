import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { cache } from 'react'
import { siteConfig, siteUrl } from '@/lib/site'

const contentRoot = path.join(process.cwd(), 'content')
const blogRoot = path.join(contentRoot, 'blog')
const trainingRoot = path.join(contentRoot, 'training')

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  authorRole: string
  publishedAt?: string
  sourceLabel: string
  sourceUrl?: string
  featured: boolean
  tags: string[]
  content: string
  readingTime: string
}

export interface TrainingProgram {
  slug: string
  title: string
  summary: string
  level: string
  duration: string
  format: string
  featured: boolean
  audience: string[]
  focusAreas: string[]
  outcomes: string[]
  content: string
}

function readMarkdownFiles(directory: string) {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const fullPath = path.join(directory, file)
      const raw = fs.readFileSync(fullPath, 'utf8')
      const parsed = matter(raw)

      return {
        slug: path.basename(file, '.md'),
        ...parsed,
      }
    })
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

function sortByDate<T extends { publishedAt?: string; slug: string }>(items: T[]) {
  return [...items].sort((left, right) => {
    const leftDate = left.publishedAt ? new Date(left.publishedAt).getTime() : 0
    const rightDate = right.publishedAt ? new Date(right.publishedAt).getTime() : 0

    if (leftDate === rightDate) {
      return left.slug.localeCompare(right.slug)
    }

    return rightDate - leftDate
  })
}

export const getBlogPosts = cache((): BlogPost[] => {
  const posts = readMarkdownFiles(blogRoot).map(({ slug, data, content }) => {
    const frontmatter = data as Omit<BlogPost, 'slug' | 'content' | 'readingTime'>

    return {
      ...frontmatter,
      slug,
      content,
      readingTime: getReadingTime(content),
    }
  })

  return sortByDate(posts)
})

export const getFeaturedBlogPosts = cache(() =>
  getBlogPosts().filter((post) => post.featured),
)

export const getBlogPostBySlug = cache((slug: string) =>
  getBlogPosts().find((post) => post.slug === slug),
)

export const getTrainingPrograms = cache((): TrainingProgram[] => {
  const programs = readMarkdownFiles(trainingRoot).map(({ slug, data, content }) => {
    const frontmatter = data as Omit<TrainingProgram, 'slug' | 'content'>

    return {
      ...frontmatter,
      slug,
      content,
    }
  })

  return [...programs].sort((left, right) => Number(right.featured) - Number(left.featured))
})

export const getFeaturedTrainingPrograms = cache(() =>
  getTrainingPrograms().filter((program) => program.featured),
)

export const getTrainingProgramBySlug = cache((slug: string) =>
  getTrainingPrograms().find((program) => program.slug === slug),
)

export function formatDisplayDate(date?: string) {
  if (!date) {
    return 'Undated'
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function getBaseMetadata({
  title,
  description,
  pathName = '/',
}: {
  title?: string
  description?: string
  pathName?: string
}) {
  const resolvedTitle = title
    ? `${title} | ${siteConfig.shortName}`
    : `${siteConfig.name} | ${siteConfig.tagline.replace(/ • /g, ' | ')}`
  const resolvedDescription = description || siteConfig.description
  const url = `${siteUrl}${pathName}`

  return {
    metadataBase: new URL(siteUrl),
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      type: 'website' as const,
      siteName: siteConfig.name,
      locale: 'en_US',
      images: [
        {
          url: `${siteUrl}/logo.webp`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [`${siteUrl}/logo.webp`],
    },
  }
}

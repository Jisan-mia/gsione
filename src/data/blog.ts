import blogData from './blog-posts.json'

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  authorRole: string
  date: string
  readTime: string
  featured: boolean
}

// Get all blog posts
export function getAllPosts(): BlogPost[] {
  return blogData.posts as BlogPost[]
}

// Get all post slugs for static generation
export function getAllPostSlugs(): string[] {
  return blogData.posts.map((post) => post.slug)
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return (blogData.posts as BlogPost[]).find((post) => post.slug === slug)
}

// Get featured posts
export function getFeaturedPosts(): BlogPost[] {
  return (blogData.posts as BlogPost[]).filter((post) => post.featured)
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  if (category === 'All') {
    return blogData.posts as BlogPost[]
  }
  return (blogData.posts as BlogPost[]).filter((post) => post.category === category)
}

// Get related posts (excluding current post)
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  return (blogData.posts as BlogPost[])
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit)
}

// Get all categories
export function getAllCategories(): string[] {
  const categories = new Set(blogData.posts.map((post) => post.category))
  return ['All', ...Array.from(categories)]
}

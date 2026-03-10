import type { Metadata } from 'next'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog | Research Insights & Policy Analysis',
  description: 'Expert insights on governance, security, and policy research from GSi Think Tank. Read our latest analysis on cybersecurity governance, AI policy, and climate security.',
  openGraph: {
    title: 'Blog | GSi Think Tank',
    description: 'Expert insights on governance, security, and policy research from GSi Think Tank.',
    type: 'website',
    url: 'https://gsithinktank.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | GSi Think Tank',
    description: 'Expert insights on governance, security, and policy research from GSi Think Tank.',
  },
}

export default function BlogPage() {
  return <BlogClient />
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCourseSlugs, getCourseBySlug, getRelatedCourses } from '@/data/training'
import TrainingDetailClient from './TrainingDetailClient'

export async function generateStaticParams() {
  const slugs = getAllCourseSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const course = getCourseBySlug(slug)
  
  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: `${course.title} | Training Programs`,
    description: course.excerpt,
    openGraph: {
      title: `${course.title} | GSi Think Tank`,
      description: course.excerpt,
      type: 'website',
      url: `https://gsithinktank.com/training/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${course.title} | GSi Think Tank`,
      description: course.excerpt,
    },
  }
}

export default async function TrainingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = getCourseBySlug(slug)
  
  if (!course) {
    notFound()
  }

  const relatedCourses = getRelatedCourses(slug, 3)

  return <TrainingDetailClient course={course} relatedCourses={relatedCourses} />
}

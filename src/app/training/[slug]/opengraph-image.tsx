import { notFound } from 'next/navigation'
import { getTrainingProgramBySlug, getTrainingPrograms } from '@/lib/content'
import { ogImageContentType, ogImageSize, renderOgImage } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType

export function generateStaticParams() {
  return getTrainingPrograms().map((program) => ({ slug: program.slug }))
}

export default async function TrainingOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const program = getTrainingProgramBySlug(slug)

  if (!program) {
    notFound()
  }

  return renderOgImage({
    eyebrow: 'Training programme',
    title: program.title,
    description: program.summary,
    meta: `${program.level} • ${program.duration}`,
  })
}

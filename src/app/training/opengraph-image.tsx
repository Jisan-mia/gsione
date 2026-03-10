import { ogImageContentType, ogImageSize, renderOgImage } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType

export default function TrainingOpenGraphImage() {
  return renderOgImage({
    eyebrow: 'GSi Training',
    title: 'Institutional programmes built around real governance and security work.',
    description:
      'Training tracks across cyber governance, AI policy, strategic risk, and Bangladesh-focused public policy analysis.',
    meta: 'Executive learning • Workshops • Institutional delivery',
  })
}

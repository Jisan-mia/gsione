import type { Metadata } from 'next'
import TrainingClient from './TrainingClient'

export const metadata: Metadata = {
  title: 'Training Programs | Professional Development in Governance & Security',
  description: 'Expert-led training programs in cybersecurity governance, AI policy, and security sector management. Designed for government officials, executives, and professionals.',
  openGraph: {
    title: 'Training Programs | GSi Think Tank',
    description: 'Expert-led training programs in cybersecurity governance, AI policy, and security sector management.',
    type: 'website',
    url: 'https://gsithinktank.com/training',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Training Programs | GSi Think Tank',
    description: 'Expert-led training programs in cybersecurity governance, AI policy, and security sector management.',
  },
}

export default function TrainingPage() {
  return <TrainingClient />
}

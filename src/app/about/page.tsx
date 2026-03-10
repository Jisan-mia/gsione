import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About | Asheer Shah - Founder & Director',
  description: 'Learn about Asheer Shah, Founder & Director of the Governance and Security Initiative (GSi). Expert in cybersecurity governance, AI governance, and geopolitical risk analysis.',
  openGraph: {
    title: 'About | GSi Think Tank',
    description: 'Learn about Asheer Shah, Founder & Director of the Governance and Security Initiative (GSi).',
    type: 'website',
    url: 'https://gsithinktank.com/about',
    images: [
      {
        url: 'https://gsithinktank.com/founder.jpg',
        width: 800,
        height: 600,
        alt: 'Asheer Shah - Founder & Director of GSi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | GSi Think Tank',
    description: 'Learn about Asheer Shah, Founder & Director of the Governance and Security Initiative (GSi).',
    images: ['https://gsithinktank.com/founder.jpg'],
  },
}

export default function AboutPage() {
  return <AboutClient />
}

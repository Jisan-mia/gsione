import type { Metadata } from 'next'
import { Manrope, Source_Serif_4 } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { SiteFooter } from '@/components/site/footer'
import { SiteHeader } from '@/components/site/header'
import { siteConfig, siteUrl } from '@/lib/site'
import './globals.css'

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
})

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
})

const themeScript = `
  (function () {
    try {
      var stored = window.localStorage.getItem('theme');
      var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var theme = stored || system;
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.style.colorScheme = theme;
    } catch (error) {}
  })();
`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteConfig.name,
  title: `${siteConfig.name} | Governance, security, and technology policy`,
  description: siteConfig.description,
  alternates: {
    canonical: siteUrl,
  },
  manifest: '/manifest.webmanifest',
  keywords: [
    'Governance and Security Initiative',
    'GSi Dhaka',
    'cybersecurity governance',
    'AI policy Bangladesh',
    'governance think tank Dhaka',
    'national security analysis Bangladesh',
    'policy training Bangladesh',
  ],
  openGraph: {
    title: `${siteConfig.name} | Governance, security, and technology policy`,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} social card`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Governance, security, and technology policy`,
    description: siteConfig.description,
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    logo: `${siteUrl}/logo.webp`,
    description: siteConfig.description,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shyamoli, Road 1, House 7/7',
      addressLocality: 'Dhaka',
      addressCountry: 'Bangladesh',
    },
    sameAs: [
      siteConfig.socials.companyLinkedIn,
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="theme-color" content="#0f1d35" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${sans.variable} ${serif.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { SiteChrome } from "@/components/site/site-chrome";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

const themeScript = `
  (function () {
    try {
      var root = document.documentElement;
      var stored = window.localStorage.getItem('theme');
      var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var theme = stored === 'light' || stored === 'dark' ? stored : system;
      root.classList.toggle('dark', theme === 'dark');
      root.classList.toggle('light', theme === 'light');
      root.dataset.theme = theme;
      root.style.colorScheme = theme;
    } catch (error) {}
  })();
`;

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.webmanifest",
  keywords: [
    "GSi",
    "gsithinktank",
    "gsithinktank.com",
    "Governance and Security Initiative",
    "GSi Dhaka",
    "GSi Think Tank",
    "cybersecurity governance",
    "AI policy Bangladesh",
    "governance think tank Dhaka",
    "national security analysis Bangladesh",
    "policy training Bangladesh",
    "think tank Bangladesh",
  ],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    type: "website",
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
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationId = `${siteUrl}/#organization`;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    logo: `${siteUrl}/logo.webp`,
    description: siteConfig.description,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shyamoli, Road 1, House 7/7",
      addressLocality: "Dhaka",
      addressCountry: "Bangladesh",
    },
    sameAs: [
      siteConfig.socials.companyLinkedIn,
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    description: siteConfig.description,
    publisher: {
      "@id": organizationId,
    },
    inLanguage: "en",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
      </head>
      <body
        className="min-h-screen bg-background font-sans text-foreground antialiased"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Primary SEO Keywords
const keywords = [
  // Primary brand keywords
  "Governance and Security Initiative",
  "GSI Think Tank",
  "GSI Bangladesh",
  "gsithinktank.com",
  // Core service keywords
  "governance research",
  "security policy research",
  "public policy think tank",
  "policy research institute",
  "governance consulting",
  "security consulting",
  // Specialized keywords
  "democratic governance",
  "institutional reform",
  "national security policy",
  "cybersecurity policy",
  "climate security",
  "sustainable development goals",
  "SDG implementation",
  "policy analysis",
  "strategic planning",
  "capacity building",
  // Geographic keywords
  "Bangladesh think tank",
  "South Asia policy research",
  "Bangladesh governance",
  "Dhaka research institute",
  // Training keywords
  "governance training",
  "leadership development",
  "policy training programs",
  "security studies",
  "public administration courses",
  // Research keywords
  "policy brief",
  "research publications",
  "white paper",
  "policy recommendations",
  "evidence-based research",
];

export const metadata: Metadata = {
  // Primary Meta Tags
  title: {
    default: "Governance and Security Initiative (GSI) | Leading Policy Think Tank",
    template: "%s | GSI Think Tank",
  },
  description: "Governance and Security Initiative (GSI) is a premier policy think tank dedicated to advancing democratic governance, national security, and sustainable development through evidence-based research, strategic consulting, and capacity building programs.",
  keywords: keywords,
  authors: [{ name: "Governance and Security Initiative", url: "https://gsithinktank.com" }],
  creator: "GSI Think Tank",
  publisher: "Governance and Security Initiative",
  
  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Icons
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  
  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "bn_BD",
    url: "https://gsithinktank.com",
    siteName: "GSI Think Tank",
    title: "Governance and Security Initiative (GSI) | Leading Policy Think Tank",
    description: "Premier policy think tank advancing democratic governance, national security, and sustainable development through evidence-based research and strategic consulting.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Governance and Security Initiative - GSI Think Tank",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@gsithinktank",
    creator: "@gsithinktank",
    title: "Governance and Security Initiative (GSI) | Leading Policy Think Tank",
    description: "Premier policy think tank advancing democratic governance, national security, and sustainable development.",
    images: ["/logo.png"],
  },
  
  // Verification (placeholder - user should add real values)
  verification: {
    google: "google-site-verification-code",
  },
  
  // Alternate URLs for international SEO
  alternates: {
    canonical: "https://gsithinktank.com",
  },
  
  // Category
  category: "Policy Research",
  
  // Classification
  classification: "Think Tank, Policy Research, Governance, Security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#1e3a5f" />
        <meta name="msapplication-TileColor" content="#1e3a5f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GSI Think Tank" />
        
        {/* Schema.org JSON-LD for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Governance and Security Initiative",
              "alternateName": "GSI Think Tank",
              "url": "https://gsithinktank.com",
              "logo": "https://gsithinktank.com/logo.png",
              "description": "Premier policy think tank dedicated to advancing democratic governance, national security, and sustainable development through evidence-based research.",
              "sameAs": [
                "https://linkedin.com/company/gsithinktank",
                "https://twitter.com/gsithinktank",
                "https://facebook.com/gsithinktank",
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English", "Bengali"],
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dhaka",
                "addressCountry": "Bangladesh",
              },
            }),
          }}
        />
        
        {/* Schema.org JSON-LD for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "GSI Think Tank",
              "url": "https://gsithinktank.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://gsithinktank.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

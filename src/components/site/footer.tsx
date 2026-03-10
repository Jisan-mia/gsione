import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MapPin } from 'lucide-react'
import { primaryNavigation, siteConfig } from '@/lib/site'

const policyLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/cookies', label: 'Cookie Policy' },
]

const socialLinks = [
  {
    href: siteConfig.socials.companyLinkedIn,
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: siteConfig.socials.facebook,
    label: 'Facebook',
    icon: Facebook,
  },
  {
    href: siteConfig.socials.instagram,
    label: 'Instagram',
    icon: Instagram,
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            {siteConfig.tagline}
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-balance text-foreground">
            {siteConfig.name}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-6 space-y-3 text-sm text-muted-foreground">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-start gap-3 transition-colors hover:text-foreground"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{siteConfig.email}</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{siteConfig.location}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
            Navigate
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
            {primaryNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
            Policies & channels
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
            {policyLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="rounded-full border border-border/70 p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <item.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/70 px-4 py-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  )
}

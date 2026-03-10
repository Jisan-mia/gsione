'use client'

import Link from 'next/link'
import { 
  Linkedin, 
  Facebook, 
  Instagram,
  Mail,
  MapPin,
  ArrowUp,
  Shield
} from 'lucide-react'
import { gsiSocialLinks } from '@/data/founder'

const footerLinks = {
  organization: [
    { name: 'About GSi', href: '/about' },
    { name: 'Our Founder', href: '/about' },
    { name: 'Training Programs', href: '/training' },
    { name: 'Blog', href: '/blog' },
  ],
  services: [
    { name: 'Governance Reform', href: '/#services' },
    { name: 'Security Advisory', href: '/#services' },
    { name: 'Policy Research', href: '/#services' },
    { name: 'Capacity Building', href: '/training' },
  ],
  resources: [
    { name: 'Publications', href: '/about#publications' },
    { name: 'Policy Briefs', href: '/blog' },
    { name: 'Research Papers', href: '/about' },
    { name: 'Newsletter', href: '/#contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Use', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-card border-t border-border" role="contentinfo">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link 
              href="/" 
              onClick={(e) => { e.preventDefault(); scrollToTop() }} 
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group"
              aria-label="GSI Think Tank - Home"
            >
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg sm:rounded-xl flex-shrink-0 bg-primary flex items-center justify-center">
                <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-primary-foreground" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base lg:text-lg font-bold gradient-text leading-tight">
                  GSi Think Tank
                </h2>
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                  Governance & Security Initiative
                </p>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 max-w-xs leading-relaxed">
              An independent policy research platform dedicated to advancing governance 
              solutions for cybersecurity, emerging technologies, climate security, and international affairs.
            </p>
            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3">
              <a
                href={gsiSocialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="GSi on LinkedIn"
              >
                <Linkedin className="w-3.5 sm:w-4 h-3.5 sm:h-4" aria-hidden="true" />
              </a>
              <a
                href={gsiSocialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="GSi on Facebook"
              >
                <Facebook className="w-3.5 sm:w-4 h-3.5 sm:h-4" aria-hidden="true" />
              </a>
              <a
                href={gsiSocialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="GSi on Instagram"
              >
                <Instagram className="w-3.5 sm:w-4 h-3.5 sm:h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Organization Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Organization</h3>
            <ul className="space-y-2 sm:space-y-3" role="list">
              {footerLinks.organization.map((link, index) => (
                <li key={index} role="listitem">
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('/#')) {
                        e.preventDefault()
                        scrollToSection(link.href.substring(1))
                      }
                    }}
                    className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Services</h3>
            <ul className="space-y-2 sm:space-y-3" role="list">
              {footerLinks.services.map((link, index) => (
                <li key={index} role="listitem">
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('/#')) {
                        e.preventDefault()
                        scrollToSection(link.href.substring(1))
                      }
                    }}
                    className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Resources</h3>
            <ul className="space-y-2 sm:space-y-3" role="list">
              {footerLinks.resources.map((link, index) => (
                <li key={index} role="listitem">
                  <Link
                    href={link.href}
                    className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-2 sm:space-y-3" role="list">
              {footerLinks.legal.map((link, index) => (
                <li key={index} role="listitem">
                  <Link
                    href={link.href}
                    className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <a href={`mailto:${gsiSocialLinks.email}`} className="flex items-center gap-2 sm:gap-3 hover:text-primary transition-colors">
              <Mail className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary flex-shrink-0" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">{gsiSocialLinks.email}</span>
            </a>
            <div className="flex items-center gap-2 sm:gap-3">
              <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary flex-shrink-0" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} Governance and Security Initiative (GSi). All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUp className="w-3 sm:w-4 h-3 sm:h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

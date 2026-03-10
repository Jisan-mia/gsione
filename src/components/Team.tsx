'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { founderInfo, gsiSocialLinks } from '@/data/founder'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const expertiseHighlights = [
  'Cybersecurity Governance',
  'AI Governance & Ethics',
  'Behavioral Cybersecurity',
  'Indo-Pacific Strategic Affairs'
]

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.team-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-header',
            start: 'top 85%',
          },
        }
      )

      // Founder card
      gsap.fromTo(
        '.founder-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.founder-card',
            start: 'top 80%',
          },
        }
      )

      // Expertise items
      gsap.fromTo(
        '.expertise-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.founder-expertise',
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden"
      aria-labelledby="team-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="team-header text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4">
            Leadership
          </span>
          <h2 id="team-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Meet Our{' '}
            <span className="gradient-text">Founder</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-2">
            Leading GSi's mission to advance governance solutions for cybersecurity, 
            emerging technologies, and international affairs.
          </p>
        </div>

        {/* Founder Section */}
        <div className="max-w-5xl mx-auto">
          <div className="founder-card grid lg:grid-cols-5 gap-6 lg:gap-8 p-5 sm:p-6 lg:p-8 rounded-2xl bg-card border border-border">
            {/* Image Column */}
            <div className="lg:col-span-2 flex justify-center lg:justify-start">
              <div className="relative w-48 h-60 sm:w-56 sm:h-72 lg:w-64 lg:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-50" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-border shadow-lg">
                  <Image
                    src={founderInfo.image}
                    alt={`${founderInfo.name} - Founder & Director of GSi`}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <Badge className="w-fit mb-3 bg-primary/10 text-primary border-primary/20">
                Founder & Director
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">{founderInfo.name}</h3>
              <p className="text-primary font-medium mb-4">{founderInfo.organization}</p>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                {founderInfo.biography.intro.substring(0, 300)}...
              </p>

              {/* Expertise Highlights */}
              <div className="founder-expertise mb-6">
                <h4 className="text-sm font-semibold mb-3">Key Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {expertiseHighlights.map((exp, index) => (
                    <span
                      key={index}
                      className="expertise-item px-3 py-1 rounded-full bg-secondary text-xs sm:text-sm font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button asChild size="sm" className="btn-primary">
                  <Link href="/about">
                    View Full Profile
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={founderInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={`mailto:${founderInfo.email}`}>
                    <Mail className="mr-2 w-4 h-4" />
                    Contact
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* GSi Stats */}
        <div className="mt-10 sm:mt-16">
          <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                { value: '7+', label: 'Expertise Areas' },
                { value: '8+', label: 'Publications' },
                { value: '15+', label: 'Countries Reached' },
                { value: '10+', label: 'Years Experience' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-0.5 sm:mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

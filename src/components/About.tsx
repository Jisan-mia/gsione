'use client'

import { useEffect, useRef } from 'react'
import { Target, Eye, Users, Globe } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'Rigorous methodology and highest standards in all our research endeavors.',
  },
  {
    icon: Eye,
    title: 'Integrity',
    description: 'Unbiased analysis and transparent processes in every engagement.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Building partnerships with governments, institutions, and communities.',
  },
  {
    icon: Globe,
    title: 'Impact',
    description: 'Delivering actionable insights that drive meaningful policy change.',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.about-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-header',
            start: 'top 85%',
          },
        }
      )

      // Mission/Vision cards
      gsap.fromTo(
        '.about-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-cards',
            start: 'top 80%',
          },
        }
      )
      // Values grid
      gsap.fromTo(
        '.about-value',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-values',
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="about-header text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4">
            About GSi
          </span>
          <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Advancing Governance &{' '}
            <span className="gradient-text">Security Excellence</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-2">
            The Governance and Security Initiative (GSi) is a premier policy think tank dedicated to 
            strengthening democratic institutions, enhancing national security, and promoting
            sustainable development through South Asia and beyond.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="about-cards grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-16 lg:mb-24">
          <article className="about-card p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-card border border-border card-hover">
            <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
              <Target className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Our Mission</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              To empower governments, institutions, and civil society with evidence-based research
              and strategic insights that strengthen governance frameworks, enhance security architectures,
              and promote inclusive development. We bridge the gap between academic research and
              practical policy implementation through rigorous analysis and stakeholder engagement.
            </p>
          </article>
          
          <article className="about-card p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-card border border-border card-hover">
            <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center mb-4 sm:mb-6">
              <Eye className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-accent" aria-hidden="true" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Our Vision</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              To be the leading voice in governance and security policy, shaping a world where
              democratic institutions thrive, security threats are effectively managed, and
              sustainable development benefits all citizens. We envision a future where evidence-based
              policymaking is the norm across all levels of government.
            </p>
          </article>
        </div>

        {/* Core Values */}
        <div className="about-values mb-10 sm:mb-16 lg:mb-24">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 lg:mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="about-value p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl bg-card/50 border border-border/50 text-center card-hover"
              >
                <div className="w-9 sm:w-10 lg:w-12 h-9 sm:h-10 lg:h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <value.icon className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-primary" aria-hidden="true" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">{value.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

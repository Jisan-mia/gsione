'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Scale,
  Shield,
  Users,
  Building2,
  Globe,
  Leaf,
  ArrowRight,
  FileText
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const topics = [
  {
    icon: Scale,
    title: 'Democratic Governance',
    description: 'Research on electoral systems, institutional reform, and democratic consolidation.',
    publications: 45,
    projects: 85,
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    icon: Shield,
    title: 'National Security',
    description: 'Analysis of security threats, defense policy, and security sector governance.',
    publications: 62,
    projects: 120,
    color: 'from-red-500/20 to-red-600/20',
  },
  {
    icon: Users,
    title: 'Civil Society & Participation',
    description: 'Studies on civic engagement, social movements, and citizen participation.',
    publications: 38,
    projects: 75,
    color: 'from-emerald-500/20 to-emerald-600/20',
  },
  {
    icon: Building2,
    title: 'Institutional Reform',
    description: 'Research on public administration, anti-corruption, and institutional strengthening.',
    publications: 55,
    projects: 95,
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    icon: Globe,
    title: 'Regional Cooperation',
    description: 'Analysis of South Asian regional dynamics, diplomacy, and transboundary issues.',
    publications: 42,
    projects: 60,
    color: 'from-cyan-500/20 to-cyan-600/20',
  },
  {
    icon: Leaf,
    title: 'Sustainable Development',
    description: 'Research on SDG implementation, climate governance, and environmental policy.',
    publications: 35,
    projects: 70,
    color: 'from-green-500/20 to-green-600/20',
  },
]

const publications = [
  {
    title: 'Democratic Resilience in South Asia: Challenges and Opportunities',
    type: 'Policy Brief',
    date: 'Jan 2025',
  },
  {
    title: 'Cybersecurity Governance Framework for Emerging Economies',
    type: 'White Paper',
    date: 'Dec 2024',
  },
  {
    title: 'Climate Security Nexus: Policy Recommendations for Bangladesh',
    type: 'Research Report',
    date: 'Nov 2024',
  },
]

export default function Topics() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.topics-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.topics-header',
            start: 'top 85%',
          },
        }
      )

      // Topic cards
      gsap.fromTo(
        '.topic-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.topics-grid',
            start: 'top 80%',
          },
        }
      )

      // Publications section
      gsap.fromTo(
        '.topics-publications',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.topics-publications',
            start: 'top 85%',
          },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="research"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden bg-card/30"
      aria-labelledby="research-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 sm:top-20 left-8 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-16 sm:bottom-20 right-8 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="topics-header text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4">
            Research Areas
          </span>
          <h2 id="research-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Areas of{' '}
            <span className="gradient-text">Research Excellence</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-2">
            Our research spans critical domains in governance and security, producing 
            actionable insights that inform policy and drive institutional change.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="topics-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {topics.map((topic, index) => (
            <article
              key={index}
              className="topic-card group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border card-hover overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <topic.icon className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-primary" aria-hidden="true" />
                </div>
                
                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  {topic.description}
                </p>
                
                {/* Stats */}
                <div className="flex items-center gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <FileText className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-[10px] sm:text-xs lg:text-sm">
                      <span className="font-semibold">{topic.publications}</span>
                      <span className="text-muted-foreground ml-0.5 sm:ml-1">Papers</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Scale className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-[10px] sm:text-xs lg:text-sm">
                      <span className="font-semibold">{topic.projects}</span>
                      <span className="text-muted-foreground ml-0.5 sm:ml-1">Projects</span>
                    </span>
                  </div>
                </div>
                
                {/* Explore Link */}
                <button 
                  onClick={scrollToContact}
                  className="mt-4 sm:mt-6 inline-flex items-center text-xs sm:text-sm font-medium text-primary group-hover:gap-2 transition-all"
                  aria-label={`Explore ${topic.title} research`}
                >
                  Explore Research
                  <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Recent Publications */}
        <div className="topics-publications mt-12 sm:mt-16 lg:mt-24">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-6 sm:mb-8">Recent Publications</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {publications.map((pub, index) => (
              <article
                key={index}
                className="group p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl bg-card border border-border card-hover cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded bg-primary/10 text-primary font-medium">
                    {pub.type}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{pub.date}</span>
                </div>
                <h4 className="text-sm sm:text-base font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {pub.title}
                </h4>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <Button variant="outline" className="btn-outline h-9 sm:h-10 text-sm sm:text-base" onClick={scrollToContact}>
            View All Publications
            <ArrowRight className="ml-2 w-3.5 sm:w-4 h-3.5 sm:h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Scale, 
  Shield, 
  BarChart3, 
  FileText, 
  Users, 
  GraduationCap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    icon: Scale,
    title: 'Governance Reform',
    description: 'Comprehensive analysis and recommendations for strengthening democratic institutions, electoral systems, and public administration.',
    features: [
      'Institutional strengthening',
      'Electoral reform analysis',
      'Anti-corruption strategies',
      'Public sector modernization',
    ],
    color: 'primary',
  },
  {
    icon: Shield,
    title: 'Security Policy Advisory',
    description: 'Expert guidance on national security strategy, threat assessment, and security sector reform for governments and organizations.',
    features: [
      'National security strategy',
      'Threat assessment frameworks',
      'Security sector governance',
      'Counter-terrorism policy',
    ],
    color: 'accent',
  },
  {
    icon: BarChart3,
    title: 'Policy Research & Analysis',
    description: 'Rigorous evidence-based research on governance, security, and development issues with actionable policy recommendations.',
    features: [
      'Policy impact assessment',
      'Legislative analysis',
      'Comparative policy studies',
      'Evidence synthesis',
    ],
    color: 'primary',
  },
  {
    icon: FileText,
    title: 'Research Publications',
    description: 'Authoritative policy briefs, white papers, and reports that inform public discourse and guide decision-makers.',
    features: [
      'Policy briefs & memos',
      'In-depth research reports',
      'Working papers',
      'Annual assessments',
    ],
    color: 'accent',
  },
  {
    icon: Users,
    title: 'Stakeholder Engagement',
    description: 'Facilitating dialogue between government, civil society, and private sector for collaborative policy solutions.',
    features: [
      'Multi-stakeholder dialogues',
      'Public consultations',
      'Coalition building',
      'Advocacy strategy',
    ],
    color: 'primary',
  },
  {
    icon: GraduationCap,
    title: 'Capacity Building Programs',
    description: 'Specialized training programs for government officials, security professionals, and civil society leaders.',
    features: [
      'Executive leadership programs',
      'Policy analysis training',
      'Security sector workshops',
      'Monitoring & evaluation',
    ],
    color: 'accent',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.services-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-header',
            start: 'top 85%',
          },
        }
      )

      // Service cards
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
          },
        }
      )

      // CTA section
      gsap.fromTo(
        '.services-cta',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-cta',
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
      id="services"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden bg-card/30"
      aria-labelledby="services-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="services-header text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4">
            Our Services
          </span>
          <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Comprehensive Policy{' '}
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-2">
            From governance reform to security policy, we deliver evidence-based solutions 
            that address complex challenges facing governments and institutions today.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <article
              key={index}
              className="service-card group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border card-hover overflow-hidden"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className={`relative w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-lg sm:rounded-xl ${service.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 ${service.color === 'primary' ? 'text-primary' : 'text-accent'}`} aria-hidden="true" />
              </div>
              
              {/* Content */}
              <div className="relative">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-1.5 sm:space-y-2" role="list">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-xs sm:text-sm">
                      <CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-accent flex-shrink-0" aria-hidden="true" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Learn More Link */}
              <button 
                onClick={scrollToContact}
                className="relative mt-4 sm:mt-6 inline-flex items-center text-xs sm:text-sm font-medium text-primary group-hover:gap-2 transition-all"
                aria-label={`Learn more about ${service.title}`}
              >
                Learn More
                <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="services-cta text-center mt-10 sm:mt-16">
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 sm:mb-6">
            Need a customized solution for your organization&apos;s unique challenges?
          </p>
          <Button
            size="lg"
            className="btn-secondary text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto"
            onClick={scrollToContact}
          >
            Request a Consultation
            <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    content: "GSI's research on electoral reform was instrumental in shaping our national policy recommendations. Their evidence-based approach and deep understanding of governance challenges is unmatched.",
    author: 'Hon. Minister Rahman',
    role: 'Minister of Public Administration',
    company: 'Government of Bangladesh',
    rating: 5,
  },
  {
    content: "The security policy training program transformed our department's approach to threat assessment. The faculty's expertise and practical insights were exceptional.",
    author: 'Brigadier General Ahmed',
    role: 'Director of Training',
    company: 'National Defense College',
    rating: 5,
  },
  {
    content: "Working with GSI on our governance reform initiative delivered measurable results. Their stakeholder engagement methodology should be a model for all policy research institutions.",
    author: 'Dr. Fatima Begum',
    role: 'Executive Director',
    company: 'South Asia Policy Institute',
    rating: 5,
  },
  {
    content: "Their policy briefs are concise, well-researched, and actionable. We regularly reference GSI publications in our parliamentary proceedings and committee deliberations.",
    author: 'MP Shahidul Islam',
    role: 'Chair, Standing Committee',
    company: 'National Parliament',
    rating: 5,
  },
  {
    content: "The capacity building program for our district-level officials was transformative. GSI's facilitators brought real-world experience that resonated with our team.",
    author: 'Secretary Kamal Hossain',
    role: 'Secretary',
    company: 'Ministry of Local Government',
    rating: 5,
  },
  {
    content: "GSI's regional cooperation research provided the framework for our cross-border governance initiatives. Their understanding of South Asian dynamics is unparalleled.",
    author: 'Ambassador Narayan',
    role: 'Former Foreign Secretary',
    company: 'Ministry of Foreign Affairs',
    rating: 5,
  },
]

const partners = [
  'UNDP', 'World Bank', 'USAID', 'DFID', 
  'Asia Foundation', 'Konrad Adenauer', 'NDI', 'IRI'
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.testimonials-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-header',
            start: 'top 85%',
          },
        }
      )

      // Testimonial cards
      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 80%',
          },
        }
      )

      // Partners section
      gsap.fromTo(
        '.testimonials-partners',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-partners',
            start: 'top 85%',
          },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden bg-card/30"
      aria-labelledby="testimonials-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="testimonials-header text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4">
            Impact & Recognition
          </span>
          <h2 id="testimonials-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Trusted by{' '}
            <span className="gradient-text">Policy Leaders</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-2">
            Hear from government officials, institutional leaders, and policy practitioners 
            who have partnered with GSI for transformative impact.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="testimonial-card group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border card-hover"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-primary" aria-hidden="true" />
              </div>
              
              {/* Rating */}
              <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed line-clamp-4 lg:line-clamp-none">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <cite className="text-sm sm:text-base font-semibold not-italic truncate block">{testimonial.author}</cite>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground truncate">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Partners */}
        <div className="testimonials-partners mt-12 sm:mt-16 lg:mt-24">
          <p className="text-center text-[10px] sm:text-xs lg:text-sm text-muted-foreground mb-6 sm:mb-8">
            Supported by leading development and policy organizations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-muted-foreground/20 hover:text-muted-foreground/50 transition-colors cursor-pointer"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

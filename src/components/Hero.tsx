'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Shield, Globe, Scale, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Badge animation
      gsap.fromTo(
        '.hero-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      )

      // Heading animation
      gsap.fromTo(
        '.hero-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      )

      // Subheading animation
      gsap.fromTo(
        '.hero-subheading',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
      )

      // Buttons animation
      gsap.fromTo(
        '.hero-buttons',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' }
      )

      // Stats animation with stagger
      gsap.fromTo(
        '.hero-stat',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: 0.6,
          stagger: 0.1,
          ease: 'power3.out' 
        }
      )

      // Floating background elements
      gsap.to('.hero-float-1', {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('.hero-float-2', {
        y: -15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('.hero-float-3', {
        scale: 1.05,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern pt-14 sm:pt-16 lg:pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-float-1 absolute top-16 sm:top-20 left-4 sm:left-10 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="hero-float-2 absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="hero-float-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
        
        {/* Floating Icons - Hidden on mobile */}
        <div className="hidden lg:block absolute top-32 right-20 opacity-10">
          <Shield className="w-16 h-16 text-primary animate-float" />
        </div>
        <div className="hidden lg:block absolute bottom-40 left-20 opacity-10">
          <Scale className="w-20 h-20 text-accent animate-float-slow" />
        </div>
        <div className="hidden lg:block absolute top-1/2 right-40 opacity-10" style={{ animationDelay: '2s' }}>
          <Globe className="w-12 h-12 text-primary animate-float" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
        <div className="max-w-4xl lg:max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-primary">
              Premier Think Tank for Governance & Security Policy
            </span>
          </div>

          {/* Main Heading - SEO optimized H1 */}
          <h1 className="hero-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            Shaping Policy Through{' '}
            <span className="gradient-text">Evidence-Based Research</span>
          </h1>

          {/* Subheading */}
          <p className="hero-subheading text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Governance and Security Initiative (GSI) advances democratic governance, 
            national security, and sustainable development through rigorous research and strategic consulting.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <Button
              size="lg"
              className="btn-primary text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto w-full sm:w-auto group"
              onClick={() => scrollToSection('services')}
            >
              Explore Our Research
              <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-outline text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto w-full sm:w-auto"
              onClick={() => scrollToSection('training')}
            >
              Training Programs
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto w-full sm:w-auto hidden md:flex"
              onClick={() => scrollToSection('contact')}
            >
              <Play className="mr-2 w-4 sm:w-5 h-4 sm:h-5" />
              Partner With Us
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-3xl lg:max-w-4xl mx-auto">
            {[
              { value: '15+', label: 'Years of Excellence' },
              { value: '200+', label: 'Policy Publications' },
              { value: '50+', label: 'Government Partners' },
              { value: '25+', label: 'Countries Reached' },
            ].map((stat, index) => (
              <div key={index} className="hero-stat text-center p-3 sm:p-4">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 animate-bounce">
          <span className="text-[10px] sm:text-xs text-muted-foreground">Scroll to explore</span>
          <div className="w-5 sm:w-6 h-8 sm:h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="w-1 sm:w-1.5 h-2 sm:h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Scale,
  Shield,
  BarChart3,
  Users as UsersIcon
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const courses = [
  {
    title: 'Governance & Public Policy',
    description: 'Comprehensive training in governance frameworks, policy analysis, and public administration for government officials and civil society leaders.',
    duration: '12 weeks',
    level: 'Professional',
    students: '850+',
    rating: 4.9,
    icon: Scale,
    topics: ['Policy Analysis', 'Public Admin', 'Reform Strategies', 'Stakeholder Engagement'],
    featured: true,
  },
  {
    title: 'National Security Studies',
    description: 'Advanced program covering security strategy, threat assessment, intelligence analysis, and security sector governance.',
    duration: '10 weeks',
    level: 'Advanced',
    students: '620+',
    rating: 4.8,
    icon: Shield,
    topics: ['Security Strategy', 'Threat Assessment', 'Intelligence Analysis', 'Crisis Management'],
    featured: true,
  },
  {
    title: 'Policy Research Methods',
    description: 'Rigorous training in evidence-based research methodologies, data analysis, and policy evaluation techniques.',
    duration: '8 weeks',
    level: 'Intermediate',
    students: '1,200+',
    rating: 4.9,
    icon: BarChart3,
    topics: ['Research Design', 'Data Analysis', 'Impact Evaluation', 'Report Writing'],
    featured: false,
  },
  {
    title: 'Leadership for Governance',
    description: 'Executive development program focusing on strategic leadership, decision-making, and institutional management.',
    duration: '6 weeks',
    level: 'Executive',
    students: '400+',
    rating: 4.7,
    icon: UsersIcon,
    topics: ['Strategic Leadership', 'Decision Making', 'Change Management', 'Ethics & Integrity'],
    featured: false,
  },
]

const levelColors: Record<string, string> = {
  Professional: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Intermediate: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Advanced: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  Executive: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
}

export default function TrainingCourses() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.training-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.training-header',
            start: 'top 85%',
          },
        }
      )

      // Course cards
      gsap.fromTo(
        '.training-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.training-grid',
            start: 'top 80%',
          },
        }
      )

      // Stats banner
      gsap.fromTo(
        '.training-stats',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.training-stats',
            start: 'top 85%',
          },
        }
      )

      // CTA
      gsap.fromTo(
        '.training-cta',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.training-cta',
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
      id="training"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden"
      aria-labelledby="training-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="training-header text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4">
            Professional Development
          </span>
          <h2 id="training-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Expert-Led{' '}
            <span className="gradient-text">Training Programs</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-2">
            Build capacity in governance, security, and policy analysis with our 
            industry-recognized programs designed for professionals and institutions.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="training-grid grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {courses.map((course, index) => (
            <article
              key={index}
              className="training-card group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border card-hover overflow-hidden"
            >
              {/* Featured Badge */}
              {course.featured && (
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <Badge className="bg-accent text-accent-foreground text-[10px] sm:text-xs">
                    Featured
                  </Badge>
                </div>
              )}
              
              {/* Header */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <course.icon className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <Badge className={`${levelColors[course.level]} text-[10px] sm:text-xs`}>
                    {course.level}
                  </Badge>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                {course.description}
              </p>
              
              {/* Topics */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">Key Topics:</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {course.topics.map((topic, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-secondary text-secondary-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Meta Info */}
              <div className="flex items-center gap-3 sm:gap-6 pt-3 sm:pt-4 border-t border-border">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                  <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4" aria-hidden="true" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                  <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4" aria-hidden="true" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs lg:text-sm ml-auto">
                  <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-500 fill-amber-500" aria-hidden="true" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>
              
              {/* Enroll Button */}
              <Button
                className="w-full mt-4 sm:mt-6 btn-primary h-10 sm:h-11 text-sm sm:text-base group-hover:shadow-lg transition-shadow"
                onClick={scrollToContact}
              >
                Enroll Now
                <ArrowRight className="ml-2 w-3.5 sm:w-4 h-3.5 sm:h-4" aria-hidden="true" />
              </Button>
            </article>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="training-stats mt-10 sm:mt-16 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { value: '3,000+', label: 'Professionals Trained' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '150+', label: 'Partner Organizations' },
              { value: '20+', label: 'Expert Faculty' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold gradient-text mb-0.5 sm:mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Training CTA */}
        <div className="training-cta text-center mt-8 sm:mt-12">
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-3 sm:mb-4">
            Looking for customized training for your organization?
          </p>
          <Button variant="outline" className="btn-outline h-9 sm:h-10 text-sm sm:text-base" onClick={scrollToContact}>
            Inquire About Corporate Programs
            <ArrowRight className="ml-2 w-3.5 sm:w-4 h-3.5 sm:h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}

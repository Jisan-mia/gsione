'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Linkedin, 
  ExternalLink, 
  BookOpen,
  Globe,
  Shield,
  Brain,
  Target,
  ChevronRight,
  Award,
  Users,
  Mic
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { founderInfo, gsiSocialLinks, featuredPublications } from '@/data/founder'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const publicationTypeIcons = {
  journal: BookOpen,
  book: BookOpen,
  'policy-brief': Target,
  media: Mic,
}

const publicationTypeLabels = {
  journal: 'Journal Article',
  book: 'Book Chapter',
  'policy-brief': 'Policy Brief',
  media: 'Media Article',
}

export default function AboutClient() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo(
        '.about-hero-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )

      gsap.fromTo(
        '.about-hero-image',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
      )

      // Section animations on scroll
      const sections = ['.about-bio', '.about-expertise', '.about-education', '.about-publications', '.about-media', '.about-contact']
      
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={sectionRef}>
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">About</li>
            </ol>
          </nav>

          {/* Hero Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="about-hero-content order-2 lg:order-1">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Founder & Director
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">{founderInfo.name}</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6">
                {founderInfo.organization}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                {founderInfo.biography.intro}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-3 rounded-xl bg-card border border-border">
                  <div className="text-2xl font-bold gradient-text">7+</div>
                  <div className="text-xs text-muted-foreground">Expertise Areas</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-card border border-border">
                  <div className="text-2xl font-bold gradient-text">8+</div>
                  <div className="text-xs text-muted-foreground">Publications</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-card border border-border">
                  <div className="text-2xl font-bold gradient-text">10+</div>
                  <div className="text-xs text-muted-foreground">Countries</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button asChild className="btn-primary">
                  <Link href={`mailto:${founderInfo.email}`}>
                    <Mail className="mr-2 w-4 h-4" />
                    Get in Touch
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={founderInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="about-hero-image order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl" />
                
                {/* Image container */}
                <div className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px] rounded-2xl overflow-hidden border-2 border-border shadow-2xl">
                  <Image
                    src={founderInfo.image}
                    alt={`${founderInfo.name} - Founder & Director of GSi`}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">GSi</div>
                      <div className="text-[10px] text-muted-foreground">Think Tank</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="about-expertise py-12 sm:py-16 lg:py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Areas of <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-muted-foreground">
              Specialized knowledge spanning cybersecurity governance, artificial intelligence policy, and strategic affairs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {founderInfo.expertise.map((area, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border card-hover group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  {index % 7 === 0 && <Shield className="w-5 h-5" />}
                  {index % 7 === 1 && <Brain className="w-5 h-5" />}
                  {index % 7 === 2 && <Users className="w-5 h-5" />}
                  {index % 7 === 3 && <Globe className="w-5 h-5" />}
                  {index % 7 === 4 && <Target className="w-5 h-5" />}
                  {index % 7 === 5 && <Award className="w-5 h-5" />}
                  {index % 7 === 6 && <Briefcase className="w-5 h-5" />}
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{area.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      <section className="about-education py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Education</h2>
              </div>

              <div className="space-y-4">
                {founderInfo.biography.education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-card border border-border card-hover"
                  >
                    <h3 className="font-semibold mb-1">{edu.degree}</h3>
                    <p className="text-sm text-primary mb-2">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Focus:</span> {edu.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Professional Experience</h2>
              </div>

              <div className="space-y-4">
                {founderInfo.biography.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-card border border-border card-hover"
                  >
                    <h3 className="font-semibold mb-1">{exp.role}</h3>
                    <p className="text-sm text-primary mb-2">{exp.organization}</p>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Publications */}
      <section className="about-publications py-12 sm:py-16 lg:py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Selected <span className="gradient-text">Publications</span>
            </h2>
            <p className="text-muted-foreground">
              Research contributions spanning cybersecurity policy, climate security, and regional governance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {founderInfo.publications.map((pub, index) => {
              const IconComponent = publicationTypeIcons[pub.type]
              return (
                <div
                  key={pub.id}
                  className="p-5 rounded-xl bg-card border border-border card-hover group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[10px]">
                          {publicationTypeLabels[pub.type]}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{pub.year}</span>
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {pub.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                        {pub.authors}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {pub.venue}
                      </p>
                      {pub.doi && (
                        <a
                          href={pub.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                        >
                          View Publication <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Media & Public Engagement */}
      <section className="about-media py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mic className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">Media & Public Engagement</h2>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <p className="text-muted-foreground leading-relaxed mb-6">
                {founderInfo.mediaEngagement.highlight}
              </p>

              <div>
                <h4 className="text-sm font-semibold mb-3">Featured In</h4>
                <div className="flex flex-wrap gap-2">
                  {founderInfo.mediaEngagement.outlets.map((outlet, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {outlet}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-contact py-12 sm:py-16 lg:py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Interested in collaboration, speaking engagements, or research partnerships? 
              Reach out through any of the channels below.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="btn-primary">
                <a href={`mailto:${founderInfo.email}`}>
                  <Mail className="mr-2 w-4 h-4" />
                  {founderInfo.email}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={founderInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 w-4 h-4" />
                  LinkedIn Profile
                </a>
              </Button>
            </div>

            {/* GSi Social Links */}
            <div className="pt-8 border-t border-border">
              <h4 className="text-sm font-semibold mb-4">Follow GSi</h4>
              <div className="flex justify-center gap-3">
                <a
                  href={gsiSocialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="GSi LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={gsiSocialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="GSi Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href={gsiSocialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="GSi Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

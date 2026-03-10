'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Linkedin,
  Twitter,
  Facebook,
  Youtube
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// TODO: Update with actual GSI addresses and contact info
const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'info@gsithinktank.com',
    subContent: 'research@gsithinktank.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+880 2 XXXXXXXX',
    subContent: '+880 1X XXXXXXXX',
  },
  {
    icon: MapPin,
    title: 'Headquarters',
    content: 'Dhaka, Bangladesh',
    subContent: 'South Asia',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Sunday - Thursday',
    subContent: '9:00 AM - 6:00 PM BST',
  },
]

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.contact-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-header',
            start: 'top 85%',
          },
        }
      )

      // Form
      gsap.fromTo(
        '.contact-form',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
          },
        }
      )

      // Info cards
      gsap.fromTo(
        '.contact-info-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
          },
        }
      )

      // Map
      gsap.fromTo(
        '.contact-map',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-map',
            start: 'top 85%',
          },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({
      name: '',
      email: '',
      organization: '',
      subject: '',
      message: '',
    })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="contact-header text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4">
            Partner With Us
          </span>
          <h2 id="contact-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Let&apos;s Shape{' '}
            <span className="gradient-text">Policy Together</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-2">
            Whether you&apos;re a government agency, development partner, or research institution, 
            we&apos;re ready to collaborate on governance and security solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Contact Form */}
          <div className="contact-form order-2 lg:order-1">
            <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-card border border-border">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Send us an inquiry</h3>
              
              {submitted ? (
                <div className="text-center py-8 sm:py-12" role="status">
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Send className="w-6 sm:w-8 h-6 sm:h-8 text-accent" aria-hidden="true" />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Message Received!</h4>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 sm:mb-6">
                    Thank you for your interest. Our team will respond within 24-48 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="h-9 sm:h-10">
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <Label htmlFor="name" className="text-xs sm:text-sm mb-1.5 sm:mb-2 block">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-background h-10 sm:h-11"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs sm:text-sm mb-1.5 sm:mb-2 block">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-background h-10 sm:h-11"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <Label htmlFor="organization" className="text-xs sm:text-sm mb-1.5 sm:mb-2 block">Organization</Label>
                      <Input
                        id="organization"
                        placeholder="Your organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="bg-background h-10 sm:h-11"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-xs sm:text-sm mb-1.5 sm:mb-2 block">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="Partnership inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="bg-background h-10 sm:h-11"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-xs sm:text-sm mb-1.5 sm:mb-2 block">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your organization and how we might collaborate..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="bg-background min-h-[100px] sm:min-h-[120px]"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full btn-primary h-10 sm:h-11"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="ml-2 w-3.5 sm:w-4 h-3.5 sm:h-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info space-y-6 sm:space-y-8 order-1 lg:order-2">
            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="contact-info-card p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl bg-card border border-border card-hover"
                >
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                    <info.icon className="w-4 sm:w-5 h-4 sm:h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h4 className="text-xs sm:text-sm lg:text-base font-semibold mb-1 sm:mb-2">{info.title}</h4>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">{info.content}</p>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">{info.subContent}</p>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="contact-map rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border overflow-hidden h-40 sm:h-48 lg:h-64">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-primary mx-auto mb-2 sm:mb-3 opacity-50" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    Dhaka, Bangladesh
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    South Asia Regional Hub
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Connect With Us</h4>
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    aria-label={`GSI on ${social.label}`}
                  >
                    <social.icon className="w-4 sm:w-5 h-4 sm:h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

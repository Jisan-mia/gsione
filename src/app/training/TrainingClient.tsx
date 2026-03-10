'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Award, ArrowRight, Calendar, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllCourses, getAllCourseCategories } from '@/data/training'

const levelColors: Record<string, string> = {
  Executive: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  Advanced: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  Professional: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
}

const categoryColors: Record<string, string> = {
  Cybersecurity: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  Governance: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Security: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
}

export default function TrainingClient() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const allCourses = getAllCourses()
  const categories = getAllCourseCategories()

  const filteredCourses = selectedCategory === 'All'
    ? allCourses
    : allCourses.filter(course => course.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">Training Programs</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Professional Development
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Training{' '}
              <span className="gradient-text">Programs</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Expert-led programs designed for government officials, executives, and professionals 
              working in governance, cybersecurity, and security policy across South Asia.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">6+</div>
              <div className="text-sm text-muted-foreground">Active Programs</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">500+</div>
              <div className="text-sm text-muted-foreground">Professionals Trained</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">15+</div>
              <div className="text-sm text-muted-foreground">Countries Reached</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Course Banner */}
      <section className="py-6 sm:py-8 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 p-6 sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <Badge className="bg-white/20 text-white border-0 mb-3 sm:mb-4">
                  Next Cohort Starting Soon
                </Badge>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                  Cybersecurity Governance for Executives
                </h2>
                <p className="text-white/80 text-sm sm:text-base max-w-xl">
                  Our flagship executive program begins February 15, 2024. Limited seats available.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link href="/training/cybersecurity-governance-executive">
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link href="/#contact">
                    Request Info
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Courses Grid */}
      <section className="py-8 sm:py-12 lg:py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">All Training Programs</h2>
              <p className="text-sm text-muted-foreground">
                Explore our comprehensive programs designed for professionals at every level
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  className="whitespace-nowrap h-9"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No programs found in this category.</p>
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory('All')}
              >
                View All Programs
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <article key={course.id} className="group">
                  <Link href={`/training/${course.slug}`} className="block h-full">
                    <div className="rounded-xl sm:rounded-2xl bg-card border border-border overflow-hidden card-hover h-full flex flex-col">
                      {/* Course Header */}
                      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10">
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                          <Badge className={`${categoryColors[course.category]} text-xs border`}>
                            {course.category}
                          </Badge>
                          {course.featured && (
                            <Badge className="bg-accent text-accent-foreground text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <Badge className={`${levelColors[course.level]} text-xs border`}>
                            {course.level}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1">
                        <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed flex-1">
                          {course.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{course.format}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="w-3.5 h-3.5" />
                            <span>Max {course.maxParticipants}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Award className="w-3.5 h-3.5" />
                            <span>{course.cpdPoints} CPD</span>
                          </div>
                        </div>

                        {/* Next Cohort */}
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 mb-4">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-xs font-medium">Next: {course.nextCohort}</span>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-sm font-semibold text-primary">{course.price}</span>
                          <span className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Program
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Train With Us */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card/30 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Train With GSi?</h2>
            <p className="text-muted-foreground">
              Our programs are designed specifically for South Asian contexts, combining 
              international best practices with regional expertise.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Expert Instructors</h3>
              <p className="text-sm text-muted-foreground">
                Learn from practitioners with real government and policy experience across the region
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Peer Network</h3>
              <p className="text-sm text-muted-foreground">
                Join a community of professionals across South Asia working on similar challenges
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Practical Focus</h3>
              <p className="text-sm text-muted-foreground">
                Case studies, simulations, and exercises based on real regional challenges
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Regional Context</h3>
              <p className="text-sm text-muted-foreground">
                Content adapted for South Asian institutional and cultural contexts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center p-6 sm:p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border border-border">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Need Customized Training?</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              We design tailored programs for government agencies, organizations, and institutions. 
              Contact us to discuss your specific capacity building needs.
            </p>
            <Button asChild size="lg" className="btn-primary">
              <Link href="/#contact">
                Request Custom Training
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

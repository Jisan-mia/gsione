'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  Users, 
  Award, 
  ArrowRight, 
  Calendar, 
  MapPin,
  CheckCircle,
  BookOpen,
  Target,
  User,
  Mail
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { TrainingCourse } from '@/data/training'
import { founderInfo } from '@/data/founder'

interface Props {
  course: TrainingCourse
  relatedCourses: TrainingCourse[]
}

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

export default function TrainingDetailClient({ course, relatedCourses }: Props) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/training" className="hover:text-primary transition-colors">Training</Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium line-clamp-1">{course.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={`${categoryColors[course.category]} border`}>
                  {course.category}
                </Badge>
                <Badge className={`${levelColors[course.level]} border`}>
                  {course.level}
                </Badge>
                {course.featured && (
                  <Badge className="bg-accent text-accent-foreground">
                    Featured Program
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {course.subtitle}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Duration</span>
                  </div>
                  <span className="font-semibold text-sm">{course.duration}</span>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Format</span>
                  </div>
                  <span className="font-semibold text-sm">{course.format}</span>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Class Size</span>
                  </div>
                  <span className="font-semibold text-sm">Max {course.maxParticipants}</span>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-xs">CPD Points</span>
                  </div>
                  <span className="font-semibold text-sm">{course.cpdPoints}</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-sm max-w-none mb-8">
                <p className="text-base text-muted-foreground leading-relaxed">
                  {course.excerpt}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Program Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Learning Outcomes</h2>
                <div className="space-y-2">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                      <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Curriculum</h2>
                <div className="space-y-4">
                  {course.curriculum.map((week, index) => (
                    <div key={index} className="p-4 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">Week {week.week}</Badge>
                        <h3 className="font-semibold">{week.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{week.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {week.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Should Attend */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Who Should Attend</h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {course.whoShouldAttend.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-2">
                      <User className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Prerequisites</h2>
                <div className="space-y-2">
                  {course.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-start gap-2 p-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{prereq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              {course.testimonials && course.testimonials.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">What Participants Say</h2>
                  <div className="space-y-4">
                    {course.testimonials.map((testimonial, index) => (
                      <div key={index} className="p-4 rounded-lg bg-card border border-border">
                        <p className="text-sm italic text-muted-foreground mb-3">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.organization}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Enrollment Card */}
              <div className="sticky top-24 p-6 rounded-xl bg-card border border-border mb-6">
                <div className="text-2xl font-bold mb-1">{course.price}</div>
                <p className="text-sm text-muted-foreground mb-4">per participant</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Next cohort: <strong>{course.nextCohort}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Enroll by: <strong>{course.enrollmentDeadline}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-primary" />
                    <span>Certificate included</span>
                  </div>
                </div>

                <Button asChild className="w-full btn-primary mb-3">
                  <Link href="/#contact">
                    Enroll Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/#contact">
                    Request Syllabus
                  </Link>
                </Button>
              </div>

              {/* Instructor Card */}
              <div className="p-6 rounded-xl bg-card border border-border mb-6">
                <h3 className="font-semibold mb-4">Your Instructor</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={founderInfo.image}
                      alt={course.instructor}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{course.instructor}</p>
                    <p className="text-xs text-muted-foreground">{course.instructorTitle}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {course.instructorBio}
                </p>
                <Link 
                  href="/about" 
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View full profile
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Tags */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold mb-3">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="py-12 sm:py-16 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-8">Related Programs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <article key={relatedCourse.id} className="group">
                  <Link href={`/training/${relatedCourse.slug}`} className="block h-full">
                    <div className="rounded-xl bg-card border border-border overflow-hidden card-hover h-full flex flex-col">
                      <div className="relative h-32 bg-gradient-to-br from-primary/20 to-accent/20">
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge className={`${categoryColors[relatedCourse.category]} text-xs border`}>
                            {relatedCourse.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedCourse.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {relatedCourse.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                          <span className="text-xs text-muted-foreground">{relatedCourse.duration}</span>
                          <span className="text-xs font-medium text-primary flex items-center gap-1">
                            View <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border border-border">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Questions About This Program?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Contact us to discuss how this program can meet your professional development needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="btn-primary">
                <a href={`mailto:${founderInfo.email}`}>
                  <Mail className="mr-2 w-4 h-4" />
                  Contact Us
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/training">
                  View All Programs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

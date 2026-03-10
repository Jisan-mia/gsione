'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import TrainingCourses from '@/components/TrainingCourses'
import Topics from '@/components/Topics'
import Team from '@/components/Team'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <TrainingCourses />
      <Topics />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

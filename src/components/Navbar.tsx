'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from './ThemeToggle'
import { Menu, Shield } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/', section: 'home' },
  { name: 'About', href: '/about', section: null },
  { name: 'Services', href: '/', section: 'services' },
  { name: 'Training', href: '/', section: 'training' },
  { name: 'Research', href: '/', section: 'research' },
  { name: 'Blog', href: '/blog', section: null },
  { name: 'Contact', href: '/', section: 'contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      if (pathname === '/') {
        const sections = navItems.filter(item => item.section).map(item => item.section as string)
        for (const section of sections.reverse()) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 100) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const isActive = (item: typeof navItems[0]) => {
    if (item.section) {
      return pathname === '/' && activeSection === item.section
    }
    return pathname === item.href
  }

  const getHref = (item: typeof navItems[0]) => {
    if (item.section) {
      return `${item.href}#${item.section}`
    }
    return item.href
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
            aria-label="GSI Think Tank - Home"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg lg:text-xl font-bold gradient-text leading-tight">
                GSI
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                Think Tank
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              item.section ? (
                <Link
                  key={item.name}
                  href={getHref(item)}
                  onClick={(e) => {
                    if (pathname === '/') {
                      e.preventDefault()
                      scrollToSection(item.section as string)
                    }
                  }}
                  className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive(item)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive(item)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            <ThemeToggle />
            
            <Button
              asChild
              className="hidden md:inline-flex btn-primary text-sm h-9 lg:h-10 px-4 lg:px-6"
            >
              <Link
                href="/#contact"
                onClick={(e) => {
                  if (pathname === '/') {
                    e.preventDefault()
                    scrollToSection('contact')
                  }
                }}
              >
                Partner With Us
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[300px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-border">
                    <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-primary flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-bold gradient-text">GSI Think Tank</h2>
                      <p className="text-xs text-muted-foreground">Governance & Security Initiative</p>
                    </div>
                  </div>
                  
                  {/* Mobile Navigation */}
                  <nav className="flex-1 overflow-y-auto p-4 sm:p-6" role="navigation" aria-label="Mobile navigation">
                    <div className="flex flex-col gap-1">
                      {navItems.map((item) => (
                        item.section ? (
                          <Link
                            key={item.name}
                            href={getHref(item)}
                            onClick={(e) => {
                              if (pathname === '/') {
                                e.preventDefault()
                                scrollToSection(item.section as string)
                              } else {
                                setIsOpen(false)
                              }
                            }}
                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              isActive(item)
                                ? 'text-primary bg-primary/10'
                                : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
                            }`}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              isActive(item)
                                ? 'text-primary bg-primary/10'
                                : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
                            }`}
                          >
                            {item.name}
                          </Link>
                        )
                      ))}
                    </div>
                  </nav>
                  
                  {/* Mobile CTA */}
                  <div className="p-4 sm:p-6 border-t border-border">
                    <Button
                      asChild
                      className="w-full btn-primary h-11"
                    >
                      <Link
                        href="/#contact"
                        onClick={(e) => {
                          if (pathname === '/') {
                            e.preventDefault()
                            scrollToSection('contact')
                          }
                        }}
                      >
                        Partner With Us
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { primaryNavigation, siteConfig } from '@/lib/site'
import { ThemeToggle } from '@/components/site/theme-toggle'
import { cn } from '@/lib/utils'

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void
  className?: string
}) {
  const pathname = usePathname()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash)
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)

    return () => window.removeEventListener('hashchange', syncHash)
  }, [pathname])

  return (
    <>
      {primaryNavigation.map((item) => {
        const sectionHash = item.href.startsWith('/#') ? item.href.slice(1) : ''

        const isActive = (() => {
          if (item.href === '/') {
            return pathname === '/' && hash === ''
          }

          if (sectionHash) {
            return pathname === '/' && hash === sectionHash
          }

          return pathname === item.href
        })()

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'rounded-full px-4 py-2 text-sm transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
              className,
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-11 w-11 overflow-hidden rounded-2xl bg-white shadow-sm">
            <Image
              src="/logo.webp"
              alt={`${siteConfig.name} logo`}
              fill
              sizes="44px"
              className="object-contain p-1.5"
              priority
            />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-sm font-semibold tracking-wide text-foreground sm:text-base">
              Governance and Security Initiative - GSi
            </span>
            <span className="block text-xs text-muted-foreground">{siteConfig.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden rounded-full lg:inline-flex">
            <Link href="/#contact">Start a conversation</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Open navigation"
                className="rounded-full border border-border/70"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[20rem] border-l border-border/70 px-0">
              <div className="flex h-full flex-col">
                <div className="border-b border-border/70 px-6 py-5">
                  <p className="text-sm font-semibold">{siteConfig.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{siteConfig.description}</p>
                </div>
                <nav className="flex flex-1 flex-col gap-1 px-4 py-6" aria-label="Mobile">
                  <NavLinks
                    onNavigate={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-base"
                  />
                </nav>
                <div className="border-t border-border/70 px-6 py-5">
                  <Button asChild className="w-full rounded-full">
                    <Link href="/#contact" onClick={() => setOpen(false)}>
                      Start a conversation
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

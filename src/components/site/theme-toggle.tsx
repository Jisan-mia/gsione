'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Theme = 'light' | 'dark'

function applyTheme(nextTheme: Theme) {
  document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  document.documentElement.classList.toggle('light', nextTheme === 'light')
  document.documentElement.dataset.theme = nextTheme
  document.documentElement.style.colorScheme = nextTheme
  window.localStorage.setItem('theme', nextTheme)
}

export function ThemeToggle() {
  const handleToggle = () => {
    const currentTheme: Theme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'

    applyTheme(nextTheme)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={handleToggle}
      className="rounded-full border border-border/70 bg-background/80 backdrop-blur-sm"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

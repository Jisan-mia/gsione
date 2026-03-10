'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGSAP() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip on server
    if (typeof window === 'undefined') return

    const container = containerRef.current
    if (!container) return

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh()

    return () => {
      // Clean up all ScrollTriggers created in this context
      ScrollTrigger.getAll().forEach(trigger => {
        if (container.contains(trigger.trigger as Element)) {
          trigger.kill()
        }
      })
    }
  }, [])

  return containerRef
}

// Fade in up animation
export function animateFadeInUp(
  element: Element | null,
  delay: number = 0,
  duration: number = 0.8
) {
  if (!element) return

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  )
}

// Fade in animation
export function animateFadeIn(
  element: Element | null,
  delay: number = 0,
  duration: number = 0.6
) {
  if (!element) return

  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  )
}

// Stagger children animation
export function animateStagger(
  container: Element | null,
  selector: string,
  staggerDelay: number = 0.1
) {
  if (!container) return

  const children = container.querySelectorAll(selector)
  if (!children.length) return

  return gsap.fromTo(
    children,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: staggerDelay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  )
}

// Scale in animation
export function animateScaleIn(
  element: Element | null,
  delay: number = 0
) {
  if (!element) return

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.9,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  )
}

// Slide from left
export function animateSlideLeft(
  element: Element | null,
  delay: number = 0
) {
  if (!element) return

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -40,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.7,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  )
}

// Slide from right
export function animateSlideRight(
  element: Element | null,
  delay: number = 0
) {
  if (!element) return

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: 40,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.7,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  )
}

export default useGSAP

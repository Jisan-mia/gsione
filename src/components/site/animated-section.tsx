"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationType =
  | "fadeUp"
  | "fadeIn"
  | "scaleIn"
  | "slideLeft"
  | "slideRight";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
}

export function AnimatedSection({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  duration = 0.8,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      if (el) gsap.set(el, { opacity: 1 });
      return;
    }

    const animations: Record<
      AnimationType,
      { from: gsap.TweenVars; to: gsap.TweenVars }
    > = {
      fadeUp: { from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } },
      fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      scaleIn: {
        from: { opacity: 0, scale: 0.97 },
        to: { opacity: 1, scale: 1 },
      },
      slideLeft: { from: { opacity: 0, x: -30 }, to: { opacity: 1, x: 0 } },
      slideRight: { from: { opacity: 0, x: 30 }, to: { opacity: 1, x: 0 } },
    };

    const { from, to } = animations[animation];

    // Check if element is already in viewport (above the fold on page load)
    const rect = el.getBoundingClientRect();
    const isAboveFold = rect.top < window.innerHeight;

    if (isAboveFold) {
      // Animate immediately without ScrollTrigger for above-fold content
      gsap.fromTo(el, from, {
        ...to,
        duration,
        delay: delay + 0.1,
        ease: "power3.out",
      });
    } else {
      const tween = gsap.fromTo(el, from, {
        ...to,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      return () => {
        tween.kill();
      };
    }
  }, [animation, delay, duration]);

  return (
    <div ref={ref} className={cn(className)} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childSelector?: string;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  childSelector = ":scope > *",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || prefersReducedMotion()) return;

    const items = container.querySelectorAll(childSelector);
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: 20 });

    const rect = container.getBoundingClientRect();
    const isAboveFold = rect.top < window.innerHeight;

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: staggerDelay,
      ease: "power3.out",
      ...(isAboveFold
        ? { delay: 0.2 }
        : {
            scrollTrigger: {
              trigger: container,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }),
    });

    return () => {
      tween.kill();
    };
  }, [staggerDelay, childSelector]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${end}${suffix}`;
      return;
    }

    const obj = { value: 0 };

    const tween = gsap.to(obj, {
      value: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
      },
    });

    return () => {
      tween.kill();
    };
  }, [end, suffix, prefix, duration]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}0{suffix}
    </span>
  );
}

interface HeroAnimationProps {
  children: ReactNode;
  className?: string;
}

export function HeroAnimation({ children, className }: HeroAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      if (el) gsap.set(el.children, { opacity: 1 });
      return;
    }

    const elements = el.children;

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      },
    );
  }, []);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

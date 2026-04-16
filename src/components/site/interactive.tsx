"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ── Magnetic Element ─────────────────────────────────────── */
interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({
  children,
  className,
  strength = 0.3,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  return (
    <div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

/* ── Cursor Glow ──────────────────────────────────────────── */
interface CursorGlowProps {
  children: ReactNode;
  className?: string;
}

export function CursorGlow({ children, className }: CursorGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el || !glowRef.current || prefersReducedMotion()) return;

    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    gsap.to(glowRef.current, {
      opacity: 0.15,
      background: `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.4) 0%, transparent 70%)`,
      duration: 0.3,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
        aria-hidden="true"
      />
    </div>
  );
}

/* ── Text Reveal ──────────────────────────────────────────── */
interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  staggerAmount?: number;
}

export function TextReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  staggerAmount = 0.03,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) {
      if (el) {
        el.querySelectorAll(".word-reveal").forEach((word) => {
          (word as HTMLElement).style.opacity = "1";
          (word as HTMLElement).style.transform = "none";
        });
      }
      return;
    }

    const words = el.querySelectorAll(".word-reveal");

    // Check if element is already in viewport
    const rect = el.getBoundingClientRect();
    const isAboveFold = rect.top < window.innerHeight;

    const tween = gsap.fromTo(
      words,
      { opacity: 0, y: "100%", rotateX: -90 },
      {
        opacity: 1,
        y: "0%",
        rotateX: 0,
        duration: 0.8,
        stagger: staggerAmount,
        ease: "power3.out",
        delay: isAboveFold ? delay + 0.1 : delay,
        ...(isAboveFold
          ? {}
          : {
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }),
      },
    );

    return () => {
      tween.kill();
    };
  }, [delay, staggerAmount]);

  const words = children.split(" ");

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={cn(className)}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em]"
          style={{ perspective: "500px" }}
        >
          <span
            className="word-reveal inline-block"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ── Floating Element ─────────────────────────────────────── */
interface FloatingProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}

export function FloatingElement({
  children,
  className,
  amplitude = 12,
  duration = 3,
}: FloatingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.to(el, {
      y: -amplitude,
      duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      tween.kill();
    };
  }, [amplitude, duration]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

/* ── Parallax Section ─────────────────────────────────────── */
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxSection({
  children,
  className,
  speed = 0.3,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.to(el, {
      y: () => -speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

/* ── Marquee ──────────────────────────────────────────────── */
interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner || prefersReducedMotion()) return;

    const totalWidth = inner.scrollWidth / 2;
    const dir = direction === "left" ? -1 : 1;

    gsap.set(inner, { x: direction === "left" ? 0 : -totalWidth });

    const tween = gsap.to(inner, {
      x: dir * -totalWidth + (direction === "right" ? totalWidth : 0),
      duration: totalWidth / speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const val = parseFloat(x) % totalWidth;
          return `${direction === "left" ? val : val - totalWidth}px`;
        },
      },
    });

    if (pauseOnHover) {
      const container = containerRef.current;
      const pause = () => tween.pause();
      const resume = () => tween.resume();
      container?.addEventListener("mouseenter", pause);
      container?.addEventListener("mouseleave", resume);
      return () => {
        tween.kill();
        container?.removeEventListener("mouseenter", pause);
        container?.removeEventListener("mouseleave", resume);
      };
    }

    return () => {
      tween.kill();
    };
  }, [speed, direction, pauseOnHover]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={innerRef} className="flex w-max gap-8" aria-hidden="true">
        {children}
        {children}
      </div>
    </div>
  );
}

/* ── Scroll Progress ──────────────────────────────────────── */
export function ScrollProgress({ className }: { className?: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-60 h-0.75 w-full bg-transparent",
        className,
      )}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-linear-to-r from-primary via-accent to-primary"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* ── Cursor Follower ──────────────────────────────────────── */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hasMoved = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Only show on devices with a pointer
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const showFollower = () => setIsVisible(true);

    const moveDot = (e: PointerEvent) => {
      if (!hasMoved.current) {
        hasMoved.current = true;
        if (dot) dot.style.opacity = "1";
        if (ring) ring.style.opacity = "1";
      }
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener("pointermove", showFollower, { once: true });
    window.addEventListener("pointermove", moveDot);

    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [tabindex]',
    );
    interactives.forEach((el) => {
      el.addEventListener("pointerenter", handleEnter);
      el.addEventListener("pointerleave", handleLeave);
    });

    // Re-query periodically for dynamic content
    const observer = new MutationObserver(() => {
      document
        .querySelectorAll(
          'a, button, [role="button"], input, textarea, select, [tabindex]',
        )
        .forEach((el) => {
          el.addEventListener("pointerenter", handleEnter);
          el.addEventListener("pointerleave", handleLeave);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", showFollower);
      window.removeEventListener("pointermove", moveDot);
      interactives.forEach((el) => {
        el.removeEventListener("pointerenter", handleEnter);
        el.removeEventListener("pointerleave", handleLeave);
      });
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-9999"
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className={cn(
          "absolute -left-1 -top-1 h-2 w-2 rounded-full bg-primary transition-transform duration-200",
          isHovering && "scale-0",
        )}
        style={{ opacity: 0 }}
      />
      <div
        ref={ringRef}
        className={cn(
          "absolute -left-5 -top-5 h-10 w-10 rounded-full border-2 border-primary/50 transition-all duration-300",
          isHovering && "h-16 w-16 -left-8 -top-8 border-primary bg-primary/10",
        )}
        style={{ opacity: 0 }}
      />
    </div>
  );
}

/* ── Animated Line ────────────────────────────────────────── */
interface AnimatedLineProps {
  className?: string;
  delay?: number;
}

export function AnimatedLine({ className, delay = 0 }: AnimatedLineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      if (el) el.style.transform = "scaleX(1)";
      return;
    }

    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        delay,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "h-px origin-left bg-linear-to-r from-transparent via-primary/50 to-transparent",
        className,
      )}
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}

/* ── Number Ticker (enhanced counter) ─────────────────────── */
interface NumberTickerProps {
  end: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function NumberTicker({
  end,
  suffix = "",
  prefix = "",
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${end}${suffix}`;
      return;
    }

    const obj = { value: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.to(obj, {
          value: end,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
          },
        });
      },
    });
  }, [end, suffix, prefix]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}0{suffix}
    </span>
  );
}

/* ── Reveal Mask ──────────────────────────────────────────── */
interface RevealMaskProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function RevealMask({
  children,
  className,
  direction = "up",
  delay = 0,
}: RevealMaskProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      if (el) {
        el.style.clipPath = "inset(0 0 0 0)";
        (el.firstElementChild as HTMLElement).style.transform = "none";
      }
      return;
    }

    const clipMap = {
      up: "inset(100% 0 0 0)",
      down: "inset(0 0 100% 0)",
      left: "inset(0 100% 0 0)",
      right: "inset(0 0 0 100%)",
    };

    const tween = gsap.fromTo(
      el,
      { clipPath: clipMap[direction] },
      {
        clipPath: "inset(0 0 0 0)",
        duration: 1,
        delay,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, [direction, delay]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{ clipPath: "inset(100% 0 0 0)" }}
    >
      {children}
    </div>
  );
}

/* ── Hover Glow ───────────────────────────────────────────── */
interface HoverGlowProps {
  children: ReactNode;
  className?: string;
}

export function HoverGlow({ children, className }: HoverGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const glow = glowRef.current;
    const el = ref.current;
    if (!glow || !el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glow, {
      x: x - 150,
      y: y - 150,
      opacity: 1,
      duration: 0.3,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
    }
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-75 w-75 rounded-full bg-primary/10 opacity-0 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ── Staggered Text ───────────────────────────────────────── */
interface StaggeredTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  charDelay?: number;
}

export function StaggeredText({
  text,
  className,
  as: Tag = "span",
  charDelay = 0.02,
}: StaggeredTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      if (el) el.style.opacity = "1";
      return;
    }

    const chars = el.querySelectorAll(".char");

    const tween = gsap.fromTo(
      chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: charDelay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, [charDelay]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={cn(className)}
      style={{ opacity: 0 }}
    >
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="char inline-block"
          style={{ willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}

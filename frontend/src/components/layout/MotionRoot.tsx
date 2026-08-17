"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenis } from "@/hooks/useLenis";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Wires up the page-wide motion stack (Lenis smooth scroll + GSAP
 * ScrollTrigger reveals) in one place, keyed off a single reduced-motion
 * read so every animation source respects the same preference consistently.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useLenis(reducedMotion);
  useScrollReveal(containerRef, reducedMotion);

  return (
    <div ref={containerRef} className="site-shell">
      {children}
    </div>
  );
}

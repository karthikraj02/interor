"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Fades and lifts every `.reveal` element inside the given container into
 * view as it scrolls in. Elements are visible by default in markup/CSS, so
 * nothing is hidden if JavaScript fails or motion is reduced.
 */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>, reducedMotion: boolean) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const targets = container.querySelectorAll<HTMLElement>(".reveal");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 28 });
      targets.forEach((el, index) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: (index % 4) * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, reducedMotion]);
}

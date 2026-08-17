"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initializes Lenis smooth scrolling and keeps the RAF loop tied to the
 * component lifecycle: the frame id is stored and cancelled on cleanup, and
 * scrolling never initializes for visitors who prefer reduced motion.
 */
export function useLenis(reducedMotion: boolean) {
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frameId = 0;

    const tick = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [reducedMotion]);
}

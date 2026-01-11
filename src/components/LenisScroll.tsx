"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !isFinePointer) {
      return;
    }

    const lenis = new Lenis({
      wrapper: window,
      content: document.documentElement,
      smoothWheel: true,
      lerp: 0.08,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 1,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

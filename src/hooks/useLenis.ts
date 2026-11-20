"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "@/lib/animations";

let activeLenis: Lenis | null = null;

export function scrollToTarget(target: string | number, offset = -72): void {
  if (activeLenis) {
    activeLenis.scrollTo(target, { offset, duration: 1.25 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }
  const element = document.querySelector<HTMLElement>(target);
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function useLenis(): React.RefObject<Lenis | null> {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      window.dispatchEvent(new Event("bw:loaded"));
      return;
    }

    registerGsap();

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      lerp: 0.1,
    });

    lenisRef.current = lenis;
    activeLenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const pause = () => lenis.stop();
    const resume = () => lenis.start();
    window.addEventListener("bw:loading", pause);
    window.addEventListener("bw:loaded", resume);

    return () => {
      window.removeEventListener("bw:loading", pause);
      window.removeEventListener("bw:loaded", resume);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      activeLenis = null;
    };
  }, []);

  return lenisRef;
}

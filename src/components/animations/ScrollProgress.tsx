"use client";

import { useRef } from "react";
import { gsap } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement | null>(null);

  useGsap(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
        },
      },
    );
  }, { scope: bar });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[130] h-px bg-transparent">
      <div ref={bar} className="h-full w-full origin-left bg-gold" />
    </div>
  );
}

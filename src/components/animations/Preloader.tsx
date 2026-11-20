"use client";

import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { gsap, prefersReducedMotion } from "@/lib/animations";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const panel = useRef<HTMLDivElement | null>(null);
  const counter = useRef<HTMLSpanElement | null>(null);
  const bar = useRef<HTMLDivElement | null>(null);
  const mark = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("bw:loading"));

    if (prefersReducedMotion()) {
      document.body.dataset.loaded = "true";
      window.dispatchEvent(new Event("bw:loaded"));
      document.body.style.overflow = previous;
      requestAnimationFrame(() => setVisible(false));
      return;
    }

    const progress = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = previous;
          setVisible(false);
        },
      });

      tl.to(progress, {
        value: 100,
        duration: 1.15,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counter.current) {
            counter.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
          }
          if (bar.current) {
            gsap.set(bar.current, { scaleX: progress.value / 100 });
          }
        },
      })
        .to(mark.current, { opacity: 0, y: -18, duration: 0.4, ease: "power2.in" }, ">-0.05")
        .to(".loader-line", { scaleX: 0, duration: 0.4, ease: "power2.inOut" }, "<")
        .add(() => {
          document.body.dataset.loaded = "true";
          window.dispatchEvent(new Event("bw:loaded"));
        }, "<")
        .to(panel.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<");
    }, panel);

    return () => {
      ctx.revert();
      document.body.style.overflow = previous;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={panel}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ink"
      aria-hidden="true"
    >
      <div ref={mark} className="flex flex-col items-center">
        <BrandMark className="h-16 w-auto text-bone md:h-20" />
        <span className="mt-6 font-mono-label text-bone/50">Bhavya Wade</span>
      </div>

      <div className="absolute bottom-[12vh] flex w-[min(78vw,560px)] flex-col items-center gap-4">
        <div className="loader-line h-px w-full origin-left bg-bone/15">
          <div ref={bar} className="h-px w-full origin-left bg-gold" />
        </div>
        <div className="flex w-full items-end justify-between font-mono-label text-bone/60">
          <span>Loading the build</span>
          <span ref={counter} className="font-display text-2xl tracking-normal text-bone">
            000
          </span>
        </div>
      </div>
    </div>
  );
}

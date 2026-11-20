"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IMAGES } from "@/lib/constants";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";
import { scrollToTarget } from "@/hooks/useLenis";

export function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const imageWrap = useRef<HTMLDivElement | null>(null);
  const imageInner = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.body.dataset.loaded === "true") {
      requestAnimationFrame(() => setReady(true));
      return;
    }
    const onLoaded = () => setReady(true);
    window.addEventListener("bw:loaded", onLoaded, { once: true });
    return () => window.removeEventListener("bw:loaded", onLoaded);
  }, []);

  useGsap(
    () => {
      if (!ready) return;
      if (prefersReducedMotion()) {
        gsap.set(imageWrap.current, { clipPath: "inset(0 0 0% 0)" });
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(
        imageWrap.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.35, ease: "power4.inOut" },
      )
        .fromTo(
          imageInner.current,
          { scale: 1.18 },
          { scale: 1, duration: 1.8, ease: "power3.out" },
          "<",
        )
        .fromTo(
          root.current?.querySelectorAll<HTMLElement>("[data-hero-line]") ?? [],
          { yPercent: 115 },
          { yPercent: 0, duration: 1.25, stagger: 0.11, ease: "power4.out" },
          "-=0.9",
        )
        .fromTo(
          root.current?.querySelectorAll<HTMLElement>("[data-hero-fade]") ?? [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" },
          "-=0.55",
        );

      gsap.to(imageInner.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [ready], revertOnUpdate: false },
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
      aria-label="Bhavya Wade — building the unexpected"
    >
      <div ref={imageWrap} className="reveal-clip absolute inset-0">
        <div ref={imageInner} className="absolute inset-0">
          <Image
            src={IMAGES.heroPortrait.src}
            alt={IMAGES.heroPortrait.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_18%] opacity-[0.88]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/25 via-40% to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_45%,transparent_0%,rgba(11,10,15,0.65)_75%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
        <span className="font-display text-[36vw] leading-none text-outline opacity-[0.16] md:text-[22vw]">
          BW
        </span>
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-[var(--page-x)] pb-7 pt-28 md:pb-10 md:pt-36">
        <div className="flex items-start justify-between gap-6">
          <div data-hero-fade className="flex flex-col gap-1.5 opacity-0">
            <span className="font-mono-label text-gold">01 / The beginning</span>
            <span className="flex items-center gap-2 font-mono-label text-bone/55">
              <span className="signal-dot" aria-hidden />
              Mumbai, India
            </span>
          </div>
          <div data-hero-fade className="hidden text-right opacity-0 sm:block">
            <span className="font-mono-label block text-bone/55">Frontend developer</span>
            <span className="font-mono-label block text-bone/55">AI application builder</span>
          </div>
        </div>

        <div className="relative my-auto py-10">
          <h1
            aria-label="Bhavya Wade"
            className="font-display text-[clamp(4.2rem,15.5vw,15.5rem)] leading-[0.8] tracking-[-0.015em] text-bone"
          >
            <span className="word-mask block">
              <span data-hero-line className="word-inner block">
                Bhavya
              </span>
            </span>
            <span className="word-mask block">
              <span data-hero-line className="word-inner block pl-[8vw] md:pl-[11vw]">
                Wade
              </span>
            </span>
          </h1>

          <div className="mt-8 flex flex-col gap-4 md:mt-10 md:flex-row md:items-end md:justify-between">
            <div data-hero-fade className="flex items-center gap-4 opacity-0">
              <span className="h-px w-14 bg-gold" />
              <p className="font-display text-2xl tracking-[0.02em] text-gold md:text-4xl">
                Building the unexpected.
              </p>
            </div>
            <p
              data-hero-fade
              className="max-w-sm font-mono-label leading-[2] text-bone/65 opacity-0 md:text-right"
            >
              Interfaces, intelligence and ideas — made to feel inevitable.
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <button
            type="button"
            onClick={() => scrollToTarget("#about")}
            data-hero-fade
            data-cursor="explore"
            className="group flex items-center gap-3 opacity-0"
          >
            <span className="relative block h-10 w-px overflow-hidden bg-bone/25">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[bw-scroll_2.2s_ease-in-out_infinite] bg-gold" />
            </span>
            <span className="font-mono-label text-bone/60 transition-colors group-hover:text-bone">
              Scroll to explore
            </span>
          </button>
          <span data-hero-fade className="font-mono-label text-bone/40 opacity-0">
            © 2026 — The build continues
          </span>
        </div>
      </div>
    </section>
  );
}

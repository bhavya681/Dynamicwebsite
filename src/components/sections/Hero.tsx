"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { IMAGES } from "@/lib/constants";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";
import { scrollToTarget } from "@/hooks/useLenis";
import { Button } from "@/components/ui/Button";

const PORTRAIT_CAPTIONS = ["The builder", "In focus", "Always building"];

export function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const portrait = useRef<HTMLDivElement | null>(null);
  const portraitInner = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [caption, setCaption] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const interval = window.setInterval(() => {
      setCaption((value) => (value + 1) % PORTRAIT_CAPTIONS.length);
    }, 3600);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    if (document.body.dataset.loaded === "true") {
      requestAnimationFrame(finish);
      return;
    }

    const fallback = window.setTimeout(finish, 1800);
    window.addEventListener("bw:loaded", finish, { once: true });
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("bw:loaded", finish);
    };
  }, []);

  useGsap(
    () => {
      if (!ready) return;
      const lines = root.current?.querySelectorAll<HTMLElement>("[data-hero-line]") ?? [];
      const fades = root.current?.querySelectorAll<HTMLElement>("[data-hero-fade]") ?? [];
      const rules = root.current?.querySelectorAll<HTMLElement>("[data-hero-rule]") ?? [];

      if (prefersReducedMotion()) {
        gsap.set([...lines, ...fades], { yPercent: 0, y: 0, opacity: 1 });
        gsap.set(rules, { scaleX: 1 });
        gsap.set(portrait.current, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline();
      tl.fromTo(portrait.current, { opacity: 0, y: 46 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
        .fromTo(lines, { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.11, ease: "power4.out" }, "<0.1")
        .fromTo(fades, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, "-=0.65")
        .fromTo(rules, { scaleX: 0 }, { scaleX: 1, duration: 1, stagger: 0.12, ease: "power3.out" }, "-=0.7");

      gsap.to(portraitInner.current, {
        y: -12,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to("[data-hero-orbit]", {
        rotate: 360,
        duration: 26,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: root, dependencies: [ready], revertOnUpdate: false },
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
      aria-label="Bhavya Wade — frontend and full-stack developer"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(182,138,62,0.13),transparent_46%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_78%,rgba(79,43,171,0.16),transparent_44%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,240,231,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,240,231,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-[38rem] w-[38rem] -translate-y-1/2 lg:block" aria-hidden>
        <div data-hero-orbit className="h-full w-full rounded-full border border-dashed border-gold/15">
          <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center" aria-hidden>
        <span className="font-display text-[34vw] leading-none text-outline opacity-[0.08] animate-[bw-pulse_7s_ease-in-out_infinite] md:text-[18vw]">
          BW
        </span>
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-[var(--page-x)] pb-6 pt-24 sm:pb-7 sm:pt-28 md:pb-10 md:pt-36">
        <div className="flex items-start justify-between gap-6" data-hero-fade>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono-label text-gold">नमस्ते · Namaste</span>
            <span className="flex items-center gap-2 font-mono-label text-bone/55">
              <span className="signal-dot" aria-hidden />
              Mumbai, India · Scogo Networks
            </span>
          </div>
          <div className="hidden text-right sm:block">
            <span className="font-mono-label block text-bone/55">Software engineer</span>
            <span className="font-mono-label block text-bone/55">AI &amp; data science</span>
          </div>
        </div>

        <div className="relative grid flex-1 items-center gap-10 py-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1
              aria-label="Bhavya Wade"
              className="font-display text-[clamp(3.6rem,14vw,13rem)] leading-[0.8] tracking-[-0.015em] text-bone"
            >
              <span className="word-mask block">
                <span data-hero-line className="word-inner block">
                  Bhavya
                </span>
              </span>
              <span className="word-mask block">
                <span data-hero-line className="word-inner block pl-[6vw] md:pl-[9vw]">
                  Wade
                </span>
              </span>
            </h1>

            <div className="mt-8 md:mt-10">
              <span data-hero-rule className="block h-px w-20 origin-left bg-gold" />
              <p data-hero-fade className="mt-6 max-w-lg font-display text-xl leading-[1.35] text-gold sm:text-2xl md:text-3xl">
                Practical web products, built with intent.
              </p>
              <p
                data-hero-fade
                className="mt-5 max-w-md font-mono-label leading-[2] text-bone/60"
              >
                Frontend / full-stack developer building with React, Next.js and TypeScript — and exploring the edges of AI engineering.
              </p>
            </div>

            <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-4">
              <Button onClick={() => scrollToTarget("#about")}>
                Explore the work <span aria-hidden>↗</span>
              </Button>
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTarget("#contact");
                }}
                data-cursor="link"
                className="link-underline font-mono-label text-bone/60 transition-colors hover:text-gold"
              >
                Start a conversation
              </a>
            </div>
          </div>

          <div ref={portrait} className="opacity-0 lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[23rem] lg:max-w-none">
              <div ref={portraitInner} className="relative aspect-[3/4] w-full">
                <div className="absolute -inset-3 border border-bone/10" aria-hidden />
                <div
                  className="pointer-events-none absolute -inset-3 animate-[bw-frame-pulse_8s_ease-in-out_infinite] border border-gold/50"
                  aria-hidden
                />
                <div className="absolute -left-3 -top-3 h-8 w-8 border-l border-t border-gold" aria-hidden />
                <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b border-r border-gold" aria-hidden />
                <Image
                  src={IMAGES.heroVisual.src}
                  alt={IMAGES.heroVisual.alt}
                  fill
                  preload
                  sizes="(max-width: 1023px) 23rem, 38vw"
                  className="object-cover object-center"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-[bw-shimmer_9s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-bone/20 to-transparent"
                  aria-hidden
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 p-4 font-mono-label text-bone/75 md:p-5">
                  <MotionConfig reducedMotion="user">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={caption}
                        initial={{ opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -7 }}
                        transition={{ duration: 0.35 }}
                        className="inline-flex items-center gap-2"
                      >
                        <span className="text-gold">FIG. 01 /</span>
                        {PORTRAIT_CAPTIONS[caption]}
                      </motion.span>
                    </AnimatePresence>
                  </MotionConfig>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> ONLINE
                  </span>
                </div>
              </div>
            </div>
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
          <span data-hero-fade className="hidden font-mono-label text-bone/40 opacity-0 sm:block">
            © 2026 — The build continues
          </span>
        </div>
      </div>
    </section>
  );
}

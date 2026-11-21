"use client";

import { useRef } from "react";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT_PARAGRAPHS, EDUCATION, IMAGES, SKILLS } from "@/lib/constants";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";

const MARQUEE_WORDS = ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind", "AI"];

export function About() {
  const root = useRef<HTMLElement | null>(null);

  useGsap(
    () => {
      const lines = root.current?.querySelectorAll<HTMLElement>("[data-about-line]") ?? [];
      if (prefersReducedMotion()) {
        gsap.set(lines, { scaleX: 1 });
        return;
      }
      gsap.fromTo(
        lines,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="relative overflow-hidden bg-ink py-24 md:py-40">
      <div className="page-x">
        <SectionLabel index="02">The introduction</SectionLabel>

        <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <RevealText
              as="h2"
              text="Practical engineering, clear interfaces."
              className="font-display text-[clamp(2.6rem,6.4vw,6.4rem)] leading-[0.9] text-bone"
            />
          </div>
          <div className="flex items-end lg:col-span-3">
            <p className="max-w-xs font-mono-label leading-[2.1] text-bone/50">
              Frontend / full-stack developer · React, Next.js, TypeScript and AI.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:col-start-1">
            <ImageReveal
              image={IMAGES.aboutPortrait}
              className="aspect-[4/5] w-full md:aspect-[3/4] md:max-w-lg lg:aspect-[4/5] lg:max-w-none"
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 42vw"
              parallax
              cursorLabel="EXPLORE"
              position="50% 38%"
              zoom
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono-label text-bone/40">
              <span>Fig. 01 — The builder</span>
              <span>Mumbai → Internet</span>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <div className="space-y-8">
              {ABOUT_PARAGRAPHS.map((paragraph, index) => (
                <div key={paragraph} className="grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[4rem_1fr]">
                  <span className="font-mono-label pt-2 text-gold">0{index + 1}</span>
                  <RevealText
                    as="p"
                    text={paragraph}
                    className="text-[1.05rem] leading-[1.75] text-bone/75 md:text-xl md:leading-[1.7]"
                    stagger={0.018}
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-bone/10 pt-8">
              <span className="font-mono-label text-gold">Education</span>
              <div className="mt-5 space-y-4">
                {EDUCATION.map((entry) => (
                  <div
                    key={entry.degree}
                    className="grid gap-1 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-4"
                  >
                    <span className="font-mono-label text-bone/35">{entry.year}</span>
                    <p className="text-sm leading-relaxed text-bone/70">{entry.degree}</p>
                    <span className="font-mono-label text-bone/45">{entry.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-bone/10 pt-8">
              <span className="font-mono-label text-gold">Stack</span>
              <div className="mt-5 space-y-3">
                {SKILLS.map((group) => (
                  <div key={group.label} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-4">
                    <span className="font-mono-label text-bone/35">{group.label}</span>
                    <p className="text-sm leading-relaxed text-bone/65">{group.items.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 flex flex-col gap-8 border-t border-bone/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span data-about-line className="block h-px w-16 origin-left bg-gold" />
                <p className="mt-5 font-display text-3xl leading-tight text-bone md:text-5xl">
                  The interface is the product.
                  <br />
                  <span className="text-gold">The story is the proof.</span>
                </p>
              </div>
              <ImageReveal
                image={IMAGES.aboutAccent}
                className="aspect-square w-28 shrink-0 md:w-40"
                sizes="160px"
                position="50% 45%"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 overflow-hidden border-y border-bone/10 py-6 md:mt-36">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {MARQUEE_WORDS.map((word) => (
                <span key={`${copy}-${word}`} className="flex items-center">
                  <span className="px-6 font-display text-4xl text-outline sm:px-8 md:text-6xl">{word}</span>
                  <span className="text-gold">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

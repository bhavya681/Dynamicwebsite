"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CONTACT_EMAIL, HIGHLIGHTS, PROFILE_HEADLINE } from "@/lib/constants";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";

export function Highlights() {
  const root = useRef<HTMLElement | null>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        root.current?.querySelectorAll<HTMLElement>("[data-highlight-row]") ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
        },
      );
      gsap.fromTo(
        root.current?.querySelectorAll<HTMLElement>("[data-highlight-line]") ?? [],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="highlights" ref={root} className="relative overflow-hidden bg-ink py-24 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(212,162,74,0.11),transparent_45%)]" />
      <div className="page-x relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel index="04">Signals</SectionLabel>
            <RevealText
              as="h2"
              text="Receipts, not rumors."
              className="mt-8 max-w-4xl font-display text-[clamp(3rem,9vw,9rem)] leading-[0.86] text-bone"
            />
          </div>
          <p className="max-w-[17rem] font-mono-label leading-[2] text-bone/45">{PROFILE_HEADLINE}</p>
        </div>

        <div className="mt-16 border-t border-bone/12 md:mt-24">
          {HIGHLIGHTS.map((item, index) => {
            const content = (
              <>
                <span
                  data-highlight-line
                  className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-gold/70 via-gold/20 to-transparent"
                />
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-bone/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative shrink-0 font-mono-label text-bone/35">0{index + 1}</span>
                <span className="relative w-12 shrink-0 font-display text-xl text-gold/80 sm:w-16 sm:text-2xl md:w-20 md:text-3xl">
                  {item.year}
                </span>
                <span className="relative min-w-0 flex-1">
                  <span className="font-mono-label text-bone/40">{item.category}</span>
                  <span className="mt-2 block font-display text-2xl leading-none text-bone transition-colors duration-300 group-hover:text-gold sm:text-3xl md:text-5xl">
                    {item.title}
                  </span>
                  <span className="mt-3 block max-w-xl text-xs leading-relaxed text-bone/50 sm:text-sm md:text-base">
                    {item.detail}
                  </span>
                </span>
                {item.href && (
                  <ArrowUpRight
                    size={22}
                    strokeWidth={1.4}
                    className="relative hidden shrink-0 text-bone/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold sm:block"
                  />
                )}
              </>
            );

            const className =
              "group relative flex items-start gap-3 overflow-hidden border-b border-bone/12 py-6 sm:gap-4 md:items-center md:gap-8 md:py-9";

            return item.href ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                data-highlight-row
                data-cursor="link"
                className={className}
              >
                {content}
              </a>
            ) : (
              <div key={item.title} data-highlight-row className={className}>
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-5 font-mono-label text-bone/40">
          <span className="text-gold">From LinkedIn &amp; the build log</span>
          <span className="h-px flex-1 bg-bone/12" />
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-cursor="link"
            className="link-underline transition-colors hover:text-gold"
          >
            Always open to a good conversation ↗
          </a>
        </div>
      </div>
    </section>
  );
}

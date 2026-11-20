"use client";

import Image from "next/image";
import { useRef } from "react";
import { BUILDS } from "@/lib/constants";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Moments() {
  const root = useRef<HTMLElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const progress = useRef<HTMLDivElement | null>(null);

  useGsap(
    () => {
      if (prefersReducedMotion() || window.innerWidth < 768) return;
      const trackEl = track.current;
      const rootEl = root.current;
      if (!trackEl || !rootEl) return;

      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);

      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: rootEl,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progress.current) gsap.set(progress.current, { scaleX: self.progress });
          },
        },
      });

      gsap.fromTo(
        trackEl.querySelectorAll("[data-build-inner]"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: rootEl, start: "top 70%", once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      id="work"
      ref={root}
      className="relative flex h-[100svh] flex-col justify-center overflow-hidden bg-ink py-16 md:py-0"
      aria-label="Selected builds"
    >
      <div className="page-x flex items-end justify-between gap-6">
        <div>
          <SectionLabel index="04">Selected builds</SectionLabel>
          <h2 className="mt-5 font-display text-4xl leading-none text-bone md:text-6xl">
            The ones that <span className="text-gold">shipped.</span>
          </h2>
        </div>
        <p className="hidden font-mono-label text-bone/40 md:block">Scroll to move through →</p>
      </div>

      <div className="no-scrollbar mt-10 overflow-x-auto md:mt-14 md:overflow-visible">
        <div ref={track} className="flex w-max gap-5 px-[var(--page-x)] md:gap-8">
          {BUILDS.map((build) => (
            <article
              key={build.number}
              data-build-inner
              data-cursor="drag"
              data-cursor-label="DRAG"
              className={`relative h-[52vh] w-[76vw] shrink-0 overflow-hidden md:h-[58vh] md:w-[62vw] lg:w-[46vw] ${
                build.tone === "gold" ? "bg-gold" : build.tone === "light" ? "bg-sand" : "bg-ink-soft"
              }`}
            >
              <Image
                src={build.image.src}
                alt={build.image.alt}
                fill
                sizes="(max-width: 768px) 76vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-8">
                <span className="font-mono-label text-bone/70">
                  {build.number} / {String(BUILDS.length).padStart(2, "0")}
                </span>
                <span className="font-display text-5xl leading-none text-outline md:text-7xl">
                  {build.number}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                <span className="font-mono-label text-gold">{build.stat}</span>
                <h3 className="mt-3 max-w-lg font-display text-4xl leading-[0.9] text-bone md:text-6xl">
                  {build.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/70 md:text-base">
                  {build.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="page-x mt-8 flex items-center gap-4 md:mt-12">
        <div className="h-px flex-1 bg-bone/15">
          <div ref={progress} className="h-px w-full origin-left scale-x-0 bg-gold" />
        </div>
        <span className="font-mono-label text-bone/40">
          {String(BUILDS.length).padStart(2, "0")} builds
        </span>
      </div>
    </section>
  );
}

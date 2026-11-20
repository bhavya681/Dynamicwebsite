"use client";

import { useRef } from "react";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { IMAGES, PERSONAL } from "@/lib/constants";
import { gsap } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";
import { scrollToTarget } from "@/hooks/useLenis";

export function Lifestyle() {
  const root = useRef<HTMLElement | null>(null);

  useGsap(
    () => {
      gsap.fromTo(
        root.current?.querySelectorAll<HTMLElement>("[data-lifestyle-card]") ?? [],
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
        },
      );
    },
    { scope: root },
  );

  const shapeClass: Record<string, string> = {
    tall: "aspect-[3/4]",
    wide: "aspect-[4/3]",
    square: "aspect-square",
  };

  return (
    <section
      id="personal"
      ref={root}
      className="relative overflow-hidden bg-bone py-24 text-ink md:py-40"
    >
      <div className="page-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel index="05" dark>
              Off the code
            </SectionLabel>
            <RevealText
              as="h2"
              text="Beyond the code."
              className="mt-8 font-display text-[clamp(3.6rem,12vw,12rem)] leading-[0.82] text-ink"
            />
          </div>
          <p className="max-w-xs font-mono-label leading-[2] text-ink/55 md:pb-4">
            Side projects, AI, frontend craft, MMA and the habits that keep the build moving.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:mt-28 md:grid-cols-12 md:gap-8">
          {PERSONAL.map((story, index) => {
            const position =
              index === 0
                ? "col-span-2 md:col-span-4 md:col-start-1 md:mt-0"
                : index === 1
                  ? "col-span-2 md:col-span-5 md:col-start-6 md:mt-24"
                  : index === 2
                    ? "col-span-1 md:col-span-4 md:col-start-2 md:-mt-10"
                    : "col-span-1 md:col-span-3 md:col-start-9 md:mt-0";
            return (
              <article
                key={story.title}
                data-lifestyle-card
                data-cursor="view"
                data-cursor-label="EXPLORE"
                className={`${position} group`}
              >
                <ImageReveal
                  image={story.image}
                  className={`${shapeClass[story.shape]} w-full`}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  zoom
                  parallax
                />
                <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-ink/15 pt-3">
                  <div>
                    <span className="font-mono-label text-ink/45">{story.tag}</span>
                    <h3 className="mt-1 font-display text-2xl leading-none text-ink md:text-3xl">
                      {story.title}
                    </h3>
                  </div>
                  <span className="font-mono-label text-ink/40">0{index + 1}</span>
                </div>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/60">{story.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-24 grid gap-10 border-t border-ink/15 pt-12 md:mt-36 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <span className="font-mono-label text-ink/45">In his own words</span>
            <RevealText
              as="p"
              text="I want people to remember me as someone who actually built things."
              className="mt-6 font-display text-[clamp(2.6rem,6.5vw,6rem)] leading-[0.9] text-ink"
            />
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/60 md:text-lg">
              More than titles, more than tools. Shipping work that holds up, learning in public and
              staying curious about what comes next.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <ImageReveal
              image={IMAGES.personalFeature}
              className="aspect-[5/4] w-full"
              sizes="(max-width: 768px) 100vw, 33vw"
              cursorLabel="VIEW"
            />
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <span className="font-mono-label text-ink/45">The influence</span>
                <p className="mt-2 font-display text-xl text-ink md:text-2xl">
                  Never predictable.
                </p>
              </div>
              <Button
                variant="ghost"
                className="!text-ink hover:!text-gold"
                onClick={() => scrollToTarget("#work")}
              >
                See the work <span aria-hidden>↗</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

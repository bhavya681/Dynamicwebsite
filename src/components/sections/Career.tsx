"use client";

import { useRef } from "react";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { STATS } from "@/lib/constants";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";

const TIMELINE = [
  {
    year: "2024–Now",
    title: "Frontend Developer · Scogo Networks",
    detail: "PPO after internship. React, Next.js, TypeScript, ShadCN, Zustand, secure REST, WCAG 2.1 and CI/CD.",
  },
  {
    year: "May–Jun 2024",
    title: "AI & ML Intern · Kodacy",
    detail: "Chatbot NLP, intent classification, Python, scikit-learn and model evaluation.",
  },
  {
    year: "Dec 2023",
    title: "IoT Intern · Kodacy",
    detail: "Sensor prototypes, MQTT, edge-to-cloud dashboards and embedded firmware basics.",
  },
  {
    year: "Jun–Jul 2023",
    title: "Network Engineer Intern · Tata Steel",
    detail: "Python ping monitoring, industrial IT visibility and OT/IT integration.",
  },
];

function formatCount(value: number, final: string): string {
  const rounded = Math.round(value);
  const withCommas = final.includes(",") ? rounded.toLocaleString("en-US") : String(rounded);
  if (final.includes("+")) return `${withCommas}+`;
  if (final.includes("×")) return `${withCommas}×`;
  return withCommas;
}

export function Career() {
  const root = useRef<HTMLElement | null>(null);

  useGsap(
    () => {
      const counters = root.current?.querySelectorAll<HTMLElement>("[data-count]") ?? [];
      counters.forEach((element) => {
        const final = element.dataset.count ?? "0";
        if (prefersReducedMotion()) {
          element.textContent = final;
          return;
        }
        const target = Number(final.replace(/[^0-9]/g, "")) || 0;
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.9,
          ease: "power3.out",
          onUpdate: () => {
            element.textContent = formatCount(state.value, final);
          },
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        });
      });

      gsap.fromTo(
        root.current?.querySelectorAll<HTMLElement>("[data-career-row]") ?? [],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="career" ref={root} className="relative overflow-hidden bg-ink-soft py-24 md:py-40">
      <div className="page-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="03">In the build</SectionLabel>
            <RevealText
              as="h2"
              text="The work is the record."
              className="mt-8 max-w-4xl font-display text-[clamp(3rem,9vw,9rem)] leading-[0.86] text-bone"
            />
          </div>
          <p className="max-w-[15rem] font-mono-label leading-[2] text-bone/45">
            Frontend developer at Scogo Networks, with internships across AI/ML, IoT and network engineering.
          </p>
        </div>

        <div className="mt-16 md:mt-24">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              data-career-row
              className="group grid grid-cols-1 items-baseline gap-1 border-t border-bone/12 py-7 last:border-b md:grid-cols-12 md:gap-6 md:py-9"
            >
              <span className="font-mono-label text-gold md:col-span-1">0{index + 1}</span>
              <div className="md:col-span-6">
                <span
                  data-count={stat.value}
                  className="block font-display text-[clamp(4rem,10vw,10rem)] leading-[0.8] text-bone transition-colors duration-500 group-hover:text-gold"
                >
                  {stat.value}
                </span>
              </div>
              <div className="md:col-span-3">
                <span className="font-display text-xl tracking-[0.02em] text-bone md:text-2xl">
                  {stat.label}
                </span>
              </div>
              <span className="font-mono-label text-bone/40 md:col-span-2 md:text-right">
                {stat.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="page-x mt-20 md:mt-28">
        <div className="grid gap-px border border-bone/10 bg-bone/10 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Clarity over cleverness",
              text: "Interfaces should explain themselves. Every state, label and transition earns its place.",
            },
            {
              number: "02",
              title: "Built for the browser",
              text: "Accessible, responsive and fast — the real constraints are the product.",
            },
            {
              number: "03",
              title: "Measure, then refine",
              text: "Ship small, watch the result, tighten the details. The second pass is where craft shows.",
            },
          ].map((principle) => (
            <div key={principle.number} className="bg-ink-soft p-7 md:p-9">
              <span className="font-mono-label text-gold">{principle.number} / Principle</span>
              <h3 className="mt-8 font-display text-2xl leading-tight text-bone md:text-3xl">
                {principle.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-bone/50">{principle.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-x mt-20 grid gap-10 md:mt-28 md:grid-cols-2 md:gap-16">
        <div>
          <SectionLabel index="03.1">The timeline</SectionLabel>
          <div className="mt-10">
            {TIMELINE.map((entry) => (
              <div
                key={entry.year}
                className="group flex flex-col gap-2 border-t border-bone/10 py-5 transition-colors duration-300 hover:border-gold/50 sm:flex-row sm:gap-6"
              >
                <span className="shrink-0 font-display text-2xl text-gold/80 md:text-3xl">{entry.year}</span>
                <div>
                  <p className="font-display text-lg text-bone md:text-xl">{entry.title}</p>
                  <p className="mt-1 text-sm text-bone/45">{entry.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <span className="font-mono-label text-gold">How I work</span>
          <div className="mt-7 space-y-5">
            {[
              ["Translate", "Product questions into technical decisions, and back again."],
              ["Prototype", "The shortest path to something people can react to."],
              ["Polish", "Motion, type and feedback until the interface feels inevitable."],
            ].map(([title, text]) => (
              <div key={title} className="flex gap-5 border-t border-bone/10 pt-5">
                <span className="w-24 shrink-0 font-display text-xl text-bone">{title}</span>
                <p className="text-sm leading-relaxed text-bone/50">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono-label text-bone/35">Every build is a chance to make it clearer.</p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { PROJECTS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";

export function Partnerships() {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  useGsap(
    () => {
      gsap.fromTo(
        root.current?.querySelectorAll<HTMLElement>("[data-project-row]") ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="projects" ref={root} className="relative overflow-hidden bg-ink py-24 md:py-40">
      <div className="page-x">
        <SectionLabel index="07">The work</SectionLabel>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <h2 className="font-display text-[clamp(3.4rem,11vw,11rem)] leading-[0.82] text-bone">
            Built with <span className="text-outline">intent.</span>
          </h2>
          <p className="max-w-xs font-mono-label leading-[2] text-bone/45">
            Selected projects where design, engineering and AI meet in something usable.
          </p>
        </div>
      </div>

      <div className="mt-16 border-y border-bone/10 py-8 md:mt-24">
        <div className="marquee-track mar-track-alt">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {PROJECTS.map((item) => (
                <span key={`${copy}-${item.name}`} className="flex items-center">
                  <span className="px-8 font-display text-4xl text-outline md:text-6xl">
                    {item.name}
                  </span>
                  <span className="text-gold">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="page-x mt-16 md:mt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="border-t border-bone/10">
              {PROJECTS.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  data-project-row
                  onClick={() => setActive(index)}
                  data-cursor="link"
                  className={`group flex w-full items-center justify-between gap-4 border-b border-bone/10 py-5 text-left transition-colors duration-300 ${
                    active === index ? "text-gold" : "text-bone/70 hover:text-bone"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono-label text-bone/35">0{index + 1}</span>
                    <span className="font-display text-3xl leading-none md:text-4xl">{item.name}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className={`transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 ${
                      active === index ? "opacity-100" : "opacity-30"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="mt-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-mono-label text-gold">{project.category}</span>
                  <p className="mt-4 max-w-md text-base leading-[1.8] text-bone/65 md:text-lg">
                    {project.description}
                  </p>
                  <Button href={project.href} variant="line" className="mt-8">
                    Open project <ArrowUpRight size={14} strokeWidth={1.5} />
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft md:aspect-[5/4]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.image.src}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-contain p-3 md:p-6"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 md:p-8">
                <span className="font-mono-label text-bone/60">
                  Selected project / 0{active + 1}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

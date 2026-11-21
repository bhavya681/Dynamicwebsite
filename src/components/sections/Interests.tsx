"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Interest = {
  id: string;
  index: string;
  label: string;
  eyebrow: string;
  title: string;
  statement: string;
  copy: string;
  footnote: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

const INTERESTS: Interest[] = [
  {
    id: "mma",
    index: "01",
    label: "MMA / UFC",
    eyebrow: "The fight",
    title: "El Cucuy.",
    statement: "Unpredictable. Relentless. Unconventional.",
    copy: "Tony Ferguson is the favourite. Not the polished version — the chaotic, creative, hard-to-plan-for one. The same quality I bring to a build: stay uncomfortable, stay moving, never fight on someone else's terms.",
    footnote: "Favourite fighter · Tony Ferguson",
    image: "/images/mma-action.webp",
    imageAlt: "MMA fighter in motion",
    imagePosition: "50% 32%",
  },
  {
    id: "cricket",
    index: "02",
    label: "Cricket",
    eyebrow: "The long game",
    title: "Patience, then intent.",
    statement: "Read the field. Wait for the moment. Then hit it clean.",
    copy: "Cricket is a study in restraint and timing. Long stretches of attention, one decisive move, then the discipline to reset. I like formats that reward both patience and nerve — and no, I'm not picking a favourite player.",
    footnote: "Format · Test / ODI / T20",
    image: "/images/interests/cricket.svg",
    imageAlt: "Illustrated cricket pitch under lights",
  },
  {
    id: "astrology",
    index: "03",
    label: "Astrology",
    eyebrow: "The old chart",
    title: "Vedic, not vague.",
    statement: "Planetary calculation first. Meaning second.",
    copy: "I'm drawn to Vedic astrology when it is treated as a system: Kundli, compatibility, planetary periods and careful calculation. VedaMilan came from that interest — an ancient framework built with modern product discipline.",
    footnote: "Built · VedaMilan",
    image: "/images/interests/astrology.svg",
    imageAlt: "Illustrated Vedic astrology chart",
  },
  {
    id: "tech",
    index: "04",
    label: "Technology",
    eyebrow: "The craft",
    title: "New tools, honest use.",
    statement: "Frontend craft. Generative UI. Agents that earn their place.",
    copy: "I follow new technology because it changes what interfaces can be. React, Next.js and TypeScript are the foundation; RAG, LangChain and agentic workflows are the interesting edge. The rule stays the same: if it doesn't make the product clearer, it doesn't ship.",
    footnote: "Stack · React · Next.js · TS · LangChain · RAG",
    image: "/images/interests/technology.svg",
    imageAlt: "Illustrated interface network",
  },
  {
    id: "experiments",
    index: "05",
    label: "Experiments",
    eyebrow: "The side quest",
    title: "Ship small. Learn fast.",
    statement: "A quiet lab for interfaces that don't exist yet.",
    copy: "Side projects are where I try the strange idea before it becomes a real feature. Generative UI, tiny tools, motion studies, odd little data views. Most are small. Some become products.",
    footnote: "Mode · Always prototyping",
    image: "/images/interests/experiments.svg",
    imageAlt: "Abstract generative pattern study",
  },
];

const CRICKET_FORMATS = [
  { name: "TEST", score: "86 – 42", detail: "Four days of patience. One session decides it." },
  { name: "ODI", score: "214 / 3", detail: "Build the platform, then accelerate in the last ten." },
  { name: "T20", score: "48 off 21", detail: "No time to settle. Read, commit, execute." },
];

const PLANETS = [
  { glyph: "☉", name: "Sun", note: "Identity · intent" },
  { glyph: "☽", name: "Moon", note: "Instinct · response" },
  { glyph: "☿", name: "Mercury", note: "Reason · language" },
  { glyph: "♀", name: "Venus", note: "Value · relation" },
  { glyph: "♂", name: "Mars", note: "Drive · action" },
  { glyph: "♃", name: "Jupiter", note: "Growth · judgement" },
  { glyph: "♄", name: "Saturn", note: "Time · structure" },
];

const TECH_ITEMS = [
  { label: "React", note: "Component thinking" },
  { label: "Next.js", note: "Full-stack React" },
  { label: "TypeScript", note: "Interfaces that explain themselves" },
  { label: "LangChain", note: "Agent orchestration" },
  { label: "RAG", note: "Grounded answers" },
  { label: "Generative UI", note: "Interfaces that respond to intent" },
];

const controlButton =
  "cursor-pointer border px-3 py-2 font-mono-label transition-colors backdrop-blur-sm";

function MmaControl() {
  const words = ["UNPREDICTABLE", "RELENTLESS", "UNCONVENTIONAL"];
  const [word, setWord] = useState(0);

  return (
    <>
      <svg viewBox="0 0 100 100" className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 opacity-60" aria-hidden="true">
        {[44, 34, 24].map((r) => (
          <polygon
            key={r}
            points={Array.from({ length: 8 }, (_, i) => {
              const angle = (Math.PI / 4) * i + Math.PI / 8;
              return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
            }).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            className="text-bone/30"
          />
        ))}
        <line x1="50" y1="6" x2="50" y2="94" stroke="currentColor" strokeWidth="0.3" className="text-bone/15" />
        <line x1="6" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="0.3" className="text-bone/15" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
        <span className="font-mono-label text-red-300/90">ROUND 01 · LIVE</span>
        <button
          type="button"
          onClick={() => setWord((value) => (value + 1) % words.length)}
          className="mt-3 cursor-pointer text-left"
          aria-label={`Next word: ${words[(word + 1) % words.length]}`}
        >
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="block font-display text-[clamp(2rem,5.5vw,4.4rem)] leading-[0.85] text-bone"
          >
            {words[word]}
          </motion.span>
          <span className="mt-3 block font-mono-label text-bone/45">TAP TO SHIFT THE STANCE ↗</span>
        </button>
      </div>
    </>
  );
}

function CricketControl() {
  const [format, setFormat] = useState(0);
  const active = CRICKET_FORMATS[format];

  return (
    <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
      <div className="flex flex-wrap gap-2">
        {CRICKET_FORMATS.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setFormat(index)}
            aria-pressed={index === format}
            className={`${controlButton} ${
              index === format
                ? "border-gold bg-gold/15 text-gold"
                : "border-bone/25 bg-ink/40 text-bone/60 hover:border-bone/60"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <motion.div key={active.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
        <span className="block font-display text-[clamp(2.6rem,7vw,5rem)] leading-none text-bone">{active.score}</span>
        <p className="mt-2 max-w-sm text-sm text-bone/65">{active.detail}</p>
      </motion.div>
    </div>
  );
}

function AstrologyControl() {
  const [planet, setPlanet] = useState(0);
  const active = PLANETS[planet];

  return (
    <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
      <motion.div key={active.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
        <span className="font-display text-5xl leading-none text-gold">{active.glyph}</span>
        <span className="ml-4 font-display text-2xl text-bone">{active.name}</span>
        <span className="ml-3 font-mono-label text-bone/50">{active.note}</span>
      </motion.div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {PLANETS.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setPlanet(index)}
            aria-label={`Show ${item.name}`}
            aria-pressed={index === planet}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center border text-lg backdrop-blur-sm transition-colors ${
              index === planet
                ? "border-gold bg-gold/15 text-gold"
                : "border-bone/25 bg-ink/40 text-bone/60 hover:border-bone/60"
            }`}
          >
            {item.glyph}
          </button>
        ))}
      </div>
    </div>
  );
}

function TechControl() {
  const [focused, setFocused] = useState(0);
  const active = TECH_ITEMS[focused];

  return (
    <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
      <div className="flex flex-wrap gap-2">
        {TECH_ITEMS.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onPointerEnter={() => setFocused(index)}
            onFocus={() => setFocused(index)}
            onClick={() => setFocused(index)}
            className={`${controlButton} ${
              index === focused
                ? "border-gold bg-gold/15 text-gold"
                : "border-bone/25 bg-ink/40 text-bone/60 hover:border-bone/60"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <motion.div key={active.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
        <span className="font-display text-3xl text-bone md:text-4xl">{active.label}</span>
        <p className="mt-1 font-mono-label text-gold/80">{active.note}</p>
      </motion.div>
    </div>
  );
}

function ExperimentControl() {
  const [seed, setSeed] = useState(1);

  return (
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-9">
      <div>
        <span className="font-mono-label text-bone/50">GENERATIVE STUDY / {String(seed).padStart(3, "0")}</span>
        <p className="mt-2 font-display text-2xl text-bone">Input → pattern → question.</p>
      </div>
      <button
        type="button"
        onClick={() => setSeed((value) => value + 1)}
        className="inline-flex cursor-pointer items-center gap-2 border border-bone/30 bg-ink/50 px-4 py-3 font-mono-label text-bone backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
      >
        <RefreshCw size={14} strokeWidth={1.5} /> REROLL
      </button>
    </div>
  );
}

function Visual({ interest }: { interest: Interest }) {
  return (
    <div className="relative h-full min-h-[24rem] overflow-hidden bg-ink-soft md:min-h-[34rem]">
      <Image
        key={interest.image}
        src={interest.image}
        alt={interest.imageAlt}
        fill
        sizes="(max-width: 1023px) 100vw, 58vw"
        className="object-cover"
        style={{ objectPosition: interest.imagePosition ?? "center" }}
        priority={interest.id === "mma"}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-6 font-mono-label text-bone/55 md:p-9">
        <span>FIG. {interest.index}</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> INTERACTIVE
        </span>
      </div>
      {interest.id === "mma" && <MmaControl />}
      {interest.id === "cricket" && <CricketControl />}
      {interest.id === "astrology" && <AstrologyControl />}
      {interest.id === "tech" && <TechControl />}
      {interest.id === "experiments" && <ExperimentControl />}
    </div>
  );
}

export function Interests() {
  const [active, setActive] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const interest = INTERESTS[active];

  const select = (index: number) => {
    setActive((index + INTERESTS.length) % INTERESTS.length);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select(active + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(active - 1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) > 60) select(active + (distance < 0 ? 1 : -1));
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="personal" className="relative overflow-hidden bg-ink py-24 md:py-40">
        <div className="page-x">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <SectionLabel index="06">Off the code</SectionLabel>
              <RevealText
                as="h2"
                text="Beyond the code."
                className="mt-8 font-display text-[clamp(3.6rem,12vw,12rem)] leading-[0.82] text-bone"
              />
            </div>
            <p className="max-w-xs font-mono-label leading-[2] text-bone/45 md:pb-4">
              The obsessions that shape how I build — fight, field, chart, craft and experiment.
            </p>
          </div>

          <div className="mt-14 md:mt-24">
            <div
              role="tablist"
              aria-label="Personal interests"
              className="flex gap-2 overflow-x-auto border-b border-bone/10 pb-4 md:gap-3"
            >
              {INTERESTS.map((item, index) => (
                <button
                  key={item.id}
                  id={`interest-tab-${item.id}`}
                  role="tab"
                  type="button"
                  aria-selected={index === active}
                  aria-controls="interest-panel"
                  tabIndex={index === active ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={onTabKeyDown}
                  className={`group flex shrink-0 items-baseline gap-2 border px-4 py-3 text-left font-mono-label transition-colors md:px-5 md:py-4 ${
                    index === active
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-bone/12 text-bone/45 hover:border-bone/35 hover:text-bone/80"
                  }`}
                >
                  <span className="text-[0.62rem] opacity-60">{item.index}</span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              ))}
            </div>

            <div
              id="interest-panel"
              role="tabpanel"
              aria-labelledby={`interest-tab-${interest.id}`}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              className="mt-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid border border-bone/12 lg:grid-cols-12"
                >
                  <div className="bg-[#0d0d0e] p-6 md:p-10 lg:col-span-5 lg:py-12">
                    <span className="font-mono-label text-gold">{interest.eyebrow}</span>
                    <h3 className="mt-6 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.86] text-bone">
                      {interest.title}
                    </h3>
                    <p className="mt-7 font-display text-lg leading-[1.3] text-bone/85 md:text-2xl">
                      {interest.statement}
                    </p>
                    <p className="mt-6 text-sm leading-[1.85] text-bone/55 md:text-base">{interest.copy}</p>
                    <div className="mt-9 flex flex-wrap items-center gap-5">
                      {interest.id === "astrology" && (
                        <Button href="https://vedamilan-lihn.vercel.app/" variant="line">
                          See VedaMilan <ArrowUpRight size={14} strokeWidth={1.5} />
                        </Button>
                      )}
                      {interest.id === "tech" && (
                        <Button href="#work" variant="line">
                          See the work <ArrowUpRight size={14} strokeWidth={1.5} />
                        </Button>
                      )}
                      <span className="font-mono-label text-bone/35">{interest.footnote}</span>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <Visual interest={interest} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

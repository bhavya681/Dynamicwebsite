"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY } from "@/lib/constants";
import { gsap } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Gallery() {
  const root = useRef<HTMLElement | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);

  useGsap(
    () => {
      gsap.fromTo(
        root.current?.querySelectorAll<HTMLElement>("[data-gallery-item]") ?? [],
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
        },
      );
    },
    { scope: root },
  );

  const close = useCallback(() => setSelected(null), []);
  const next = useCallback(() => {
    setSelected((value) => (value === null ? null : (value + 1) % GALLERY.length));
  }, []);
  const previous = useCallback(() => {
    setSelected((value) => (value === null ? null : (value - 1 + GALLERY.length) % GALLERY.length));
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("bw:loading"));

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.dispatchEvent(new Event("bw:loaded"));
    };
  }, [selected, close, next, previous]);

  const active = selected === null ? null : GALLERY[selected];

  return (
    <section id="gallery" ref={root} className="relative bg-ink py-24 md:py-40">
      <div className="page-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="06">The archive</SectionLabel>
            <h2 className="mt-8 font-display text-[clamp(3.2rem,9vw,9rem)] leading-[0.86] text-bone">
              Frames from <span className="text-outline">the build.</span>
            </h2>
          </div>
          <p className="font-mono-label text-bone/45">
            Click any frame to expand · {String(GALLERY.length).padStart(2, "0")} images
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-5">
          {GALLERY.map((item, index) => {
            const span =
              index % 7 === 0
                ? "row-span-2"
                : index % 5 === 3
                  ? "row-span-2"
                  : index % 4 === 2
                    ? "row-span-2"
                    : "";
            return (
              <button
                key={item.src + item.caption}
                type="button"
                data-gallery-item
                data-cursor="view"
                data-cursor-label="VIEW"
                onClick={() => setSelected(index)}
                aria-label={`Open image: ${item.caption}`}
                className={`group relative overflow-hidden bg-ink-soft ${span} aspect-[3/4] md:aspect-[4/5]`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-ink/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-4 items-end justify-between gap-2 p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-4">
                  <span className="text-left font-mono-label text-bone">{item.caption}</span>
                  <span className="font-mono-label text-gold">↗</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[180] flex flex-col bg-ink/97 px-[var(--page-x)] py-6 md:py-10"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            data-lenis-prevent="true"
            onPointerDown={(event) => {
              touchStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (touchStart.current === null) return;
              const delta = event.clientX - touchStart.current;
              if (delta > 70) previous();
              if (delta < -70) next();
              touchStart.current = null;
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono-label text-bone/55">
                {String(selected + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close image viewer"
                data-cursor="link"
                className="flex h-11 w-11 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-gold hover:text-gold"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.src}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full max-h-[72vh] w-full"
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-end justify-between gap-5 border-t border-bone/10 pt-5">
              <div>
                <span className="font-mono-label text-gold">{active.meta}</span>
                <p className="mt-2 font-display text-2xl text-bone md:text-4xl">{active.caption}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous image"
                  data-cursor="link"
                  className="flex h-11 w-11 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-gold hover:text-gold"
                >
                  <ArrowLeft size={18} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  data-cursor="link"
                  className="flex h-11 w-11 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-gold hover:text-gold"
                >
                  <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

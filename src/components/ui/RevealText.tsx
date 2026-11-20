"use client";

import { useRef, type ElementType } from "react";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  start?: string;
};

export function RevealText({
  text,
  as: Tag = "span",
  className = "",
  stagger = 0.055,
  delay = 0,
  duration = 1,
  start = "top 88%",
}: RevealTextProps) {
  const root = useRef<HTMLElement | null>(null);
  const words = text.split(" ");

  useGsap(
    () => {
      const target = root.current?.querySelectorAll<HTMLElement>("[data-word]");
      if (!target?.length) return;
      if (prefersReducedMotion()) {
        gsap.set(target, { yPercent: 0, opacity: 1 });
        return;
      }
      gsap.fromTo(
        target,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: "power4.out",
          scrollTrigger: { trigger: root.current, start, once: true },
        },
      );
    },
    { scope: root, dependencies: [text] },
  );

  return (
    <Tag ref={root as never} className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true" className="word-mask">
          <span data-word className="word-inner">
            {word}
          </span>
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

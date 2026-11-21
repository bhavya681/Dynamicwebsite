"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ImageAsset } from "@/lib/constants";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";

type ImageRevealProps = {
  image: ImageAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: boolean;
  cursorLabel?: string;
  zoom?: boolean;
  position?: string;
};

export function ImageReveal({
  image,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  parallax = false,
  cursorLabel,
  zoom = false,
  position = "center",
}: ImageRevealProps) {
  const root = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(root.current, { clipPath: "inset(0 0 0% 0)" });
        return;
      }
      gsap.fromTo(
        root.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.35,
          ease: "power4.inOut",
          scrollTrigger: { trigger: root.current, start: "top 90%", once: true },
        },
      );
      if (parallax && inner.current) {
        gsap.fromTo(
          inner.current,
          { yPercent: -6, scale: 1.12 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={`reveal-clip relative overflow-hidden ${className}`}
      data-cursor={cursorLabel ? "view" : undefined}
      data-cursor-label={cursorLabel}
    >
      <div ref={inner} className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${zoom ? "image-zoom" : ""}`}
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}

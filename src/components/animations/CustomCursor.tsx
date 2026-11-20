"use client";

import { useEffect, useRef } from "react";
import { gsap, isTouchDevice, prefersReducedMotion } from "@/lib/animations";

const LABELS: Record<string, string> = {
  view: "VIEW",
  explore: "EXPLORE",
  drag: "DRAG",
  link: "",
};

export function CustomCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    document.body.dataset.customCursor = "true";
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    const dotX = gsap.quickTo(dotEl, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dotEl, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ringEl, "x", { duration: 0.55, ease: "power3.out" });
    const ringY = gsap.quickTo(ringEl, "y", { duration: 0.55, ease: "power3.out" });

    let visible = false;
    const onMove = (event: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.3 });
      }
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>("[data-cursor]");
      const variant = interactive?.dataset.cursor ?? "default";
      ringEl.dataset.variant = variant;
      ringEl.textContent =
        variant === "view" || variant === "explore" || variant === "drag"
          ? interactive?.dataset.cursorLabel || LABELS[variant]
          : "";
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.25 });
    };

    const onDown = () => gsap.to(ringEl, { scale: 0.82, duration: 0.2 });
    const onUp = () => gsap.to(ringEl, { scale: 1, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      delete document.body.dataset.customCursor;
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}

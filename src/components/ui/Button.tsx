"use client";

import { useRef, type ReactNode } from "react";
import { gsap, isTouchDevice, prefersReducedMotion } from "@/lib/animations";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "line" | "ghost";
  className?: string;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || isTouchDevice() || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.22, y: y * 0.28, duration: 0.5, ease: "power3.out" });
    gsap.to(el.querySelector("[data-btn-inner]"), {
      x: x * 0.1,
      y: y * 0.12,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to([el, el.querySelector("[data-btn-inner]")], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const styles = {
    solid: "bg-bone text-ink hover:bg-gold",
    line: "border border-bone/40 text-bone hover:border-gold hover:text-gold",
    ghost: "text-bone hover:text-gold",
  }[variant];

  const content = (
    <span
      data-btn-inner
      className="relative z-10 inline-flex items-center gap-3 whitespace-nowrap"
    >
      {children}
    </span>
  );

  const shared = {
    ref: ref as never,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    "data-cursor": "link",
    className: `group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 font-mono-label transition-colors duration-500 ${styles} ${className}`,
    "aria-label": ariaLabel,
  };

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <a
        {...shared}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button {...shared} type="button" onClick={onClick}>
      {content}
    </button>
  );
}

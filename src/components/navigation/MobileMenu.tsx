"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { NAV_ITEMS, SOCIALS } from "@/lib/constants";
import { scrollToTarget } from "@/hooks/useLenis";

type MobileMenuProps = {
  open: boolean;
  active: string;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onClose: () => void;
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } },
};

const item = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function MobileMenu({ open, active, onNavigate, onClose }: MobileMenuProps) {
  const menu = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const frame = window.requestAnimationFrame(() => {
      menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.cancelAnimationFrame(frame);
    };
  }, [open, onClose]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menu}
            id="site-navigation"
            data-lenis-prevent="true"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.65, 0.05, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-ink-soft px-[var(--page-x)] pb-8 pt-24 md:pt-28 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.9%22_numOctaves=%223%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

            <motion.nav
              variants={container}
              initial="hidden"
              animate="visible"
              className="relative flex flex-1 flex-col justify-center py-6"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((navItem) => (
                <motion.a
                  key={navItem.href}
                  variants={item}
                  href={navItem.href}
                  onClick={(event) => onNavigate(event, navItem.href)}
                  data-cursor="link"
                  className={`group/font flex items-baseline gap-4 border-b border-bone/10 py-1 font-display text-[clamp(2rem,10vw,6.4rem)] leading-[0.95] transition-colors duration-300 sm:py-1.5 sm:text-[clamp(2.4rem,11vw,6.4rem)] ${
                    active === navItem.href ? "text-gold" : "text-bone hover:text-gold"
                  }`}
                >
                  <span className="font-mono-label w-6 shrink-0 self-center text-bone/40">
                    {navItem.index}
                  </span>
                  <span className="block transition-transform duration-500 group-hover/font:translate-x-3">
                    {navItem.label}
                  </span>
                </motion.a>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="relative flex flex-wrap items-end justify-between gap-6 border-t border-bone/10 pt-6"
            >
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-mono-label text-bone/50 hover:text-bone"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  scrollToTarget("#contact");
                }}
                data-cursor="link"
                className="font-mono-label text-gold hover:text-bone"
              >
                Start a conversation ↗
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

"use client";

import { BrandMark } from "@/components/ui/BrandMark";
import { NAV_ITEMS, SOCIALS } from "@/lib/constants";
import { scrollToTarget } from "@/hooks/useLenis";

export function Footer() {
  return (
    <footer className="relative border-t border-bone/10 bg-ink-deep px-[var(--page-x)] pb-10 pt-16 md:pb-12 md:pt-20">
      <div className="flex flex-col justify-between gap-12 lg:flex-row">
        <div>
          <button
            type="button"
            onClick={() => scrollToTarget("#home")}
            aria-label="Back to top"
            data-cursor="link"
            className="block transition-transform duration-500 hover:-translate-y-1"
          >
            <BrandMark className="h-16 w-auto text-bone md:h-20" />
          </button>
          <p className="mt-5 max-w-xs font-mono-label leading-[2] text-bone/40">
            Practical engineering, clear interfaces. React, Next.js and AI.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <span className="font-mono-label text-bone/35">Navigate</span>
            <div className="mt-5 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToTarget(item.href);
                  }}
                  data-cursor="link"
                  className="link-underline w-fit text-sm text-bone/70 transition-colors hover:text-bone"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <span className="font-mono-label text-bone/35">Social</span>
            <div className="mt-5 flex flex-col gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="link-underline w-fit text-sm text-bone/70 transition-colors hover:text-bone"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col justify-between gap-4 border-t border-bone/10 pt-6 font-mono-label text-bone/35 md:flex-row md:items-center">
        <span>© 2026 Bhavya Wade. All rights reserved.</span>
        <span className="text-bone/25">Mumbai, India</span>
        <span>Built with intention. Made to last.</span>
      </div>
    </footer>
  );
}

"use client";

import { ArrowUp } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { IMAGE_CREDITS, NAV_ITEMS, SOCIALS } from "@/lib/constants";
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
            Building the unexpected. Beyond the code.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3">
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
          <div className="col-span-2 sm:col-span-1">
            <span className="font-mono-label text-bone/35">Top</span>
            <button
              type="button"
              onClick={() => scrollToTarget("#home")}
              data-cursor="link"
              className="group mt-5 flex items-center gap-3 text-sm text-bone/70 transition-colors hover:text-gold"
            >
              Back to top
              <span className="flex h-9 w-9 items-center justify-center border border-bone/25 transition-colors group-hover:border-gold">
                <ArrowUp size={14} strokeWidth={1.5} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col justify-between gap-4 border-t border-bone/10 pt-6 font-mono-label text-bone/35 md:flex-row md:items-center">
        <span>© 2026 Bhavya Wade. All rights reserved.</span>
        <a
          href={IMAGE_CREDITS.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="link-underline w-fit text-bone/25 transition-colors hover:text-gold"
        >
          {IMAGE_CREDITS.label}
        </a>
        <span>Built with intention. Made to last.</span>
      </div>
    </footer>
  );
}

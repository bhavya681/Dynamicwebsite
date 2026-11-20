"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { NAV_ITEMS } from "@/lib/constants";
import { scrollToTarget } from "@/hooks/useLenis";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(
      (item): item is HTMLElement => Boolean(item),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: [0, 0.1, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY < 180) setActive("#home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = previous;
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const go = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setOpen(false);
    setActive(href);
    scrollToTarget(href);
  };

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-[110] flex items-center justify-between px-[var(--page-x)] py-5 transition-[padding,background-color] duration-500 md:py-7 ${
          scrolled ? "h-[4.75rem] bg-ink/70 backdrop-blur-md md:h-[5.25rem]" : "h-[5.25rem] md:h-[6rem]"
        }`}
      >
        <a
          href="#home"
          onClick={(event) => go(event, "#home")}
          className="pointer-events-auto relative block p-2 -m-2"
          aria-label="Bhavya Wade — back to top"
          data-cursor="link"
        >
          <BrandMark className={`h-9 w-auto transition-transform duration-500 hover:scale-110 md:h-11 ${open ? "text-bone" : "text-bone"}`} />
        </a>

        <nav className="pointer-events-auto hidden items-center gap-8 lg:flex xl:gap-11" aria-label="Primary">
          {NAV_ITEMS.slice(1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => go(event, item.href)}
              data-cursor="link"
              data-active={active === item.href}
              className={`link-underline font-mono-label py-2 transition-colors duration-300 ${
                active === item.href ? "text-gold" : "text-bone/75 hover:text-bone"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-navigation"
          data-cursor="link"
          className="pointer-events-auto -mr-2 flex h-12 w-12 items-center justify-center p-2 md:h-14 md:w-14"
        >
          <span className="relative block h-4 w-7 md:w-8">
            <span
              className={`absolute left-0 block h-px w-full origin-center bg-bone transition-transform duration-500 ${
                open ? "top-2 rotate-45" : "top-1"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full origin-center bg-bone transition-transform duration-500 ${
                open ? "top-2 -rotate-45" : "top-3.5 w-3/4"
              }`}
            />
          </span>
        </button>
      </header>

      <MobileMenu
        open={open}
        active={active}
        onNavigate={go}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

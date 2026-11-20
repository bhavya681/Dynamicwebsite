"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, IMAGES, SOCIALS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap } from "@/lib/animations";
import { useGsap } from "@/hooks/useGsap";

export function Contact() {
  const root = useRef<HTMLElement | null>(null);
  const background = useRef<HTMLDivElement | null>(null);

  useGsap(
    () => {
      gsap.fromTo(
        background.current,
        { yPercent: -8, scale: 1.08 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="relative overflow-hidden bg-ink py-28 md:py-48">
      <div ref={background} className="absolute inset-0">
        <Image
          src={IMAGES.heroEditorial.src}
          alt={IMAGES.heroEditorial.alt}
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,43,171,0.25),transparent_65%)]" />
      </div>

      <div className="page-x relative z-10">
        <SectionLabel index="08">Get in touch</SectionLabel>

        <div className="mt-12 md:mt-20">
          <RevealText
            as="h2"
            text={"Let's build something."}
            className="font-display text-[clamp(3.5rem,13vw,13rem)] leading-[0.82] text-bone"
          />
          <div className="mt-4 font-display text-[clamp(3.5rem,13vw,13rem)] leading-[0.82] text-outline">
            What&apos;s next?
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-bone/15 pt-10 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <span className="font-mono-label text-bone/45">Inquiries</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              data-cursor="link"
              className="link-underline mt-4 inline-flex items-center gap-3 font-display text-2xl text-bone transition-colors hover:text-gold md:text-4xl"
            >
              {CONTACT_EMAIL}
              <ArrowUpRight size={22} strokeWidth={1.5} />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone/50">
              Open to frontend, full-stack and AI product work — or a good conversation about
              what&apos;s possible.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <span className="font-mono-label text-bone/45">Elsewhere</span>
            <div className="mt-4 flex flex-col gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="link-underline w-fit font-display text-xl text-bone/85 transition-colors hover:text-gold md:text-2xl"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <span className="font-mono-label text-bone/45">Stay close</span>
            <p className="mt-4 max-w-xs font-display text-2xl leading-tight text-bone md:text-3xl">
              New builds. New experiments. Same standard.
            </p>
            <Button href={`mailto:${CONTACT_EMAIL}`} className="mt-7">
              Start a conversation <ArrowUpRight size={15} strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

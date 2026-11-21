"use client";

import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_LOCATION, SOCIALS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-28 md:py-48">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[78vw] w-[78vw] max-h-[60rem] max-w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/[0.06]" />
        <div className="absolute left-1/2 top-1/2 h-[52vw] w-[52vw] max-h-[40rem] max-w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/[0.06]" />
        <div className="absolute left-1/2 top-1/2 h-[26vw] w-[26vw] max-h-[20rem] max-w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,43,171,0.18),transparent_62%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      </div>

      <div className="page-x relative z-10">
        <SectionLabel index="09">Get in touch</SectionLabel>

        <div className="mt-12 md:mt-20">
          <RevealText
            as="h2"
            text={"Let's build something."}
            className="font-display text-[clamp(2.9rem,13vw,13rem)] leading-[0.82] text-bone sm:text-[clamp(3.5rem,13vw,13rem)]"
          />
          <div className="mt-4 font-display text-[clamp(2.9rem,13vw,13rem)] leading-[0.82] text-outline sm:text-[clamp(3.5rem,13vw,13rem)]">
            What&apos;s next?
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-bone/15 pt-10 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <span className="font-mono-label text-bone/45">Inquiries</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              data-cursor="link"
              className="link-underline mt-4 inline-flex max-w-full items-center gap-3 break-all font-display text-xl text-bone transition-colors hover:text-gold sm:text-2xl md:text-4xl"
            >
              {CONTACT_EMAIL}
              <ArrowUpRight size={22} strokeWidth={1.5} className="shrink-0" />
            </a>
            <div className="mt-5 flex flex-col gap-2 font-mono-label text-bone/50">
              <span>{CONTACT_LOCATION}</span>
              <span className="flex items-center gap-2 text-bone/35">
                <span className="signal-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Available for select projects
              </span>
            </div>
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

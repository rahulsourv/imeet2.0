/* eslint-disable @next/next/no-img-element */

import type { CSSProperties } from "react";
import { Icon, Reveal, SectionTitle, Sparkle } from "./shared";

const CARD =
  "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-foreground bg-card transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[-10px_10px_0_0_var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

// Placeholder artwork until the official festival photographs are supplied. Desaturated so the
// paintings sit in the page's ink-and-paper palette.
const FRAMES = [
  {
    src: "/imeet/bridge.jpg",
    alt: "Placeholder artwork: two samurai facing each other on a misty moonlit bridge",
    tag: "The arena",
    title: "Where the competitions happen",
    body: "Technical competitions and coding challenges, where skill meets strategy.",
    media: "aspect-[16/11] lg:aspect-auto lg:min-h-[22rem] lg:flex-1",
    titleClass: "text-[clamp(1.75rem,3vw,2.75rem)]",
    span: "lg:col-span-7 lg:row-span-2",
  },
  {
    src: "/imeet/courtyard.jpg",
    alt: "Placeholder artwork: a lantern-lit courtyard with pavilions",
    tag: "Showcases",
    title: "Ideas on display",
    body: "Student projects and prototypes, shown by the people who built them.",
    media: "aspect-[16/9]",
    titleClass: "text-2xl sm:text-[1.7rem]",
    span: "lg:col-span-5",
    grow: true,
  },
  {
    src: "/imeet/lanterns.jpg",
    alt: "Placeholder artwork: paper lanterns rising over moonlit grass",
    tag: "Festival",
    title: "Nights to remember",
    body: "Talks, workshops and festival activities across both days.",
    media: "aspect-[16/9]",
    titleClass: "text-2xl sm:text-[1.7rem]",
    span: "lg:col-span-5",
    grow: true,
  },
];

export default function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1680px] px-[4%]">
        <Reveal>
          <SectionTitle
            id="gallery-title"
            eyebrow="Gallery"
            title="Fragments of the journey"
            body="Placeholder frames for now. Official photographs from IMEET 2026 will replace this artwork after the fest."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:grid-rows-2">
          {FRAMES.map((frame, i) => (
            <Reveal key={frame.src} className={frame.span} delay={i * 120}>
              <a href="#gallery" className={CARD}>
                <div className={`relative overflow-hidden border-b-2 border-foreground ${frame.media}`}>
                  <div className="relative size-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
                    <img
                      src={frame.src}
                      alt={frame.alt}
                      data-parallax="6"
                      className="absolute inset-x-0 top-[-8%] h-[116%] w-full object-cover contrast-125 grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                    />
                    <Sparkle className="twinkle absolute right-[8%] top-[10%] size-6 text-chalk" style={{ "--delay": `${i * 0.7}s` } as CSSProperties} />
                  </div>
                </div>
                <div className={`flex flex-col gap-4 p-6 sm:p-8 ${frame.grow ? "flex-1" : ""}`}>
                  <div className="flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.18em]">
                    <span className="rounded-full border border-foreground px-3 py-1">{frame.tag}</span>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Icon name="calendar-days" className="size-4" />
                      19–20 Nov
                    </span>
                  </div>
                  <h3 className={`font-heading font-extrabold tracking-[-0.01em] ${frame.titleClass}`}>{frame.title}</h3>
                  <p className="font-mono text-sm leading-relaxed text-muted-foreground">{frame.body}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium uppercase tracking-[0.12em]">
                    Photos after the fest
                    <Icon name="arrow-up-right" className="size-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Countdown from "./Countdown";
import { Chroma, Icon, Reveal, SectionTitle } from "./shared";

// Official event names, rules and schedules are still to be announced.
const CATEGORIES = [
  { term: "Technical Competitions", icon: "zap", body: "Contests of skill and strategy that test problem-solving, precision and engineering instinct." },
  { term: "Coding Challenges", icon: "orbit", body: "Timed programming challenges for those who think in logic and write with clarity." },
  { term: "Project Showcases", icon: "sun", body: "A stage for original student projects, prototypes and ideas ready to meet the world." },
  { term: "Workshops", icon: "satellite", body: "Hands-on sessions to learn new tools, techniques and ways of building." },
  { term: "Talks", icon: "sparkles", body: "Sessions that open new perspectives on technology and where it is headed." },
  { term: "Festival Activities", icon: "moon", body: "Moments of play, culture and community beyond the competitions." },
] as const;

function FlipCard({ n, term, icon, body }: { n: number; term: string; icon: (typeof CATEGORIES)[number]["icon"]; body: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      className="flip-card group block h-[18.5rem] w-full rounded-[2rem] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:h-[19.5rem]"
    >
      <span className="flip-card-inner block">
        <span className="flip-face flex flex-col justify-between rounded-[2rem] border-2 border-foreground bg-card p-7 transition-shadow duration-500 group-hover:shadow-[-8px_8px_0_0_var(--foreground)]">
          <span className="flex items-start justify-between">
            <span className="font-mono text-xs tracking-[0.16em] text-muted-foreground">{String(n).padStart(2, "0")}</span>
            <span className="grid size-12 place-items-center rounded-full border-2 border-foreground transition-transform duration-700 ease-[var(--ease-spring)] group-hover:rotate-[24deg]">
              <Icon name={icon} className="size-5" />
            </span>
          </span>
          <span>
            <span className="block font-heading text-[2rem] font-black uppercase leading-[0.95] tracking-[-0.01em] sm:text-[2.2rem]">{term}</span>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <Icon name="rotate-cw" className="size-4 transition-transform duration-700 group-hover:rotate-180" />
              Tap to flip
            </span>
          </span>
        </span>
        <span className="flip-face flip-face-back flex flex-col justify-between rounded-[2rem] border-2 border-foreground bg-foreground p-7 text-chalk">
          <span className="flex items-center justify-between gap-4">
            <span className="font-heading text-lg font-extrabold uppercase tracking-[0.02em]">{term}</span>
            <Icon name={icon} className="size-5 shrink-0" />
          </span>
          <span className="font-mono text-[15px] leading-relaxed text-chalk/90">{body}</span>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-chalk/60">
            <Icon name="rotate-cw" className="size-4" />
            Event names to be announced
          </span>
        </span>
      </span>
    </button>
  );
}

export default function Events() {
  return (
    <section id="events" aria-labelledby="events-title" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1680px] px-[4%]">
        <div className="relative">
          <Reveal>
            <SectionTitle id="events-title" eyebrow="Events" title="Six arenas" body="The six categories of IMEET 2026. Tap a card to flip it." />
          </Reveal>
          <div data-parallax="18" className="pointer-events-none absolute right-[-4%] top-[-14%] hidden w-[min(34vw,30rem)] md:block">
            <div className="animate-float-saturn">
              <Chroma src="saturn.png" w={1264} h={848} />
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, i) => (
            <li key={category.term}>
              <Reveal delay={(i % 3) * 110}>
                <FlipCard n={i + 1} {...category} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Countdown />
      </div>
    </section>
  );
}

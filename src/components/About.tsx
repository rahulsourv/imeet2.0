"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Chroma, Reveal, SectionTitle, Sparkle } from "./shared";

// 19 Nov 2026, 00:00 Kolkata time (IST).
const OPENING = Date.UTC(2026, 10, 18, 18, 30, 0);

const PILLARS = [
  { title: "Inspire", body: "Celebrate curiosity, creative thinking and the exchange of ideas." },
  { title: "Innovate", body: "Explore technology, engineering, programming and original solutions." },
  { title: "Impact", body: "Turn collaboration and experimentation into meaningful outcomes." },
];

function untilOpening(ms: number) {
  if (ms <= 0) return "IMEET 2026 is under way.";
  if (ms < 864e5) return "That is less than a day away.";
  const days = Math.floor(ms / 864e5);
  return days === 1 ? "That is 1 day away." : `That is ${days} days away.`;
}

function DaysAway() {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setText(untilOpening(OPENING - Date.now()));
    tick();
    const id = window.setInterval(tick, 6e4);
    return () => window.clearInterval(id);
  }, []);
  if (!text) return null;
  return (
    <span className="animate-in fade-in mt-2 block font-mono text-xs font-normal normal-case tracking-normal text-muted-foreground" style={{ animationDuration: "500ms" }}>
      {text}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1680px] items-center gap-16 px-[4%] lg:grid-cols-12 lg:gap-12">
        <Reveal className="order-2 lg:order-1 lg:col-span-6">
          <figure className="relative mx-auto w-full max-w-[38rem]">
            <div data-spin="12" className="relative aspect-square w-full">
              <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full animate-orbit">
                <circle cx="50" cy="50" r="49" fill="none" className="stroke-foreground/35" strokeWidth="0.3" strokeDasharray="0.8 2.4" />
                <circle cx="50" cy="1" r="1.5" className="fill-foreground" />
              </svg>
              <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-[13%] size-[74%] animate-orbit-reverse">
                <circle cx="50" cy="50" r="49" fill="none" className="stroke-foreground/35" strokeWidth="0.4" strokeDasharray="0.8 2.4" />
                <circle cx="99" cy="50" r="2.6" className="fill-chalk stroke-foreground" strokeWidth="0.8" />
              </svg>
              <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-[27%] size-[46%]">
                <circle cx="50" cy="50" r="49" fill="none" className="stroke-foreground/25" strokeWidth="0.6" />
              </svg>
              <div className="absolute inset-[4%] grid place-items-center">
                <div className="w-full animate-bob">
                  <Chroma src="voyager-probe.png" w={1200} h={896} label="Engraved illustration of a space probe and its dish antenna" />
                </div>
              </div>
              <Sparkle className="twinkle absolute left-[6%] top-[16%] size-6 text-foreground" />
              <Sparkle className="twinkle absolute bottom-[12%] right-[8%] size-4 text-foreground" style={{ "--delay": "1.5s" } as CSSProperties} />
            </div>
            <figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Department of Information Technology, RCCIIT
            </figcaption>
          </figure>
        </Reveal>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <Reveal>
            <SectionTitle
              id="about-title"
              eyebrow="About IMEET"
              title="Where ideas find their courage"
              body="IMEET is the departmental fest of the Department of Information Technology, RCC Institute of Information Technology, Kolkata."
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              It brings together curious minds, creative thinkers and future innovators to explore ideas, challenge boundaries and build something
              meaningful, across two days of competitions, challenges, showcases, workshops and talks.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <ol className="mt-12 space-y-6">
              {PILLARS.map((pillar, i) => (
                <li key={pillar.title} className="flex gap-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-foreground font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-heading text-xl font-extrabold uppercase tracking-[0.01em]">{pillar.title}</h3>
                    <p className="mt-1 font-mono text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={220}>
            <dl className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border-2 border-foreground bg-card p-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Organised by</dt>
                <dd className="mt-2 font-heading text-xl font-black uppercase leading-tight">Dept. of IT</dd>
              </div>
              <div className="rounded-[1.5rem] border-2 border-foreground bg-card p-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Venue</dt>
                <dd className="mt-2 font-heading text-xl font-black uppercase leading-tight">RCCIIT, Kolkata</dd>
              </div>
              <div className="rounded-[1.5rem] border-2 border-foreground bg-card p-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Fest dates</dt>
                <dd className="mt-2 font-heading text-xl font-black uppercase leading-tight">
                  19–20 Nov 2026
                  <DaysAway />
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

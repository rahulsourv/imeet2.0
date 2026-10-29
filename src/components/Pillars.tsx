"use client";

import { motion } from "framer-motion";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Chroma, Icon, Reveal, SectionTitle, Sparkle, StarField } from "./shared";

const TABS = [
  {
    id: "inspire",
    label: "Inspire",
    intro: "Celebrate curiosity, creative thinking and the exchange of ideas.",
    items: [
      { title: "Curiosity", when: "Talks and sessions", body: "Talks that open new perspectives on technology and where it is headed, and the questions worth asking about it." },
      { title: "Creativity", when: "Project showcases", body: "Original student projects and prototypes, shown by the people who built them." },
      { title: "Dialogue", when: "Across both days", body: "Conversations between students, faculty and guests that carry on long after a session ends." },
      { title: "Community", when: "Festival activities", body: "Moments of play, culture and community beyond the competitions." },
    ],
  },
  {
    id: "innovate",
    label: "Innovate",
    intro: "Explore technology, engineering, programming and original solutions.",
    items: [
      { title: "Technology", when: "Technical competitions", body: "Contests of skill and strategy that test problem-solving, precision and engineering instinct." },
      { title: "Programming", when: "Coding challenges", body: "Timed programming challenges for those who think in logic and write with clarity." },
      { title: "Engineering", when: "Workshops", body: "Hands-on sessions to learn new tools, techniques and ways of building." },
      { title: "Prototypes", when: "Project showcases", body: "Ideas taken past the slide deck into something that actually runs." },
    ],
  },
  {
    id: "impact",
    label: "Impact",
    intro: "Turn collaboration and experimentation into meaningful outcomes.",
    items: [
      { title: "Collaboration", when: "Team events", body: "Problems too big for one person, solved by people who met at the fest." },
      { title: "Experiment", when: "Workshops and challenges", body: "Room to try, fail fast and try again, which is how most good ideas begin." },
      { title: "Outcome", when: "Results and awards", body: "Work that leaves IMEET as something finished, shown and recognised." },
      { title: "Legacy", when: "After the fest", body: "Skills, projects and friendships that keep going once the two days are over." },
    ],
  },
];

const SHOWERS = [
  { peak: "Thu, 19 Nov", name: "Day one", source: "Inspire and innovate", body: "The fest opens. Competitions, coding challenges and workshops begin.", delay: "0.8s" },
  { peak: "Fri, 20 Nov", name: "Day two", source: "Impact", body: "Showcases, talks, festival activities and the close of IMEET 2026.", delay: "2.6s" },
  { peak: "RCCIIT", name: "Kolkata", source: "Canal South Road, Beliaghata", body: "Both days take place on the RCC Institute of Information Technology campus.", delay: "4.4s" },
];

const W_STARS = [
  [16, 30],
  [33, 15],
  [50, 27],
  [67, 11],
  [84, 23],
];

function SkyDisc() {
  return (
    <div data-parallax="5" className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full animate-orbit">
        <circle cx="50" cy="50" r="49" fill="none" className="stroke-chalk/45" strokeWidth="0.35" strokeDasharray="0.8 2.6" />
        <circle cx="50" cy="1" r="1.4" className="fill-chalk" />
      </svg>
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-[3.5%] size-[93%] animate-orbit-reverse">
        <circle cx="50" cy="50" r="49" fill="none" className="stroke-chalk/25" strokeWidth="0.3" />
        <circle cx="99" cy="50" r="1.6" className="fill-foreground stroke-chalk" strokeWidth="0.5" />
      </svg>
      <div className="absolute inset-[9%] overflow-hidden rounded-full bg-chalk">
        <StarField seed={99} count={50} className="pointer-events-none absolute inset-0 size-full fill-foreground opacity-70" />
        <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-x-[12%] top-[10%] h-auto w-[76%]">
          <path
            d="M16 30 L33 15 L50 27 L67 11 L84 23"
            pathLength={1}
            fill="none"
            className="constellation-line stroke-foreground"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ "--len": 1, "--delay": "400ms" } as CSSProperties}
          />
          {W_STARS.map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="2.1" className="fill-foreground" />
          ))}
        </svg>
        <div className="absolute bottom-[-6%] left-1/2 w-[80%] -translate-x-1/2">
          <Chroma src="telescope.png" />
        </div>
      </div>
      <Sparkle className="twinkle absolute right-[4%] top-[12%] size-6 text-chalk" />
      <Sparkle className="twinkle absolute bottom-[10%] left-[2%] size-4 text-chalk" style={{ "--delay": "1.3s" } as CSSProperties} />
      <p className="absolute -bottom-2 left-1/2 w-max -translate-x-1/2 rounded-full border border-chalk/25 bg-foreground px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-chalk/80">
        Inspire · Innovate · Impact
      </p>
    </div>
  );
}

export default function Pillars() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys, Home and End move between the tabs.
  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: TABS.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + TABS.length) % TABS.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="pillars" aria-labelledby="pillars-title" className="relative overflow-hidden bg-foreground py-24 text-chalk sm:py-32">
      <div className="bg-starfield pointer-events-none absolute inset-0 opacity-50"></div>
      <span className="shooting-star left-[8%] top-[6%] w-[22%] text-chalk" style={{ "--angle": "22deg", "--delay": "1.5s", "--duration": "10s" } as CSSProperties}></span>
      <span className="shooting-star left-[56%] top-[48%] w-[18%] text-chalk" style={{ "--angle": "30deg", "--delay": "6s", "--duration": "12s" } as CSSProperties}></span>

      <div className="relative mx-auto grid max-w-[1680px] gap-16 px-[4%] lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionTitle
              id="pillars-title"
              eyebrow="The three pillars"
              title="Three paths, one journey"
              body="Every story at IMEET follows three paths: a way of seeing, a way of building, and a way of leaving a mark."
              invert
            />
          </Reveal>
          <Reveal className="mt-14 pb-4" delay={150}>
            <SkyDisc />
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <Reveal>
            <div role="tablist" aria-label="Choose a pillar" onKeyDown={onKey} className="inline-flex flex-wrap gap-1.5 rounded-[1.75rem] border border-chalk/20 p-1.5 sm:rounded-full">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={`pillar-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`pillar-panel-${tab.id}`}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chalk ${
                    active === i ? "text-foreground" : "text-chalk/75 hover:bg-chalk/10 hover:text-chalk"
                  }`}
                >
                  {/* The chalk pill slides between tabs. */}
                  {active === i && (
                    <motion.span layoutId="pillar-tab" className="absolute inset-0 rounded-full bg-chalk" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              ))}
            </div>
            {TABS.map((tab, i) => (
              <div key={tab.id} id={`pillar-panel-${tab.id}`} role="tabpanel" aria-labelledby={`pillar-tab-${tab.id}`} hidden={active !== i} className="mt-8">
                <p className="max-w-xl font-mono text-sm leading-relaxed text-chalk/75">{tab.intro}</p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {tab.items.map((item, n) => (
                    <li
                      key={`${active}-${item.title}`}
                      className="group animate-in fade-in slide-in-from-bottom-3 rounded-[1.75rem] border border-chalk/20 p-6 transition-colors duration-500 hover:border-chalk/60 sm:p-7"
                      style={{ animationDuration: "700ms", animationDelay: `${n * 90}ms` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-heading text-xl font-extrabold leading-tight">{item.title}</h3>
                        <span className="font-mono text-[11px] tracking-[0.14em] text-chalk/50">{String(n + 1).padStart(2, "0")}</span>
                      </div>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-chalk/60">
                        <Icon name="clock" className="size-3.5" />
                        {item.when}
                      </p>
                      <p className="mt-4 font-mono text-[13px] leading-relaxed text-chalk/80 sm:text-sm">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-16">
            <h3 className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-chalk/70">
              <Icon name="calendar-days" className="size-4" />
              Two days at a glance
            </h3>
            <ol className="mt-6 grid gap-4 sm:grid-cols-3">
              {SHOWERS.map((s) => (
                <li
                  key={s.name}
                  className="relative overflow-hidden rounded-[1.75rem] bg-chalk p-6 text-foreground transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 hover:-rotate-1"
                >
                  <span
                    className="shooting-star right-[-10%] top-[16%] w-[60%] text-foreground"
                    style={{ "--angle": "28deg", "--delay": s.delay, "--duration": "7s" } as CSSProperties}
                  ></span>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">When</p>
                  <p className="mt-1 font-heading text-[1.9rem] font-black uppercase leading-none">{s.peak}</p>
                  <p className="mt-5 font-heading text-lg font-extrabold">{s.name}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{s.source}</p>
                  <p className="mt-3 font-mono text-[13px] leading-relaxed text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 font-mono text-xs leading-relaxed text-chalk/60">
              Official timings for each event will be announced with the schedule.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

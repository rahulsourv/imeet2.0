"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal, Sparkle } from "./shared";

// 19 Nov 2026, 00:00 Kolkata time (IST).
const TARGET = Date.UTC(2026, 10, 18, 18, 30, 0);
const UNITS = ["Days", "Hours", "Minutes", "Seconds"];
const pad = (v: number) => String(v).padStart(2, "0");

function remaining() {
  let t = Math.max(0, TARGET - Date.now());
  const d = Math.floor(t / 864e5);
  t -= d * 864e5;
  const h = Math.floor(t / 36e5);
  t -= h * 36e5;
  const m = Math.floor(t / 6e4);
  t -= m * 6e4;
  return [pad(d), pad(h), pad(m), pad(Math.floor(t / 1e3))];
}

// Each digit slides out and the next one drops in as it changes.
function Digits({ value }: { value: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="inline-flex overflow-hidden">
      {[...value].map((ch, i) => (
        <span key={i} className="relative inline-block">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={ch}
              className="inline-block"
              initial={reduce ? false : { y: "-70%", opacity: 0, rotate: -8 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={reduce ? undefined : { y: "70%", opacity: 0, rotate: 8 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
            >
              {ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

// Live countdown to the opening of IMEET 2026, drawn in the page's ink-card style.
export default function Countdown() {
  const [time, setTime] = useState(["--", "--", "--", "--"]);

  useEffect(() => {
    const tick = () => setTime(remaining());
    const id = window.setInterval(tick, 1000);
    const first = window.setTimeout(tick, 0);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(first);
    };
  }, []);

  return (
    <div className="mt-24 grid gap-12 sm:mt-32 lg:grid-cols-12 lg:items-center">
      <Reveal className="lg:col-span-4">
        <h3 className="text-extrude font-heading text-[clamp(2.2rem,4.4vw,3.5rem)] font-black uppercase leading-[0.95]">The countdown begins</h3>
        <p className="mt-6 max-w-sm font-mono text-sm leading-relaxed text-muted-foreground">
          IMEET 2026 opens on 19 November at RCCIIT, Kolkata. Counting down in Kolkata time.
        </p>
      </Reveal>
      <Reveal className="lg:col-span-8" delay={120}>
        <div role="timer" aria-label="Time until IMEET 2026" className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {UNITS.map((unit, i) => (
            <div
              key={unit}
              className={`relative flex flex-col justify-between overflow-hidden rounded-[2rem] border-2 border-foreground p-6 transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[-8px_8px_0_0_var(--foreground)] sm:aspect-[4/5] sm:p-7 ${
                i === 3 ? "bg-foreground text-chalk" : "bg-card"
              }`}
            >
              <span className={`font-mono text-xs tracking-[0.16em] ${i === 3 ? "text-chalk/60" : "text-muted-foreground"}`}>{pad(i + 1)}</span>
              <span className="mt-6 block font-heading text-[clamp(3rem,6vw,5.5rem)] font-black leading-none tabular-nums tracking-[-0.02em] sm:mt-0">
                <Digits value={time[i]} />
              </span>
              <span className={`mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] ${i === 3 ? "text-chalk/70" : "text-muted-foreground"}`}>
                <Sparkle className="size-3" />
                {unit}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

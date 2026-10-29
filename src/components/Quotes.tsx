"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { Icon } from "./shared";

const QUOTES = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
  { text: "The most dangerous phrase in the language is: we've always done it this way.", author: "Grace Hopper" },
  { text: "Inspire. Innovate. Impact. Two days to do all three.", author: "IMEET 2026" },
];

const DURATION = 7000;
const BTN =
  "grid size-9 place-items-center rounded-full border border-foreground/25 bg-background/60 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground hover:text-chalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";
const MOTION = "(prefers-reduced-motion: reduce)";
const prefersReducedMotion = () => window.matchMedia(MOTION).matches;
const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia(MOTION);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const pad = (n: number) => String(n).padStart(2, "0");

// Rotating quotes. They pause while hovered or focused, or when the user pauses them.
export default function Quotes() {
  const count = QUOTES.length;
  const [state, setState] = useState({ index: 0, previous: -1 });
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, prefersReducedMotion, () => false);
  const paused = !playing || hovered || focused || reduced;

  const go = useCallback(
    (to: number) => setState((s) => {
      const index = ((to % count) + count) % count;
      return index === s.index ? s : { index, previous: s.index };
    }),
    [count],
  );

  // The progress bar's animationend drives the rotation, so pausing it pauses the timer too.
  const current = QUOTES[state.index];
  const previous = state.previous >= 0 ? QUOTES[state.previous] : undefined;

  return (
    <div
      className="flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => {
        try {
          if (e.target.matches(":focus-visible")) setFocused(true);
        } catch {
          setFocused(true);
        }
      }}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
    >
      <div className="grid w-full" aria-live={paused ? "polite" : "off"}>
        {previous && (
          <figure key={`out-${state.previous}-${state.index}`} aria-hidden="true" className="quote-exit col-start-1 row-start-1">
            <blockquote className="font-mono text-[11px] font-bold leading-[2] tracking-[0.16em] sm:text-xs">{previous.text}</blockquote>
            <figcaption className="mt-[calc(var(--u)*5)] text-sm font-medium tracking-[0.02em] lg:mt-[calc(var(--u)*2.6)]">{previous.author}</figcaption>
          </figure>
        )}
        <figure key={`in-${state.index}`} className="quote-enter col-start-1 row-start-1">
          <blockquote className="font-mono text-[11px] font-bold leading-[2] tracking-[0.16em] sm:text-xs">{current.text}</blockquote>
          <figcaption className="mt-[calc(var(--u)*5)] text-sm font-medium tracking-[0.02em] lg:mt-[calc(var(--u)*2.6)]">{current.author}</figcaption>
        </figure>
      </div>
      <div className="mt-4 flex items-center gap-2.5" data-ink-controls>
        <button type="button" className={BTN} onClick={() => go(state.index - 1)}>
          <Icon name="chevron-left" className="size-4" />
          <span className="sr-only">Previous quote</span>
        </button>
        <div className="flex items-center gap-2 px-1 font-mono text-[11px] tracking-[0.14em]">
          <span>{pad(state.index + 1)}</span>
          <span className="relative h-px w-12 overflow-hidden bg-foreground/20">
            <span
              key={state.index}
              data-paused={paused}
              onAnimationEnd={() => !paused && go(state.index + 1)}
              className="quote-progress absolute inset-0 bg-foreground"
              style={{ "--duration": `${DURATION}ms` } as React.CSSProperties}
            ></span>
          </span>
          <span className="text-muted-foreground">{pad(count)}</span>
        </div>
        <button type="button" className={BTN} onClick={() => go(state.index + 1)}>
          <Icon name="chevron-right" className="size-4" />
          <span className="sr-only">Next quote</span>
        </button>
        <button type="button" className={BTN} onClick={() => setPlaying((p) => !p)}>
          <Icon name={playing ? "pause" : "play"} className="size-3.5" />
          <span className="sr-only">{playing ? "Pause quotes" : "Play quotes"}</span>
        </button>
      </div>
    </div>
  );
}

import { Sparkle } from "./shared";

const WORDS = ["Inspire", "Innovate", "Impact", "Code", "Build", "Compete"];
const TEXT = "px-6 font-heading text-[clamp(1.75rem,4vw,3.25rem)] font-black uppercase leading-none tracking-tight sm:px-10";

function Strip() {
  // Each strip holds the phrases twice; two strips back to back make the loop seamless.
  return (
    <ul className="flex shrink-0 items-center">
      {[...WORDS, ...WORDS].map((word, i) => (
        <li key={i} className="flex items-center">
          <span className={`${TEXT} ${i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--chalk)]" : ""}`}>{word}</span>
          <Sparkle className="size-5 shrink-0 text-chalk sm:size-7" />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div aria-hidden="true" className="marquee relative z-10 -mt-px overflow-hidden bg-foreground py-5 text-chalk sm:py-7">
      <div className="marquee-track">
        <Strip />
        <Strip />
      </div>
    </div>
  );
}

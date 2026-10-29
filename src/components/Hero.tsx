"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import InkCanvas from "./InkCanvas";
import Quotes from "./Quotes";
import { Chroma, Sparkle, StarField, delay, starDots } from "./shared";

function Layer({
  className,
  depth = 0,
  rise = 0,
  spin = 0,
  style,
  children,
}: {
  className: string;
  depth?: number;
  rise?: number;
  spin?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={`hero-layer pointer-events-none ${className}`}
      style={{ "--depth": depth, "--rise": rise, "--spin": spin, ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}

// A dark, star-speckled blob of night sky.
function Blob({ radius, seed, dots, children }: { radius: string; seed: number; dots: number; children?: ReactNode }) {
  return (
    <div className="relative size-full overflow-hidden bg-foreground" style={{ borderRadius: radius }}>
      <StarField seed={seed} count={dots} className="pointer-events-none absolute inset-0 size-full fill-chalk" />
      {children}
    </div>
  );
}

function Hill({ id, viewBox, d, seed, dots, w, h }: { id: string; viewBox: string; d: string; seed: number; dots: number; w: number; h: number }) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" focusable="false" className="block h-auto w-full">
      <defs>
        <clipPath id={id}>
          <path d={d} />
        </clipPath>
      </defs>
      <path d={d} className="fill-foreground" />
      <g clipPath={`url(#${id})`} className="fill-chalk">
        {starDots(seed, dots, w, h, 0.6, 2.4).map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} opacity={s.o} />
        ))}
      </g>
    </svg>
  );
}

const TITLE: { text: string; size: string }[] = [
  { text: "IMEET", size: "text-[length:calc(var(--u)*19)] lg:text-[length:calc(var(--u)*10)]" },
  { text: "2026", size: "text-[length:calc(var(--u)*14)] lg:text-[length:calc(var(--u)*7.2)]" },
];

function Title() {
  let i = 0;
  return (
    <h1 id="hero-title" className="pointer-events-auto font-heading font-black uppercase leading-[0.9] tracking-[-0.01em]">
      <span className="sr-only">IMEET 2026</span>
      <span aria-hidden="true" className="relative isolate block">
        {TITLE.map((line) => (
          <span key={line.text} className={`block whitespace-nowrap ${line.size}`}>
            {line.text.split(" ").map((word, w) => (
              <span key={word}>
                {w > 0 && <span className="inline-block w-[0.24em]"></span>}
                {[...word].map((ch) => {
                  const n = i++;
                  return (
                    <span key={n} className="glyph" style={{ "--i": n } as CSSProperties}>
                      <span className="glyph-back">{ch}</span>
                      <span className="glyph-front">{ch}</span>
                    </span>
                  );
                })}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Scroll progress through the hero drives the layers' rise/spin and fades the title.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = { sy: 0 };
    const now = { sy: 0 };
    let frame = 0;
    let running = false;
    const tick = () => {
      const diff = target.sy - now.sy;
      let moving = false;
      if (Math.abs(diff) > 8e-4) {
        now.sy += diff * 0.18;
        moving = true;
      } else now.sy = target.sy;
      el.style.setProperty("--sy", now.sy.toFixed(4));
      if (moving) frame = window.requestAnimationFrame(tick);
      else running = false;
    };
    const kick = () => {
      if (!running) {
        running = true;
        frame = window.requestAnimationFrame(tick);
      }
    };
    const onScroll = () => {
      const h = el.offsetHeight || window.innerHeight;
      target.sy = Math.min(Math.max(window.scrollY / h, 0), 1.2);
      kick();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      aria-labelledby="hero-title"
      className="hero-stage relative isolate h-svh min-h-[640px] overflow-hidden bg-background lg:min-h-[680px] [@media(pointer:fine)]:cursor-crosshair"
      style={{ "--mx": 0, "--my": 0, "--sy": 0, "--ex": -1, "--ey": 1 } as CSSProperties}
    >
      {/* Night-sky blobs */}
      <Layer
        depth={14}
        rise={6}
        className="left-[56%] top-[9%] h-[calc(var(--u)*50)] w-[calc(var(--u)*38)] md:left-[64%] md:top-[6%] md:h-[calc(var(--u)*38)] md:w-[calc(var(--u)*28)] lg:left-[70%] lg:top-[8.5%] lg:h-[calc(var(--u)*25.5)] lg:w-[calc(var(--u)*18)]"
      >
        <div className="enter-pop size-full" style={delay(80)}>
          <div className="size-full animate-blob-sway">
            <Blob radius="46% 54% 58% 42% / 40% 44% 56% 60%" seed={11} dots={46}>
              <Sparkle className="twinkle absolute right-[12%] top-[11%] aspect-square w-[18%] text-chalk" style={delay(400)} />
              <span className="twinkle absolute left-[26%] top-[64%] aspect-square w-[3%] rounded-full bg-chalk" style={delay(1700)}></span>
              <span
                className="shooting-star left-[-20%] top-[20%] w-[62%] text-chalk"
                style={{ "--angle": "24deg", "--delay": "3s", "--duration": "8s" } as CSSProperties}
              ></span>
            </Blob>
          </div>
        </div>
      </Layer>
      <Layer
        depth={10}
        rise={4}
        className="left-[4%] top-[63%] h-[calc(var(--u)*36)] w-[calc(var(--u)*26)] md:left-[5%] md:h-[calc(var(--u)*24)] md:w-[calc(var(--u)*17)] lg:left-[8%] lg:top-[33%] lg:h-[calc(var(--u)*19.5)] lg:w-[calc(var(--u)*13.5)]"
      >
        <div className="enter-pop size-full rotate-[14deg]" style={delay(220)}>
          <div className="size-full animate-blob-sway" style={{ animationDelay: "-6s" }}>
            <Blob radius="50% 50% 44% 56% / 58% 54% 46% 42%" seed={22} dots={26}>
              <Sparkle className="twinkle absolute left-[56%] top-[18%] aspect-square w-[16%] text-chalk" style={delay(900)} />
            </Blob>
          </div>
        </div>
      </Layer>

      <InkCanvas targetRef={ref} />

      <Layer
        depth={8}
        className="left-[-3%] top-[52%] hidden h-[calc(var(--u)*10)] w-[calc(var(--u)*7)] sm:block lg:left-[-1.2%] lg:top-[46%] lg:h-[calc(var(--u)*6)] lg:w-[calc(var(--u)*3.6)]"
      >
        <div className="enter-pop size-full" style={delay(320)}>
          <div className="size-full animate-blob-sway" style={{ animationDelay: "-3s" }}>
            <Blob radius="60% 40% 55% 45% / 50% 60% 40% 50%" seed={33} dots={6} />
          </div>
        </div>
      </Layer>

      {/* Hills with the Moon on the left one */}
      <Layer depth={5} className="bottom-[-1%] left-[-1%] w-[80%] sm:w-[62%] lg:w-[45%]">
        <div className="enter-up">
          <div className="relative">
            <Hill
              id="hill-left"
              viewBox="0 0 460 300"
              d="M0 104 C52 88 110 84 156 98 C204 113 236 150 260 196 C278 232 292 268 302 300 L0 300 Z"
              seed={44}
              dots={72}
              w={460}
              h={300}
            />
            <div className="absolute left-[17%] top-[33%] w-[24%]">
              <div className="enter-pop" style={delay(520)}>
                <div className="animate-turn-slow">
                  <Chroma src="moon.png" />
                </div>
              </div>
            </div>
            <Sparkle className="twinkle absolute left-[60%] top-[62%] aspect-square w-[3.4%] text-chalk" style={delay(1600)} />
            <Sparkle className="twinkle absolute left-[8%] top-[80%] aspect-square w-[2.4%] text-chalk" style={delay(2400)} />
          </div>
        </div>
      </Layer>
      <Layer depth={5} className="bottom-[-1%] right-[-1%] w-[72%] sm:w-[54%] lg:w-[35%]">
        <div className="enter-up" style={delay(120)}>
          <div className="relative">
            <Hill
              id="hill-right"
              viewBox="0 0 340 260"
              d="M340 34 C290 30 236 52 196 92 C160 128 130 176 104 220 C96 234 90 248 86 260 L340 260 Z"
              seed={55}
              dots={58}
              w={340}
              h={260}
            />
            <Sparkle className="twinkle absolute left-[80%] top-[34%] aspect-square w-[4%] text-chalk" style={delay(500)} />
            <span className="twinkle absolute left-[52%] top-[72%] aspect-square w-[1.6%] rounded-full bg-chalk" style={delay(2000)}></span>
          </div>
        </div>
      </Layer>

      <Layer depth={16} className="left-[56%] top-[78%] z-[5] hidden w-[calc(var(--u)*20)] lg:block">
        <div className="enter-up" style={delay(1050)}>
          <Chroma src="telescope.png" />
        </div>
      </Layer>

      {/* Title and quotes */}
      <div
        className="hero-layer pointer-events-none inset-x-0 top-[27%] z-10 flex flex-col items-center px-5 text-center md:top-[30%] lg:top-[27%]"
        style={{ "--depth": 8, "--rise": -16, opacity: "calc(1 - var(--sy, 0) * 1.1)" } as CSSProperties}
      >
        <Title />
        <p className="enter-fade pointer-events-auto mt-[calc(var(--u)*3)] font-mono text-[11px] font-bold uppercase tracking-[0.22em] sm:text-xs lg:mt-[calc(var(--u)*2)]" style={delay(1200)}>
          19–20 Nov 2026 · RCCIIT, Kolkata · Dept. of IT
        </p>
        <div className="enter-fade pointer-events-auto mt-[calc(var(--u)*6)] w-full max-w-[min(30rem,86vw)] lg:mt-[calc(var(--u)*5)]" style={delay(1300)}>
          <Quotes />
        </div>
      </div>

      {/* Engraved objects */}
      <Layer
        depth={28}
        rise={14}
        className="left-[3%] top-[10%] z-20 w-[calc(var(--u)*33)] md:left-[4%] md:top-[9%] md:w-[calc(var(--u)*26)] lg:left-[27%] lg:top-[71%] lg:w-[calc(var(--u)*14.5)]"
      >
        <div className="enter-left" style={delay(950)}>
          <div className="animate-float-ufo">
            <Chroma src="ufo.png" />
          </div>
        </div>
      </Layer>
      <Layer
        depth={22}
        rise={10}
        className="left-[-4%] top-[60%] z-20 w-[calc(var(--u)*30)] md:left-0 md:w-[calc(var(--u)*20)] lg:left-[0.5%] lg:top-[36.5%] lg:w-[calc(var(--u)*14)]"
      >
        <div className="enter-up" style={delay(820)}>
          <div className="animate-float-saturn">
            <Chroma src="sputnik.png" w={848} h={1264} />
          </div>
        </div>
      </Layer>
      <Layer
        depth={34}
        rise={22}
        spin={-10}
        className="left-[40%] top-[14%] z-20 w-[calc(var(--u)*56)] md:left-[58%] md:top-[9%] md:w-[calc(var(--u)*40)] lg:left-[66%] lg:top-[19%] lg:w-[calc(var(--u)*24)]"
      >
        <div className="enter-pop" style={delay(650)}>
          <div className="animate-float-saturn">
            <Chroma src="saturn.png" w={1264} h={848} />
          </div>
        </div>
      </Layer>
      <Layer depth={36} rise={26} className="left-[83%] top-[55%] z-20 w-[calc(var(--u)*9)] lg:left-[84%] lg:top-[54%] lg:w-[calc(var(--u)*4)]">
        <div className="enter-pop" style={delay(1400)}>
          <div className="animate-bob" style={{ animationDelay: "-3s" }}>
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className="block h-auto w-full">
              <defs>
                <clipPath id="planet-clip">
                  <circle cx="32" cy="32" r="14" />
                </clipPath>
              </defs>
              <ellipse cx="32" cy="32" rx="29" ry="7.5" transform="rotate(-18 32 32)" fill="none" className="stroke-foreground" strokeWidth="2.2" />
              <circle cx="32" cy="32" r="14" className="fill-chalk stroke-foreground" strokeWidth="2.2" />
              <g clipPath="url(#planet-clip)">
                <path d="M10 25H54M10 31H54M10 37H54" transform="rotate(-18 32 32)" className="stroke-foreground" strokeWidth="1.3" opacity="0.75" />
              </g>
              <path d="M3 32A29 7.5 0 0 0 61 32" transform="rotate(-18 32 32)" fill="none" className="stroke-foreground" strokeWidth="2.2" />
            </svg>
          </div>
        </div>
      </Layer>
      <Layer depth={50} rise={34} className="left-[44%] top-[89%] z-20 w-[calc(var(--u)*9)] lg:left-[73.5%] lg:top-[80%] lg:w-[calc(var(--u)*4.6)]">
        <div className="enter-pop" style={delay(1500)}>
          <div className="animate-bob">
            <div className="animate-turn-slow">
              <Chroma src="moon.png" />
            </div>
          </div>
        </div>
      </Layer>
      <Layer depth={60} rise={40} className="left-[68.6%] top-[76%] z-20 hidden w-[calc(var(--u)*2.6)] lg:block">
        <div className="enter-pop" style={delay(1650)}>
          <div className="animate-bob" style={{ animationDelay: "-2s" }}>
            <Chroma src="moon.png" />
          </div>
        </div>
      </Layer>
      <Layer depth={20} rise={12} className="left-[22%] top-[22%] z-10 hidden w-[calc(var(--u)*2.4)] lg:block">
        <div className="enter-pop" style={delay(1250)}>
          <span className="block aspect-square w-full rounded-full border-2 border-foreground"></span>
        </div>
      </Layer>
      <Layer
        depth={42}
        rise={30}
        spin={16}
        className="left-[38%] top-[64%] z-30 w-[calc(var(--u)*66)] sm:left-[52%] sm:top-[60%] sm:w-[calc(var(--u)*46)] md:left-[56%] md:top-[64%] lg:left-[63%] lg:top-[45%] lg:w-[calc(var(--u)*35)]"
      >
        <div className="enter-right" style={delay(1150)}>
          <div className="animate-float-astronaut">
            <Chroma src="astronaut.png" />
          </div>
        </div>
      </Layer>

      {/* Loose sparkles */}
      <Layer depth={18} className="left-[86%] top-[47%] z-30 w-[calc(var(--u)*5)] lg:left-[57%] lg:top-[15%] lg:w-[calc(var(--u)*1.7)]">
        <Sparkle className="twinkle block h-auto w-full text-foreground" style={delay(600)} />
      </Layer>
      <Layer depth={24} className="left-[8%] top-[50%] z-30 w-[calc(var(--u)*4)] lg:left-[25%] lg:top-[60%] lg:w-[calc(var(--u)*1.3)]">
        <Sparkle className="twinkle block h-auto w-full text-foreground" style={delay(2100)} />
      </Layer>
      <Layer depth={30} className="left-[48.5%] top-[86%] z-30 hidden w-[calc(var(--u)*1.4)] lg:block">
        <Sparkle className="twinkle block h-auto w-full text-foreground" style={delay(1300)} />
      </Layer>
    </section>
  );
}

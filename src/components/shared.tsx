"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

// The engraved illustrations are served by the original template.
export const IMG = "https://voyager-template.modulify.website/images";

export const SPARKLE = "M12 0C12.7 6.4 17.6 11.3 24 12C17.6 12.7 12.7 17.6 12 24C11.3 17.6 6.4 12.7 0 12C6.4 11.3 11.3 6.4 12 0Z";

export const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

// Small deterministic RNG so the scattered stars render the same on server and client.
export function createRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function starDots(seed: number, count: number, w = 100, h = 100, rMin = 0.18, rMax = 0.92) {
  const rand = createRandom(seed);
  return Array.from({ length: count }, () => ({
    cx: +(rand() * w).toFixed(2),
    cy: +(rand() * h).toFixed(2),
    r: +(rMin + rand() ** 3 * (rMax - rMin)).toFixed(2),
    o: +(0.45 + rand() * 0.55).toFixed(2),
  }));
}

export function StarField({ seed, count, className }: { seed: number; count: number; className: string }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" className={className}>
      {starDots(seed, count).map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} opacity={s.o} />
      ))}
    </svg>
  );
}

export function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} style={style}>
      <path d={SPARKLE} fill="currentColor" />
    </svg>
  );
}

// The PNGs are black ink on white; this matrix turns the white into transparency.
export function Chroma({ src, w = 1024, h = 1024, label }: { src: string; w?: number; h?: number; label?: string }) {
  const id = `chroma-${useId().replace(/:/g, "")}`;
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<SVGImageElement>(null);

  useEffect(() => {
    // Preload separately: an SVG <image> exposes no load state of its own.
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = `${IMG}/${src}`;
  }, [src]);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className="block h-auto w-full overflow-visible"
    >
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0.5 0 0.5 0 0 0.5 0 0.5 0 0 0.5 0 0.5 0 0 1.25 -2.5 1.25 0 1" />
        </filter>
      </defs>
      <image
        ref={ref}
        href={`${IMG}/${src}`}
        width={w}
        height={h}
        filter={`url(#${id})`}
        className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </svg>
  );
}

export function Reveal({ children, className = "", delay: d = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ "--reveal-delay": `${d}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, invert = false }: { children: ReactNode; invert?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] ${invert ? "text-chalk/70" : "text-muted-foreground"}`}>
      <Sparkle className="size-3" />
      {children}
    </p>
  );
}

export function SectionTitle({
  id,
  eyebrow,
  title,
  body,
  invert = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
  invert?: boolean;
}) {
  return (
    <>
      <Eyebrow invert={invert}>{eyebrow}</Eyebrow>
      {/* On dark sections the title is flat chalk; the original's class merge drops the extrusion there. */}
      <h2
        id={id}
        className={`mt-5 font-heading text-[clamp(2.6rem,6.4vw,5.75rem)] font-black uppercase leading-[0.92] tracking-[-0.01em] ${invert ? "text-extrude-inverse" : "text-extrude"}`}
      >
        {title}
      </h2>
      {body && (
        <p className={`mt-7 max-w-xl font-mono text-sm leading-relaxed sm:text-[15px] ${invert ? "text-chalk/75" : "text-muted-foreground"}`}>{body}</p>
      )}
    </>
  );
}

// Lucide icons used across the page, drawn inline.
const ICONS: Record<string, ReactNode> = {
  menu: (
    <>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </>
  ),
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  "chevron-left": <path d="m15 18-6-6 6-6" />,
  "chevron-right": <path d="m9 18 6-6-6-6" />,
  pause: (
    <>
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </>
  ),
  play: <polygon points="6 3 20 12 6 21 6 3" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  ),
  "arrow-up": (
    <>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </>
  ),
  "calendar-days": (
    <>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </>
  ),
  zap: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </>
  ),
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  sparkles: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </>
  ),
  orbit: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <path d="M10.4 21.9a10 10 0 0 0 9.941-15.416" />
      <path d="M13.5 2.1a10 10 0 0 0-9.841 15.416" />
    </>
  ),
  satellite: (
    <>
      <path d="M13 7 9 3 5 7l4 4" />
      <path d="m17 11 4 4-4 4-4-4" />
      <path d="m8 12 4 4 6-6-4-4Z" />
      <path d="m16 8 3-3" />
      <path d="M9 21a6 6 0 0 0-6-6" />
    </>
  ),
  "rotate-cw": (
    <>
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </>
  ),
  plus: (
    <>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
  telescope: (
    <>
      <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
      <path d="m13.56 11.747 4.332-.924" />
      <path d="m16 21-3.105-6.21" />
      <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
      <path d="m6.158 8.633 1.114 4.456" />
      <path d="m8 21 3.105-6.21" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  "circle-alert": (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </>
  ),
};

export function Icon({ name, className = "" }: { name: keyof typeof ICONS; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`lucide lucide-${name} ${className}`}
    >
      {ICONS[name]}
    </svg>
  );
}

// The IMEET mark is drawn in white; `dark` inverts it for light backgrounds.
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/imeet/logo.svg"
        alt=""
        aria-hidden="true"
        className={`size-9 transition-transform duration-700 ease-out group-hover:-rotate-[20deg] ${dark ? "invert" : ""}`}
      />
      <span className="font-sans text-sm font-semibold uppercase tracking-[0.24em]">IMEET 2026</span>
    </span>
  );
}

export const NAV = [
  { href: "#about", label: "About IMEET" },
  { href: "#hods-desk", label: "HOD's Desk" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#register", label: "Register" },
];

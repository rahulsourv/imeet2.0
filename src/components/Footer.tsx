"use client";

import { Icon, Logo, NAV } from "./shared";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chalk";

const CONTACT = [
  "RCC Institute of Information Technology",
  "Canal South Road, Beliaghata, Kolkata 700015",
  "Department of Information Technology",
];

export default function Footer() {
  return (
    <footer className="relative mt-auto text-chalk">
      <svg viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true" focusable="false" className="block h-[clamp(56px,8vw,128px)] w-full fill-foreground">
        <path d="M0 140 L0 72 C120 40 240 30 360 52 C470 72 560 112 690 104 C820 96 900 40 1040 30 C1180 20 1300 62 1440 46 L1440 140 Z" />
      </svg>
      <div className="relative -mt-px overflow-hidden bg-foreground">
        <div className="bg-starfield pointer-events-none absolute inset-0 opacity-40"></div>
        <div className="relative mx-auto max-w-[1680px] px-[4%] pb-10 pt-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <a href="#" aria-label="IMEET home" className={`group inline-flex rounded-full text-chalk ${FOCUS}`}>
                <Logo />
              </a>
              <p className="mt-6 max-w-sm font-mono text-sm leading-relaxed text-chalk/70">
                IMEET 2026, the departmental fest of the Department of Information Technology, RCCIIT. Two days of competitions, challenges, showcases, workshops and talks on 19 and 20 November 2026.
              </p>
            </div>
            <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
              <div>
                <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-chalk/55">Explore</h2>
                <ul className="mt-5 space-y-3">
                  {NAV.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={`link-underline pb-0.5 text-sm uppercase tracking-[0.08em] text-chalk/90 transition-colors hover:text-chalk ${FOCUS}`}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:col-span-2">
                <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-chalk/55">Contact</h2>
                <ul className="mt-5 space-y-3">
                  {CONTACT.map((line) => (
                    <li key={line} className="text-base leading-snug text-chalk/90">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
          <p
            aria-hidden="true"
            data-wordmark
            className="text-extrude text-extrude-inverse mt-16 select-none text-center font-heading text-[clamp(4.25rem,17vw,17rem)] font-black uppercase leading-[0.85] tracking-[-0.02em] sm:mt-20"
          >
            {[..."IMEET"].map((ch, i) => (
              <span key={i} data-letter className="inline-block">
                {ch}
              </span>
            ))}
          </p>
          <div className="mt-10 flex flex-col gap-4 border-t border-chalk/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-chalk/60">
              ©<span>2026</span> IMEET · Dept. of IT, RCCIIT. All rights reserved.
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`inline-flex items-center gap-2 self-start rounded-full border border-chalk/25 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-chalk hover:text-foreground sm:self-auto ${FOCUS}`}
            >
              Back to top
              <Icon name="arrow-up" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

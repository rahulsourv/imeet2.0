"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import RegisterButton from "./RegisterButton";
import { Icon, Logo, NAV, delay } from "./shared";

// Register has its own button, so the desktop bar lists only the section links.
const LINKS = NAV.filter((l) => l.href !== "#register");

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    first.current?.focus();
    return () => {
      root.style.overflow = prev;
    };
  }, []);

  // Escape closes; Tab stays inside the menu.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") return onClose();
    if (e.key !== "Tab" || !ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const start = items[0];
    const end = items[items.length - 1];
    if (e.shiftKey && document.activeElement === start) {
      e.preventDefault();
      end.focus();
    } else if (!e.shiftKey && document.activeElement === end) {
      e.preventDefault();
      start.focus();
    }
  };

  return (
    <div
      id="mobile-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onKeyDown={onKeyDown}
      className="animate-in fade-in fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-foreground text-chalk lg:hidden"
      style={{ animationDuration: "300ms" }}
    >
      <div aria-hidden="true" className="bg-starfield pointer-events-none absolute inset-0 opacity-70"></div>
      <div className="relative flex h-16 shrink-0 items-center justify-between px-[4%]">
        <a href="#" onClick={onClose} className="group rounded-full">
          <Logo />
        </a>
        <button
          type="button"
          onClick={onClose}
          className="grid size-11 place-items-center rounded-full border border-chalk/30 transition-colors hover:bg-chalk hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chalk"
        >
          <Icon name="x" className="size-5" />
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      <nav aria-label="Mobile" className="relative flex flex-1 flex-col justify-center px-[6%] py-10">
        <ul className="space-y-4">
          {NAV.map((link, i) => (
            <li key={link.href} className="menu-item" style={delay(120 + 70 * i)}>
              <a
                ref={i === 0 ? first : undefined}
                href={link.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 rounded-lg py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chalk"
              >
                <span className="font-mono text-xs text-chalk/60">{`0${i + 1}`}</span>
                <span className="font-heading text-[clamp(2.1rem,9vw,3.75rem)] font-black uppercase leading-[0.95] tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="menu-item relative px-[6%] pb-10" style={{ "--delay": "520ms" } as CSSProperties}>
        <a
          href="#register"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full bg-chalk px-6 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chalk"
        >
          Register for IMEET
          <Icon name="arrow-up-right" className="size-4" />
        </a>
      </div>
    </div>
  );
}

export default function Header() {
  const toggle = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The link for whichever section crosses the middle of the screen is underlined.
  useEffect(() => {
    const sections = NAV.map((l) => document.getElementById(l.href.slice(1))).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          setActive((cur) => (entry.isIntersecting ? id : cur === id ? null : cur));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* At the top it floats over the hero with difference blending; once scrolled it gets a frosted bar. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          scrolled
            ? "bg-background/85 shadow-[0_1px_0_0_rgb(15_15_14/0.1)] backdrop-blur-md"
            : "bg-transparent mix-blend-difference [&_a]:text-chalk [&_button]:border-chalk/40 [&_button]:bg-transparent [&_button]:text-chalk [@media(pointer:fine)]:cursor-crosshair"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1680px] items-center justify-between px-[4%] lg:h-20">
          <a href="#" aria-label="IMEET home" className={`group enter-fade rounded-full text-foreground ${FOCUS}`}>
            <Logo dark={scrolled} />
          </a>
          <nav aria-label="Main" className="ml-auto mr-10 hidden lg:block xl:mr-14">
            <ul className="flex items-center gap-9 xl:gap-14">
              {LINKS.map((link, i) => {
                const on = active === link.href.slice(1);
                return (
                  <li key={link.href} className="enter-rise" style={delay(700 + i * 80)}>
                    <a
                      href={link.href}
                      data-active={on}
                      className={`group/link relative block cursor-pointer select-none py-3 text-[13px] font-medium uppercase tracking-[0.1em] text-foreground ${FOCUS}`}
                    >
                      <span data-active={on} className="link-underline pointer-events-none pb-1">
                        {link.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          {/* Keeps room for the Register button, which sits outside the blended header. */}
          <span aria-hidden="true" className="hidden w-[8.75rem] lg:block"></span>
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center rounded-full border border-foreground/20 bg-background/60 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground hover:text-chalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground lg:hidden"
          >
            <Icon name="menu" className="size-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </header>
      {/* Outside the header so difference blending never touches its colours. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-16 max-w-[1680px] items-center justify-end px-[4%] lg:h-20">
          <RegisterButton className="mr-14 lg:mr-0" />
        </div>
      </div>
      {open && (
        <MobileMenu
          onClose={() => {
            setOpen(false);
            toggle.current?.focus();
          }}
        />
      )}
    </>
  );
}

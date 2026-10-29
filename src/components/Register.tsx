"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Chroma, Icon, Reveal, SectionTitle, Sparkle } from "./shared";

const PERKS = [
  { icon: "calendar-days", title: "Registration opens", body: "The moment the official registration links go live." },
  { icon: "telescope", title: "The event list", body: "Event names, rules, team sizes and fees for all six categories." },
  { icon: "rocket", title: "The schedule", body: "Timings and venues for both days of IMEET 2026." },
] as const;

type Status = "idle" | "error" | "done";

function SignupForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // There is no mailing list behind this form yet; it only checks the address and thanks the visitor.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget).get("website");
    if (honeypot) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("done");
  };

  return (
    <form noValidate onSubmit={onSubmit} className="relative max-w-xl">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.2em] text-chalk/70">
        Your email address
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:border-2 sm:border-chalk/80 sm:p-1.5 sm:transition-[border-color,box-shadow] sm:focus-within:border-chalk sm:focus-within:ring-2 sm:focus-within:ring-chalk/40">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          aria-invalid={status === "error"}
          aria-describedby={`${id}-hint`}
          disabled={status === "done"}
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="h-14 w-full min-w-0 flex-1 rounded-full border-2 border-chalk/80 bg-transparent px-6 font-mono text-[15px] text-chalk placeholder:text-chalk/45 focus:outline-none focus-visible:border-chalk focus-visible:ring-2 focus-visible:ring-chalk/50 disabled:opacity-60 sm:h-12 sm:border-0 sm:px-5 sm:focus-visible:ring-0"
        />
        <button
          type="submit"
          disabled={status === "done"}
          className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-chalk px-7 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chalk disabled:translate-y-0 disabled:opacity-80 sm:h-12"
        >
          <Icon name={status === "done" ? "check" : "rocket"} className="size-4" />
          {status === "done" ? "You're on the list" : "Notify me"}
        </button>
      </div>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" name="website" defaultValue="" />
        </label>
      </div>
      <p
        id={`${id}-hint`}
        role={status === "error" ? "alert" : undefined}
        className={`mt-3 flex items-center gap-2 font-mono text-xs leading-relaxed ${status === "error" ? "text-chalk" : "text-chalk/55"}`}
      >
        {status === "error" && <Icon name="circle-alert" className="size-4 shrink-0" />}
        {status === "error" ? message : status === "done" ? "Thanks. We will write when registration opens." : "Only IMEET 2026 updates. No spam, ever."}
      </p>
    </form>
  );
}

export default function Register() {
  const ref = useRef<HTMLDivElement>(null);

  // --p runs 0 to 1 as the card scrolls through the viewport; the rocket rides it.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let frame = 0;
    let inView = false;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      el.style.setProperty("--p", Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1).toFixed(4));
    };
    const request = () => {
      if (inView && !frame) frame = window.requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = !!entry?.isIntersecting;
      request();
    });
    io.observe(el);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      io.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <section id="register" aria-labelledby="register-title" className="relative bg-background px-[3%] pb-24 sm:pb-32">
      <div ref={ref} className="relative mx-auto max-w-[1680px] overflow-hidden rounded-[2.5rem] bg-foreground text-chalk sm:rounded-[3.5rem]">
        <div className="bg-starfield pointer-events-none absolute inset-0 opacity-60"></div>
        <span className="shooting-star left-[40%] top-[8%] w-[24%] text-chalk" style={{ "--angle": "26deg", "--delay": "2s", "--duration": "9s" } as CSSProperties}></span>
        <div className="relative grid gap-14 px-[6%] py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-24">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionTitle
                id="register-title"
                eyebrow="Register"
                title="Your story starts here"
                body="Official registration links will be announced soon. Leave your email and hear the moment they go live."
                invert
              />
            </Reveal>
            <Reveal className="mt-10" delay={120}>
              <SignupForm />
            </Reveal>
            <Reveal className="mt-14" delay={200}>
              <ul className="grid gap-8 border-t border-chalk/15 pt-10 sm:grid-cols-3 sm:gap-6">
                {PERKS.map((perk) => (
                  <li key={perk.title}>
                    <span className="grid size-11 place-items-center rounded-full border border-chalk/30">
                      <Icon name={perk.icon} className="size-5" />
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-extrabold">{perk.title}</h3>
                    <p className="mt-2 font-mono text-[13px] leading-relaxed text-chalk/70">{perk.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="relative lg:col-span-5">
            <Reveal delay={150}>
              <div className="relative mx-auto w-[min(78%,24rem)] lg:w-[min(100%,26rem)]">
                <div className="will-change-transform" style={{ transform: "translate3d(0, calc((0.5 - var(--p, 0.5)) * 36%), 0)" }}>
                  <div className="animate-bob">
                    <Chroma src="rocket.png" w={848} h={1264} />
                  </div>
                </div>
                <Sparkle className="twinkle absolute left-[-6%] top-[12%] size-7 text-chalk" />
                <Sparkle className="twinkle absolute right-[-4%] top-[34%] size-5 text-chalk" style={{ "--delay": "1.1s" } as CSSProperties} />
                <Sparkle className="twinkle absolute left-[8%] top-[52%] size-3.5 text-chalk" style={{ "--delay": "2.2s" } as CSSProperties} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

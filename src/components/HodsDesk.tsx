import type { CSSProperties } from "react";
import { Chroma, Icon, Reveal, SectionTitle, Sparkle } from "./shared";

// The HOD's message, name and portrait have not been supplied yet; placeholders mark where they go.
export default function HodsDesk() {
  return (
    <section id="hods-desk" aria-labelledby="hods-desk-title" className="relative bg-background px-[3%] pb-24 sm:pb-32">
      <div className="relative mx-auto max-w-[1680px] overflow-hidden rounded-[2.5rem] bg-foreground text-chalk sm:rounded-[3.5rem]">
        <div className="bg-starfield pointer-events-none absolute inset-0 opacity-60"></div>
        <span className="shooting-star left-[40%] top-[8%] w-[24%] text-chalk" style={{ "--angle": "26deg", "--delay": "2s", "--duration": "9s" } as CSSProperties}></span>
        <div className="relative grid gap-14 px-[6%] py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-24">
          <div className="relative lg:col-span-5">
            <Reveal>
              <div className="relative mx-auto w-[min(78%,24rem)] lg:w-[min(100%,26rem)]">
                <div data-parallax="4" className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-chalk/80 bg-chalk text-foreground">
                  <div className="absolute inset-x-[8%] bottom-0">
                    <div className="animate-bob">
                      <Chroma src="astronaut.png" />
                    </div>
                  </div>
                  <p className="absolute left-5 top-5 rounded-full border border-foreground px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]">
                    Portrait to be supplied
                  </p>
                </div>
                <Sparkle className="twinkle absolute left-[-6%] top-[12%] size-7 text-chalk" />
                <Sparkle className="twinkle absolute right-[-4%] top-[34%] size-5 text-chalk" style={{ "--delay": "1.1s" } as CSSProperties} />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <SectionTitle id="hods-desk-title" eyebrow="HOD's Desk" title="A message for the journey" invert />
            </Reveal>
            <Reveal className="mt-10" delay={120}>
              <blockquote className="max-w-2xl font-mono text-[15px] leading-relaxed text-chalk/80 sm:text-base">
                “The official message from the Head of the Department will appear here once it has been supplied.”
              </blockquote>
              <div className="mt-7 max-w-2xl space-y-3" aria-hidden="true">
                <span className="block h-2 w-full rounded-full bg-chalk/10"></span>
                <span className="block h-2 w-11/12 rounded-full bg-chalk/10"></span>
                <span className="block h-2 w-3/4 rounded-full bg-chalk/10"></span>
              </div>
            </Reveal>
            <Reveal className="mt-12" delay={200}>
              <div className="flex items-center gap-5 border-t border-chalk/15 pt-8">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-chalk/30">
                  <Icon name="sparkles" className="size-5" />
                </span>
                <div>
                  <p className="font-heading text-lg font-extrabold uppercase">[ Name of the HOD ]</p>
                  <p className="mt-1 font-mono text-[13px] text-chalk/60">Head of the Department, Information Technology, RCCIIT</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

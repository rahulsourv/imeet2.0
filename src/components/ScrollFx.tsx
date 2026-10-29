"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll-linked touches, kept light so they support the reveals rather than compete:
//   [data-parallax="n"]  drifts n% against the scroll while in view
//   [data-spin="deg"]    turns by up to deg degrees across its pass through the screen
//   [data-wordmark]      letters of the footer wordmark rise into place in sequence
export default function ScrollFx() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 6;
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-spin]").forEach((el) => {
        const deg = Number(el.dataset.spin) || 20;
        gsap.fromTo(
          el,
          { rotate: -deg / 2 },
          { rotate: deg / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-wordmark]").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-letter]"), {
          yPercent: 60,
          rotate: (i) => (i % 2 ? 6 : -6),
          opacity: 0,
          stagger: 0.07,
          ease: "power3.out",
          duration: 1.1,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    });

    // Late-loading fonts and images change section heights.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}

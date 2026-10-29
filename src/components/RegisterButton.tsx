"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { Icon } from "./shared";

// A dark pill that leans gently toward the cursor and springs back when it leaves.
export default function RegisterButton({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });
  const arrowX = useTransform(sx, (v) => v * 0.6);
  const arrowY = useTransform(sy, (v) => v * 0.6);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href="#register"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      className={`pointer-events-auto inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-chalk shadow-[-4px_4px_0_0_rgb(15_15_14/0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${className}`}
    >
      Register
      <motion.span style={{ x: arrowX, y: arrowY }} className="inline-flex">
        <Icon name="arrow-up-right" className="size-4" />
      </motion.span>
    </motion.a>
  );
}

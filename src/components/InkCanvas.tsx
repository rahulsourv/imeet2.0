"use client";

import { useEffect, useRef, type RefObject } from "react";
import { createRandom } from "./shared";

const CHALK = "#f7f6f2";

const FACTS = [
  {
    title: "Two days. Six arenas.",
    text: "On 19 and 20 November 2026, the Department of Information Technology at RCCIIT opens its doors to competitions, coding challenges, project showcases, workshops, talks and festival activities.",
  },
  {
    title: "Inspire. Innovate. Impact.",
    text: "IMEET brings together curious minds, creative thinkers and future innovators to explore ideas, challenge boundaries and build something meaningful.",
  },
];

function wrap(ctx: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > width && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

function sparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const r = size / 2;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x + 0.08 * r, y - 0.08 * r, x + r, y);
  ctx.quadraticCurveTo(x + 0.08 * r, y + 0.08 * r, x, y + r);
  ctx.quadraticCurveTo(x - 0.08 * r, y + 0.08 * r, x - r, y);
  ctx.quadraticCurveTo(x - 0.08 * r, y - 0.08 * r, x, y - r);
  ctx.fill();
}

// Moving the mouse over the hero paints with a soft brush that uncovers a hidden night
// sky with two notes about IMEET. The ink fades away after ten seconds of stillness.
export default function InkCanvas({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    const canvas = canvasRef.current;
    if (!target || !canvas || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const view = canvas.getContext("2d");
    const mask = document.createElement("canvas");
    const scene = document.createElement("canvas");
    const maskCtx = mask.getContext("2d");
    const sceneCtx = scene.getContext("2d");
    if (!view || !maskCtx || !sceneCtx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let frame = 0;
    let fadeSteps = 0;
    let lastPaint = 0;
    let last: { x: number; y: number } | null = null;
    let mid: { x: number; y: number } | null = null;
    let brush = 0;
    let disposed = false;

    const cssVar = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

    const drawScene = () => {
      const m = sceneCtx;
      m.setTransform(dpr, 0, 0, dpr, 0, 0);
      m.fillStyle = "#0f0f0e";
      m.fillRect(0, 0, w, h);
      const rand = createRandom(9001);
      m.fillStyle = CHALK;
      for (let i = 0; i < Math.round((w * h) / 5200); i += 1) {
        const x = rand() * w;
        const y = rand() * h;
        const r = 0.5 + rand() ** 3 * 1.6;
        m.globalAlpha = 0.35 + 0.65 * rand();
        m.beginPath();
        m.arc(x, y, r, 0, 2 * Math.PI);
        m.fill();
      }
      m.globalAlpha = 1;
      for (let i = 0; i < 7; i += 1) sparkle(m, rand() * w, rand() * h, 10 + 16 * rand());

      const heading = cssVar("--font-app-heading", "sans-serif");
      const mono = cssVar("--font-app-mono", "monospace");
      const s = Math.min(w / 100, h / 62.5);
      const boxes =
        w >= 1024
          ? [
              { x: 0.1 * w, y: 0.31 * h, w: 0.32 * w },
              { x: 0.5 * w, y: 0.5 * h, w: 0.3 * w },
            ]
          : [
              { x: 0.08 * w, y: 0.2 * h, w: 0.84 * w },
              { x: 0.08 * w, y: 0.56 * h, w: 0.84 * w },
            ];
      const titleSize = Math.max(22, Math.min(2.6 * s, 48));
      const bodySize = Math.max(12, Math.min(0.95 * s, 16));
      m.textAlign = "center";
      m.textBaseline = "top";
      m.fillStyle = CHALK;
      FACTS.forEach((fact, i) => {
        const box = boxes[i];
        const cx = box.x + box.w / 2;
        let y = box.y;
        m.font = `800 ${titleSize}px ${heading}`;
        for (const line of wrap(m, fact.title, box.w)) {
          m.fillText(line, cx, y);
          y += 1.12 * titleSize;
        }
        y += 1.4 * bodySize;
        m.font = `400 ${bodySize}px ${mono}`;
        m.globalAlpha = 0.88;
        for (const line of wrap(m, fact.text, box.w)) {
          m.fillText(line, cx, y);
          y += 1.75 * bodySize;
        }
        m.globalAlpha = 1;
      });
    };

    const composite = () => {
      view.setTransform(1, 0, 0, 1, 0, 0);
      view.globalCompositeOperation = "source-over";
      view.clearRect(0, 0, canvas.width, canvas.height);
      view.drawImage(mask, 0, 0);
      view.globalCompositeOperation = "source-in";
      view.drawImage(scene, 0, 0);
      view.globalCompositeOperation = "source-over";
    };

    const loop = () => {
      frame = 0;
      if (disposed) return;
      if (performance.now() - lastPaint > 1e4) {
        maskCtx.setTransform(1, 0, 0, 1, 0, 0);
        maskCtx.globalCompositeOperation = "destination-out";
        maskCtx.fillStyle = "rgba(0, 0, 0, 0.06)";
        maskCtx.fillRect(0, 0, mask.width, mask.height);
        maskCtx.globalCompositeOperation = "source-over";
        fadeSteps += 1;
        if (fadeSteps >= 90) {
          maskCtx.clearRect(0, 0, mask.width, mask.height);
          fadeSteps = 0;
          composite();
          return;
        }
      }
      composite();
      frame = window.requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = target.getBoundingClientRect();
      const keep = document.createElement("canvas");
      keep.width = mask.width;
      keep.height = mask.height;
      keep.getContext("2d")?.drawImage(mask, 0, 0);
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [canvas, mask, scene]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      if (keep.width && keep.height) maskCtx.drawImage(keep, 0, 0, mask.width, mask.height);
      drawScene();
      composite();
    };

    const paint = (x: number, y: number) => {
      const size = Math.max(70, Math.min(0.075 * w, 140));
      maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maskCtx.globalCompositeOperation = "source-over";
      maskCtx.fillStyle = "#fff";
      maskCtx.strokeStyle = "#fff";
      maskCtx.lineCap = "round";
      maskCtx.lineJoin = "round";
      if (!last) {
        brush = size;
        maskCtx.beginPath();
        maskCtx.arc(x, y, brush, 0, 2 * Math.PI);
        maskCtx.fill();
        last = { x, y };
        return;
      }
      const next = { x: (last.x + x) / 2, y: (last.y + y) / 2 };
      const from = mid ?? last;
      brush += (size - brush) * 0.15;
      maskCtx.lineWidth = 2 * brush;
      maskCtx.beginPath();
      maskCtx.moveTo(from.x, from.y);
      maskCtx.quadraticCurveTo(last.x, last.y, next.x, next.y);
      maskCtx.stroke();
      mid = next;
      last = { x, y };
    };

    const lift = () => {
      last = null;
      mid = null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (e.target instanceof Element && e.target.closest("[data-ink-controls]")) return lift();
      const rect = target.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return lift();
      paint(e.clientX - rect.left, e.clientY - rect.top);
      lastPaint = performance.now();
      fadeSteps = 0;
      if (!frame) frame = window.requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(target);
    document.fonts?.ready.then(() => {
      if (!disposed) {
        drawScene();
        composite();
      }
    });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", lift);
    return () => {
      disposed = true;
      ro.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", lift);
    };
  }, [targetRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[15] size-full" />;
}

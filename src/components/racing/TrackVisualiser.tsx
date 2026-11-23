"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { TRACK_PATH } from "@/data/races";

const TURNS = [0.04, 0.16, 0.22, 0.27, 0.33, 0.39, 0.45, 0.5, 0.56, 0.62, 0.68, 0.74, 0.8, 0.86, 0.92, 0.97];
const LAYERS = 9;

/** Glowing extruded circuit in faux-3D, drawn on when it scrolls into view. */
export function TrackVisualiser() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const main = el.querySelector<SVGPathElement>(".tv__path--top");
      // Position turn pins along the path
      if (main) {
        const len = main.getTotalLength();
        el.querySelectorAll<HTMLElement>(".tv__pin").forEach((pin, i) => {
          const p = main.getPointAtLength(len * TURNS[i]);
          pin.style.left = `${((p.x - 40) / 880) * 100}%`;
          pin.style.top = `${((p.y - 80) / 360) * 100}%`;
        });
      }
      if (prefersReducedMotion()) return;
      const paths = el.querySelectorAll(".tv__path");
      gsap.set(paths, { drawSVG: "0%" });
      gsap.set(".tv__pin", { autoAlpha: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%", once: true } });
      tl.to(paths, { drawSVG: "100%", duration: 2.2, ease: "power2.inOut", stagger: 0.025 })
        .to(".tv__pin", { autoAlpha: 1, duration: 0.4, stagger: 0.05 }, "-=1.2");

      // Mouse tilt
      const stage = el.querySelector<HTMLElement>(".tv__stage");
      const rx = gsap.quickTo(stage, "rotationX", { duration: 1.2, ease: "power3" });
      const rz = gsap.quickTo(stage, "rotationZ", { duration: 1.2, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        rz(-6 + nx * 8);
        rx(58 + ny * 8);
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    },
    { scope: root }
  );

  return (
    <div ref={root} className="tv" aria-hidden="true">
      <div className="tv__stage">
        {Array.from({ length: LAYERS }, (_, i) => (
          <svg key={i} className="tv__layer" viewBox="40 80 880 360" style={{ transform: `translateZ(${i * 3.2}px)` }}>
            <path
              className={`tv__path ${i === LAYERS - 1 ? "tv__path--top" : ""}`}
              d={TRACK_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth={i === LAYERS - 1 ? 5 : 3}
              strokeLinejoin="round"
              opacity={i === LAYERS - 1 ? 1 : 0.18 + (i / LAYERS) * 0.35}
            />
          </svg>
        ))}
        {TURNS.map((_, i) => (
          <span className="tv__pin" key={i}>
            <span className="tv__pin-label">{String(i + 1).padStart(2, "0")}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

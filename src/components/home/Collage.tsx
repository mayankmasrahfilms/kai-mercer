"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Contours } from "@/components/Contours";
import { TypeIn } from "@/components/anim";

type Item = { src: string; label: string; w: number; x: number; y: number; speed: number; ratio: number };

function MiniSig() {
  return (
    <svg className="collage__mini-sig" viewBox="0 0 120 40" fill="none" aria-hidden="true">
      <path d="M4 30 C 30 10, 60 4, 80 10 C 96 16, 70 30, 40 34 M 52 6 L 40 36 M 60 26 L 70 14 L 72 26 L 82 14 M 20 38 C 60 30, 90 22, 116 14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Scattered photo collage with per-image parallax. On the home page the
 * background shifts from olive to paper as you scroll through it.
 */
export function Collage({ items, variant = "home" }: { items: Item[]; variant?: "home" | "dark" }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".collage__item").forEach((item) => {
        const speed = parseFloat(item.dataset.speed || "1");
        gsap.fromTo(
          item,
          { y: (speed - 1) * 420 },
          { y: (1 - speed) * 420, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
        );
        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          end: "bottom 38%",
          toggleClass: { targets: item, className: "is-colour" },
        });
      });
      if (variant === "home") {
        gsap.fromTo(
          el,
          { backgroundColor: "#282c20", color: "#eeeee4" },
          {
            backgroundColor: "#f4f4ee",
            color: "#111112",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 30%",
              end: "55% 50%",
              scrub: true,
              onUpdate: (self) => (el.dataset.theme = self.progress > 0.55 ? "light" : "olive"),
            },
          }
        );
      }
    },
    { scope: root }
  );

  return (
    <section ref={root} className={`collage collage--${variant}`} data-theme={variant === "home" ? "olive" : "dark"} aria-label="Moments">
      <Contours />
      <div className="collage__stage">
        {items.map((it, i) => (
          <figure
            key={i}
            className="collage__item"
            data-speed={it.speed}
            style={{ left: `${it.x}%`, top: `${it.y}%`, width: `${it.w}vw` }}
          >
            <figcaption className="label">{it.label}</figcaption>
            <div className="collage__img" style={{ aspectRatio: `1 / ${it.ratio}` }}>
              <Image src={it.src} alt={`Kai Mercer — ${it.label}`} fill sizes={`${Math.ceil(it.w * 1.2)}vw`} />
            </div>
          </figure>
        ))}
        <div className="collage__quote collage__quote--a">
          <TypeIn as="p" className="collage__text serif">
            It&rsquo;s not <b>where</b> you start, it&rsquo;s <b>how</b> hard you push from there.
          </TypeIn>
          <MiniSig />
        </div>
        <div className="collage__quote collage__quote--b">
          <TypeIn as="p" className="collage__text serif">
            I was seven when I first sat in a kart. Every lap since has been about making that dream real.
          </TypeIn>
          <MiniSig />
        </div>
      </div>
    </section>
  );
}

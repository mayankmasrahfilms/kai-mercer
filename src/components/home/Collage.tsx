"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Contours } from "@/components/Contours";
import type { CollageItem, CollageQuote } from "@/data/content";

function MiniSig() {
  return (
    <svg className="collage__mini-sig" viewBox="0 0 120 40" fill="none" aria-hidden="true">
      <path
        d="M4 30 C 30 10, 60 4, 80 10 C 96 16, 70 30, 40 34 M 52 6 L 40 36 M 60 26 L 70 14 L 72 26 L 82 14 M 20 38 C 60 30, 90 22, 116 14"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 28 18" aria-hidden="true">
      <path d="M2 17 V1" stroke="currentColor" strokeWidth="1.4" />
      {Array.from({ length: 12 }, (_, i) => {
        const c = i % 4;
        const r = Math.floor(i / 4);
        return (c + r) % 2 === 0 ? <rect key={i} x={3 + c * 6} y={1 + r * 4} width="6" height="4" fill="currentColor" /> : null;
      })}
      <rect x="3" y="1" width="24" height="12" fill="none" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function Quote({ q }: { q: CollageQuote }) {
  const words = q.text.split(" ");
  return (
    <div className="collage__quote" style={{ "--x": q.x, "--w": q.w, top: `${q.y}%` } as CSSProperties}>
      <p className="collage__text serif">
        {words.map((w, i) => {
          const bare = w.replace(/[^a-z]/gi, "").toLowerCase();
          const isBold = q.bold.includes(bare);
          return (
            <span key={i}>
              {isBold ? <b>{w}</b> : w}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </p>
      <MiniSig />
    </div>
  );
}

/**
 * Pinned horizontal photo strip ("slider"): while you scroll down, the strip glides sideways,
 * each photo wipes in as it enters, captions type on, the quotes fill in word by word and
 * (on the home page) the background fades from olive to paper.
 */
export function Collage({
  data,
  variant = "home",
}: {
  data: { width: number; items: CollageItem[]; quotes: CollageQuote[] };
  variant?: "home" | "dark";
}) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const strip = track.current!;
      if (prefersReducedMotion()) {
        el.classList.add("is-static");
        return;
      }
      const distance = () => Math.max(0, strip.scrollWidth - window.innerWidth);

      const slide = gsap.to(strip, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance() * 1.15}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (variant === "home") {
        gsap.fromTo(
          el,
          { backgroundColor: "#282c20", color: "#eeeee4" },
          {
            backgroundColor: "#ecece6",
            color: "#111112",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: () => `+=${distance() * 0.75}`,
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => (el.dataset.theme = self.progress > 0.55 ? "light" : "olive"),
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".collage__item", el).forEach((item) => {
        const img = item.querySelector(".collage__img");
        const cap = item.querySelector(".collage__cap");
        const bar = item.querySelector(".collage__bar");
        const speed = parseFloat(item.dataset.speed || "1");
        const enter = { containerAnimation: slide, trigger: item, start: "left 96%", toggleActions: "play none none reverse" };
        gsap
          .timeline({ scrollTrigger: enter })
          .fromTo(img, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "kmOut" }, 0)
          .fromTo(img?.querySelector("img") ?? [], { scale: 1.25 }, { scale: 1, duration: 1.4, ease: "kmOut" }, 0)
          .fromTo(bar, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.35, ease: "power2.in" }, 0.05)
          .set(cap, { autoAlpha: 1 }, 0.4)
          .to(bar, { scaleX: 0, transformOrigin: "100% 50%", duration: 0.4, ease: "power2.out" }, 0.4);
        if (speed !== 1) {
          gsap.fromTo(
            item,
            { y: (speed - 1) * 260 },
            {
              y: (1 - speed) * 260,
              ease: "none",
              scrollTrigger: { containerAnimation: slide, trigger: item, start: "left right", end: "right left", scrub: true },
            }
          );
        }
      });

      gsap.utils.toArray<HTMLElement>(".collage__quote", el).forEach((q) => {
        const split = SplitText.create(q.querySelector(".collage__text"), { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { containerAnimation: slide, trigger: q, start: "left 88%", end: "left 38%", scrub: true },
          }
        );
        gsap.fromTo(
          q.querySelector(".collage__mini-sig"),
          { autoAlpha: 0, x: -20 },
          { autoAlpha: 1, x: 0, duration: 0.8, ease: "kmOut", scrollTrigger: { containerAnimation: slide, trigger: q, start: "left 50%", toggleActions: "play none none reverse" } }
        );
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [data, variant] }
  );

  return (
    <section ref={root} className={`collage collage--${variant}`} data-theme={variant === "home" ? "olive" : "dark"} aria-label="Moments on and off the track">
      <Contours />
      <div ref={track} className="collage__track" style={{ "--tw": data.width } as CSSProperties}>
        {data.items.map((it, i) => (
          <figure
            key={i}
            className={`collage__item ${it.mono ? "is-mono" : ""}`}
            data-speed={it.speed ?? 1}
            style={{ "--x": it.x, "--w": it.w, top: `${it.y}%` } as CSSProperties}
          >
            <figcaption className="collage__label label">
              <span className="collage__cap">{it.label}</span>
              <span className="collage__bar" aria-hidden="true" />
            </figcaption>
            <div className="collage__img" style={{ aspectRatio: `1 / ${it.ratio}` }}>
              <Image src={it.src} alt={`Kai Mercer, ${it.label}`} fill sizes={`(max-width: 760px) ${Math.ceil(it.w * 2.6)}vw, ${Math.ceil(it.w * 1.15)}vw`} quality={85} />
            </div>
            {it.chip && (
              <span className="collage__chip" aria-label={`Finished P${it.chip}`}>
                <span>{it.chip}</span>
                <FlagIcon />
              </span>
            )}
          </figure>
        ))}
        {data.quotes.map((q, i) => (
          <Quote key={i} q={q} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useRef, type ElementType, type ReactNode, type CSSProperties } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Colour of the sweeping block. Defaults to the section's --block var. */
  block?: string;
  start?: string;
  delay?: number;
  id?: string;
  style?: CSSProperties;
};

/**
 * Line-by-line "block wipe" reveal: a solid block sweeps across each line, the
 * text appears underneath, and the block slides off.
 */
export function Reveal({ as = "div", children, className = "", block, start = "top 85%", delay = 0, id, style }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !contextSafe) return;
      let alive = true;
      const init = contextSafe(() => {
      if (!alive) return;
      const split = SplitText.create(el, { type: "lines", linesClass: "rl-line" });
      const blocks: HTMLElement[] = [];
      const inners: HTMLElement[] = [];
      split.lines.forEach((line) => {
        const l = line as HTMLElement;
        const inner = document.createElement("span");
        inner.className = "rl-inner";
        while (l.firstChild) inner.appendChild(l.firstChild);
        l.appendChild(inner);
        const b = document.createElement("span");
        b.className = "rl-block";
        if (block) b.style.background = block;
        l.appendChild(b);
        blocks.push(b);
        inners.push(inner);
      });
      gsap.set(inners, { autoAlpha: 0 });
      gsap.set(blocks, { scaleX: 0, transformOrigin: "0% 50%" });
      const tl = gsap.timeline({
        paused: true,
        delay,
        onComplete: () => {
          split.revert();
        },
      });
      blocks.forEach((b, i) => {
        const at = i * 0.11 + (i % 2) * 0.04;
        const width = 0.75 + ((i * 37) % 25) / 100;
        tl.to(b, { scaleX: width, duration: 0.38, ease: "power2.in" }, at)
          .to(b, { scaleX: 1, duration: 0.14, ease: "none" }, ">")
          .set(inners[i], { autoAlpha: 1 }, ">")
          .set(b, { transformOrigin: "100% 50%" }, "<")
          .to(b, { scaleX: 0, duration: 0.46, ease: "power3.out" }, ">");
      });
      ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => tl.play() });
      });
      document.fonts.ready.then(() => init());
      return () => {
        alive = false;
      };
    },
    { scope: ref }
  );

  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${className}`} id={id} style={style}>
      {children}
    </Tag>
  );
}

/** Characters fade in one after another, like being typed. */
export function TypeIn({ as = "p", children, className = "", start = "top 80%", id }: Omit<RevealProps, "block" | "delay">) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !contextSafe) return;
      let alive = true;
      const init = contextSafe(() => {
      if (!alive) return;
      const split = SplitText.create(el, { type: "words,chars", charsClass: "ti-char" });
      gsap.set(split.chars, { opacity: 0.08 });
      const tl = gsap.to(split.chars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.022,
        ease: "none",
        paused: true,
      });
      ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => tl.play() });
      });
      document.fonts.ready.then(() => init());
      return () => {
        alive = false;
      };
    },
    { scope: ref }
  );
  const Tag = as;
  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

/** Draws every `.sig-path` (or given selector) inside, in sequence. */
export function DrawOn({
  children,
  className = "",
  selector = ".sig-path",
  start = "top 75%",
  duration = 1.6,
  scrub = false,
  end = "bottom 30%",
}: {
  children: ReactNode;
  className?: string;
  selector?: string;
  start?: string;
  duration?: number;
  scrub?: boolean | number;
  end?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const paths = el.querySelectorAll(selector);
      if (prefersReducedMotion()) return;
      gsap.set(paths, { drawSVG: "0%" });
      const each = duration / Math.max(paths.length, 1);
      gsap.to(paths, {
        drawSVG: "100%",
        duration: each,
        stagger: each * 0.85,
        ease: "power1.inOut",
        scrollTrigger: scrub ? { trigger: el, start, end, scrub } : { trigger: el, start, once: true },
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Brush-script word that "writes" itself on with a soft-edged mask wipe. */
export function ScriptWord({
  children,
  className = "",
  start = "top 80%",
  duration = 1.1,
  scrub = false,
  end = "bottom 40%",
  trigger,
}: {
  children: ReactNode;
  className?: string;
  start?: string;
  duration?: number;
  scrub?: boolean | number;
  end?: string;
  trigger?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.style.setProperty("--p", "110%");
        return;
      }
      gsap.fromTo(
        el,
        { "--p": "-15%" },
        {
          "--p": "115%",
          duration,
          ease: "power2.inOut",
          scrollTrigger: scrub
            ? { trigger: trigger ?? el, start, end, scrub }
            : { trigger: trigger ?? el, start, once: true },
        }
      );
    },
    { scope: ref }
  );
  return (
    <span ref={ref} className={`script ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

/** Infinite CSS marquee. Content is duplicated for a seamless loop. */
export function Marquee({
  children,
  className = "",
  speed = 40,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div className={`marquee ${className}`} style={{ "--speed": `${speed}s` } as CSSProperties} data-reverse={reverse}>
      <div className="marquee__track">
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Applies scroll parallax to every [data-speed] element inside the scope. */
export function useParallax(scope: React.RefObject<HTMLElement | null>, distance = 220) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-speed]");
      items.forEach((item) => {
        const speed = parseFloat(item.dataset.speed || "1");
        const amount = (1 - speed) * distance;
        gsap.fromTo(
          item,
          { y: -amount },
          {
            y: amount,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    },
    { scope }
  );
}

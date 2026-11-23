"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Contours } from "@/components/Contours";
import { Laurel, Monogram, Signature, TrackIcon } from "@/components/icons";
import { TLink } from "@/components/site/TLink";
import { nextRace } from "@/data/races";
import { site } from "@/data/site";

const PERSON_SRC = "/images/hero-person.webp";
const HELMET_SRC = "/images/hero-helmet.webp";
const GHOST_SRC = "/images/hero-ghost.webp";

/**
 * Cursor trail reveal: wherever the pointer passes, the race helmet appears on Kai's head
 * (blobs that grow, linger and shrink away), exactly over the faint glass helmet outline.
 */
function useHelmetReveal(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  wrapRef: React.RefObject<HTMLElement | null>,
  slotRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const slot = slotRef.current;
    if (!canvas || !wrap || !slot) return;
    const ctx = canvas.getContext("2d")!;
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let skin: HTMLCanvasElement | null = null;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const head = { x: 0, y: 0, w: 0, h: 0 };
    const img = new window.Image();
    img.decoding = "async";
    img.src = HELMET_SRC;

    const points: { x: number; y: number; life: number }[] = [];
    const target = { x: -999, y: -999, active: false };
    const cur = { x: -999, y: -999 };
    const auto = window.matchMedia("(hover: none)").matches || prefersReducedMotion();
    let t0 = performance.now();

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const s = slot.getBoundingClientRect();
      w = r.width;
      h = r.height;
      head.x = s.left - r.left;
      head.y = s.top - r.top;
      head.w = s.width;
      head.h = s.height;
      canvas.width = mask.width = Math.round(w * dpr);
      canvas.height = mask.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      if (img.complete && img.naturalWidth) {
        skin = document.createElement("canvas");
        skin.width = canvas.width;
        skin.height = canvas.height;
        const sctx = skin.getContext("2d")!;
        sctx.imageSmoothingQuality = "high";
        sctx.drawImage(img, head.x * dpr, head.y * dpr, head.w * dpr, head.h * dpr);
      }
    };
    img.onload = resize;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (!target.active) {
        cur.x = target.x;
        cur.y = target.y;
      }
      target.active = true;
    };
    const onLeave = () => (target.active = false);

    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || !skin) return;

      if (auto) {
        const t = (now - t0) / 1000;
        target.x = head.x + head.w * (0.5 + 0.34 * Math.sin(t * 0.9));
        target.y = head.y + head.h * (0.42 + 0.3 * Math.sin(t * 1.3 + 1));
        if (!target.active) {
          cur.x = target.x;
          cur.y = target.y;
        }
        target.active = true;
      }

      if (target.active) {
        const nx = cur.x + (target.x - cur.x) * 0.2;
        const ny = cur.y + (target.y - cur.y) * 0.2;
        const dist = Math.hypot(nx - cur.x, ny - cur.y);
        const steps = dist > 0.6 ? Math.ceil(dist / 6) : 0;
        for (let i = 1; i <= steps; i++) {
          points.push({ x: cur.x + ((nx - cur.x) * i) / steps, y: cur.y + ((ny - cur.y) * i) / steps, life: 1 });
        }
        cur.x = nx;
        cur.y = ny;
      }

      for (let i = points.length - 1; i >= 0; i--) {
        points[i].life -= dt * 0.75;
        if (points[i].life <= 0) points.splice(i, 1);
      }

      const R = Math.max(70, head.w * 0.3);
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.clearRect(0, 0, w, h);
      mctx.fillStyle = "#000";
      for (const p of points) {
        const e = 1 - Math.pow(1 - p.life, 3);
        mctx.beginPath();
        mctx.arc(p.x, p.y, R * e, 0, Math.PI * 2);
        mctx.fill();
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!points.length) return;
      ctx.drawImage(mask, 0, 0);
      ctx.globalCompositeOperation = "source-in";
      ctx.drawImage(skin, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
    io.observe(wrap);
    resize();
    window.addEventListener("resize", resize);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    t0 = performance.now();
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [canvasRef, wrapRef, slotRef]);
}

export function HeroMessage() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const slot = useRef<HTMLDivElement>(null);

  useHelmetReveal(canvas, card, slot);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 0px)", () => {
        const narrow = window.innerWidth < 760;
        const inset = narrow ? "22% 8% 30% 8%" : "13% 25.5% 31% 25.5%";
        gsap.set(".sig-path", { drawSVG: "0%" });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });
        tl.fromTo(card.current, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: `inset(${inset})`, duration: 0.42 }, 0)
          .fromTo(".hm__dim", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.12)
          .fromTo(".hm__person", { filter: "grayscale(0)" }, { filter: "grayscale(1)", duration: 0.3 }, 0.12)
          .to(".hm__ui", { autoAlpha: 0, duration: 0.12 }, 0)
          .to(canvas.current, { autoAlpha: 0, duration: 0.1 }, 0.02)
          .fromTo(".hm__row--a", { xPercent: 2 }, { xPercent: -22, duration: 1 }, 0)
          .fromTo(".hm__row--b", { xPercent: -26 }, { xPercent: -2, duration: 1 }, 0)
          .fromTo(".hm__rows", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, 0.18)
          .fromTo(".hm__label", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.34)
          .to(".hm__sig .sig-path", { drawSVG: "100%", duration: 0.09, stagger: 0.07 }, 0.44)
          .to({}, { duration: 0.1 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const rowA = Array.from({ length: 4 }, () => "We did it at Silverstone").join(" · ");
  const rowB = Array.from({ length: 4 }, () => "A weekend I will never forget").join(" · ");

  return (
    <section ref={root} className="hm" data-theme="olive" aria-label="Kai Mercer">
      <div className="hm__sticky">
        <Contours />
        <p className="hm__label label">Message from {site.first}</p>
        <div className="hm__rows" aria-hidden="true">
          <div className="hm__row hm__row--a serif">{rowA}</div>
          <div className="hm__row hm__row--b">{rowB}</div>
        </div>

        <div ref={card} className="hm__card" data-theme="light">
          <Contours className="hm__contours" />
          <div className="hm__person">
            <Image
              className="hm__photo"
              src={PERSON_SRC}
              alt="Portrait of Kai Mercer, Formula 1 driver"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 760px) 150vw, 95vh"
              quality={90}
            />
            <div ref={slot} className="hm__slot" aria-hidden="true">
              <Image className="hm__ghost" src={GHOST_SRC} alt="" fill sizes="(max-width: 760px) 110vw, 70vh" quality={85} />
            </div>
          </div>
          <canvas ref={canvas} className="hm__canvas" aria-hidden="true" />
          <span className="hm__dim" aria-hidden="true" />
          <div className="hm__ui">
            <Monogram className="hm__mono" />
            <h1 className="sr-only">Kai Mercer — British Formula 1 driver #{site.number}</h1>
            <TLink href="/calendar" className="next-card" aria-label={`Next race: ${nextRace.gp}`}>
              <span className="next-card__tab label">Next race</span>
              <span className="next-card__body">
                <TrackIcon className="next-card__track" strokeWidth={16} />
                <span className="label">{nextRace.gp}</span>
                <span className="next-card__rule" />
                <Laurel className="next-card__laurel" />
                <span className="label">{site.teamSince}</span>
              </span>
            </TLink>
          </div>
        </div>

        <div className="hm__sig" aria-hidden="true">
          <Signature />
        </div>
      </div>
    </section>
  );
}

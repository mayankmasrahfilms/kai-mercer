"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Contours } from "@/components/Contours";
import { Laurel, Monogram, Signature, TrackIcon } from "@/components/icons";
import { TLink } from "@/components/site/TLink";
import { nextRace } from "@/data/races";
import { site } from "@/data/site";

const HERO_SRC = "/images/hero-portrait.jpg";
const OBJ_POS_Y = 0.4;

/** Cover-fit geometry identical to CSS object-fit: cover + object-position. */
function coverRect(iw: number, ih: number, cw: number, ch: number, py = OBJ_POS_Y) {
  const s = Math.max(cw / iw, ch / ih);
  const w = iw * s;
  const h = ih * s;
  return { x: (cw - w) / 2, y: (ch - h) * py, w, h };
}

/** Builds the lime "helmet livery" duotone of the portrait with blob pattern on top. */
function buildSkin(img: HTMLImageElement, w: number, h: number, dpr: number) {
  const c = document.createElement("canvas");
  c.width = Math.round(w * dpr);
  c.height = Math.round(h * dpr);
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  const r = coverRect(img.naturalWidth, img.naturalHeight, w, h);
  ctx.drawImage(img, r.x * dpr, r.y * dpr, r.w * dpr, r.h * dpr);
  const data = ctx.getImageData(0, 0, c.width, c.height);
  const d = data.data;
  const dark = [18, 24, 6];
  const lime = [210, 255, 0];
  for (let i = 0; i < d.length; i += 4) {
    let l = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    l = Math.min(255, Math.max(0, (l - 120) * 1.9 + 135)) / 255;
    d[i] = dark[0] + (lime[0] - dark[0]) * l;
    d[i + 1] = dark[1] + (lime[1] - dark[1]) * l;
    d[i + 2] = dark[2] + (lime[2] - dark[2]) * l;
  }
  ctx.putImageData(data, 0, 0);
  // Blob/worm livery pattern
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  ctx.globalCompositeOperation = "multiply";
  ctx.strokeStyle = "rgba(20, 28, 6, 0.62)";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const count = Math.round((w * h) / 9000);
  for (let k = 0; k < count; k++) {
    let x = rand() * c.width;
    let y = rand() * c.height;
    let a = rand() * Math.PI * 2;
    ctx.lineWidth = (7 + rand() * 9) * dpr;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const steps = 5 + Math.floor(rand() * 6);
    for (let s = 0; s < steps; s++) {
      a += (rand() - 0.5) * 2.2;
      const len = (14 + rand() * 22) * dpr;
      const cx = x + Math.cos(a) * len;
      const cy = y + Math.sin(a) * len;
      a += (rand() - 0.5) * 1.6;
      x = cx + Math.cos(a) * len;
      y = cy + Math.sin(a) * len;
      ctx.quadraticCurveTo(cx, cy, x, y);
    }
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "source-over";
  return c;
}

function useHelmetReveal(canvasRef: React.RefObject<HTMLCanvasElement | null>, wrapRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d")!;
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let skin: HTMLCanvasElement | null = null;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const img = new window.Image();
    img.decoding = "async";
    img.src = HERO_SRC;

    const points: { x: number; y: number; life: number }[] = [];
    const target = { x: -999, y: -999, active: false };
    const cur = { x: -999, y: -999 };
    const auto = window.matchMedia("(hover: none)").matches || prefersReducedMotion();
    let t0 = performance.now();

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = mask.width = Math.round(w * dpr);
      canvas.height = mask.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      if (img.complete && img.naturalWidth) skin = buildSkin(img, w, h, dpr);
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
        target.x = w * (0.5 + 0.13 * Math.sin(t * 0.9));
        target.y = h * (0.42 + 0.14 * Math.sin(t * 1.3 + 1));
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

      const R = Math.min(w, h) * 0.2;
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
  }, [canvasRef, wrapRef]);
}

export function HeroMessage() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useHelmetReveal(canvas, card);

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
          .fromTo(".hm__photo", { filter: "grayscale(0) brightness(1.12) contrast(0.98)" }, { filter: "grayscale(1) brightness(0.95) contrast(1)", duration: 0.42 }, 0)
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
          <Image
            className="hm__photo"
            src={HERO_SRC}
            alt="Portrait of Kai Mercer, Formula 1 driver"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
            style={{ objectPosition: `50% ${OBJ_POS_Y * 100}%` }}
          />
          <canvas ref={canvas} className="hm__canvas" aria-hidden="true" />
          <Contours className="hm__contours" />
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

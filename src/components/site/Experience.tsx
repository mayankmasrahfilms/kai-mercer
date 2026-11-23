"use client";

import Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { Monogram } from "@/components/icons";
import { site } from "@/data/site";

type Ctx = {
  navigate: (href: string) => void;
  scrollTo: (target: string | number | HTMLElement, immediate?: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  lockScroll: (v: boolean) => void;
  ready: boolean;
};

const ExperienceContext = createContext<Ctx | null>(null);

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used inside <Experience>");
  return ctx;
}

const splitHref = (href: string) => {
  const [path, hash] = href.split("#");
  return { path: path || "/", hash: hash ? `#${hash}` : "" };
};

export function Experience({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const waiting = useRef<{ path: string; resolve: () => void } | null>(null);
  const [menuOpen, setMenuOpenState] = useState(false);
  const [ready, setReady] = useState(false);

  // ---------- smooth scroll ----------
  useEffect(() => {
    history.scrollRestoration = "manual";
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4, anchors: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement, immediate = false) => {
    const lenis = lenisRef.current;
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (typeof target === "string" && !el) return;
    if (lenis) {
      lenis.scrollTo(el ?? (target as number), { immediate, duration: 1.4, force: true });
    } else {
      const top = typeof el === "number" ? el : el ? el.getBoundingClientRect().top + window.scrollY : 0;
      window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
    }
  }, []);

  const setMenuOpen = useCallback((v: boolean) => {
    setMenuOpenState(v);
    if (v) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, []);

  const lockScroll = useCallback((v: boolean) => {
    if (v) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, []);

  // ---------- transition timelines ----------
  const drawMonogram = useCallback(() => {
    const strokes = overlayRef.current?.querySelectorAll(".mono-stroke");
    if (!strokes) return gsap.timeline();
    return gsap
      .timeline()
      .set(".tr__mono", { autoAlpha: 1 })
      .fromTo(strokes, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.45, stagger: 0.16, ease: "power2.inOut" });
  }, []);

  const reveal = useCallback(() => {
    const ov = overlayRef.current;
    if (!ov) return Promise.resolve();
    const strokes = ov.querySelectorAll(".mono-stroke");
    return new Promise<void>((resolve) => {
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(ov, { autoAlpha: 0 });
            ov.dataset.active = "false";
            resolve();
          },
        })
        .to(strokes, { drawSVG: "100% 100%", duration: 0.35, stagger: 0.06, ease: "power2.in" })
        .set(".tr__mono", { autoAlpha: 0 })
        .fromTo(
          ".tr__hole",
          { scale: 0.02, rotate: -6, opacity: 1, transformOrigin: "50% 50%", smoothOrigin: false },
          { scale: 26, rotate: 0, opacity: 1, duration: 1.15, ease: "power3.in", transformOrigin: "50% 50%", smoothOrigin: false },
          ">-0.05"
        );
    });
  }, []);

  const cover = useCallback(() => {
    const ov = overlayRef.current;
    if (!ov) return Promise.resolve();
    ov.dataset.active = "true";
    return new Promise<void>((resolve) => {
      gsap
        .timeline({ onComplete: resolve })
        .set(ov, { autoAlpha: 1 })
        .set(".tr__fill-wrap", { autoAlpha: 0 })
        .set(".tr__hole", { opacity: 0, scale: 0.02, rotate: -6, transformOrigin: "50% 50%", smoothOrigin: false })
        .fromTo(
          ".tr__glyph",
          { xPercent: 70, yPercent: 60, scale: 0.5, rotate: -12, autoAlpha: 1 },
          { xPercent: -8, yPercent: -18, scale: 14, rotate: 0, duration: 0.95, ease: "power3.in" }
        )
        .set(".tr__fill-wrap", { autoAlpha: 1 }, 0.72)
        .set(".tr__glyph", { autoAlpha: 0 });
    });
  }, []);

  // Initial page load: lime screen + monogram, then the "7" window opens onto the page.
  useEffect(() => {
    const ov = overlayRef.current;
    if (!ov) return;
    let cancelled = false;
    const run = async () => {
      if (prefersReducedMotion()) {
        gsap.set(ov, { autoAlpha: 0 });
        setReady(true);
        return;
      }
      lenisRef.current?.stop();
      const minTime = new Promise((r) => setTimeout(r, 1100));
      const fonts = document.fonts?.ready ?? Promise.resolve();
      const loaded =
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise((r) => window.addEventListener("load", r, { once: true }));
      drawMonogram();
      await Promise.all([minTime, fonts, Promise.race([loaded, new Promise((r) => setTimeout(r, 2600))])]);
      if (cancelled) return;
      if (location.hash) scrollTo(location.hash, true);
      ScrollTrigger.refresh();
      setReady(true);
      window.dispatchEvent(new Event("km:reveal"));
      await reveal();
      lenisRef.current?.start();
    };
    run();
    return () => {
      cancelled = true;
    };
    // run once on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resolve pending navigation once the new route has rendered.
  useEffect(() => {
    const w = waiting.current;
    if (w && w.path === pathname) {
      waiting.current = null;
      requestAnimationFrame(() => requestAnimationFrame(w.resolve));
    }
  }, [pathname]);

  const navigate = useCallback(
    async (href: string) => {
      if (busy.current) return;
      const { path, hash } = splitHref(href);
      if (path === pathname) {
        setMenuOpen(false);
        if (hash) scrollTo(hash);
        else scrollTo(0);
        return;
      }
      busy.current = true;
      lenisRef.current?.stop();
      if (prefersReducedMotion()) {
        router.push(href, { scroll: true });
        setMenuOpen(false);
        busy.current = false;
        return;
      }
      await cover();
      setMenuOpen(false);
      lenisRef.current?.stop();
      const arrived = new Promise<void>((resolve) => {
        waiting.current = { path, resolve };
      });
      drawMonogram();
      router.push(href, { scroll: false });
      await Promise.all([arrived, new Promise((r) => setTimeout(r, 900)), document.fonts?.ready]);
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      if (hash) scrollTo(hash, true);
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event("km:reveal"));
      await reveal();
      lenisRef.current?.start();
      busy.current = false;
    },
    [pathname, router, cover, reveal, drawMonogram, scrollTo, setMenuOpen]
  );

  const value = useMemo(
    () => ({ navigate, scrollTo, menuOpen, setMenuOpen, lockScroll, ready }),
    [navigate, scrollTo, menuOpen, setMenuOpen, lockScroll, ready]
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
      <div className="tr" ref={overlayRef} data-active="true" aria-hidden="true">
        <div className="tr__glyph">{site.number}</div>
        <svg className="tr__fill-wrap" width="100%" height="100%">
          <defs>
            <mask id="tr-hole-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <g className="tr__hole-anchor" transform="translate(0 0)">
                <text className="tr__hole" x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="black" opacity="0">
                  {site.number}
                </text>
              </g>
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="var(--lime)" mask="url(#tr-hole-mask)" />
        </svg>
        <Monogram className="tr__mono" strokeWidth={6} />
      </div>
    </ExperienceContext.Provider>
  );
}

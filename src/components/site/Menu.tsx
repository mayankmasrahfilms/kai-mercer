"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { Laurel, Squiggle } from "@/components/icons";
import { Contours } from "@/components/Contours";
import { menuImages } from "@/data/content";
import { site } from "@/data/site";
import { TLink } from "./TLink";
import { useExperience } from "./Experience";

export function Menu() {
  const { menuOpen, setMenuOpen } = useExperience();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(ref.current, { visibility: "visible" })
        .fromTo(ref.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "km" })
        .fromTo(".menu__img", { scale: 1.25, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, stagger: 0.04, ease: "kmOut" }, 0.25)
        .fromTo(".menu-anim", { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06, ease: "kmOut" }, 0.35);
    },
    { scope: ref }
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (menuOpen) {
      t.timeScale(1).play();
      const first = ref.current?.querySelector<HTMLElement>(".menu__link");
      first?.focus({ preventScroll: true });
    } else if (t.progress() > 0) {
      t.timeScale(1.6).reverse();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  const col = (offset: number) => {
    const list = menuImages.filter((_, i) => i % 2 === offset);
    return [...list, ...list];
  };

  return (
    <div ref={ref} id="site-menu" className="menu" role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!menuOpen} data-theme="olive">
      <Contours className="menu__bg" />
      <div className="menu__images" aria-hidden="true">
        {[0, 1].map((c) => (
          <div className="menu__col" key={c}>
            {col(c).map((src, i) => (
              <div className="menu__img" key={`${src}-${i}`}>
                <Image src={src} alt="" fill sizes="22vw" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <nav className="menu__nav" aria-label="Main">
        <ul className="menu__links">
          {site.nav.map((item) => {
            const current = item.href === pathname;
            return (
              <li key={item.href} style={{ overflow: "hidden" }}>
                <TLink
                  href={item.href}
                  className="menu__link menu-anim"
                  aria-current={current ? "page" : undefined}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {item.label}
                  <Squiggle className="squiggle" />
                </TLink>
              </li>
            );
          })}
        </ul>
        <div className="menu__badge menu-anim">
          <Laurel />
          <span className="label">{site.teamSince}</span>
        </div>
        <div className="menu__footer">
          <a href={`mailto:${site.email}`} className="btn btn--green menu-anim" tabIndex={menuOpen ? 0 : -1}>
            Business enquiries
          </a>
          <div className="menu__socials menu-anim">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={menuOpen ? 0 : -1}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

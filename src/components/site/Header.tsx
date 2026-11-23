"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BagIcon, Logo } from "@/components/icons";
import { TLink } from "./TLink";
import { useExperience } from "./Experience";

/** Fixed header. Its colour flips to match whichever section sits under the logo. */
export function Header() {
  const { menuOpen, setMenuOpen } = useExperience();
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    let raf = 0;
    const sample = () => {
      raf = 0;
      const header = ref.current;
      if (!header) return;
      const r = header.querySelector(".header__logo")?.getBoundingClientRect();
      const x = r ? r.left + r.width / 2 : 40;
      const y = r ? r.top + r.height / 2 : 40;
      const stack = document.elementsFromPoint(x, y);
      for (const el of stack) {
        if (header.contains(el) || el.closest(".tr")) continue;
        const holder = el.closest<HTMLElement>("[data-theme]");
        if (holder) {
          setTheme(holder.dataset.theme === "light" ? "light" : "dark");
          return;
        }
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sample);
    };
    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("km:reveal", onScroll);
    const id = window.setInterval(onScroll, 600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("km:reveal", onScroll);
      window.clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <header ref={ref} className="header" data-tone={menuOpen ? "dark" : theme}>
      <TLink href="/" className="header__logo" aria-label="Kai Mercer — home">
        <Logo />
      </TLink>
      <div className="header__actions">
        <TLink href="/store" className="btn btn--green header__store">
          <BagIcon />
          Store
        </TLink>
        <button
          type="button"
          className="menu-btn"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

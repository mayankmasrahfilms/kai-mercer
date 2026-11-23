"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { BagIcon, ChatIcon, ChevronIcon, CloseIcon, Monogram, SearchIcon, SocialGlyph, UserIcon } from "@/components/icons";
import { TLink } from "@/components/site/TLink";
import { collections, formatPrice, type Product } from "@/data/store";
import { site } from "@/data/site";
import { useCart } from "./Cart";

const storeLinks = collections.filter((c) => c.group === "store");
const collLinks = collections.filter((c) => c.group === "collections");

export function StoreHeader() {
  const { count, setOpen } = useCart();
  const [mega, setMega] = useState<null | "store" | "collections">(null);
  const close = () => setMega(null);

  return (
    <header className="sh" onMouseLeave={close}>
      <p className="sh__bar">Free UK shipping on orders over £150</p>
      <nav className="sh__nav" aria-label="Store">
        <ul className="sh__left">
          <li>
            <button type="button" aria-expanded={mega === "store"} onMouseEnter={() => setMega("store")} onClick={() => setMega(mega === "store" ? null : "store")}>
              Store
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-expanded={mega === "collections"}
              onMouseEnter={() => setMega("collections")}
              onClick={() => setMega(mega === "collections" ? null : "collections")}
            >
              Collections
            </button>
          </li>
          <li>
            <TLink href="/store/collections/helmets" onMouseEnter={close}>
              Helmets
            </TLink>
          </li>
          <li>
            <TLink href="/" onMouseEnter={close}>
              Archive
            </TLink>
          </li>
        </ul>
        <TLink href="/store" className="sh__logo" aria-label="KM Store home">
          <Monogram />
        </TLink>
        <ul className="sh__right">
          <li className="sh__currency">
            GBP <ChevronIcon />
          </li>
          <li>
            <TLink href="/store/faq">Support</TLink>
          </li>
          <li>
            <span>Account</span>
          </li>
          <li>
            <button type="button" aria-label="Search">
              <SearchIcon />
            </button>
          </li>
          <li>
            <button type="button" aria-label="Account">
              <UserIcon />
            </button>
          </li>
          <li>
            <button type="button" className="sh__bag" aria-label={`Open bag, ${count} items`} onClick={() => setOpen(true)}>
              <BagIcon />
              {count > 0 && <span className="sh__count">{count}</span>}
            </button>
          </li>
        </ul>
      </nav>
      <div className={`sh__mega ${mega ? "is-open" : ""}`} aria-hidden={!mega}>
        <div className="sh__mega-inner">
          <p className="sh__mega-title">{mega === "collections" ? "Collections" : "Store"}</p>
          <ul>
            {(mega === "collections" ? collLinks : storeLinks).map((c) => (
              <li key={c.slug}>
                <TLink href={`/store/collections/${c.slug}`} onClick={close} tabIndex={mega ? 0 : -1}>
                  {c.title}
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export function StoreFooter() {
  const [done, setDone] = useState(false);
  return (
    <footer className="sf">
      <div className="sf__grid">
        <div>
          <p className="sf__title">{site.name}</p>
          <ul>
            <li>
              <TLink href="/">About</TLink>
            </li>
            <li>
              <TLink href="/#partners">Partners</TLink>
            </li>
            <li>
              <TLink href="/store/collections/all">Clothing</TLink>
            </li>
          </ul>
        </div>
        <div>
          <p className="sf__title">Support</p>
          <ul>
            <li>
              <TLink href="/store/faq">FAQs</TLink>
            </li>
            <li>
              <TLink href="/store/faq">Manage pre-orders</TLink>
            </li>
            <li>
              <TLink href="/store/faq">Delivery info</TLink>
            </li>
            <li>
              <TLink href="/store/faq">Returns &amp; refunds</TLink>
            </li>
            <li>
              <TLink href="/privacy-policy">Privacy policy</TLink>
            </li>
            <li>
              <TLink href="/terms">Terms</TLink>
            </li>
          </ul>
        </div>
        <div>
          <p className="sf__title">Social</p>
          <div className="sf__icons">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <SocialGlyph name={s.label} />
              </a>
            ))}
          </div>
          <p className="sf__title">KM7 Social</p>
          <div className="sf__icons">
            {["Instagram", "TikTok", "X"].map((n) => (
              <a key={n} href={site.socials[1].href} target="_blank" rel="noopener noreferrer" aria-label={`KM7 on ${n}`}>
                <SocialGlyph name={n} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="sf__title">Join KM7</p>
          <p className="sf__small">Unlock exclusive access to new collections, offers and events.</p>
          {done ? (
            <p className="sf__small lime">You&rsquo;re on the list. Welcome to KM7.</p>
          ) : (
            <form
              className="sf__form"
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <label className="sr-only" htmlFor="sf-email">
                Email address
              </label>
              <input id="sf-email" type="email" required placeholder="Email address" autoComplete="email" />
              <button type="submit">Sign up</button>
            </form>
          )}
        </div>
      </div>
      <p className="sf__legal">
        © 2026 {site.name}. All rights reserved. <a href={`mailto:${site.email}`}>Business enquiries</a>
      </p>
    </footer>
  );
}

/** Two-step "Black Friday early access" popup + sticky EARLY ACCESS tab + chat bubble. */
export function EarlyAccess() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  useEffect(() => {
    if (sessionStorage.getItem("km-ea")) return;
    const id = setTimeout(() => setOpen(true), 4500);
    return () => clearTimeout(id);
  }, []);
  const dismiss = () => {
    sessionStorage.setItem("km-ea", "1");
    setOpen(false);
  };
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sessionStorage.setItem("km-ea", "1");
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <button type="button" className="ea-tab" onClick={() => (setStep(1), setOpen(true))}>
        Early
        <br />
        access
      </button>
      <a className="chat-bubble" href={`mailto:${site.supportEmail}`} aria-label="Contact support">
        <ChatIcon />
      </a>
      <div className={`ea ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Early access" aria-hidden={!open}>
        <div className="ea__card">
          <button type="button" className="ea__close" onClick={dismiss} aria-label="Close" tabIndex={open ? 0 : -1}>
            <CloseIcon />
          </button>
          {step === 1 && (
            <>
              <p className="ea__kicker">Would you like Black Friday</p>
              <p className="ea__title">Early access?</p>
              <button type="button" className="store-btn" onClick={() => setStep(2)} tabIndex={open ? 0 : -1}>
                Yes
              </button>
              <button type="button" className="ea__no" onClick={dismiss} tabIndex={open ? 0 : -1}>
                No, I&rsquo;m good
              </button>
            </>
          )}
          {step === 2 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(3);
                sessionStorage.setItem("km-ea", "1");
              }}
            >
              <p className="ea__title">Join KM7</p>
              <p className="ea__kicker">Unlock Black Friday early access and be the first to hear about new drops, events and more.</p>
              <label className="sr-only" htmlFor="ea-email">
                Email
              </label>
              <input id="ea-email" type="email" required placeholder="Email" className="ea__input" autoComplete="email" />
              <button type="submit" className="store-btn">
                Get early access
              </button>
              <p className="ea__fine">
                Unsubscribe anytime. <TLink href="/privacy-policy">Privacy policy</TLink>
              </p>
            </form>
          )}
          {step === 3 && (
            <>
              <p className="ea__title">You&rsquo;re in</p>
              <p className="ea__kicker">Look out for your early access link before Black Friday.</p>
              <button type="button" className="store-btn" onClick={dismiss}>
                Keep shopping
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <TLink href={`/store/products/${p.slug}`} className={`pcard ${p.soldOut ? "is-sold" : ""}`}>
      <div className="pcard__media">
        {p.badge && <span className="pcard__badge">{p.badge}</span>}
        <Image src={p.image} alt={p.name} fill sizes="(max-width: 760px) 50vw, 20vw" className="pcard__img" />
        {p.image2 && <Image src={p.image2} alt="" fill sizes="(max-width: 760px) 50vw, 20vw" className="pcard__img2" />}
      </div>
      <p className="pcard__name">{p.name}</p>
      <p className="pcard__price">{p.soldOut ? "Sold out" : formatPrice(p.price)}</p>
      {p.sizes && <p className="pcard__sizes">{p.sizes.join(" / ")}</p>}
    </TLink>
  );
}

/**
 * Product slider: arrow buttons glide a page of cards with an eased tween, mouse users can
 * drag with momentum, touch uses native swipe + snap, and the arrows fade in/out at the ends.
 */
export function Carousel({ title, items, viewAll }: { title: string; items: Product[]; viewAll?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });
  const tween = useRef<gsap.core.Tween | null>(null);

  const glideTo = (left: number, duration = 0.9, ease = "power3.inOut") => {
    const el = track.current;
    if (!el) return;
    tween.current?.kill();
    const max = el.scrollWidth - el.clientWidth;
    const proxy = { x: el.scrollLeft };
    el.style.scrollSnapType = "none";
    tween.current = gsap.to(proxy, {
      x: Math.max(0, Math.min(max, left)),
      duration,
      ease,
      onUpdate: () => {
        el.scrollLeft = proxy.x;
      },
      onComplete: () => {
        el.style.scrollSnapType = "";
      },
    });
  };

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    const perPage = Math.max(1, Math.floor((el.clientWidth - 40) / step));
    const target = Math.round(el.scrollLeft / step) * step + dir * perPage * step;
    glideTo(target);
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // mouse drag with momentum (touch keeps native swiping)
    let down = false;
    let moved = 0;
    let startX = 0;
    let startLeft = 0;
    let lastX = 0;
    let lastT = 0;
    let vel = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = 0;
      startX = lastX = e.clientX;
      startLeft = el.scrollLeft;
      lastT = performance.now();
      vel = 0;
      tween.current?.kill();
      el.style.scrollSnapType = "none";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (moved > 4) el.classList.add("is-dragging");
      el.scrollLeft = startLeft - dx;
      const now = performance.now();
      vel = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.classList.remove("is-dragging");
      if (moved > 4) {
        const card = el.firstElementChild as HTMLElement | null;
        const gap = parseFloat(getComputedStyle(el).columnGap) || 20;
        const step = card ? card.offsetWidth + gap : 1;
        const projected = el.scrollLeft - vel * 380;
        glideTo(Math.round(projected / step) * step, 0.8, "power3.out");
      } else {
        el.style.scrollSnapType = "";
      }
    };
    const onClick = (e: MouseEvent) => {
      if (moved > 4) {
        e.preventDefault();
        e.stopPropagation();
        moved = 0;
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
      tween.current?.kill();
    };
  }, []);
  return (
    <section className="carousel" aria-label={title}>
      <div className="carousel__head">
        <h2 className="carousel__title">{title}</h2>
        {viewAll && (
          <TLink href={viewAll} className="carousel__all">
            View all
          </TLink>
        )}
      </div>
      <div className="carousel__wrap">
        <button
          type="button"
          className={`carousel__arrow carousel__arrow--prev ${edge.start ? "is-hidden" : ""}`}
          onClick={() => scroll(-1)}
          aria-label="Previous"
          tabIndex={edge.start ? -1 : 0}
        >
          <ChevronIcon />
        </button>
        <div className="carousel__track" ref={track}>
          {items.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
        <button
          type="button"
          className={`carousel__arrow carousel__arrow--next ${edge.end ? "is-hidden" : ""}`}
          onClick={() => scroll(1)}
          aria-label="Next"
          tabIndex={edge.end ? -1 : 0}
        >
          <ChevronIcon />
        </button>
      </div>
    </section>
  );
}

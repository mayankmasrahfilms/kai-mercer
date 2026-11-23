"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { formatPrice, getProduct } from "@/data/store";
import { useExperience } from "@/components/site/Experience";

type Line = { slug: string; size?: string; qty: number };
type CartCtx = {
  lines: Line[];
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (line: Line) => void;
  update: (i: number, qty: number) => void;
};

const Ctx = createContext<CartCtx | null>(null);
export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
};

const KEY = "km-bag";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpenState] = useState(false);
  const { lockScroll } = useExperience();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate the bag from storage once on mount
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: Line[]) => {
    setLines(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const setOpen = useCallback(
    (v: boolean) => {
      setOpenState(v);
      lockScroll(v);
    },
    [lockScroll]
  );

  const add = (line: Line) => {
    const i = lines.findIndex((l) => l.slug === line.slug && l.size === line.size);
    if (i >= 0) {
      const next = [...lines];
      next[i] = { ...next[i], qty: next[i].qty + line.qty };
      persist(next);
    } else persist([...lines, line]);
    setOpen(true);
  };

  const update = (i: number, qty: number) => {
    const next = [...lines];
    if (qty <= 0) next.splice(i, 1);
    else next[i] = { ...next[i], qty };
    persist(next);
  };

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const value = useMemo(() => ({ lines, count, open, setOpen, add, update }), [lines, count, open]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function CartDrawer() {
  const { lines, open, setOpen, update } = useCart();
  const total = lines.reduce((s, l) => s + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      <div className={`bag-scrim ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={`bag ${open ? "is-open" : ""}`} aria-label="Shopping bag" aria-hidden={!open} data-lenis-prevent>
        <header className="bag__head">
          <h2>Shopping bag</h2>
          <button type="button" onClick={() => setOpen(false)} className="bag__close" tabIndex={open ? 0 : -1}>
            Close <CloseIcon />
          </button>
        </header>
        {lines.length === 0 ? (
          <p className="bag__empty">Your cart is empty</p>
        ) : (
          <>
            <ul className="bag__lines">
              {lines.map((l, i) => {
                const p = getProduct(l.slug);
                if (!p) return null;
                return (
                  <li key={`${l.slug}-${l.size}`} className="bag__line">
                    <div className="bag__thumb">
                      <Image src={p.image} alt={p.name} fill sizes="80px" />
                    </div>
                    <div>
                      <p className="bag__name">{p.name}</p>
                      {l.size && <p className="bag__meta">Size: {l.size}</p>}
                      <p className="bag__meta">{formatPrice(p.price)}</p>
                      <div className="qty qty--sm">
                        <button type="button" onClick={() => update(i, l.qty - 1)} aria-label="Decrease quantity" tabIndex={open ? 0 : -1}>
                          −
                        </button>
                        <span>{l.qty}</span>
                        <button type="button" onClick={() => update(i, l.qty + 1)} aria-label="Increase quantity" tabIndex={open ? 0 : -1}>
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <footer className="bag__foot">
              <p>
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </p>
              <button type="button" className="store-btn" tabIndex={open ? 0 : -1} onClick={() => alert("This is a portfolio demo — checkout is disabled.")}>
                Checkout
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

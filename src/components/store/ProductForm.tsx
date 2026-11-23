"use client";

import { useState } from "react";
import { ChevronIcon } from "@/components/icons";
import type { Product } from "@/data/store";
import { useCart } from "./Cart";

export function ProductForm({ p }: { p: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<string | undefined>(p.sizes?.[0]);
  const [qty, setQty] = useState(1);

  return (
    <form
      className="pform"
      onSubmit={(e) => {
        e.preventDefault();
        if (p.soldOut) return;
        add({ slug: p.slug, size, qty });
      }}
    >
      {p.sizes && (
        <fieldset className="pform__sizes">
          <legend className="pform__label">Select size</legend>
          <div className="pform__size-row">
            {p.sizes.map((s) => (
              <label key={s} className={`pform__size ${size === s ? "is-active" : ""}`}>
                <input type="radio" name="size" value={s} checked={size === s} onChange={() => setSize(s)} className="sr-only" />
                {s}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div className="pform__row">
        <div className="qty" aria-label="Quantity">
          <span className="pform__label">Qty</span>
          <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
            −
          </button>
          <span aria-live="polite">{qty}</span>
          <button type="button" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">
            +
          </button>
        </div>
        <button type="submit" className="store-btn pform__add" disabled={p.soldOut}>
          {p.soldOut ? "Sold out" : "Add to bag"}
        </button>
      </div>
    </form>
  );
}

export function Accordion({ items }: { items: { title: string; body: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="acc">
      {items.map((it, i) => (
        <div key={it.title} className={`acc__item ${open === i ? "is-open" : ""}`}>
          <button type="button" className="acc__head" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {it.title}
            <ChevronIcon />
          </button>
          <div className="acc__body">
            <div>{it.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

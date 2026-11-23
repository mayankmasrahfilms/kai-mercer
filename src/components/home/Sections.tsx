"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Contours } from "@/components/Contours";
import { Marquee, Reveal, ScriptWord, useParallax } from "@/components/anim";
import { ArrowIcon, BagIcon, Laurel } from "@/components/icons";
import { TLink } from "@/components/site/TLink";
import { helmets, socialCards } from "@/data/content";
import { partners, site } from "@/data/site";

/* ---------------------------------------------------------------- Statement */
export function Statement() {
  return (
    <section className="statement" data-theme="olive" aria-labelledby="statement-title">
      <Contours />
      <div className="statement__badge">
        <Laurel />
        <span className="label">{site.teamSince}</span>
      </div>
      <Reveal as="h2" className="statement__text display" id="statement-title">
        <span className="serif lime-text">Chasing</span> limits, fighting for every <span className="serif lime-text">win</span>, giving it all in
        every way. Building a <span className="serif lime-text">legacy</span> in Formula 1 on and off the track.
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------- On / Off track */
export function OnOffTrack() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 761px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=220%", scrub: 0.7, pin: ".onoff__stage", anticipatePin: 1 },
        });
        tl.fromTo(".onoff__side--l", { xPercent: -100 }, { xPercent: 0, duration: 0.3 }, 0)
          .fromTo(".onoff__side--r", { xPercent: 100 }, { xPercent: 0, duration: 0.3 }, 0)
          .fromTo(".onoff__col", { autoAlpha: 0.15 }, { autoAlpha: 1, duration: 0.2, stagger: 0.06 }, 0.08)
          .to({}, { duration: 0.2 })
          .fromTo(".onoff__full", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.35 }, 0.55)
          .fromTo(".onoff__full img", { scale: 1.25 }, { scale: 1, duration: 0.45 }, 0.55);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="onoff" id="off-track" data-theme="light" aria-labelledby="onoff-title">
      <div className="onoff__stage">
        <Contours />
        <h2 id="onoff-title" className="sr-only">
          On track and off track
        </h2>
        <div className="onoff__side onoff__side--l">
          <Image src="/images/helmet-04.jpg" alt="Kai Mercer's 2026 race helmet" fill sizes="30vw" />
        </div>
        <div className="onoff__side onoff__side--r">
          <Image src="/images/offtrack-profile.jpg" alt="Kai Mercer in profile" fill sizes="30vw" />
        </div>
        <div className="onoff__cols">
          <TLink href="/on-track" className="onoff__col">
            <span className="onoff__word display">
              <span className="serif">On</span>
              <span>Track</span>
            </span>
            <span className="script script--hover onoff__script" aria-hidden="true">
              On
            </span>
            <span className="onoff__desc">Latest results, career stats and photos from trackside.</span>
            <span className="onoff__btn" aria-hidden="true">
              <ArrowIcon />
            </span>
          </TLink>
          <a href="#partners" className="onoff__col">
            <span className="onoff__word display">
              <span className="serif">Off</span>
              <span>Track</span>
            </span>
            <span className="script script--hover onoff__script" aria-hidden="true">
              Off
            </span>
            <span className="onoff__desc">Campaigns, shoots and partner projects made for fans.</span>
            <span className="onoff__btn" aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
        </div>
        <div className="onoff__full">
          <Image src="/images/ontrack-fullbleed.jpg" alt="Kai Mercer getting ready beside his car" fill sizes="100vw" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Helmets */
export function Helmets({ heading = true }: { heading?: boolean }) {
  const root = useRef<HTMLElement>(null);
  useParallax(root, 160);
  const cols = [0, 1, 2, 3].map((c) => helmets.filter((_, i) => i % 4 === c));

  return (
    <section ref={root} className="helmets" data-theme="dark" aria-labelledby="helmets-title">
      {heading && (
        <div className="helmets__head">
          <Reveal as="h2" className="helmets__title display" id="helmets-title">
            Helmets
            <br />
            <span className="serif lime-text">Hall of fame</span>
          </Reveal>
          <Reveal as="p" className="helmets__intro">
            From bold blobs to one-off specials, {site.first} has always loved designing helmets that are impossible to miss.
          </Reveal>
        </div>
      )}
      <div className="helmets__grid">
        {cols.map((col, c) => (
          <div className="helmets__col" key={c} data-speed={c % 2 ? 0.86 : 1.1}>
            {col.map((h) => (
              <figure className="hcard" key={`${h.name}-${h.year}`} tabIndex={0}>
                <div className="hcard__media">
                  <Image className="hcard__img" src={h.image} alt={`${h.name} ${h.year} helmet`} fill sizes="(max-width: 760px) 50vw, 24vw" />
                  {h.hover && <Image className="hcard__hover" src={h.hover} alt="" fill sizes="24vw" />}
                </div>
                <figcaption className="hcard__cap">
                  {h.name} <span className="lime">{h.year}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
      <div className="helmets__more">
        <Laurel helmet={false} className="helmets__laurel" />
        <p className="serif">See more helmets and highlights from {site.first} on the track</p>
        <TLink href="/on-track" className="btn btn--green">
          View on track
        </TLink>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Champion */
export function Champion() {
  const root = useRef<HTMLElement>(null);
  useParallax(root, 180);
  return (
    <section ref={root} className="champion" data-theme="light" aria-labelledby="champion-title">
      <Contours />
      <div className="champion__copy">
        <span className="label champion__eyebrow">
          <BagIcon /> KM Store
        </span>
        <Reveal as="h2" className="champion__title display" id="champion-title" block="#2c2f25">
          World
          <br />
          drivers&rsquo;
          <br />
          <span className="serif">champion</span>
        </Reveal>
        <Reveal as="p" className="champion__text" block="#2c2f25">
          Celebrate {site.first}&rsquo;s 2025 World Championship with the Champion Collection: limited pieces, available now.
        </Reveal>
        <TLink href="/store/collections/champion" className="btn btn--green">
          Visit the store
        </TLink>
      </div>
      <div className="champion__img champion__img--hoodie" data-speed="0.85">
        <Image src="/images/champion-hoodie.jpg" alt="Champion Collection hoodie" fill sizes="36vw" />
      </div>
      <div className="champion__img champion__img--gold" data-speed="1.2">
        <Image src="/images/champion-gold.jpg" alt="" fill sizes="20vw" />
        <span className="champion__gold-script">Champion</span>
        <span className="label champion__gold-label">Collection</span>
      </div>
      <div className="champion__img champion__img--tee" data-speed="1.1">
        <Image src="/images/champion-tee.jpg" alt="Champion Collection tee" fill sizes="16vw" />
      </div>
      <div className="champion__img champion__img--tee2" data-speed="0.95">
        <Image src="/images/product-tee.jpg" alt="KM core tee" fill sizes="14vw" />
      </div>
      <span className="champion__km7" data-speed="1.25" aria-hidden="true">
        KM{site.number}
      </span>
    </section>
  );
}

/* --------------------------------------------------------------- Partners */
export function Partners() {
  return (
    <section className="partners" id="partners" data-theme="light" aria-labelledby="partners-title">
      <div className="partners__head">
        <Reveal as="h2" className="partners__title display" id="partners-title" block="#2c2f25">
          Partners
          <br />
          <span className="serif">&amp; campaigns</span>
        </Reveal>
        <Reveal as="p" className="partners__text" block="#2c2f25">
          {site.first} is proud to work with <b>partners</b> who share his drive for performance across a range of industries.
        </Reveal>
      </div>
      <ScriptWord className="partners__script" start="top 75%" duration={1.6}>
        Collabs
      </ScriptWord>
      <Marquee className="partners__logos" speed={38}>
        {partners.map((p) => (
          <span key={p.name} className={`partner partner--${p.style}`}>
            {p.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ---------------------------------------------------------------- Socials */
export function Socials() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".fan__card");
      const n = cards.length;
      const spread = window.innerWidth < 760 ? 9 : 8.5;
      const angle = (i: number) => (i - (n - 1) / 2) * spread;
      cards.forEach((card, i) => {
        card.style.setProperty("--z", `${100 - Math.abs(Math.round(angle(i) / 4))}`);
      });
      if (prefersReducedMotion()) {
        gsap.set(cards, { rotation: angle, transformOrigin: "50% 230%" });
        return;
      }
      gsap.fromTo(
        cards,
        { rotation: 0, yPercent: 30, transformOrigin: "50% 230%" },
        {
          rotation: angle,
          yPercent: 0,
          ease: "power2.out",
          stagger: { each: 0.02, from: "center" },
          scrollTrigger: { trigger: ".fan", start: "top 95%", end: "center 55%", scrub: 0.8 },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="socials" data-theme="light" aria-labelledby="socials-title">
      <div className="socials__head">
        <Laurel helmet={false} className="socials__icon" />
        <Reveal as="h2" className="socials__title display" id="socials-title" block="#2c2f25">
          What&rsquo;s up
          <br />
          <span className="serif">on socials</span>
        </Reveal>
      </div>
      <div className="fan">
        {socialCards.map((src, i) => (
          <a
            key={src}
            className="fan__card"
            href={site.socials[i % site.socials.length].href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Kai Mercer on ${site.socials[i % site.socials.length].label}`}
          >
            <span className="fan__inner">
              <Image src={src} alt="" fill sizes="(max-width: 760px) 40vw, 16vw" />
            </span>
          </a>
        ))}
      </div>
      <div className="socials__follow">
        <p className="serif">Follow {site.first} on social media</p>
        <div className="socials__links">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

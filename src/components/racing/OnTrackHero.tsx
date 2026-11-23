"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ScriptWord } from "@/components/anim";
import { Flag } from "@/components/Flag";
import { Signature, TrackIcon } from "@/components/icons";
import { TLink } from "@/components/site/TLink";
import { races } from "@/data/races";
import { site } from "@/data/site";

export function OnTrackHero() {
  const root = useRef<HTMLElement>(null);
  const prev = [...races].reverse().find((r) => r.finish)!;
  const next = races.find((r) => !r.finish)!;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(".ot-hero__title-word", { yPercent: 105 }, { yPercent: 0, duration: 1.1, ease: "kmOut", delay: 0.2 });
      gsap.fromTo(".ot-hero__helmet", { x: "-30vw", rotate: -40 }, { x: 0, rotate: 0, duration: 1.6, ease: "kmOut", delay: 0.1 });
      gsap.to(".ot-hero__helmet", {
        rotate: 25,
        yPercent: 30,
        scale: 0.8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        ".ot-hero__info > *",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "kmOut", delay: 0.45 }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="ot-hero" data-theme="dark" aria-labelledby="ot-title">
      <h1 className="ot-hero__title display" id="ot-title">
        <span style={{ overflow: "hidden", display: "block" }}>
          <span className="ot-hero__title-word" style={{ display: "block" }}>
            <span className="sr-only">On </span>Track
          </span>
        </span>
      </h1>
      <ScriptWord className="ot-hero__script" start="top 95%" duration={1.3}>
        On
      </ScriptWord>
      <div className="ot-hero__helmet">
        <Image src="/images/helmet-04.jpg" alt="Kai Mercer's 2026 helmet" fill priority sizes="(max-width: 860px) 90vw, 44vw" />
      </div>
      <div className="ot-hero__info">
        <div className="ot-hero__facts">
          <span>{site.nickname}</span>
          <span>{site.age} Y.O</span>
          <span>
            {site.hometown}
            <Flag code="GB" />
          </span>
        </div>
        <p className="label">Chasing the apex</p>
        <p className="ot-hero__lede">
          Since his F1 debut with {site.team} in 2021, {site.name} has been all in: pushing limits, chasing wins and taking{" "}
          <span className="serif">the fight to every race.</span>
        </p>
        <div className="ot-cards">
          <TLink href="/calendar" className="ot-card">
            <span className="label ot-card__label">Previous · Rnd.{prev.round}</span>
            <span className="ot-card__big">
              {prev.name}
              <Flag code={prev.country} />
              <br />
              <span className="lime">P{parseInt(prev.finish!)}</span>
            </span>
            <TrackIcon className="ot-card__track" strokeWidth={14} />
          </TLink>
          <TLink href="/calendar" className="ot-card">
            <span className="label ot-card__label">Next · Rnd.{next.round}</span>
            <span className="ot-card__big">
              {next.name}
              <Flag code={next.country} />
              <br />
              <span className="lime">{next.when}</span>
            </span>
            <TrackIcon className="ot-card__track" strokeWidth={14} />
          </TLink>
          <div className="ot-card ot-card--num" aria-label={`Car number ${site.number}`}>
            <span>{site.number}</span>
            <Signature style={{ width: "70%", color: "var(--muted)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Giant podium count with the word sliding across. */
export function PodiumCount({ count }: { count: number }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".ot-podiums__num",
        { xPercent: 12 },
        { xPercent: -12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.fromTo(
        ".ot-podiums__img",
        { yPercent: 40 },
        { yPercent: -40, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
      );
    },
    { scope: root }
  );
  return (
    <section ref={root} className="ot-podiums" data-theme="dark" aria-label={`${count} career podiums`}>
      <p className="ot-podiums__num" aria-hidden="true">
        {count}
      </p>
      <div className="ot-podiums__img">
        <Image src="/images/social-02.jpg" alt="Kai Mercer celebrating a podium" fill sizes="16vw" />
      </div>
      <p className="ot-podiums__word">Podiums</p>
    </section>
  );
}

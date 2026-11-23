"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Flag } from "@/components/Flag";
import { ChevronIcon, Scribble, TrackIcon, TrophyIcon } from "@/components/icons";
import { ScriptWord } from "@/components/anim";
import { TrackVisualiser } from "./TrackVisualiser";
import { highlights, nextRace, races, seasons } from "@/data/races";

const ord = (pos: string) => {
  const m = pos.match(/^(\d+)(ST|ND|RD|TH)$/);
  if (!m) return <>{pos}</>;
  return (
    <>
      {m[1]}
      <sup className="ord">{m[2]}</sup>
    </>
  );
};

/* -------------------------------------------------------------- Next race */
export function NextRaceCard({ id = "track-visualiser" }: { id?: string }) {
  return (
    <article className="nrc" id={id} aria-labelledby={`${id}-title`}>
      <div className="nrc__venue" aria-hidden="true">
        <span className="nrc__venue-name">{nextRace.venue}</span>
        <Flag code={nextRace.country} className="nrc__flag" />
      </div>
      <div className="nrc__frame">
        <h3 className="sr-only" id={`${id}-title`}>
          Next race: {nextRace.name} Grand Prix, {nextRace.venue}, {nextRace.dates} {nextRace.month}
        </h3>
        <dl className="nrc__stats">
          <div className="nrc__when">
            <dt className="label">When</dt>
            <dd>
              <span className="lime">{nextRace.dates}</span>
              <br />
              {nextRace.month}
            </dd>
          </div>
          <div>
            <dt className="label">Length</dt>
            <dd>
              <span className="lime">{nextRace.length}</span> <small>KM</small>
            </dd>
          </div>
          <div>
            <dt className="label">Distance</dt>
            <dd>
              <span className="lime">{nextRace.distance}</span> <small>KM</small>
            </dd>
          </div>
          <div>
            <dt className="label">First competed</dt>
            <dd className="lime">{nextRace.firstCompeted}</dd>
          </div>
          <div>
            <dt className="label">Laps</dt>
            <dd className="lime">{nextRace.laps}</dd>
          </div>
        </dl>
        <div className="nrc__side">
          <p className="label">Kai at {nextRace.venue}</p>
          <p className="nrc__blurb">{nextRace.blurb}</p>
          <p className="label nrc__sched-label">Schedule</p>
          <table className="nrc__sched">
            <tbody>
              {nextRace.schedule.map((s) => (
                <tr key={s.label} className={s.label === "Race" ? "is-race" : undefined}>
                  <th scope="row">{s.label}</th>
                  <td>{s.day}</td>
                  <td>{s.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="label nrc__tz">*UK time</p>
        </div>
        <TrackVisualiser />
        <span className="nrc__series">F1</span>
      </div>
    </article>
  );
}

/* --------------------------------------------------- Hover-follow image */
function useHoverImage(root: React.RefObject<HTMLElement | null>) {
  const [src, setSrc] = useState<string | null>(null);
  useGSAP(
    () => {
      const el = root.current;
      const img = el?.querySelector<HTMLElement>(".hover-img");
      if (!el || !img) return;
      const x = gsap.quickTo(img, "x", { duration: 0.55, ease: "power3" });
      const y = gsap.quickTo(img, "y", { duration: 0.55, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x(e.clientX - r.left);
        y(e.clientY - r.top);
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    },
    { scope: root }
  );
  return { src, setSrc };
}

/* -------------------------------------------------------------- Race list */
export function RaceTable() {
  const root = useRef<HTMLDivElement>(null);
  const { src, setSrc } = useHoverImage(root);
  const done = races.filter((r) => r.finish);
  const upcoming = races.filter((r) => !r.finish);

  return (
    <div ref={root} className="rtable" id="calendar-list" onPointerLeave={() => setSrc(null)}>
      <table className="rtable__table">
        <caption className="sr-only">2026 Formula 1 calendar and Kai Mercer&rsquo;s results</caption>
        <thead>
          <tr className="label">
            <th scope="col">Round</th>
            <th scope="col">Location</th>
            <th scope="col">When</th>
            <th scope="col">Finish</th>
            <th scope="col">Fastest lap</th>
          </tr>
        </thead>
        <tbody>
          {done.map((r) => (
            <tr key={r.round} onPointerEnter={() => setSrc(r.image)} className="rtable__row">
              <td className="rtable__round">
                <span>{String(r.round).padStart(2, "0")}</span>
                <Scribble className="rtable__strike" />
              </td>
              <th scope="row">
                {r.name}
                <Flag code={r.country} />
                <span className="sr-only">, {r.circuit}</span>
              </th>
              <td>{r.when}</td>
              <td>
                {r.finish === "1ST" || r.finish === "2ND" || r.finish === "3RD" ? <TrophyIcon className="rtable__trophy" /> : null}
                {ord(r.finish!)}
              </td>
              <td className="rtable__lap">
                {r.fastestLap ? (
                  <>
                    {r.fastestLap}
                    <small>S</small>
                  </>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr className="label rtable__subhead">
            <th scope="col">Round</th>
            <th scope="col">Location</th>
            <th scope="col">When</th>
            <th scope="col">Laps</th>
            <th scope="col">Distance</th>
          </tr>
        </thead>
        <tbody>
          {upcoming.map((r, i) => (
            <tr key={r.round} onPointerEnter={() => setSrc(r.image)} className={`rtable__row ${i === 0 ? "is-next" : ""}`}>
              <td className="rtable__round">
                <span>{r.round}</span>
              </td>
              <th scope="row">
                {r.name}
                <Flag code={r.country} />
                <span className="sr-only">, {r.circuit}</span>
              </th>
              <td>{r.when}</td>
              <td>{r.laps}</td>
              <td className="rtable__lap">
                {r.distance}
                <small>KM</small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={`hover-img ${src ? "is-on" : ""}`} aria-hidden="true">
        {races.map((r) => (
          <Image key={r.round} src={r.image} alt="" fill sizes="20vw" className={src === r.image ? "is-active" : ""} />
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------- Season results list */
export function SeasonResults({ title = true }: { title?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="seasons">
      {title && (
        <div className="seasons__head">
          <h2 className="seasons__title display">
            Formula 1
            <br />
            <span className="serif">all results</span>
          </h2>
          <p className="seasons__intro">The Formula 1 season is nearly done. Look back at every one of Kai&rsquo;s seasons below.</p>
        </div>
      )}
      <div className="seasons__table" role="table" aria-label="Season results">
        <div className="seasons__row seasons__row--head label" role="row">
          <span role="columnheader" />
          <span role="columnheader">Year</span>
          <span role="columnheader">Finish</span>
          <span role="columnheader">Podiums</span>
        </div>
        {seasons.map((s) => {
          const isOpen = open === s.year;
          return (
            <div key={s.year} className={`seasons__item ${isOpen ? "is-open" : ""}`} role="rowgroup">
              <button
                type="button"
                className="seasons__row"
                role="row"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : s.year)}
              >
                <span role="cell" className="seasons__chev">
                  <ChevronIcon />
                </span>
                <span role="cell">{s.year}</span>
                <span role="cell">
                  {s.finish}
                  <sup className="ord">{s.suffix}</sup>
                </span>
                <span role="cell">{s.podiums}</span>
              </button>
              <div className="seasons__detail" role="row">
                <p role="cell">
                  {s.note} <span className="lime">{s.wins} wins · {s.points} points</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- Highlights */
export function Highlights() {
  const root = useRef<HTMLDivElement>(null);
  const { src, setSrc } = useHoverImage(root);
  return (
    <div ref={root} className="rtable rtable--hl" onPointerLeave={() => setSrc(null)}>
      <table className="rtable__table">
        <caption className="sr-only">Kai Mercer&rsquo;s Formula 1 race wins</caption>
        <thead>
          <tr className="label">
            <th scope="col">Series</th>
            <th scope="col">Name</th>
            <th scope="col">When</th>
            <th scope="col">Finish</th>
            <th scope="col">Time / gap</th>
          </tr>
        </thead>
        <tbody>
          {highlights.map((h) => (
            <tr key={h.when} className="rtable__row" onPointerEnter={() => setSrc(h.image)}>
              <td className="rtable__round">{h.series}</td>
              <th scope="row">
                {h.name}
                <Flag code={h.country} />
              </th>
              <td>{h.when}</td>
              <td>
                <TrophyIcon className="rtable__trophy" />
                {ord(h.finish)}
              </td>
              <td className="rtable__lap">{h.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={`hover-img ${src ? "is-on" : ""}`} aria-hidden="true">
        {highlights.map((h) => (
          <Image key={h.when} src={h.image} alt="" fill sizes="20vw" className={src === h.image ? "is-active" : ""} />
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Countdown */
function nextRaceStart(now: number) {
  const upcoming = races.find((r) => new Date(r.startISO).getTime() > now);
  return upcoming ? new Date(upcoming.startISO).getTime() : now;
}

export function Countdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      setLeft(Math.max(0, nextRaceStart(now) - now));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const t = left ?? 0;
  const d = Math.floor(t / 86400000);
  const h = Math.floor((t % 86400000) / 3600000);
  const m = Math.floor((t % 3600000) / 60000);
  const s = Math.floor((t % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <section className="countdown" data-theme="dark" aria-label="Countdown to the next race">
      <TrackIcon className="countdown__icon" strokeWidth={12} />
      <p className="label countdown__label">Next race: {nextRace.name}</p>
      <div className="countdown__digits" aria-live="off" suppressHydrationWarning>
        <span>{pad(d)}D</span>
        <span>{pad(h)}H</span>
        <span>{pad(m)}M</span>
        <span>{pad(s)}S</span>
      </div>
      <ScriptWord className="countdown__script" start="top 70%" duration={1.4}>
        Race Day
      </ScriptWord>
    </section>
  );
}

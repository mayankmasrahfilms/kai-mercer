import type { SVGProps } from "react";
import { TRACK_PATH } from "@/data/races";

type P = SVGProps<SVGSVGElement>;

/** KM monogram — built from strokes so it can be drawn on. */
export function Monogram({ strokeWidth = 7, ...p }: P & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 66 48" fill="none" aria-hidden="true" {...p}>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter">
        <path className="mono-stroke" d="M14 42 L22 6" />
        <path className="mono-stroke" d="M34 6 L18 26 L27 42" />
        <path className="mono-stroke" d="M32 42 L40 6 L47 27 L60 6 L52 42" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <span className="logo__first">KAI</span>
      <span className="logo__last">MERCER</span>
    </span>
  );
}

export function BagIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
      <path d="M5 8h14l-1 12H6L5 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ArrowIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
      <path d="M6 18 18 6M9 6h9v9" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function LoopArrowIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
      <path d="M5 13a7 7 0 1 0 2-5M5 4v4h4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function ChevronIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

export function TrophyIcon(p: P) {
  return (
    <svg viewBox="0 0 24 40" fill="none" aria-hidden="true" {...p}>
      <path d="M6 2h12v10a6 6 0 0 1-12 0V2Z M12 18v12 M6 36h12 M8 30h8v6H8z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function TrackIcon({ strokeWidth = 14, ...p }: P & { strokeWidth?: number }) {
  return (
    <svg viewBox="40 80 880 360" fill="none" aria-hidden="true" {...p}>
      <path d={TRACK_PATH} stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

/** Laurel wreath with a small helmet in the middle. */
export function Laurel({ helmet = true, ...p }: P & { helmet?: boolean }) {
  const leaves = Array.from({ length: 7 }, (_, i) => i);
  return (
    <svg viewBox="0 0 120 80" fill="none" aria-hidden="true" {...p}>
      {[1, -1].map((dir) => (
        <g key={dir} transform={dir === -1 ? "translate(120 0) scale(-1 1)" : undefined}>
          <path d="M34 74 C 14 62, 10 36, 22 10" stroke="currentColor" strokeWidth="2" />
          {leaves.map((i) => {
            const t = i / 6;
            const x = 32 - Math.sin(t * 2.4) * 18 - t * 6;
            const y = 70 - t * 60;
            const rot = -40 + t * 70;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="3.6"
                ry="8.5"
                transform={`rotate(${rot} ${x} ${y})`}
                fill="currentColor"
              />
            );
          })}
        </g>
      ))}
      {helmet && (
        <g stroke="currentColor" strokeWidth="2.4">
          <path d="M42 46c0-14 8-24 18-24s18 10 18 24v6H42v-6Z" />
          <path d="M44 40h32M46 34h28" />
          <path d="M48 46h24" strokeWidth="5" />
        </g>
      )}
    </svg>
  );
}

/** Hand-drawn style autograph. Each path is drawn in sequence. */
export function Signature(p: P) {
  return (
    <svg viewBox="0 0 600 420" fill="none" aria-hidden="true" {...p}>
      <g stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
        <path className="sig-path" d="M372 18 C 330 110, 268 236, 214 356" />
        <path
          className="sig-path"
          d="M70 300 C 190 236, 330 150, 470 112 C 560 88, 600 128, 548 170 C 488 220, 330 280, 150 318 C 70 334, 30 322, 70 300"
        />
        <path className="sig-path" d="M226 330 L 286 236 L 280 306 L 336 222 L 330 292 L 384 230 L 380 282" />
        <path className="sig-path" d="M180 380 C 300 330, 440 270, 582 214" />
        <path className="sig-path" d="M430 120 L 404 250" />
      </g>
    </svg>
  );
}

export function Squiggle(p: P) {
  return (
    <svg viewBox="0 0 200 24" fill="none" preserveAspectRatio="none" aria-hidden="true" {...p}>
      <path
        className="squiggle-path"
        pathLength={1}
        d="M2 14 C 22 4, 32 4, 46 14 S 74 24, 90 14 S 118 2, 136 12 S 168 22, 198 8"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A lime scribble used to strike through finished round numbers. */
export function Scribble(p: P) {
  return (
    <svg viewBox="0 0 100 40" fill="none" preserveAspectRatio="none" aria-hidden="true" {...p}>
      <path d="M2 30 C 30 22, 60 14, 98 6 M10 34 C 40 26, 70 18, 92 12" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function UserIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function CloseIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

export function ChatIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
      <path d="M4 5h16v11H9l-5 4V5Z" fill="currentColor" />
    </svg>
  );
}

export function SocialGlyph({ name, ...p }: P & { name: string }) {
  const n = name.toLowerCase();
  const paths: Record<string, string> = {
    instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01",
    tiktok: "M14 3v11.5a3.5 3.5 0 1 1-3-3.46M14 3c.5 3 2.5 5 6 5",
    youtube: "M3 8.5C3 6 4.5 5 7 5h10c2.5 0 4 1 4 3.5v7c0 2.5-1.5 3.5-4 3.5H7c-2.5 0-4-1-4-3.5v-7ZM10 9v6l5-3-5-3Z",
    twitch: "M5 3h15v10l-4 4h-4l-3 3H7v-3H4V6l1-3Zm6 5v5m4-5v5",
    x: "M4 4l16 16M20 4 4 20",
    facebook: "M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
      <path d={paths[n] ?? paths.instagram} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

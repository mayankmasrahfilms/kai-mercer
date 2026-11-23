/** Topographic contour lines, generated deterministically (no image request). */
function blob(cx: number, cy: number, r: number, a: number, b: number, squash: number) {
  const pts: [number, number][] = [];
  const n = 28;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const rr = r * (1 + 0.16 * Math.sin(3 * t + a) + 0.09 * Math.sin(5 * t + b) + 0.05 * Math.cos(2 * t + a * 2));
    pts.push([cx + Math.cos(t) * rr, cy + Math.sin(t) * rr * squash]);
  }
  // Catmull-Rom to cubic Bézier, closed
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

const SEEDS = [
  { cx: 180, cy: 160, r: 60, rings: 5, a: 0.4, b: 1.2, s: 0.8 },
  { cx: 820, cy: 120, r: 50, rings: 4, a: 2.1, b: 0.3, s: 0.7 },
  { cx: 1400, cy: 260, r: 70, rings: 5, a: 1.3, b: 2.6, s: 0.9 },
  { cx: 520, cy: 620, r: 80, rings: 6, a: 3.1, b: 0.9, s: 0.75 },
  { cx: 1180, cy: 760, r: 60, rings: 5, a: 0.9, b: 1.9, s: 0.85 },
  { cx: 60, cy: 820, r: 50, rings: 4, a: 2.6, b: 2.2, s: 1 },
];

const PATHS = SEEDS.flatMap((s) =>
  Array.from({ length: s.rings }, (_, k) => blob(s.cx, s.cy, s.r * (1 + k * 0.62), s.a + k * 0.35, s.b - k * 0.25, s.s))
);

export function Contours({ className = "" }: { className?: string }) {
  return (
    <svg className={`contours ${className}`} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.1" vectorEffect="non-scaling-stroke">
        {PATHS.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}

"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import type { Episode, EpisodeVisual } from "@/content/types";
import { ThinkingNotes } from "./thinking-notes";
import { Tex } from "./math-formula";
import { fmt } from "./ui";
import { GiniWorkbench } from "./formula-workbench";

type Kind = EpisodeVisual["kind"];
type PanelProps<K extends Kind> = { visual: Extract<EpisodeVisual, { kind: K }>; step: number };

/* ------------------------------------------------------------------ */
/* Shared chrome                                                       */
/* ------------------------------------------------------------------ */

function PanelHead({ title, sub, right }: { title: string; sub?: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-2 border-b border-rule pb-3">
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        {sub ? <p className="text-xs text-ink-subtle">{sub}</p> : null}
      </div>
      {right}
    </div>
  );
}

function Insight({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-r-lg border-l-2 border-accent bg-accent-wash px-4 py-3 text-sm leading-relaxed text-ink">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* K-Means                                                             */
/* ------------------------------------------------------------------ */

type KMVisual = PanelProps<"kmeans">["visual"];
type KMPoint = KMVisual["points"][number];
type KMXY = { x: number; y: number };
type KMFocus = { kind: "point" | "centroid"; index: number };

const KM_SIZE = 320;
const KM_MARGIN = 30;
const KM_MAX = 12;
const KM_TICKS = [0, 2, 4, 6, 8, 10, 12];
const KM_EPS = 1e-9;
const KM_COLORS = [
  "var(--color-series-1)",
  "var(--color-series-2)",
  "var(--color-series-3)",
] as const;

const kmX = (x: number) =>
  KM_MARGIN + (x / KM_MAX) * (KM_SIZE - 2 * KM_MARGIN);

const kmY = (y: number) =>
  KM_SIZE - KM_MARGIN - (y / KM_MAX) * (KM_SIZE - 2 * KM_MARGIN);

const kmNumber = (value: number) => String(Number(value.toFixed(2)));

function kmDistance(a: KMXY, b: KMXY, metric: KMVisual["metric"]) {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return metric === "manhattan" ? dx + dy : Math.hypot(dx, dy);
}

function kmNearest(
  point: KMXY,
  centroids: readonly KMXY[],
  metric: KMVisual["metric"],
) {
  let best = 0;
  let minimum = Infinity;

  centroids.forEach((centroid, index) => {
    const distance = kmDistance(point, centroid, metric);
    // Strict improvement preserves the lowest index when distances tie.
    if (distance < minimum - KM_EPS) {
      best = index;
      minimum = distance;
    }
  });

  return best;
}

function kmRoute(a: KMXY, b: KMXY, metric: KMVisual["metric"]) {
  const x1 = kmX(a.x);
  const y1 = kmY(a.y);
  const x2 = kmX(b.x);
  const y2 = kmY(b.y);

  return metric === "manhattan"
    ? `M ${x1} ${y1} H ${x2} V ${y2}`
    : `M ${x1} ${y1} L ${x2} ${y2}`;
}

/**
 * Rasterized decision regions, compressed into one SVG path per centroid.
 * This also works for Manhattan distance, whose regions cannot generally
 * be produced by simply bisecting Euclidean centroid-to-centroid lines.
 */
function kmTerritories(
  centroids: readonly KMXY[],
  metric: KMVisual["metric"],
) {
  const resolution = 120;
  const cell = (KM_SIZE - 2 * KM_MARGIN) / resolution;
  const segments = centroids.map(() => [] as string[]);

  for (let row = 0; row < resolution; row++) {
    let previous = -1;
    let runStart = 0;

    for (let column = 0; column <= resolution; column++) {
      const winner =
        column === resolution
          ? -1
          : kmNearest(
              {
                x: ((column + 0.5) / resolution) * KM_MAX,
                y: KM_MAX - ((row + 0.5) / resolution) * KM_MAX,
              },
              centroids,
              metric,
            );

      if (winner !== previous) {
        if (previous >= 0) {
          const left = KM_MARGIN + runStart * cell;
          const top = KM_MARGIN + row * cell;
          const width = (column - runStart) * cell;
          segments[previous].push(
            `M${left} ${top}h${width}v${cell}h${-width}z`,
          );
        }
        previous = winner;
        runStart = column;
      }
    }
  }

  return segments.map((parts) => parts.join(""));
}

function kmConvexHull(points: readonly KMXY[]) {
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (a: KMXY, b: KMXY, c: KMXY) =>
    (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

  const lower: KMXY[] = [];
  for (const point of sorted) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0
    ) {
      lower.pop();
    }
    lower.push(point);
  }

  const upper: KMXY[] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const point = sorted[i];
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0
    ) {
      upper.pop();
    }
    upper.push(point);
  }

  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

/** Step 5 shows envelopes of the *previously assigned members*, not new
 * decision regions: assignments have not been recalculated at this step. */
function KMMemberEnvelope({
  members,
  color,
}: {
  members: readonly KMPoint[];
  color: string;
}) {
  if (members.length === 0) return null;

  const points = members.map((member) => ({
    x: kmX(member.x),
    y: kmY(member.y),
  }));
  const hull = kmConvexHull(points);

  if (hull.length === 1) {
    return (
      <circle
        cx={hull[0].x}
        cy={hull[0].y}
        r={15}
        fill={color}
        fillOpacity={0.11}
        stroke={color}
        strokeOpacity={0.28}
      />
    );
  }

  if (hull.length === 2) {
    const path = `M${hull[0].x} ${hull[0].y}L${hull[1].x} ${hull[1].y}`;
    return (
      <g fill="none" stroke={color} strokeLinecap="round">
        <path d={path} strokeWidth={26} strokeOpacity={0.1} />
        <path d={path} strokeWidth={1.5} strokeOpacity={0.3} />
      </g>
    );
  }

  const center = {
    x: hull.reduce((sum, p) => sum + p.x, 0) / hull.length,
    y: hull.reduce((sum, p) => sum + p.y, 0) / hull.length,
  };

  const padded = hull.map((point) => {
    const dx = point.x - center.x;
    const dy = point.y - center.y;
    const length = Math.hypot(dx, dy) || 1;
    return {
      x: point.x + (dx / length) * 12,
      y: point.y + (dy / length) * 12,
    };
  });

  const path =
    padded
      .map((point, index) =>
        `${index === 0 ? "M" : "L"}${point.x} ${point.y}`,
      )
      .join("") + "Z";

  return (
    <path
      d={path}
      fill={color}
      fillOpacity={0.1}
      stroke={color}
      strokeOpacity={0.28}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  );
}

function KMeansPanel({ visual, step }: PanelProps<"kmeans">) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const reducedMotion = useReducedMotion();
  const [showTable, setShowTable] = useState(true);
  const [hovered, setHovered] = useState<KMFocus | null>(null);
  const [pinned, setPinned] = useState<KMFocus | null>(null);
  const active = hovered ?? pinned;

  const rows = useMemo(() => {
    return visual.points.map((point) => {
      const distances = visual.initialCentroids.map((centroid) =>
        kmDistance(point, centroid, visual.metric),
      );
      const best = kmNearest(
        point,
        visual.initialCentroids,
        visual.metric,
      );
      const minimum = distances[best];
      const ties = distances.flatMap((distance, index) =>
        Math.abs(distance - minimum) <= KM_EPS ? [index] : [],
      );

      return { point, distances, best, ties };
    });
  }, [visual.points, visual.initialCentroids, visual.metric]);

  const means = useMemo(
    () =>
      visual.initialCentroids.map((centroid, index) => {
        const members = rows
          .filter((row) => row.best === index)
          .map((row) => row.point);

        return {
          id: centroid.id,
          x: members.length
            ? members.reduce((sum, p) => sum + p.x, 0) / members.length
            : centroid.x,
          y: members.length
            ? members.reduce((sum, p) => sum + p.y, 0) / members.length
            : centroid.y,
          members,
        };
      }),
    [rows, visual.initialCentroids],
  );

  const territoryPaths = useMemo(
    () => kmTerritories(visual.initialCentroids, visual.metric),
    [visual.initialCentroids, visual.metric],
  );

  const round2 = step >= 5;
  const showAssignment = step >= 4;
  const centroids = round2 ? means : visual.initialCentroids;
  const actualTies = rows.filter((row) => row.ties.length > 1);
  const a5 = rows.find((row) => row.point.id === "A5");

  // A5 is the default worked example. Selecting or hovering a different
  // point updates the routes and the emphasized matrix row.
  const workedIndex =
    active?.kind === "point"
      ? active.index
      : Math.max(
          0,
          rows.findIndex((row) => row.point.id === "A5"),
        );
  const workedRow = rows[workedIndex];

  const stage =
    step === 0
      ? "จุดข้อมูลตั้งต้น"
      : step === 1
        ? "วาง Centroid เริ่มต้น"
        : step < 4
          ? "เปรียบเทียบระยะถึง Centroid"
          : step === 4
            ? "จัดกลุ่มด้วย Centroid เริ่มต้น"
            : "ย้าย Centroid ไปยังค่าเฉลี่ยของสมาชิก";

  function togglePin(target: KMFocus) {
    setPinned((current) =>
      current?.kind === target.kind && current.index === target.index
        ? null
        : target,
    );
  }

  function handleKey(event: KeyboardEvent<SVGGElement>, target: KMFocus) {
    if (event.key === "Escape") {
      setPinned(null);
      setHovered(null);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePin(target);
    }
  }

  const tipPosition = active
    ? active.kind === "point"
      ? rows[active.index]?.point
      : centroids[active.index]
    : null;

  const tipX = tipPosition ? kmX(tipPosition.x) : 0;
  const tipY = tipPosition ? kmY(tipPosition.y) : 0;

  return (
    <section className="min-w-0">
      <PanelHead
        title="K-Means"
        sub={`${visual.metric === "manhattan" ? "Manhattan" : "Euclidean"} · ${stage}`}
      />

      <div className="relative mx-auto w-full max-w-[420px]">
        <svg
          viewBox={`0 0 ${KM_SIZE} ${KM_SIZE}`}
          className="block h-auto w-full"
          role="group"
          aria-labelledby={`${uid}-title`}
          aria-label={`แผนภาพ K-Means ${visual.points.length} จุด: ${stage}; ใช้ Tab เพื่อเลือกจุดหรือ Centroid`}
        >
          <title id={`${uid}-title`}>แผนภาพจำลอง K-Means Clustering: {stage}</title>

          <defs>
            <clipPath id={`${uid}-plot`}>
              <rect
                x={KM_MARGIN}
                y={KM_MARGIN}
                width={KM_SIZE - 2 * KM_MARGIN}
                height={KM_SIZE - 2 * KM_MARGIN}
              />
            </clipPath>

            {visual.initialCentroids.map((centroid, index) => (
              <marker
                key={centroid.id}
                id={`${uid}-arrow-${index}`}
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path
                  d="M0 0L8 4L0 8Z"
                  fill={KM_COLORS[index % KM_COLORS.length]}
                />
              </marker>
            ))}
          </defs>

          {/* Step 4: actual nearest-centroid decision regions. */}
          {step === 4 && (
            <g clipPath={`url(#${uid}-plot)`} pointerEvents="none">
              {territoryPaths.map((path, index) => (
                <path
                  key={index}
                  d={path}
                  fill={KM_COLORS[index % KM_COLORS.length]}
                  fillOpacity={0.095}
                />
              ))}
            </g>
          )}

          {/* Step 5: frozen Round 1 memberships, not recomputed Voronoi. */}
          {round2 && (
            <g clipPath={`url(#${uid}-plot)`} pointerEvents="none">
              {means.map((mean, index) => (
                <KMMemberEnvelope
                  key={mean.id}
                  members={mean.members}
                  color={KM_COLORS[index % KM_COLORS.length]}
                />
              ))}
            </g>
          )}

          <g aria-hidden="true" pointerEvents="none">
            {KM_TICKS.map((tick) => (
              <g key={tick}>
                <line
                  x1={kmX(tick)}
                  x2={kmX(tick)}
                  y1={kmY(0)}
                  y2={kmY(KM_MAX)}
                  stroke="var(--color-rule-strong)"
                  strokeWidth={tick === 0 ? 1.2 : 0.75}
                  strokeOpacity={tick === 0 ? 0.9 : 0.6}
                />
                <line
                  x1={kmX(0)}
                  x2={kmX(KM_MAX)}
                  y1={kmY(tick)}
                  y2={kmY(tick)}
                  stroke="var(--color-rule-strong)"
                  strokeWidth={tick === 0 ? 1.2 : 0.75}
                  strokeOpacity={tick === 0 ? 0.9 : 0.6}
                />
                <text
                  x={kmX(tick)}
                  y={KM_SIZE - KM_MARGIN + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--color-ink-subtle)"
                  className="font-mono"
                >
                  {tick}
                </text>
                <text
                  x={KM_MARGIN - 8}
                  y={kmY(tick) + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--color-ink-subtle)"
                  className="font-mono"
                >
                  {tick}
                </text>
              </g>
            ))}
          </g>

          {/* Step 3 additionally shows the other nearest routes faintly. */}
          {step === 3 && (
            <g pointerEvents="none">
              {rows.map((row, index) =>
                index === workedIndex ? null : (
                  <path
                    key={row.point.id}
                    d={kmRoute(
                      row.point,
                      visual.initialCentroids[row.best],
                      visual.metric,
                    )}
                    fill="none"
                    stroke={KM_COLORS[row.best % KM_COLORS.length]}
                    strokeOpacity={0.2}
                    strokeWidth={1.2}
                    strokeDasharray="4 4"
                    strokeLinejoin="round"
                    className="km-distance"
                  />
                ),
              )}
            </g>
          )}

          {/* Compare the worked point against every centroid. */}
          {(step === 2 || step === 3) && workedRow && (
            <g pointerEvents="none">
              {visual.initialCentroids.map((centroid, index) => (
                <path
                  key={centroid.id}
                  d={kmRoute(workedRow.point, centroid, visual.metric)}
                  fill="none"
                  stroke={KM_COLORS[index % KM_COLORS.length]}
                  strokeOpacity={index === workedRow.best ? 0.85 : 0.48}
                  strokeWidth={index === workedRow.best ? 2 : 1.4}
                  strokeDasharray="4 4"
                  strokeLinejoin="round"
                  className="km-distance"
                />
              ))}
            </g>
          )}

          {step === 4 && (
            <g pointerEvents="none">
              {rows.map((row, index) => {
                const emphasized =
                  active?.kind === "point"
                    ? active.index === index
                    : active?.kind === "centroid"
                      ? active.index === row.best
                      : false;

                return (
                  <path
                    key={row.point.id}
                    d={kmRoute(
                      row.point,
                      visual.initialCentroids[row.best],
                      visual.metric,
                    )}
                    fill="none"
                    stroke={KM_COLORS[row.best % KM_COLORS.length]}
                    strokeOpacity={emphasized ? 0.7 : 0.26}
                    strokeWidth={emphasized ? 1.8 : 1.1}
                    strokeDasharray="4 4"
                    strokeLinejoin="round"
                    className="km-distance"
                  />
                );
              })}
            </g>
          )}

          {/* Previous positions and animated movement. */}
          {round2 && (
            <g pointerEvents="none" aria-hidden="true">
              {visual.initialCentroids.map((old, index) => {
                const next = means[index];
                const x1 = kmX(old.x);
                const y1 = kmY(old.y);
                const x2 = kmX(next.x);
                const y2 = kmY(next.y);
                const dx = x2 - x1;
                const dy = y2 - y1;
                const length = Math.hypot(dx, dy);
                const color = KM_COLORS[index % KM_COLORS.length];

                if (length < 0.01) {
                  return (
                    <g key={old.id}>
                      <text
                        x={x1 + 11}
                        y={y1 + 16}
                        fill={color}
                        fillOpacity={0.75}
                        fontSize="9"
                        className="font-mono"
                      >
                        ({kmNumber(old.x)}, {kmNumber(old.y)}) คงที่
                      </text>
                    </g>
                  );
                }

                const startCut = Math.min(10, length * 0.25);
                const endCut = Math.min(14, length * 0.25);
                const startX = x1 + (dx / length) * startCut;
                const startY = y1 + (dy / length) * startCut;
                const endX = x2 - (dx / length) * endCut;
                const endY = y2 - (dy / length) * endCut;

                return (
                  <g key={old.id}>
                    <path
                      d={`M${x1} ${y1 - 7}L${x1 + 7} ${y1}L${x1} ${y1 + 7}L${x1 - 7} ${y1}Z`}
                      fill="none"
                      stroke={color}
                      strokeOpacity={0.6}
                      strokeDasharray="2 2"
                    />
                    <text
                      x={x1 + 11}
                      y={y1 + 16}
                      fill={color}
                      fillOpacity={0.75}
                      fontSize="9"
                      className="font-mono"
                    >
                      ({kmNumber(old.x)}, {kmNumber(old.y)})
                    </text>
                    <motion.path
                      d={`M${startX} ${startY}L${endX} ${endY}`}
                      fill="none"
                      stroke={color}
                      strokeOpacity={0.8}
                      strokeWidth={1.6}
                      markerEnd={`url(#${uid}-arrow-${index})`}
                      initial={reducedMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: reducedMotion ? 0 : 0.7 }}
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* Draw centroids before points: coincident A1/C1, A4/C2,
              and A7/C3 remain visible and separately targetable. */}
          {step >= 1 &&
            centroids.map((centroid, index) => {
              const target: KMFocus = { kind: "centroid", index };
              const isActive =
                active?.kind === "centroid" && active.index === index;
              const color = KM_COLORS[index % KM_COLORS.length];
              const members = means[index].members;

              return (
                <motion.g
                  key={centroid.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${centroid.id}, พิกัด (${kmNumber(centroid.x)}, ${kmNumber(centroid.y)}), สมาชิกจากการจัดกลุ่มรอบแรก ${members.length} จุด`}
                  aria-pressed={isActive}
                  aria-describedby={isActive ? `${uid}-tip` : undefined}
                  onPointerEnter={() => setHovered(target)}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => setHovered(target)}
                  onBlur={() => setHovered(null)}
                  onClick={() => togglePin(target)}
                  onKeyDown={(event) => handleKey(event, target)}
                  initial={
                    reducedMotion
                      ? false
                      : {
                          x: kmX(visual.initialCentroids[index].x),
                          y: kmY(visual.initialCentroids[index].y),
                        }
                  }
                  animate={{ x: kmX(centroid.x), y: kmY(centroid.y) }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.75,
                    ease: "easeInOut",
                  }}
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  {isActive && (
                    <circle
                      r={15}
                      fill="none"
                      stroke={color}
                      strokeWidth={1.5}
                      opacity={0.65}
                      pointerEvents="none"
                    />
                  )}
                  <path
                    d="M0 -9L9 0L0 9L-9 0Z"
                    fill="var(--color-surface)"
                    fillOpacity={0.88}
                    stroke={color}
                    strokeWidth={2.4}
                  />
                  <text
                    y={-15}
                    textAnchor="middle"
                    fill={color}
                    fontSize="11"
                    fontWeight={700}
                    className="font-mono"
                    pointerEvents="none"
                  >
                    {centroid.id}
                  </text>
                  <path
                    d="M0 -12L12 0L0 12L-12 0Z"
                    fill="transparent"
                    stroke="transparent"
                    strokeWidth={4}
                  />
                </motion.g>
              );
            })}

          {rows.map((row, index) => {
            const { point, best, ties } = row;
            const target: KMFocus = { kind: "point", index };
            const x = kmX(point.x);
            const y = kmY(point.y);
            const selected =
              active?.kind === "point" && active.index === index;
            const memberOfFocusedCentroid =
              active?.kind === "centroid" && active.index === best;
            const dimmed =
              active?.kind === "centroid" && !memberOfFocusedCentroid;
            const color = KM_COLORS[best % KM_COLORS.length];
            const coincident = visual.initialCentroids.some(
              (centroid) =>
                Math.abs(point.x - centroid.x) <= KM_EPS &&
                Math.abs(point.y - centroid.y) <= KM_EPS,
            );

            return (
              <g
                key={point.id}
                role="button"
                tabIndex={0}
                aria-label={`${point.id}, พิกัด (${point.x}, ${point.y})${step >= 1 ? `, Centroid ใกล้สุด ${visual.initialCentroids[best].id}, ระยะ ${kmNumber(row.distances[best])}` : ""}${ties.length > 1 ? ", ระยะเสมอ เลือก Centroid ดัชนีต่ำสุด" : ""}`}
                aria-pressed={selected}
                aria-describedby={selected ? `${uid}-tip` : undefined}
                onPointerEnter={() => setHovered(target)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(target)}
                onBlur={() => setHovered(null)}
                onClick={() => togglePin(target)}
                onKeyDown={(event) => handleKey(event, target)}
                style={{
                  cursor: "pointer",
                  opacity: dimmed ? 0.28 : 1,
                  transition: reducedMotion ? "none" : "opacity 180ms",
                  outline: "none",
                }}
              >
                {(selected || memberOfFocusedCentroid) && (
                  <circle
                    cx={x}
                    cy={y}
                    r={9}
                    fill="none"
                    stroke={color}
                    strokeWidth={1.7}
                    pointerEvents="none"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={5}
                  fill={
                    showAssignment || memberOfFocusedCentroid
                      ? color
                      : "var(--color-ink)"
                  }
                  stroke="var(--color-surface)"
                  strokeWidth={1.5}
                />
                <text
                  x={x + 8}
                  y={y + (coincident && step >= 1 ? 14 : 3)}
                  fontSize="10"
                  fontWeight={selected ? 700 : 500}
                  fill="var(--color-ink-muted)"
                  className="font-mono"
                  pointerEvents="none"
                >
                  {point.id}
                </text>

                {step >= 2 && ties.length > 1 && (
                  <g pointerEvents="none">
                    <circle
                      cx={x + 11}
                      cy={y - 11}
                      r={7}
                      fill="var(--color-warn)"
                    />
                    <text
                      x={x + 11}
                      y={y - 8}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight={700}
                      fill="var(--color-paper)"
                    >
                      !
                    </text>
                  </g>
                )}

                <circle cx={x} cy={y} r={10} fill="transparent" />
              </g>
            );
          })}
        </svg>

        {active && tipPosition && (
          <div
            id={`${uid}-tip`}
            role="tooltip"
            className="pointer-events-none absolute z-20 w-[min(13rem,calc(100%-1rem))] rounded-lg border border-[var(--color-rule-strong)] bg-[var(--color-surface)] p-2.5 text-[11px] leading-relaxed text-[var(--color-ink)] shadow-lg"
            style={{
              left: `clamp(104px, ${((tipX / KM_SIZE) * 100).toFixed(2)}%, calc(100% - 104px))`,
              top: `${((tipY / KM_SIZE) * 100).toFixed(2)}%`,
              transform:
                tipY < KM_SIZE / 2
                  ? "translate(-50%, 14px)"
                  : "translate(-50%, calc(-100% - 14px))",
            }}
          >
            {active.kind === "point" ? (
              (() => {
                const row = rows[active.index];
                if (!row) return null;
                const { point, best, ties } = row;

                return (
                  <>
                    <strong className="block text-xs">
                      {point.id} ({kmNumber(point.x)}, {kmNumber(point.y)})
                    </strong>
                    {step >= 1 ? (
                      <>
                        <span className="block">
                          {step >= 4 ? "กลุ่มรอบแรก" : "ใกล้สุดชั่วคราว"}:{" "}
                          {visual.initialCentroids[best].id}
                        </span>
                        {step >= 2 &&
                          visual.initialCentroids.map(
                            (centroid, index) => (
                              <span
                                key={centroid.id}
                                className="block font-mono"
                                style={{
                                  color:
                                    index === best
                                      ? "var(--color-good)"
                                      : undefined,
                                }}
                              >
                                {centroid.id}:{" "}
                                {visual.metric === "manhattan"
                                  ? `|${kmNumber(point.x)}−${kmNumber(centroid.x)}| + |${kmNumber(point.y)}−${kmNumber(centroid.y)}|`
                                  : `√(${kmNumber(point.x - centroid.x)}² + ${kmNumber(point.y - centroid.y)}²)`}{" "}
                                = {kmNumber(row.distances[index])}
                              </span>
                            ),
                          )}
                        {round2 && (
                          <span className="block">
                            ระยะถึง Centroid ใหม่ของกลุ่มเดิม:{" "}
                            {kmNumber(
                              kmDistance(
                                point,
                                means[best],
                                visual.metric,
                              ),
                            )}
                          </span>
                        )}
                        {step >= 2 && ties.length > 1 && (
                          <span className="mt-1 block text-[var(--color-warn)]">
                            ระยะเสมอ → เลือกดัชนีต่ำสุด
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="block">ยังไม่วาง Centroid</span>
                    )}
                  </>
                );
              })()
            ) : (
              (() => {
                const mean = means[active.index];
                const centroid = centroids[active.index];
                if (!mean || !centroid) return null;

                return (
                  <>
                    <strong className="block text-xs">
                      {centroid.id} ({kmNumber(centroid.x)},{" "}
                      {kmNumber(centroid.y)})
                    </strong>
                    <span className="block">
                      สมาชิกจากรอบแรก: {mean.members.length} จุด
                    </span>
                    <span className="block">
                      {mean.members.map((p) => p.id).join(", ") || "ไม่มี"}
                    </span>
                    <span className="mt-1 block font-mono">
                      C′ = (Σx/n, Σy/n)
                    </span>
                    {mean.members.length > 0 && (
                      <span className="block">
                        ค่าเฉลี่ย → ({kmNumber(mean.x)},{" "}
                        {kmNumber(mean.y)})
                      </span>
                    )}
                  </>
                );
              })()
            )}
          </div>
        )}
      </div>

      <p className="mt-2 text-center text-xs text-[var(--color-ink-subtle)]">
        {step === 4
          ? "สีพื้น = เขตของ Centroid ที่ใกล้ที่สุด · แตะจุดหรือ Centroid เพื่อดูรายละเอียด"
          : round2
            ? "สีพื้น = แนวครอบสมาชิกจากรอบแรก; ยังไม่ได้จัดกลุ่มใหม่ · รูปเส้นประ = ตำแหน่งเดิม"
            : step >= 2
              ? "เส้นประแสดงเส้นทางระยะของจุดที่เลือก · แตะจุดเพื่อเปลี่ยนตัวอย่าง"
              : "แตะจุดหรือ Centroid เพื่อดูรายละเอียด"}
      </p>

      {step >= 2 && step <= 4 && (
        <div className="mt-4 min-w-0">
          <button
            type="button"
            aria-controls={`${uid}-table`}
            aria-expanded={showTable}
            onClick={() => setShowTable((value) => !value)}
            className="rounded-md border border-[var(--color-rule-strong)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface-hover)] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>{showTable ? "ซ่อน" : "แสดง"}ตารางคำนวณระยะ</span>
            <span className="text-[10px] text-[var(--color-ink-subtle)]">{showTable ? "▲" : "▼"}</span>
          </button>

          <AnimatePresence initial={false}>
            {showTable && (
              <motion.div
                id={`${uid}-table`}
                initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="mt-2 min-w-0 overflow-hidden"
              >
                <div className="overflow-x-auto pb-1">
                  <table className="w-full table-fixed border-collapse font-mono text-[11px] tabular-nums text-[var(--color-ink)] sm:text-xs">
                    <caption className="sr-only">
                      ระยะของทุกจุดถึง Centroid เริ่มต้น; ช่องสีเขียวคือระยะต่ำสุด
                    </caption>
                    <thead>
                      <tr className="border-b border-[var(--color-rule-strong)] text-[var(--color-ink-muted)]">
                        <th scope="col" className="w-[18%] py-1 text-left">
                          จุด
                        </th>
                        {visual.initialCentroids.map((centroid) => (
                          <th
                            key={centroid.id}
                            scope="col"
                            className="w-[20%] py-1 text-center"
                          >
                            {centroid.id}
                          </th>
                        ))}
                        <th scope="col" className="py-1 text-center">
                          เลือก
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr
                          key={row.point.id}
                          className="border-b border-[var(--color-rule)]"
                          style={{
                            backgroundColor:
                              active?.kind === "point" &&
                              active.index === index
                                ? "var(--color-accent-wash)"
                                : undefined,
                          }}
                        >
                          <th scope="row" className="text-left font-semibold">
                            <button
                              type="button"
                              aria-label={`ดูระยะของ ${row.point.id}`}
                              onPointerEnter={() =>
                                setHovered({ kind: "point", index })
                              }
                              onPointerLeave={() => setHovered(null)}
                              onFocus={() =>
                                setHovered({ kind: "point", index })
                              }
                              onBlur={() => setHovered(null)}
                              onClick={() =>
                                togglePin({ kind: "point", index })
                              }
                              className="min-h-9 rounded px-0.5 text-left underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                            >
                              {row.point.id}
                              {row.ties.length > 1 && (
                                <span className="ml-0.5 text-[var(--color-warn)]">
                                  !
                                </span>
                              )}
                            </button>
                          </th>
                          {row.distances.map((distance, centroidIndex) => {
                            const isMinimum = row.ties.includes(centroidIndex);
                            return (
                              <td
                                key={centroidIndex}
                                className="px-0.5 py-1 text-center"
                                style={
                                  isMinimum
                                    ? {
                                        color: "var(--color-good)",
                                        fontWeight: 700,
                                        backgroundColor:
                                          "color-mix(in srgb, var(--color-good) 12%, transparent)",
                                      }
                                    : undefined
                                }
                              >
                                {kmNumber(distance)}
                              </td>
                            );
                          })}
                          <td className="py-1 text-center font-semibold">
                            {visual.initialCentroids[row.best].id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {step >= 2 && (
        <aside className="mt-3 rounded-lg border border-[var(--color-warn)] bg-[var(--color-surface)] p-3 text-xs leading-relaxed text-[var(--color-ink)]">
          {actualTies.length > 0 ? (
            <>
              <strong className="text-[var(--color-warn)]">
                ระวังระยะเสมอ:
              </strong>{" "}
              {actualTies.map((row) => (
                <span key={row.point.id} className="block">
                  {row.point.id}: d = {kmNumber(row.distances[row.best])}{" "}
                  ถึง{" "}
                  {row.ties
                    .map((index) => visual.initialCentroids[index].id)
                    .join(" และ ")}{" "}
                  → เลือก {visual.initialCentroids[row.best].id}{" "}
                  (ดัชนีต่ำสุด)
                </span>
              ))}
            </>
          ) : (
            <>
              <strong className="text-[var(--color-warn)]">
                ตรวจโจทย์เรื่องระยะเสมอ:
              </strong>{" "}
              ข้อมูลชุดนี้ไม่มีจุดที่ระยะต่ำสุดเสมอกัน
              {a5 && visual.initialCentroids.length >= 2 && (
                <>
                  {" "}
                  A5 ห่างจาก C1 = {kmNumber(a5.distances[0])} และ C2 ={" "}
                  {kmNumber(a5.distances[1])} ในรอบแรก
                </>
              )}
              . ถ้าระยะต่ำสุดเสมอ ให้เลือก Centroid ดัชนีต่ำสุด
              {a5?.point.x === 7 && a5.point.y === 5 && (
                <span className="mt-1 block">
                  ตัวอย่างสมมติแยกจากภาพ: หาก C1 = (5, 5) และ C2 =
                  (7, 7), A5 จะห่างทั้งคู่ 2 → เลือก C1
                </span>
              )}
            </>
          )}
        </aside>
      )}

      {showAssignment && (
        <ul className="mt-4 grid gap-1.5 text-sm">
          {means.map((mean, index) => (
            <li key={mean.id} className="flex min-w-0 items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  background: KM_COLORS[index % KM_COLORS.length],
                }}
              />
              <span className="font-mono text-[var(--color-ink)]">
                {mean.id}
              </span>
              <span className="min-w-0 text-[var(--color-ink-muted)]">
                {"{ "}
                {mean.members.map((point) => point.id).join(", ")}
                {" }"}
              </span>
            </li>
          ))}
        </ul>
      )}

      {round2 && (
        <Insight>
          <p className="mb-2">
            Centroid ใหม่ = ค่าเฉลี่ยพิกัดของสมาชิกจากรอบแรก
          </p>
          <div className="space-y-1.5">
            {means.map((mean, index) => {
              if (!mean.members.length) {
                return (
                  <p key={mean.id} className="text-sm">
                    {mean.id}: ไม่มีสมาชิก จึงคงตำแหน่งเดิม
                  </p>
                );
              }
              const xSum = mean.members.reduce((s, p) => s + p.x, 0);
              const ySum = mean.members.reduce((s, p) => s + p.y, 0);
              const n = mean.members.length;
              const fraction =
                n > 1
                  ? ` = \\left(\\tfrac{${xSum}}{${n}},\\ \\tfrac{${ySum}}{${n}}\\right)`
                  : "";

              return (
                <Tex
                  key={mean.id}
                  className="block"
                  tex={`${mean.id} = C_{${index + 1}}^{(2)} = \\left(\\tfrac{${mean.members.map((p) => p.x).join("+")}}{${n}},\\ \\tfrac{${mean.members.map((p) => p.y).join("+")}}{${n}}\\right)${fraction} = \\ans{(${kmNumber(mean.x)},\\ ${kmNumber(mean.y)})}`}
                />
              );
            })}
          </div>
        </Insight>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Confusion matrix                                                    */
/* ------------------------------------------------------------------ */

type MetricKey = "accuracy" | "precision" | "recall" | "f1";
type Cell = "tp" | "fn" | "fp" | "tn";

const MATRIX_FOCUS: Partial<Record<number, MetricKey>> = { 3: "accuracy", 4: "recall", 5: "f1" };
const CELLS_FOR: Record<MetricKey, Cell[]> = {
  accuracy: ["tp", "tn"], precision: ["tp", "fp"], recall: ["tp", "fn"], f1: ["tp", "fp", "fn"],
};

const BQ_CHURN_INFO: Record<Cell, { title: string; desc: string; impact: string; tone: "mint" | "ink" | "amber" | "rose" }> = {
  tp: {
    title: "TP (True Positive) · ตามถูกคน",
    desc: "ลูกค้าจะ Inactive จริง และโมเดลทายว่าจะ Inactive → ทีมการตลาดส่งข้อเสนอ/โปรโมชั่น Retention ดึงลูกค้าไว้ได้ทันเวลา",
    impact: "รักษาลูกค้าและปกป้องรายได้ LTV",
    tone: "mint",
  },
  tn: {
    title: "TN (True Negative) · ปกติสุข",
    desc: "ลูกค้ายัง Active อยู่ และโมเดลทายว่า Active → ปล่อยให้ใช้งานตามปกติ ไม่ต้องส่งโปรโมชั่นไปรบกวน",
    impact: "ประหยัดงบประมาณแคมเปญ",
    tone: "ink",
  },
  fp: {
    title: "FP (False Positive) · เปลืองงบ (Type I)",
    desc: "ลูกค้ายัง Active ปกติ แต่โมเดลทายว่าจะเลิก → ส่งส่วนลดให้ลูกค้าที่พร้อมจ่ายราคาเต็มอยู่แล้ว เสียกำไรฟรี",
    impact: "เปลืองงบการตลาด (คุมด้วย High Precision)",
    tone: "amber",
  },
  fn: {
    title: "FN (False Negative) · เสียลูกค้าถาวร! (Type II)",
    desc: "ลูกค้ากำลังจะเลิกจริง แต่โมเดลทายว่าปกติ → ไม่ได้เข้าไปดูแล ลูกค้า Churn หนีไปหาคู่แข่งถาวร เสียหายหนักที่สุด!",
    impact: "สูญเสียลูกค้าถาวร (คุมด้วย High Recall)",
    tone: "rose",
  },
};

function MatrixPanel({ visual, step }: PanelProps<"confusion-matrix">) {
  const [activeBQCell, setActiveBQCell] = useState<Cell | null>(null);
  const [caseMode, setCaseMode] = useState<"fifa" | "churn">("fifa");

  const isChurn = caseMode === "churn";
  const tp = isChurn ? 3 : visual.tp;
  const fp = isChurn ? 2 : visual.fp;
  const fn = isChurn ? 2 : visual.fn;
  const tn = isChurn ? 3 : visual.tn;
  const pos = isChurn ? "Inactive (เลิก)" : visual.positiveLabel;
  const neg = isChurn ? "Active (ยังอยู่)" : `ไม่ใช่ ${visual.positiveLabel}`;

  const n = tp + fp + fn + tn;
  const showNumbers = isChurn || step >= 1;
  const focus = isChurn ? null : MATRIX_FOCUS[step];
  const P = (tp + fp > 0) ? tp / (tp + fp) : 0;
  const R = (tp + fn > 0) ? tp / (tp + fn) : 0;
  const F1 = (P + R > 0) ? (2 * P * R) / (P + R) : 0;
  const A = n > 0 ? (tp + tn) / n : 0;

  const metrics: Record<MetricKey, { label: string; value: number; tex: string }> = {
    accuracy: { label: "Accuracy", value: A, tex: `\\text{Accuracy} = \\dfrac{TP+TN}{N} = \\dfrac{${tp}+${tn}}{${n}} = \\ans{${fmt(A, 3)}}` },
    precision: { label: "Precision", value: P, tex: `\\text{Precision} = \\dfrac{TP}{TP+FP} = \\dfrac{${tp}}{${tp}+${fp}} = \\ans{${fmt(P, 3)}}` },
    recall: { label: "Recall", value: R, tex: `\\text{Recall} = \\dfrac{TP}{TP+FN} = \\dfrac{${tp}}{${tp}+${fn}} = \\ans{${fmt(R, 3)}}` },
    f1: { label: "F1", value: F1, tex: `F_1 = 2\\cdot\\dfrac{P\\cdot R}{P+R} = 2\\cdot\\dfrac{${fmt(P, 3)}\\cdot ${fmt(R, 3)}}{${fmt(P, 3)}+${fmt(R, 3)}} = \\ans{${fmt(F1, 3)}}` },
  };

  const cell = (k: Cell, desc: string, bqDesc: string) => {
    const on = focus ? CELLS_FOR[focus].includes(k) : activeBQCell === k;
    const isSelected = activeBQCell === k;
    return (
      <button
        type="button"
        onClick={() => setActiveBQCell(activeBQCell === k ? null : k)}
        className={`group text-left rounded-lg border p-3 transition-all duration-200 cursor-pointer ${
          isSelected
            ? "ring-2 ring-accent border-accent bg-accent-wash shadow-xs"
            : on
            ? "border-accent bg-accent-wash"
            : "border-rule bg-surface hover:border-rule-strong hover:bg-surface-raised"
        } ${focus && !on ? "opacity-40" : ""}`}
      >
        <div className="flex items-baseline justify-between gap-1">
          <span className="font-mono text-xs font-semibold text-ink">{k.toUpperCase()}</span>
          <span className="text-[10px] text-ink-subtle truncate">{isChurn ? bqDesc : desc}</span>
        </div>
        <p className="num mt-1 font-mono text-2xl sm:text-3xl font-semibold text-ink">
          {showNumbers ? (isChurn ? (k === "tp" ? 3 : k === "fp" ? 2 : k === "fn" ? 2 : 3) : visual[k]) : "–"}
        </p>
        <span className="mt-1 block text-[10px] text-accent-ink opacity-0 group-hover:opacity-100 transition-opacity">
          คลิกดู BQ 💡
        </span>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <PanelHead
        title="Confusion Matrix & BQ Meaning"
        sub={`แถว = ค่าจริง · คอลัมน์ = ค่าที่ทาย · Positive = ${pos}`}
        right={
          <div className="inline-flex rounded-lg border border-rule bg-surface-raised p-0.5 text-xs shadow-xs">
            <button
              type="button"
              onClick={() => { setCaseMode("fifa"); setActiveBQCell(null); }}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                caseMode === "fifa"
                  ? "bg-accent text-on-accent shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              ⚽ เคส FIFA (สไลด์)
            </button>
            <button
              type="button"
              onClick={() => { setCaseMode("churn"); setActiveBQCell(null); }}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                caseMode === "churn"
                  ? "bg-accent text-on-accent shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              👥 BQ ลูกค้า Inactive (HW01)
            </button>
          </div>
        }
      />

      {/* 2x2 Table */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-2 text-xs">
        <span />
        <span className="text-center font-medium text-ink-subtle">ทาย {pos}</span>
        <span className="text-center font-medium text-ink-subtle">ทาย {neg}</span>
        <span className="self-center pr-1 text-ink-subtle">จริง {pos}</span>
        {cell("tp", "ถูก", "ตามถูกคน")}
        {cell("fn", "พลาด", "พลาด! หลุดไป")}
        <span className="self-center pr-1 text-ink-subtle">จริง {neg}</span>
        {cell("fp", "เตือนผิด", "เตือนเกิน (แจกโปรมั่ว)")}
        {cell("tn", "ถูก", "ปกติ (ยังใช้ต่อ)")}
      </div>

      {showNumbers ? (
        <ul className="mt-4 space-y-2">
          {(Object.keys(metrics) as MetricKey[]).map((k) => {
            const m = metrics[k];
            const on = focus === k;
            return (
              <li key={k} className="grid grid-cols-[5.5rem_minmax(0,1fr)_3.5rem] items-center gap-3 text-sm">
                <span className={on ? "font-semibold text-ink" : "text-ink-muted"}>{m.label}</span>
                <span className="h-2 overflow-hidden rounded-full bg-rule">
                  <span className={`block h-full rounded-full transition-[width] duration-500 ${on ? "bg-accent" : "bg-rule-strong"}`}
                    style={{ width: `${Math.max(0, Math.min(1, m.value)) * 100}%` }} />
                </span>
                <span className={`num text-right font-mono ${on ? "font-semibold text-ink" : "text-ink-muted"}`}>
                  {(m.value * 100).toFixed(1)}%
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}

      <Insight>
        {focus ? (
          <Tex tex={metrics[focus].tex} />
        ) : showNumbers ? (
          <>
            N = {n} · จริง {pos} = {tp + fn} · จริง {neg} = {fp + tn}
            {isChurn && <span className="block mt-1 text-xs text-ink-muted">ทั้ง 4 มาตรวัดได้ 60.0% เท่ากัน เพราะ TP = FP = FN ในโจทย์สไลด์ 26</span>}
          </>
        ) : (
          <>กำหนดก่อนเสมอว่า <strong>{pos}</strong> คือ Positive — ถ้าสลับฝั่ง Precision และ Recall จะเปลี่ยนทั้งหมด</>
        )}
      </Insight>

      {/* Business Question (BQ) Deep Dive Card */}
      <section className="rounded-xl border border-rule bg-surface-raised p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-accent-ink">
              ความหมายเชิงธุรกิจ (BQ: Customer Inactivity &amp; Churn)
            </span>
          </div>
          <span className="text-[10px] font-mono text-ink-subtle">Lect 07 Slide 26 &amp; 35 (HW#1, HW#2)</span>
        </div>

        <p className="text-xs text-ink-muted leading-relaxed">
          <strong>โจทย์ธุรกิจ (BQ):</strong> ธุรกิจต้องการตรวจจับลูกค้าที่กำลังจะหยุดใช้งาน (<strong>Inactive = Positive</strong>) เพื่อส่งทีมการตลาดเข้าไปดึงลูกค้าไว้ล่วงหน้า
        </p>

        {/* 4 Cell BQ Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {(["tp", "tn", "fp", "fn"] as Cell[]).map((k) => {
            const item = BQ_CHURN_INFO[k];
            const isHighlighted = activeBQCell === k;
            return (
              <div
                key={k}
                onClick={() => setActiveBQCell(activeBQCell === k ? null : k)}
                className={`rounded-lg border p-2.5 transition-all cursor-pointer ${
                  isHighlighted
                    ? "ring-2 ring-accent border-accent bg-accent-wash"
                    : k === "tp"
                    ? "border-mint/30 bg-mint-wash/60 hover:border-mint"
                    : k === "tn"
                    ? "border-rule bg-surface hover:border-rule-strong"
                    : k === "fp"
                    ? "border-amber/30 bg-amber-wash/60 hover:border-amber"
                    : "border-rose/30 bg-rose-wash/60 hover:border-rose"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${
                    k === "tp" ? "text-mint" : k === "tn" ? "text-ink" : k === "fp" ? "text-amber" : "text-rose"
                  }`}>
                    {item.title}
                  </span>
                  <span className="text-[10px] text-ink-subtle font-mono">{k.toUpperCase()}</span>
                </div>
                <p className="mt-1 text-ink-muted leading-relaxed">{item.desc}</p>
                <span className="mt-1.5 inline-block text-[10px] font-medium text-ink-subtle">
                  💼 ผลลัพธ์: {item.impact}
                </span>
              </div>
            );
          })}
        </div>

        {/* Decision & Trade-off Rule */}
        <div className="rounded-lg bg-surface-hover p-3 text-xs text-ink space-y-1.5 border border-rule/60">
          <p className="font-semibold text-ink">
            ⚖️ กฎการตัดสินใจเลือก Metric ตามโจทย์ธุรกิจ (Lect 07 Slide 35):
          </p>
          <ul className="list-disc pl-4 space-y-1 text-ink-muted">
            <li>
              <strong>กลัวเสียลูกค้าที่สุด (Cost of FN สูงมาก):</strong> ต้องเลือกโมเดลที่ <strong>Recall สูง</strong> (เช่น Model B = 90%) เพื่อกวาดคนเสี่ยงเลิกให้ครบที่สุด แม้จะมี False Alarm ติดมาบ้าง
            </li>
            <li>
              <strong>งบแคมเปญจำกัดมาก (Cost of FP สูงมาก):</strong> ต้องเลือกโมเดลที่ <strong>Precision สูง</strong> (เช่น Model A = 89%) เพื่อให้แน่ใจว่าคนที่ทักไปคือคนที่จะเลิกจริง ไม่แจกโปรโมชั่นมั่ว
            </li>
            <li>
              <strong>ต้องการความสมดุลทั้งสองฝั่ง:</strong> ใช้ <strong>F1-Score</strong> (เช่น Model C = 81%, Accuracy 85%) ที่บาลานซ์ระหว่าง Precision กับ Recall
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Decision tree                                                       */
/* ------------------------------------------------------------------ */

function DecisionTreePanel({ visual, step }: PanelProps<"decision-tree">) {
  const shown = visual.splits.slice(0, step >= 3 ? 2 : step >= 1 ? 1 : 0);
  const showWinner = step >= 4;
  const winner = visual.splits.reduce((b, s, i, arr) => (s.gain > arr[b].gain ? i : b), 0);
  const n = visual.splits[0] ? visual.splits[0].nLeft + visual.splits[0].nRight : undefined;

  return (
    <div>
      <PanelHead
        title="Decision Tree: เปรียบเทียบ Candidate Splits"
        sub="Lect 05 · จุดแบ่งและ Gini Gain"
      />

      <div className="mx-auto max-w-xs rounded-xl border border-rule bg-surface-hover px-4 py-3 text-center">
        <p className="text-xs text-ink-subtle">โหนดแม่ (Root)</p>
        <p className="num font-mono text-sm text-ink">
          {n !== undefined ? `n = ${n} · ` : ""}Gini = {fmt(visual.rootGini, 3)}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {shown.length === 0 ? (
          <p className="rounded-lg border border-dashed border-rule-strong px-4 py-6 text-center text-sm text-ink-subtle">
            เลื่อนต่อเพื่อดู Candidate Split
          </p>
        ) : null}
        {shown.map((s, i) => {
          const isWinner = showWinner && i === winner;
          const total = s.nLeft + s.nRight;
          return (
            <article key={s.feature} className={`rounded-xl border p-4 transition-colors ${isWinner ? "border-accent bg-accent-wash" : "border-rule bg-surface"}`}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate font-mono text-sm font-semibold text-ink">{s.feature}</p>
                {isWinner ? <span className="shrink-0 text-xs font-semibold text-accent-ink">เลือก split นี้</span> : null}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
                {[{ t: "ซ้าย", n: s.nLeft, g: s.giniLeft }, { t: "ขวา", n: s.nRight, g: s.giniRight }].map((c) => (
                  <div key={c.t} className="rounded-lg border border-rule bg-surface px-2 py-2">
                    <p className="text-ink-subtle">{c.t} · n = {c.n}</p>
                    <p className="num font-mono text-sm text-ink">Gini {fmt(c.g, 3)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1 overflow-x-auto text-sm text-ink">
                <Tex className="block" tex={`\\text{Weighted} = \\tfrac{${s.nLeft}}{${total}}(${fmt(s.giniLeft, 3)}) + \\tfrac{${s.nRight}}{${total}}(${fmt(s.giniRight, 3)}) = ${fmt(s.weightedGini, 3)}`} />
                <Tex className="block" tex={`\\Delta = ${fmt(visual.rootGini, 3)} - ${fmt(s.weightedGini, 3)} = \\ans{${fmt(s.gain, 3)}}`} />
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-rule" aria-hidden>
                <div className={`h-full rounded-full transition-[width] duration-500 ${isWinner ? "bg-accent" : "bg-rule-strong"}`}
                  style={{ width: `${visual.rootGini > 0 ? (s.gain / visual.rootGini) * 100 : 0}%` }} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Boxplot                                                             */
/* ------------------------------------------------------------------ */

function BoxplotPanel({ visual, step }: PanelProps<"boxplot">) {
  const { q1, q3, median, min, max } = visual;
  const outliers = ("outliers" in visual && Array.isArray(visual.outliers) ? visual.outliers : []) as number[];
  const iqr = q3 - q1, lf = q1 - 1.5 * iqr, uf = q3 + 1.5 * iqr;
  const showIQR = step >= 1, showFences = step >= 2, showWhisker = step >= 3, showOut = step >= 4;

  // Whisker ends at the most extreme non-outlier data point within fences.
  // When outliers exist, max in the 5-number summary could include the outlier (e.g. 58),
  // but whisker must clamp to the largest value within fence (50).
  const whiskerLeft = min < lf ? lf : min;
  const whiskerRight = outliers.length > 0 ? (max > uf ? 50 : max) : max;

  const lo = Math.min(min, lf, ...outliers), hi = Math.max(max, uf, ...outliers);
  const pad = (hi - lo) * 0.05 || 1;
  const W = 320, MID = 52;
  const x = (v: number) => 14 + ((v - (lo - pad)) / (hi - lo + 2 * pad)) * (W - 28);

  return (
    <div>
      <PanelHead title="Boxplot และรั้วของ Tukey" sub={`IQR = ${fmt(iqr)}`} />

      <svg viewBox={`0 0 ${W} 104`} className="w-full" role="img" aria-label="Boxplot">
        {showFences &&
          [{ v: lf, t: "LF" }, { v: uf, t: "UF" }].map((f) => (
            <g key={f.t}>
              <line x1={x(f.v)} x2={x(f.v)} y1={20} y2={82} stroke="var(--color-warn)" strokeDasharray="3 3" />
              <text x={x(f.v)} y={13} textAnchor="middle" fontSize="9" fill="var(--color-warn)" className="font-mono">{f.t} {fmt(f.v, 2)}</text>
            </g>
          ))}
        <line x1={x(whiskerLeft)} x2={x(q1)} y1={MID} y2={MID} stroke="var(--color-ink)" />
        <line x1={x(q3)} x2={x(whiskerRight)} y1={MID} y2={MID}
          stroke={showWhisker ? "var(--color-accent)" : "var(--color-ink)"} strokeWidth={showWhisker ? 2 : 1} />
        {[whiskerLeft, whiskerRight].map((v) => <line key={v} x1={x(v)} x2={x(v)} y1={MID - 7} y2={MID + 7} stroke="var(--color-ink)" />)}
        <rect x={x(q1)} y={MID - 13} width={Math.max(1, x(q3) - x(q1))} height={26} rx={3}
          fill={showIQR ? "var(--color-accent-wash)" : "var(--color-surface)"}
          stroke={showIQR ? "var(--color-accent)" : "var(--color-ink)"} style={{ transition: "fill 300ms, stroke 300ms" }} />
        <line x1={x(median)} x2={x(median)} y1={MID - 13} y2={MID + 13} stroke="var(--color-accent)" strokeWidth={2} />
        {showOut &&
          outliers.map((o) => (
            <g key={o}>
              <circle cx={x(o)} cy={MID} r={4} fill="var(--color-bad)" />
              <text x={x(o)} y={MID + 20} textAnchor="middle" fontSize="9" fill="var(--color-bad)" className="font-mono">{o}</text>
            </g>
          ))}
        {[{ v: q1, t: "Q₁" }, { v: median, t: "Med" }, { v: q3, t: "Q₃" }].map((q) => (
          <text key={q.t} x={x(q.v)} y={98} textAnchor="middle" fontSize="9" fill="var(--color-ink-subtle)" className="font-mono">{q.t}</text>
        ))}
      </svg>

      <dl className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
        {[["Min", min], ["Q₁", q1], ["Median", median], ["Q₃", q3], ["Max", max]].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-rule py-2">
            <dt className="text-ink-subtle">{k}</dt>
            <dd className="num font-mono text-sm text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <Insight>
        {showOut ? (
          <>
            <Tex tex={`${outliers.map(String).join(", ") || "\\varnothing"} > \\text{UF} = ${fmt(uf)}`} /> — เป็น Outlier
            ต้องพล็อตเป็นจุดแยก
          </>
        ) : showWhisker ? (
          <>Whisker ขวาจบที่ <strong>{max}</strong> ซึ่งเป็นค่าจริงสูงสุดที่ยังอยู่ในรั้ว — ไม่ได้ลากไปถึง UF ({fmt(uf)})</>
        ) : showFences ? (
          <Tex tex={`\\text{UF} = Q_3 + 1.5\\times\\mathrm{IQR} = ${q3} + ${fmt(1.5 * iqr)} = \\ans{${fmt(uf)}}`} />
        ) : showIQR ? (
          <Tex tex={`\\mathrm{IQR} = Q_3 - Q_1 = ${q3} - ${q1} = \\ans{${fmt(iqr)}}`} />
        ) : (
          <>อ่านค่าจากโจทย์: Q₁ = {q1}, Median = {median}, Q₃ = {q3}</>
        )}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SHAP — waterfall                                                   */
/* ------------------------------------------------------------------ */

function ShapTrack({ baseLeft, children }: { baseLeft: number; children?: ReactNode }) {
  return (
    <div className="relative h-6 rounded bg-paper">
      <div className="absolute inset-y-0 w-px bg-rule-strong" style={{ left: `${baseLeft}%` }} />
      {children}
    </div>
  );
}

const EP05_FEATURES = [
  { feature: "ไม่ได้ซื้อสินค้านาน (> 45 วัน)", value: 29 },
  { feature: "ประวัติร้องเรียนบริการ", value: 12 },
  { feature: "ยอดซื้อสะสมสูง", value: -8 },
];

function ShapForcePanel({ visual, step }: PanelProps<"shap-force">) {
  const base = visual.baseValue;
  const allContributions = visual.contributions.length >= 3 ? visual.contributions : EP05_FEATURES;

  let run = base;
  const rows = allContributions.map((c) => {
    const from = run;
    run += c.value;
    return { ...c, from, to: run };
  });
  const ends = [base, ...rows.map((r) => r.to)];

  // Stable scale bounds across all steps so the track and Base Value guideline
  // remain stationary, allowing f(x) to slide smoothly across the track.
  const minVal = Math.min(20, base, ...ends);
  const maxVal = Math.max(85, base, ...ends);
  const pad = (maxVal - minVal) * 0.05;
  const lo = minVal - pad;
  const hi = maxVal + pad;
  const pos = (v: number) => Math.max(0, Math.min(100, ((v - lo) / (hi - lo)) * 100));

  // Number of active features in the current step
  const activeCount = visual.contributions.length || Math.min(rows.length, step);
  const shown = rows.slice(0, activeCount);
  const pred = visual.prediction ?? (shown.length ? shown[shown.length - 1].to : base);
  const up = "var(--color-good)", down = "var(--color-bad)";

  const gridCols = "grid-cols-[minmax(0,11.5rem)_minmax(0,1fr)_3.25rem]";

  return (
    <div>
      <PanelHead title="SHAP: ฟีเจอร์ไหนดันผลทำนาย" sub="Lect 09 · หน่วยเป็นจุดเปอร์เซ็นต์" />

      <div className="space-y-2 text-sm">
        <div key="base-row" className={`grid ${gridCols} items-center gap-3`}>
          <span className="text-ink-muted">Base value</span>
          <ShapTrack baseLeft={pos(base)}>
            <div className="absolute inset-y-1 w-1 -translate-x-1/2 rounded-sm bg-ink-subtle" style={{ left: `${pos(base)}%` }} />
          </ShapTrack>
          <span className="num text-right font-mono text-ink">{fmt(base, 2)}</span>
        </div>

        {/* Fixed space for upper bar group: pre-allocated slots so height stays fixed across frames */}
        <div key="features-container" className="space-y-2">
          {rows.map((r, i) => {
            const isActive = i < activeCount;
            return (
              <div
                key={r.feature}
                className={`grid ${gridCols} items-center gap-3 transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-35"
                }`}
              >
                <span className={`truncate ${isActive ? "text-ink" : "text-ink-muted"}`} title={r.feature}>
                  {r.feature}
                </span>
                <ShapTrack baseLeft={pos(base)}>
                  {isActive ? (
                    <div
                      className="absolute inset-y-1 rounded-sm"
                      style={{
                        left: `${pos(Math.min(r.from, r.to))}%`,
                        width: `${Math.abs(pos(r.to) - pos(r.from))}%`,
                        background: r.value >= 0 ? up : down,
                      }}
                    />
                  ) : null}
                </ShapTrack>
                <span
                  className="num text-right font-mono"
                  style={{ color: isActive ? (r.value >= 0 ? up : down) : "var(--color-ink-subtle)" }}
                >
                  {isActive ? `${r.value >= 0 ? "+" : "−"}${fmt(Math.abs(r.value), 2)}` : "—"}
                </span>
              </div>
            );
          })}
        </div>

        <div key="fx-row" className={`grid ${gridCols} items-center gap-3 border-t border-rule pt-2`}>
          <span className="font-semibold text-ink">f(x)</span>
          <ShapTrack baseLeft={pos(base)}>
            <div
              className="absolute inset-y-0.5 w-1.5 -translate-x-1/2 rounded-sm bg-accent shadow-xs z-10"
              style={{
                left: `${pos(pred)}%`,
                transition: "left 500ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                willChange: "left",
              }}
            />
          </ShapTrack>
          <span className="num text-right font-mono font-semibold text-ink">{fmt(pred, 2)}</span>
        </div>
      </div>

      <Insight>
        {activeCount === 0 ? (
          <>เริ่มจากค่าเฉลี่ยของประชากร (Base value = {fmt(base, 2)}) แล้วแต่ละฟีเจอร์จะดันขึ้นหรือฉุดลง</>
        ) : (
          <Tex tex={`f(x) = ${fmt(base, 2)} ${shown.map((c) => (c.value >= 0 ? `+ ${fmt(c.value, 2)}` : `- ${fmt(Math.abs(c.value), 2)}`)).join(" ")} = \\ans{${fmt(pred, 2)}}`} />
        )}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Concept drift                                                       */
/* ------------------------------------------------------------------ */

const DRIFT_THRESHOLD = 70;
const DRIFT_EXAMPLE = { rule: "ไม่ซื้อเกิน 45 วัน", before: 68, after: 31 };

function ConceptDriftPanel({ visual, step }: PanelProps<"concept-drift">) {
  const tl = visual.timeline;
  const visible = Math.max(1, Math.min(tl.length, step + 1));
  const current = tl[visible - 1];
  const degraded = current.accuracy < DRIFT_THRESHOLD;

  const W = 320, H = 190, L = 34, R = 10, T = 12, B = 26;
  const lo = Math.min(50, ...tl.map((p) => p.accuracy)), hi = 100;
  const sx = (i: number) => L + (tl.length > 1 ? i / (tl.length - 1) : 0.5) * (W - L - R);
  const sy = (v: number) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const path = tl.slice(0, visible).map((p, i) => `${i ? "L" : "M"}${sx(i)} ${sy(p.accuracy)}`).join(" ");

  return (
    <div>
      <PanelHead title="Concept Drift" sub="Lect 09 · ความแม่นยำของโมเดลตามเวลา"
        right={<span className={`num font-mono text-sm ${degraded ? "text-bad" : "text-ink"}`}>{current.accuracy}%</span>} />

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
        aria-label={`ความแม่นยำ ณ T${current.t} = ${current.accuracy}%${degraded ? " ต่ำกว่าเกณฑ์" : ""}`}>
        {[50, 60, 70, 80, 90, 100].filter((v) => v >= lo).map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={sy(v)} y2={sy(v)} stroke="var(--color-rule)" strokeWidth={0.5} />
            <text x={L - 6} y={sy(v) + 3} textAnchor="end" fontSize="9" fill="var(--color-ink-subtle)" className="font-mono">{v}</text>
          </g>
        ))}
        {tl.map((p, i) => (
          <text key={p.t} x={sx(i)} y={H - 8} textAnchor="middle" fontSize="9" fill="var(--color-ink-subtle)" className="font-mono">T{p.t}</text>
        ))}
        <line x1={L} x2={W - R} y1={sy(DRIFT_THRESHOLD)} y2={sy(DRIFT_THRESHOLD)} stroke="var(--color-bad)" strokeDasharray="4 3" />
        <text x={W - R} y={sy(DRIFT_THRESHOLD) - 4} textAnchor="end" fontSize="9" fill="var(--color-bad)">เกณฑ์ {DRIFT_THRESHOLD}%</text>
        <path d={path} fill="none" stroke="var(--color-accent)" strokeWidth={2} strokeLinejoin="round" />
        {tl.slice(0, visible).map((p, i) => (
          <circle key={p.t} cx={sx(i)} cy={sy(p.accuracy)} r={i === visible - 1 ? 5 : 3}
            fill={p.accuracy < DRIFT_THRESHOLD ? "var(--color-bad)" : "var(--color-accent)"}
            stroke="var(--color-surface)" strokeWidth={1.5} />
        ))}
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg border border-rule px-3 py-2">
          <p className="text-xs text-ink-subtle">ตอนเทรน · {DRIFT_EXAMPLE.rule}</p>
          <p className="num font-mono text-ink">Inactive = {DRIFT_EXAMPLE.before}%</p>
        </div>
        <div className="rounded-lg border border-bad bg-bad-wash px-3 py-2">
          <p className="text-xs text-ink-subtle">โลกจริงตอนนี้ · {DRIFT_EXAMPLE.rule}</p>
          <p className="num font-mono text-bad">Inactive = {DRIFT_EXAMPLE.after}%</p>
        </div>
      </div>

      <Insight>
        {current.note ? <p className="mb-1 font-semibold">{current.note}</p> : null}
        <span>
          <Tex tex="P(Y \mid X)" /> เปลี่ยนไปตามเวลา โมเดลที่เรียนจากอดีตจึงแม่นน้อยลง (Model Degradation) — ต้องเฝ้าดูและเทรนใหม่
        </span>
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Visual switch                                                       */
/* ------------------------------------------------------------------ */

function StepVisual({ visual, step }: { visual: EpisodeVisual; step: number }) {
  switch (visual.kind) {
    case "kmeans": return <KMeansPanel visual={visual} step={step} />;
    case "confusion-matrix": return <MatrixPanel visual={visual} step={step} />;
    case "decision-tree": return <DecisionTreePanel visual={visual} step={step} />;
    case "boxplot": return <BoxplotPanel visual={visual} step={step} />;
    case "shap-force": return <ShapForcePanel visual={visual} step={step} />;
    case "concept-drift": return <ConceptDriftPanel visual={visual} step={step} />;
    default: {
      const _never: never = visual;
      return _never;
    }
  }
}

/* ------------------------------------------------------------------ */
/* Player                                                              */
/* ------------------------------------------------------------------ */

export function EpisodePlayer({ episodes }: { episodes: Episode[] }) {
  const [epIdx, setEpIdx] = useState(0);
  const [active, setActive] = useState(0);
  const [sideTab, setSideTab] = useState<"visual" | "notes">("visual");
  const [workshopOpen, setWorkshopOpen] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  const ep = episodes[epIdx];
  const total = ep.steps.length;
  const current = ep.steps[active] ?? ep.steps[0];

  // Deep link: /player?ep=ep03 opens that episode (chapter bridge cards).
  useEffect(() => {
    const want = new URLSearchParams(window.location.search).get("ep");
    if (!want) return;
    const i = episodes.findIndex((e) => e.id === want);
    if (i >= 0) setEpIdx(i);
  }, [episodes]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    cardRefs.current.slice(0, total).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [epIdx, total]);

  const goTo = useCallback((i: number) => {
    const el = cardRefs.current[i];
    if (!el) return;
    setActive(i);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45 + 16;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const selectEpisode = (i: number) => {
    setEpIdx(i);
    setActive(0);
    rootRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <div ref={rootRef} className="scroll-mt-24 space-y-6">
      <nav aria-label="เลือกตอน" className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <ol className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
          {episodes.map((e, i) => (
            <li key={e.id}>
              <button type="button" onClick={() => selectEpisode(i)} aria-current={i === epIdx ? "page" : undefined}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  i === epIdx ? "border-accent bg-accent-wash text-accent-ink" : "border-rule text-ink-muted hover:border-rule-strong hover:text-ink"
                }`}>
                <span className="mr-1.5 font-mono text-xs">EP{e.index}</span>
                {e.title}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <header className="border-b border-rule pb-4">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">{ep.title}</h2>
        <p className="text-ink-muted">{ep.titleTh} · {ep.lectures.join(" · ")} · <span className="num">{total}</span> ขั้น</p>
      </header>

      {/* Workshop แยกออกมาไว้ข้างบนก่อนถึง step scrolling */}
      {ep.id === "ep02" && (
        <section
          aria-label="Gini Formula Interactive Workbench"
          className="rounded-2xl border border-rule bg-surface p-5 sm:p-7 shadow-xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-wash px-2.5 py-0.5 text-xs font-semibold text-accent-ink">
                Interactive Workshop
              </span>
              <h3 className="mt-1 text-lg font-semibold text-ink">🔬 Gini Impurity Formula Workbench</h3>
              <p className="text-xs text-ink-subtle">
                ทดลองคิดและคำนวณสูตร Gini ทีละสเต็ปใน Sandbox แบบโต้ตอบ ก่อนเข้าสู่บทเรียน Step-by-Step ด้านล่าง
              </p>
            </div>
            <button
              type="button"
              onClick={() => setWorkshopOpen((prev) => !prev)}
              className="rounded-lg border border-rule px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-rule-strong hover:text-ink transition-colors"
            >
              {workshopOpen ? "ซ่อน Workshop ▲" : "เปิด Workshop ▼"}
            </button>
          </div>
          {workshopOpen && (
            <div className="mt-5">
              <GiniWorkbench initialActive={6} initialInactive={6} />
            </div>
          )}
        </section>
      )}

      <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
        {/* Step cards */}
        <ol className="space-y-12 pb-[50vh]">
          {ep.steps.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.n} ref={(el) => { cardRefs.current[i] = el; }} data-step={i} className="relative pl-11">
                {i < total - 1 ? (
                  <span aria-hidden className={`absolute left-[13px] top-9 -bottom-11 w-px transition-colors ${i < active ? "bg-accent" : "bg-rule"}`} />
                ) : null}
                <button type="button" onClick={() => goTo(i)} aria-label={`ไปขั้นที่ ${s.n}`} aria-current={isActive ? "step" : undefined}
                  className={`absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border font-mono text-xs transition-colors ${
                    isActive ? "border-accent bg-accent text-on-accent"
                    : i < active ? "border-accent bg-surface text-accent-ink"
                    : "border-rule-strong bg-surface text-ink-subtle"
                  }`}>
                  {s.n}
                </button>

                <article className={`transition-opacity duration-300 ${isActive ? "" : "lg:opacity-60"}`}>
                  <h3 className="text-xl font-semibold leading-snug text-ink">{s.headline}</h3>
                  <p className="mt-2 text-[17px] leading-[1.8] text-ink-muted">{s.body}</p>

                  {s.numbers?.length ? (
                    <div className="mt-4 rounded-lg border border-rule bg-surface px-4 py-3">
                      <p className="mb-1.5 text-xs text-ink-subtle">ค่าที่ได้ในขั้นนี้</p>
                      <ul className="space-y-1 font-mono text-sm text-ink">
                        {s.numbers.map((num, k) => <li key={k} className="num">{num}</li>)}
                      </ul>
                    </div>
                  ) : null}

                  {/* Below lg every card carries its own visual + notes inline */}
                  <div className="mt-5 rounded-xl border border-rule bg-surface p-4 lg:hidden">
                    <StepVisual visual={s.visual} step={i} />
                    <div className="mt-6 border-t border-rule pt-5">
                      <ThinkingNotes episodeId={ep.id} stepIndex={i} />
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        {/* Sticky visual (desktop) */}
        <aside className="hidden lg:block" aria-label="แผนภาพของขั้นปัจจุบัน">
          <div className="sticky top-24 flex max-h-[calc(100vh-7rem)] flex-col rounded-xl border border-rule bg-surface">
            <div className="flex items-center justify-between gap-3 border-b border-rule px-5 py-3">
              <span className="num font-mono text-sm text-ink" aria-live="polite">ขั้น {active + 1} / {total}</span>
              <div className="flex gap-1">
                <button type="button" onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0} aria-label="ขั้นก่อนหน้า"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-rule text-ink-muted hover:text-ink disabled:opacity-30">
                  <ArrowUpIcon />
                </button>
                <button type="button" onClick={() => goTo(Math.min(total - 1, active + 1))} disabled={active === total - 1} aria-label="ขั้นถัดไป"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-on-accent hover:bg-accent-ink disabled:opacity-30">
                  <ArrowDownIcon />
                </button>
              </div>
            </div>
            <div className="flex gap-1 px-5 pt-3">
              {ep.steps.map((_, i) => (
                <button key={i} type="button" onClick={() => goTo(i)} aria-label={`ไปขั้นที่ ${i + 1}`}
                  className={`h-1 flex-1 rounded-full transition-colors ${i === active ? "bg-accent" : i < active ? "bg-rule-strong" : "bg-rule hover:bg-rule-strong"}`} />
              ))}
            </div>
            <div className="border-b border-rule px-5 pt-2">
              <div role="tablist" aria-label="โหมดการแสดงผล" className="flex gap-2">
                <button
                  type="button"
                  role="tab"
                  id="tab-visual"
                  aria-selected={sideTab === "visual"}
                  aria-controls="tabpanel-visual"
                  onClick={() => setSideTab("visual")}
                  className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                    sideTab === "visual"
                      ? "border-accent text-accent-ink"
                      : "border-transparent text-ink-subtle hover:text-ink"
                  }`}
                >
                  แผนภาพ (Visual)
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tab-notes"
                  aria-selected={sideTab === "notes"}
                  aria-controls="tabpanel-notes"
                  onClick={() => setSideTab("notes")}
                  className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                    sideTab === "notes"
                      ? "border-accent text-accent-ink"
                      : "border-transparent text-ink-subtle hover:text-ink"
                  }`}
                >
                  สรุปวิธีคิด & ทางลัด
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              <div
                id="tabpanel-visual"
                role="tabpanel"
                aria-labelledby="tab-visual"
                className={sideTab === "visual" ? "block" : "hidden"}
              >
                <StepVisual visual={current.visual} step={active} />
              </div>
              <div
                id="tabpanel-notes"
                role="tabpanel"
                aria-labelledby="tab-notes"
                className={sideTab === "notes" ? "block" : "hidden"}
              >
                <ThinkingNotes episodeId={ep.id} stepIndex={active} />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

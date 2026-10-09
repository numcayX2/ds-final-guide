"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Chart from "chart.js/auto";
import { SegmentedControl } from "@radix-ui/themes";
import type { Episode, EpisodeVisual } from "@/content/types";
import { ThinkingCartoonVisual } from "./thinking-cartoon-visual";

/* ------------------------------------------------------------------ */
/* Visual panels with step-linked reactive animations                   */
/* ------------------------------------------------------------------ */

const CLUSTER_COLOR = ["var(--accent)", "#10B981", "#6366F1"];

/* Slide-verified assignment (Lect 08 p.27): C1 {A1}, C2 {A3,A4,A5,A6,A8},
   C3 {A2,A7}. The Chart and Vectors views must render this same grouping —
   in the centroid-update steps members keep their cluster while centroids
   move to the recomputed means. */
const KMEANS_GROUPS: Record<string, string[]> = {
  C1: ["A1"],
  C2: ["A3", "A4", "A5", "A6", "A8"],
  C3: ["A2", "A7"],
};

function getChartTheme() {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "dark";

  return {
    isDark,
    text: isDark ? "#e0e0e1" : "#171613",
    muted: isDark ? "#a6a5a2" : "#55534b",
    subtle: isDark ? "#848685" : "#7c796e",
    grid: isDark ? "rgba(224, 224, 225, 0.12)" : "rgba(23, 22, 19, 0.10)",
    pointBorder: isDark ? "#322628" : "#fdfcf8",
    accent: isDark ? "#d26e41" : "#e8490f",
    accentWash: isDark ? "rgba(210, 110, 65, 0.16)" : "rgba(232, 73, 15, 0.10)",
    mint: isDark ? "#4fa565" : "#31703c",
    mintWash: isDark ? "rgba(79, 165, 101, 0.16)" : "rgba(49, 112, 60, 0.10)",
    rose: isDark ? "#e0524c" : "#c03030",
    roseWash: isDark ? "rgba(224, 82, 76, 0.16)" : "rgba(192, 48, 48, 0.10)",
    amber: isDark ? "#c98a2e" : "#8f5f0a",
    purple: isDark ? "#8aa3c2" : "#3f5470",
    purpleWash: isDark ? "rgba(138, 163, 194, 0.16)" : "rgba(63, 84, 112, 0.10)",
  };
}

function KMeansChart({
  visual,
  stepIndex,
}: {
  visual: Extract<EpisodeVisual, { kind: "kmeans" }>;
  stepIndex: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const showCentroids = stepIndex >= 1;
  const showAssignment = stepIndex >= 4;
  const isRound2 = stepIndex >= 5;

  const activeCentroids = isRound2
    ? [
        { id: "C1", x: 2, y: 10 },
        { id: "C2", x: 6, y: 6 },
        { id: "C3", x: 1.5, y: 3.5 },
      ]
    : visual.initialCentroids;

  useEffect(() => {
    if (!canvasRef.current) return;
    const theme = getChartTheme();

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const unassigned: { x: number; y: number; label: string }[] = [];
    const datasets: any[] = [];

    if (!showAssignment) {
      visual.points.forEach((p) => unassigned.push({ x: p.x, y: p.y, label: p.id }));
      datasets.push({
        label: "จุดข้อมูลตั้งต้น (Unassigned)",
        data: unassigned,
        backgroundColor: theme.text,
        borderColor: "transparent",
        pointRadius: 6,
      });
    } else {
      const clusterThemes = [theme.accent, theme.mint, theme.purple];
      Object.entries(KMEANS_GROUPS).forEach(([, ids], gi) => {
        datasets.push({
          label: `Cluster ${gi + 1}: {${ids.join(",")}}`,
          data: visual.points
            .filter((p) => ids.includes(p.id))
            .map((p) => ({ x: p.x, y: p.y, label: p.id })),
          backgroundColor: clusterThemes[gi],
          borderColor: "transparent",
          pointRadius: 6.5,
        });
      });
    }

    if (showCentroids) {
      datasets.push(
        {
          label: "C1",
          data: [{ x: activeCentroids[0].x, y: activeCentroids[0].y, label: "C1" }],
          backgroundColor: theme.accent,
          borderColor: theme.pointBorder,
          borderWidth: 2.5,
          pointRadius: 10,
          pointStyle: "triangle",
        },
        {
          label: "C2",
          data: [{ x: activeCentroids[1].x, y: activeCentroids[1].y, label: "C2" }],
          backgroundColor: theme.mint,
          borderColor: theme.pointBorder,
          borderWidth: 2.5,
          pointRadius: 10,
          pointStyle: "rectRot",
        },
        {
          label: "C3",
          data: [{ x: activeCentroids[2].x, y: activeCentroids[2].y, label: "C3" }],
          backgroundColor: theme.purple,
          borderColor: theme.pointBorder,
          borderWidth: 2.5,
          pointRadius: 10,
          pointStyle: "circle",
        }
      );
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "scatter",
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 350 },
        scales: {
          x: {
            min: 0,
            max: 10,
            grid: { color: theme.grid },
            ticks: { color: theme.muted, stepSize: 2, font: { size: 10 } },
          },
          y: {
            min: 0,
            max: 12,
            grid: { color: theme.grid },
            ticks: { color: theme.muted, stepSize: 2, font: { size: 10 } },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 8,
              color: theme.text,
              font: { size: 9, weight: 600 },
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx: any) => {
                const raw = ctx.raw;
                return ` ${raw.label || ctx.dataset.label}: (${raw.x.toFixed(1)}, ${raw.y.toFixed(1)})`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [stepIndex, showCentroids, showAssignment, isRound2, visual.points]);

  return (
    <div className="h-64 sm:h-72 w-full relative">
      <canvas ref={canvasRef} />
    </div>
  );
}

/* Segmented view switcher powered by Radix Themes */
function ViewToggle<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: string }>;
}) {
  return (
    <SegmentedControl.Root
      size="1"
      value={value}
      onValueChange={(val) => onChange(val as T)}
    >
      {options.map((o) => (
        <SegmentedControl.Item key={o.value} value={o.value}>
          {o.label}
        </SegmentedControl.Item>
      ))}
    </SegmentedControl.Root>
  );
}

function KMeansPanel({
  visual,
  stepIndex,
  viewMode = "chart",
  onViewModeChange,
}: {
  visual: Extract<EpisodeVisual, { kind: "kmeans" }>;
  stepIndex: number;
  viewMode?: "chart" | "vectors";
  onViewModeChange?: (mode: "chart" | "vectors") => void;
}) {
  const [internalViewMode, setInternalViewMode] = useState<"chart" | "vectors">("chart");
  const currentViewMode = viewMode ?? internalViewMode;
  const setMode = onViewModeChange ?? setInternalViewMode;
  const W = 100;
  const H = 100;
  const pad = 10;
  const sx = (v: number) => pad + (v / 12) * (W - pad * 2);
  const sy = (v: number) => H - pad - (v / 12) * (H - pad * 2);

  const showCentroids = stepIndex >= 1;
  const showDistances = stepIndex >= 2 && stepIndex < 4;
  const showAssignment = stepIndex >= 4;
  const isRound2 = stepIndex >= 5;

  const activeCentroids = isRound2
    ? [
        { id: "C1", x: 2, y: 10 },
        { id: "C2", x: 6, y: 6 },
        { id: "C3", x: 1.5, y: 3.5 },
      ]
    : visual.initialCentroids;

  // Single source of truth for the pre-assignment distance phase (respects the
  // episode's metric). Once steps reach the slide-verified assignment, point
  // colors and lines follow KMEANS_GROUPS while centroids move to the new means.
  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    visual.metric === "manhattan"
      ? Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
      : (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

  const nearest: Record<string, { c: { id: string; x: number; y: number } }> = {};
  for (const p of visual.points) {
    let best = activeCentroids[0];
    let bd = Infinity;
    for (const c of activeCentroids) {
      const d = dist(p, c);
      if (d < bd) {
        bd = d;
        best = c;
      }
    }
    nearest[p.id] = { c: best };
  }

  const groups: Record<string, string[]> = {};
  const assignmentTarget: Record<string, { id: string; x: number; y: number }> = {};
  for (const c of activeCentroids) {
    const ids = KMEANS_GROUPS[c.id] ?? [];
    groups[c.id] = ids;
    for (const pid of ids) assignmentTarget[pid] = c;
  }

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2.5 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-y-2 pb-2 border-b border-rule shrink-0">
        <div>
          <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider">
            K-Means Clustering
          </p>
          <span className="text-[10px] text-ink-muted">
            {visual.metric === "manhattan" ? "Manhattan Distance" : "Euclidean Distance"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {isRound2 && (
            <span className="bento-pill border border-mint text-mint whitespace-nowrap shrink-0">
              Round 2
            </span>
          )}
          <ViewToggle
            value={currentViewMode}
            onChange={setMode}
            options={[
              { value: "chart", label: "Chart" },
              { value: "vectors", label: "Vectors" },
            ]}
          />
        </div>
      </div>

      {currentViewMode === "chart" ? (
        <div className="relative flex-1 min-h-[260px] max-h-[460px] w-full bg-surface p-2 sm:p-3 border border-rule flex flex-col items-center justify-center overflow-hidden my-auto">
          <KMeansChart visual={visual} stepIndex={stepIndex} />
        </div>
      ) : (
        <div className="relative flex-1 min-h-[260px] max-h-[460px] w-full bg-surface p-4 border border-rule flex items-center justify-center overflow-hidden my-auto">
          <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full max-h-full"
          role="img"
          aria-label={`กราฟการจัดกลุ่ม ${visual.points.length} จุด`}
        >
          {/* axes grid lines */}
          <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="var(--rule-strong)" strokeWidth="0.5" />
          <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="var(--rule-strong)" strokeWidth="0.5" />

          {/* grid ticks */}
          {[2, 4, 6, 8, 10].map((v) => (
            <g key={v}>
              <line x1={sx(v)} y1={H - pad} x2={sx(v)} y2={pad} stroke="var(--rule)" strokeWidth="0.2" strokeDasharray="1,2" />
              <line x1={pad} y1={sy(v)} x2={W - pad} y2={sy(v)} stroke="var(--rule)" strokeWidth="0.2" strokeDasharray="1,2" />
            </g>
          ))}

          {/* distance or assignment lines */}
          {(showDistances || showAssignment) &&
            visual.points.map((p) => {
              const target = showAssignment ? assignmentTarget[p.id] : nearest[p.id]?.c;
              if (!target) return null;
              return (
                <line
                  key={p.id}
                  x1={sx(p.x)}
                  y1={sy(p.y)}
                  x2={sx(target.x)}
                  y2={sy(target.y)}
                  stroke={showAssignment ? "var(--rule-strong)" : "var(--accent)"}
                  strokeWidth={showAssignment ? "0.3" : "0.5"}
                  strokeDasharray={showAssignment ? "1 0.8" : "1.5 1"}
                  style={{
                    opacity: 0.85,
                    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              );
            })}

          {/* points with smooth color morphing based on assignment */}
          {visual.points.map((p) => {
            const gi = Object.keys(groups).findIndex((k) => groups[k].includes(p.id));
            const pointFill = showAssignment && gi >= 0 ? CLUSTER_COLOR[gi] : "var(--ink)";
            return (
              <g key={p.id}>
                <circle
                  cx={sx(p.x)}
                  cy={sy(p.y)}
                  r={showAssignment ? "2.6" : "2.2"}
                  fill={pointFill}
                  stroke="var(--surface)"
                  strokeWidth="0.5"
                  style={{
                    transition: "fill 0.5s cubic-bezier(0.16, 1, 0.3, 1), r 0.3s ease",
                  }}
                />
                <text
                  x={sx(p.x) + 2.8}
                  y={sy(p.y) + 1.2}
                  fontSize="3"
                  className="fill-current text-ink font-mono font-medium pointer-events-none"
                >
                  {p.id}
                </text>
              </g>
            );
          })}

          {/* centroids with spring position transition and animated pulse aura */}
          {showCentroids &&
            activeCentroids.map((c, ci) => (
              <g
                key={c.id}
                style={{
                  transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <circle
                  cx={sx(c.x)}
                  cy={sy(c.y)}
                  r="5"
                  fill="none"
                  stroke={CLUSTER_COLOR[ci] || "var(--accent)"}
                  strokeWidth="0.6"
                  strokeDasharray="1 1"
                  className="animate-pulse"
                  style={{
                    transition: "cx 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), cy 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                />
                <line
                  x1={sx(c.x) - 3} y1={sy(c.y)}
                  x2={sx(c.x) + 3} y2={sy(c.y)}
                  stroke={CLUSTER_COLOR[ci] || "var(--accent)"} strokeWidth="1.2"
                  style={{ transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                />
                <line
                  x1={sx(c.x)} y1={sy(c.y) - 3}
                  x2={sx(c.x)} y2={sy(c.y) + 3}
                  stroke={CLUSTER_COLOR[ci] || "var(--accent)"} strokeWidth="1.2"
                  style={{ transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                />
                <text
                  x={sx(c.x)}
                  y={sy(c.y) - 4}
                  textAnchor="middle"
                  fontSize="3.2"
                  fontWeight="bold"
                  fill={CLUSTER_COLOR[ci] || "var(--accent)"}
                  className="font-mono pointer-events-none"
                  style={{ transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                >
                  {c.id}
                </text>
              </g>
            ))}
        </svg>
      </div>
      )}

      <div className="pt-2 border-t border-rule flex items-center justify-between text-xs text-ink-muted shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 border border-dashed border-accent" />
          <span>Centroid {showCentroids ? "(Active)" : "(รอสุ่ม)"}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 ${showAssignment ? "bg-mint" : "bg-ink"}`} />
          <span>{showAssignment ? "จัดกลุ่มแล้ว (Clustered)" : "จุดข้อมูลตั้งต้น"}</span>
        </span>
      </div>
    </div>
  );
}

function MatrixMetricsChart({
  visual,
  stepIndex,
}: {
  visual: Extract<EpisodeVisual, { kind: "confusion-matrix" }>;
  stepIndex: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const isStepAccuracy = stepIndex === 3;
  const isStepRecall = stepIndex === 4;
  const isStepF1 = stepIndex === 5;

  useEffect(() => {
    if (!canvasRef.current) return;
    const theme = getChartTheme();

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = ["Accuracy", "Precision", "Recall", "F1-Score"];
    const values = [70.0, 80.0, 66.7, 72.7];

    const bgColors = [
      isStepAccuracy ? theme.mint : theme.accent,
      isStepAccuracy ? theme.mint : theme.accent,
      isStepRecall ? theme.amber : theme.accent,
      isStepF1 ? theme.purple : theme.accent,
    ];

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Model Score (%)",
            data: values,
            backgroundColor: bgColors,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "transparent",
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 350 },
        scales: {
          x: {
            min: 0,
            max: 100,
            grid: { color: theme.grid },
            ticks: {
              color: theme.muted,
              font: { size: 10, family: "inherit" },
              callback: (v) => `${v}%`,
            },
          },
          y: {
            grid: { display: false },
            ticks: {
              color: theme.text,
              font: { size: 11, weight: 600, family: "inherit" },
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const metric = labels[ctx.dataIndex];
                const val = values[ctx.dataIndex];
                if (metric === "Accuracy") return ` Accuracy: ${val}% (TP+TN)/Total = 7/10`;
                if (metric === "Precision") return ` Precision: ${val}% TP/(TP+FP) = 4/5`;
                if (metric === "Recall") return ` Recall: ${val}% TP/(TP+FN) = 4/6 (⚠️ FN=2 หลุดรอด)`;
                return ` F1-Score: ${val}% Harmonic Mean ถัวน้ำหนักเท่ากัน`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [stepIndex, isStepAccuracy, isStepRecall, isStepF1]);

  return (
    <div className="h-52 sm:h-60 w-full relative">
      <canvas ref={canvasRef} />
    </div>
  );
}

function MatrixPanel({
  visual,
  stepIndex,
  viewMode = "grid",
  onViewModeChange,
}: {
  visual: Extract<EpisodeVisual, { kind: "confusion-matrix" }>;
  stepIndex: number;
  viewMode?: "grid" | "chart";
  onViewModeChange?: (mode: "grid" | "chart") => void;
}) {
  const [internalViewMode, setInternalViewMode] = useState<"grid" | "chart">("grid");
  const currentViewMode = viewMode ?? internalViewMode;
  const setMode = onViewModeChange ?? setInternalViewMode;
  const showNumbers = stepIndex >= 1;
  const isStepAccuracy = stepIndex === 3;
  const isStepRecall = stepIndex === 4;
  const isStepF1 = stepIndex === 5;

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2.5 overflow-hidden">
      {/* Panel Header */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 pb-2 border-b border-rule shrink-0">
        <div>
          <h4 className="text-sm font-bold text-ink">Confusion Matrix (2×2)</h4>
          <p className="text-[11px] text-ink-subtle">แถว = จริง (Actual) &middot; คอลัมน์ = ทาย (Predicted)</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="bento-pill bg-mint-wash text-mint font-semibold text-xs border border-mint/20 hidden sm:inline-block whitespace-nowrap shrink-0">
            Target (+): {visual.positiveLabel}
          </span>
          <ViewToggle
            value={currentViewMode}
            onChange={setMode}
            options={[
              { value: "grid", label: "Matrix" },
              { value: "chart", label: "Chart" },
            ]}
          />
        </div>
      </div>

      {currentViewMode === "chart" ? (
        <div className="overflow-hidden border border-rule bg-surface p-3 sm:p-4 my-auto">
          <div className="text-center pb-2 text-[11px] font-bold text-accent-ink tracking-wider uppercase">
            ↓ สรุปตัวชี้วัดประสิทธิภาพโมเดล (Classification Metrics) ↓
          </div>
          <MatrixMetricsChart visual={visual} stepIndex={stepIndex} />
        </div>
      ) : (
        <div className="overflow-hidden border border-rule bg-surface p-3 sm:p-4 my-auto">
          {/* Top Prediction Super-header */}
          <div className="text-center pb-2 text-[11px] font-bold text-accent-ink tracking-wider uppercase">
            ↓ ผลที่โมเดลทำนาย (Predicted) ↓
          </div>

        {/* Matrix Grid: 3 columns (Labels, Col 1, Col 2) */}
        <div className="grid grid-cols-[72px_1fr_1fr] sm:grid-cols-[84px_1fr_1fr] gap-2">
          {/* Header Row */}
          <div className="flex items-end justify-center pb-1 text-[11px] font-semibold text-ink-subtle text-center">
            <span>จริง \ ทาย</span>
          </div>
          <div className="bg-surface-hover p-2 text-center border border-rule">
            <span className="text-xs font-bold text-ink font-mono">ทาย {visual.positiveLabel} (+)</span>
          </div>
          <div className="bg-surface-hover p-2 text-center border border-rule">
            <span className="text-xs font-bold text-ink font-mono">ทาย Rest (-)</span>
          </div>

          {/* Row 1: Actual Play (+) */}
          <div className="border border-rule bg-surface p-2 flex flex-col justify-center text-center">
            <span className="text-xs font-bold text-accent-ink font-mono">จริง {visual.positiveLabel}</span>
            <span className="text-[10px] text-accent-ink font-medium">Actual (+)</span>
          </div>

          {/* Cell TP */}
          <div
            className={`p-3 border transition-colors duration-300 relative bg-surface ${
              isStepAccuracy || isStepF1 ? "border-mint" : "border-rule"
            }`}
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono font-bold text-ink">TP</span>
              <span className="text-[10px] text-mint font-semibold">ถูกต้อง</span>
            </div>
            <div className="my-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-ink">
                {showNumbers ? visual.tp : "—"}
              </span>
              {showNumbers && (
                <span className="text-[11px] text-ink-subtle font-mono ml-1.5">/ 10</span>
              )}
            </div>
            <p className="text-[10px] text-ink-muted leading-tight">ทำนาย Play &middot; จริง Play</p>
          </div>

          {/* Cell FN */}
          <div
            className={`p-3 border transition-colors duration-300 relative bg-surface ${
              isStepRecall ? "border-amber" : "border-rule"
            }`}
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono font-bold text-ink">FN</span>
              <span className={`text-[10px] font-semibold ${isStepRecall ? "text-amber font-bold" : "text-amber"}`}>
                หลุดรอด (พลาด)
              </span>
            </div>
            <div className="my-1">
              <span className={`text-2xl sm:text-3xl font-extrabold font-mono ${isStepRecall ? "text-amber" : "text-ink"}`}>
                {showNumbers ? visual.fn : "—"}
              </span>
              {showNumbers && (
                <span className="text-[11px] text-ink-subtle font-mono ml-1.5">/ 10</span>
              )}
            </div>
            <p className="text-[10px] text-ink-muted leading-tight">ทาย Rest &middot; จริง Play</p>
          </div>

          {/* Row 2: Actual Rest (-) */}
          <div className="border border-rule bg-surface p-2 flex flex-col justify-center text-center">
            <span className="text-xs font-bold text-ink-muted font-mono">จริง Rest</span>
            <span className="text-[10px] text-ink-subtle">Actual (-)</span>
          </div>

          {/* Cell FP */}
          <div className="p-3 border border-rule bg-surface transition-colors duration-300">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono font-bold text-ink">FP</span>
              <span className="text-[10px] text-rose font-medium">เตือนเกิน</span>
            </div>
            <div className="my-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-ink">
                {showNumbers ? visual.fp : "—"}
              </span>
              {showNumbers && (
                <span className="text-[11px] text-ink-subtle font-mono ml-1.5">/ 10</span>
              )}
            </div>
            <p className="text-[10px] text-ink-muted leading-tight">ทาย Play &middot; จริง Rest</p>
          </div>

          {/* Cell TN */}
          <div
            className={`p-3 border transition-colors duration-300 relative bg-surface ${
              isStepAccuracy ? "border-mint" : "border-rule"
            }`}
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono font-bold text-ink">TN</span>
              <span className="text-[10px] text-mint font-semibold">ถูกต้อง</span>
            </div>
            <div className="my-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-ink">
                {showNumbers ? visual.tn : "—"}
              </span>
              {showNumbers && (
                <span className="text-[11px] text-ink-subtle font-mono ml-1.5">/ 10</span>
              )}
            </div>
            <p className="text-[10px] text-ink-muted leading-tight">ทำนาย Rest &middot; จริง Rest</p>
          </div>
        </div>
      </div>
      )}

      {/* Summary Score Chips: Acc, Prec, Rec, F1 */}
      {showNumbers && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 shrink-0">
          <div
            className={`p-2.5 border text-center transition-colors duration-300 bg-surface ${
              isStepAccuracy ? "border-mint" : "border-rule"
            }`}
          >
            <span className="text-[10px] text-ink-subtle block uppercase font-bold">Accuracy</span>
            <span className="font-mono font-bold text-xs sm:text-sm text-ink">70.0%</span>
          </div>
          <div className="p-2.5 border border-rule bg-surface text-center">
            <span className="text-[10px] text-ink-subtle block uppercase font-bold">Precision</span>
            <span className="font-mono font-bold text-xs sm:text-sm text-ink">80.0%</span>
          </div>
          <div
            className={`p-2.5 border text-center transition-colors duration-300 bg-surface ${
              isStepRecall ? "border-amber" : "border-rule"
            }`}
          >
            <span className={`text-[10px] block uppercase font-bold ${isStepRecall ? "text-amber" : "text-ink-subtle"}`}>Recall</span>
            <span className={`font-mono font-bold text-xs sm:text-sm ${isStepRecall ? "text-amber" : "text-ink"}`}>66.7%</span>
          </div>
          <div
            className={`p-2.5 border text-center transition-colors duration-300 bg-surface ${
              isStepF1 ? "border-accent" : "border-rule"
            }`}
          >
            <span className="text-[10px] text-ink-subtle block uppercase font-bold">F1-Score</span>
            <span className="font-mono font-bold text-xs sm:text-sm text-accent-ink">72.7%</span>
          </div>
        </div>
      )}

      {/* Insight Callout Bar */}
      <div className="p-3.5 border border-l-2 border-l-accent border-rule bg-surface text-xs text-ink-muted flex items-start gap-2.5 shrink-0">
        <div className="flex-1 leading-relaxed">
          {isStepRecall ? (
            <span className="text-amber font-semibold">
              ไฮไลต์ FN = 2: โมเดลบอกให้ Rest แต่ความจริงนักเตะพร้อม Play (พลาดโอกาสใช้งาน) ทำให้ Recall หล่นเหลือ 66.7%
            </span>
          ) : isStepAccuracy ? (
            <span className="text-mint font-semibold">
              ไฮไลต์ Accuracy: ผลทำนายที่ถูกต้องทั้งหมดบนแนวทแยง (TP={visual.tp} + TN={visual.tn}) รวมเป็น 7 ใน 10 คน (70%)
            </span>
          ) : isStepF1 ? (
            <span className="text-accent-ink font-semibold">
              ไฮไลต์ F1 = 72.7%: ค่าเฉลี่ยฮาร์โมนิกระหว่าง Precision (80%) และ Recall (66.7%) ถัวน้ำหนักเท่ากัน
            </span>
          ) : showNumbers ? (
            <span>
              กลุ่มตัวอย่างทั้งหมด N = 10 คน &middot; ด้านแถวรวมจริง Play = 6, จริง Rest = 4
            </span>
          ) : (
            <span>กำหนดให้ <strong>Play เป็น Positive</strong> เสมอ — ห้ามเริ่มคำนวณก่อนระบุว่าคลาสไหนคือเป้าหมายหลัก</span>
          )}
        </div>
      </div>
    </div>
  );
}

function DecisionTreeGainChart({
  visual,
  stepIndex,
}: {
  visual: Extract<EpisodeVisual, { kind: "decision-tree" }>;
  stepIndex: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const showCandidateA = stepIndex >= 1;
  const showCandidateB = stepIndex >= 3;
  const showWinner = stepIndex >= 4;

  useEffect(() => {
    if (!canvasRef.current) return;
    const theme = getChartTheme();

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels: string[] = ["Root (Parent)"];
    const weightedGiniData: number[] = [visual.rootGini];
    const gainData: number[] = [0];

    if (showCandidateA) {
      labels.push("Split A (days <= 45)");
      weightedGiniData.push(0.278);
      gainData.push(0.222);
    }

    if (showCandidateB) {
      labels.push("Split B (purchases <= 2)");
      weightedGiniData.push(0.444);
      gainData.push(0.056);
    }

    const gainColors = labels.map((_, idx) => {
      if (idx === 0) return theme.muted;
      if (idx === 1) return showWinner ? theme.mint : theme.accent;
      return theme.amber;
    });

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Gini Gain (เกณฑ์ตัดสิน สูงสุด = ชนะ)",
            data: gainData,
            backgroundColor: gainColors,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "transparent",
          },
          {
            label: "Weighted Gini (ความไม่บริสุทธิ์ ยิ่งต่ำยิ่งดี)",
            data: weightedGiniData,
            backgroundColor: theme.subtle + "40",
            borderColor: theme.subtle,
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 350 },
        scales: {
          x: {
            grid: { color: theme.grid },
            ticks: {
              color: theme.text,
              font: { size: 10, weight: 600, family: "inherit" },
            },
          },
          y: {
            min: 0,
            max: 0.6,
            grid: { color: theme.grid },
            ticks: {
              color: theme.muted,
              font: { size: 10, family: "inherit" },
              callback: (v) => Number(v).toFixed(2),
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              boxWidth: 8,
              color: theme.text,
              font: { size: 9, weight: 600 },
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const val = ctx.parsed.y ?? 0;
                return ` ${ctx.dataset.label}: ${val.toFixed(3)}`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [stepIndex, showCandidateA, showCandidateB, showWinner, visual.rootGini]);

  return (
    <div className="h-52 sm:h-60 w-full relative">
      <canvas ref={canvasRef} />
    </div>
  );
}

function DecisionTreePanel({
  visual,
  stepIndex,
  viewMode = "chart",
  onViewModeChange,
}: {
  visual: Extract<EpisodeVisual, { kind: "decision-tree" }>;
  stepIndex: number;
  viewMode?: "chart" | "tree";
  onViewModeChange?: (mode: "chart" | "tree") => void;
}) {
  const [internalViewMode, setInternalViewMode] = useState<"chart" | "tree">("chart");
  const currentViewMode = viewMode ?? internalViewMode;
  const setMode = onViewModeChange ?? setInternalViewMode;
  const showCandidateA = stepIndex >= 1;
  const showCandidateB = stepIndex >= 3;
  const showWinner = stepIndex >= 4;

  const splitsToShow = visual.splits.slice(0, showCandidateB ? 2 : showCandidateA ? 1 : 0);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2.5 overflow-hidden">
      <div className="flex items-center justify-between pb-2 border-b border-rule shrink-0">
        <div>
          <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider">
            Decision Tree Split Simulation
          </p>
          <span className="text-[10px] text-ink-muted">
            Root Gini: {visual.rootGini.toFixed(3)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {showWinner && (
            <span className="bento-pill border border-mint text-mint whitespace-nowrap shrink-0">
              Winner: Split A
            </span>
          )}
          <ViewToggle
            value={currentViewMode}
            onChange={setMode}
            options={[
              { value: "chart", label: "Gain Chart" },
              { value: "tree", label: "Tree" },
            ]}
          />
        </div>
      </div>

      {currentViewMode === "chart" ? (
        <div className="flex-1 min-h-0 flex flex-col justify-center space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar py-0.5">
          <div className="bg-surface p-2 sm:p-3 border border-rule my-auto">
            <DecisionTreeGainChart visual={visual} stepIndex={stepIndex} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className={`p-2 border text-center transition-colors bg-surface ${showWinner ? "border-mint" : "border-rule"}`}>
              <span className="text-[10px] font-bold text-ink-subtle uppercase block">Candidate A (days ≤ 45)</span>
              <span className={`font-mono font-bold text-xs ${showWinner ? "text-mint font-extrabold" : "text-ink"}`}>Gain: 0.222 {showWinner && "★"}</span>
            </div>
            <div className={`p-2 border text-center transition-colors bg-surface ${showCandidateB ? "border-rule" : "border-dashed border-rule opacity-60"}`}>
              <span className="text-[10px] font-bold text-ink-subtle uppercase block">Candidate B (pur ≤ 2)</span>
              <span className="font-mono font-bold text-xs text-ink-muted">{showCandidateB ? "Gain: 0.056" : "รอเปรียบเทียบ"}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0 flex flex-col justify-center space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar py-0.5">
          {/* Root node */}
          <div className="bg-surface-hover border border-rule p-2.5 text-center max-w-xs mx-auto">
            <p className="text-xs font-bold text-ink uppercase tracking-wider">โหนดแม่ (Parent Root)</p>
            <p className="tnum text-[11px] text-ink-muted mt-0.5 font-mono">n = 12 ตัวอย่าง (Active 6 / Inactive 6)</p>
          </div>

          <div className="text-center my-0.5 shrink-0" aria-hidden="true">
            <svg width="20" height="14" viewBox="0 0 24 20" fill="none" className="mx-auto">
              <path d="M12 0v8M12 8L4 20M12 8l8 12" stroke="var(--rule-strong)" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="space-y-2">
            {splitsToShow.map((s, idx) => {
              const isWinner = showWinner && idx === 0;
              return (
                <div
                  key={s.feature}
                  className={`p-2.5 sm:p-3 border transition-colors duration-300 bg-surface ${
                    isWinner ? "border-mint" : "border-rule"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-bold text-ink font-mono truncate">{s.feature}</p>
                    <span
                      className={`bento-pill text-[11px] font-semibold shrink-0 transition-colors ${
                        isWinner ? "bg-mint text-white" : "border border-rule text-ink-subtle"
                      }`}
                    >
                      Gain: {s.gain.toFixed(3)} {isWinner && "★ SELECTED"}
                    </span>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-surface-hover p-1.5 sm:p-2 border border-rule text-center">
                      <p className="text-[10px] sm:text-[11px] text-ink-subtle font-medium">แยกซ้าย n={s.nLeft}</p>
                      <p className="tnum font-mono text-xs sm:text-sm font-bold mt-0.5 text-ink">{s.giniLeft.toFixed(3)}</p>
                    </div>
                    <div className="bg-surface-hover p-1.5 sm:p-2 border border-rule text-center">
                      <p className="text-[10px] sm:text-[11px] text-ink-subtle font-medium">แยกขวา n={s.nRight}</p>
                      <p className="tnum font-mono text-xs sm:text-sm font-bold mt-0.5 text-ink">{s.giniRight.toFixed(3)}</p>
                    </div>
                  </div>

                  <div className="mt-1.5 flex justify-between items-center text-[11px] text-ink-muted border-t border-rule/60 pt-1">
                    <span>Weighted: <strong className="font-mono text-ink">{s.weightedGini.toFixed(3)}</strong></span>
                    <span className={`font-bold ${isWinner ? "text-mint font-mono" : "text-accent-ink font-mono"}`}>
                      Gain = {s.gain.toFixed(3)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {splitsToShow.length === 0 ? (
            <p className="text-xs text-ink-muted text-center py-3 border border-dashed border-rule">
              กำลังประเมินโหนดราก เลื่อนลงเพื่อดู Candidate Splits
            </p>
          ) : null}
        </div>
      )}

      <div className="pt-2 border-t border-rule text-xs text-ink-muted shrink-0">
        เกณฑ์ตัดสิน: เลือก Candidate Split ที่ได้ <strong>Gini Gain สูงที่สุด</strong> เสมอ
      </div>
    </div>
  );
}

function BoxplotPanel({
  visual,
  stepIndex,
}: {
  visual: Extract<EpisodeVisual, { kind: "boxplot" }>;
  stepIndex: number;
}) {
  const W = 100;
  const H = 52;
  const minVal = -5;
  const maxVal = 65;
  const scaleX = (v: number) => 8 + ((v - minVal) / (maxVal - minVal)) * 84;

  const showIQR = stepIndex >= 1;
  const showFences = stepIndex >= 2;
  const showWhiskerCap = stepIndex >= 3;
  const showOutlier = stepIndex >= 4;

  const yBox = 16;
  const hBox = 18;
  const q1X = scaleX(visual.q1);
  const q3X = scaleX(visual.q3);
  const medX = scaleX(visual.median);
  const minX = scaleX(visual.min);
  const maxX = scaleX(showWhiskerCap ? 50 : visual.max);
  const ufX = scaleX(visual.upperFence);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2.5 overflow-hidden">
      <div className="flex justify-between items-center pb-2 border-b border-rule shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider">
            Tukey&rsquo;s Boxplot Diagram
          </p>
        </div>
        <span
          className={`bento-pill font-semibold text-xs font-mono transition-colors duration-300 ${
            showIQR ? "border-mint text-mint" : "border-rule text-ink-subtle"
          }`}
        >
          IQR = {visual.q3 - visual.q1}
        </span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col justify-center space-y-2.5 overflow-y-auto overflow-x-hidden custom-scrollbar py-0.5">

        {/* Refined Boxplot Canvas */}
        <div className="bg-surface p-3 sm:p-4 border border-rule">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[190px] sm:max-h-[230px]" role="img" aria-label="Boxplot visualization">
            {/* Baseline Axis */}
            <line x1="6" y1="42" x2="94" y2="42" stroke="var(--rule-strong)" strokeWidth="0.4" />

            {/* Left Whisker with T-cap */}
            <line
              x1={minX} y1={yBox + hBox / 2} x2={q1X} y2={yBox + hBox / 2}
              stroke="var(--ink)" strokeWidth="0.8"
              style={{ transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />
            <line
              x1={minX} y1={yBox + 4} x2={minX} y2={yBox + hBox - 4}
              stroke="var(--ink)" strokeWidth="0.8"
              style={{ transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />

            {/* Right Whisker with T-cap */}
            <line
              x1={q3X} y1={yBox + hBox / 2} x2={maxX} y2={yBox + hBox / 2}
              stroke="var(--ink)" strokeWidth="0.8"
              style={{ transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />
            <line
              x1={maxX} y1={yBox + 4} x2={maxX} y2={yBox + hBox - 4}
              stroke="var(--ink)" strokeWidth="0.8"
              style={{ transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />

            {/* Box with IQR highlight */}
            <rect
              x={q1X}
              y={yBox}
              width={Math.max(1, q3X - q1X)}
              height={hBox}
              rx="2.5"
              fill={showIQR ? "var(--accent-wash)" : "none"}
              stroke={showIQR ? "var(--accent)" : "var(--ink)"}
              strokeWidth={showIQR ? "1.2" : "0.9"}
              style={{ transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />

            {/* Median line */}
            <line
              x1={medX} y1={yBox} x2={medX} y2={yBox + hBox}
              stroke="var(--accent-ink)" strokeWidth="1.6"
              style={{ transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />

            {/* Upper Fence dashed marker */}
            {showFences && (
              <g style={{ transition: "opacity 0.6s ease" }}>
                <line
                  x1={ufX} y1={5} x2={ufX} y2={40}
                  stroke="var(--amber)" strokeWidth="0.9" strokeDasharray="1.5,1.5"
                />
                <text
                  x={ufX}
                  y={4}
                  textAnchor="middle"
                  fontSize="2.8"
                  fontWeight="bold"
                  fill="var(--amber)"
                  className="font-mono"
                >
                  UF 57.5
                </text>
              </g>
            )}

            {/* Outlier Dots with subtle pulse */}
            {showOutlier &&
              [58].map((o) => (
                <g key={o}>
                  <circle
                    cx={scaleX(o)}
                    cy={yBox + hBox / 2}
                    r="4"
                    fill="var(--rose)"
                    className="animate-ping opacity-35"
                  />
                  <circle
                    cx={scaleX(o)}
                    cy={yBox + hBox / 2}
                    r="2.5"
                    fill="var(--rose)"
                    style={{ transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                  />
                  <text
                    x={scaleX(o)}
                    y={yBox + hBox + 8}
                    textAnchor="middle"
                    fontSize="2.8"
                    fontWeight="bold"
                    fill="var(--rose)"
                    className="font-mono"
                  >
                    58
                  </text>
                </g>
              ))}
          </svg>
        </div>

        {/* Refined Five-Number Summary Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
          <div className="bg-surface p-2.5 border border-rule transition-colors duration-300 text-center">
            <p className="text-[10px] text-ink-subtle uppercase font-bold tracking-wider">Q1</p>
            <p className="tnum font-mono font-bold text-sm mt-0.5 text-ink">{visual.q1}</p>
          </div>
          <div className="bg-surface p-2.5 border border-rule transition-colors duration-300 text-center">
            <p className="text-[10px] text-accent-ink uppercase font-bold tracking-wider">Median</p>
            <p className="tnum font-mono font-bold text-sm mt-0.5 text-accent-ink">{visual.median}</p>
          </div>
          <div className="bg-surface p-2.5 border border-rule transition-colors duration-300 text-center">
            <p className="text-[10px] text-ink-subtle uppercase font-bold tracking-wider">Q3</p>
            <p className="tnum font-mono font-bold text-sm mt-0.5 text-ink">{visual.q3}</p>
          </div>
          <div className={`bg-surface p-2.5 border transition-colors duration-300 text-center ${showFences ? "border-amber" : "border-rule"}`}>
            <p className={`text-[10px] uppercase font-bold tracking-wider ${showFences ? "text-amber" : "text-ink-subtle"}`}>Upper Fence</p>
            <p className={`tnum font-mono font-bold text-sm mt-0.5 ${showFences ? "text-amber" : "text-ink"}`}>{visual.upperFence}</p>
          </div>
        </div>
      </div>

      {/* Insight Callout Box */}
      <div className="p-3 border border-l-2 border-l-accent border-rule bg-surface text-xs text-ink-muted flex items-start gap-2.5 shrink-0">
        <div className="flex-1 leading-relaxed">
          {showOutlier ? (
            <span className="text-rose font-bold">
              ตรวจพบ Outlier: ค่า 58 เกินกว่า Upper Fence (57.5) ออกไป ถือเป็นค่าผิดปกติที่ต้องพล็อตแยก
            </span>
          ) : showWhiskerCap ? (
            <span>
              <strong>กฎข้อควรระวัง:</strong> Whisker ขวาสิ้นสุดที่ค่าจริงใน Fence คือ <strong>50</strong> ไม่ได้ลากไปแตะ 57.5
            </span>
          ) : showFences ? (
            <span>
              <strong>สูตร Fences:</strong> Upper Fence = Q3 + 1.5×IQR = 35 + 22.5 = <strong>57.5</strong>
            </span>
          ) : showIQR ? (
            <span>
              <strong>IQR:</strong> ความกว้างของกล่อง = Q3 - Q1 = 35 - 20 = <strong>15</strong> ครอบคลุม 50% ของข้อมูล
            </span>
          ) : (
            <span>ตำแหน่งควอร์ไทล์สำคัญ: Q1=20, Median=28, Q3=35 และค่าสุดขอบ Min=10, Max=50</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ShapForcePanel({
  visual,
  stepIndex,
}: {
  visual: Extract<EpisodeVisual, { kind: "shap-force" }>;
  stepIndex: number;
}) {
  const base = visual.baseValue;
  const itemsToShow = visual.contributions.slice(0, stepIndex);
  const currentPred = itemsToShow.reduce((acc, c) => acc + c.value, base);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const theme = getChartTheme();

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = ["Base Value (Pop. Avg)", ...itemsToShow.map((c) => c.feature)];
    const dataValues = [base, ...itemsToShow.map((c) => c.value)];
    const bgColors = [
      theme.muted,
      ...itemsToShow.map((c) => (c.value >= 0 ? theme.mint : theme.rose)),
    ];

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Impact (pt / %)",
            data: dataValues,
            backgroundColor: bgColors,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "transparent",
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 350 },
        scales: {
          x: {
            min: -15,
            max: 40,
            grid: { color: theme.grid },
            ticks: {
              color: theme.muted,
              font: { size: 10, family: "inherit" },
              callback: (v) => `${Number(v) > 0 ? "+" : ""}${v}%`,
            },
          },
          y: {
            grid: { display: false },
            ticks: {
              color: theme.text,
              font: { size: 11, weight: 600, family: "inherit" },
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const val = ctx.parsed.x ?? 0;
                if (ctx.dataIndex === 0) return ` Baseline: ${val}% (สัดส่วนประชากรเฉลี่ย)`;
                return ` ผลกระทบ: ${val > 0 ? "+" : ""}${val} pt (${val > 0 ? "ดันผลทำนายขึ้น" : "ฉุดผลทำนายลง"})`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [stepIndex, itemsToShow, base]);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2.5 overflow-hidden">
      <div className="flex justify-between items-center pb-2 border-b border-rule shrink-0">
        <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider">
          SHAP Force Plot &middot; Lect 09 p.9
        </p>
        <span className="bento-pill border border-accent text-accent-ink font-mono font-bold text-xs">
          f(x) = {currentPred}%
        </span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col justify-center space-y-2.5 overflow-y-auto overflow-x-hidden custom-scrollbar py-0.5">
        {/* Chart.js Force Bar Canvas */}
        <div className="bg-surface p-2.5 sm:p-3 border border-rule h-56 sm:h-72 w-full relative">
          <canvas ref={canvasRef} />
        </div>

        {/* Feature contribution breakdown pills */}
        <div className="space-y-1.5">
          {itemsToShow.length === 0 ? (
            <p className="text-xs text-ink-muted italic py-2 border border-dashed border-rule text-center">
              เริ่มต้นที่ค่าเฉลี่ยประชากร Base Value = 32% (เลื่อนลงเพื่อดูแรงผลักฟีเจอร์)
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {itemsToShow.map((c) => {
                const isPos = c.value > 0;
                return (
                  <div
                    key={c.feature}
                    className="flex justify-between items-center text-xs border border-rule px-2.5 py-1.5 bg-surface transition-colors duration-300"
                  >
                    <span className="text-ink font-medium truncate mr-1.5">{c.feature}</span>
                    <span
                      className={`tnum font-bold font-mono shrink-0 ${
                        isPos ? "text-mint" : "text-rose"
                      }`}
                    >
                      {isPos ? `+${c.value}` : c.value} pt
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-rule pt-2 text-xs shrink-0">
        <p className="text-ink-subtle font-mono text-[11px]">
          สมการรวม: {base}% {itemsToShow.map(c => (c.value >= 0 ? `+ ${c.value}` : `- ${Math.abs(c.value)}`)).join(" ")} = <span className="text-accent-ink font-bold font-mono">{currentPred}%</span>
        </p>
      </div>
    </div>
  );
}

function ConceptDriftPanel({
  visual,
  stepIndex,
}: {
  visual: Extract<EpisodeVisual, { kind: "concept-drift" }>;
  stepIndex: number;
}) {
  const visiblePointsCount = Math.max(1, Math.min(visual.timeline.length, stepIndex + 1));
  const pts = visual.timeline.slice(0, visiblePointsCount);
  const current = pts[pts.length - 1];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const theme = getChartTheme();

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = visual.timeline.map((t) => `T${t.t}`);
    const accuracyData = visual.timeline.map((t, idx) =>
      idx < visiblePointsCount ? t.accuracy : null
    );
    const thresholdData = visual.timeline.map(() => 70);
    const isDegraded = current.accuracy < 70;

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Model Accuracy (%)",
            data: accuracyData,
            borderColor: isDegraded ? theme.rose : theme.accent,
            backgroundColor: isDegraded ? theme.roseWash : theme.accentWash,
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: (ctx) =>
              ctx.dataIndex === visiblePointsCount - 1 ? 6 : ctx.dataIndex < visiblePointsCount ? 4 : 0,
            pointBackgroundColor: (ctx) =>
              ctx.dataIndex === visiblePointsCount - 1 ? theme.amber : theme.accent,
            pointBorderColor: "#fff",
            pointBorderWidth: 1.5,
          },
          {
            label: "Drift Threshold (70%)",
            data: thresholdData,
            borderColor: theme.rose,
            borderDash: [5, 5],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 350 },
        scales: {
          x: {
            grid: { color: theme.grid },
            ticks: { color: theme.muted, font: { size: 10, family: "inherit" } },
          },
          y: {
            min: 50,
            max: 100,
            grid: { color: theme.grid },
            ticks: {
              color: theme.muted,
              font: { size: 10, family: "inherit" },
              callback: (v) => `${v}%`,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              boxWidth: 12,
              color: theme.text,
              font: { size: 10, weight: 600 },
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (ctx.datasetIndex === 0) {
                  const val = ctx.parsed.y;
                  return val !== null
                    ? ` Accuracy: ${val}% ${val < 70 ? "(Drift Detected)" : "(Normal)"}`
                    : "";
                }
                return " Critical Threshold: 70%";
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [visiblePointsCount, visual.timeline, current.accuracy]);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2.5 overflow-hidden">
      <div className="flex justify-between items-center pb-2 border-b border-rule shrink-0">
        <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider">
          Concept Drift Timeline &middot; Lect 09 p.11
        </p>
        <span
          className={`bento-pill font-semibold text-xs font-mono transition-colors ${
            current.accuracy < 70 ? "border-rose text-rose" : "border-mint text-mint"
          }`}
        >
          Accuracy {current.accuracy}%
        </span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col justify-center space-y-2.5 overflow-y-auto overflow-x-hidden custom-scrollbar py-0.5">
        {/* Chart.js Accuracy Trajectory Canvas */}
        <div className="bg-surface p-2.5 sm:p-3 border border-rule h-56 sm:h-72 w-full relative">
          <canvas ref={canvasRef} />
        </div>

        {current.note && (
          <div className="p-2.5 border border-l-2 border-l-accent border-rule bg-surface transition-colors duration-300">
            <p className="text-xs text-accent-ink font-semibold">{current.note}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-surface p-2.5 border border-rule transition-colors duration-300">
            <p className="text-[11px] text-ink-subtle font-medium">ก่อน Drift (Train)</p>
            <p className="text-ink-muted mt-0.5 text-[11px]">ไม่ซื้อเกิน 45 วัน</p>
            <p className="tnum font-bold text-ink mt-0.5 font-mono">Inactive = 68%</p>
          </div>
          <div className="bg-surface p-2.5 border border-rule transition-colors duration-300">
            <p className="text-[11px] text-accent-ink font-medium">หลัง Drift (โลกจริง)</p>
            <p className="text-ink-muted mt-0.5 text-[11px]">ไม่ซื้อเกิน 45 วัน</p>
            <p className="tnum font-bold text-rose mt-0.5 font-mono">Inactive = 31%</p>
          </div>
        </div>
      </div>

      <div className="border-t border-rule pt-2 text-xs text-ink-muted shrink-0">
        P(Y|X) เปลี่ยนแปลงตามกาลเวลา โมเดลเดิมที่จำกัดเฉพาะอดีตจึงเกิด Model Degradation
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scrollytelling Thinking Player with GSAP ScrollTrigger               */
/* ------------------------------------------------------------------ */

export function EpisodePlayer({ episodes }: { episodes: Episode[] }) {
  const [epIdx, setEpIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);

  const stepCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineTrackRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  const ep = episodes[epIdx];
  const total = ep.steps.length;
  const currentStepData = ep.steps[activeStep] || ep.steps[0];

  // Persistent viewModes across steps and episode switches
  const [viewModes, setViewModes] = useState<Record<string, string>>({
    ep02: "chart",
    ep03: "grid",
    ep04: "chart",
  });

  // Visual presentation mode: technical diagrams vs 2D vector cartoon mental models
  const [mainVisualMode, setMainVisualMode] = useState<"technical" | "cartoon">("technical");
  // Per-step inline cartoon expansion in step cards (useful on mobile)
  const [expandedCardCartoon, setExpandedCardCartoon] = useState<number | null>(null);

  const handleViewModeChange = useCallback((mode: string) => {
    setViewModes((prev) => ({
      ...prev,
      [ep.id]: mode,
    }));
  }, [ep.id]);

  // Switch episode & reset step
  const handleSelectEpisode = useCallback((index: number) => {
    setEpIdx(index);
    activeStepRef.current = 0;
    setActiveStep(0);
    if (containerRef.current) {
      const topOffset = containerRef.current.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  }, []);

  // Programmatic scroll lock so smooth scroll events don't fight with activeStep state
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Jump to specific step via smooth scroll
  const scrollToStep = useCallback((stepIndex: number) => {
    const card = stepCardRefs.current[stepIndex];
    if (!card) return;

    // Immediately update activeStep so UI (Next/Prev buttons, counter, diagrams) updates instantaneously
    setActiveStep(stepIndex);
    activeStepRef.current = stepIndex;

    // Lock updateTimeline from overriding activeStep during smooth scroll
    isProgrammaticScrollRef.current = true;
    clearTimeout(programmaticScrollTimerRef.current);
    programmaticScrollTimerRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 750);

    // Calculate exact scroll target to place the card bead directly at/past the focal trigger line
    const triggerPoint = window.innerHeight * 0.45;
    const beadOffset = 42;
    const cardRect = card.getBoundingClientRect();
    // Align card bead comfortably at the trigger point (+20px margin so it firmly crosses the threshold)
    const delta = (cardRect.top + beadOffset) - (triggerPoint - 20);
    const targetScrollY = Math.max(0, window.scrollY + delta);

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  }, []);

  // Synchronized Timeline progress & active step tracking
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateTimeline = () => {
      const firstCard = stepCardRefs.current[0];
      const lastCard = stepCardRefs.current[total - 1];
      if (!firstCard || !lastCard || !lineTrackRef.current || !lineProgressRef.current) return;

      const firstCardTop = firstCard.offsetTop;
      const lastCardTop = lastCard.offsetTop;
      const beadOffset = 42; // Center of bead: top-7 (28px) + half of h-7 (14px)
      const lineOffsetTop = firstCardTop + beadOffset;
      const lineLength = Math.max(1, lastCardTop - firstCardTop);

      // Position and size the gray track behind the beads
      lineTrackRef.current.style.top = `${lineOffsetTop}px`;
      lineTrackRef.current.style.height = `${lineLength}px`;

      // Focal trigger line in viewport (45% from top of window)
      const triggerPoint = window.innerHeight * 0.45;

      // Bottom of page safety check: ensures 100% progress and last step active
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;

      if (atBottom) {
        lineProgressRef.current.style.height = "100%";
        if (!isProgrammaticScrollRef.current && activeStepRef.current !== total - 1) {
          activeStepRef.current = total - 1;
          setActiveStep(total - 1);
        }
        return;
      }

      const bead0ViewportY = firstCard.getBoundingClientRect().top + beadOffset;
      const currentPx = Math.max(0, Math.min(lineLength, triggerPoint - bead0ViewportY));
      const progressPercent = (currentPx / lineLength) * 100;

      lineProgressRef.current.style.height = `${progressPercent}%`;

      // If user is currently smooth-scrolling via Next/Prev/Step buttons, don't let intermediate scroll positions hijack activeStep
      if (isProgrammaticScrollRef.current) return;

      // Determine active step: find the furthest bead that the line has reached
      let currentActive = 0;
      for (let i = 0; i < total; i++) {
        const card = stepCardRefs.current[i];
        if (card) {
          const beadDist = card.offsetTop - firstCardTop;
          // Activate immediately when the line tip touches the bead (-10px before center)
          if (currentPx >= beadDist - 10) {
            currentActive = i;
          }
        }
      }

      if (activeStepRef.current !== currentActive) {
        activeStepRef.current = currentActive;
        setActiveStep(currentActive);
      }
    };

    // Release programmatic lock if user manually touches or scrolls with wheel
    const handleUserManualScroll = () => {
      if (isProgrammaticScrollRef.current) {
        isProgrammaticScrollRef.current = false;
        clearTimeout(programmaticScrollTimerRef.current);
      }
    };

    window.addEventListener("scroll", updateTimeline, { passive: true });
    window.addEventListener("resize", updateTimeline, { passive: true });
    window.addEventListener("wheel", handleUserManualScroll, { passive: true });
    window.addEventListener("touchmove", handleUserManualScroll, { passive: true });

    updateTimeline();
    const timer = setTimeout(updateTimeline, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(programmaticScrollTimerRef.current);
      window.removeEventListener("scroll", updateTimeline);
      window.removeEventListener("resize", updateTimeline);
      window.removeEventListener("wheel", handleUserManualScroll);
      window.removeEventListener("touchmove", handleUserManualScroll);
    };
  }, [epIdx, total]);

  return (
    <div ref={containerRef} className="space-y-8 relative pt-4 sm:pt-6">
      {/* ---------------- Top Episode Switcher Tabs ---------------- */}
      <div className="flex gap-2 flex-wrap items-center pt-2 pb-1">
        {episodes.map((e, i) => (
          <button
            key={e.id}
            type="button"
            onClick={() => handleSelectEpisode(i)}
            aria-current={i === epIdx ? "true" : undefined}
            className={`px-3.5 py-2 text-xs font-semibold transition-colors duration-150 border cursor-pointer ${
              i === epIdx
                ? "bg-ink text-bg border-ink"
                : "bg-surface text-ink-muted border-rule-strong hover:text-ink"
            }`}
          >
            EP {e.index}: {e.title}
          </button>
        ))}
      </div>

      {/* Episode Header Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border border-rule bg-surface">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-ink text-bg font-bold text-xs flex items-center justify-center font-mono">
            EP{ep.index}
          </span>
          <div>
            <h2 className="text-base font-bold text-ink">{ep.title}</h2>
            <p className="text-xs text-ink-muted">{ep.titleTh} &middot; {ep.lectures.join(" · ")}</p>
          </div>
        </div>

        <span className="text-xs font-mono text-ink-subtle whitespace-nowrap">
          {total} STEPS
        </span>
      </div>

      {/* ---------------- 2-Column Scrollytelling Layout ----------------
          Mobile: the diagram column is sticky at the top and the step cards
          scroll beneath it (flex column + order). Desktop: side-by-side grid
          with the diagram pinned sticky in the right column. */}
      <div className="relative flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Step Cards Track with bottom spacer so the last step can activate */}
        <div className="order-2 lg:order-1 lg:col-span-6 relative">
          {/* Continuous vertical timeline connector line terminating exactly at last bead */}
          <div
            ref={lineTrackRef}
            className="absolute left-6 -translate-x-1/2 w-0.5 bg-rule/70 -z-0"
            aria-hidden="true"
          >
            {/* Active progress fill line */}
            <div
              ref={lineProgressRef}
              className="w-full bg-accent rounded-full"
              style={{ height: "0%" }}
            />
          </div>

          <div className="space-y-16 pt-4 max-md:pb-[40vh] md:pb-[65vh]">
            {ep.steps.map((step, sIdx) => {
              const isActive = sIdx === activeStep;
              const isPast = sIdx < activeStep;

              return (
                <div
                  key={step.n}
                  ref={(el) => {
                    stepCardRefs.current[sIdx] = el;
                  }}
                  data-step-index={sIdx}
                  id={`step-card-${ep.id}-${sIdx}`}
                  className="relative pl-14 sm:pl-16 scroll-mt-36"
                >
                  {/* Timeline Bead Button */}
                  <button
                    id={`timeline-bead-${sIdx}`}
                    type="button"
                    onClick={() => scrollToStep(sIdx)}
                    aria-label={`ไปยังขั้นตอนที่ ${step.n}`}
                    className={`tactile-btn absolute left-[10px] top-7 w-7 h-7 font-mono text-xs font-bold flex items-center justify-center z-10 cursor-pointer border ${
                      isActive
                        ? "bg-accent text-white border-accent shadow-sm"
                        : isPast
                        ? "bg-ink text-bg border-ink"
                        : "bg-surface border-rule-strong text-ink-subtle"
                    }`}
                  >
                    {isPast ? "✓" : step.n}
                  </button>

                  {/* Step Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`bento-card p-6 sm:p-7 transition-colors duration-300 ${
                      isActive
                        ? "border-accent"
                        : isPast
                        ? "opacity-90"
                        : "opacity-70"
                    }`}
                  >
                    {/* Step Card Header */}
                    <div className="pb-3 mb-4 border-b border-rule/70">
                      <span
                        className={`bento-pill text-xs font-semibold font-mono transition-colors ${
                          isActive
                            ? "border border-accent text-accent-ink"
                            : "border border-rule text-ink-subtle"
                        }`}
                      >
                        STEP {String(step.n).padStart(2, "0")} OF {String(total).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-ink leading-snug tracking-tight">
                      {step.headline}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
                      {step.body}
                    </p>

                    {/* Calculated Numbers Box */}
                    {step.numbers && step.numbers.length > 0 && (
                      <div className="mt-5 p-4 border border-rule bg-surface-hover space-y-1.5">
                        <p className="text-[11px] font-bold text-ink-subtle uppercase tracking-wider mb-2">
                          ค่าและสูตรที่คำนวณได้ในขั้นตอนนี้
                        </p>
                        {step.numbers.map((num, k) => (
                          <div
                            key={k}
                            className="font-mono text-xs sm:text-sm font-semibold text-accent-ink"
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Generative 2D Cartoon Mental Model Cue */}
                    <div className="mt-5 pt-3 border-t border-rule/70 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                              setMainVisualMode("cartoon");
                            } else {
                              setExpandedCardCartoon(expandedCardCartoon === sIdx ? null : sIdx);
                            }
                          }}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-accent-ink hover:text-ink transition-colors cursor-pointer"
                        >
                          <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center text-xs">
                            🎨
                          </span>
                          <span>
                            {expandedCardCartoon === sIdx
                              ? "ซ่อนภาพการ์ตูนวิธีคิด ▲"
                              : "ดูภาพการ์ตูนวิธีคิด 2D (Mental Model) &rarr;"}
                          </span>
                        </button>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-ink-subtle">
                          2D Cartoon Guide
                        </span>
                      </div>

                      {/* Expandable Inline Cartoon for Mobile / In-Place Reading */}
                      {expandedCardCartoon === sIdx && (
                        <div className="pt-2">
                          <div className="p-3 bg-surface border border-rule">
                            <ThinkingCartoonVisual
                              episodeId={ep.id}
                              stepIndex={sIdx}
                              totalSteps={total}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Diagram Column: sticky side-by-side at lg+; static block below lg
            (a sticky 56vh panel over a single column leaves no room to read) */}
        <div className="order-1 lg:order-2 lg:col-span-6 relative lg:self-stretch">
          <div className="lg:sticky lg:top-24 xl:top-28 z-20">
            <div className="bento-card p-5 sm:p-6 border border-rule bg-surface max-md:h-auto md:h-[56vh] lg:h-[calc(100vh-7.5rem)] xl:h-[calc(100vh-8.5rem)] lg:max-h-[860px] flex flex-col justify-between overflow-hidden">
            {/* Visual Header with Step Counter + Prev/Next Controls */}
            <div className="space-y-2.5 shrink-0">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-accent-ink px-0.5 tabular-nums">
                    Step {activeStep + 1} / {total}
                  </span>
                  {/* Mode Toggle: Technical Chart vs 2D Cartoon */}
                  <div className="flex items-center gap-0.5 bg-surface-hover p-0.5 border border-rule rounded-sm">
                    <button
                      type="button"
                      onClick={() => setMainVisualMode("technical")}
                      aria-pressed={mainVisualMode === "technical"}
                      className={`px-2 py-0.5 text-[11px] font-semibold transition-colors cursor-pointer rounded-xs ${
                        mainVisualMode === "technical"
                          ? "bg-ink text-bg"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      📊 แผนภาพ
                    </button>
                    <button
                      type="button"
                      onClick={() => setMainVisualMode("cartoon")}
                      aria-pressed={mainVisualMode === "cartoon"}
                      className={`px-2 py-0.5 text-[11px] font-semibold transition-colors cursor-pointer rounded-xs ${
                        mainVisualMode === "cartoon"
                          ? "bg-accent text-white"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      🎨 การ์ตูนวิธีคิด 2D
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollToStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    aria-label="ขั้นตอนก่อนหน้า"
                    className="tactile-btn w-8 h-8 border border-rule bg-surface font-mono font-bold text-ink-muted hover:text-ink hover:border-rule-strong disabled:opacity-30 cursor-pointer flex items-center justify-center"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToStep(Math.min(total - 1, activeStep + 1))}
                    disabled={activeStep === total - 1}
                    aria-label="ขั้นตอนถัดไป"
                    className="tactile-btn tactile-btn-accent w-8 h-8 border border-accent bg-accent text-white font-mono font-bold hover:bg-accent-ink hover:border-accent-ink disabled:opacity-30 cursor-pointer flex items-center justify-center"
                  >
                    ↓
                  </button>
                </div>
              </div>

              {/* Segmented Step Bar */}
              <div className="flex gap-1 w-full">
                {ep.steps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToStep(i)}
                    aria-label={`Jump to step ${i + 1}`}
                    className={`h-1 flex-1 transition-colors duration-200 cursor-pointer ${
                      i === activeStep
                        ? "bg-accent"
                        : i < activeStep
                        ? "bg-rule-strong"
                        : "bg-rule hover:bg-rule-strong"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Dynamic Visual Panel with Motion Transitions */}
            <div className="flex-1 min-h-0 pt-2 flex flex-col justify-between overflow-y-auto overflow-x-hidden custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${ep.id}-${mainVisualMode}`}
                  initial={{ opacity: 0.75 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  {mainVisualMode === "cartoon" ? (
                    <ThinkingCartoonVisual
                      episodeId={ep.id}
                      stepIndex={activeStep}
                      totalSteps={total}
                    />
                  ) : currentStepData.visual.kind === "kmeans" ? (
                    <KMeansPanel
                      visual={currentStepData.visual}
                      stepIndex={activeStep}
                      viewMode={(viewModes[ep.id] as "chart" | "vectors") || "chart"}
                      onViewModeChange={handleViewModeChange}
                    />
                  ) : currentStepData.visual.kind === "confusion-matrix" ? (
                    <MatrixPanel
                      visual={currentStepData.visual}
                      stepIndex={activeStep}
                      viewMode={(viewModes[ep.id] as "grid" | "chart") || "grid"}
                      onViewModeChange={handleViewModeChange}
                    />
                  ) : currentStepData.visual.kind === "decision-tree" ? (
                    <DecisionTreePanel
                      visual={currentStepData.visual}
                      stepIndex={activeStep}
                      viewMode={(viewModes[ep.id] as "chart" | "tree") || "chart"}
                      onViewModeChange={handleViewModeChange}
                    />
                  ) : currentStepData.visual.kind === "boxplot" ? (
                    <BoxplotPanel
                      visual={currentStepData.visual}
                      stepIndex={activeStep}
                    />
                  ) : currentStepData.visual.kind === "shap-force" ? (
                    <ShapForcePanel
                      visual={currentStepData.visual}
                      stepIndex={activeStep}
                    />
                  ) : currentStepData.visual.kind === "concept-drift" ? (
                    <ConceptDriftPanel
                      visual={currentStepData.visual}
                      stepIndex={activeStep}
                    />
                  ) : (
                    <p className="text-ink-muted text-center py-10">ยังไม่มีภาพสำหรับขั้นตอนนี้</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
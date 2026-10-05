"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Episode, EpisodeVisual } from "@/content/types";

/* ------------------------------------------------------------------ */
/* Visual panels — one renderer per EpisodeVisual kind                  */
/* ------------------------------------------------------------------ */

const CLUSTER_COLOR = ["var(--accent)", "#5C5C5C", "#9A9A9F"];

function KMeansPanel({
  visual,
  showAssignment,
}: {
  visual: Extract<EpisodeVisual, { kind: "kmeans" }>;
  showAssignment: boolean;
}) {
  const W = 100;
  const H = 100;
  const pad = 8;
  const sx = (v: number) => pad + (v / 12) * (W - pad * 2);
  const sy = (v: number) => H - pad - (v / 12) * (H - pad * 2);

  const groups: Record<string, string[]> = { C1: [], C2: [], C3: [] };
  for (const p of visual.points) {
    let best = visual.initialCentroids[0];
    let bd = Infinity;
    for (const c of visual.initialCentroids) {
      const d =
        visual.metric === "manhattan"
          ? Math.abs(p.x - c.x) + Math.abs(p.y - c.y)
          : Math.sqrt((p.x - c.x) ** 2 + (p.y - c.y) ** 2);
      if (d < bd) {
        bd = d;
        best = c;
      }
    }
    groups[best.id].push(p.id);
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full"
      role="img"
      aria-label={`กราฟการจัดกลุ่ม ${visual.points.length} จุด ด้วยระยะห่าง${
        visual.metric === "manhattan" ? "แบบแมนฮัทตัน" : "แบบยูคลิเดียน"
      }`}
    >
      {/* axes */}
      <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="var(--rule-strong)" strokeWidth="0.3" />
      <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="var(--rule-strong)" strokeWidth="0.3" />

      {/* assignment lines, only once the step asks for them */}
      {showAssignment
        ? visual.points.map((p) => {
            let best = visual.initialCentroids[0];
            let bd = Infinity;
            for (const c of visual.initialCentroids) {
              const d = Math.abs(p.x - c.x) + Math.abs(p.y - c.y);
              if (d < bd) {
                bd = d;
                best = c;
              }
            }
            return (
              <line
                key={p.id}
                x1={sx(p.x)}
                y1={sy(p.y)}
                x2={sx(best.x)}
                y2={sy(best.y)}
                stroke="var(--rule-strong)"
                strokeWidth="0.15"
                strokeDasharray="0.8 0.6"
              />
            );
          })
        : null}

      {/* points, coloured by assigned cluster once assignment is shown */}
      {visual.points.map((p) => {
        const gi = Object.keys(groups).findIndex((k) => groups[k].includes(p.id));
        return (
          <circle
            key={p.id}
            cx={sx(p.x)}
            cy={sy(p.y)}
            r="1.6"
            fill={showAssignment && gi >= 0 ? CLUSTER_COLOR[gi] : "var(--ink)"}
          />
        );
      })}

      {/* centroids as crosses */}
      {visual.initialCentroids.map((c) => (
        <g key={c.id}>
          <line
            x1={sx(c.x) - 2.4} y1={sy(c.y)}
            x2={sx(c.x) + 2.4} y2={sy(c.y)}
            stroke="var(--accent)" strokeWidth="0.5"
          />
          <line
            x1={sx(c.x)} y1={sy(c.y) - 2.4}
            x2={sx(c.x)} y2={sy(c.y) + 2.4}
            stroke="var(--accent)" strokeWidth="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

function MatrixPanel({
  visual,
  showNumbers,
}: {
  visual: Extract<EpisodeVisual, { kind: "confusion-matrix" }>;
  showNumbers: boolean;
}) {
  const cell = (label: string, value: number, tone: "pos" | "neg") => (
    <div className="border border-rule p-4">
      <p className="meta-label tracking-display text-ink-subtle">{label}</p>
      {showNumbers ? (
        <p className="tnum text-3xl mt-2 text-accent-ink font-medium">{value}</p>
      ) : (
        <p className="tnum text-3xl mt-2 text-ink-subtle">—</p>
      )}
      <p className="text-xs text-ink-muted mt-2">
        {tone === "pos" ? "ความจริงเป็นบวก" : "ความจริงเป็นลบ"}
      </p>
    </div>
  );

  return (
    <div>
      <p className="meta-label tracking-display text-ink-subtle mb-4">
        Positive class = {visual.positiveLabel} ({visual.positiveLabelTh})
      </p>
      <div className="grid grid-cols-2 gap-3">
        {cell("TP", visual.tp, "pos")}
        {cell("FN", visual.fn, "pos")}
        {cell("FP", visual.fp, "neg")}
        {cell("TN", visual.tn, "neg")}
      </div>
      <p className="meta-label tracking-reset mt-5">
        แถวบนคือความจริงเป็น {visual.positiveLabel} · คอลัมน์ซ้ายคือโมเดลทำนาย{" "}
        {visual.positiveLabel}
      </p>
    </div>
  );
}

function DecisionTreePanel({
  visual,
}: {
  visual: Extract<EpisodeVisual, { kind: "decision-tree" }>;
}) {
  return (
    <div>
      <p className="meta-label tracking-display text-ink-subtle mb-4">
        ค่า Gini ที่ราก = <span className="tnum text-accent-ink">{visual.rootGini.toFixed(3)}</span>
      </p>

      {/* Root node */}
      <div className="border border-rule p-3 text-center">
        <p className="meta-label tracking-display">โหนดพ่อ</p>
        <p className="tnum text-sm text-ink-muted mt-1">n = 12</p>
      </div>

      <div className="text-center my-2" aria-hidden="true">
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M8 0v10M8 10L2 20M8 10l6 10" stroke="var(--rule-strong)" strokeWidth="1" />
        </svg>
      </div>

      <div className="space-y-4">
        {visual.splits.map((s) => {
          const better = s.gain >= 0.222;
          return (
            <div key={s.feature} className="border border-rule p-3">
              <p className="tnum text-sm font-medium">{s.feature}</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="border border-rule p-3">
                  <p className="meta-label tracking-display text-ink-subtle">ซ้าย n={s.nLeft}</p>
                  <p className="tnum text-lg mt-1">{s.giniLeft.toFixed(3)}</p>
                </div>
                <div className="border border-rule p-3">
                  <p className="meta-label tracking-display text-ink-subtle">ขวา n={s.nRight}</p>
                  <p className="tnum text-lg mt-1">{s.giniRight.toFixed(3)}</p>
                </div>
              </div>
              <dl className="mt-3 space-y-1">
                <div className="flex justify-between gap-3">
                  <dt className="tnum text-sm text-ink-muted">Weighted Gini</dt>
                  <dd className="tnum text-sm">{s.weightedGini.toFixed(3)}</dd>
                </div>
                <div className="flex justify-between gap-3 border-t border-rule pt-1">
                  <dt className="tnum text-sm text-ink-muted">Gini Gain</dt>
                  <dd className="tnum text-lg text-accent-ink font-medium">
                    {s.gain.toFixed(3)}
                  </dd>
                </div>
              </dl>
              {visual.splits.length > 1 ? (
                <p
                  className={`mt-2 meta-label tracking-display ${better ? "text-accent-ink" : "text-ink-subtle"}`}
                >
                  {better ? "Gain สูงสุด เลือกตัวนี้" : "Gain ต่ำกว่า ไม่เลือก"}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {visual.splits.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">
          ยังไม่มี Candidate Split ที่ต้องเปรียบเทียบในขั้นตอนนี้
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The player                                                           */
/* ------------------------------------------------------------------ */

export function EpisodePlayer({ episodes }: { episodes: Episode[] }) {
  const [epIdx, setEpIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const railId = useId();
  const step = episodes[epIdx].steps[stepIdx];

  const goto = useCallback((ep: number, st: number) => {
    setEpIdx(ep);
    setStepIdx(st);
  }, []);

  // Keyboard: the step rail is a real range input, so arrows and Home/End
  // already work. ArrowLeft/Right on the section itself is a convenience only.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight" && stepIdx < episodes[epIdx].steps.length - 1) {
        setStepIdx((s) => s + 1);
      } else if (e.key === "ArrowLeft" && stepIdx > 0) {
        setStepIdx((s) => s - 1);
      }
    }
    const el = document.getElementById(railId);
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
  }, [epIdx, stepIdx, episodes, railId]);

  const ep = episodes[epIdx];
  const total = ep.steps.length;

  return (
    <div id={railId} className="grid-12 gap-sp-1 items-start">
      {/* ---------------- copy column ---------------- */}
      <div className="col-span-12 lg:col-span-5">
        {/* episode switcher */}
        <div className="flex gap-2 flex-wrap mb-sp-1">
          {episodes.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => goto(i, 0)}
              aria-current={i === epIdx ? "true" : undefined}
              className={`tap px-4 py-2 border transition-colors duration-200 ${
                i === epIdx
                  ? "border-accent text-accent-ink"
                  : "border-rule text-ink-muted hover:text-ink"
              }`}
            >
              <span className="meta-label tracking-display">
                EP {e.index} &mdash; {e.title}
              </span>
            </button>
          ))}
        </div>

        <p className="meta-label text-ink-subtle">
          {ep.titleTh} &middot; {ep.lectures.join(" ")}
        </p>

        <div
          aria-live="polite"
          aria-atomic="true"
          className="mt-6 border-t-2 border-accent pt-6 min-h-[16rem]"
        >
          <p className="index text-5xl text-accent-ink">
            {String(step.n).padStart(2, "0")}
            <span className="text-ink-subtle text-2xl">/{String(total).padStart(2, "0")}</span>
          </p>
          <h3 className="mt-4 text-3xl tracking-reset">{step.headline}</h3>
          <p className="mt-4 text-lg text-ink-muted max-w-prose">{step.body}</p>

          {step.numbers && step.numbers.length > 0 ? (
            <ul className="mt-6 space-y-1">
              {step.numbers.map((n, i) => (
                <li key={i} className="tnum text-sm text-accent-ink">
                  {n}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* step rail: a real range input, so pointer, keyboard and AT all work */}
        <div className="mt-sp-1">
          <label htmlFor={`${railId}-range`} className="meta-label tracking-reset block">
            ขั้นตอนที่ {step.n} จาก {total}
          </label>
          <input
            id={`${railId}-range`}
            type="range"
            min={1}
            max={total}
            value={step.n}
            onChange={(e) => setStepIdx(Number(e.target.value) - 1)}
            className="mt-3 w-full"
          />
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setStepIdx((s) => Math.max(0, s - 1))}
              disabled={stepIdx === 0}
              className="tap px-5 py-3 border border-rule hover:border-accent disabled:opacity-35 disabled:hover:border-rule"
            >
              <span className="meta-label tracking-display">ก่อนหน้า</span>
            </button>
            <button
              type="button"
              onClick={() => setStepIdx((s) => Math.min(total - 1, s + 1))}
              disabled={stepIdx === total - 1}
              className="tap px-5 py-3 border border-rule hover:border-accent disabled:opacity-35 disabled:hover:border-rule"
            >
              <span className="meta-label tracking-display">ถัดไป</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- sticky full-bleed panel ---------------- */}
      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <div className="lg:sticky lg:top-24 aspect-square w-full border border-rule p-6">
          {step.visual.kind === "kmeans" ? (
            <KMeansPanel visual={step.visual} showAssignment={step.n >= 5} />
          ) : step.visual.kind === "confusion-matrix" ? (
            <MatrixPanel visual={step.visual} showNumbers={step.n >= 2} />
          ) : step.visual.kind === "decision-tree" ? (
            <DecisionTreePanel visual={step.visual} />
          ) : (
            <p className="text-ink-muted">ยังไม่มีภาพสำหรับขั้นตอนนี้</p>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import type { Episode, EpisodeVisual } from "@/content/types";
import { ThinkingNotes } from "./thinking-notes";
import { Tex } from "./math-formula";
import { fmt } from "./ui";

type Kind = EpisodeVisual["kind"];
type PanelProps<K extends Kind> = { visual: Extract<EpisodeVisual, { kind: K }>; step: number };

const SERIES = ["var(--color-series-1)", "var(--color-series-2)", "var(--color-series-3)"];
const MOVE = "transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)";
const avg = (xs: number[]) => xs.reduce((s, v) => s + v, 0) / xs.length;

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

const KM_SIZE = 260, KM_M = 26, KM_MAX = 12;
const kx = (v: number) => KM_M + (v / KM_MAX) * (KM_SIZE - 2 * KM_M);
const ky = (v: number) => KM_SIZE - KM_M - (v / KM_MAX) * (KM_SIZE - 2 * KM_M);
const KM_TICKS = [0, 2, 4, 6, 8, 10, 12];

function KMeansPanel({ visual, step }: PanelProps<"kmeans">) {
  const uid = useId();
  const showCentroids = step >= 1;
  const showDistances = step >= 2 && step < 4;
  const showAssignment = step >= 4;
  const round2 = step >= 5;

  const { assign, means } = useMemo(() => {
    const d = (a: { x: number; y: number }, b: { x: number; y: number }) =>
      visual.metric === "manhattan" ? Math.abs(a.x - b.x) + Math.abs(a.y - b.y) : Math.hypot(a.x - b.x, a.y - b.y);
    const assign: Record<string, number> = {};
    for (const p of visual.points) {
      let best = 0;
      visual.initialCentroids.forEach((c, i) => {
        if (d(p, c) < d(p, visual.initialCentroids[best]) - 1e-9) best = i;
      });
      assign[p.id] = best;
    }
    const means = visual.initialCentroids.map((c, i) => {
      const m = visual.points.filter((p) => assign[p.id] === i);
      return { id: c.id, x: m.length ? avg(m.map((p) => p.x)) : c.x, y: m.length ? avg(m.map((p) => p.y)) : c.y, members: m };
    });
    return { assign, means };
  }, [visual]);

  const centroids = round2 ? means : visual.initialCentroids;
  const stage =
    step === 0 ? "จุดข้อมูลตั้งต้น"
    : step === 1 ? "วาง Centroid เริ่มต้น"
    : step < 4 ? "วัดระยะ แล้วชี้ไปหา Centroid ที่ใกล้สุด"
    : step === 4 ? "จัดทุกจุดเข้ากลุ่ม"
    : "ย้าย Centroid ไปที่ค่าเฉลี่ยของสมาชิก";

  return (
    <div>
      <PanelHead title="K-Means" sub={`${visual.metric === "manhattan" ? "Manhattan" : "Euclidean"} · ${stage}`} />

      <svg viewBox={`0 0 ${KM_SIZE} ${KM_SIZE}`} className="mx-auto w-full max-w-[420px]" role="img"
        aria-label={`แผนภาพ K-Means ${visual.points.length} จุด: ${stage}`}>
        <defs>
          <marker id={`${uid}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="var(--color-ink-subtle)" />
          </marker>
        </defs>

        {KM_TICKS.map((t) => (
          <g key={t}>
            <line x1={kx(t)} x2={kx(t)} y1={ky(0)} y2={ky(KM_MAX)} stroke="var(--color-rule)" strokeWidth={t === 0 ? 1 : 0.5} />
            <line x1={kx(0)} x2={kx(KM_MAX)} y1={ky(t)} y2={ky(t)} stroke="var(--color-rule)" strokeWidth={t === 0 ? 1 : 0.5} />
            <text x={kx(t)} y={KM_SIZE - KM_M + 14} textAnchor="middle" fontSize="9" fill="var(--color-ink-subtle)" className="font-mono">{t}</text>
            <text x={KM_M - 6} y={ky(t) + 3} textAnchor="end" fontSize="9" fill="var(--color-ink-subtle)" className="font-mono">{t}</text>
          </g>
        ))}

        {(showDistances || showAssignment) &&
          visual.points.map((p) => {
            const c = centroids[assign[p.id]];
            return (
              <line key={p.id} x1={kx(p.x)} y1={ky(p.y)} x2={kx(c.x)} y2={ky(c.y)}
                stroke={showAssignment ? SERIES[assign[p.id]] : "var(--color-accent)"}
                strokeOpacity={showAssignment ? 0.45 : 0.8} strokeDasharray="3 3" />
            );
          })}

        {round2 &&
          visual.initialCentroids.map((c, i) =>
            c.x === means[i].x && c.y === means[i].y ? null : (
              <g key={c.id}>
                <circle cx={kx(c.x)} cy={ky(c.y)} r={6} fill="none" stroke={SERIES[i]} strokeDasharray="2 2" />
                <line x1={kx(c.x)} y1={ky(c.y)} x2={kx(means[i].x)} y2={ky(means[i].y)}
                  stroke="var(--color-ink-subtle)" markerEnd={`url(#${uid}-arrow)`} />
              </g>
            ),
          )}

        {visual.points.map((p) => (
          <g key={p.id}>
            <circle cx={kx(p.x)} cy={ky(p.y)} r={4}
              fill={showAssignment ? SERIES[assign[p.id]] : "var(--color-ink)"}
              stroke="var(--color-surface)" strokeWidth={1}
              style={{ transition: "fill 400ms" }} />
            <text x={kx(p.x) + 7} y={ky(p.y) + 3.5} fontSize="9" fill="var(--color-ink-muted)" className="font-mono">{p.id}</text>
          </g>
        ))}

        {showCentroids &&
          centroids.map((c, i) => (
            <g key={c.id} style={{ transform: `translate(${kx(c.x)}px, ${ky(c.y)}px)`, transition: MOVE }}>
              <rect x={-5} y={-5} width={10} height={10} transform="rotate(45)" fill={SERIES[i]} stroke="var(--color-surface)" strokeWidth={1.5} />
              <text y={-10} textAnchor="middle" fontSize="10" fontWeight={600} fill={SERIES[i]} className="font-mono">{c.id}</text>
            </g>
          ))}
      </svg>

      {showAssignment ? (
        <ul className="mt-4 grid gap-1.5 text-sm">
          {means.map((m, i) => (
            <li key={m.id} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: SERIES[i] }} />
              <span className="font-mono text-ink">{m.id}</span>
              <span className="text-ink-muted">{`{ ${m.members.map((p) => p.id).join(", ")} }`}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {round2 ? (
        <Insight>
          <p className="mb-2">Centroid ใหม่ = ค่าเฉลี่ยพิกัดของสมาชิก</p>
          <div className="space-y-1.5">
            {means.map((m) => (
              <Tex key={m.id} className="block"
                tex={`${m.id} = \\left(\\tfrac{${m.members.map((p) => p.x).join("+")}}{${m.members.length}},\\ \\tfrac{${m.members.map((p) => p.y).join("+")}}{${m.members.length}}\\right) = \\ans{(${fmt(m.x, 2)},\\ ${fmt(m.y, 2)})}`} />
            ))}
          </div>
        </Insight>
      ) : null}
    </div>
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

function MatrixPanel({ visual, step }: PanelProps<"confusion-matrix">) {
  const { tp, fp, fn, tn, positiveLabel: pos } = visual;
  const n = tp + fp + fn + tn;
  const showNumbers = step >= 1;
  const focus = MATRIX_FOCUS[step];
  const P = tp / (tp + fp), R = tp / (tp + fn), F1 = (2 * P * R) / (P + R), A = (tp + tn) / n;

  const metrics: Record<MetricKey, { label: string; value: number; tex: string }> = {
    accuracy: { label: "Accuracy", value: A, tex: `\\text{Accuracy} = \\dfrac{TP+TN}{N} = \\dfrac{${tp}+${tn}}{${n}} = \\ans{${fmt(A, 3)}}` },
    precision: { label: "Precision", value: P, tex: `\\text{Precision} = \\dfrac{TP}{TP+FP} = \\dfrac{${tp}}{${tp}+${fp}} = \\ans{${fmt(P, 3)}}` },
    recall: { label: "Recall", value: R, tex: `\\text{Recall} = \\dfrac{TP}{TP+FN} = \\dfrac{${tp}}{${tp}+${fn}} = \\ans{${fmt(R, 3)}}` },
    f1: { label: "F1", value: F1, tex: `F_1 = 2\\cdot\\dfrac{P\\cdot R}{P+R} = 2\\cdot\\dfrac{${fmt(P, 3)}\\cdot ${fmt(R, 3)}}{${fmt(P, 3)}+${fmt(R, 3)}} = \\ans{${fmt(F1, 3)}}` },
  };

  const cell = (k: Cell, desc: string) => {
    const on = focus ? CELLS_FOR[focus].includes(k) : false;
    return (
      <div className={`rounded-lg border p-3 transition-[opacity,background-color,border-color] duration-300 ${
        on ? "border-accent bg-accent-wash" : "border-rule bg-surface"} ${focus && !on ? "opacity-40" : ""}`}>
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-mono text-xs font-semibold text-ink">{k.toUpperCase()}</span>
          <span className="text-[11px] text-ink-subtle">{desc}</span>
        </div>
        <p className="num mt-1 font-mono text-3xl font-semibold text-ink">{showNumbers ? visual[k] : "–"}</p>
      </div>
    );
  };

  return (
    <div>
      <PanelHead title="Confusion Matrix" sub={`แถว = ค่าจริง · คอลัมน์ = ค่าที่ทาย · Positive = ${pos}`} />

      <div className="grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-2 text-xs">
        <span />
        <span className="text-center text-ink-subtle">ทาย {pos}</span>
        <span className="text-center text-ink-subtle">ทาย ไม่ใช่ {pos}</span>
        <span className="self-center pr-1 text-ink-subtle">จริง {pos}</span>
        {cell("tp", "ถูก")}
        {cell("fn", "พลาด")}
        <span className="self-center pr-1 text-ink-subtle">จริง ไม่ใช่</span>
        {cell("fp", "เตือนผิด")}
        {cell("tn", "ถูก")}
      </div>

      {showNumbers ? (
        <ul className="mt-5 space-y-2">
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
          <>N = {n} · จริง {pos} = {tp + fn} · จริง ไม่ใช่ {pos} = {fp + tn}</>
        ) : (
          <>กำหนดก่อนเสมอว่า <strong>{pos}</strong> คือ Positive — ถ้าสลับฝั่ง Precision และ Recall จะเปลี่ยนทั้งหมด</>
        )}
      </Insight>
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
      <PanelHead title="เลือกจุดแบ่งของ Decision Tree" sub="เกณฑ์: Gini Gain สูงสุด = Weighted Gini ต่ำสุด" />

      <div className="mx-auto max-w-xs rounded-xl border border-rule bg-surface-hover px-4 py-3 text-center">
        <p className="text-xs text-ink-subtle">โหนดแม่</p>
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
        <line x1={x(min)} x2={x(q1)} y1={MID} y2={MID} stroke="var(--color-ink)" />
        <line x1={x(q3)} x2={x(max)} y1={MID} y2={MID}
          stroke={showWhisker ? "var(--color-accent)" : "var(--color-ink)"} strokeWidth={showWhisker ? 2 : 1} />
        {[min, max].map((v) => <line key={v} x1={x(v)} x2={x(v)} y1={MID - 7} y2={MID + 7} stroke="var(--color-ink)" />)}
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

function ShapForcePanel({ visual, step }: PanelProps<"shap-force">) {
  const base = visual.baseValue;
  let run = base;
  const rows = visual.contributions.map((c) => {
    const from = run;
    run += c.value;
    return { ...c, from, to: run };
  });
  const ends = [base, ...rows.map((r) => r.to)];
  const lo = Math.min(...ends), hi = Math.max(...ends), pad = (hi - lo) * 0.08 || 1;
  const pos = (v: number) => ((v - (lo - pad)) / (hi - lo + 2 * pad)) * 100;
  const shown = rows.slice(0, step);
  const pred = shown.length ? shown[shown.length - 1].to : base;
  const up = "var(--color-series-2)", down = "var(--color-series-1)";

  const Track = ({ children }: { children?: ReactNode }) => (
    <div className="relative h-6 rounded bg-paper">
      <div className="absolute inset-y-0 w-px bg-rule-strong" style={{ left: `${pos(base)}%` }} />
      {children}
    </div>
  );

  return (
    <div>
      <PanelHead title="SHAP: ฟีเจอร์ไหนดันผลทำนาย" sub="Lect 09 · หน่วยเป็นจุดเปอร์เซ็นต์" />

      <div className="space-y-2 text-sm">
        <div className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)_3.5rem] items-center gap-3">
          <span className="text-ink-muted">Base value</span>
          <Track>
            <div className="absolute inset-y-1 w-1 -translate-x-1/2 rounded-sm bg-ink-subtle" style={{ left: `${pos(base)}%` }} />
          </Track>
          <span className="num text-right font-mono text-ink">{fmt(base, 2)}</span>
        </div>

        {shown.map((r) => (
          <div key={r.feature} className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)_3.5rem] items-center gap-3">
            <span className="truncate text-ink">{r.feature}</span>
            <Track>
              <div className="absolute inset-y-1 rounded-sm"
                style={{ left: `${pos(Math.min(r.from, r.to))}%`, width: `${Math.abs(pos(r.to) - pos(r.from))}%`, background: r.value >= 0 ? up : down }} />
            </Track>
            <span className="num text-right font-mono" style={{ color: r.value >= 0 ? up : down }}>
              {r.value >= 0 ? "+" : "−"}{fmt(Math.abs(r.value), 2)}
            </span>
          </div>
        ))}

        <div className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)_3.5rem] items-center gap-3 border-t border-rule pt-2">
          <span className="font-semibold text-ink">f(x)</span>
          <Track>
            <div className="absolute inset-y-0.5 w-1 -translate-x-1/2 rounded-sm bg-accent transition-[left] duration-500" style={{ left: `${pos(pred)}%` }} />
          </Track>
          <span className="num text-right font-mono font-semibold text-ink">{fmt(pred, 2)}</span>
        </div>
      </div>

      <Insight>
        {shown.length === 0 ? (
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
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  const ep = episodes[epIdx];
  const total = ep.steps.length;
  const current = ep.steps[active] ?? ep.steps[0];

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

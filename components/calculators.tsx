"use client";

import { useId, useMemo, useState } from "react";
import { Tex } from "./math-formula";
import { EmptyState, Note, NumberField, Panel, Segmented, WorkingSteps, fmt, pct, sub } from "./ui";

/* ================================================================== */
/* Shared                                                             */
/* ================================================================== */

type Parsed = { value?: number; error?: string };

function parse(raw: string, opts: { integer?: boolean; min?: number } = {}): Parsed {
  const v = raw.trim();
  if (v === "") return { error: "ยังไม่ได้กรอก" };
  const n = Number(v);
  if (!Number.isFinite(n)) return { error: "ต้องเป็นตัวเลข" };
  if (opts.min !== undefined && n < opts.min) return { error: `ต้องไม่น้อยกว่า ${opts.min}` };
  if (opts.integer && !Number.isInteger(n)) return { error: "ต้องเป็นจำนวนเต็ม" };
  return { value: n };
}

/** Field state + "only show an error once the student has touched the field". */
function useFields<K extends string>(initial: Record<K, string>) {
  const [raw, setRaw] = useState<Record<K, string>>(initial);
  const [touched, setTouched] = useState<Partial<Record<K, boolean>>>({});
  return {
    raw,
    set: (k: K, v: string) => {
      setRaw((s) => ({ ...s, [k]: v }) as Record<K, string>);
      setTouched((t) => ({ ...t, [k]: true }));
    },
    touch: (k: K) => setTouched((t) => ({ ...t, [k]: true })),
    load: (vals: Record<K, number>) => {
      setRaw(Object.fromEntries(Object.entries(vals).map(([k, v]) => [k, String(v)])) as Record<K, string>);
      setTouched({});
    },
    isLoaded: (vals: Record<K, number>) =>
      (Object.keys(vals) as K[]).every((k) => raw[k] === String(vals[k])),
    shown: (k: K, errors: Partial<Record<K, string>>) => (touched[k] ? errors[k] : undefined),
  };
}

type Preset = { label: string; onClick: () => void; active?: boolean };

function ToolHeader({ title, lect, desc, presets }: { title: string; lect: string; desc: string; presets?: Preset[] }) {
  return (
    <header className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
        <span className="font-mono text-xs text-ink-subtle">{lect}</span>
      </div>
      <p className="max-w-2xl text-ink-muted">{desc}</p>
      {presets?.length ? (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-ink-subtle">โหลดโจทย์:</span>
          {presets.map((p) => (
            <button key={p.label} type="button" className="chip" onClick={p.onClick} aria-pressed={p.active ?? false}>
              {p.label}
            </button>
          ))}
        </div>
      ) : null}
    </header>
  );
}

/* ================================================================== */
/* Tool 01 — Tukey's fences                                           */
/* ================================================================== */

const TUKEY_FIELDS = [
  { key: "min", label: "Min", hint: "ค่าน้อยที่สุด" },
  { key: "q1", label: "Q₁", hint: "เปอร์เซ็นไทล์ที่ 25" },
  { key: "median", label: "Median", hint: "เปอร์เซ็นไทล์ที่ 50" },
  { key: "q3", label: "Q₃", hint: "เปอร์เซ็นไทล์ที่ 75" },
  { key: "max", label: "Max", hint: "ค่ามากที่สุด" },
] as const;
type TukeyKey = (typeof TUKEY_FIELDS)[number]["key"];

const TUKEY_SLIDE = { min: 10, q1: 20, median: 28, q3: 35, max: 58 };

type TukeyResult = Record<TukeyKey, number> & {
  iqr: number; lower: number; upper: number; lowOut: boolean; highOut: boolean;
};

export function TukeyCalculator() {
  const uid = useId();
  const f = useFields<TukeyKey>({ min: "", q1: "", median: "", q3: "", max: "" });

  const { values, errors } = useMemo(() => {
    const values: Partial<Record<TukeyKey, number>> = {};
    const errors: Partial<Record<TukeyKey, string>> = {};
    let prev: { label: string; value: number } | null = null;
    for (const field of TUKEY_FIELDS) {
      const p = parse(f.raw[field.key]);
      if (p.error) {
        errors[field.key] = p.error;
        continue;
      }
      if (prev && p.value! < prev.value) errors[field.key] = `ต้องไม่น้อยกว่า ${prev.label} (${fmt(prev.value)})`;
      values[field.key] = p.value!;
      prev = { label: field.label, value: p.value! };
    }
    return { values, errors };
  }, [f.raw]);

  const r = useMemo<TukeyResult | null>(() => {
    const complete = TUKEY_FIELDS.every((x) => values[x.key] !== undefined);
    if (!complete || Object.keys(errors).length) return null;
    const v = values as Record<TukeyKey, number>;
    const iqr = v.q3 - v.q1;
    const lower = v.q1 - 1.5 * iqr;
    const upper = v.q3 + 1.5 * iqr;
    return { ...v, iqr, lower, upper, lowOut: v.min < lower, highOut: v.max > upper };
  }, [values, errors]);

  return (
    <div className="space-y-8">
      <ToolHeader
        title="ตรวจ Outlier ด้วยรั้วของ Tukey"
        lect="Lect 05"
        desc="กรอก Five-Number Summary จากโจทย์ แล้วดูวิธีทำทีละขั้นเหมือนเขียนในกระดาษคำตอบ ตรวจทั้งฝั่งต่ำและฝั่งสูง"
        presets={[{ label: "ตัวอย่างในสไลด์", onClick: () => f.load(TUKEY_SLIDE), active: f.isLoaded(TUKEY_SLIDE) }]}
      />

      <fieldset className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <legend className="sr-only">Five-Number Summary เรียงจากน้อยไปมาก</legend>
        {TUKEY_FIELDS.map((field) => (
          <NumberField
            key={field.key}
            id={`${uid}-${field.key}`}
            label={field.label}
            hint={field.hint}
            value={f.raw[field.key]}
            onChange={(v) => f.set(field.key, v)}
            onBlur={() => f.touch(field.key)}
            error={f.shown(field.key, errors)}
            allowNegative
          />
        ))}
      </fieldset>

      {!r ? (
        <EmptyState>กรอกให้ครบ 5 ช่อง เรียงจากน้อยไปมาก: Min ≤ Q₁ ≤ Median ≤ Q₃ ≤ Max</EmptyState>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="วิธีทำ">
            <WorkingSteps
              steps={[
                { label: "หา IQR", tex: `\\mathrm{IQR} = Q_3 - Q_1 = ${sub(r.q3)} - ${sub(r.q1)} = ${fmt(r.iqr)}` },
                {
                  label: "รั้วล่าง (Lower Fence)",
                  tex: `\\text{LF} = Q_1 - 1.5 \\times \\mathrm{IQR} = ${sub(r.q1)} - 1.5 \\times ${sub(r.iqr)} = \\ans{${fmt(r.lower)}}`,
                },
                {
                  label: "รั้วบน (Upper Fence)",
                  tex: `\\text{UF} = Q_3 + 1.5 \\times \\mathrm{IQR} = ${sub(r.q3)} + 1.5 \\times ${sub(r.iqr)} = \\ans{${fmt(r.upper)}}`,
                },
                {
                  label: "เทียบค่าปลายทั้งสองกับรั้ว",
                  tex: `\\text{Min} = ${fmt(r.min)} ${r.lowOut ? "<" : "\\ge"} ${fmt(r.lower)}, \\qquad \\text{Max} = ${fmt(r.max)} ${r.highOut ? ">" : "\\le"} ${fmt(r.upper)}`,
                },
              ]}
            />
          </Panel>

          <Panel title="สรุปผล">
            <FenceDiagram {...r} />
            <dl className="mt-5 grid grid-cols-2 gap-3" aria-live="polite">
              <Verdict label="Min" value={r.min} out={r.lowOut} />
              <Verdict label="Max" value={r.max} out={r.highOut} />
            </dl>
            {r.lowOut || r.highOut ? (
              <div className="mt-5">
                <Note tone="pitfall" title="Whisker ไปจบที่ไหน">
                  Whisker จบที่ <strong className="text-ink">ค่าจริงที่ไกลที่สุดซึ่งยังอยู่ในรั้ว</strong> ไม่ใช่ที่ค่ารั้ว
                  และไม่ใช่ที่ Outlier — Five-Number Summary ไม่บอกค่านี้ ต้องดูจากข้อมูลดิบ (เส้นประในภาพ)
                </Note>
              </div>
            ) : null}
          </Panel>
        </div>
      )}
    </div>
  );
}

function Verdict({ label, value, out }: { label: string; value: number; out: boolean }) {
  return (
    <div className={`rounded-lg border px-3 py-2 ${out ? "border-bad bg-bad-wash" : "border-rule"}`}>
      <dt className="text-xs text-ink-subtle">
        {label} = <span className="num font-mono">{fmt(value)}</span>
      </dt>
      <dd className={`font-semibold ${out ? "text-bad" : "text-ink"}`}>{out ? "เป็น Outlier" : "อยู่ในรั้ว"}</dd>
    </div>
  );
}

function FenceDiagram(r: TukeyResult) {
  const lo = Math.min(r.min, r.lower);
  const hi = Math.max(r.max, r.upper);
  const span = hi - lo || 1;
  const W = 360, PAD = 24, MID = 58;
  const x = (v: number) => PAD + ((v - lo) / span) * (W - 2 * PAD);
  const wl = r.lowOut ? r.lower : r.min;
  const wr = r.highOut ? r.upper : r.max;

  return (
    <svg viewBox={`0 0 ${W} 112`} className="w-full" role="img"
      aria-label={`Boxplot: รั้วล่าง ${fmt(r.lower)}, รั้วบน ${fmt(r.upper)}`}>
      {[{ v: r.lower, t: "LF" }, { v: r.upper, t: "UF" }].map((fence) => (
        <g key={fence.t}>
          <line x1={x(fence.v)} x2={x(fence.v)} y1={24} y2={88} stroke="var(--color-warn)" strokeDasharray="3 3" />
          <text x={x(fence.v)} y={16} textAnchor="middle" fontSize="10" fill="var(--color-warn)" className="font-mono">
            {fence.t} {fmt(fence.v, 2)}
          </text>
        </g>
      ))}

      <line x1={x(wl)} x2={x(r.q1)} y1={MID} y2={MID} stroke="var(--color-ink)" strokeDasharray={r.lowOut ? "2 3" : undefined} />
      <line x1={x(r.q3)} x2={x(wr)} y1={MID} y2={MID} stroke="var(--color-ink)" strokeDasharray={r.highOut ? "2 3" : undefined} />
      {!r.lowOut && <line x1={x(r.min)} x2={x(r.min)} y1={MID - 8} y2={MID + 8} stroke="var(--color-ink)" />}
      {!r.highOut && <line x1={x(r.max)} x2={x(r.max)} y1={MID - 8} y2={MID + 8} stroke="var(--color-ink)" />}

      <rect x={x(r.q1)} y={MID - 14} width={Math.max(1, x(r.q3) - x(r.q1))} height={28} rx={3}
        fill="var(--color-accent-wash)" stroke="var(--color-accent)" />
      <line x1={x(r.median)} x2={x(r.median)} y1={MID - 14} y2={MID + 14} stroke="var(--color-accent)" strokeWidth={2} />

      {r.lowOut && <circle cx={x(r.min)} cy={MID} r={4} fill="var(--color-bad)" />}
      {r.highOut && <circle cx={x(r.max)} cy={MID} r={4} fill="var(--color-bad)" />}

      {[{ v: r.q1, t: "Q₁" }, { v: r.median, t: "Med" }, { v: r.q3, t: "Q₃" }].map((q) => (
        <text key={q.t} x={x(q.v)} y={104} textAnchor="middle" fontSize="10" fill="var(--color-ink-subtle)" className="font-mono">
          {q.t}
        </text>
      ))}
    </svg>
  );
}

/* ================================================================== */
/* Tool 02 — Confusion matrix metrics                                 */
/* ================================================================== */

type CellKey = "tp" | "fn" | "fp" | "tn";
const CELL_KEYS: CellKey[] = ["tp", "fn", "fp", "tn"];
const CELL_INFO: Record<CellKey, { label: string; hint: string }> = {
  tp: { label: "TP", hint: "ทาย + และจริง +" },
  fn: { label: "FN", hint: "ทาย − แต่จริง + · พลาด" },
  fp: { label: "FP", hint: "ทาย + แต่จริง − · เตือนผิด" },
  tn: { label: "TN", hint: "ทาย − และจริง −" },
};
const MATRIX_ROWS: Array<[string, CellKey, CellKey]> = [
  ["จริง +", "tp", "fn"],
  ["จริง −", "fp", "tn"],
];
const METRIC_EXAMPLE = { tp: 4, fn: 2, fp: 1, tn: 3 };
const CHURN_EXAMPLE = { tp: 3, fn: 2, fp: 2, tn: 3 };

export function MetricCalculator() {
  const uid = useId();
  const f = useFields<CellKey>({ tp: "", fn: "", fp: "", tn: "" });

  const { vals, errors } = useMemo(() => {
    const vals: Partial<Record<CellKey, number>> = {};
    const errors: Partial<Record<CellKey, string>> = {};
    for (const k of CELL_KEYS) {
      const p = parse(f.raw[k], { integer: true, min: 0 });
      if (p.error) errors[k] = p.error;
      else vals[k] = p.value!;
    }
    return { vals, errors };
  }, [f.raw]);

  const m = useMemo(() => {
    if (!CELL_KEYS.every((k) => vals[k] !== undefined)) return null;
    const { tp, fn, fp, tn } = vals as Record<CellKey, number>;
    const total = tp + fn + fp + tn;
    // Zero denominator = undefined, NOT zero. Students must not memorise "0".
    const div = (a: number, b: number) => (b === 0 ? null : a / b);
    const precision = div(tp, tp + fp);
    const recall = div(tp, tp + fn);
    const f1 =
      precision === null || recall === null ? null
      : precision + recall === 0 ? 0
      : (2 * precision * recall) / (precision + recall);

    const rows = [
      {
        name: "Accuracy", value: div(tp + tn, total),
        use: "สัดส่วนที่ทายถูกทั้งหมด — หลอกได้เมื่อคลาสไม่สมดุล",
        tex: `\\dfrac{TP+TN}{TP+TN+FP+FN} = \\dfrac{${tp}+${tn}}{${total}}`,
      },
      {
        name: "Precision", value: precision,
        use: "ในที่ทายว่า + ถูกจริงกี่ส่วน — สำคัญเมื่อ FP มีราคาแพง",
        tex: `\\dfrac{TP}{TP+FP} = \\dfrac{${tp}}{${tp}+${fp}}`,
      },
      {
        name: "Recall", value: recall,
        use: "ในที่เป็น + จริง จับได้กี่ส่วน — สำคัญเมื่อ FN อันตราย",
        tex: `\\dfrac{TP}{TP+FN} = \\dfrac{${tp}}{${tp}+${fn}}`,
      },
      {
        name: "F1-Score", value: f1,
        use: "Harmonic mean ของ Precision กับ Recall",
        tex:
          precision !== null && recall !== null
            ? `2\\cdot\\dfrac{P\\cdot R}{P+R} = 2\\cdot\\dfrac{${fmt(precision)}\\cdot ${fmt(recall)}}{${fmt(precision)}+${fmt(recall)}}`
            : `2\\cdot\\dfrac{P\\cdot R}{P+R}`,
      },
    ];
    return { total, precision, recall, f1, rows, noPredPos: tp + fp === 0, noActualPos: tp + fn === 0 };
  }, [vals]);

  return (
    <div className="space-y-8">
      <ToolHeader
        title="มาตรวัดจาก Confusion Matrix"
        lect="Lect 08"
        desc="กรอกตัวเลขลงตาราง 2×2 ตามตำแหน่งจริง (แถว = ค่าจริง, คอลัมน์ = ค่าที่ทาย) แล้วดูการแทนค่าในแต่ละสูตร"
        presets={[
          { label: "เคส FIFA (สไลด์)", onClick: () => f.load(METRIC_EXAMPLE), active: f.isLoaded(METRIC_EXAMPLE) },
          { label: "เคสลูกค้า Inactivity (HW01: 10 คน)", onClick: () => f.load(CHURN_EXAMPLE), active: f.isLoaded(CHURN_EXAMPLE) },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-2">
            <caption className="sr-only">Confusion Matrix: แถวคือค่าจริง คอลัมน์คือค่าที่ทำนาย</caption>
            <thead>
              <tr>
                <td />
                <th scope="col" className="pb-1 text-xs font-medium text-ink-subtle">ทาย +</th>
                <th scope="col" className="pb-1 text-xs font-medium text-ink-subtle">ทาย −</th>
              </tr>
            </thead>
            <tbody>
              {MATRIX_ROWS.map(([rowLabel, a, b]) => (
                <tr key={rowLabel}>
                  <th scope="row" className="pr-1 text-left text-xs font-medium whitespace-nowrap text-ink-subtle">
                    {rowLabel}
                  </th>
                  {[a, b].map((k) => (
                    <td key={k} className={`rounded-lg border p-3 align-top ${k === "tp" || k === "tn" ? "border-rule-strong" : "border-rule"}`}>
                      <NumberField
                        id={`${uid}-${k}`}
                        label={<span className="font-mono">{CELL_INFO[k].label}</span>}
                        hint={CELL_INFO[k].hint}
                        value={f.raw[k]}
                        onChange={(v) => f.set(k, v)}
                        onBlur={() => f.touch(k)}
                        error={f.shown(k, errors)}
                        integer
                        size="sm"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 px-2 text-xs text-ink-subtle">แนวทแยง (TP, TN) คือที่ทายถูก</p>
        </div>

        {!m ? (
          <EmptyState>กรอก TP, FN, FP, TN ให้ครบเพื่อดูวิธีทำ</EmptyState>
        ) : (
          <Panel title="วิธีทำ" meta={`N = ${m.total}`}>
            <ul>
              {m.rows.map((row) => (
                <li key={row.name} className="border-b border-rule py-4 first:pt-0 last:border-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold text-ink">{row.name}</span>
                    {row.value === null ? (
                      <span className="text-sm text-bad">หารไม่ได้ (ตัวส่วน = 0)</span>
                    ) : (
                      <span className="num font-mono text-lg text-ink">{pct(row.value)}</span>
                    )}
                  </div>
                  <div className="mt-2 overflow-x-auto pb-1 text-ink">
                    <Tex tex={row.value === null ? row.tex : `${row.tex} = \\ans{${fmt(row.value)}}`} />
                  </div>
                  <p className="mt-1 text-xs text-ink-subtle">{row.use}</p>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-3" aria-live="polite">
              {m.precision !== null && m.recall !== null && m.f1 !== null && m.precision !== m.recall ? (
                <Note tone="pitfall" title="อย่าเฉลี่ยธรรมดา">
                  ถ้าใช้ (P + R) / 2 จะได้ {fmt((m.precision + m.recall) / 2)} แต่ F1 จริงคือ {fmt(m.f1)} —
                  Harmonic mean ลงโทษตัวที่ต่ำกว่าเสมอ
                </Note>
              ) : null}
              {m.noPredPos ? (
                <Note tone="bad" title="ไม่มีการทายว่า + เลย">
                  TP + FP = 0 จึงหา Precision และ F1 ไม่ได้ — อย่าตอบว่า 0
                </Note>
              ) : null}
              {m.noActualPos ? (
                <Note tone="bad" title="ไม่มีเคส + จริงเลย">
                  TP + FN = 0 จึงหา Recall และ F1 ไม่ได้
                </Note>
              ) : null}
            </div>
          </Panel>
        )}
      </div>

      {/* BQ Customer Inactivity & Churn Meaning Card */}
      <div className="rounded-xl border border-rule bg-surface p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
          <div>
            <h3 className="text-sm font-semibold text-ink">
              💼 มุมมองโจทย์ธุรกิจ (Business Question - BQ): การตามลูกค้า Inactive / Churn
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              ตัวอย่างข้อสอบและการบ้าน Lect 07 Slide 26 &amp; 35 — กำหนด Positive class คือ Inactive = Yes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-mint/30 bg-mint-wash/50 p-3">
            <span className="font-semibold text-mint">TP (True Positive) · ตามถูกคน</span>
            <p className="mt-1 text-ink-muted leading-relaxed">
              ลูกค้าจะ Inactive จริง และโมเดลทายว่าจะ Inactive → ทีมการตลาดส่งข้อเสนอ/โปรโมชั่น Retention ดึงลูกค้าไว้ได้ทันเวลา ปกป้องรายได้ LTV
            </p>
          </div>
          <div className="rounded-lg border border-rule bg-surface-raised p-3">
            <span className="font-semibold text-ink">TN (True Negative) · ปกติสุข</span>
            <p className="mt-1 text-ink-muted leading-relaxed">
              ลูกค้ายัง Active อยู่ และโมเดลทายว่า Active → ปล่อยให้ใช้งานตามปกติ ไม่ต้องส่งโปรโมชั่นไปรบกวน ประหยัดงบประมาณ
            </p>
          </div>
          <div className="rounded-lg border border-amber/30 bg-amber-wash/50 p-3">
            <span className="font-semibold text-amber">FP (False Positive) · เปลืองงบ (Type I Error)</span>
            <p className="mt-1 text-ink-muted leading-relaxed">
              ลูกค้ายัง Active ปกติ แต่โมเดลทายว่าจะเลิก → เสียเงินส่งส่วนลด/โปรโมชั่นให้คนที่พร้อมจ่ายราคาเต็มฟรีๆ (ควบคุมด้วย <strong>Precision</strong>)
            </p>
          </div>
          <div className="rounded-lg border border-rose/30 bg-rose-wash/50 p-3">
            <span className="font-semibold text-rose">FN (False Negative) · เสียลูกค้าถาวร! (Type II Error)</span>
            <p className="mt-1 text-ink-muted leading-relaxed">
              ลูกค้าจะเลิกจริง แต่โมเดลทายว่าปกติ → ไม่ได้เข้าไปดูแล ลูกค้าหนีไปหาคู่แข่งถาวร เสียหายร้ายแรงที่สุด (ควบคุมด้วย <strong>Recall</strong>)
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-surface-hover p-3 text-xs text-ink-muted leading-relaxed border border-rule/60">
          💡 <strong>การเลือก Model ตามโจทย์ธุรกิจ (Trade-off):</strong> หากธุรกิจกลัวเสียลูกค้าที่สุด (Cost of Lost Customer สูงมาก) ต้องเลือกโมเดลที่มี <strong>Recall สูง</strong> (เช่น Model B = 90%) แต่ถ้างบประมาณแคมเปญจำกัดมาก (Cost of Campaign สูงมาก) ต้องเลือกโมเดลที่มี <strong>Precision สูง</strong> (เช่น Model A = 89%)
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Tool 03 — Gini impurity & gain                                     */
/* ================================================================== */

type GiniKey = "l1" | "l2" | "r1" | "r2";
const GINI_KEYS: GiniKey[] = ["l1", "l2", "r1", "r2"];
const GINI_PRESETS = [
  { label: "Candidate A: Days ≤ 45", vals: { l1: 5, l2: 1, r1: 1, r2: 5 } },
  { label: "Candidate B: Purchases ≤ 2", vals: { l1: 2, l2: 4, r1: 4, r2: 2 } },
];
const GINI_CHILDREN = [
  { title: "กิ่งซ้าย", keys: ["l1", "l2"] },
  { title: "กิ่งขวา", keys: ["r1", "r2"] },
] as const;

function gini(a: number, b: number) {
  const n = a + b;
  if (n === 0) return 0;
  const p = a / n, q = b / n;
  return 1 - (p * p + q * q);
}

function giniTex(name: string, a: number, b: number, value: number) {
  const n = a + b;
  if (n === 0) return `\\mathrm{Gini}_{\\text{${name}}} = 0 \\quad (n = 0)`;
  return `\\mathrm{Gini}_{\\text{${name}}} = 1 - \\left[\\left(\\tfrac{${a}}{${n}}\\right)^2 + \\left(\\tfrac{${b}}{${n}}\\right)^2\\right] = ${fmt(value)}`;
}

export function GiniCalculator() {
  const uid = useId();
  const f = useFields<GiniKey>({ l1: "5", l2: "1", r1: "1", r2: "5" });

  const { errors, r } = useMemo(() => {
    const errors: Partial<Record<GiniKey, string>> = {};
    const v = {} as Record<GiniKey, number>;
    for (const k of GINI_KEYS) {
      const p = parse(f.raw[k], { integer: true, min: 0 });
      if (p.error) errors[k] = p.error;
      else v[k] = p.value!;
    }
    if (Object.keys(errors).length) return { errors, r: null };
    const p1 = v.l1 + v.r1, p2 = v.l2 + v.r2;
    const nL = v.l1 + v.l2, nR = v.r1 + v.r2, n = nL + nR;
    if (n === 0) return { errors, r: null };
    const gP = gini(p1, p2), gL = gini(v.l1, v.l2), gR = gini(v.r1, v.r2);
    const split = (nL / n) * gL + (nR / n) * gR;
    return { errors, r: { ...v, p1, p2, nL, nR, n, gP, gL, gR, split, gain: gP - split } };
  }, [f.raw]);

  return (
    <div className="space-y-8">
      <ToolHeader
        title="Gini Impurity และ Gini Gain"
        lect="Lect 07"
        desc="กรอกจำนวนแต่ละคลาสในกิ่งซ้ายและขวา โหนดแม่จะรวมให้อัตโนมัติ ลองโหลด Candidate A และ B แล้วเทียบว่าต้นไม้จะเลือก split ไหน"
        presets={GINI_PRESETS.map((p) => ({ label: p.label, onClick: () => f.load(p.vals), active: f.isLoaded(p.vals) }))}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
        {/* Inputs drawn as a tiny tree */}
        <div>
          <div className="mx-auto max-w-xs rounded-xl border border-rule bg-surface-hover px-4 py-3 text-center">
            <p className="text-xs text-ink-subtle">โหนดแม่ (รวมจากกิ่งลูก)</p>
            <p className="num mt-1 font-mono text-sm text-ink">
              {r ? `คลาส 1 = ${r.p1} · คลาส 2 = ${r.p2} · n = ${r.n}` : "–"}
            </p>
          </div>
          <svg aria-hidden viewBox="0 0 100 12" preserveAspectRatio="none" className="mx-auto block h-6 w-1/2 text-rule-strong">
            <path d="M50 0 L25 12 M50 0 L75 12" stroke="currentColor" fill="none" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="grid grid-cols-2 gap-3">
            {GINI_CHILDREN.map((child) => (
              <fieldset key={child.title} className="space-y-3 rounded-xl border border-rule p-4">
                <legend className="px-1 text-sm font-medium text-ink">{child.title}</legend>
                {child.keys.map((k, i) => (
                  <NumberField
                    key={k}
                    id={`${uid}-${k}`}
                    label={`คลาส ${i + 1}`}
                    value={f.raw[k]}
                    onChange={(v) => f.set(k, v)}
                    onBlur={() => f.touch(k)}
                    error={f.shown(k, errors)}
                    integer
                    size="sm"
                  />
                ))}
              </fieldset>
            ))}
          </div>
        </div>

        {!r ? (
          <EmptyState>กรอกจำนวนเต็มที่ไม่ติดลบให้ครบ 4 ช่อง</EmptyState>
        ) : (
          <Panel title="วิธีทำ">
            <WorkingSteps
              steps={[
                { label: "ความไม่บริสุทธิ์ของโหนดแม่", tex: giniTex("parent", r.p1, r.p2, r.gP) },
                { label: "กิ่งซ้าย", tex: giniTex("left", r.l1, r.l2, r.gL) },
                { label: "กิ่งขวา", tex: giniTex("right", r.r1, r.r2, r.gR) },
                {
                  label: "ถ่วงน้ำหนักตามจำนวนในแต่ละกิ่ง",
                  tex: `\\mathrm{Gini}_{\\text{split}} = \\tfrac{${r.nL}}{${r.n}}(${fmt(r.gL)}) + \\tfrac{${r.nR}}{${r.n}}(${fmt(r.gR)}) = ${fmt(r.split)}`,
                },
                {
                  label: "Gini Gain",
                  tex: `\\Delta\\mathrm{Gini} = ${fmt(r.gP)} - ${fmt(r.split)} = \\ans{${fmt(r.gain)}}`,
                },
              ]}
            />
            <div className="mt-5 space-y-3">
              <Note title="กฎการเลือก">
                Decision Tree เลือก split ที่ให้ Gain <strong className="text-ink">สูงที่สุด</strong> (เท่ากับ Weighted Gini ต่ำที่สุด)
              </Note>
              <Note tone="pitfall" title="อย่าปัดเลขระหว่างทาง">
                เครื่องนี้คำนวณด้วยค่าเต็ม แล้วค่อยปัดตอนแสดงผล — ถ้าปัดเป็น 2 ตำแหน่งตั้งแต่ขั้นแรก คำตอบสุดท้ายอาจคลาดได้
              </Note>
            </div>
          </Panel>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Tool 04 — K-Means iterations                                       */
/* ================================================================== */

type Pt = { id: string; x: number; y: number };
type Centroid = { id: string; x: number; y: number; seed?: string };
type Metric = "manhattan" | "euclidean";
type PresetKey = "lecture" | "hw1" | "hw2";

const POINTS: Pt[] = [
  { id: "A1", x: 2, y: 10 }, { id: "A2", x: 2, y: 5 }, { id: "A3", x: 8, y: 4 }, { id: "A4", x: 5, y: 8 },
  { id: "A5", x: 7, y: 5 }, { id: "A6", x: 6, y: 4 }, { id: "A7", x: 1, y: 2 }, { id: "A8", x: 4, y: 9 },
];

const KM_PRESETS: Record<PresetKey, { label: string; metric: Metric; seeds: string[] }> = {
  lecture: { label: "ในห้อง · K=3 · Manhattan", metric: "manhattan", seeds: ["A1", "A4", "A7"] },
  hw1: { label: "การบ้าน Q1 · K=2 · Manhattan", metric: "manhattan", seeds: ["A3", "A6"] },
  hw2: { label: "การบ้าน Q2 · K=3 · Euclidean", metric: "euclidean", seeds: ["A2", "A5", "A8"] },
};

const METRIC_TEX: Record<Metric, string> = {
  manhattan: "d = |x_1 - x_2| + |y_1 - y_2|",
  euclidean: "d = \\sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}",
};

const EPS = 1e-9;
const seedsFrom = (ids: string[]): Centroid[] =>
  ids.map((pid, i) => {
    const p = POINTS.find((q) => q.id === pid)!;
    return { id: `C${i + 1}`, x: p.x, y: p.y, seed: pid };
  });

const distance = (m: Metric, a: Pt | Centroid, b: Pt | Centroid) =>
  m === "manhattan" ? Math.abs(a.x - b.x) + Math.abs(a.y - b.y) : Math.hypot(a.x - b.x, a.y - b.y);

function runIteration(centroids: Centroid[], metric: Metric) {
  const rows = POINTS.map((p) => {
    const d = centroids.map((c) => distance(metric, p, c));
    let best = 0;
    for (let i = 1; i < d.length; i++) if (d[i] < d[best] - EPS) best = i; // tie → lower index
    const tie = d.filter((v) => Math.abs(v - d[best]) < EPS).length > 1;
    return { p, d, best, tie };
  });
  const next = centroids.map((c, ci) => {
    const members = rows.filter((r) => r.best === ci).map((r) => r.p);
    if (!members.length) return { id: c.id, x: c.x, y: c.y, members, empty: true };
    const x = members.reduce((s, m) => s + m.x, 0) / members.length;
    const y = members.reduce((s, m) => s + m.y, 0) / members.length;
    return { id: c.id, x, y, members, empty: false };
  });
  const converged = next.every((n, i) => Math.abs(n.x - centroids[i].x) < EPS && Math.abs(n.y - centroids[i].y) < EPS);
  return { rows, next, converged };
}

export function KMeansCalculator() {
  const [preset, setPreset] = useState<PresetKey>("lecture");
  const [metric, setMetric] = useState<Metric>("manhattan");
  const [centroids, setCentroids] = useState<Centroid[]>(() => seedsFrom(KM_PRESETS.lecture.seeds));
  const [iter, setIter] = useState(1);

  const res = useMemo(() => runIteration(centroids, metric), [centroids, metric]);

  const load = (k: PresetKey) => {
    setPreset(k);
    setMetric(KM_PRESETS[k].metric);
    setCentroids(seedsFrom(KM_PRESETS[k].seeds));
    setIter(1);
  };
  const changeMetric = (m: Metric) => {
    setMetric(m);
    setCentroids(seedsFrom(KM_PRESETS[preset].seeds));
    setIter(1);
  };
  const nextRound = () => {
    setCentroids(res.next.map(({ id, x, y }) => ({ id, x, y })));
    setIter((i) => i + 1);
  };

  return (
    <div className="space-y-8">
      <ToolHeader
        title="K-Means ทีละรอบ"
        lect="Lect 08–09"
        desc="วัดระยะทุกจุดไปยังทุก Centroid จัดเข้ากลุ่มที่ใกล้สุด แล้วย้าย Centroid ไปที่ค่าเฉลี่ยของสมาชิก กดรอบถัดไปจนกว่าจะลู่เข้า"
        presets={(Object.keys(KM_PRESETS) as PresetKey[]).map((k) => ({
          label: KM_PRESETS[k].label, onClick: () => load(k), active: preset === k,
        }))}
      />

      <div className="flex flex-wrap items-center gap-4 border-y border-rule py-3">
        <Segmented
          label="วิธีวัดระยะ"
          value={metric}
          onChange={changeMetric}
          options={[{ value: "manhattan", label: "Manhattan" }, { value: "euclidean", label: "Euclidean" }]}
        />
        <div className="overflow-x-auto text-ink"><Tex tex={METRIC_TEX[metric]} /></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
        <section>
          <h3 className="mb-3 text-sm font-semibold text-ink">
            รอบที่ <span className="num font-mono">{iter}</span> · ตารางระยะทาง
          </h3>
          <div className="overflow-x-auto rounded-xl border border-rule">
            <table className="w-full text-sm">
              <thead className="bg-surface-hover text-xs text-ink-muted">
                <tr>
                  <th scope="col" className="px-3 py-2.5 text-left font-medium">จุด</th>
                  <th scope="col" className="px-3 py-2.5 text-left font-medium">(x, y)</th>
                  {centroids.map((c) => (
                    <th key={c.id} scope="col" className="px-3 py-2.5 text-right font-medium">
                      <span className="font-mono">d(·, {c.id})</span>
                    </th>
                  ))}
                  <th scope="col" className="px-3 py-2.5 text-left font-medium">กลุ่ม</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule bg-surface font-mono">
                {res.rows.map((row) => (
                  <tr key={row.p.id}>
                    <th scope="row" className="px-3 py-2 text-left font-semibold text-ink">{row.p.id}</th>
                    <td className="num px-3 py-2 text-ink-muted">({row.p.x}, {row.p.y})</td>
                    {row.d.map((d, i) => (
                      <td key={i} className="num px-3 py-2 text-right">
                        <span className={i === row.best ? "answer font-semibold text-ink" : "text-ink-muted"}>{fmt(d, 3)}</span>
                      </td>
                    ))}
                    <td className="px-3 py-2 font-semibold text-ink">
                      {centroids[row.best].id}
                      {row.tie ? <span className="ml-1.5 font-sans text-xs font-normal text-warn">เสมอ → เลือกเลขน้อย</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Panel title="Centroid ใหม่ = ค่าเฉลี่ยของสมาชิก" meta={`รอบ ${iter}`}>
          <ul className="space-y-5">
            {res.next.map((c, i) => (
              <li key={c.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono font-semibold text-ink">
                    {c.id}
                    {iter === 1 && centroids[i].seed ? <span className="ml-1 font-normal text-ink-subtle">(เริ่มที่ {centroids[i].seed})</span> : null}
                  </span>
                  <span className="text-xs text-ink-subtle">{c.members.map((m) => m.id).join(", ") || "ไม่มีสมาชิก"}</span>
                </div>
                {c.empty ? (
                  <p className="mt-1 text-sm text-warn">ไม่มีจุดใดเลือกกลุ่มนี้ Centroid จึงอยู่ที่เดิม</p>
                ) : (
                  <div className="mt-1.5 overflow-x-auto pb-1 text-ink">
                    <Tex
                      tex={`\\left(\\tfrac{${c.members.map((m) => m.x).join("+")}}{${c.members.length}},\\; \\tfrac{${c.members.map((m) => m.y).join("+")}}{${c.members.length}}\\right) = \\ans{(${fmt(c.x, 3)},\\ ${fmt(c.y, 3)})}`}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-rule pt-4">
            <button type="button" className="btn btn-primary" onClick={nextRound} disabled={res.converged}>
              คำนวณรอบถัดไป
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => load(preset)}>
              เริ่มใหม่
            </button>
          </div>
          <div className="mt-4" aria-live="polite">
            {res.converged ? (
              <Note title="ลู่เข้าแล้ว">Centroid ไม่ขยับและไม่มีจุดใดย้ายกลุ่ม — K-Means หยุดที่รอบ {iter}</Note>
            ) : null}
          </div>
        </Panel>
      </div>

      <Note tone="pitfall" title="กฎที่ออกสอบบ่อย">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong className="text-ink">ระยะเท่ากัน</strong> (เช่น A5 ในการบ้าน Q1) สไลด์ให้เลือก Cluster ที่เลขน้อยกว่า</li>
          <li><strong className="text-ink">Centroid ใหม่</strong> ใช้เฉพาะสมาชิกของรอบนั้นมาหาค่าเฉลี่ย</li>
          <li><strong className="text-ink">หยุดเมื่อ</strong> Centroid ไม่ขยับ หรือไม่มีจุดใดย้ายกลุ่ม</li>
        </ul>
      </Note>
    </div>
  );
}

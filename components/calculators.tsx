"use client";

import { useMemo, useId, useState } from "react";

/* ------------------------------------------------------------------ */
/* Tool 01 — Tukey IQR outlier detector                                */
/* ------------------------------------------------------------------ */

type Field = { key: "q1" | "q2" | "q3" | "max"; label: string; hint: string };

const FIELDS: Field[] = [
  { key: "q1", label: "Q1 ควอร์ไทล์อันดับหนึ่ง", hint: "ค่าที่ 25% ของข้อมูล" },
  { key: "q2", label: "Median ค่ามัธยฐาน", hint: "ค่าที่ 50% ของข้อมูล" },
  { key: "q3", label: "Q3 ควอร์ไทล์อันดับสาม", hint: "ค่าที่ 75% ของข้อมูล" },
  { key: "max", label: "ค่าสูงสุดจริง", hint: "ค่าที่มากที่สุดที่มีจริง ไม่ใช่ตัวเลขที่ตั้งไว้" },
];

const nf = (n: number) => n.toLocaleString("th-TH", { maximumFractionDigits: 4 });

export function TukeyCalculator() {
  const uid = useId();
  const [raw, setRaw] = useState<Record<string, string>>({
    q1: "",
    q2: "",
    q3: "",
    max: "",
  });
  // An untouched empty field is not an error. Rendering "required" alerts on
  // page load makes a screen reader announce eight problems before the student
  // has done anything, so a message only appears once the field has been left.
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const parsed = useMemo(() => {
    const out: Record<string, number> = {};
    const errors: Record<string, string> = {};
    for (const f of FIELDS) {
      const v = raw[f.key].trim();
      if (v === "") {
        errors[f.key] = "ยังไม่ได้กรอก";
        continue;
      }
      const n = Number(v);
      if (!Number.isFinite(n)) {
        errors[f.key] = "ต้องเป็นตัวเลข";
        continue;
      }
      out[f.key] = n;
    }
    // cross-field validation
    if (out.q1 !== undefined && out.q3 !== undefined && out.q1 >= out.q3) {
      errors.q3 = "Q3 ต้องมากกว่า Q1 เสมอ";
    }
    if (out.q1 !== undefined && out.q2 !== undefined && out.q1 > out.q2) {
      errors.q2 = "Median ต้องอยู่ระหว่าง Q1 และ Q3";
    }
    if (out.q3 !== undefined && out.q2 !== undefined && out.q2 > out.q3) {
      errors.q2 = "Median ต้องอยู่ระหว่าง Q1 และ Q3";
    }
    if (out.q3 !== undefined && out.max !== undefined && out.max < out.q3) {
      errors.max = "ค่าสูงสุดต้องไม่น้อยกว่า Q3";
    }
    return { out, errors };
  }, [raw]);

  const hasError = Object.keys(parsed.errors).length > 0;
  const ready = FIELDS.every((f) => parsed.out[f.key] !== undefined) && !hasError;

  const result = useMemo(() => {
    if (!ready) return null;
    const { q1, q3, max } = parsed.out;
    const iqr = q3 - q1;
    const lower = q1 - 1.5 * iqr;
    const upper = q3 + 1.5 * iqr;
    return {
      iqr,
      lower,
      upper,
      isOutlier: max > upper,
      whiskerEnd: max,
      gap: max - upper,
    };
  }, [parsed.out, ready]);

  return (
    <div className="grid-12 gap-sp-1 items-start">
      <div className="col-span-12 lg:col-span-5">
        <h2 className="text-2xl lg:text-3xl tracking-reset">ตรวจ Outlier ด้วย IQR</h2>
        <p className="mt-3 text-ink-muted">
          กรอกค่าจาก Five-Number Summary ที่โจทย์ให้ เครื่องจะคำนวณ IQR และรั้วทั้งสอง
          พร้อมบอกว่าค่าสูงสุดที่มีจริงเป็น outlier หรือไม่
        </p>

        <div className="mt-sp-1 space-y-6">
          {FIELDS.map((f) => {
            const id = `${uid}-${f.key}`;
            const err = touched[f.key] ? parsed.errors[f.key] : undefined;
            const hintId = `${id}-hint`;
            const errId = `${id}-err`;
            return (
              <div key={f.key}>
                <label htmlFor={id} className="meta-label tracking-reset block">
                  {f.label}
                </label>
                <p id={hintId} className="text-sm text-ink-muted mt-1">
                  {f.hint}
                </p>
                <input
                  id={id}
                  type="number"
                  inputMode="decimal"
                  value={raw[f.key]}
                  onChange={(e) => {
                    setRaw((s) => ({ ...s, [f.key]: e.target.value }));
                    setTouched((t) => ({ ...t, [f.key]: true }));
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, [f.key]: true }))}
                  aria-describedby={err ? `${hintId} ${errId}` : hintId}
                  aria-invalid={err ? true : undefined}
                  className="tap mt-2 w-full tnum bg-bg border border-rule-strong px-4 py-3 focus:border-accent outline-none"
                />
                {err ? (
                  /* error sits next to its own field, never at the top of the form */
                  <p id={errId} className="mt-2 text-sm text-accent-ink" role="alert">
                    {err}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <div
          aria-live="polite"
          className="border-t-2 border-accent pt-6 lg:sticky lg:top-24 hud-bracket p-4 bg-bg/70"
        >
          {!ready ? (
            <p className="meta-label tracking-display text-ink-subtle">
              กรอกให้ครบและเรียงลำดับถูกต้องเพื่อดูผลลัพธ์
            </p>
          ) : (
            <>
              <p className="meta-label tracking-display text-ink-subtle">ผลลัพธ์</p>
              <dl className="mt-6 space-y-5">
                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                  <dt className="tnum">IQR = Q3 &minus; Q1</dt>
                  <dd className="tnum text-xl text-accent-ink font-medium">{nf(result!.iqr)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                  <dt className="tnum">Lower Fence = Q1 &minus; 1.5 x IQR</dt>
                  <dd className="tnum text-xl text-accent-ink font-medium">{nf(result!.lower)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                  <dt className="tnum">Upper Fence = Q3 + 1.5 x IQR</dt>
                  <dd className="tnum text-xl text-accent-ink font-medium">{nf(result!.upper)}</dd>
                </div>
              </dl>

              <div className="mt-sp-1">
                {result!.isOutlier ? (
                  <div className="border-t-2 border-accent pt-5">
                    <p className="meta-label tracking-display text-accent-ink">
                      เป็น Outlier
                    </p>
                    <p className="mt-2">
                      ค่าสูงสุดจริง {nf(result!.whiskerEnd)} อยู่เหนือ Upper Fence
                      ที่ {nf(result!.upper)} อยู่ {nf(result!.gap)}
                    </p>
                    <p className="mt-3 text-ink-muted">
                      Whisker จะสิ้นสุดที่ค่าจริงสูงสุดที่ยังอยู่ภายใน Fence
                      ไม่ใช่ที่ค่า Fence และไม่ใช่ที่ค่าที่เกินกรอบ
                    </p>
                  </div>
                ) : (
                  <div className="border-t-2 border-accent pt-5">
                    <p className="meta-label tracking-display text-accent-ink">
                      ไม่ใช่ Outlier
                    </p>
                    <p className="mt-2">
                      ค่าสูงสุดจริง {nf(result!.whiskerEnd)} ยังอยู่ภายใน Upper Fence
                      ที่ {nf(result!.upper)}
                    </p>
                    <p className="mt-3 text-ink-muted">
                      Whisker ของ Boxplot จะยื่นไปถึงค่าจริงสูงสุดนี้เลย
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tool 02 — Confusion matrix & metric calculator                      */
/* ------------------------------------------------------------------ */

const CELLS: Array<{ key: "tp" | "fp" | "fn" | "tn"; label: string; hint: string }> = [
  { key: "tp", label: "TP ทำนายว่าเป็น Positive และความจริงก็เป็น Positive", hint: "ทำนายถูกและเป็นบวก" },
  { key: "fp", label: "FP ทำนายว่าเป็น Positive แต่ความจริงเป็น Negative", hint: "ผิดฝั่ง เตียงเกิน" },
  { key: "fn", label: "FN ทำนายว่าเป็น Negative แต่ความจริงเป็น Positive", hint: "ผิดฝั่ง ตกหล่น" },
  { key: "tn", label: "TN ทำนายว่าเป็น Negative และความจริงก็เป็น Negative", hint: "ทำนายถูกและเป็นลบ" },
];

export function MetricCalculator() {
  const uid = useId();
  const [raw, setRaw] = useState<Record<string, string>>({ tp: "", fp: "", fn: "", tn: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const cells = useMemo(() => {
    const out: Record<string, number> = {};
    const errors: Record<string, string> = {};
    for (const c of CELLS) {
      const v = raw[c.key].trim();
      if (v === "") {
        errors[c.key] = "ยังไม่ได้กรอก";
        continue;
      }
      const n = Number(v);
      if (!Number.isFinite(n)) {
        errors[c.key] = "ต้องเป็นตัวเลข";
        continue;
      }
      if (n < 0 || !Number.isInteger(n)) {
        errors[c.key] = "ต้องเป็นจำนวนเต็มที่ไม่ติดลบ";
        continue;
      }
      out[c.key] = n;
    }
    return { out, errors };
  }, [raw]);

  const ready = CELLS.every((c) => cells.out[c.key] !== undefined);

  const m = useMemo(() => {
    if (!ready) return null;
    const { tp, fp, fn, tn } = cells.out;
    const total = tp + tn + fp + fn;
    const posPredicted = tp + fp;
    const actuallyPositive = tp + fn;

    // A metric with a zero denominator is undefined, not zero. Surface it
    // explicitly instead of printing 0 and letting the student memorise a lie.
    const safe = (num: number, den: number, denLabel: string) => ({
      value: den === 0 ? null : num / den,
      denLabel,
      den,
    });

    const f1 =
      posPredicted === 0 || actuallyPositive === 0
        ? null
        : (2 * tp) / (2 * tp + fp + fn);

    return {
      total,
      accuracy: safe(tp + tn, total, "TP + TN + FP + FN"),
      precision: safe(tp, posPredicted, "TP + FP"),
      recall: safe(tp, actuallyPositive, "TP + FN"),
      f1,
      posPredicted,
      actuallyPositive,
      metricRows: [
        { name: "Accuracy", ...safe(tp + tn, total, "TP + TN + FP + FN") },
        { name: "Precision", ...safe(tp, posPredicted, "TP + FP") },
        { name: "Recall", ...safe(tp, actuallyPositive, "TP + FN") },
      ],
    };
  }, [cells.out, ready]);

  const pct = (x: number) => `${(x * 100).toFixed(2)}%`;

  return (
    <div className="grid-12 gap-sp-1 items-start">
      <div className="col-span-12 lg:col-span-5">
        <h2 className="text-2xl lg:text-3xl tracking-reset">คำนวณมาตรวัดจาก Confusion Matrix</h2>
        <p className="mt-3 text-ink-muted">
          กรอกตัวเลขในตาราง 2x2 เครื่องจะคำนวณทั้งสี่มาตรวัด
          พร้อมชี้ว่าตัวไหนหารไม่ได้เพราะตัวส่วนเป็นศูนย์
        </p>

        <div className="mt-sp-1 space-y-6">
          {CELLS.map((c) => {
            const id = `${uid}-${c.key}`;
            const err = touched[c.key] ? cells.errors[c.key] : undefined;
            const hintId = `${id}-hint`;
            const errId = `${id}-err`;
            return (
              <div key={c.key}>
                <label htmlFor={id} className="meta-label tracking-reset block">
                  {c.label}
                </label>
                <p id={hintId} className="text-sm text-ink-muted mt-1">
                  {c.hint}
                </p>
                <input
                  id={id}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  value={raw[c.key]}
                  onChange={(e) => {
                    setRaw((s) => ({ ...s, [c.key]: e.target.value }));
                    setTouched((t) => ({ ...t, [c.key]: true }));
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, [c.key]: true }))}
                  aria-describedby={err ? `${hintId} ${errId}` : hintId}
                  aria-invalid={err ? true : undefined}
                  className="tap mt-2 w-full tnum bg-bg border border-rule-strong px-4 py-3 focus:border-accent outline-none"
                />
                {err ? (
                  <p id={errId} className="mt-2 text-sm text-accent-ink" role="alert">
                    {err}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <div
          aria-live="polite"
          className="border-t-2 border-accent pt-6 lg:sticky lg:top-24 hud-bracket p-4 bg-bg/70"
        >
          {!ready ? (
            <p className="meta-label tracking-display text-ink-subtle">
              กรอก TP, FP, FN, TN ให้ครบเพื่อดูผลลัพธ์
            </p>
          ) : (
            <>
              <p className="meta-label tracking-display text-ink-subtle">
                ผลลัพธ์ &mdash; ตัวอย่างทั้งหมด {m!.total} ราย
              </p>

              <dl className="mt-6 space-y-5">
                {m!.metricRows.map((row) => (
                  <div key={row.name} className="border-b border-rule pb-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="tnum">{row.name}</dt>
                      <dd className="tnum text-xl text-accent-ink font-medium">
                        {row.value === null ? (
                          <span className="text-base text-ink-muted">หารไม่ได้</span>
                        ) : (
                          pct(row.value)
                        )}
                      </dd>
                    </div>
                    <p className="tnum text-sm text-ink-muted mt-1">
                      = {row.name} เมื่อ {row.denLabel} = {row.den}
                      {row.value === null ? " ซึ่งเป็นศูนย์" : ""}
                    </p>
                  </div>
                ))}

                <div className="border-b border-rule pb-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="tnum">F1-Score</dt>
                    <dd className="tnum text-xl text-accent-ink font-medium">
                      {m!.f1 === null ? (
                        <span className="text-base text-ink-muted">หารไม่ได้</span>
                      ) : (
                        pct(m!.f1)
                      )}
                    </dd>
                  </div>
                  <p className="tnum text-sm text-ink-muted mt-1">
                    = 2 x TP / (2 x TP + FP + FN)
                  </p>
                </div>
              </dl>

              <div className="mt-sp-1 border-t-2 border-accent pt-5">
                <p className="meta-label tracking-display text-accent-ink">จำไว้</p>
                <p className="mt-2 text-ink-muted">
                  Precision คุ้มเมื่อ False Positive แพง · Recall คุ้มเมื่อ False Negative
                  วิกฤต · F1 ถัวเฉลี่ยสองตัวนั้นเท่ากัน
                </p>
                {m!.posPredicted === 0 ? (
                  <p className="mt-3 text-accent-ink">
                    ที่นี่ไม่มีใครถูกทำนายว่าเป็น Positive เลย ทั้ง Precision และ F1
                    จึงไม่มีความหมาย อย่าเพียงเพราะโจทย์ไม่ให้ตัวเลขแล้วตอบว่า 0
                  </p>
                ) : null}
                {m!.actuallyPositive === 0 ? (
                  <p className="mt-3 text-accent-ink">
                    ที่นี่ไม่มีเคสที่เป็น Positive จริงเลย Recall และ F1
                    จึงไม่มีความหมาย
                  </p>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tool 03 — Gini Impurity & Gini Gain Calculator                     */
/* ------------------------------------------------------------------ */

export function GiniCalculator() {
  const uid = useId();
  const [p1, setP1] = useState("6");
  const [p2, setP2] = useState("6");
  const [l1, setL1] = useState("5");
  const [l2, setL2] = useState("1");
  const [r1, setR1] = useState("1");
  const [r2, setR2] = useState("5");

  const loadPreset = (
    vals: [number, number, number, number, number, number]
  ) => {
    setP1(String(vals[0]));
    setP2(String(vals[1]));
    setL1(String(vals[2]));
    setL2(String(vals[3]));
    setR1(String(vals[4]));
    setR2(String(vals[5]));
  };

  const parsed = useMemo(() => {
    const np1 = Number(p1);
    const np2 = Number(p2);
    const nl1 = Number(l1);
    const nl2 = Number(l2);
    const nr1 = Number(r1);
    const nr2 = Number(r2);

    const validNums =
      [np1, np2, nl1, nl2, nr1, nr2].every((n) => Number.isFinite(n) && n >= 0);

    if (!validNums) return null;

    const nParent = np1 + np2;
    const nLeft = nl1 + nl2;
    const nRight = nr1 + nr2;

    if (nParent === 0) return null;

    const giniSingle = (c1: number, c2: number, total: number) => {
      if (total === 0) return 0;
      const prob1 = c1 / total;
      const prob2 = c2 / total;
      return 1 - (prob1 * prob1 + prob2 * prob2);
    };

    const giniParent = giniSingle(np1, np2, nParent);
    const giniLeft = giniSingle(nl1, nl2, nLeft);
    const giniRight = giniSingle(nr1, nr2, nRight);

    const totalSplit = nLeft + nRight;
    const giniSplit =
      totalSplit === 0
        ? 0
        : (nLeft / totalSplit) * giniLeft + (nRight / totalSplit) * giniRight;

    const giniGain = giniParent - giniSplit;
    const countMismatch = nl1 + nr1 !== np1 || nl2 + nr2 !== np2;

    return {
      nParent,
      nLeft,
      nRight,
      giniParent,
      giniLeft,
      giniRight,
      giniSplit,
      giniGain,
      countMismatch,
    };
  }, [p1, p2, l1, l2, r1, r2]);

  return (
    <div className="grid-12 gap-sp-1 items-start">
      <div className="col-span-12 lg:col-span-5">
        <h2 className="text-2xl lg:text-3xl tracking-reset">
          คำนวณ Gini Impurity & Gini Gain
        </h2>
        <p className="mt-3 text-ink-muted">
          คำนวณความไม่บริสุทธิ์ของโหนดแม่ (Parent) เทียบกับกิ่งซ้าย-ขวาหลังการแบ่ง
          (Split) เพื่อหา Gini Gain ที่โมเดล Decision Tree ใช้เลือกจุดตัด
        </p>

        {/* Presets */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => loadPreset([6, 6, 5, 1, 1, 5])}
            className="tap px-3 py-1.5 text-xs font-medium border border-rule-strong hover:border-accent hover:text-accent-ink transition-colors"
          >
            โหลด: Candidate A (Days &le; 45)
          </button>
          <button
            type="button"
            onClick={() => loadPreset([6, 6, 2, 4, 4, 2])}
            className="tap px-3 py-1.5 text-xs font-medium border border-rule-strong hover:border-accent hover:text-accent-ink transition-colors"
          >
            โหลด: Candidate B (Purchases &le; 2)
          </button>
        </div>

        {/* Inputs */}
        <div className="mt-8 space-y-6">
          <div className="border border-rule p-4">
            <h3 className="meta-label tracking-reset font-medium text-ink">
              โหนดแม่ (Parent Node)
            </h3>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label htmlFor={`${uid}-p1`} className="text-xs text-ink-muted block">
                  Class 1 (เช่น Inactive)
                </label>
                <input
                  id={`${uid}-p1`}
                  type="number"
                  min={0}
                  value={p1}
                  onChange={(e) => setP1(e.target.value)}
                  className="tap mt-1 w-full tnum bg-bg border border-rule-strong px-3 py-2 text-sm focus:border-accent outline-none"
                />
              </div>
              <div>
                <label htmlFor={`${uid}-p2`} className="text-xs text-ink-muted block">
                  Class 2 (เช่น Active)
                </label>
                <input
                  id={`${uid}-p2`}
                  type="number"
                  min={0}
                  value={p2}
                  onChange={(e) => setP2(e.target.value)}
                  className="tap mt-1 w-full tnum bg-bg border border-rule-strong px-3 py-2 text-sm focus:border-accent outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-rule p-4">
              <h3 className="meta-label tracking-reset font-medium text-ink">
                กิ่งซ้าย (Left Child)
              </h3>
              <div className="space-y-3 mt-3">
                <div>
                  <label htmlFor={`${uid}-l1`} className="text-xs text-ink-muted block">
                    Class 1
                  </label>
                  <input
                    id={`${uid}-l1`}
                    type="number"
                    min={0}
                    value={l1}
                    onChange={(e) => setL1(e.target.value)}
                    className="tap mt-1 w-full tnum bg-bg border border-rule-strong px-3 py-2 text-sm focus:border-accent outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-l2`} className="text-xs text-ink-muted block">
                    Class 2
                  </label>
                  <input
                    id={`${uid}-l2`}
                    type="number"
                    min={0}
                    value={l2}
                    onChange={(e) => setL2(e.target.value)}
                    className="tap mt-1 w-full tnum bg-bg border border-rule-strong px-3 py-2 text-sm focus:border-accent outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="border border-rule p-4">
              <h3 className="meta-label tracking-reset font-medium text-ink">
                กิ่งขวา (Right Child)
              </h3>
              <div className="space-y-3 mt-3">
                <div>
                  <label htmlFor={`${uid}-r1`} className="text-xs text-ink-muted block">
                    Class 1
                  </label>
                  <input
                    id={`${uid}-r1`}
                    type="number"
                    min={0}
                    value={r1}
                    onChange={(e) => setR1(e.target.value)}
                    className="tap mt-1 w-full tnum bg-bg border border-rule-strong px-3 py-2 text-sm focus:border-accent outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-r2`} className="text-xs text-ink-muted block">
                    Class 2
                  </label>
                  <input
                    id={`${uid}-r2`}
                    type="number"
                    min={0}
                    value={r2}
                    onChange={(e) => setR2(e.target.value)}
                    className="tap mt-1 w-full tnum bg-bg border border-rule-strong px-3 py-2 text-sm focus:border-accent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {parsed?.countMismatch && (
            <p className="text-xs text-accent-ink" role="alert">
              &lowast; ข้อสังเกต: ผลรวมตัวอย่างในโหนดลูก (ซ้าย + ขวา)
              ไม่เท่ากับโหนดแม่ กรุณาตรวจสอบตัวเลข
            </p>
          )}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <div
          aria-live="polite"
          className="border-t-2 border-accent pt-6 lg:sticky lg:top-24 hud-bracket p-4 bg-bg/70"
        >
          {!parsed ? (
            <p className="meta-label tracking-display text-ink-subtle">
              กรอกจำนวนตัวอย่างเพื่อคำนวณ Gini
            </p>
          ) : (
            <>
              <p className="meta-label tracking-display text-ink-subtle">
                ผลลัพธ์การคำนวณ Gini (Lect 07)
              </p>

              <dl className="mt-6 space-y-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                  <div>
                    <dt className="tnum font-medium">Gini(Parent)</dt>
                    <dd className="text-xs text-ink-muted mt-0.5">
                      1 &minus; &Sigma; p<sub>k</sub><sup>2</sup> ({parsed.nParent} ราย)
                    </dd>
                  </div>
                  <dd className="tnum text-xl text-accent-ink font-medium">
                    {parsed.giniParent.toFixed(4)}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                  <div>
                    <dt className="tnum font-medium">Gini(Left Child)</dt>
                    <dd className="text-xs text-ink-muted mt-0.5">
                      {parsed.nLeft} ราย
                    </dd>
                  </div>
                  <dd className="tnum text-lg text-ink font-medium">
                    {parsed.giniLeft.toFixed(4)}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                  <div>
                    <dt className="tnum font-medium">Gini(Right Child)</dt>
                    <dd className="text-xs text-ink-muted mt-0.5">
                      {parsed.nRight} ราย
                    </dd>
                  </div>
                  <dd className="tnum text-lg text-ink font-medium">
                    {parsed.giniRight.toFixed(4)}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                  <div>
                    <dt className="tnum font-medium">Weighted Gini(Split)</dt>
                    <dd className="text-xs text-ink-muted mt-0.5">
                      ({parsed.nLeft}/{parsed.nLeft + parsed.nRight}) &times;{" "}
                      {parsed.giniLeft.toFixed(3)} + ({parsed.nRight}/
                      {parsed.nLeft + parsed.nRight}) &times;{" "}
                      {parsed.giniRight.toFixed(3)}
                    </dd>
                  </div>
                  <dd className="tnum text-xl text-ink font-medium">
                    {parsed.giniSplit.toFixed(4)}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-b-2 border-accent pb-3">
                  <div>
                    <dt className="tnum text-lg font-medium text-accent-ink">
                      Gini Gain
                    </dt>
                    <dd className="text-xs text-ink-muted mt-0.5">
                      Gini(Parent) &minus; Weighted Gini(Split)
                    </dd>
                  </div>
                  <dd className="tnum text-2xl text-accent-ink font-bold">
                    {parsed.giniGain.toFixed(4)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-rule pt-4">
                <p className="meta-label tracking-display text-accent-ink">กฎการตัดสินใจ</p>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  Decision Tree จะเลือก Feature และ Split Point ที่ให้{" "}
                  <span className="text-accent-ink font-medium">Gini Gain สูงที่สุด</span>{" "}
                  (หรือทำให้ Weighted Gini ต่ำที่สุด) เสมอ
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tool 04 — K-Means Iteration & Distance Calculator                  */
/* ------------------------------------------------------------------ */

interface Point2D {
  id: string;
  x: number;
  y: number;
}

interface Centroid2D {
  id: string;
  name: string;
  x: number;
  y: number;
}

const DEFAULT_POINTS: Point2D[] = [
  { id: "A1", x: 2, y: 10 },
  { id: "A2", x: 2, y: 5 },
  { id: "A3", x: 8, y: 4 },
  { id: "A4", x: 5, y: 8 },
  { id: "A5", x: 7, y: 5 },
  { id: "A6", x: 6, y: 4 },
  { id: "A7", x: 1, y: 2 },
  { id: "A8", x: 4, y: 9 },
];

export function KMeansCalculator() {
  const [metric, setMetric] = useState<"manhattan" | "euclidean">("manhattan");
  const [points, setPoints] = useState<Point2D[]>(DEFAULT_POINTS);
  const [centroids, setCentroids] = useState<Centroid2D[]>([
    { id: "C1", name: "C1 (A1)", x: 2, y: 10 },
    { id: "C2", name: "C2 (A4)", x: 5, y: 8 },
    { id: "C3", name: "C3 (A7)", x: 1, y: 2 },
  ]);

  const loadPreset = (preset: "lecture" | "hw1" | "hw2") => {
    setPoints(DEFAULT_POINTS);
    if (preset === "lecture") {
      setMetric("manhattan");
      setCentroids([
        { id: "C1", name: "C1 (A1)", x: 2, y: 10 },
        { id: "C2", name: "C2 (A4)", x: 5, y: 8 },
        { id: "C3", name: "C3 (A7)", x: 1, y: 2 },
      ]);
    } else if (preset === "hw1") {
      setMetric("manhattan");
      setCentroids([
        { id: "C1", name: "C1 (A3)", x: 8, y: 4 },
        { id: "C2", name: "C2 (A6)", x: 6, y: 4 },
      ]);
    } else if (preset === "hw2") {
      setMetric("euclidean");
      setCentroids([
        { id: "C1", name: "C1 (A2)", x: 2, y: 5 },
        { id: "C2", name: "C2 (A5)", x: 7, y: 5 },
        { id: "C3", name: "C3 (A8)", x: 4, y: 9 },
      ]);
    }
  };

  const results = useMemo(() => {
    // 1. Calculate distance from each point to each centroid
    const assignments = points.map((p) => {
      const dists = centroids.map((c) => {
        let d = 0;
        if (metric === "manhattan") {
          d = Math.abs(p.x - c.x) + Math.abs(p.y - c.y);
        } else {
          d = Math.hypot(p.x - c.x, p.y - c.y);
        }
        return { centroidId: c.id, distance: d };
      });

      // Find closest centroid (tie-breaker: lowest centroid index)
      let minIdx = 0;
      for (let i = 1; i < dists.length; i++) {
        if (dists[i].distance < dists[minIdx].distance) {
          minIdx = i;
        }
      }

      return {
        point: p,
        dists,
        assignedCentroidId: centroids[minIdx].id,
        minDistance: dists[minIdx].distance,
        isTie: dists.filter((d) => d.distance === dists[minIdx].distance).length > 1,
      };
    });

    // 2. Recalculate centroids
    const newCentroids = centroids.map((c) => {
      const assignedPoints = assignments
        .filter((a) => a.assignedCentroidId === c.id)
        .map((a) => a.point);

      if (assignedPoints.length === 0) {
        return {
          ...c,
          count: 0,
          newX: c.x,
          newY: c.y,
          assignedNames: [],
          formulaX: "ไม่มีสมาชิก",
          formulaY: "ไม่มีสมาชิก",
        };
      }

      const sumX = assignedPoints.reduce((acc, pt) => acc + pt.x, 0);
      const sumY = assignedPoints.reduce((acc, pt) => acc + pt.y, 0);
      const n = assignedPoints.length;

      return {
        ...c,
        count: n,
        newX: sumX / n,
        newY: sumY / n,
        assignedNames: assignedPoints.map((pt) => pt.id),
        formulaX: `(${assignedPoints.map((pt) => pt.x).join(" + ")}) / ${n} = ${(sumX / n).toFixed(4)}`,
        formulaY: `(${assignedPoints.map((pt) => pt.y).join(" + ")}) / ${n} = ${(sumY / n).toFixed(4)}`,
      };
    });

    return { assignments, newCentroids };
  }, [points, centroids, metric]);

  return (
    <div className="grid-12 gap-sp-1 items-start">
      <div className="col-span-12">
        <h2 className="text-2xl lg:text-3xl tracking-reset">
          คำนวณ K-Means Iteration & Recalculate Centroids
        </h2>
        <p className="mt-3 text-ink-muted">
          จำลองการคำนวณระยะห่างรอบที่ 1 และการหาพิกัด Centroid ใหม่ตามสูตรใน Lect 08
          รองรับทั้ง Manhattan และ Euclidean พร้อมตรวจจับเงื่อนไข Tie-breaking
        </p>

        {/* Preset Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="meta-label text-xs text-ink-subtle">ชุดโจทย์มาตรฐาน:</span>
          <button
            type="button"
            onClick={() => loadPreset("lecture")}
            className="tap px-3 py-1.5 text-xs font-medium border border-rule-strong hover:border-accent hover:text-accent-ink transition-colors"
          >
            Slide 19-29: ในห้อง (K=3, Manhattan)
          </button>
          <button
            type="button"
            onClick={() => loadPreset("hw1")}
            className="tap px-3 py-1.5 text-xs font-medium border border-rule-strong hover:border-accent hover:text-accent-ink transition-colors"
          >
            Slide 44: การบ้าน Q1 (K=2, Manhattan)
          </button>
          <button
            type="button"
            onClick={() => loadPreset("hw2")}
            className="tap px-3 py-1.5 text-xs font-medium border border-rule-strong hover:border-accent hover:text-accent-ink transition-colors"
          >
            Slide 44: การบ้าน Q2 (K=3, Euclidean)
          </button>
        </div>

        {/* Metric Selector */}
        <div className="mt-6 flex items-center gap-6 border-b border-rule pb-4">
          <span className="meta-label text-xs text-ink-subtle">Metric:</span>
          <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="kmetric"
              value="manhattan"
              checked={metric === "manhattan"}
              onChange={() => setMetric("manhattan")}
              className="accent-accent"
            />
            <span>Manhattan (|x<sub>1</sub> &minus; x<sub>2</sub>| + |y<sub>1</sub> &minus; y<sub>2</sub>|)</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="kmetric"
              value="euclidean"
              checked={metric === "euclidean"}
              onChange={() => setMetric("euclidean")}
              className="accent-accent"
            />
            <span>Euclidean (&radic;[(x<sub>1</sub> &minus; x<sub>2</sub>)<sup>2</sup> + (y<sub>1</sub> &minus; y<sub>2</sub>)<sup>2</sup>])</span>
          </label>
        </div>
      </div>

      {/* Main Results Table */}
      <div className="col-span-12 lg:col-span-7">
        <h3 className="meta-label tracking-display text-ink-subtle mb-4">
          ตารางระยะห่างรอบที่ 1 และการจัดกลุ่ม (Iteration 1)
        </h3>

        <div className="overflow-x-auto border border-rule">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent-wash border-b border-rule">
              <tr>
                <th className="py-2.5 px-3 font-medium">จุด</th>
                <th className="py-2.5 px-3 font-medium">(x, y)</th>
                {centroids.map((c) => (
                  <th key={c.id} className="py-2.5 px-3 font-medium">
                    d(p, {c.id})
                  </th>
                ))}
                <th className="py-2.5 px-3 font-medium text-accent-ink">กลุ่มที่ได้</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule font-mono text-xs">
              {results.assignments.map((a) => (
                <tr key={a.point.id} className="hover:bg-accent-wash/40 transition-colors">
                  <td className="py-2 px-3 font-bold">{a.point.id}</td>
                  <td className="py-2 px-3 text-ink-muted">
                    ({a.point.x}, {a.point.y})
                  </td>
                  {a.dists.map((d) => {
                    const isMin = d.centroidId === a.assignedCentroidId;
                    return (
                      <td
                        key={d.centroidId}
                        className={`py-2 px-3 ${
                          isMin ? "font-bold text-accent-ink bg-accent-wash" : "text-ink-muted"
                        }`}
                      >
                        {metric === "manhattan"
                          ? d.distance
                          : d.distance.toFixed(3)}
                      </td>
                    );
                  })}
                  <td className="py-2 px-3 font-bold text-accent-ink">
                    {a.assignedCentroidId}
                    {a.isTie ? (
                      <span className="ml-1 text-[10px] text-ink-subtle font-normal" title="ระยะห่างเท่ากัน กฎให้เลือกคลัสเตอร์ที่เลขน้อยกว่า">
                        (Tie)
                      </span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recalculated Centroids Rail */}
      <div className="col-span-12 lg:col-span-5">
        <h3 className="meta-label tracking-display text-ink-subtle mb-4">
          พิกัด Centroid ใหม่หลังรอบที่ 1
        </h3>

        <div className="space-y-4">
          {results.newCentroids.map((c) => (
            <div key={c.id} className="border-t-2 border-accent pt-4">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-base text-accent-ink">{c.name}</span>
                <span className="text-xs text-ink-muted">
                  สมาชิก {c.count} จุด: {c.assignedNames.join(", ") || "-"}
                </span>
              </div>
              <div className="mt-2 text-xs font-mono space-y-1 text-ink-muted">
                <p>New X: {c.formulaX}</p>
                <p>New Y: {c.formulaY}</p>
              </div>
              <p className="mt-2 tnum font-semibold text-lg text-ink">
                พิกัดใหม่: ({c.newX.toFixed(2)}, {c.newY.toFixed(2)})
              </p>
            </div>
          ))}

          <div className="border border-rule p-4 mt-6 text-xs text-ink-muted leading-relaxed">
            <p className="font-semibold text-ink mb-1">กฎสำคัญที่ออกข้อสอบบ่อย:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Tie-break Rule:</strong> หากจุดใดมีระยะห่างเท่ากันหลาย Centroid
                (เช่น A5 ในการบ้าน Q1) สไลด์ใช้กฎเลือก Cluster ที่เลขน้อยกว่า
              </li>
              <li>
                <strong>Centroid Update:</strong> นำเฉพาะจุดที่เป็นสมาชิกในรอบนั้นมาหา Mean (เฉลี่ยเลขคณิต)
              </li>
              <li>
                <strong>Stopping Criteria:</strong> หยุดเมื่อพิกัด Centroid ไม่ขยับ
                หรือไม่มีจุดใดย้ายกลุ่มอีกต่อไป
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

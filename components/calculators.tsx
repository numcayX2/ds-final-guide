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
            const err = parsed.errors[f.key];
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
                  onChange={(e) => setRaw((s) => ({ ...s, [f.key]: e.target.value }))}
                  aria-describedby={err ? `${hintId} ${errId}` : hintId}
                  aria-invalid={err ? true : undefined}
                  className="tap mt-2 w-full tnum bg-bg border border-rule px-4 py-3 focus:border-accent outline-none"
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
          className="border-t-2 border-accent pt-6 lg:sticky lg:top-24"
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
            const err = cells.errors[c.key];
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
                  onChange={(e) => setRaw((s) => ({ ...s, [c.key]: e.target.value }))}
                  aria-describedby={err ? `${hintId} ${errId}` : hintId}
                  aria-invalid={err ? true : undefined}
                  className="tap mt-2 w-full tnum bg-bg border border-rule px-4 py-3 focus:border-accent outline-none"
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
          className="border-t-2 border-accent pt-6 lg:sticky lg:top-24"
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

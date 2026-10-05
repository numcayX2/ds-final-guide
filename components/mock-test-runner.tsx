"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MockTest, Question } from "@/content/types";

const OPT = ["a", "b", "c", "d"] as const;

function fmt(sec: number) {
  const m = Math.floor(Math.max(0, sec) / 60);
  const s = Math.max(0, sec) % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/**
 * Mock test runner.
 *
 * Accessibility notes that shaped this:
 * - The ticking clock is `role="timer"` with `aria-live="off"`, so a screen
 *   reader is not interrupted every second. Warnings go to a separate polite
 *   region, and only at the minute marks that matter.
 * - Each question is a real radio group, so arrow keys work natively and the
 *   announced label includes the question text.
 * - Moving between questions moves focus to that question's heading, otherwise
 *   keyboard focus stays behind on the previous question.
 */
export function MockTestRunner({ test }: { test: MockTest }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState(test.timeLimitSeconds);
  const [finished, setFinished] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const q: Question = test.questions[idx];

  const submit = useCallback(() => {
    setFinished(true);
    setRemaining(0);
    // Move focus to the result so the state change is announced in context.
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }, []);

  // Timer. Runs only while the paper is in progress.
  useEffect(() => {
    if (finished) return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [finished]);

  // Auto-submit when the clock reaches zero.
  useEffect(() => {
    if (remaining === 0 && !finished && Object.keys(answers).length >= 0 && test.timeLimitSeconds > 0) {
      submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, finished]);

  const score = useMemo(
    () =>
      test.questions.reduce((n, item) => {
        const chosen = answers[item.n];
        const right = item.options?.find((o) => o.correct)?.label;
        return chosen && right && chosen === right ? n + 1 : n;
      }, 0),
    [answers, test.questions],
  );

  const answered = Object.keys(answers).length;
  const total = test.questions.length;

  function choose(label: string) {
    setAnswers((a) => ({ ...a, [q.n]: label }));
  }

  function go(next: number) {
    setIdx(next);
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }

  /* ---------------- results ---------------- */
  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div>
        <div className="border-t-2 border-accent pt-6">
          <p className="meta-label tracking-display text-ink-subtle">ผลคะแนน</p>
          <p className="tnum mt-4 text-6xl lg:text-7xl font-medium">
            {score}
            <span className="text-ink-subtle text-3xl">/{total}</span>
          </p>
          <p className="mt-2 tnum text-lg text-ink-muted">{pct}%</p>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setIdx(0);
              setFinished(false);
              setRemaining(test.timeLimitSeconds);
            }}
            className="tap mt-8 px-6 py-3 border border-rule hover:border-accent"
          >
            <span className="meta-label tracking-display">ทำอีกครั้ง</span>
          </button>
        </div>

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-sp-2 text-3xl tracking-reset border-b border-rule pb-6 outline-none"
        >
          เฉลยทั้งหมด
        </h2>

        <ol className="mt-sp-1 space-y-sp-1">
          {test.questions.map((item, i) => {
            const right = item.options?.find((o) => o.correct)?.label;
            const mine = answers[item.n];
            const ok = mine && right && mine === right;
            const unanswered = !mine;
            return (
              <li key={item.n} className="grid-12 items-start">
                <div className="col-span-12 lg:col-span-1">
                  <span
                    className={`index text-2xl ${
                      ok ? "text-accent-ink" : unanswered ? "text-ink-subtle" : "text-ink"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-12 lg:col-span-10 mt-2 lg:mt-0">
                  <p className="text-lg">{item.prompt}</p>
                  <p className="mt-3 text-sm">
                    <span className="text-ink-subtle">คำตอบที่ถูก: </span>
                    <span className="tnum text-accent-ink font-medium">{right?.toUpperCase()}</span>
                    {!ok ? (
                      <>
                        <span className="text-ink-subtle"> · คุณเลือก: </span>
                        <span className="tnum">
                          {unanswered ? "ไม่ได้ตอบ" : mine?.toUpperCase()}
                        </span>
                      </>
                    ) : null}
                  </p>
                  <p className="mt-4 text-ink-muted">{item.explanation}</p>
                  {item.slideRef ? (
                    <p className="mt-3 meta-label tracking-display text-ink-subtle">
                      ตรวจได้ที่ {item.slideRef}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  /* ---------------- in progress ---------------- */
  const minutesLeft = Math.floor(remaining / 60);

  return (
    <div>
      {/* status bar */}
      <div className="sticky top-20 z-40 -mx-4 sm:mx-0 border-y border-rule bg-bg px-4 sm:px-0 py-4">
        <div className="grid-12 items-center gap-4">
          <div className="col-span-6 lg:col-span-3">
            <p className="meta-label tracking-display text-ink-subtle">เวลาที่เหลือ</p>
            {/* Ticking clock is deliberately silent; warnings use the polite
                region below so the reader is not interrupted every second. */}
            <p role="timer" aria-live="off" className="tnum text-2xl mt-1">
              {fmt(remaining)}
            </p>
          </div>
          <div className="col-span-6 lg:col-span-3 lg:text-right">
            <p className="meta-label tracking-display text-ink-subtle">ตอบแล้ว</p>
            <p className="tnum text-2xl mt-1">
              {answered}
              <span className="text-ink-subtle text-base">/{total}</span>
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:text-right">
            <div aria-live="polite" className="meta-label tracking-display text-accent-ink">
              {minutesLeft <= 3 ? `เหลืออีก ${minutesLeft} นาที` : ""}
            </div>
            <button
              type="button"
              onClick={submit}
              className="tap mt-1 px-5 py-2 border border-rule hover:border-accent"
            >
              <span className="meta-label tracking-display">ส่งคำตอบ</span>
            </button>
          </div>
        </div>
      </div>

      {/* progress rail */}
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="เลือกข้อ">
        {test.questions.map((item, i) => {
          const on = i === idx;
          const done = Boolean(answers[item.n]);
          return (
            <button
              key={item.n}
              type="button"
              onClick={() => go(i)}
              aria-current={on ? "true" : undefined}
              className={`tap w-11 text-sm border transition-colors duration-200 ${
                on
                  ? "border-accent text-accent-ink"
                  : done
                    ? "border-rule-strong text-ink"
                    : "border-rule text-ink-subtle"
              }`}
            >
              <span className="tnum">{item.n}</span>
            </button>
          );
        })}
      </div>

      {/* question */}
      <section className="mt-sp-1">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl lg:text-3xl tracking-reset outline-none"
        >
          <span className="index text-accent-ink mr-4">
            {String(q.n).padStart(2, "0")}
          </span>
          {q.prompt}
        </h2>

        <fieldset className="mt-8 border-0 p-0">
          <legend className="meta-label tracking-display text-ink-subtle">
            เลือกคำตอบที่ถูกต้อง
          </legend>
          <div className="mt-4 space-y-2">
            {q.options?.map((o) => {
              const id = `q${q.n}-${o.label}`;
              const on = answers[q.n] === o.label;
              return (
                <label
                  key={o.label}
                  htmlFor={id}
                  className={`tap flex items-start gap-4 border p-4 cursor-pointer transition-colors duration-200 ${
                    on ? "border-accent" : "border-rule hover:border-rule-strong"
                  }`}
                >
                  <input
                    id={id}
                    type="radio"
                    name={`q-${q.n}`}
                    value={o.label}
                    checked={on}
                    onChange={() => choose(o.label)}
                    className="mt-1 w-4 h-4 accent-[var(--accent)] shrink-0"
                  />
                  <span className="tnum text-ink-subtle">{o.label.toUpperCase()}.</span>
                  <span>{o.text}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-sp-1 flex gap-3">
          <button
            type="button"
            onClick={() => go(Math.max(0, idx - 1))}
            disabled={idx === 0}
            className="tap px-6 py-3 border border-rule hover:border-accent disabled:opacity-35 disabled:hover:border-rule"
          >
            <span className="meta-label tracking-display">ก่อนหน้า</span>
          </button>
          <button
            type="button"
            onClick={() => go(Math.min(total - 1, idx + 1))}
            disabled={idx === total - 1}
            className="tap px-6 py-3 border border-rule hover:border-accent disabled:opacity-35 disabled:hover:border-rule"
          >
            <span className="meta-label tracking-display">ถัดไป</span>
          </button>
        </div>

        <p className="mt-8 text-sm text-ink-muted">
          เวลาหมดระบบจะส่งคำตอบให้อัตโนมัติ ตรวจคำตอบแล้วจะเห็นเฉลยพร้อมเลขหน้าสไลด์ที่ใช้ตรวจ
        </p>
      </section>
    </div>
  );
}
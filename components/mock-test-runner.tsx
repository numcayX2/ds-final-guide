"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MockTest, Question } from "@/content/types";

function fmt(sec: number) {
  const m = Math.floor(Math.max(0, sec) / 60);
  const s = Math.max(0, sec) % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const KIND_LABELS: Record<string, string> = {
  numeric: "คำนวณตัวเลข",
  interpretation: "ตีความ / แนวคิด",
  scenario: "โจทย์สถานการณ์",
  "true-false": "ถูก / ผิด",
  essay: "อธิบายหลักการ",
};

interface MockTestRunnerProps {
  test?: MockTest;
  tests?: MockTest[];
}

/**
 * Mock test runner supporting single or multi-paper mode.
 *
 * Accessibility notes:
 * - The ticking clock is `role="timer"` with `aria-live="off"`, so a screen
 *   reader is not interrupted every second. Warnings go to a polite region.
 * - Each question is a real radio group, so arrow keys work natively and the
 *   announced label includes the question text.
 * - Moving between questions moves focus to that question's heading.
 */
export function MockTestRunner({ test: initialTest, tests }: MockTestRunnerProps) {
  const testList = useMemo(() => {
    if (tests && tests.length > 0) return tests;
    if (initialTest) return [initialTest];
    return [];
  }, [tests, initialTest]);

  const [activeTestIndex, setActiveTestIndex] = useState(0);
  const activeTest = testList[activeTestIndex] || testList[0];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState(activeTest ? activeTest.timeLimitSeconds : 0);
  const [finished, setFinished] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const q: Question | undefined = activeTest?.questions[idx];

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
    if (remaining === 0 && !finished && Object.keys(answers).length >= 0 && (activeTest?.timeLimitSeconds ?? 0) > 0) {
      submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, finished, activeTest]);

  const score = useMemo(() => {
    if (!activeTest) return 0;
    return activeTest.questions.reduce((n, item) => {
      const chosen = answers[item.n];
      const right = item.options?.find((o) => o.correct)?.label;
      return chosen && right && chosen === right ? n + 1 : n;
    }, 0);
  }, [answers, activeTest]);

  const answered = Object.keys(answers).length;
  const total = activeTest ? activeTest.questions.length : 0;

  function choose(label: string) {
    if (!q) return;
    setAnswers((a) => ({ ...a, [q.n]: label }));
  }

  function go(next: number) {
    setIdx(next);
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }

  function switchTest(newIndex: number) {
    if (newIndex === activeTestIndex) return;
    const nextTest = testList[newIndex];
    if (!nextTest) return;
    setActiveTestIndex(newIndex);
    setAnswers({});
    setIdx(0);
    setFinished(false);
    setRemaining(nextTest.timeLimitSeconds);
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }

  if (!activeTest || !q) {
    return <div className="py-8 text-ink-subtle">ไม่พบชุดข้อสอบ</div>;
  }

  /* ---------------- results ---------------- */
  if (finished) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div>
        {testList.length > 1 && (
          <div className="mb-8 border-b border-rule pb-4">
            <p className="meta-label tracking-display text-ink-subtle mb-3">ชุดข้อสอบ</p>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="เลือกชุดข้อสอบ">
              {testList.map((t, ti) => (
                <button
                  key={t.id || t.title}
                  type="button"
                  role="tab"
                  aria-selected={ti === activeTestIndex}
                  onClick={() => switchTest(ti)}
                  className={`tap px-4 py-2 border text-sm transition-colors duration-200 ${
                    ti === activeTestIndex
                      ? "border-accent text-accent-ink font-medium"
                      : "border-rule hover:border-rule-strong text-ink"
                  }`}
                >
                  <span className="meta-label tracking-display">{t.titleTh}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t-2 border-accent pt-6">
          <p className="meta-label tracking-display text-ink-subtle">
            ผลคะแนน &middot; {activeTest.titleTh}
          </p>
          <p className="tnum mt-4 text-6xl lg:text-7xl font-medium">
            {score}
            <span className="text-ink-subtle text-3xl">/{total}</span>
          </p>
          <p className="mt-2 tnum text-lg text-ink-muted">{pct}%</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setIdx(0);
                setFinished(false);
                setRemaining(activeTest.timeLimitSeconds);
              }}
              className="tap px-6 py-3 border border-rule hover:border-accent"
            >
              <span className="meta-label tracking-display">ทำชุดนี้อีกครั้ง</span>
            </button>
          </div>
        </div>

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-sp-2 text-3xl tracking-reset border-b border-rule pb-6 outline-none"
        >
          เฉลยและวิธีคิดทั้งหมด
        </h2>

        <ol className="mt-sp-1 space-y-sp-1">
          {activeTest.questions.map((item, i) => {
            const right = item.options?.find((o) => o.correct)?.label;
            const mine = answers[item.n];
            const ok = mine && right && mine === right;
            const unanswered = !mine;
            return (
              <li key={item.n} className="grid-12 items-start border-t border-rule pt-6 first:border-0 first:pt-0">
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
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {item.lectures.map((l) => (
                      <span
                        key={l}
                        className="meta-label tracking-display text-xs border border-rule px-2 py-0.5 text-ink-subtle"
                      >
                        {l}
                      </span>
                    ))}
                    {KIND_LABELS[item.kind] && (
                      <span className="meta-label tracking-display text-xs text-ink-subtle">
                        {KIND_LABELS[item.kind]}
                      </span>
                    )}
                  </div>

                  <p className="text-lg text-ink font-normal">{item.prompt}</p>

                  <p className="mt-3 text-sm">
                    <span className="text-ink-subtle">คำตอบที่ถูก: </span>
                    <span className="tnum text-accent-ink font-medium">
                      {right?.toUpperCase()}
                    </span>
                    {!ok ? (
                      <>
                        <span className="text-ink-subtle"> &middot; คุณเลือก: </span>
                        <span className="tnum">
                          {unanswered ? "ไม่ได้ตอบ" : mine?.toUpperCase()}
                        </span>
                      </>
                    ) : null}
                  </p>

                  <div className="mt-4 text-ink-muted whitespace-pre-line text-sm lg:text-base">
                    {item.explanation}
                  </div>

                  {item.distractor && (
                    <div className="mt-4 border-l-2 border-rule-strong pl-3 py-1">
                      <p className="meta-label tracking-display text-xs text-ink-subtle">
                        จุดที่มักตอบผิด &middot; Trap
                      </p>
                      <p className="mt-1 text-xs text-ink-muted">{item.distractor}</p>
                    </div>
                  )}

                  {item.slideRef ? (
                    <p className="mt-3 meta-label tracking-display text-ink-subtle text-xs">
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
      {/* Paper selection bar (if multiple papers available) */}
      {testList.length > 1 && (
        <div className="mb-6 pb-4 border-b border-rule">
          <p className="meta-label tracking-display text-ink-subtle mb-3">
            เลือกชุดข้อสอบ &middot; Select Paper
          </p>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="เลือกชุดข้อสอบ">
            {testList.map((t, ti) => {
              const isSelected = ti === activeTestIndex;
              return (
                <button
                  key={t.id || t.title}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => switchTest(ti)}
                  className={`tap px-4 py-2 border text-sm transition-colors duration-200 ${
                    isSelected
                      ? "border-accent text-accent-ink font-medium"
                      : "border-rule hover:border-rule-strong text-ink"
                  }`}
                >
                  <span className="meta-label tracking-display">{t.titleTh}</span>
                </button>
              );
            })}
          </div>
          {activeTest.description && (
            <p className="mt-2 text-sm text-ink-subtle">{activeTest.description}</p>
          )}
        </div>
      )}

      {/* status bar */}
      <div className="sticky top-20 z-40 border border-rule bg-bg/90 backdrop-blur-md p-4 sm:p-5 hud-bracket cyber-glow mt-4">
        <div className="grid-12 items-center gap-4">
          <div className="col-span-6 lg:col-span-3">
            <p className="text-[11px] font-mono tracking-widest text-ink-subtle uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent cyber-beacon" />
              TIME_REMAINING
            </p>
            {/* Ticking clock is deliberately silent; warnings use the polite region */}
            <p role="timer" aria-live="off" className="tnum font-mono text-3xl font-bold text-accent-ink mt-1 cyber-text-glow">
              {fmt(remaining)}
            </p>
          </div>
          <div className="col-span-6 lg:col-span-3 lg:text-right">
            <p className="text-[11px] font-mono tracking-widest text-ink-subtle uppercase">
              COMPLETED_ITEMS
            </p>
            <p className="tnum font-mono text-3xl font-bold mt-1">
              {answered}
              <span className="text-ink-subtle text-base font-normal">/{total}</span>
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:text-right flex items-center justify-between lg:justify-end gap-4">
            <div aria-live="polite" className="text-xs font-mono text-accent-ink font-semibold">
              {minutesLeft <= 3 ? `[ WARNING: ${minutesLeft} MIN REMAINING ]` : ""}
            </div>
            <button
              type="button"
              onClick={submit}
              className="tap px-5 py-2.5 text-xs font-mono font-semibold border-2 border-accent bg-accent text-white hover:bg-accent-ink transition-colors cyber-glow"
            >
              SUBMIT_EXAM // ส่งข้อสอบ
            </button>
          </div>
        </div>
      </div>

      {/* progress rail */}
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="เลือกข้อ">
        {activeTest.questions.map((item, i) => {
          const on = i === idx;
          const done = Boolean(answers[item.n]);
          return (
            <button
              key={item.n}
              type="button"
              onClick={() => go(i)}
              aria-current={on ? "true" : undefined}
              className={`tap w-11 h-11 text-xs font-mono border transition-all duration-200 ${
                on
                  ? "border-accent bg-accent text-white font-bold shadow-[0_0_15px_rgba(255,77,0,0.4)]"
                  : done
                    ? "border-rule-strong bg-accent-wash/40 text-accent-ink font-semibold"
                    : "border-rule text-ink-subtle hover:border-accent/60"
              }`}
            >
              <span className="tnum">{String(item.n).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      {/* question */}
      <section className="mt-sp-1">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {q.lectures.map((l) => (
            <span
              key={l}
              className="meta-label tracking-display text-xs border border-rule px-2.5 py-1 text-ink-subtle"
            >
              {l}
            </span>
          ))}
          {KIND_LABELS[q.kind] && (
            <span className="meta-label tracking-display text-xs text-ink-subtle">
              {KIND_LABELS[q.kind]}
            </span>
          )}
        </div>

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
                  <span className="tnum text-ink-subtle font-medium">
                    {o.label.toUpperCase()}.
                  </span>
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
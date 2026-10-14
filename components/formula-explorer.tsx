"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Formula } from "@/content/types";
import { Tex } from "./math-formula";
import { NumberField, Note } from "./ui";

const LECTURE_TABS = [
  { id: "all", label: "ทั้งหมด" },
  { id: "Lect 05", label: "Lect 05 · EDA" },
  { id: "Lect 07", label: "Lect 07 · Trees" },
  { id: "Lect 08", label: "Lect 08 · Metrics" },
  { id: "Lect 09", label: "Lect 09 · K-Means & RDS" },
] as const;

type StudyMode = "review" | "recall-formula" | "practice-example";

const STUDY_MODES: { id: StudyMode; label: string; hint: string }[] = [
  { id: "review", label: "อ่านทบทวน", hint: "แสดงสูตรและวิธีทำทั้งหมด" },
  { id: "recall-formula", label: "ฝึกจำสูตร", hint: "ซ่อนสมการเพื่อทดสอบความจำ" },
  { id: "practice-example", label: "ฝึกทำโจทย์", hint: "ซ่อนวิธีทำและคำตอบของตัวอย่าง" },
];

/* ───────────── "ต้องทบทวน" store: bookmarks ↔ review filter ───────────── */

/**
 * The per-card bookmark and the "ต้องทบทวน (N)" filter are the same concept,
 * so both read and write this one key. Do not add a second review key.
 */
const SAVED_KEY = "ds-saved-formulas";
const SAVED_EVENT = "ds-saved-formulas";

function subscribeSaved(save: () => void) {
  window.addEventListener("storage", save);
  window.addEventListener(SAVED_EVENT, save);
  return () => {
    window.removeEventListener("storage", save);
    window.removeEventListener(SAVED_EVENT, save);
  };
}

function savedSnapshot(): string {
  try {
    return localStorage.getItem(SAVED_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

/** Stable server snapshot: reading storage here would break hydration. */
const savedServerSnapshot = () => "[]";

/** Storage is user-writable; a malformed value must not break the page. */
function parseSaved(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function toggleSaved(id: string) {
  const current = parseSaved(savedSnapshot());
  const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  } catch {
    /* private mode: the bookmark will not persist */
  }
  window.dispatchEvent(new Event(SAVED_EVENT));
}

/* ───────────── Practice mode: checking a typed answer ───────────── */

/** Thai codepoints — such strings must not be pushed onto the mono stack. */
const THAI = /[\u0E00-\u0E7F]/;

/** Latin/numeric tokens may be mono; Thai prose stays on the sans stack. */
const monoClass = (text: string) => (THAI.test(text) ? "" : "font-mono");

type Attempt = { input: string; status: "unchecked" | "correct" | "incorrect" | "invalid" };
type Verdict = Exclude<Attempt["status"], "unchecked">;

/** Shared default: a card the student has not answered yet. */
const EMPTY_ATTEMPT: Attempt = { input: "", status: "unchecked" };

/** Last figure written in a string. `null` = the string holds no figure. */
function lastNumber(text: string): number | null {
  const found = text.match(/-?\d[\d,]*(?:\.\d+)?/g);
  if (!found || found.length === 0) return null;
  const value = Number(found[found.length - 1].replace(/,/g, ""));
  return Number.isFinite(value) ? value : null;
}

/**
 * The figure a student has to produce for a worked example. Answers are written
 * the way the slides write them ("ROOT(26) = 5.099", "70.00%", "เลือก A ที่ Gain
 * 0.222"), so take the number after the last "=" when there is one, otherwise the
 * last number written. `null` = the example has no numeric answer to drill.
 */
function expectedAnswer(result: string): { value: number; percent: boolean } | null {
  const eq = result.lastIndexOf("=");
  const tail = eq === -1 ? result : result.slice(eq + 1);
  const value = lastNumber(tail) ?? lastNumber(result);
  if (value === null) return null;
  return { value, percent: result.includes("%") };
}

/** Accepts "0.278", "70", "70%", "-2.5", "4/5", ".5". `null` = not a number. */
function parseAnswer(input: string): number | null {
  const text = input.trim().replace(/[,\s]/g, "").replace(/%$/, "").replace(/^\+/, "");
  if (text === "") return null;
  const fraction = text.match(/^(-?(?:\d+\.?\d*|\.\d+))\/(-?(?:\d+\.?\d*|\.\d+))$/);
  if (fraction) {
    const divisor = Number(fraction[2]);
    if (divisor === 0) return null;
    const quotient = Number(fraction[1]) / divisor;
    return Number.isFinite(quotient) ? quotient : null;
  }
  if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(text)) return null;
  const value = Number(text);
  return Number.isFinite(value) ? value : null;
}

/**
 * Tolerance absorbs rounding, not guessing: 1% of the answer, or 0.01 for answers
 * near zero. 0.278 → "0.28" counts; 0.278 → "0.3" does not.
 */
function checkAnswer(input: string, expected: { value: number; percent: boolean }): Verdict {
  const value = parseAnswer(input);
  if (value === null) return "invalid";
  const tolerance = Math.max(0.01, Math.abs(expected.value) * 0.01);
  // "70.00%" may legitimately be entered as 70 or as 0.7.
  const targets = expected.percent ? [expected.value, expected.value / 100] : [expected.value];
  return targets.some((target) => Math.abs(value - target) <= tolerance) ? "correct" : "incorrect";
}

export function FormulaExplorer({ formulas }: { formulas: Formula[] }) {
  const [lect, setLect] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [studyMode, setStudyMode] = useState<StudyMode>("review");
  const [onlySaved, setOnlySaved] = useState(false);
  const [attempts, setAttempts] = useState<Record<string, Attempt>>({});
  const [revealedFormulas, setRevealedFormulas] = useState<Record<string, boolean>>({});
  const [revealedExamples, setRevealedExamples] = useState<Record<string, boolean>>({});

  const reducedMotion = Boolean(useReducedMotion());
  const rawSaved = useSyncExternalStore(subscribeSaved, savedSnapshot, savedServerSnapshot);
  const savedIds = useMemo(() => parseSaved(rawSaved), [rawSaved]);

  /**
   * 180ms entry fade/scale for a reveal the student asked for. `initial: false`
   * on the first paint keeps the content visible when JS never runs.
   */
  const revealStart = { opacity: 0, scale: reducedMotion ? 1 : 0.98 };
  const revealAnimation = {
    animate: { opacity: 1, scale: 1 },
    transition: { duration: reducedMotion ? 0 : 0.18, ease: "easeOut" as const },
  };

  const handleModeChange = (mode: StudyMode) => {
    setStudyMode(mode);
    setRevealedFormulas({});
    setRevealedExamples({});
    setAttempts({});
  };

  const submitAnswer = (id: string, result: string) => {
    const expected = expectedAnswer(result);
    if (!expected) return;
    const input = attempts[id]?.input ?? "";
    const status = checkAnswer(input, expected);
    setAttempts((prev) => ({ ...prev, [id]: { input, status } }));
  };

  /** Typing again clears the previous verdict, so feedback is never stale. */
  const setAnswerInput = (id: string, input: string) => {
    setAttempts((prev) => ({ ...prev, [id]: { input, status: "unchecked" } }));
  };

  const toggleRevealFormula = (id: string) => {
    setRevealedFormulas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRevealExample = (id: string) => {
    setRevealedExamples((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const indexed = useMemo(
    () =>
      formulas.map((f, i) => ({
        f,
        no: String(i + 1).padStart(2, "0"),
        haystack: [
          f.name,
          f.expression,
          f.output,
          f.pitfall ?? "",
          ...f.symbols.flatMap((s) => [s.symbol, s.meaning]),
        ]
          .join(" ")
          .toLowerCase(),
      })),
    [formulas]
  );

  const counts = useMemo(
    () =>
      Object.fromEntries(
        LECTURE_TABS.map((t) => [
          t.id,
          formulas.filter(
            (f) => t.id === "all" || (f.lectures as readonly string[]).includes(t.id)
          ).length,
        ])
      ),
    [formulas]
  );

  const q = query.trim().toLowerCase();
  const filtered = indexed.filter(
    (x) =>
      (lect === "all" || (x.f.lectures as readonly string[]).includes(lect)) &&
      (!onlySaved || savedIds.includes(x.f.id)) &&
      (!q || x.haystack.includes(q))
  );

  return (
    <div>
      {/* Sticky Filter & Study Mode Bar */}
      <div className="sticky top-[var(--header-h,4rem)] z-30 border-b border-rule bg-paper/95 backdrop-blur">
        <div className="mx-auto w-full max-w-5xl space-y-2.5 px-5 py-3 sm:px-8">
          {/* Row 1: Lecture Tabs & Search */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div
              className="-mx-1 flex gap-1 overflow-x-auto px-1"
              role="group"
              aria-label="กรองตามบทเรียน"
            >
              {LECTURE_TABS.map((tab) => {
                const on = lect === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setLect(tab.id)}
                    className={`shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                      on
                        ? "border-accent bg-accent-wash text-accent-ink"
                        : "border-transparent text-ink-muted hover:text-ink"
                    }`}
                  >
                    {tab.label}{" "}
                    <span className="num font-mono text-ink-subtle">{counts[tab.id]}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <label htmlFor="formula-search" className="sr-only">
                ค้นหาสูตร
              </label>
              <input
                id="formula-search"
                type="search"
                placeholder="ค้นหาชื่อสูตร ตัวแปร หรือสิ่งที่ต้องการหา"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="field field-sm pr-9 font-sans"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="ล้างคำค้นหา"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink"
                >
                  ×
                </button>
              ) : null}
            </div>
          </div>

          {/* Row 2: Active Recall Modes & Saved Filter */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rule/60 pt-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-medium text-ink-subtle">โหมดการเรียน:</span>
              {STUDY_MODES.map((m) => {
                const active = studyMode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleModeChange(m.id)}
                    title={m.hint}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "bg-ink text-paper font-semibold"
                        : "bg-surface-hover text-ink-muted hover:text-ink"
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setOnlySaved((prev) => !prev)}
              aria-pressed={onlySaved}
              className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                onlySaved
                  ? "border-warn bg-warn/15 text-ink font-semibold"
                  : "border-rule bg-surface text-ink-muted hover:text-ink"
              }`}
            >
              ต้องทบทวน (<span className="num">{savedIds.length}</span>)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
        {/* Status & Quick Jump Index */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-ink-subtle" aria-live="polite">
              แสดง <span className="num">{filtered.length}</span> จาก{" "}
              <span className="num">{formulas.length}</span> สูตร
              {studyMode !== "review" && (
                <span className="ml-2 font-medium text-accent-ink">
                  ({STUDY_MODES.find((m) => m.id === studyMode)?.hint})
                </span>
              )}
            </p>
            {studyMode !== "review" && (
              <button
                type="button"
                onClick={() => handleModeChange("review")}
                className="text-xs font-medium text-ink-muted underline hover:text-ink"
              >
                เฉลยทั้งหมด
              </button>
            )}
          </div>

          {/* Quick Jump Bar */}
          {filtered.length > 1 && (
            <nav
              aria-label="สารบัญสูตรด่วน"
              className="flex flex-wrap gap-1.5 rounded-xl border border-rule bg-surface p-3"
            >
              {filtered.map(({ f, no }) => (
                <a
                  key={f.id}
                  href={`#${f.id}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-surface-hover/60 px-2.5 py-1 text-xs text-ink-muted transition-colors hover:border-accent hover:text-ink"
                >
                  <span className="font-mono text-[11px] text-accent">{no}</span>
                  <span className="truncate max-w-[180px]">{f.name}</span>
                </a>
              ))}
            </nav>
          )}
        </div>

        {/* Formula Cards */}
        <div className="space-y-6">
          {filtered.map(({ f, no }) => {
            const isSaved = savedIds.includes(f.id);
            const attempt = attempts[f.id] ?? EMPTY_ATTEMPT;
            const example = f.example;
            const expected = example ? expectedAnswer(example.result) : null;
            const isFormulaHidden =
              studyMode === "recall-formula" && !revealedFormulas[f.id];
            const isExampleHidden =
              studyMode === "practice-example" && !revealedExamples[f.id];

            return (
              <article
                key={f.id}
                id={f.id}
                className="scroll-mt-44 rounded-xl border border-rule bg-surface transition-shadow hover:shadow-xs"
              >
                {/* Header */}
                <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-rule px-6 py-4">
                  <span className="num font-mono text-sm font-bold text-accent">{no}</span>
                  <h2 className="text-xl font-semibold tracking-tight text-ink">{f.name}</h2>

                  <div className="ml-auto flex items-center gap-3">
                    <span className="font-mono text-xs text-ink-subtle">
                      {f.lectures.join(" · ")}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSaved(f.id)}
                      aria-pressed={isSaved}
                      aria-label={
                        isSaved
                          ? `เอาสูตร ${f.name} ออกจากรายการต้องทบทวน`
                          : `บันทึกสูตร ${f.name} ไว้ทบทวน`
                      }
                      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                        isSaved
                          ? "border-warn bg-warn/15 text-ink font-semibold"
                          : "border-rule bg-surface-hover text-ink-muted hover:text-ink"
                      }`}
                    >
                      {isSaved ? "บันทึกทบทวนแล้ว" : "+ ทบทวนซ้ำ"}
                    </button>
                  </div>
                </header>

                {/* Body Grid */}
                <div className="grid gap-8 p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                  {/* Left Column: Output Goal, Formula & Symbols */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                        เป้าหมายของสูตร
                      </span>
                      <p className="mt-1 text-base font-medium text-ink">{f.output}</p>
                    </div>

                    {/* Formula Box (Supports Active Recall) */}
                    {isFormulaHidden ? (
                      <button
                        type="button"
                        onClick={() => toggleRevealFormula(f.id)}
                        className="flex w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-accent/40 bg-accent-wash/40 px-5 py-8 text-center transition-colors hover:bg-accent-wash"
                      >
                        <span className="text-sm font-semibold text-accent-ink">
                          ลองนึกโครงสร้างสูตรของ "{f.name}"
                        </span>
                        <span className="text-xs text-ink-muted">
                          คลิกเพื่อเปิดดูสมการและคำอธิบายตัวแปร
                        </span>
                      </button>
                    ) : (
                      <motion.div
                        className="space-y-4"
                        initial={revealedFormulas[f.id] ? revealStart : false}
                        {...revealAnimation}
                      >
                        <div className="relative overflow-x-auto rounded-lg bg-accent-wash px-5 py-5 text-lg text-ink">
                          {studyMode === "recall-formula" && (
                            <button
                              type="button"
                              onClick={() => toggleRevealFormula(f.id)}
                              className="absolute right-2.5 top-2 text-[11px] font-medium text-ink-subtle hover:text-ink"
                            >
                              ซ่อนสูตร
                            </button>
                          )}
                          {f.tex ? (
                            <Tex tex={f.tex} display />
                          ) : (
                            <p className={`text-center text-xl ${monoClass(f.expression)}`}>
                              {f.expression}
                            </p>
                          )}
                        </div>

                        {f.symbols.length > 0 ? (
                          <div className="pt-1">
                            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                              ความหมายตัวแปร
                            </p>
                            <dl className="divide-y divide-rule/60 rounded-lg border border-rule bg-surface-hover/40 px-4 py-1">
                              {f.symbols.map((s) => (
                                <div
                                  key={s.symbol}
                                  className="grid grid-cols-[minmax(4.5rem,auto)_minmax(0,1fr)] items-baseline gap-4 py-2"
                                >
                                  <dt className="font-mono font-semibold text-accent-ink">
                                    {s.symbol}
                                  </dt>
                                  <dd className="text-sm text-ink-muted">{s.meaning}</dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </div>

                  {/* Right Column: Worked Example & Pitfalls */}
                  <div className="space-y-5">
                    {example ? (
                      <section className="rounded-xl border border-rule bg-surface-hover/30 p-4">
                        <div className="flex items-center justify-between pb-2.5 border-b border-rule">
                          <span className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                            ตัวอย่างการคำนวณ
                          </span>
                          {studyMode === "practice-example" && !isExampleHidden && (
                            <button
                              type="button"
                              onClick={() => toggleRevealExample(f.id)}
                              className="text-xs text-ink-subtle hover:text-ink"
                            >
                              ซ่อนวิธีทำ
                            </button>
                          )}
                        </div>

                        {/* Given Data Box */}
                        <div className="mt-3 rounded-lg bg-surface p-3 border border-rule/80">
                          <span className="block text-[11px] font-semibold text-ink-subtle mb-1">
                            โจทย์กำหนด:
                          </span>
                          <p className={`text-sm text-ink ${monoClass(example.given)}`}>
                            {example.given}
                          </p>
                        </div>

                        {/* Practice Mode: answer first, solution on request */}
                        {studyMode === "practice-example" && expected ? (
                          <form
                            className="mt-3"
                            onSubmit={(event) => {
                              event.preventDefault();
                              submitAnswer(f.id, example.result);
                            }}
                          >
                            <div className="flex flex-wrap items-end gap-2">
                              <div className="min-w-[11rem] flex-1">
                                <NumberField
                                  id={`answer-${f.id}`}
                                  label="คำตอบของคุณ"
                                  hint="พิมพ์ตัวเลข หรือเศษส่วน เช่น 4/5"
                                  value={attempt.input}
                                  onChange={(value) => setAnswerInput(f.id, value)}
                                  error={
                                    attempt.status === "invalid"
                                      ? "ใส่เป็นตัวเลขก่อนตรวจคำตอบ"
                                      : undefined
                                  }
                                  inputMode={expected.value < 0 ? "text" : "decimal"}
                                  size="sm"
                                />
                              </div>
                              <button
                                type="submit"
                                className="btn btn-primary"
                              >
                                ตรวจคำตอบ
                              </button>
                            </div>

                            {attempt.status === "correct" || attempt.status === "incorrect" ? (
                              <p
                                role="status"
                                className={`mt-2.5 rounded-lg border px-3.5 py-2.5 text-sm text-ink ${
                                  attempt.status === "correct"
                                    ? "border-good bg-good-wash"
                                    : "border-bad bg-bad-wash"
                                }`}
                              >
                                {attempt.status === "correct" ? (
                                  <>
                                    <span className="font-semibold">ถูกต้อง</span> — คำตอบของโจทย์ข้อนี้คือ{" "}
                                    <span className={`answer num ${monoClass(example.result)}`}>
                                      {example.result}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="font-semibold">ยังไม่ใช่</span> — ทวนการแทนค่าและลำดับการคำนวณอีกครั้ง
                                    แล้วค่อยเปิดดูวิธีทำ
                                  </>
                                )}
                              </p>
                            ) : null}
                          </form>
                        ) : null}

                        {studyMode === "practice-example" && !expected ? (
                          <p className="mt-3 text-xs text-ink-muted">
                            โจทย์ข้อนี้ไม่มีคำตอบเป็นตัวเลข — ลองสรุปหลักการตอบด้วยคำพูดก่อน
                            แล้วเปิดวิธีทำเพื่อเทียบแนวคิด
                          </p>
                        ) : null}

                        {/* Steps & Answer (Supports Practice Mode) */}
                        {isExampleHidden ? (
                          <button
                            type="button"
                            onClick={() => toggleRevealExample(f.id)}
                            className="mt-3 flex w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-rule-strong bg-surface py-6 text-center transition-colors hover:border-accent"
                          >
                            <span className="text-sm font-semibold text-ink">
                              ลองแทนค่าและคำนวณคำตอบด้วยตัวเอง
                            </span>
                            <span className="text-xs text-accent-ink">
                              คลิกเพื่อดูวิธีทำทีละขั้นและตรวจคำตอบ
                            </span>
                          </button>
                        ) : (
                          <motion.div
                            initial={revealedExamples[f.id] ? revealStart : false}
                            {...revealAnimation}
                          >
                            <div className="mt-3.5">
                              <span className="block text-[11px] font-semibold text-ink-subtle mb-2">
                                วิธีทำทีละขั้น:
                              </span>
                              <ol className="space-y-2">
                                {example.steps.map((s, k) => (
                                  <li
                                    key={k}
                                    className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-baseline gap-x-2 text-sm text-ink-muted"
                                  >
                                    <span className="num inline-flex size-5 items-center justify-center rounded-full bg-surface border border-rule font-mono text-[11px] font-semibold text-ink-subtle">
                                      {k + 1}
                                    </span>
                                    <span className="leading-relaxed">{s}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            <div className="mt-4 flex items-baseline justify-between rounded-lg bg-accent-wash/60 px-3.5 py-2.5 border border-accent/20">
                              <span className="text-xs font-semibold uppercase tracking-wider text-accent-ink">
                                คำตอบสุทธิ
                              </span>
                              <span
                                className={`answer text-base font-bold text-ink ${monoClass(example.result)}`}
                              >
                                {example.result}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </section>
                    ) : null}

                    {f.pitfall ? (
                      <Note tone="pitfall" title="จุดที่มักผิดในห้องสอบ">
                        {f.pitfall}
                      </Note>
                    ) : null}

                    {f.verification === "needs-slide-check" ? (
                      <p className="text-xs text-warn">
                        ยังไม่ได้เทียบกับสไลด์ — ตรวจกับเอกสารอาจารย์ก่อนใช้
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-rule-strong px-6 py-12 text-center">
              <p className="font-semibold text-ink">
                ไม่พบสูตรที่ตรงกับเงื่อนไขที่เลือก
              </p>
              <button
                type="button"
                onClick={() => {
                  setLect("all");
                  setQuery("");
                  setOnlySaved(false);
                }}
                className="btn btn-secondary mt-4"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
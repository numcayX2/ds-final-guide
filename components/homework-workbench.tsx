"use client";

import { useState } from "react";
import type { HomeworkProblem } from "@/content/types";
import {
  CheckCircledIcon,
  ChevronRightIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  InfoCircledIcon,
  ResetIcon,
} from "@radix-ui/react-icons";

type HomeworkStudyMode = "review" | "step-by-step" | "self-test";

const STUDY_MODES: { id: HomeworkStudyMode; label: string; desc: string }[] = [
  { id: "review", label: "อ่านทบทวน", desc: "แสดงวิธีทำและคำตอบทั้งหมด" },
  { id: "step-by-step", label: "เปิดทีละขั้น", desc: "คลิกเปิดดูวิธีคิดทีละบรรทัดขณะทดเลข" },
  { id: "self-test", label: "ซ้อมสอบจริง", desc: "ซ่อนวิธีทำและคำตอบทั้งหมดเพื่อลองทำเอง" },
];

/**
 * แยกข้อความในแต่ละขั้นตอนที่มีรูปแบบ "หัวข้อ: การคำนวณ → ผลลัพธ์"
 * เพื่อจัดวาง Layout ให้เป็นระเบียบและกวาดสายตาอ่านได้ง่าย
 */
function parseSolutionStep(raw: string): {
  title: string | null;
  calculation: string;
  verdict: string | null;
} {
  let rest = raw;
  let title: string | null = null;
  let verdict: string | null = null;

  const colonIdx = rest.indexOf(":");
  if (colonIdx > 0 && colonIdx < 48) {
    title = rest.slice(0, colonIdx).trim();
    rest = rest.slice(colonIdx + 1).trim();
  }

  const arrowIdx = rest.lastIndexOf("→");
  if (arrowIdx !== -1) {
    verdict = rest.slice(arrowIdx + 1).trim();
    rest = rest.slice(0, arrowIdx).trim();
  }

  return { title, calculation: rest, verdict };
}

export function HomeworkWorkbench({ problems }: { problems: HomeworkProblem[] }) {
  const [studyMode, setStudyMode] = useState<HomeworkStudyMode>("review");
  const [activeId, setActiveId] = useState<string>(problems[0]?.id ?? "");
  const [revealedStepsCount, setRevealedStepsCount] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});

  const handleModeChange = (mode: HomeworkStudyMode) => {
    setStudyMode(mode);
    if (mode === "step-by-step" || mode === "self-test") {
      setRevealedStepsCount({});
      setRevealedAnswers({});
    }
  };

  const revealNextStep = (id: string, maxSteps: number) => {
    setRevealedStepsCount((prev) => {
      const current = prev[id] ?? 0;
      const next = Math.min(maxSteps, current + 1);
      if (next === maxSteps) {
        setRevealedAnswers((ans) => ({ ...ans, [id]: true }));
      }
      return { ...prev, [id]: next };
    });
  };

  const revealAllForProblem = (id: string, maxSteps: number) => {
    setRevealedStepsCount((prev) => ({ ...prev, [id]: maxSteps }));
    setRevealedAnswers((prev) => ({ ...prev, [id]: true }));
  };

  const resetProblemProgress = (id: string) => {
    setRevealedStepsCount((prev) => ({ ...prev, [id]: 0 }));
    setRevealedAnswers((prev) => ({ ...prev, [id]: false }));
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completedIds).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Sticky Top Control Bar */}
      <div className="sticky top-[var(--header-h,4rem)] z-30 border-b border-rule bg-paper/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-3 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Quick Problem Navigation */}
          <nav aria-label="เลือกข้อการบ้าน" className="flex flex-wrap items-center gap-1.5">
            {problems.map((p, idx) => {
              const isCurrent = activeId === p.id;
              const isDone = Boolean(completedIds[p.id]);
              return (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  onClick={() => setActiveId(p.id)}
                  className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
                    isCurrent
                      ? "border-accent bg-accent-wash text-accent-ink font-semibold"
                      : "border-rule bg-surface text-ink-muted hover:border-rule-strong hover:text-ink"
                  }`}
                >
                  <span className="font-mono font-bold">ข้อ {idx + 1}</span>
                  <span className="text-ink-subtle">·</span>
                  <span>{p.lectures[0]}</span>
                  {isDone && <CheckCircledIcon className="size-3.5 text-good shrink-0" />}
                </a>
              );
            })}
          </nav>

          {/* Study Mode Switcher & Progress */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="group"
              aria-label="โหมดการฝึกทำโจทย์"
              className="inline-flex rounded-lg border border-rule bg-surface-hover p-1"
            >
              {STUDY_MODES.map((m) => {
                const active = studyMode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleModeChange(m.id)}
                    title={m.desc}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "bg-surface text-accent-ink font-semibold shadow-2xs"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-xs text-ink-subtle tabular-nums">
              ฝึกครบแล้ว {completedCount}/{problems.length} ข้อ
            </span>
          </div>
        </div>
      </div>

      {/* Problem List */}
      <div className="mx-auto w-full max-w-6xl space-y-10 px-5 sm:px-8">
        {problems.map((problem, index) => {
          const totalSteps = problem.solutionSteps.length;
          const visibleSteps =
            studyMode === "review"
              ? totalSteps
              : studyMode === "step-by-step"
              ? revealedStepsCount[problem.id] ?? 0
              : revealedAnswers[problem.id]
              ? totalSteps
              : 0;

          const isAnswerVisible =
            studyMode === "review" || Boolean(revealedAnswers[problem.id]);
          const isCompleted = Boolean(completedIds[problem.id]);

          return (
            <article
              key={problem.id}
              id={problem.id}
              className="scroll-mt-36 overflow-hidden rounded-2xl border border-rule bg-surface shadow-2xs"
            >
              {/* Problem Header */}
              <header className="border-b border-rule bg-surface-hover/50 px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center rounded-md bg-accent-wash px-2.5 py-1 font-mono text-xs font-bold text-accent-ink border border-accent/30">
                      HOMEWORK 0{index + 1}
                    </span>
                    <span className="font-mono text-xs font-semibold text-ink-muted">
                      {problem.lectures.join(" · ")}
                    </span>
                    <span className="text-xs text-ink-subtle">— {problem.source}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCompleted(problem.id)}
                    aria-pressed={isCompleted}
                    className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
                      isCompleted
                        ? "border-good/50 bg-good-wash text-good font-semibold"
                        : "border-rule bg-surface text-ink-muted hover:text-ink"
                    }`}
                  >
                    <CheckCircledIcon className="size-3.5" />
                    {isCompleted ? "ทำเข้าใจแล้ว" : "ทำเครื่องหมายว่าเข้าใจแล้ว"}
                  </button>
                </div>

                <h2 className="mt-3 text-base sm:text-lg font-semibold leading-relaxed text-ink">
                  {problem.statement}
                </h2>
              </header>

              {/* Main Split Body: Left (Given Data) + Right (Derivation & Verdict) */}
              <div className="grid gap-6 p-6 lg:grid-cols-12 items-start">
                {/* Left Column: Given Data Table (4 cols) */}
                <aside className="lg:col-span-4 space-y-4">
                  <div className="rounded-xl border border-rule bg-surface-hover/40 p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-ink-subtle pb-2.5 border-b border-rule">
                      สิ่งที่โจทย์กำหนด (Given Data)
                    </h3>
                    <dl className="mt-2.5 divide-y divide-rule/60 text-xs sm:text-sm">
                      {problem.given.map((item) => (
                        <div
                          key={item.label}
                          className="flex flex-col gap-0.5 py-2 first:pt-0 last:pb-0"
                        >
                          <dt className="text-xs font-medium text-ink-muted">{item.label}</dt>
                          <dd className="font-mono font-semibold text-ink tabular-nums">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Exam Trap / Transcription Note */}
                  {problem.transcriptionNote && (
                    <div className="rounded-xl border border-warn/40 bg-warn/10 p-4 text-xs leading-relaxed text-ink space-y-1.5">
                      <p className="font-bold flex items-center gap-1.5 text-warn">
                        <InfoCircledIcon className="size-4 shrink-0" />
                        <span>จุดที่ต้องระวังในห้องสอบ</span>
                      </p>
                      <p className="text-ink-muted">{problem.transcriptionNote}</p>
                    </div>
                  )}
                </aside>

                {/* Right Column: Step-by-Step Solution & Final Answer (8 cols) */}
                <div className="lg:col-span-8 space-y-5 min-w-0">
                  {/* Step Controls Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rule">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-ink-subtle">
                        ขั้นตอนการคำนวณ (Step-by-Step Derivation)
                      </h3>
                      <span className="rounded-full bg-surface-hover px-2 py-0.5 font-mono text-[11px] font-semibold text-ink-muted tabular-nums">
                        {visibleSteps}/{totalSteps} ขั้นตอน
                      </span>
                    </div>

                    {studyMode !== "review" && (
                      <div className="flex items-center gap-1.5">
                        {visibleSteps < totalSteps ? (
                          <>
                            <button
                              type="button"
                              onClick={() => revealNextStep(problem.id, totalSteps)}
                              className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1 text-xs font-semibold text-on-accent hover:opacity-90 transition-opacity"
                            >
                              เปิดขั้นถัดไป ({visibleSteps + 1}/{totalSteps})
                              <ChevronRightIcon className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => revealAllForProblem(problem.id, totalSteps)}
                              className="inline-flex items-center gap-1 rounded-lg border border-rule bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted hover:text-ink"
                            >
                              <EyeOpenIcon className="size-3.5" /> เฉลยทั้งหมด
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => resetProblemProgress(problem.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-rule bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted hover:text-ink"
                          >
                            <ResetIcon className="size-3" /> ซ่อนเพื่อฝึกซ้ำ
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Steps List */}
                  {visibleSteps > 0 ? (
                    <ol className="space-y-2.5">
                      {problem.solutionSteps.slice(0, visibleSteps).map((rawStep, stepIdx) => {
                        const { title, calculation, verdict } = parseSolutionStep(rawStep);
                        return (
                          <li
                            key={stepIdx}
                            className="rounded-xl border border-rule bg-surface-hover/30 p-3.5 transition-colors hover:bg-surface-hover/60"
                          >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                              <div className="flex items-baseline gap-2.5 min-w-0">
                                <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-rule bg-surface font-mono text-[11px] font-bold text-accent-ink tabular-nums">
                                  {stepIdx + 1}
                                </span>
                                {title && (
                                  <span className="font-sans text-xs sm:text-sm font-bold text-ink shrink-0">
                                    {title}:
                                  </span>
                                )}
                              </div>

                              {verdict && (
                                <span className="inline-flex self-start sm:self-auto shrink-0 items-center rounded-md border border-accent/30 bg-accent-wash px-2.5 py-0.5 font-mono text-xs font-bold text-accent-ink tabular-nums">
                                  → {verdict}
                                </span>
                              )}
                            </div>

                            <p className="mt-1.5 pl-7 font-mono text-xs sm:text-sm leading-relaxed text-ink-muted tabular-nums break-words">
                              {calculation}
                            </p>
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-rule-strong bg-surface-hover/20 py-10 px-4 text-center">
                      <EyeNoneIcon className="size-6 text-ink-subtle" />
                      <p className="text-sm font-semibold text-ink">
                        ซ่อนขั้นตอนวิธีทำไว้เพื่อให้คุณลองทดเลขจากข้อมูลด้านซ้าย
                      </p>
                      <div className="mt-2 flex flex-wrap justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => revealNextStep(problem.id, totalSteps)}
                          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-on-accent"
                        >
                          เปิดดูขั้นที่ 1 เพื่อตรวจแนวคิด
                        </button>
                        <button
                          type="button"
                          onClick={() => revealAllForProblem(problem.id, totalSteps)}
                          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-1.5 text-xs font-medium text-ink-muted hover:text-ink"
                        >
                          เปิดเฉลยทั้งหมดทันที
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Final Answer Banner */}
                  <div className="pt-2">
                    {isAnswerVisible ? (
                      <div className="rounded-xl border-2 border-accent/40 bg-accent-wash/60 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-accent-ink">
                            คำตอบสุทธิ (Final Verdict)
                          </span>
                          {studyMode !== "review" && (
                            <button
                              type="button"
                              onClick={() =>
                                setRevealedAnswers((prev) => ({
                                  ...prev,
                                  [problem.id]: false,
                                }))
                              }
                              className="text-[11px] font-medium text-ink-subtle hover:text-ink"
                            >
                              ซ่อนคำตอบ
                            </button>
                          )}
                        </div>
                        <p className="mt-1.5 font-mono text-sm sm:text-base font-bold text-ink tabular-nums leading-relaxed">
                          {problem.answer}
                        </p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedAnswers((prev) => ({ ...prev, [problem.id]: true }))
                        }
                        className="flex w-full items-center justify-between rounded-xl border border-dashed border-accent/50 bg-accent-wash/20 px-4 py-3.5 text-left transition-colors hover:bg-accent-wash/40"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-accent-ink">
                          คลิกเพื่อตรวจคำตอบสุทธิ (Final Verdict)
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-muted">
                          <EyeOpenIcon className="size-3.5" /> แสดงคำตอบ
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
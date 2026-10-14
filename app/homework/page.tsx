"use client";

import { useState } from "react";
import Link from "next/link";
import { homeworkProblems } from "@/content/homework";
import { Reveal } from "@/components/reveal";
import { HomeworkStepItem } from "@/components/homework-step-item";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircledIcon,
  ChevronRightIcon,
  EyeNoneIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";

type StudyMode = "review" | "step-by-step" | "self-test";

const STUDY_MODES: { id: StudyMode; label: string; hint: string }[] = [
  { id: "review", label: "อ่านทบทวน", hint: "แสดงวิธีทำและคำตอบทั้งหมด" },
  { id: "step-by-step", label: "เปิดทีละขั้น", hint: "ค่อยๆ เปิดดูวิธีคิดทีละบรรทัด" },
  { id: "self-test", label: "ซ้อมสอบจริง", hint: "ซ่อนวิธีทำและคำตอบเพื่อลองทดเลขเอง" },
];

const pad = (n: number) => String(n).padStart(2, "0");
const anchor = (id: string) => `hw-${id}`;

export default function HomeworkPage() {
  const [studyMode, setStudyMode] = useState<StudyMode>("review");
  const [revealedSteps, setRevealedSteps] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});
  /** Problem ids whose derivation the reader collapsed wholesale. */
  const [collapsedIds, setCollapsedIds] = useState<Record<string, boolean>>({});

  const totalSteps = homeworkProblems.reduce(
    (n, p) => n + p.solutionSteps.length,
    0
  );
  const lectureCount = new Set(homeworkProblems.flatMap((p) => p.lectures)).size;

  const stats = [
    { label: "โจทย์การบ้าน", value: homeworkProblems.length },
    { label: "ขั้นตอนคำนวณ", value: totalSteps },
    { label: "บทเรียนที่เกี่ยวข้อง", value: lectureCount },
  ];

  const handleModeChange = (mode: StudyMode) => {
    setStudyMode(mode);
    // Each mode restores its own default: review shows every step, the other
    // two start from nothing.
    setCollapsedIds({});
    if (mode !== "review") {
      setRevealedSteps({});
      setRevealedAnswers({});
    }
  };

  const revealNextStep = (id: string, maxSteps: number) => {
    setCollapsedIds((prev) => (prev[id] ? { ...prev, [id]: false } : prev));
    setRevealedSteps((prev) => {
      const current = prev[id] ?? 0;
      const next = Math.min(maxSteps, current + 1);
      if (next === maxSteps) {
        setRevealedAnswers((ans) => ({ ...ans, [id]: true }));
      }
      return { ...prev, [id]: next };
    });
  };

  const revealAllForProblem = (id: string, maxSteps: number) => {
    setCollapsedIds((prev) => (prev[id] ? { ...prev, [id]: false } : prev));
    setRevealedSteps((prev) => ({ ...prev, [id]: maxSteps }));
    setRevealedAnswers((prev) => ({ ...prev, [id]: true }));
  };

  const collapseProblemSteps = (id: string) => {
    setCollapsedIds((prev) => ({ ...prev, [id]: true }));
    setRevealedSteps((prev) => ({ ...prev, [id]: 0 }));
    setRevealedAnswers((prev) => ({ ...prev, [id]: false }));
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main id="main" tabIndex={-1} className="flex-1">
      {/* ───────────── Hero ───────────── */}
      <section className="border-b border-rule">
        <div className="shell pt-12 pb-10 sm:pt-16 sm:pb-12">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <p className="eyebrow">Homework &middot; เฉลยจากสไลด์บรรยาย</p>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight text-balance">
                  เฉลยการบ้าน{" "}
                  <span className="text-accent-ink">
                    {homeworkProblems.length} ข้อหลักฉบับทางการ
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                  ถอดวิธีทำและตัวเลขคำตอบตรงจากสไลด์อาจารย์ ครอบคลุมทั้ง Confusion
                  Matrix, การเลือก Classifier Model และ K-Means Clustering (Manhattan
                  &amp; Euclidean)
                </p>
              </div>

              <dl className="grid grid-cols-3 gap-px border border-rule bg-rule shrink-0 sm:min-w-[340px]">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col-reverse bg-surface px-4 py-3 sm:px-5 sm:py-3.5"
                  >
                    <dt className="mt-1 text-xs font-semibold text-ink-subtle">
                      {s.label}
                    </dt>
                    <dd className="index text-2xl sm:text-3xl text-ink tabular-nums">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Sticky Study Toolbar & Quick Jump ───────────── */}
      <div className="sticky top-[var(--header-h,4rem)] z-30 border-b border-rule bg-paper/95 backdrop-blur">
        <div className="shell flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="เลือกโจทย์ด่วน" className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-medium text-ink-subtle">ข้ามไปข้อ:</span>
            {homeworkProblems.map((p, i) => {
              const isDone = Boolean(completedIds[p.id]);
              return (
                <a
                  key={p.id}
                  href={`#${anchor(p.id)}`}
                  className="inline-flex min-h-8 items-center gap-1.5 rounded-md border border-rule bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink"
                >
                  <span className="font-mono font-bold text-ink">{pad(i + 1)}</span>
                  <span className="hidden md:inline text-ink-subtle">
                    ({p.lectures[0]})
                  </span>
                  {isDone && (
                    <CheckCircledIcon className="size-3.5 text-good shrink-0" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-ink-subtle">โหมดการเรียน:</span>
            <div
              role="group"
              aria-label="โหมดการฝึกทำโจทย์"
              className="inline-flex rounded-lg border border-rule bg-surface-hover p-0.5"
            >
              {STUDY_MODES.map((m) => {
                const active = studyMode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleModeChange(m.id)}
                    title={m.hint}
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
          </div>
        </div>
      </div>

      {/* ───────────── Problem Index Cards ───────────── */}
      <nav aria-label="สารบัญโจทย์" className="border-b border-rule">
        <div className="shell py-8">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {homeworkProblems.map((p, i) => (
              <li key={p.id}>
                <a
                  href={`#${anchor(p.id)}`}
                  className="group flex h-full flex-col justify-between border border-rule bg-surface p-4 transition-colors hover:border-ink"
                >
                  <div>
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="index text-2xl text-ink-subtle transition-colors group-hover:text-accent-ink tabular-nums">
                        {pad(i + 1)}
                      </span>
                      <span className="font-mono text-[11px] text-ink-subtle">
                        {p.lectures.join(", ")}
                      </span>
                    </span>
                    <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                      {p.statement}
                    </span>
                  </div>
                  <span className="mt-3 pt-2 border-t border-rule/60 flex items-center justify-between text-[11px] text-ink-subtle">
                    <span>
                      <span className="font-mono tabular-nums">
                        {p.solutionSteps.length}
                      </span>{" "}
                      ขั้นตอน
                    </span>
                    <span className="group-hover:text-accent-ink">ดูวิธีทำ &rarr;</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* ───────────── Problems ───────────── */}
      <div className="shell space-y-12 py-12 sm:space-y-16 sm:py-16">
        {homeworkProblems.map((p, i) => {
          const no = pad(i + 1);
          const headingId = `${anchor(p.id)}-title`;
          const stepsRegionId = `${anchor(p.id)}-steps`;
          const maxSteps = p.solutionSteps.length;

          const prevProblem = i > 0 ? homeworkProblems[i - 1] : null;
          const nextProblem =
            i < homeworkProblems.length - 1 ? homeworkProblems[i + 1] : null;

          const modeStepsCount =
            studyMode === "review"
              ? maxSteps
              : studyMode === "step-by-step"
              ? revealedSteps[p.id] ?? 0
              : revealedAnswers[p.id]
              ? maxSteps
              : 0;
          // "ย่อทั้งหมด" hides the derivation even in review mode, where every
          // step is otherwise shown unconditionally.
          const visibleStepsCount = collapsedIds[p.id] ? 0 : modeStepsCount;
          const allStepsVisible = visibleStepsCount >= maxSteps;

          const isAnswerVisible =
            studyMode === "review" || Boolean(revealedAnswers[p.id]);
          const isCompleted = Boolean(completedIds[p.id]);

          return (
            <article
              key={p.id}
              id={anchor(p.id)}
              aria-labelledby={headingId}
              className="scroll-mt-32"
            >
              <Reveal>
                <div className="bento-card p-6 sm:p-8 lg:p-10">
                  {/* Header */}
                  <header className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-6">
                    <div className="flex items-center gap-4 sm:gap-5">
                      <span
                        aria-hidden="true"
                        className="index text-4xl sm:text-5xl leading-none text-ink-subtle tabular-nums"
                      >
                        {no}
                      </span>
                      <div>
                        <p className="eyebrow eyebrow-accent">
                          {p.lectures.join(" · ")}
                        </p>
                        <h2
                          id={headingId}
                          className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-ink"
                        >
                          Homework ข้อที่ {i + 1}
                        </h2>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bento-pill border border-rule text-ink-subtle">
                        {p.source}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleCompleted(p.id)}
                        aria-pressed={isCompleted}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                          isCompleted
                            ? "border-good/50 bg-good-wash text-good font-semibold"
                            : "border-rule bg-surface text-ink-muted hover:text-ink"
                        }`}
                      >
                        <CheckCircledIcon className="size-3.5" />
                        {isCompleted ? "ทบทวนแล้ว" : "ทำเครื่องหมายว่าเข้าใจแล้ว"}
                      </button>
                    </div>
                  </header>

                  {/* Problem statement */}
                  <section
                    aria-label="โจทย์"
                    className="relative mb-8 bg-surface-hover p-5 pl-6 sm:p-6 sm:pl-7"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1 bg-accent"
                    />
                    <p className="eyebrow eyebrow-accent mb-2">โจทย์</p>
                    <p className="max-w-3xl text-base sm:text-lg font-medium leading-relaxed text-ink">
                      {p.statement}
                    </p>
                  </section>

                  {/* Given (sticky on desktop) + Solution */}
                  <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                    {/* Left: given data + note */}
                    <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
                      <div className="border border-rule bg-surface">
                        <div className="flex items-center justify-between border-b border-rule px-5 py-3">
                          <h3 className="eyebrow">ข้อมูลที่โจทย์กำหนด</h3>
                          <span className="text-xs text-ink-subtle tabular-nums">
                            {p.given.length} รายการ
                          </span>
                        </div>

                        <dl className="divide-y divide-rule/60">
                          {p.given.map((g, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col gap-1 px-5 py-3 text-xs sm:text-sm"
                            >
                              <dt className="font-medium text-ink-muted">
                                {g.label}
                              </dt>
                              <dd className="break-words font-semibold text-ink tabular-nums">
                                {g.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      {p.transcriptionNote && (
                        <aside className="exam-pitfall-card">
                          <p className="eyebrow eyebrow-amber mb-2">
                            จุดระวังข้อสอบ &amp; หมายเหตุสไลด์
                          </p>
                          <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                            {p.transcriptionNote}
                          </p>
                        </aside>
                      )}
                    </div>

                    {/* Right: steps + answer */}
                    <div className="min-w-0 lg:col-span-7">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="eyebrow eyebrow-accent">
                            วิธีทำและขั้นตอนคำนวณ
                          </h3>
                          <span className="text-xs text-ink-subtle tabular-nums">
                            ({visibleStepsCount}/{maxSteps} ขั้นตอน)
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {studyMode !== "review" &&
                            visibleStepsCount > 0 &&
                            visibleStepsCount < maxSteps && (
                              <button
                                type="button"
                                onClick={() => revealNextStep(p.id, maxSteps)}
                                className="touch-target inline-flex items-center gap-1 rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-on-accent tabular-nums transition-opacity hover:opacity-90"
                              >
                                เปิดขั้นที่ {visibleStepsCount + 1}
                                <ChevronRightIcon className="size-3.5" />
                              </button>
                            )}
                          <button
                            type="button"
                            onClick={() =>
                              allStepsVisible
                                ? collapseProblemSteps(p.id)
                                : revealAllForProblem(p.id, maxSteps)
                            }
                            aria-expanded={allStepsVisible}
                            aria-controls={stepsRegionId}
                            className="touch-target inline-flex items-center gap-1 rounded-md border border-rule bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink"
                          >
                            {allStepsVisible ? (
                              <>
                                <EyeNoneIcon className="size-3.5" /> ย่อทั้งหมด
                              </>
                            ) : (
                              <>
                                <EyeOpenIcon className="size-3.5" /> แสดงวิธีทำทั้งหมด
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div id={stepsRegionId}>
                        {visibleStepsCount > 0 ? (
                          <ol className="border-t border-rule">
                            {p.solutionSteps
                              .slice(0, visibleStepsCount)
                              .map((s, k) => (
                                <HomeworkStepItem key={k} text={s} index={k} />
                              ))}
                          </ol>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-rule-strong bg-surface-hover/30 px-4 py-10 text-center">
                            <EyeNoneIcon className="size-5 text-ink-subtle" />
                            <p className="text-sm font-semibold text-ink">
                              ซ่อนขั้นตอนการคำนวณไว้เพื่อให้ลองทดเลขจากข้อมูลด้านซ้าย
                            </p>
                            <button
                              type="button"
                              onClick={() => revealNextStep(p.id, maxSteps)}
                              className="touch-target mt-2 inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-on-accent"
                            >
                              เปิดดูขั้นที่ 1
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Final answer */}
                      <div className="mt-8">
                        {isAnswerVisible ? (
                          <div className="relative border border-rule bg-surface p-5 pl-6">
                            <span
                              aria-hidden="true"
                              className="absolute inset-y-0 left-0 w-1 bg-mint"
                            />
                            <div className="mb-1.5 flex items-center justify-between">
                              <p className="eyebrow eyebrow-mint">คำตอบสุดท้าย</p>
                              {studyMode !== "review" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setRevealedAnswers((prev) => ({
                                      ...prev,
                                      [p.id]: false,
                                    }))
                                  }
                                  className="text-xs text-ink-subtle hover:text-ink"
                                >
                                  ซ่อนคำตอบ
                                </button>
                              )}
                            </div>
                            <p className="text-sm sm:text-base font-bold leading-relaxed text-ink tabular-nums">
                              {p.answer}
                            </p>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setRevealedAnswers((prev) => ({
                                ...prev,
                                [p.id]: true,
                              }))
                            }
                            className="flex w-full items-center justify-between border border-dashed border-rule-strong bg-surface px-5 py-4 text-left transition-colors hover:border-ink"
                          >
                            <div>
                              <p className="eyebrow eyebrow-mint">คำตอบสุดท้าย</p>
                              <p className="mt-1 text-xs sm:text-sm font-medium text-ink-muted">
                                คลิกเพื่อเปิดดูเฉพาะคำตอบสุทธิสำหรับตรวจกับกระดาษทด
                              </p>
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink">
                              <EyeOpenIcon className="size-3.5" /> ดูคำตอบ
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Prev / next along the real problem order */}
                  <nav
                    aria-label={`นำทางโจทย์ ข้อที่ ${i + 1} จาก ${homeworkProblems.length}`}
                    className="mt-8 flex flex-wrap items-stretch gap-3 border-t border-rule pt-6"
                  >
                    {prevProblem && (
                      <a
                        href={`#${anchor(prevProblem.id)}`}
                        className="group touch-target mr-auto inline-flex items-center gap-2.5 rounded-lg border border-rule bg-surface px-3 py-2 transition-colors hover:border-ink"
                      >
                        <ArrowLeftIcon className="size-4 shrink-0 text-ink-subtle transition-colors group-hover:text-accent-ink" />
                        <span className="flex flex-col">
                          <span className="text-[11px] font-medium text-ink-subtle">
                            ข้อก่อนหน้า
                          </span>
                          <span className="text-xs font-semibold text-ink sm:text-sm">
                            ข้อที่ {pad(i)} · {prevProblem.lectures.join(" · ")}
                          </span>
                        </span>
                      </a>
                    )}
                    {nextProblem && (
                      <a
                        href={`#${anchor(nextProblem.id)}`}
                        className="group touch-target ml-auto inline-flex items-center gap-2.5 rounded-lg border border-rule bg-surface px-3 py-2 text-right transition-colors hover:border-ink"
                      >
                        <span className="flex flex-col">
                          <span className="text-[11px] font-medium text-ink-subtle">
                            ข้อถัดไป
                          </span>
                          <span className="text-xs font-semibold text-ink sm:text-sm">
                            ข้อที่ {pad(i + 2)} · {nextProblem.lectures.join(" · ")}
                          </span>
                        </span>
                        <ArrowRightIcon className="size-4 shrink-0 text-ink-subtle transition-colors group-hover:text-accent-ink" />
                      </a>
                    )}
                  </nav>
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>

      {/* ───────────── Footer ───────────── */}
      <footer className="border-t border-rule">
        <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-subtle">
            {homeworkProblems.length} โจทย์ &middot; {totalSteps} ขั้นตอน &mdash;
            ถอดจากสไลด์บรรยาย ไม่มีการคำนวณใหม่
          </p>
          <nav
            aria-label="ลิงก์ท้ายหน้า"
            className="flex flex-wrap gap-x-5 gap-y-2 text-xs"
          >
            <Link
              href="/tools"
              className="font-semibold text-ink hover:text-accent-ink"
            >
              ลองคำนวณเองในเครื่องคิดเลข
            </Link>
            <Link
              href="/mock-test"
              className="font-semibold text-ink hover:text-accent-ink"
            >
              ทำข้อสอบจำลอง
            </Link>
            <a href="#main" className="text-ink-subtle hover:text-ink">
              กลับขึ้นด้านบน &uarr;
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
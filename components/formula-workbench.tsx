"use client";

import { useEffect, useId, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  CheckCircledIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeIcon,
  ExclamationTriangleIcon,
  ResetIcon,
} from "@radix-ui/react-icons";

export interface FormulaWorkbenchProps {
  initialActive?: number;
  initialInactive?: number;
  className?: string;
  onStepChange?: (step: number) => void;
}

type CustomerClass = "Active" | "Inactive";
type SubstitutionPhase = 0 | 1 | 2;

const STAGES = [
  { id: "Predict", label: "คาดการณ์" },
  { id: "Formula", label: "โครงสร้างสูตร" },
  { id: "Anatomy", label: "ความหมายตัวแปร" },
  { id: "Substitute", label: "แทนค่าตัวเลข" },
  { id: "Reduce", label: "คำนวณผลลัพธ์" },
  { id: "Playground", label: "ทดลองปรับค่า" },
] as const;

const ROOT_GINI = 0.5;
const LECTURE_CHILD_GINI = 1 - (5 / 6) ** 2 - (1 / 6) ** 2;
const LECTURE_SPLIT_GINI = (6 / 12) * LECTURE_CHILD_GINI + (6 / 12) * LECTURE_CHILD_GINI;

const PREDICTIONS = [
  {
    value: ROOT_GINI,
    shortLabel: "(A) 0.500",
    label: "(A) 0.500 — ปนกันครึ่งต่อครึ่ง (สัดส่วนเท่ากัน)",
  },
  {
    value: LECTURE_CHILD_GINI,
    shortLabel: "(B) ~0.278",
    label: "(B) ~0.278 — ค่อนข้างบริสุทธิ์ (มีกลุ่มหลักชัดเจน)",
  },
  {
    value: 0,
    shortLabel: "(C) 0.000",
    label: "(C) 0.000 — บริสุทธิ์สมบูรณ์ (มีคลาสเดียวล้วน)",
  },
] as const;

const SUBSTITUTION_PHASES: { phase: SubstitutionPhase; label: string }[] = [
  { phase: 0, label: "1. สัญลักษณ์" },
  { phase: 1, label: "2. เศษส่วน" },
  { phase: 2, label: "3. ทศนิยม" },
];

const CONTROL_BTN =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-rule-strong bg-surface px-4 py-2 text-xs sm:text-sm font-medium text-ink shadow-xs transition-colors hover:border-accent hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40";

function ProbabilitySymbol({ kind }: { kind: CustomerClass }) {
  return (
    <span className="whitespace-nowrap font-serif italic">
      p<sub className="ml-0.5 font-sans text-[0.7em] not-italic font-semibold">{kind}</sub>
    </span>
  );
}

function Fraction({ numerator, denominator }: { numerator: number; denominator: number }) {
  return (
    <span
      aria-label={`${numerator} ส่วน ${denominator}`}
      className="inline-flex flex-col items-center align-middle font-mono text-[0.85em] leading-tight tabular-nums"
    >
      <span aria-hidden="true" className="min-w-6 border-b border-current px-1 text-center">
        {numerator}
      </span>
      <span aria-hidden="true" className="px-1">
        {denominator}
      </span>
    </span>
  );
}

function SubstitutionToken({
  kind,
  count,
  total,
  phase,
  reducedMotion,
}: {
  kind: CustomerClass;
  count: number;
  total: number;
  phase: SubstitutionPhase;
  reducedMotion: boolean;
}) {
  const colorVar = kind === "Active" ? "var(--color-good)" : "var(--color-bad)";

  return (
    <span
      className="relative inline-grid min-h-14 min-w-24 place-items-center rounded-xl border border-current/40 bg-surface px-3 py-1.5 shadow-xs"
      style={{ color: colorVar }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1 right-1.5 font-sans text-[10px] font-bold uppercase opacity-45"
      >
        {kind === "Active" ? "pA" : "pI"}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={phase}
          className="relative font-mono font-bold tabular-nums"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -5 }}
          transition={{ duration: reducedMotion ? 0 : 0.16 }}
        >
          {phase === 0 ? (
            <ProbabilitySymbol kind={kind} />
          ) : phase === 1 ? (
            <Fraction numerator={count} denominator={total} />
          ) : (
            (total > 0 ? count / total : 0).toFixed(3)
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function buildPredictionExplanation(active: number, inactive: number, gini: number): string {
  const total = active + inactive;
  if (total === 0 || active === 0 || inactive === 0) {
    return `เพราะสมาชิกทั้ง ${total} คนในโหนดนี้อยู่ในคลาสเดียวกันทั้งหมด ไม่มีการปนเปื้อนจากอีกคลาสเลย จึงได้ค่า Gini = 0.000`;
  }
  if (active === inactive) {
    return `เพราะโหนดนี้มีกลุ่ม Active ${active} คน และ Inactive ${inactive} คน เท่ากันพอดี (50% : 50%) ข้อมูลจึงปนกันสูงสุด ทำให้ได้ค่า Gini = 0.500`;
  }
  const majorKind = active > inactive ? "Active" : "Inactive";
  const majorCount = Math.max(active, inactive);
  const minorCount = Math.min(active, inactive);
  return `เพราะสมาชิกส่วนใหญ่ (${majorCount} จาก ${total} คน) เป็นกลุ่ม ${majorKind} โดยมีอีกกลุ่มปนอยู่เพียง ${minorCount} คน ความปนเปื้อนจึงลดลงมาอยู่ที่ Gini = ${gini.toFixed(3)}`;
}

export function GiniWorkbench({
  initialActive = 5,
  initialInactive = 1,
  className = "",
  onStepChange,
}: FormulaWorkbenchProps) {
  const id = useId();
  const reducedMotion = Boolean(useReducedMotion());

  const [step, setStep] = useState(0);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [view, setView] = useState<"math" | "python">("math");
  const [selectedKind, setSelectedKind] = useState<CustomerClass | null>(null);
  const [substitutionPhase, setSubstitutionPhase] = useState<SubstitutionPhase>(0);
  const [sandboxActive, setSandboxActive] = useState(
    Math.min(6, Math.max(0, initialActive))
  );

  const active = step === 5 ? sandboxActive : initialActive;
  const inactive = step === 5 ? 6 - sandboxActive : initialInactive;
  const total = active + inactive;

  const activeProb = total > 0 ? active / total : 0;
  const inactiveProb = total > 0 ? inactive / total : 0;
  const squaredActive = activeProb ** 2;
  const squaredInactive = inactiveProb ** 2;
  const gini = total > 0 ? 1 - squaredActive - squaredInactive : 0;
  const informationGain = ROOT_GINI - gini;

  const isRootDistribution = step !== 5 && active === 6 && inactive === 6;
  const nodeTitle =
    step === 5
      ? "โหนดทดลอง (Sandbox Node)"
      : isRootDistribution
      ? "โหนดตั้งต้น (Root Node)"
      : "โหนดย่อยที่พิจารณา (Candidate Node)";

  const correctPredictionIndex = PREDICTIONS.reduce(
    (best, choice, index) =>
      Math.abs(choice.value - gini) < Math.abs(PREDICTIONS[best].value - gini) ? index : best,
    0
  );

  const showGiniValue = step > 0 || prediction !== null;
  const transition = { duration: reducedMotion ? 0 : 0.18 };

  useEffect(() => {
    if (step !== 3) return;
    if (reducedMotion) {
      setSubstitutionPhase(2);
      return;
    }
    const t1 = window.setTimeout(() => setSubstitutionPhase(1), 500);
    const t2 = window.setTimeout(() => setSubstitutionPhase(2), 1300);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [step, reducedMotion]);

  function goTo(next: number) {
    const nextStep = Math.max(0, Math.min(STAGES.length - 1, next));
    if (nextStep === step) return;
    setSelectedKind(null);
    if (nextStep === 3) setSubstitutionPhase(0);
    setStep(nextStep);
    onStepChange?.(nextStep);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target as HTMLElement;
    if (target.closest("input, textarea, select, [contenteditable='true'], [role='slider']")) {
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      goTo(step + (event.key === "ArrowRight" ? 1 : -1));
    }
  }

  return (
    <section
      aria-labelledby={`${id}-title`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`overflow-hidden rounded-2xl border border-rule bg-surface text-ink shadow-xs [--accent:var(--color-accent)] [--mint:var(--color-good)] [--rose:var(--color-bad)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      {/* Top Header & Stage Bar */}
      <header className="border-b border-rule bg-surface-hover/50 p-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-ink">
              Lect 07 · Decision Tree Impurity
            </p>
            <h2 id={`${id}-title`} className="mt-0.5 text-lg sm:text-xl font-bold">
              Gini &amp; Gain Workbench
            </h2>
          </div>
          <span className="rounded-lg border border-rule bg-surface px-3 py-1 font-mono text-xs font-semibold tabular-nums text-ink-muted">
            Stage {step + 1} / {STAGES.length} · {STAGES[step].label}
          </span>
        </div>

        <nav
          aria-label="Workbench stages"
          className="mt-4 grid grid-cols-3 gap-1.5 sm:grid-cols-6"
        >
          {STAGES.map((stage, index) => {
            const isCurrent = step === index;
            return (
              <button
                key={stage.id}
                type="button"
                aria-current={isCurrent ? "step" : undefined}
                onClick={() => goTo(index)}
                className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isCurrent
                    ? "border-accent/50 bg-accent-wash text-accent-ink font-semibold shadow-2xs"
                    : "border-transparent bg-surface/60 text-ink-muted hover:bg-surface hover:text-ink"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">
                  {index + 1}. {stage.id}
                </span>
                <span className="truncate max-w-full">{stage.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Split */}
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-12 items-start">
        {/* Left Aside: Customer Distribution Card (5 cols) */}
        <aside className="lg:col-span-5 min-w-0 space-y-3" aria-label="Customer distribution">
          <div className="rounded-xl border border-rule bg-surface-hover p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {nodeTitle}
              </p>
              <span className="rounded-md bg-surface px-2 py-0.5 font-mono text-xs font-semibold tabular-nums text-ink-muted border border-rule">
                N = {total}
              </span>
            </div>

            <p className="mt-2 text-lg font-bold tabular-nums">
              <span className="text-good">{active} Active</span>
              <span className="mx-1.5 text-ink-subtle">/</span>
              <span className="text-bad">{inactive} Inactive</span>
            </p>

            {/* 6-Column Aligned Customer Grid */}
            <div
              role="img"
              aria-label={`${active} Active customers and ${inactive} Inactive customers`}
              className="mt-4 grid grid-cols-6 gap-2.5 max-w-[280px]"
            >
              {Array.from({ length: total }, (_, index) => {
                const kind: CustomerClass = index < active ? "Active" : "Inactive";
                const isDimmed = step === 2 && selectedKind !== null && selectedKind !== kind;
                const isHighlighted = step === 2 && selectedKind === kind;

                return (
                  <motion.span
                    key={index}
                    aria-hidden="true"
                    data-customer={kind}
                    animate={{
                      opacity: isDimmed ? 0.25 : 1,
                      scale: !reducedMotion && isHighlighted ? 1.08 : 1,
                    }}
                    transition={transition}
                    className={`grid size-9 place-items-center rounded-full border-2 font-mono text-xs font-bold shadow-2xs ${
                      kind === "Active"
                        ? "border-good bg-good-wash text-good"
                        : "border-bad bg-bad-wash text-bad"
                    }`}
                  >
                    {kind === "Active" ? "A" : "I"}
                  </motion.span>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5 text-good">
                <span className="size-2 rounded-full bg-good" /> A · Active ({(activeProb * 100).toFixed(0)}%)
              </span>
              <span className="inline-flex items-center gap-1.5 text-bad">
                <span className="size-2 rounded-full bg-bad" /> I · Inactive ({(inactiveProb * 100).toFixed(0)}%)
              </span>
            </div>

            {/* Impurity Meter (Hidden until predicted in Step 0 so it doesn't spoil the quiz) */}
            <div className="mt-4 border-t border-rule pt-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-ink-muted">ระดับความปนเปื้อน (Gini):</span>
                <span className="font-mono font-bold tabular-nums text-ink">
                  {showGiniValue ? gini.toFixed(3) : "? (เลือกคำตอบด้านขวา)"}
                </span>
              </div>
              <div
                role="meter"
                aria-label="Node impurity"
                aria-valuemin={0}
                aria-valuemax={0.5}
                aria-valuenow={gini}
                className="relative h-2 overflow-hidden rounded-full bg-rule-strong/40"
              >
                <motion.div
                  animate={{ width: showGiniValue ? `${(gini / ROOT_GINI) * 100}%` : "0%" }}
                  transition={transition}
                  className="h-full rounded-full bg-accent"
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-ink-subtle tabular-nums">
                <span>0.000 (บริสุทธิ์)</span>
                <span>0.500 (ปนกันสูงสุด)</span>
              </div>
            </div>
          </div>

          {/* Show Root Reference ONLY when current node is not already the 6/6 Root */}
          {!isRootDistribution && (
            <div className="rounded-xl border border-rule bg-surface-hover/40 px-3.5 py-2.5 text-xs text-ink-muted flex items-center justify-between">
              <span>โหนดตั้งต้นอ้างอิง (Root: 6A / 6I)</span>
              <span className="font-mono font-semibold text-ink tabular-nums">Gini = 0.500</span>
            </div>
          )}
        </aside>

        {/* Right Panel: Interactive Stage Workspace (7 cols) */}
        <div className="lg:col-span-7 min-w-0" id={`${id}-panel`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
              transition={transition}
              className="space-y-4 rounded-xl border border-rule bg-surface p-4 sm:p-5"
            >
              {/* STAGE 0: PREDICT */}
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-ink">
                      1. ประเมินความบริสุทธิ์ด้วยสายตาก่อนคำนวณ
                    </h3>
                    <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                      จากแผนภาพด้านซ้าย โหนดที่มีลูกค้า{" "}
                      <strong className="text-ink tabular-nums">
                        {active} Active และ {inactive} Inactive
                      </strong>{" "}
                      ควรมีค่า Gini Impurity อยู่ที่ประมาณเท่าใด?
                    </p>
                  </div>

                  <div className="grid gap-2.5" role="group" aria-label="Predict the Gini value">
                    {PREDICTIONS.map((choice, index) => {
                      const isSelected = prediction === index;
                      const isCorrectChoice = index === correctPredictionIndex;
                      const showAsCorrectHint = prediction !== null && !isSelected && isCorrectChoice;

                      return (
                        <button
                          key={choice.label}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setPrediction(index)}
                          className={`flex min-h-11 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                            isSelected
                              ? isCorrectChoice
                                ? "border-good bg-good-wash/50 text-ink font-semibold"
                                : "border-warn bg-warn/10 text-ink font-semibold"
                              : showAsCorrectHint
                              ? "border-dashed border-good/60 bg-good-wash/20 text-ink"
                              : "border-rule bg-surface-hover/40 text-ink hover:border-accent"
                          }`}
                        >
                          <span>{choice.label}</span>
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 text-xs shrink-0">
                              {isCorrectChoice ? (
                                <span className="inline-flex items-center gap-1 text-good font-bold">
                                  <CheckCircledIcon className="size-4" /> ถูกต้อง
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-warn font-bold">
                                  <ExclamationTriangleIcon className="size-4" /> ไม่ตรง
                                </span>
                              )}
                            </span>
                          )}
                          {showAsCorrectHint && (
                            <span className="text-xs font-mono font-semibold text-good shrink-0">
                              คำตอบที่ถูก
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {prediction !== null && (
                    <div
                      role="status"
                      className={`rounded-xl border p-4 text-sm leading-relaxed space-y-1.5 ${
                        prediction === correctPredictionIndex
                          ? "border-good/40 bg-good-wash/30 text-ink"
                          : "border-warn/40 bg-warn/10 text-ink"
                      }`}
                    >
                      <p className="font-bold flex items-center gap-1.5">
                        {prediction === correctPredictionIndex ? (
                          <>
                            <CheckCircledIcon className="size-4 text-good shrink-0" />
                            <span>ถูกต้อง! ค่าที่คำนวณได้จริงคือ Gini = {gini.toFixed(3)}</span>
                          </>
                        ) : (
                          <>
                            <ExclamationTriangleIcon className="size-4 text-warn shrink-0" />
                            <span>
                              ยังไม่ตรงกับสัดส่วนของโหนดนี้ — คำตอบที่ตรงที่สุดคือ{" "}
                              {PREDICTIONS[correctPredictionIndex].shortLabel} (Gini ={" "}
                              {gini.toFixed(3)})
                            </span>
                          </>
                        )}
                      </p>
                      <p className="text-xs sm:text-sm text-ink-muted">
                        {buildPredictionExplanation(active, inactive, gini)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* STAGE 1: FORMULA */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-ink">
                      2. โครงสร้างสูตรคณิตศาสตร์ และโค้ด Python
                    </h3>
                    <div
                      role="group"
                      aria-label="Formula display"
                      className="inline-flex rounded-lg border border-rule bg-surface-hover p-1 text-xs"
                    >
                      <button
                        type="button"
                        aria-pressed={view === "math"}
                        onClick={() => setView("math")}
                        className={`rounded-md px-3 py-1 font-medium transition-colors ${
                          view === "math"
                            ? "bg-surface text-accent font-semibold shadow-2xs"
                            : "text-ink-muted hover:text-ink"
                        }`}
                      >
                        Math
                      </button>
                      <button
                        type="button"
                        aria-pressed={view === "python"}
                        onClick={() => setView("python")}
                        className={`inline-flex items-center gap-1 rounded-md px-3 py-1 font-medium transition-colors ${
                          view === "python"
                            ? "bg-surface text-accent font-semibold shadow-2xs"
                            : "text-ink-muted hover:text-ink"
                        }`}
                      >
                        <CodeIcon className="size-3.5" /> NumPy
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-rule bg-surface-hover p-5">
                    {view === "math" ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
                          Gini = 1 − <span className="text-accent">∑</span>{" "}
                          <span className="font-serif italic">
                            p<sub>i</sub>
                            <sup>2</sup>
                          </span>
                        </div>
                        <div className="text-sm font-mono text-ink-muted">
                          = 1 − [ (p<sub>Active</sub>)² + (p<sub>Inactive</sub>)² ]
                        </div>
                      </div>
                    ) : (
                      <pre className="font-mono text-xs sm:text-sm leading-relaxed text-ink">
                        <code>
                          <span className="text-ink-subtle">
                            # probs = [active / total, inactive / total]
                          </span>
                          {"\n"}1.0 - np.sum(np.square(probs))
                        </code>
                      </pre>
                    )}
                  </div>

                  <div className="rounded-xl border border-rule bg-surface-hover/40 p-3.5 text-xs sm:text-sm space-y-1 text-ink-muted">
                    <p className="font-semibold text-ink">หลักการจำสูตร:</p>
                    <p className="leading-relaxed">
                      นำสัดส่วนของแต่ละคลาส (<ProbabilitySymbol kind="Active" /> และ{" "}
                      <ProbabilitySymbol kind="Inactive" />) มายกกำลังสองแล้วบวกกัน จากนั้นนำไปหักออกจาก 1
                      ยิ่งข้อมูลกระจุกอยู่คลาสเดียว ค่ากำลังสองจะเข้าใกล้ 1 ทำให้ค่า Gini เข้าใกล้ 0
                    </p>
                  </div>
                </div>
              )}

              {/* STAGE 2: ANATOMY */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-ink">
                      3. ชำแหละสัดส่วนความน่าจะเป็นของแต่ละคลาส
                    </h3>
                    <p className="mt-1 text-sm text-ink-muted">
                      คลิกเลือกคลาสเพื่อไฮไลต์จุดข้อมูลในแผนภาพฝั่งซ้ายและดูที่มาของค่าสัดส่วน
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(["Active", "Inactive"] as const).map((kind) => {
                      const isSelected = selectedKind === kind;
                      const count = kind === "Active" ? active : inactive;
                      const prob = kind === "Active" ? activeProb : inactiveProb;
                      return (
                        <button
                          key={kind}
                          type="button"
                          aria-label={`Spotlight p ${kind}`}
                          aria-pressed={isSelected}
                          onClick={() => setSelectedKind(isSelected ? null : kind)}
                          className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                            isSelected
                              ? kind === "Active"
                                ? "border-good bg-good-wash/40 shadow-xs"
                                : "border-bad bg-bad-wash/40 shadow-xs"
                              : "border-rule bg-surface-hover/40 hover:border-rule-strong"
                          }`}
                        >
                          <div className="flex w-full items-center justify-between">
                            <span
                              className={`text-lg font-bold ${
                                kind === "Active" ? "text-good" : "text-bad"
                              }`}
                            >
                              <ProbabilitySymbol kind={kind} />
                            </span>
                            <span className="text-[11px] font-medium text-ink-subtle">
                              {isSelected ? "กำลังไฮไลต์" : "คลิกเพื่อไฮไลต์"}
                            </span>
                          </div>
                          <span className="mt-1 text-xs text-ink-muted">
                            สัดส่วนลูกค้ากลุ่ม {kind}
                          </span>
                          <div className="mt-3 flex items-baseline gap-2 font-mono text-base font-bold text-ink tabular-nums">
                            <Fraction numerator={count} denominator={total} />
                            <span>≈ {prob.toFixed(3)}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="rounded-xl border border-rule bg-surface-hover p-3.5 text-xs sm:text-sm text-ink-muted tabular-nums">
                    <strong>ตรวจสอบความถูกต้อง:</strong> ผลรวมความน่าจะเป็นทุกคลาสต้องเท่ากับ 1 เสมอ (
                    <span className="font-mono text-ink">
                      {active}/{total} + {inactive}/{total} = 1.000
                    </span>
                    )
                  </div>
                </div>
              )}

              {/* STAGE 3: SUBSTITUTE */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-ink">4. แทนค่าสัดส่วนลงในสมการ</h3>
                    <div className="flex flex-wrap gap-1 rounded-lg border border-rule bg-surface-hover p-1">
                      {SUBSTITUTION_PHASES.map((item) => (
                        <button
                          key={item.phase}
                          type="button"
                          onClick={() => setSubstitutionPhase(item.phase)}
                          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                            substitutionPhase === item.phase
                              ? "bg-surface text-accent font-semibold shadow-2xs"
                              : "text-ink-muted hover:text-ink"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    aria-label="Substitution into the Gini formula"
                    className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-rule bg-surface-hover p-6 text-xl sm:text-2xl font-medium"
                  >
                    <span>1 − [</span>
                    <span className="inline-flex items-start">
                      <SubstitutionToken
                        kind="Active"
                        count={active}
                        total={total}
                        phase={substitutionPhase}
                        reducedMotion={reducedMotion}
                      />
                      <sup className="ml-0.5 text-sm font-bold text-ink-muted">2</sup>
                    </span>
                    <span>+</span>
                    <span className="inline-flex items-start">
                      <SubstitutionToken
                        kind="Inactive"
                        count={inactive}
                        total={total}
                        phase={substitutionPhase}
                        reducedMotion={reducedMotion}
                      />
                      <sup className="ml-0.5 text-sm font-bold text-ink-muted">2</sup>
                    </span>
                    <span>]</span>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    แสดงทศนิยม 3 ตำแหน่งเพื่อให้อ่านง่าย แต่ในการคำนวณจริงจะใช้ค่าเศษส่วนเต็มความละเอียดก่อนปัดเศษในขั้นตอนสุดท้าย
                  </p>
                </div>
              )}

              {/* STAGE 4: REDUCE */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-ink">
                    5. ลดรูปสมการและอ่านผลลัพธ์
                  </h3>

                  <div className="rounded-xl border border-rule bg-surface-hover p-4 space-y-2.5 text-center font-mono tabular-nums">
                    <div className="flex flex-wrap items-center justify-center gap-1 text-base sm:text-lg text-ink-muted">
                      <span>1 − [ (</span>
                      <Fraction numerator={active} denominator={total} />
                      <span>)² + (</span>
                      <Fraction numerator={inactive} denominator={total} />
                      <span>)² ]</span>
                    </div>
                    <p className="text-sm text-ink-muted">
                      = 1 − [ {squaredActive.toFixed(3)} + {squaredInactive.toFixed(3)} ] = 1 −{" "}
                      {(squaredActive + squaredInactive).toFixed(3)}
                    </p>
                    <div className="pt-1">
                      <output
                        aria-live="polite"
                        className="inline-flex items-center gap-2 rounded-xl border border-accent bg-accent-wash px-5 py-2.5 text-xl sm:text-2xl font-bold text-accent-ink"
                      >
                        Gini = {gini.toFixed(3)}
                      </output>
                    </div>
                  </div>

                  <div className="rounded-xl border border-rule border-l-4 border-l-accent bg-surface-hover/50 p-4 text-xs sm:text-sm space-y-1.5 tabular-nums">
                    <p className="font-semibold text-ink">
                      เปรียบเทียบการแบ่งโหนดตามสไลด์ (ลูกค้า 12 คน):
                    </p>
                    <p className="text-ink-muted">
                      Root (6A / 6I): Gini<sub>root</sub> = 1 − [(6/12)² + (6/12)²] = 0.500
                    </p>
                    <p className="text-ink-muted">
                      แบ่งเป็น Left (5A / 1I) และ Right (1A / 5I): โหนดย่อยทั้งคู่มี Gini ={" "}
                      {LECTURE_CHILD_GINI.toFixed(3)}
                    </p>
                    <p className="font-mono text-ink">
                      Gini<sub>split</sub> = (6/12)({LECTURE_CHILD_GINI.toFixed(3)}) + (6/12)(
                      {LECTURE_CHILD_GINI.toFixed(3)}) = {LECTURE_SPLIT_GINI.toFixed(3)}
                    </p>
                    <p className="font-bold text-good">
                      Information Gain = 0.500 − {LECTURE_SPLIT_GINI.toFixed(3)} ={" "}
                      {(ROOT_GINI - LECTURE_SPLIT_GINI).toFixed(3)}
                    </p>
                  </div>
                </div>
              )}

              {/* STAGE 5: PLAYGROUND */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-ink">
                      6. ทดลองปรับสัดส่วนแล้วสังเกตค่า Gini
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setSandboxActive(Math.min(6, Math.max(0, initialActive)))
                      }
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-rule bg-surface-hover px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink"
                    >
                      <ResetIcon className="size-3.5" /> Reset distribution
                    </button>
                  </div>

                  <div className="rounded-xl border border-rule bg-surface-hover p-4 space-y-3">
                    <label
                      htmlFor={`${id}-active`}
                      className="flex justify-between text-xs sm:text-sm font-medium"
                    >
                      <span>จำนวนลูกค้า Active (จาก 6 คน)</span>
                      <span className="font-mono font-bold text-good tabular-nums">
                        {active} Active / {inactive} Inactive
                      </span>
                    </label>
                    <input
                      id={`${id}-active`}
                      type="range"
                      min={0}
                      max={6}
                      step={1}
                      value={sandboxActive}
                      onChange={(e) => setSandboxActive(Number(e.target.value))}
                      className="w-full accent-good cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[11px] text-ink-subtle tabular-nums">
                      <span>0A : 6I (Pure = 0.000)</span>
                      <span>3A : 3I (Mixed = 0.500)</span>
                      <span>6A : 0I (Pure = 0.000)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center font-mono tabular-nums">
                    <div className="rounded-xl border border-rule bg-surface-hover/50 p-3.5">
                      <span className="block font-sans text-xs text-ink-muted">Gini Impurity</span>
                      <output
                        aria-live="polite"
                        className="mt-1 block text-xl sm:text-2xl font-bold text-accent-ink"
                      >
                        {gini.toFixed(3)}
                      </output>
                      <span className="mt-1 block font-sans text-[11px] text-ink-subtle">
                        {gini === 0
                          ? "Pure Node (บริสุทธิ์ 100%)"
                          : gini === 0.5
                          ? "ปนเปื้อนสูงสุด"
                          : "ปนเปื้อนบางส่วน"}
                      </span>
                    </div>

                    <div className="rounded-xl border border-good/40 bg-good-wash/30 p-3.5">
                      <span className="block font-sans text-xs text-ink-muted">
                        Information Gain (เทียบกับ 0.500)
                      </span>
                      <strong className="mt-1 block text-xl sm:text-2xl text-good">
                        +{informationGain.toFixed(3)}
                      </strong>
                      <span className="mt-1 block font-sans text-[11px] text-ink-subtle">
                        {informationGain === 0.5
                          ? "แยกคลาสได้สมบูรณ์"
                          : informationGain === 0
                          ? "ไม่ลดความปนเปื้อน"
                          : `ลดความปนเปื้อนลง ${(informationGain * 200).toFixed(0)}%`}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Controls */}
      <footer className="flex items-center justify-between gap-3 border-t border-rule bg-surface-hover/60 px-5 py-3.5 sm:px-6">
        <button
          type="button"
          className={CONTROL_BTN}
          disabled={step === 0}
          onClick={() => goTo(step - 1)}
        >
          <ChevronLeftIcon aria-hidden="true" /> Prev
        </button>

        <p id={`${id}-keyboard`} className="text-center text-xs text-ink-muted">
          ใช้ปุ่มลูกศรซ้าย/ขวา หรือคลิกแถบด้านบนเพื่อเปลี่ยนขั้นตอน
        </p>

        <button
          type="button"
          className={CONTROL_BTN}
          disabled={step === STAGES.length - 1}
          onClick={() => goTo(step + 1)}
        >
          Next <ChevronRightIcon aria-hidden="true" />
        </button>
      </footer>
    </section>
  );
}
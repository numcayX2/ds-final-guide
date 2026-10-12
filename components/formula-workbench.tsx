"use client";

import { useEffect, useId, useState, type CSSProperties, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeIcon,
  ResetIcon,
} from "@radix-ui/react-icons";

export interface FormulaWorkbenchProps {
  initialActive?: number;
  initialInactive?: number;
  className?: string;
  /** Called on stage changes; pass from a Client Component. */
  onStepChange?: (step: number) => void;
}

const STAGES = ["Predict", "Formula", "Anatomy", "Substitute", "Reduce", "Playground"] as const;
const ROOT_GINI = 0.5;
const LECTURE_CHILD_GINI = 1 - (5 / 6) ** 2 - (1 / 6) ** 2;
const LECTURE_SPLIT_GINI = (6 / 12) * LECTURE_CHILD_GINI + (6 / 12) * LECTURE_CHILD_GINI;
const PREDICTIONS = [
  { value: ROOT_GINI, label: "(A) 0.500 (ปนกันครึ่งๆ)" },
  { value: LECTURE_CHILD_GINI, label: "(B) ~0.278 (ค่อนข้างบริสุทธิ์)" },
  { value: 0, label: "(C) 0.000 (บริสุทธิ์สมบูรณ์)" },
];
const CONTROL = "inline-flex min-h-11 items-center gap-2 rounded-xl border border-rule-strong bg-surface px-3.5 py-2 text-sm font-medium text-ink shadow-xs transition-[color,background-color,border-color,transform] duration-150 hover:border-accent hover:bg-surface-hover motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40";
const SEGMENT = "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink aria-pressed:bg-surface aria-pressed:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const SLIDER = "min-h-11 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40 [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--slider)_var(--fill),var(--color-rule-strong)_var(--fill))] [&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:box-border [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-rule-strong [&::-moz-range-progress]:h-1.5 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-[var(--slider)] [&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:bg-surface [&::-moz-range-thumb]:shadow-md";
const SLIDER_ACCENT = "[--slider:var(--color-accent)] [&::-webkit-slider-thumb]:border-accent [&::-moz-range-thumb]:border-accent";
const SLIDER_GOOD = "[--slider:var(--color-good)] [&::-webkit-slider-thumb]:border-good [&::-moz-range-thumb]:border-good";
/** Webkit track fill that stops at the thumb centre; `ratio` is 0–1. Firefox uses ::-moz-range-progress instead. */
const sliderFill = (ratio: number) => ({ "--fill": `calc(0.625rem + (100% - 1.25rem) * ${ratio})` }) as CSSProperties;
type CustomerClass = "Active" | "Inactive";

function ProbabilitySymbol({ kind }: { kind: CustomerClass }) {
  return <span className="whitespace-nowrap italic">p<sub className="ml-0.5 text-[0.65em] not-italic">{kind}</sub></span>;
}

function Fraction({ numerator, denominator }: { numerator: number; denominator: number }) {
  return (
    <span aria-label={`${numerator} / ${denominator}`} className="inline-flex flex-col items-center align-middle text-[0.8em] leading-tight">
      <span aria-hidden="true" className="min-w-6 border-b border-current px-1 text-center">{numerator}</span>
      <span aria-hidden="true" className="px-1">{denominator}</span>
    </span>
  );
}

function SubstitutionToken({ kind, count, total, phase, reducedMotion }: {
  kind: CustomerClass;
  count: number;
  total: number;
  phase: number;
  reducedMotion: boolean;
}) {
  return (
    <span className="relative inline-grid min-h-16 min-w-24 place-items-center rounded-xl border border-current/40 bg-surface px-2 shadow-xs" style={{ color: `var(--${kind === "Active" ? "mint" : "rose"})` }}>
      <span aria-hidden="true" className="absolute inset-0 grid place-items-center opacity-15"><ProbabilitySymbol kind={kind} /></span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={phase}
          className="relative"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
        >
          {phase === 0 ? <ProbabilitySymbol kind={kind} /> : phase === 1 ? <Fraction numerator={count} denominator={total} /> : (total > 0 ? count / total : 0).toFixed(3)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Lect 07: rounded display values, full-precision Gini and weighted gain calculations. */
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
  const [hovered, setHovered] = useState<CustomerClass | null>(null);
  const [pinned, setPinned] = useState<CustomerClass | null>(null);
  const [substitutionPhase, setSubstitutionPhase] = useState(0);
  const [sandboxActive, setSandboxActive] = useState(Math.min(6, Math.max(0, initialActive)));

  const active = step === 5 ? sandboxActive : initialActive;
  const inactive = step === 5 ? 6 - sandboxActive : initialInactive;
  const total = active + inactive;
  const activeProbability = total > 0 ? active / total : 0;
  const inactiveProbability = total > 0 ? inactive / total : 0;
  const squaredActive = activeProbability ** 2;
  const squaredInactive = inactiveProbability ** 2;
  const gini = total > 0 ? 1 - squaredActive - squaredInactive : 0;
  const spotlight = step === 2 ? hovered ?? pinned : null;
  const unlocked = prediction !== null;
  const correctPrediction = PREDICTIONS.reduce((best, choice, index) =>
    Math.abs(choice.value - gini) < Math.abs(PREDICTIONS[best].value - gini) ? index : best, 0);
  const transition = { duration: reducedMotion ? 0 : 0.2 };

  useEffect(() => {
    if (step !== 3 || reducedMotion) return;
    const fractionTimer = window.setTimeout(() => setSubstitutionPhase(1), 500);
    const decimalTimer = window.setTimeout(() => setSubstitutionPhase(2), 1300);
    return () => {
      window.clearTimeout(fractionTimer);
      window.clearTimeout(decimalTimer);
    };
  }, [step, reducedMotion]);

  function goTo(next: number) {
    const nextStep = Math.max(0, Math.min(5, next));
    if (nextStep === step || (nextStep > 0 && !unlocked)) return;
    setHovered(null);
    setPinned(null);
    if (nextStep === 3) setSubstitutionPhase(0);
    setStep(nextStep);
    onStepChange?.(nextStep);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target as HTMLElement;
    // Native sliders keep their own arrow-key behavior, independent of stage navigation.
    if (target.closest("input, textarea, select, [contenteditable='true'], [role='slider']")) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      goTo(step + (event.key === "ArrowRight" ? 1 : -1));
    }
  }

  function probabilityToken(kind: CustomerClass) {
    const color = `var(--${kind === "Active" ? "mint" : "rose"})`;
    const tokenClass = "inline-flex min-h-11 items-center rounded-full border border-current/40 bg-surface px-4 py-2 text-lg font-medium shadow-xs";
    if (step !== 2) return <span className={tokenClass} style={{ color }}><ProbabilitySymbol kind={kind} /></span>;
    return (
      <button
        type="button"
        aria-label={`Spotlight p ${kind}`}
        aria-pressed={pinned === kind}
        aria-describedby={spotlight === kind ? `${id}-spotlight` : undefined}
        className={`${tokenClass} cursor-pointer transition-colors hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}
        style={{ color, background: spotlight === kind ? `color-mix(in srgb, ${color} 12%, transparent)` : undefined }}
        onMouseEnter={() => setHovered(kind)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(kind)}
        onBlur={() => setHovered(null)}
        onClick={() => setPinned(pinned === kind ? null : kind)}
      >
        <ProbabilitySymbol kind={kind} />
      </button>
    );
  }

  return (
    <section
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-keyboard`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`overflow-hidden rounded-2xl border border-rule bg-surface text-ink shadow-sm [--accent:var(--color-accent)] [--mint:var(--color-good)] [--rose:var(--color-bad)] [--rule:var(--color-rule-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-surface-hover/60 p-5 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-ink">Lect 07 · Customer inactivity</p>
          <h2 id={`${id}-title`} className="mt-1 text-xl font-semibold">Gini &amp; Gain <span className="font-normal text-ink-muted">Workbench</span></h2>
        </div>
        <span className="rounded-full border border-rule-strong bg-surface px-3 py-1 text-xs font-medium tabular-nums text-ink-muted shadow-xs">Stage {step} / 5 · {STAGES[step]}</span>
      </header>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <aside className="min-w-0 space-y-4" aria-label="Customer distribution">
          <div className="rounded-xl border border-rule bg-surface-hover p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">{step === 5 ? "Sandbox node" : "Candidate · Left node"}</p>
            <p className="mt-2 text-lg font-semibold tabular-nums">{active} Active / {inactive} Inactive <span className="text-sm font-normal text-ink-muted">· N = {total}</span></p>
            <div role="img" aria-label={`${active} Active customers and ${inactive} Inactive customers`} className="mt-5 flex flex-wrap gap-3">
              {Array.from({ length: total }, (_, index) => {
                const kind: CustomerClass = index < active ? "Active" : "Inactive";
                return (
                  <motion.span
                    key={index}
                    aria-hidden="true"
                    data-customer={kind}
                    animate={{ opacity: spotlight && spotlight !== kind ? 0.2 : 1, scale: reducedMotion ? 1 : spotlight === kind ? 1.08 : 1 }}
                    transition={transition}
                    className="grid size-10 place-items-center rounded-full border-2 font-mono text-xs font-bold shadow-xs"
                    style={{ color: `var(--${kind === "Active" ? "mint" : "rose"})`, borderColor: "currentColor", background: `color-mix(in srgb, var(--${kind === "Active" ? "mint" : "rose"}) 14%, transparent)` }}
                  >
                    {kind === "Active" ? "A" : "I"}
                  </motion.span>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-xs">
              <span style={{ color: "var(--mint)" }}>A · Active</span>
              <span style={{ color: "var(--rose)" }}>I · Inactive</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">Root จากสไลด์: 12 customers<br />6 Active / 6 Inactive{step > 0 && <> · Gini = 0.500</>}</p>
          {step === 2 && <p className="text-sm leading-relaxed text-ink-muted">ชี้เมาส์หรือโฟกัสที่สัญลักษณ์ p เพื่อดูสัดส่วน คลิกเพื่อตรึง spotlight</p>}
          {step === 3 && <p className="text-sm leading-relaxed text-ink-muted">สัญลักษณ์ → เศษส่วน → ทศนิยม<br />เก็บ ghost trace ของ p ไว้เพื่อเชื่อมตัวเลขกับความหมาย</p>}
        </aside>

        <div className="min-w-0" id={`${id}-panel`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -4 }}
              transition={transition}
              className="space-y-5"
            >
              <h3 className="text-base font-semibold">{[
                "ลองทำนายก่อนดูเฉลย",
                "สูตรเดียวกัน สองภาษา",
                "Spotlight · แต่ละสัญลักษณ์หมายถึงอะไร?",
                "แทนค่าจากสัดส่วนจริง",
                "ลดรูปทีละขั้น แล้วอ่านผล",
                "เปลี่ยนสัดส่วน แล้วสังเกต Gini",
              ][step]}</h3>

              {step === 0 && <>
                <p className="text-sm leading-relaxed">โหนด {active} Active / {inactive} Inactive นี้ มีค่า Gini ราวเท่าไร?</p>
                <div className="grid gap-2" role="group" aria-label="Predict the Gini value">
                  {PREDICTIONS.map((choice, index) => (
                    <button
                      key={choice.label}
                      type="button"
                      aria-pressed={prediction === index}
                      className={`${CONTROL} justify-between text-left`}
                      style={prediction === index ? { borderColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 10%, transparent)" } : undefined}
                      onClick={() => setPrediction(index)}
                    >
                      {choice.label}
                      {prediction === index && <CheckIcon aria-hidden="true" className="shrink-0" />}
                    </button>
                  ))}
                </div>
                <p role="status" className="min-h-12 text-sm leading-relaxed" style={{ color: unlocked ? `var(--${prediction === correctPrediction ? "mint" : "rose"})` : undefined }}>
                  {unlocked ? `${prediction === correctPrediction ? "ใช่แล้ว!" : "ลองตรวจสอบด้วยสูตรกัน"} Gini = ${gini.toFixed(3)} · กด Next เพื่อดูที่มา` : "เลือกคำตอบหนึ่งข้อเพื่อปลดล็อกสูตรและ timeline"}
                </p>
              </>}

              {(step === 1 || step === 2) && <>
                <div role="group" aria-label="Formula display" className="inline-flex gap-1 rounded-xl border border-rule bg-surface-hover p-1">
                  <button type="button" className={SEGMENT} aria-pressed={view === "math"} style={{ color: view === "math" ? "var(--accent)" : undefined }} onClick={() => setView("math")}>Math</button>
                  <button type="button" className={SEGMENT} aria-pressed={view === "python"} style={{ color: view === "python" ? "var(--accent)" : undefined }} onClick={() => setView("python")}><CodeIcon aria-hidden="true" /> NumPy</button>
                </div>
                <div className="overflow-x-auto rounded-xl border border-rule bg-surface-hover p-4 sm:p-5">
                  {view === "math" ? <div aria-label="Gini equals one minus the sum of squared class probabilities" className="flex items-center justify-center gap-2 py-3 text-2xl sm:text-3xl"><span>Gini = 1 −</span><span style={{ color: "var(--purple, #a78bfa)" }}>Σ</span><span className="italic">p<sub>i</sub><sup>2</sup></span></div> : <pre className="text-sm leading-7"><code><span className="text-ink-muted"># probs = [p_Active, p_Inactive]</span>{"\n"}1.0 - np.<span style={{ color: "var(--purple, #a78bfa)" }}>sum</span>(np.square(probs))</code></pre>}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">{probabilityToken("Active")}<span className="text-ink-muted">+</span>{probabilityToken("Inactive")}</div>
                {step === 1 && <p className="text-sm leading-relaxed text-ink-muted">p คือสัดส่วนของแต่ละคลาส · ยกกำลังสอง รวมกัน แล้วลบจาก 1</p>}
                {step === 2 && <div id={`${id}-spotlight`} role="status" className="min-h-20 rounded-xl border border-rule bg-surface-hover p-4">
                  {spotlight ? <>
                    <p className="flex flex-wrap items-center gap-2 text-lg tabular-nums" style={{ color: `var(--${spotlight === "Active" ? "mint" : "rose"})` }}><ProbabilitySymbol kind={spotlight} /><span>=</span><Fraction numerator={spotlight === "Active" ? active : inactive} denominator={total} /><span>≈ {(spotlight === "Active" ? activeProbability : inactiveProbability).toFixed(3)}</span></p>
                    <p className="mt-2 text-sm text-ink-muted">สัดส่วนลูกค้า {spotlight}</p>
                  </> : <p className="text-sm text-ink-muted">เลือก p<sub>Active</sub> หรือ p<sub>Inactive</sub> เพื่อเชื่อมสูตรกับลูกค้าแต่ละกลุ่ม</p>}
                </div>}
              </>}

              {step === 3 && <>
                <div aria-label="Substitution into the Gini formula" className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-rule bg-surface-hover p-4 text-xl shadow-xs sm:text-2xl">
                  <span>1 − [</span>
                  <span className="inline-flex items-start"><SubstitutionToken kind="Active" count={active} total={total} phase={reducedMotion ? 2 : substitutionPhase} reducedMotion={reducedMotion} /><sup>2</sup></span>
                  <span>+</span>
                  <span className="inline-flex items-start"><SubstitutionToken kind="Inactive" count={inactive} total={total} phase={reducedMotion ? 2 : substitutionPhase} reducedMotion={reducedMotion} /><sup>2</sup></span>
                  <span>]</span>
                </div>
                <p className="text-sm leading-relaxed text-ink-muted">แสดงทศนิยม 3 ตำแหน่ง แต่คำนวณด้วยค่าจริงโดยไม่ปัดเศษระหว่างทาง</p>
              </>}

              {(step === 4 || step === 5) && <>
                {step === 5 && <div className="space-y-3 rounded-xl border border-rule bg-surface-hover p-4">
                  <label htmlFor={`${id}-active`} className="flex flex-wrap justify-between gap-2 text-sm"><span>จำนวนลูกค้า Active</span><span className="font-semibold tabular-nums" style={{ color: "var(--mint)" }}>{active} / 6</span></label>
                  <input id={`${id}-active`} type="range" min={0} max={6} step={1} value={sandboxActive} aria-valuetext={`${active} Active / ${inactive} Inactive; Gini ${gini.toFixed(3)}`} className={`${SLIDER} ${SLIDER_GOOD}`} style={sliderFill(sandboxActive / 6)} onChange={(event) => setSandboxActive(Number(event.target.value))} />
                  <div className="flex justify-between text-xs text-ink-muted"><span>0 Active · 6 Inactive</span><span>6 Active · 0 Inactive</span></div>
                  <button type="button" className={CONTROL} onClick={() => setSandboxActive(Math.min(6, Math.max(0, initialActive)))}><ResetIcon aria-hidden="true" /> Reset distribution</button>
                </div>}
                <div className="space-y-3 text-center tabular-nums">
                  <p className="flex flex-wrap items-center justify-center gap-1 text-lg text-ink-muted">1 − [(<Fraction numerator={active} denominator={total} />)<sup>2</sup> + (<Fraction numerator={inactive} denominator={total} />)<sup>2</sup>]</p>
                  <p className="text-sm leading-7 text-ink-muted">1 − [{squaredActive.toFixed(3)} + {squaredInactive.toFixed(3)}] = 1 − {(squaredActive + squaredInactive).toFixed(3)}</p>
                  <output aria-live="polite" aria-atomic="true" className="inline-flex flex-wrap items-center justify-center gap-3 rounded-xl border px-5 py-3 text-2xl font-semibold tracking-tight shadow-sm" style={{ color: "var(--accent)", borderColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 10%, transparent)" }}>
                    Gini = {gini.toFixed(3)}
                    {step === 5 && gini === 0 && <span className="rounded-full px-3 py-1 text-sm" style={{ color: "var(--mint)", background: "color-mix(in srgb, var(--mint) 12%, transparent)" }}>✨ Pure Node!</span>}
                  </output>
                </div>
                <div className="space-y-3 pt-2">
                  <div role="meter" aria-label="Node impurity" aria-valuemin={0} aria-valuemax={0.5} aria-valuenow={gini} aria-valuetext={`Gini ${gini.toFixed(3)}; 0 pure, 0.5 maximally mixed`} className="relative h-3 rounded-full" style={{ background: "linear-gradient(to right, var(--mint), var(--accent))" }}>
                    <motion.span animate={{ left: `${(gini / ROOT_GINI) * 100}%` }} transition={transition} className="absolute -top-1 size-5 -translate-x-1/2 rounded-full border-[3px] border-ink bg-surface shadow-md" />
                  </div>
                  <div className="flex justify-between text-xs text-ink-muted"><span>0.0 · Pure</span><span>0.5 · Mixed</span></div>
                  <p className="text-sm leading-relaxed text-ink-muted">{step === 4 && initialActive === 5 && initialInactive === 1 ? "Impurity ลดลงจาก 0.500 เหลือ 0.278 (Information Gain = 0.222)" : "Gini วัดความปนกันภายในโหนด · ยิ่งใกล้ 0 ยิ่งบริสุทธิ์"}</p>
                </div>
                {step === 4 && <div className="space-y-2 rounded-xl border border-rule border-l-2 border-l-accent bg-surface-hover p-4 text-sm leading-relaxed tabular-nums">
                  <p className="font-semibold">Verified lecture split · 12 customers</p>
                  <p className="text-ink-muted">Root: 1 − [(6/12)² + (6/12)²] = 0.500</p>
                  <p className="text-ink-muted">Left: 5 Active / 1 Inactive · Right: 1 Active / 5 Inactive</p>
                  <p>Gini<sub>split</sub> = (6/12)({LECTURE_CHILD_GINI.toFixed(3)}) + (6/12)({LECTURE_CHILD_GINI.toFixed(3)}) = {LECTURE_SPLIT_GINI.toFixed(3)}</p>
                  <p className="font-semibold" style={{ color: "var(--mint)" }}>Gain = 0.500 − {LECTURE_SPLIT_GINI.toFixed(3)} = {(ROOT_GINI - LECTURE_SPLIT_GINI).toFixed(3)}</p>
                </div>}
              </>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <footer className="space-y-4 border-t border-rule bg-surface-hover p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <button type="button" className={CONTROL} disabled={step === 0} onClick={() => goTo(step - 1)}><ChevronLeftIcon aria-hidden="true" /> Prev</button>
          <p id={`${id}-keyboard`} className="text-center text-xs text-ink-muted">← / → เปลี่ยนขั้นตอน<br />{unlocked ? "เลื่อน timeline เพื่อย้อนดูได้ทุกขั้น" : "เลือกคำตอบเพื่อปลดล็อก"}</p>
          <button type="button" className={CONTROL} disabled={!unlocked || step === 5} onClick={() => goTo(step + 1)}>Next <ChevronRightIcon aria-hidden="true" /></button>
        </div>
        <label htmlFor={`${id}-timeline`} className="sr-only">Workbench stage</label>
        <input id={`${id}-timeline`} type="range" min={0} max={5} step={1} value={step} disabled={!unlocked} aria-valuetext={`${step}: ${STAGES[step]}`} aria-controls={`${id}-panel`} className={`${SLIDER} ${SLIDER_ACCENT}`} style={sliderFill(step / 5)} onChange={(event) => goTo(Number(event.target.value))} />
        <nav aria-label="Workbench stages" className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {STAGES.map((name, index) => <button key={name} type="button" disabled={index > 0 && !unlocked} aria-current={step === index ? "step" : undefined} aria-controls={`${id}-panel`} onClick={() => goTo(index)} className="flex min-h-12 flex-col items-center gap-2 rounded-lg px-1 py-2 text-xs font-medium transition-colors hover:bg-surface aria-[current=step]:bg-surface aria-[current=step]:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-35" style={{ color: step === index ? "var(--accent)" : undefined }}>
            <span aria-hidden="true" className="size-2 rounded-full" style={{ background: step === index ? "var(--accent)" : "var(--rule)" }} />
            <span>{index}: {name}</span>
          </button>)}
        </nav>
      </footer>
    </section>
  );
}

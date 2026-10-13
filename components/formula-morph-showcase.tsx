"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";
import {
  PlayIcon,
  PauseIcon,
  TrackPreviousIcon,
  TrackNextIcon,
  ResetIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";

type FormulaTopic = "tukey" | "gini" | "confusion" | "kmeans";
type MetricMode = "euclidean" | "manhattan";

interface AnatomyChapter {
  label: string;
  color: string;
  badge: string;
  text: string;
}

const AUTOPLAY_MS = 2800;
const TOTAL_STEPS = 4;

const SPRING_TACTILE = { type: "spring" as const, stiffness: 270, damping: 28, mass: 0.9 };
const SPRING_BADGE = { type: "spring" as const, stiffness: 300, damping: 24, mass: 0.9 };
const NO_ANIM = { duration: 0 } as const;

const STEP_LABELS = [
  "1. โครงสร้างสูตร",
  "2. ความหมายตัวแปร",
  "3. แทนค่าตัวเลข",
  "4. คำนวณผลลัพธ์",
];

const STEP_DESCRIPTIONS = [
  "สูตรเชิงสัญลักษณ์แยกสีตามตัวแปร",
  "คลิกที่ตัวแปรเพื่อดูความหมายและที่มา",
  "แทนค่าตัวเลขจากข้อมูลลงในสมการ",
  "ตัดทอนสมการเพื่อหาคำตอบสุดท้าย",
];

const TOPICS: { key: FormulaTopic; label: string }[] = [
  { key: "tukey", label: "1. Tukey's Outlier (Lect 05)" },
  { key: "gini", label: "2. Decision Tree Gini (Lect 07)" },
  { key: "confusion", label: "3. Confusion Matrix & F1 (Lect 08)" },
  { key: "kmeans", label: "4. K-Means Distance (Lect 08-09)" },
];

const POS_SCORES = [0.35, 0.42, 0.52, 0.58, 0.65, 0.72, 0.78, 0.82, 0.88, 0.94];
const NEG_SCORES = [0.12, 0.18, 0.25, 0.31, 0.38, 0.45, 0.53, 0.59, 0.64, 0.71];

const POINTS: Record<string, { x: number; y: number; label: string }> = {
  A1: { x: 2, y: 10, label: "A1 (2, 10)" },
  A2: { x: 2, y: 5, label: "A2 (2, 5)" },
  A3: { x: 8, y: 4, label: "A3 (8, 4)" },
  A8: { x: 4, y: 9, label: "A8 (4, 9)" },
};

const CENTROIDS: Record<string, { x: number; y: number; label: string }> = {
  C1: { x: 2, y: 10, label: "C1 (2, 10)" },
  C2: { x: 5, y: 8, label: "C2 (5, 8)" },
};

const TUKEY_MIN = 20;
const TUKEY_MAX = 55;
const TUKEY_TICKS = [20, 30, 40, 50];
const COLOR_AMBER = "var(--token-amber, #92400e)";

export function FormulaMorphShowcase() {
  const [topic, setTopic] = useState<FormulaTopic>("tukey");
  const [step, setStep] = useState<number>(0);
  const [anatomySubstep, setAnatomySubstep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hoveredToken, setHoveredToken] = useState<string | null>(null);

  // 1. Tukey State
  const [q1, setQ1] = useState<number>(22);
  const [q3, setQ3] = useState<number>(30);
  const multiplier = 1.5;
  const [testPoint, setTestPoint] = useState<number>(45);

  // 2. Gini State
  const [activeCustomers, setActiveCustomers] = useState<number>(5);
  const totalCustomers = 6;

  // 3. Confusion Matrix State
  const [threshold, setThreshold] = useState<number>(0.5);

  // 4. K-Means State
  const [selectedPointKey, setSelectedPointKey] = useState<string>("A2");
  const [metricMode, setMetricMode] = useState<MetricMode>("euclidean");
  const [targetCentroid, setTargetCentroid] = useState<"C1" | "C2">("C2");

  const reducedMotion = Boolean(useReducedMotion());

  const tukey = useMemo(() => {
    const iqr = q3 - q1;
    const fenceOffset = multiplier * iqr;
    const upperFence = q3 + fenceOffset;
    return { iqr, fenceOffset, upperFence, isOutlier: testPoint > upperFence };
  }, [q1, q3, multiplier, testPoint]);

  const giniCalc = useMemo(() => {
    const inactive = totalCustomers - activeCustomers;
    const pActive = totalCustomers > 0 ? activeCustomers / totalCustomers : 0;
    const pInactive = totalCustomers > 0 ? inactive / totalCustomers : 0;
    const pActiveSq = pActive ** 2;
    const pInactiveSq = pInactive ** 2;
    return {
      inactive,
      pActive,
      pInactive,
      pActiveSq,
      pInactiveSq,
      gini: 1 - (pActiveSq + pInactiveSq),
    };
  }, [activeCustomers, totalCustomers]);

  const cm = useMemo(() => {
    const tp = POS_SCORES.filter((s) => s >= threshold).length;
    const fn = POS_SCORES.length - tp;
    const fp = NEG_SCORES.filter((s) => s >= threshold).length;
    const tn = NEG_SCORES.length - fp;
    const precision = tp + fp > 0 ? tp / (tp + fp) : 1;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
    return { tp, fp, fn, tn, precision, recall, f1 };
  }, [threshold]);

  const km = useMemo(() => {
    const pt = POINTS[selectedPointKey];
    const c = CENTROIDS[targetCentroid];
    const dx = pt.x - c.x;
    const dy = pt.y - c.y;
    const d1Euclid = Math.sqrt((pt.x - CENTROIDS.C1.x) ** 2 + (pt.y - CENTROIDS.C1.y) ** 2);
    const d2Euclid = Math.sqrt((pt.x - CENTROIDS.C2.x) ** 2 + (pt.y - CENTROIDS.C2.y) ** 2);
    const d1Manhattan = Math.abs(pt.x - CENTROIDS.C1.x) + Math.abs(pt.y - CENTROIDS.C1.y);
    const d2Manhattan = Math.abs(pt.x - CENTROIDS.C2.x) + Math.abs(pt.y - CENTROIDS.C2.y);
    return {
      pt,
      c,
      dx,
      dy,
      distEuclidean: Math.sqrt(dx ** 2 + dy ** 2),
      distManhattan: Math.abs(dx) + Math.abs(dy),
      d1Euclid,
      d2Euclid,
      d1Manhattan,
      d2Manhattan,
    };
  }, [selectedPointKey, targetCentroid]);

  const handleSelectTopic = useCallback((newTopic: FormulaTopic) => {
    setTopic(newTopic);
    setStep(0);
    setAnatomySubstep(0);
    setIsPlaying(false);
  }, []);

  const handleManualSelectAnatomySubstep = useCallback((idx: number) => {
    setIsPlaying(false);
    setStep(1);
    setAnatomySubstep(idx);
  }, []);

  const handleAdvanceToStep2 = useCallback(() => {
    setAnatomySubstep(0);
    setStep(2);
  }, []);

  const resetAll = useCallback(() => {
    if (topic === "tukey") {
      setQ1(22);
      setQ3(30);
      setTestPoint(45);
    } else if (topic === "gini") {
      setActiveCustomers(5);
    } else if (topic === "confusion") {
      setThreshold(0.5);
    } else {
      setSelectedPointKey("A2");
      setTargetCentroid("C2");
      setMetricMode("euclidean");
    }
    setStep(0);
    setAnatomySubstep(0);
    setIsPlaying(false);
  }, [topic]);

  useEffect(() => {
    if (!isPlaying || step === 1) return;
    if (step >= TOTAL_STEPS - 1) {
      const timer = setTimeout(() => setIsPlaying(false), AUTOPLAY_MS);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setAnatomySubstep(0);
      setStep((s) => s + 1);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [isPlaying, step]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && isPlaying) setIsPlaying(false);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isPlaying]);

  const totalSubsteps = topic === "confusion" ? 3 : 2;

  return (
    <MotionConfig reducedMotion="user">
      <div className="space-y-4">
        {/* Top Bar: Topic Switcher & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rule bg-surface p-3 sm:px-4">
          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-rule bg-surface-hover p-1">
            {TOPICS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => handleSelectTopic(t.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  topic === t.key
                    ? "bg-surface text-accent shadow-xs"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-surface-hover px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink transition-colors"
          >
            <ResetIcon className="size-3.5" /> รีเซ็ตค่าเริ่มต้น
          </button>
        </div>

        {/* Main Grid: Formula Stage (Left) + Controls & Visuals (Right) */}
        <div className="grid gap-6 lg:grid-cols-12 items-start min-w-0">
          {/* Left: Formula Stage */}
          <div className="lg:col-span-8 min-w-0 flex flex-col justify-between rounded-2xl border border-rule bg-surface p-4 sm:p-6 shadow-xs">
            {/* Stage Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-rule">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent-ink">
                <span className={`size-2 rounded-full bg-accent ${reducedMotion ? "" : "animate-pulse"}`} />
                {STEP_LABELS[step]}
                {step === 1 && (
                  <span className="text-[11px] font-normal text-accent-ink/80">
                    ({anatomySubstep + 1}/{totalSubsteps})
                  </span>
                )}
              </span>
              <span className="text-xs text-ink-subtle">{STEP_DESCRIPTIONS[step]}</span>
            </div>

            {/* Formula Render Area */}
            <div className="py-6 sm:py-8 min-h-[220px] flex items-center justify-center">
              {topic === "tukey" && (
                <TukeyMorphFormula
                  step={step}
                  anatomySubstep={anatomySubstep}
                  onSelectAnatomySubstep={handleManualSelectAnatomySubstep}
                  onAdvanceAnatomySubstep={setAnatomySubstep}
                  onNextStep={handleAdvanceToStep2}
                  isPlaying={isPlaying}
                  q1={q1}
                  q3={q3}
                  iqr={tukey.iqr}
                  multiplier={multiplier}
                  fenceOffset={tukey.fenceOffset}
                  upperFence={tukey.upperFence}
                  testPoint={testPoint}
                  isOutlier={tukey.isOutlier}
                  hoveredToken={hoveredToken}
                  onHoverToken={setHoveredToken}
                  reducedMotion={reducedMotion}
                />
              )}
              {topic === "gini" && (
                <GiniMorphFormula
                  step={step}
                  anatomySubstep={anatomySubstep}
                  onSelectAnatomySubstep={handleManualSelectAnatomySubstep}
                  onAdvanceAnatomySubstep={setAnatomySubstep}
                  onNextStep={handleAdvanceToStep2}
                  isPlaying={isPlaying}
                  active={activeCustomers}
                  inactive={giniCalc.inactive}
                  total={totalCustomers}
                  pActive={giniCalc.pActive}
                  pInactive={giniCalc.pInactive}
                  pActiveSq={giniCalc.pActiveSq}
                  pInactiveSq={giniCalc.pInactiveSq}
                  gini={giniCalc.gini}
                  hoveredToken={hoveredToken}
                  onHoverToken={setHoveredToken}
                  reducedMotion={reducedMotion}
                />
              )}
              {topic === "confusion" && (
                <ConfusionMorphFormula
                  step={step}
                  anatomySubstep={anatomySubstep}
                  onSelectAnatomySubstep={handleManualSelectAnatomySubstep}
                  onAdvanceAnatomySubstep={setAnatomySubstep}
                  onNextStep={handleAdvanceToStep2}
                  isPlaying={isPlaying}
                  tp={cm.tp}
                  fp={cm.fp}
                  fn={cm.fn}
                  precision={cm.precision}
                  recall={cm.recall}
                  f1={cm.f1}
                  hoveredToken={hoveredToken}
                  onHoverToken={setHoveredToken}
                  reducedMotion={reducedMotion}
                />
              )}
              {topic === "kmeans" && (
                <KMeansMorphFormula
                  step={step}
                  anatomySubstep={anatomySubstep}
                  onSelectAnatomySubstep={handleManualSelectAnatomySubstep}
                  onAdvanceAnatomySubstep={setAnatomySubstep}
                  onNextStep={handleAdvanceToStep2}
                  isPlaying={isPlaying}
                  pt={km.pt}
                  c={km.c}
                  dx={km.dx}
                  dy={km.dy}
                  distEuclidean={km.distEuclidean}
                  distManhattan={km.distManhattan}
                  mode={metricMode}
                  hoveredToken={hoveredToken}
                  onHoverToken={setHoveredToken}
                  reducedMotion={reducedMotion}
                />
              )}
            </div>

            {/* Stepper Controls & Timeline */}
            <div className="border-t border-rule pt-3 space-y-3">
              {/* Progress Bar */}
              <div className="h-1 overflow-hidden rounded-full bg-surface-hover" aria-hidden="true">
                {isPlaying && !reducedMotion && step !== 1 ? (
                  <motion.div
                    key={`${topic}-${step}`}
                    className="h-full w-full origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                ) : (
                  <div
                    className="h-full bg-accent/40 transition-[width]"
                    style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                  />
                )}
              </div>

              {/* Playback Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!isPlaying && step >= TOTAL_STEPS - 1) {
                      setStep(0);
                      setAnatomySubstep(0);
                    }
                    setIsPlaying((p) => !p);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent-wash px-3 py-1.5 text-xs sm:text-sm font-semibold text-accent-ink hover:bg-accent/15 transition-all"
                >
                  {isPlaying ? (
                    <>
                      <PauseIcon className="size-3.5" /> หยุดชั่วคราว
                    </>
                  ) : (
                    <>
                      <PlayIcon className="size-3.5" /> เล่นอัตโนมัติ
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs text-ink-muted mr-1 hidden sm:inline">
                    ขั้นที่ {step + 1} / {TOTAL_STEPS}
                  </span>
                  <button
                    type="button"
                    disabled={step === 0}
                    onClick={() => {
                      setIsPlaying(false);
                      setStep((s) => Math.max(0, s - 1));
                      setAnatomySubstep(0);
                    }}
                    className="rounded-lg border border-rule p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover disabled:opacity-30 transition-colors"
                    title="ย้อนกลับ"
                  >
                    <TrackPreviousIcon className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={step === TOTAL_STEPS - 1}
                    onClick={() => {
                      setIsPlaying(false);
                      setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
                      setAnatomySubstep(0);
                    }}
                    className="rounded-lg border border-rule p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover disabled:opacity-30 transition-colors"
                    title="ถัดไป"
                  >
                    <TrackNextIcon className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* 4 Step Tabs */}
              <div className="grid grid-cols-4 gap-1.5">
                {STEP_LABELS.map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setStep(idx);
                      setAnatomySubstep(0);
                    }}
                    className={`flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-center text-xs font-medium transition-all ${
                      step === idx
                        ? "bg-accent-wash text-accent-ink border border-accent/40 font-semibold"
                        : "text-ink-muted hover:bg-surface-hover hover:text-ink"
                    }`}
                  >
                    <span className={`size-1.5 rounded-full ${step === idx ? "bg-accent" : "bg-rule-strong"}`} />
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">ขั้น {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Parameter Controls & Mini Visuals */}
          <div className="lg:col-span-4 rounded-2xl border border-rule bg-surface p-5 sm:p-6 shadow-xs space-y-5">
            <div className="pb-3 border-b border-rule">
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
                ปรับค่าตัวแปร (Live Parameters)
              </h3>
              <p className="mt-1 text-xs text-ink-muted">
                เลื่อนปรับค่าเพื่อดูผลกระทบต่อสมการและแผนภาพแบบทันที
              </p>
            </div>

            {/* Topic 1 Controls: Tukey */}
            {topic === "tukey" && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-accent-ink font-semibold">จุดทดสอบ x (Data Point)</span>
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded tabular-nums ${
                        tukey.isOutlier ? "bg-bad-wash text-bad" : "bg-surface-hover text-ink"
                      }`}
                    >
                      <AnimatedNumber value={testPoint} decimals={1} reducedMotion={reducedMotion} />
                    </span>
                  </div>
                  <input
                    type="range"
                    min={TUKEY_MIN}
                    max={TUKEY_MAX}
                    step={0.5}
                    value={testPoint}
                    onChange={(e) => setTestPoint(Number(e.target.value))}
                    className="mt-2 w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ink-subtle">
                    <span>20.0 (ในรั้ว)</span>
                    <span className="font-semibold text-accent tabular-nums">
                      รั้ว = <AnimatedNumber value={tukey.upperFence} decimals={1} reducedMotion={reducedMotion} />
                    </span>
                    <span>55.0 (นอกรั้ว)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-ink">Q₃ (ควอร์ไทล์ที่ 3)</span>
                    <span className="font-mono font-bold text-ink tabular-nums">{q3}</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={35}
                    step={1}
                    value={q3}
                    onChange={(e) => setQ3(Number(e.target.value))}
                    className="mt-2 w-full accent-accent cursor-pointer"
                  />
                </div>

                <div className="rounded-xl border border-rule bg-surface-hover/80 p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-ink">ตัวคูณ Tukey Multiplier</span>
                    <span className="rounded-md border border-warn/40 bg-warn/10 px-2 py-0.5 font-mono font-bold text-warn">
                      1.5 × IQR
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-ink-subtle leading-relaxed">
                    <strong>ข้อควรระวัง:</strong> ในห้องสอบใช้ 1.5 (Inner Fence) เสมอ ไม่ใช้ 3.0
                  </p>
                </div>

                <TukeyAxisDiagram
                  q1={q1}
                  q3={q3}
                  upperFence={tukey.upperFence}
                  testPoint={testPoint}
                  isOutlier={tukey.isOutlier}
                  reducedMotion={reducedMotion}
                />
              </div>
            )}

            {/* Topic 2 Controls: Gini */}
            {topic === "gini" && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-good font-semibold">ลูกค้ากลุ่ม Active</span>
                    <span className="font-mono font-bold text-good tabular-nums">
                      {activeCustomers} / {totalCustomers}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={6}
                    step={1}
                    value={activeCustomers}
                    onChange={(e) => setActiveCustomers(Number(e.target.value))}
                    className="mt-2 w-full accent-good cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ink-subtle">
                    <span>0 (Pure I)</span>
                    <span>3 (ปนกันครึ่งๆ = 0.5)</span>
                    <span>6 (Pure A)</span>
                  </div>
                </div>

                <GiniPopulationPanel
                  active={activeCustomers}
                  total={totalCustomers}
                  gini={giniCalc.gini}
                  reducedMotion={reducedMotion}
                />
              </div>
            )}

            {/* Topic 3 Controls: Confusion Matrix */}
            {topic === "confusion" && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-accent-ink font-semibold">เกณฑ์ตัดสินใจ (Threshold T)</span>
                    <span className="font-mono font-bold text-accent px-2 py-0.5 rounded bg-accent/10 tabular-nums">
                      T = <AnimatedNumber value={threshold} decimals={2} reducedMotion={reducedMotion} />
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={0.8}
                    step={0.05}
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="mt-2 w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ink-subtle">
                    <span>0.20 (เน้น Recall สูง)</span>
                    <span>0.80 (เน้น Precision สูง)</span>
                  </div>
                </div>

                <ThresholdStripDiagram
                  posScores={POS_SCORES}
                  negScores={NEG_SCORES}
                  threshold={threshold}
                  tp={cm.tp}
                  fp={cm.fp}
                  fn={cm.fn}
                  tn={cm.tn}
                  reducedMotion={reducedMotion}
                />

                <div className="rounded-xl border border-rule bg-surface-hover p-3.5 text-xs">
                  <p className="text-[11px] font-semibold uppercase text-ink-muted pb-2 border-b border-rule">
                    Confusion Matrix (N = 20)
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-center">
                    <div className="rounded-lg border border-teal-500/30 bg-teal-500/10 p-2">
                      <span className="text-[10px] text-ink-subtle block font-sans">True Positive</span>
                      <strong className="text-base text-teal-700 dark:text-teal-300 tabular-nums">
                        TP = {cm.tp}
                      </strong>
                    </div>
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2">
                      <span className="text-[10px] text-ink-subtle block font-sans">False Positive</span>
                      <strong className="text-base text-amber-700 dark:text-amber-300 tabular-nums">
                        FP = {cm.fp}
                      </strong>
                    </div>
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2">
                      <span className="text-[10px] text-ink-subtle block font-sans">False Negative</span>
                      <strong className="text-base text-red-700 dark:text-red-300 tabular-nums">
                        FN = {cm.fn}
                      </strong>
                    </div>
                    <div className="rounded-lg border border-slate-500/30 bg-slate-500/10 p-2">
                      <span className="text-[10px] text-ink-subtle block font-sans">True Negative</span>
                      <strong className="text-base text-slate-700 dark:text-slate-300 tabular-nums">
                        TN = {cm.tn}
                      </strong>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-ink-subtle">
                    <strong>ข้อสังเกต:</strong> เมื่อลดค่า T จะตรวจพบคนป่วยมากขึ้น (Recall สูงขึ้น) แต่ก็ทายผิดมากขึ้นเช่นกัน (Precision ลดลง)
                  </p>
                </div>
              </div>
            )}

            {/* Topic 4 Controls: K-Means */}
            {topic === "kmeans" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-ink block mb-1.5">
                    เลือกจุดข้อมูล:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.entries(POINTS).map(([k, p]) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setSelectedPointKey(k)}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-mono transition-all ${
                          selectedPointKey === k
                            ? "border-accent bg-accent-wash text-accent-ink font-bold"
                            : "border-rule bg-surface hover:bg-surface-hover text-ink-muted"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink block mb-1.5">
                    เปรียบเทียบกับ Centroid:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["C1", "C2"] as const).map((cKey) => (
                      <button
                        key={cKey}
                        type="button"
                        onClick={() => setTargetCentroid(cKey)}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-mono transition-all ${
                          targetCentroid === cKey
                            ? cKey === "C1"
                              ? "border-blue-500 bg-blue-500/15 text-blue-700 dark:text-blue-300 font-bold"
                              : "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold"
                            : "border-rule bg-surface text-ink-muted hover:bg-surface-hover"
                        }`}
                      >
                        {CENTROIDS[cKey].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink block mb-1.5">
                    วิธีวัดระยะทาง (Distance Metric):
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["euclidean", "manhattan"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMetricMode(m)}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs transition-all ${
                          metricMode === m
                            ? "border-accent bg-accent text-on-accent font-semibold"
                            : "border-rule bg-surface text-ink-muted hover:bg-surface-hover"
                        }`}
                      >
                        {m === "euclidean" ? "Euclidean (L2)" : "Manhattan (L1)"}
                      </button>
                    ))}
                  </div>
                </div>

                <KMeansTriangleSVG
                  pt={km.pt}
                  c={km.c}
                  mode={metricMode}
                  pointKey={selectedPointKey}
                  targetKey={targetCentroid}
                />

                <div className="rounded-xl border border-rule bg-surface-hover p-3 text-xs space-y-1.5 font-mono">
                  <p className="font-sans font-semibold text-ink text-[11px] uppercase">
                    เปรียบเทียบระยะห่าง ({metricMode}):
                  </p>
                  <div className="flex justify-between pt-1 tabular-nums">
                    <span>d({selectedPointKey}, C1):</span>
                    <strong className="text-blue-600">
                      <AnimatedNumber
                        value={metricMode === "euclidean" ? km.d1Euclid : km.d1Manhattan}
                        decimals={metricMode === "euclidean" ? 3 : 1}
                        reducedMotion={reducedMotion}
                      />
                    </strong>
                  </div>
                  <div className="flex justify-between tabular-nums">
                    <span>d({selectedPointKey}, C2):</span>
                    <strong className="text-amber-600">
                      <AnimatedNumber
                        value={metricMode === "euclidean" ? km.d2Euclid : km.d2Manhattan}
                        decimals={metricMode === "euclidean" ? 3 : 1}
                        reducedMotion={reducedMotion}
                      />
                    </strong>
                  </div>
                  <div className="pt-2 border-t border-rule font-sans text-[11px] text-ink-muted font-medium">
                    {(metricMode === "euclidean" ? km.d1Euclid < km.d2Euclid : km.d1Manhattan < km.d2Manhattan)
                      ? "ผลลัพธ์: ใกล้ C1 มากกว่า (จัดเข้า Cluster 1)"
                      : "ผลลัพธ์: ใกล้ C2 มากกว่า (จัดเข้า Cluster 2)"}
                  </div>
                  {selectedPointKey === "A2" && (
                    <div className="rounded-lg border border-warn/40 bg-warn/10 p-2 font-sans text-[11px] leading-relaxed text-ink">
                      <strong>จุดสังเกตข้อสอบ:</strong> จุด A2 เมื่อวัดแบบ Euclidean จะใกล้ C2 (
                      <span className="font-mono font-bold tabular-nums">
                        {km.d2Euclid.toFixed(2)} &lt; {km.d1Euclid.toFixed(2)}
                      </span>
                      ) แต่ถ้าวัดแบบ Manhattan จะใกล้ C1 (
                      <span className="font-mono font-bold tabular-nums">
                        {km.d1Manhattan} &lt; {km.d2Manhattan}
                      </span>
                      )
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

// ---------------------------------------------------------------------------
// Number Interpolation Hook & Component
// ---------------------------------------------------------------------------
function useTweenedNumber(target: number, reducedMotion: boolean, duration = 200): number {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);

  useEffect(() => {
    if (reducedMotion) {
      displayRef.current = target;
      return;
    }
    const from = displayRef.current;
    if (from === target) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (target - from) * eased;
      displayRef.current = v;
      setDisplay(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reducedMotion, duration]);

  return reducedMotion ? target : display;
}

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  className?: string;
  style?: CSSProperties;
  reducedMotion: boolean;
}

const AnimatedNumber = memo(function AnimatedNumber({
  value,
  decimals = 1,
  className,
  style,
  reducedMotion,
}: AnimatedNumberProps) {
  const v = useTweenedNumber(value, reducedMotion);
  return (
    <span className={className} style={style}>
      {v.toFixed(decimals)}
    </span>
  );
});

// ---------------------------------------------------------------------------
// Mini Diagrams (Right Panel)
// ---------------------------------------------------------------------------
interface TukeyAxisProps {
  q1: number;
  q3: number;
  upperFence: number;
  testPoint: number;
  isOutlier: boolean;
  reducedMotion: boolean;
}

const TukeyAxisDiagram = memo(function TukeyAxisDiagram({
  q1,
  q3,
  upperFence,
  testPoint,
  isOutlier,
  reducedMotion,
}: TukeyAxisProps) {
  const span = TUKEY_MAX - TUKEY_MIN;
  const pos = (v: number) => Math.min(100, Math.max(0, ((v - TUKEY_MIN) / span) * 100));
  const dotLeft = `calc(${pos(testPoint)}% - 8px)`;
  const dotClass = `absolute -top-1 size-4 rounded-full border-2 shadow-sm ${
    isOutlier ? "bg-bad border-white" : "bg-accent border-white"
  }`;

  return (
    <div className="rounded-xl border border-rule bg-surface-hover p-4">
      <p className="text-xs font-semibold uppercase text-ink-muted">แผนภาพแกน 1 มิติ</p>
      <div
        className="relative mt-8 mb-4 h-12 flex items-center"
        role="img"
        aria-label={`แกน 1 มิติ รั้วบน ${upperFence.toFixed(1)} จุดทดสอบ ${testPoint.toFixed(1)}`}
      >
        <div className="w-full h-1 bg-rule-strong rounded-full" />
        {TUKEY_TICKS.map((t) => (
          <div
            key={t}
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${pos(t)}%` }}
            aria-hidden="true"
          >
            <div className="w-px h-2.5 bg-ink-subtle/60 mx-auto" />
            <span className="absolute top-3.5 -translate-x-1/2 left-1/2 text-xs font-mono text-ink-subtle tabular-nums">
              {t}
            </span>
          </div>
        ))}
        <div
          className="absolute h-5 rounded border border-accent bg-accent/20"
          style={{ left: `${pos(q1)}%`, width: `${Math.max(2, pos(q3) - pos(q1))}%` }}
          title={`IQR Box: [${q1}, ${q3}]`}
        >
          <span className="absolute -top-5 left-0 -translate-x-1/2 text-xs font-mono font-bold text-accent">
            Q1
          </span>
          <span className="absolute -top-5 right-0 translate-x-1/2 text-xs font-mono font-bold text-accent">
            Q3
          </span>
        </div>
        <div
          className="absolute -top-2 w-0.5 h-8 bg-warn z-10 rounded-full"
          style={{ left: `${pos(upperFence)}%` }}
        >
          <span className="absolute -top-5 -translate-x-1/2 text-xs font-mono text-warn font-bold whitespace-nowrap tabular-nums">
            Fence {upperFence.toFixed(1)}
          </span>
        </div>
        {reducedMotion ? (
          <div className={dotClass} style={{ left: dotLeft }} />
        ) : (
          <motion.div
            className={dotClass}
            initial={false}
            animate={{ left: dotLeft }}
            transition={SPRING_TACTILE}
          />
        )}
      </div>

      <div className="mt-5 flex items-center justify-between text-xs">
        <span className="text-ink-subtle">สถานะข้อมูล:</span>
        {isOutlier ? (
          <span className="inline-flex items-center gap-1 font-bold text-bad">
            <ExclamationTriangleIcon className="size-3.5" /> Outlier (เกินรั้ว{" "}
            <AnimatedNumber value={testPoint - upperFence} decimals={1} reducedMotion={reducedMotion} />)
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 font-bold text-good">
            <CheckCircledIcon className="size-3.5" /> Normal (อยู่ในเกณฑ์ปกติ)
          </span>
        )}
      </div>
    </div>
  );
});

interface GiniPanelProps {
  active: number;
  total: number;
  gini: number;
  reducedMotion: boolean;
}

const GiniPopulationPanel = memo(function GiniPopulationPanel({
  active,
  total,
  gini,
  reducedMotion,
}: GiniPanelProps) {
  const meterColor =
    gini === 0 ? "var(--color-good)" : gini >= 0.45 ? "var(--color-bad)" : "var(--color-warn)";

  return (
    <div className="rounded-xl border border-rule bg-surface-hover p-4">
      <p className="text-[11px] font-semibold uppercase text-ink-muted">สัดส่วนข้อมูลในโหนด</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i < active;
          return (
            <motion.div
              key={i}
              layout={!reducedMotion}
              transition={SPRING_TACTILE}
              className={`size-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold ${
                isActive ? "border-good bg-good-wash text-good" : "border-bad bg-bad-wash text-bad"
              }`}
            >
              {isActive ? "A" : "I"}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-rule">
        <div className="flex justify-between text-xs">
          <span className="text-ink-muted">ระดับความปนเปื้อน (Impurity):</span>
          <span className="font-mono font-bold tabular-nums" style={{ color: meterColor }}>
            <AnimatedNumber value={gini} decimals={3} reducedMotion={reducedMotion} />{" "}
            {gini === 0 ? "(Pure)" : gini >= 0.5 ? "(Max Impurity)" : ""}
          </span>
        </div>
        <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-rule-strong/40">
          {reducedMotion ? (
            <div
              className="h-full rounded-full"
              style={{ width: `${(gini / 0.5) * 100}%`, backgroundColor: meterColor }}
            />
          ) : (
            <motion.div
              className="h-full rounded-full"
              initial={false}
              animate={{ width: `${(gini / 0.5) * 100}%`, backgroundColor: meterColor }}
              transition={SPRING_TACTILE}
            />
          )}
        </div>
        <div className="mt-1 flex justify-between text-[11px] font-mono text-ink-subtle tabular-nums">
          <span>0.00 (บริสุทธิ์)</span>
          <span>0.25</span>
          <span>0.50 (ปนกันสูงสุด)</span>
        </div>
      </div>
    </div>
  );
});

interface ThresholdStripProps {
  posScores: number[];
  negScores: number[];
  threshold: number;
  tp: number;
  fp: number;
  fn: number;
  tn: number;
  reducedMotion: boolean;
}

const AXIS_MIN = 0.1;
const AXIS_MAX = 1.0;

const ThresholdStripDiagram = memo(function ThresholdStripDiagram({
  posScores,
  negScores,
  threshold,
  tp,
  fp,
  fn,
  tn,
  reducedMotion,
}: ThresholdStripProps) {
  const span = AXIS_MAX - AXIS_MIN;
  const pos = (v: number) => Math.min(100, Math.max(0, ((v - AXIS_MIN) / span) * 100));
  const tLeft = `${pos(threshold)}%`;

  const rows = [
    { label: "Actual Positive (ป่วยจริง)", scores: posScores, isPos: true },
    { label: "Actual Negative (ปกติ)", scores: negScores, isPos: false },
  ];
  const bars = [
    { label: "TP", count: tp, total: posScores.length, cls: "bg-teal-500", text: "text-teal-700 dark:text-teal-300" },
    { label: "FN", count: fn, total: posScores.length, cls: "bg-red-500", text: "text-red-700 dark:text-red-300" },
    { label: "FP", count: fp, total: negScores.length, cls: "bg-amber-500", text: "text-amber-700 dark:text-amber-300" },
    { label: "TN", count: tn, total: negScores.length, cls: "bg-slate-400", text: "text-slate-600 dark:text-slate-300" },
  ];

  return (
    <div className="rounded-xl border border-rule bg-surface-hover p-3.5 text-xs">
      <p className="text-[11px] font-semibold uppercase text-ink-muted pb-2 border-b border-rule">
        การแบ่งกลุ่มตามเกณฑ์ T (20 เคส)
      </p>
      <div className="relative mt-3 space-y-4 pb-5">
        {rows.map((row) => (
          <div key={row.label}>
            <p className="text-[10px] font-semibold text-ink-subtle mb-1">{row.label}</p>
            <div className="relative h-5 rounded-full bg-rule-strong/25">
              {row.scores.map((s) => {
                const predicted = s >= threshold;
                const color = row.isPos
                  ? predicted
                    ? "#0f766e"
                    : "#dc2626"
                  : predicted
                  ? COLOR_AMBER
                  : "#64748b";
                return (
                  <div
                    key={`${row.label}-${s}`}
                    title={`${s.toFixed(2)} -> ${row.isPos ? (predicted ? "TP" : "FN") : predicted ? "FP" : "TN"}`}
                    className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-white shadow-xs"
                    style={{
                      left: `calc(${pos(s)}% - 6px)`,
                      backgroundColor: color,
                      transition: reducedMotion ? undefined : "background-color 160ms ease",
                    }}
                  />
                );
              })}
              <div
                className="absolute -top-1 -bottom-1 w-0.5 rounded-full bg-accent z-10"
                style={{
                  left: tLeft,
                  transition: reducedMotion ? undefined : "left 160ms ease-out",
                }}
              />
            </div>
          </div>
        ))}
        <div className="absolute bottom-0 inset-x-0 flex justify-between text-xs font-mono text-ink-subtle tabular-nums">
          <span>0.1</span>
          <span className="font-bold text-accent">T = {threshold.toFixed(2)}</span>
          <span>1.0</span>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 border-t border-rule pt-3">
        {bars.map((b) => (
          <div key={b.label} className="flex items-center gap-2">
            <span className={`w-7 font-mono font-bold ${b.text}`}>{b.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-rule-strong/30">
              <div
                className={`h-full rounded-full ${b.cls}`}
                style={{
                  width: `${(b.count / b.total) * 100}%`,
                  transition: reducedMotion ? undefined : "width 180ms ease-out",
                }}
              />
            </div>
            <span className="w-8 text-right font-mono font-bold text-ink tabular-nums">{b.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

interface KMeansSVGProps {
  pt: { x: number; y: number; label: string };
  c: { x: number; y: number; label: string };
  mode: MetricMode;
  pointKey: string;
  targetKey: string;
}

const KMeansTriangleSVG = memo(function KMeansTriangleSVG({
  pt,
  c,
  mode,
  pointKey,
  targetKey,
}: KMeansSVGProps) {
  const W = 320;
  const H = 240;
  const PAD = 30;
  const X = (x: number) => PAD + (x / 10) * (W - 2 * PAD);
  const Y = (y: number) => H - PAD - (y / 12) * (H - 2 * PAD);

  const px = X(pt.x);
  const py = Y(pt.y);
  const cx = X(c.x);
  const cy = Y(c.y);
  const rx = X(c.x);
  const ry = Y(pt.y);
  const degenerate = pt.x === c.x && pt.y === c.y;
  const isEuclid = mode === "euclidean";
  const adx = Math.abs(pt.x - c.x);
  const ady = Math.abs(pt.y - c.y);

  const legOpacity = isEuclid ? 0.45 : 1;
  const hypOpacity = isEuclid ? 1 : 0.35;

  return (
    <div className="rounded-xl border border-rule bg-surface-hover p-3.5">
      <p className="text-[11px] font-semibold uppercase text-ink-muted pb-2">
        แผนภาพระยะทาง {pointKey} ไปยัง {targetKey} ({mode})
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`ระยะทางจาก ${pt.label} ถึง ${c.label}`}>
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`gx${i}`} x1={X(i)} y1={H - PAD} x2={X(i)} y2={PAD - 10} stroke="#94a3b8" strokeOpacity={0.25} strokeWidth={1} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`gy${i}`} x1={PAD} y1={Y(i * 2)} x2={W - PAD} y2={Y(i * 2)} stroke="#94a3b8" strokeOpacity={0.25} strokeWidth={1} />
        ))}
        {!degenerate && (
          <g>
            <line x1={px} y1={py} x2={rx} y2={ry} stroke="#2563eb" strokeWidth={isEuclid ? 2 : 3} strokeOpacity={legOpacity} strokeLinecap="round" />
            <line x1={rx} y1={ry} x2={cx} y2={cy} stroke={COLOR_AMBER} strokeWidth={isEuclid ? 2 : 3} strokeOpacity={legOpacity} strokeLinecap="round" />
            <line
              x1={px}
              y1={py}
              x2={cx}
              y2={cy}
              stroke="#7c3aed"
              strokeWidth={isEuclid ? 3 : 2}
              strokeOpacity={hypOpacity}
              strokeDasharray={isEuclid ? undefined : "6 4"}
              strokeLinecap="round"
            />
            {adx > 0 && ady > 0 && (
              <rect
                x={rx + (px > rx ? -9 : 1)}
                y={ry + (cy > ry ? -9 : 1)}
                width={8}
                height={8}
                fill="none"
                stroke="#64748b"
                strokeOpacity={0.8}
                strokeWidth={1.5}
              />
            )}
            {adx > 0 && (
              <text x={(px + rx) / 2} y={(py + ry) / 2 - 7} textAnchor="middle" fontSize={11} fontFamily="monospace" fontWeight="bold" fill="#2563eb">
                Δx={adx}
              </text>
            )}
            {ady > 0 && (
              <text x={(rx + cx) / 2 + 8} y={(ry + cy) / 2} textAnchor="start" fontSize={11} fontFamily="monospace" fontWeight="bold" fill={COLOR_AMBER}>
                Δy={ady}
              </text>
            )}
          </g>
        )}
        <circle cx={cx} cy={cy} r={8} fill={COLOR_AMBER} stroke="#fff" strokeWidth={2.5} />
        <text x={cx} y={cy - 13} textAnchor="middle" fontSize={11} fontFamily="monospace" fontWeight="bold" fill={COLOR_AMBER}>
          {targetKey}
        </text>
        <circle cx={px} cy={py} r={degenerate ? 9 : 7} fill="#2563eb" stroke="#fff" strokeWidth={2.5} />
        <text
          x={px + (px >= cx ? 11 : -11)}
          y={py + 4}
          textAnchor={px >= cx ? "start" : "end"}
          fontSize={11}
          fontFamily="monospace"
          fontWeight="bold"
          fill="#2563eb"
        >
          {pointKey}
        </text>
        {degenerate && (
          <text x={W / 2} y={PAD - 12} textAnchor="middle" fontSize={11} fontFamily="sans-serif" fill="currentColor" opacity={0.7}>
            จุดเดียวกับ Centroid (ระยะทาง = 0)
          </text>
        )}
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[10px] font-mono text-ink-subtle">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-0.5 w-3 bg-blue-600" /> Δx
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-0.5 w-3 bg-amber-600" /> Δy
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-0.5 w-3 bg-violet-600" /> Euclidean (L2)
        </span>
      </div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Typewriter Subtitle Overlay (Step 1 Anatomy Explanation)
// ---------------------------------------------------------------------------
function getGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    try {
      const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (s) => s.segment);
    } catch {
      // Fallback below
    }
  }
  return Array.from(text);
}

interface TypewriterSubtitleOverlayProps {
  chapters: AnatomyChapter[];
  chapterIndex: number;
  onSelectChapter: (idx: number) => void;
  autoAdvance: boolean;
  onComplete: () => void;
  reducedMotion: boolean;
}

function TypewriterSubtitleOverlay({
  chapters,
  chapterIndex,
  onSelectChapter,
  autoAdvance,
  onComplete,
  reducedMotion,
}: TypewriterSubtitleOverlayProps) {
  const current = chapters[chapterIndex] ?? chapters[0];
  const graphemes = useMemo(() => getGraphemes(current.text), [current.text]);
  const [charCount, setCharCount] = useState(() => (reducedMotion ? graphemes.length : 0));
  const [isPaused, setIsPaused] = useState(false);
  const [prevChapter, setPrevChapter] = useState(chapterIndex);

  if (prevChapter !== chapterIndex) {
    setPrevChapter(chapterIndex);
    setCharCount(reducedMotion ? graphemes.length : 0);
    setIsPaused(false);
  }

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) setIsPaused(true);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    if (charCount < graphemes.length) {
      const timer = setTimeout(() => {
        setCharCount((prev) => Math.min(prev + 1, graphemes.length));
      }, 28);
      return () => clearTimeout(timer);
    }
  }, [isPaused, charCount, graphemes.length, reducedMotion]);

  const isTypingDone = charCount >= graphemes.length;

  useEffect(() => {
    if (isPaused || !autoAdvance) return;
    const delay = reducedMotion ? AUTOPLAY_MS : isTypingDone ? 1100 : null;
    if (delay === null) return;

    const timer = setTimeout(() => {
      onCompleteRef.current();
    }, delay);
    return () => clearTimeout(timer);
  }, [isPaused, autoAdvance, isTypingDone, reducedMotion, chapterIndex]);

  const progress = graphemes.length > 0 ? charCount / graphemes.length : 1;
  const visibleText = graphemes.slice(0, charCount).join("");

  return (
    <div className="w-full max-w-xl mx-auto pt-4 pb-1 text-center select-none min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-rule text-xs text-ink-muted">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="size-2 rounded-full shrink-0"
            style={{ backgroundColor: current.color }}
          />
          <span
            className="font-bold text-xs sm:text-sm tracking-tight truncate"
            style={{ color: current.color }}
          >
            {current.badge}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          <div className="flex items-center gap-1">
            {chapters.map((ch, idx) => {
              const isCurrent = idx === chapterIndex;
              return (
                <button
                  key={ch.label}
                  type="button"
                  onClick={() => onSelectChapter(idx)}
                  className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition-all ${
                    isCurrent
                      ? "font-bold text-ink bg-surface-hover border-b-2"
                      : "text-ink-subtle hover:text-ink hover:bg-surface-hover/60"
                  }`}
                  style={isCurrent ? { borderColor: current.color } : undefined}
                >
                  {ch.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              if (!reducedMotion) {
                setCharCount(0);
                setIsPaused(false);
              }
            }}
            className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
            title="เล่นซ้ำ"
          >
            <ResetIcon className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
            title={isPaused ? "เล่นต่อ" : "หยุดชั่วคราว"}
          >
            {isPaused ? <PlayIcon className="size-3.5" /> : <PauseIcon className="size-3.5" />}
          </button>
        </div>
      </div>

      <div className="h-0.5 w-full bg-rule/70 overflow-hidden rounded-full" aria-hidden="true">
        <div
          className="h-full transition-[width] duration-150 ease-linear"
          style={{ width: `${Math.round(progress * 100)}%`, backgroundColor: current.color }}
        />
      </div>

      <div
        className="py-3 min-h-[64px] flex items-center justify-center cursor-pointer"
        onClick={() => setCharCount(graphemes.length)}
        title="คลิกเพื่อแสดงข้อความทั้งหมด"
      >
        <p className="text-sm sm:text-base leading-relaxed font-sans font-medium text-ink">
          {visibleText}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Formula 1: Tukey's Outlier
// ---------------------------------------------------------------------------
interface TukeyMorphProps {
  step: number;
  anatomySubstep: number;
  onSelectAnatomySubstep: (idx: number) => void;
  onAdvanceAnatomySubstep: (idx: number) => void;
  onNextStep: () => void;
  isPlaying: boolean;
  q1: number;
  q3: number;
  iqr: number;
  multiplier: number;
  fenceOffset: number;
  upperFence: number;
  testPoint: number;
  isOutlier: boolean;
  hoveredToken: string | null;
  onHoverToken: (t: string | null) => void;
  reducedMotion: boolean;
}

function TukeyMorphFormula({
  step,
  anatomySubstep,
  onSelectAnatomySubstep,
  onAdvanceAnatomySubstep,
  onNextStep,
  isPlaying,
  q1,
  q3,
  iqr,
  multiplier,
  fenceOffset,
  upperFence,
  testPoint,
  isOutlier,
  hoveredToken,
  onHoverToken,
  reducedMotion,
}: TukeyMorphProps) {
  const anim = reducedMotion ? NO_ANIM : undefined;

  const chapters: AnatomyChapter[] = useMemo(
    () => [
      {
        label: "1. Q₃",
        color: "#2563eb",
        badge: "Q₃ · ควอร์ไทล์ที่ 3 (75th Percentile)",
        text: "Q₃ คือจุดที่ข้อมูล 75% มีค่าน้อยกว่าหรือเท่ากับจุดนี้ ทำหน้าที่เป็นจุดตั้งต้นสำหรับคำนวณรั้วฝั่งบน (Upper Fence)",
      },
      {
        label: "2. IQR",
        color: COLOR_AMBER,
        badge: "IQR · Interquartile Range (Q₃ − Q₁)",
        text: `IQR คือผลต่าง Q₃ − Q₁ (${q3} − ${q1} = ${iqr.toFixed(1)}) แทนความกว้างของข้อมูล 50% ตรงกลาง นำมาคูณ 1.5 เพื่อกำหนดระยะรั้ว`,
      },
    ],
    [q1, q3, iqr]
  );

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xl sm:text-2xl font-medium tracking-tight">
        <span className="text-ink font-semibold">Upper Fence =</span>
        <TokenPill
          color="#2563eb"
          label="Q3 (ควอร์ไทล์ที่ 3)"
          ghost="Q₃"
          symbol="Q₃"
          value={q3.toFixed(1)}
          step={step}
          active={hoveredToken === "q3"}
          tokenKey="q3"
          onHoverToken={onHoverToken}
          reducedMotion={reducedMotion}
          isSpotlight={step === 1 && anatomySubstep === 0}
          dimmed={step === 1 && anatomySubstep !== 0}
          onClick={() => onSelectAnatomySubstep(0)}
        />
        <span className="text-ink-muted">+</span>
        <span className="rounded-lg border border-rule bg-surface-hover px-2.5 py-1 font-mono text-ink text-base sm:text-lg tabular-nums">
          {multiplier.toFixed(1)}
        </span>
        <span className="text-ink-muted">×</span>
        <TokenPill
          color={COLOR_AMBER}
          label="IQR (Q3 - Q1)"
          ghost="IQR"
          symbol="IQR"
          value={step === 2 ? `(${q3} − ${q1})` : iqr.toFixed(1)}
          step={step}
          active={hoveredToken === "iqr"}
          tokenKey="iqr"
          onHoverToken={onHoverToken}
          reducedMotion={reducedMotion}
          isSpotlight={step === 1 && anatomySubstep === 1}
          dimmed={step === 1 && anatomySubstep !== 1}
          onClick={() => onSelectAnatomySubstep(1)}
        />
      </div>

      <AnimatePresence mode="wait">
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            transition={anim ?? { duration: 0.2 }}
            className="space-y-3 pt-3 border-t border-rule/60 text-center font-mono"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base text-ink-muted tabular-nums">
              <span>=</span>
              <span className="text-blue-600 font-semibold">
                <AnimatedNumber value={q3} decimals={1} reducedMotion={reducedMotion} />
              </span>
              <span>+</span>
              <span className="text-amber-600 font-semibold">
                {step === 2 ? (
                  <>
                    {multiplier.toFixed(1)} ×{" "}
                    <AnimatedNumber value={iqr} decimals={1} reducedMotion={reducedMotion} />
                  </>
                ) : (
                  <AnimatedNumber value={fenceOffset} decimals={1} reducedMotion={reducedMotion} />
                )}
              </span>
            </div>

            {step >= 3 && (
              <motion.div
                initial={{ scale: reducedMotion ? 1 : 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={anim ?? SPRING_BADGE}
                className="inline-flex flex-wrap items-center gap-3 rounded-2xl border border-accent/40 bg-accent-wash px-5 py-2.5"
              >
                <span className="text-xs uppercase font-sans tracking-wider text-ink-muted font-bold">
                  Upper Fence:
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-accent-ink tracking-tight tabular-nums">
                  <AnimatedNumber value={upperFence} decimals={1} reducedMotion={reducedMotion} />
                </span>
              </motion.div>
            )}

            {step === 3 && (
              <div className="mt-3 rounded-xl border border-rule bg-surface-hover p-3 text-xs sm:text-sm font-sans flex flex-wrap items-center justify-center gap-2 tabular-nums">
                <span>จุดทดสอบ</span>
                <span className="font-mono font-bold text-ink">x = {testPoint.toFixed(1)}</span>
                <span>เทียบกับรั้ว</span>
                <span className="font-mono font-bold text-accent">{upperFence.toFixed(1)}:</span>
                {isOutlier ? (
                  <span className="font-bold text-bad bg-bad-wash px-2 py-0.5 rounded">
                    {testPoint.toFixed(1)} &gt; {upperFence.toFixed(1)} (เป็น Outlier)
                  </span>
                ) : (
                  <span className="font-bold text-good bg-good-wash px-2 py-0.5 rounded">
                    {testPoint.toFixed(1)} ≤ {upperFence.toFixed(1)} (ข้อมูลปกติ)
                  </span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {step === 1 && (
        <TypewriterSubtitleOverlay
          chapters={chapters}
          chapterIndex={anatomySubstep}
          onSelectChapter={onSelectAnatomySubstep}
          autoAdvance={isPlaying}
          onComplete={() => {
            if (!isPlaying) return;
            if (anatomySubstep < chapters.length - 1) {
              onAdvanceAnatomySubstep(anatomySubstep + 1);
            } else {
              onNextStep();
            }
          }}
          reducedMotion={reducedMotion}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Formula 2: Decision Tree Gini Impurity
// ---------------------------------------------------------------------------
interface GiniMorphProps {
  step: number;
  anatomySubstep: number;
  onSelectAnatomySubstep: (idx: number) => void;
  onAdvanceAnatomySubstep: (idx: number) => void;
  onNextStep: () => void;
  isPlaying: boolean;
  active: number;
  inactive: number;
  total: number;
  pActive: number;
  pInactive: number;
  pActiveSq: number;
  pInactiveSq: number;
  gini: number;
  hoveredToken: string | null;
  onHoverToken: (t: string | null) => void;
  reducedMotion: boolean;
}

function GiniMorphFormula({
  step,
  anatomySubstep,
  onSelectAnatomySubstep,
  onAdvanceAnatomySubstep,
  onNextStep,
  isPlaying,
  active,
  inactive,
  total,
  pActive,
  pInactive,
  pActiveSq,
  pInactiveSq,
  gini,
  hoveredToken,
  onHoverToken,
  reducedMotion,
}: GiniMorphProps) {
  const anim = reducedMotion ? NO_ANIM : undefined;

  const chapters: AnatomyChapter[] = useMemo(
    () => [
      {
        label: "1. Active",
        color: "#0f766e",
        badge: "p(Active) · สัดส่วนกลุ่ม Active",
        text: `p(Active) คือสัดส่วนของข้อมูลคลาส Active ในโหนดนี้ (${active}/${total} = ${pActive.toFixed(3)}) นำมายกกำลังสองเป็นพจน์แรก`,
      },
      {
        label: "2. Inactive",
        color: "#b91c1c",
        badge: "p(Inactive) · สัดส่วนกลุ่ม Inactive",
        text: `p(Inactive) คือสัดส่วนของข้อมูลคลาส Inactive (${inactive}/${total} = ${pInactive.toFixed(3)}) นำมายกกำลังสองแล้วบวกกับกลุ่มแรก ก่อนนำไปลบออกจาก 1`,
      },
    ],
    [active, inactive, total, pActive, pInactive]
  );

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xl sm:text-2xl font-medium tracking-tight">
        <span className="text-ink font-semibold">Gini = 1 − [</span>
        <div className="inline-flex items-center gap-0.5">
          <TokenPill
            color="#0f766e"
            label="p(Active)"
            ghost="pA"
            symbol={
              step === 0 ? (
                <>
                  p<sub>Active</sub>
                </>
              ) : (
                <span className="text-xs tabular-nums">
                  {active}/{total}
                </span>
              )
            }
            value={<AnimatedNumber value={pActive} decimals={3} reducedMotion={reducedMotion} />}
            step={step}
            active={hoveredToken === "pActive"}
            tokenKey="pActive"
            onHoverToken={onHoverToken}
            reducedMotion={reducedMotion}
            isSpotlight={step === 1 && anatomySubstep === 0}
            dimmed={step === 1 && anatomySubstep !== 0}
            onClick={() => onSelectAnatomySubstep(0)}
          />
          <sup className="text-sm font-bold text-ink-muted">2</sup>
        </div>
        <span className="text-ink-muted">+</span>
        <div className="inline-flex items-center gap-0.5">
          <TokenPill
            color="#b91c1c"
            label="p(Inactive)"
            ghost="pI"
            symbol={
              step === 0 ? (
                <>
                  p<sub>Inactive</sub>
                </>
              ) : (
                <span className="text-xs tabular-nums">
                  {inactive}/{total}
                </span>
              )
            }
            value={<AnimatedNumber value={pInactive} decimals={3} reducedMotion={reducedMotion} />}
            step={step}
            active={hoveredToken === "pInactive"}
            tokenKey="pInactive"
            onHoverToken={onHoverToken}
            reducedMotion={reducedMotion}
            isSpotlight={step === 1 && anatomySubstep === 1}
            dimmed={step === 1 && anatomySubstep !== 1}
            onClick={() => onSelectAnatomySubstep(1)}
          />
          <sup className="text-sm font-bold text-ink-muted">2</sup>
        </div>
        <span className="text-ink font-semibold">]</span>
      </div>

      <AnimatePresence mode="wait">
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            transition={anim ?? { duration: 0.2 }}
            className="space-y-3 pt-3 border-t border-rule/60 text-center font-mono"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base text-ink-muted tabular-nums">
              <span>= 1 − [</span>
              <span className="text-teal-600 font-semibold">
                <AnimatedNumber value={pActiveSq} decimals={3} reducedMotion={reducedMotion} />
              </span>
              <span>+</span>
              <span className="text-red-600 font-semibold">
                <AnimatedNumber value={pInactiveSq} decimals={3} reducedMotion={reducedMotion} />
              </span>
              <span>]</span>
              <span>
                = 1 − <AnimatedNumber value={pActiveSq + pInactiveSq} decimals={3} reducedMotion={reducedMotion} />
              </span>
            </div>

            {step >= 3 && (
              <motion.div
                initial={{ scale: reducedMotion ? 1 : 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={anim ?? SPRING_BADGE}
                className="inline-flex flex-wrap items-center gap-3 rounded-2xl border border-teal-500/40 bg-teal-500/10 px-6 py-2.5"
              >
                <span className="text-xs uppercase font-sans tracking-wider text-ink-muted font-bold">
                  Gini Impurity:
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 dark:text-teal-300 tracking-tight tabular-nums">
                  <AnimatedNumber value={gini} decimals={3} reducedMotion={reducedMotion} />
                </span>
                {gini === 0 && (
                  <span className="text-xs bg-teal-500/20 text-teal-700 dark:text-teal-300 font-sans font-bold px-2.5 py-0.5 rounded-full">
                    Pure Node (บริสุทธิ์)
                  </span>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {step === 1 && (
        <TypewriterSubtitleOverlay
          chapters={chapters}
          chapterIndex={anatomySubstep}
          onSelectChapter={onSelectAnatomySubstep}
          autoAdvance={isPlaying}
          onComplete={() => {
            if (!isPlaying) return;
            if (anatomySubstep < chapters.length - 1) {
              onAdvanceAnatomySubstep(anatomySubstep + 1);
            } else {
              onNextStep();
            }
          }}
          reducedMotion={reducedMotion}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Formula 3: Confusion Matrix & F1
// ---------------------------------------------------------------------------
interface ConfusionMorphProps {
  step: number;
  anatomySubstep: number;
  onSelectAnatomySubstep: (idx: number) => void;
  onAdvanceAnatomySubstep: (idx: number) => void;
  onNextStep: () => void;
  isPlaying: boolean;
  tp: number;
  fp: number;
  fn: number;
  precision: number;
  recall: number;
  f1: number;
  hoveredToken: string | null;
  onHoverToken: (t: string | null) => void;
  reducedMotion: boolean;
}

function ConfusionMorphFormula({
  step,
  anatomySubstep,
  onSelectAnatomySubstep,
  onAdvanceAnatomySubstep,
  onNextStep,
  isPlaying,
  tp,
  fp,
  fn,
  precision,
  recall,
  f1,
  hoveredToken,
  onHoverToken,
  reducedMotion,
}: ConfusionMorphProps) {
  const anim = reducedMotion ? NO_ANIM : undefined;

  const chapters: AnatomyChapter[] = useMemo(
    () => [
      {
        label: "1. TP",
        color: "#0f766e",
        badge: "TP · True Positive (ทายบวกถูกต้อง)",
        text: `TP คือจำนวนเคสที่ป่วยจริงและโมเดลทายว่าป่วย (${tp} คน) เป็นตัวตั้งหลักของทั้ง Precision และ Recall`,
      },
      {
        label: "2. FP",
        color: COLOR_AMBER,
        badge: "FP · False Positive (ผลบวกลวง)",
        text: `FP คือจำนวนคนปกติแต่โมเดลทายผิดว่าป่วย (${fp} คน) เป็นตัวหารในสูตร Precision ยิ่งมีมากความแม่นยำยิ่งลดลง`,
      },
      {
        label: "3. FN",
        color: "#b91c1c",
        badge: "FN · False Negative (ผลลบลวง)",
        text: `FN คือจำนวนคนป่วยจริงแต่โมเดลตรวจไม่พบ (${fn} คน) เป็นตัวหารในสูตร Recall ซึ่งสำคัญมากในการคัดกรองโรค`,
      },
    ],
    [tp, fp, fn]
  );

  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* Precision Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl font-medium tracking-tight">
        <span className="font-bold text-ink">Precision =</span>
        <div className="inline-flex flex-col items-center">
          <TokenPill
            color="#0f766e"
            label="TP"
            ghost="TP"
            symbol="TP"
            value={tp}
            step={step}
            active={hoveredToken === "tp"}
            tokenKey="tp"
            onHoverToken={onHoverToken}
            reducedMotion={reducedMotion}
            isSpotlight={step === 1 && anatomySubstep === 0}
            dimmed={step === 1 && anatomySubstep !== 0}
            onClick={() => onSelectAnatomySubstep(0)}
          />
          <span className="w-full border-b-2 border-current my-1" />
          <div className="inline-flex items-center gap-1">
            <TokenPill
              color="#0f766e"
              label="TP"
              ghost="TP"
              symbol="TP"
              value={tp}
              step={step}
              active={hoveredToken === "tp"}
              tokenKey="tp"
              onHoverToken={onHoverToken}
              reducedMotion={reducedMotion}
              isSpotlight={step === 1 && anatomySubstep === 0}
              dimmed={step === 1 && anatomySubstep !== 0}
              onClick={() => onSelectAnatomySubstep(0)}
            />
            <span className="text-ink-muted text-sm">+</span>
            <TokenPill
              color={COLOR_AMBER}
              label="FP"
              ghost="FP"
              symbol="FP"
              value={fp}
              step={step}
              active={hoveredToken === "fp"}
              tokenKey="fp"
              onHoverToken={onHoverToken}
              reducedMotion={reducedMotion}
              isSpotlight={step === 1 && anatomySubstep === 1}
              dimmed={step === 1 && anatomySubstep !== 1}
              onClick={() => onSelectAnatomySubstep(1)}
            />
          </div>
        </div>
        {step >= 2 && (
          <motion.span
            initial={{ opacity: 0, x: reducedMotion ? 0 : -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={anim ?? { duration: 0.2 }}
            className="font-mono text-ink-muted text-sm sm:text-base ml-2 tabular-nums"
          >
            = {tp}/{tp + fp} ={" "}
            <strong className="text-teal-600 font-bold">
              <AnimatedNumber value={precision * 100} decimals={1} reducedMotion={reducedMotion} />%
            </strong>
          </motion.span>
        )}
      </div>

      {/* Recall Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2.5 border-t border-rule/50 text-lg sm:text-xl font-medium tracking-tight">
        <span className="font-bold text-ink">Recall =</span>
        <div className="inline-flex flex-col items-center">
          <TokenPill
            color="#0f766e"
            label="TP"
            ghost="TP"
            symbol="TP"
            value={tp}
            step={step}
            active={hoveredToken === "tp"}
            tokenKey="tp"
            onHoverToken={onHoverToken}
            reducedMotion={reducedMotion}
            isSpotlight={step === 1 && anatomySubstep === 0}
            dimmed={step === 1 && anatomySubstep !== 0}
            onClick={() => onSelectAnatomySubstep(0)}
          />
          <span className="w-full border-b-2 border-current my-1" />
          <div className="inline-flex items-center gap-1">
            <TokenPill
              color="#0f766e"
              label="TP"
              ghost="TP"
              symbol="TP"
              value={tp}
              step={step}
              active={hoveredToken === "tp"}
              tokenKey="tp"
              onHoverToken={onHoverToken}
              reducedMotion={reducedMotion}
              isSpotlight={step === 1 && anatomySubstep === 0}
              dimmed={step === 1 && anatomySubstep !== 0}
              onClick={() => onSelectAnatomySubstep(0)}
            />
            <span className="text-ink-muted text-sm">+</span>
            <TokenPill
              color="#b91c1c"
              label="FN"
              ghost="FN"
              symbol="FN"
              value={fn}
              step={step}
              active={hoveredToken === "fn"}
              tokenKey="fn"
              onHoverToken={onHoverToken}
              reducedMotion={reducedMotion}
              isSpotlight={step === 1 && anatomySubstep === 2}
              dimmed={step === 1 && anatomySubstep !== 2}
              onClick={() => onSelectAnatomySubstep(2)}
            />
          </div>
        </div>
        {step >= 2 && (
          <motion.span
            initial={{ opacity: 0, x: reducedMotion ? 0 : -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={anim ?? { duration: 0.2 }}
            className="font-mono text-ink-muted text-sm sm:text-base ml-2 tabular-nums"
          >
            = {tp}/{tp + fn} ={" "}
            <strong className="text-teal-600 font-bold">
              <AnimatedNumber value={recall * 100} decimals={1} reducedMotion={reducedMotion} />%
            </strong>
          </motion.span>
        )}
      </div>

      {step >= 3 && (
        <motion.div
          initial={{ scale: reducedMotion ? 1 : 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={anim ?? SPRING_BADGE}
          className="pt-2 text-center"
        >
          <div className="inline-flex flex-wrap items-center gap-3 rounded-2xl border border-purple-500/40 bg-purple-500/10 px-6 py-2.5">
            <span className="text-xs uppercase font-sans tracking-wider text-ink-muted font-bold">
              F1-Score:
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-700 dark:text-purple-300 font-mono tracking-tight tabular-nums">
              <AnimatedNumber value={f1} decimals={3} reducedMotion={reducedMotion} />
            </span>
            <span className="text-xs text-ink-muted font-mono">(2 × P × R / (P + R))</span>
          </div>
        </motion.div>
      )}

      {step === 1 && (
        <TypewriterSubtitleOverlay
          chapters={chapters}
          chapterIndex={anatomySubstep}
          onSelectChapter={onSelectAnatomySubstep}
          autoAdvance={isPlaying}
          onComplete={() => {
            if (!isPlaying) return;
            if (anatomySubstep < chapters.length - 1) {
              onAdvanceAnatomySubstep(anatomySubstep + 1);
            } else {
              onNextStep();
            }
          }}
          reducedMotion={reducedMotion}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Formula 4: K-Means Distance
// ---------------------------------------------------------------------------
interface KMeansMorphProps {
  step: number;
  anatomySubstep: number;
  onSelectAnatomySubstep: (idx: number) => void;
  onAdvanceAnatomySubstep: (idx: number) => void;
  onNextStep: () => void;
  isPlaying: boolean;
  pt: { x: number; y: number; label: string };
  c: { x: number; y: number; label: string };
  dx: number;
  dy: number;
  distEuclidean: number;
  distManhattan: number;
  mode: MetricMode;
  hoveredToken: string | null;
  onHoverToken: (t: string | null) => void;
  reducedMotion: boolean;
}

function KMeansMorphFormula({
  step,
  anatomySubstep,
  onSelectAnatomySubstep,
  onAdvanceAnatomySubstep,
  onNextStep,
  isPlaying,
  pt,
  c,
  dx,
  dy,
  distEuclidean,
  distManhattan,
  mode,
  hoveredToken,
  onHoverToken,
  reducedMotion,
}: KMeansMorphProps) {
  const isEuclid = mode === "euclidean";
  const anim = reducedMotion ? NO_ANIM : undefined;

  const chapters: AnatomyChapter[] = useMemo(
    () => [
      {
        label: "1. พิกัดจุด",
        color: "#2563eb",
        badge: "(xₚ, yₚ) · พิกัดจุดข้อมูล",
        text: `พิกัด (xₚ, yₚ) คือตำแหน่งของจุดข้อมูล ${pt.label} (xₚ = ${pt.x}, yₚ = ${pt.y}) ที่ต้องการคำนวณระยะห่าง`,
      },
      {
        label: "2. Centroid",
        color: COLOR_AMBER,
        badge: "(cₓ, cᵧ) · พิกัดจุดศูนย์กลางกลุ่ม",
        text: `พิกัด (cₓ, cᵧ) คือตำแหน่งของ ${c.label} (cₓ = ${c.x}, cᵧ = ${c.y}) นำมาหาผลต่างตามแนวแกนได้ Δx = ${Math.abs(dx)} และ Δy = ${Math.abs(dy)}`,
      },
    ],
    [pt, c, dx, dy]
  );

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xl sm:text-2xl font-medium tracking-tight">
        <span className="text-ink font-semibold">{isEuclid ? "d(p, c) = √[" : "d(p, c) = "}</span>

        <div className="inline-flex items-center gap-0.5">
          {isEuclid ? "(" : "|"}
          <TokenPill
            color="#2563eb"
            label="x_p"
            ghost="xₚ"
            symbol="xₚ"
            value={pt.x}
            step={step}
            active={hoveredToken === "xp"}
            tokenKey="xp"
            onHoverToken={onHoverToken}
            reducedMotion={reducedMotion}
            isSpotlight={step === 1 && anatomySubstep === 0}
            dimmed={step === 1 && anatomySubstep !== 0}
            onClick={() => onSelectAnatomySubstep(0)}
          />
          <span className="text-ink-muted text-base">−</span>
          <TokenPill
            color={COLOR_AMBER}
            label="c_x"
            ghost="cₓ"
            symbol="cₓ"
            value={c.x}
            step={step}
            active={hoveredToken === "cx"}
            tokenKey="cx"
            onHoverToken={onHoverToken}
            reducedMotion={reducedMotion}
            isSpotlight={step === 1 && anatomySubstep === 1}
            dimmed={step === 1 && anatomySubstep !== 1}
            onClick={() => onSelectAnatomySubstep(1)}
          />
          {isEuclid ? (
            <>
              )<sup>2</sup>
            </>
          ) : (
            "|"
          )}
        </div>

        <span className="text-ink-muted">+</span>

        <div className="inline-flex items-center gap-0.5">
          {isEuclid ? "(" : "|"}
          <TokenPill
            color="#2563eb"
            label="y_p"
            ghost="yₚ"
            symbol="yₚ"
            value={pt.y}
            step={step}
            active={hoveredToken === "yp"}
            tokenKey="yp"
            onHoverToken={onHoverToken}
            reducedMotion={reducedMotion}
            isSpotlight={step === 1 && anatomySubstep === 0}
            dimmed={step === 1 && anatomySubstep !== 0}
            onClick={() => onSelectAnatomySubstep(0)}
          />
          <span className="text-ink-muted text-base">−</span>
          <TokenPill
            color={COLOR_AMBER}
            label="c_y"
            ghost="cᵧ"
            symbol="cᵧ"
            value={c.y}
            step={step}
            active={hoveredToken === "cy"}
            tokenKey="cy"
            onHoverToken={onHoverToken}
            reducedMotion={reducedMotion}
            isSpotlight={step === 1 && anatomySubstep === 1}
            dimmed={step === 1 && anatomySubstep !== 1}
            onClick={() => onSelectAnatomySubstep(1)}
          />
          {isEuclid ? (
            <>
              )<sup>2</sup>
            </>
          ) : (
            "|"
          )}
        </div>

        <span className="text-ink font-semibold">{isEuclid ? "]" : ""}</span>
      </div>

      <AnimatePresence mode="wait">
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            transition={anim ?? { duration: 0.2 }}
            className="space-y-3 pt-3 border-t border-rule/60 text-center font-mono"
          >
            {isEuclid ? (
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-base text-ink-muted tabular-nums">
                <span>= √[({dx})² + ({dy})²]</span>
                <span>= √[{dx ** 2} + {dy ** 2}]</span>
                <span>= √{dx ** 2 + dy ** 2}</span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-base text-ink-muted tabular-nums">
                <span>= |{dx}| + |{dy}|</span>
                <span>= {Math.abs(dx)} + {Math.abs(dy)}</span>
              </div>
            )}

            {step >= 3 && (
              <motion.div
                initial={{ scale: reducedMotion ? 1 : 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={anim ?? SPRING_BADGE}
                className="inline-flex flex-wrap items-center gap-3 rounded-2xl border border-blue-500/40 bg-blue-500/10 px-6 py-2.5"
              >
                <span className="text-xs uppercase font-sans tracking-wider text-ink-muted font-bold">
                  Distance ({mode}):
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight tabular-nums">
                  <AnimatedNumber
                    value={isEuclid ? distEuclidean : distManhattan}
                    decimals={isEuclid ? 3 : 1}
                    reducedMotion={reducedMotion}
                  />
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {step === 1 && (
        <TypewriterSubtitleOverlay
          chapters={chapters}
          chapterIndex={anatomySubstep}
          onSelectChapter={onSelectAnatomySubstep}
          autoAdvance={isPlaying}
          onComplete={() => {
            if (!isPlaying) return;
            if (anatomySubstep < chapters.length - 1) {
              onAdvanceAnatomySubstep(anatomySubstep + 1);
            } else {
              onNextStep();
            }
          }}
          reducedMotion={reducedMotion}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared TokenPill Component
// ---------------------------------------------------------------------------
interface TokenPillProps {
  color: string;
  label: string;
  ghost: string;
  symbol: ReactNode;
  value: ReactNode;
  step: number;
  active: boolean;
  tokenKey: string;
  onHoverToken: (t: string | null) => void;
  reducedMotion: boolean;
  isSpotlight?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
}

const TokenPill = memo(function TokenPill({
  color,
  label,
  ghost,
  symbol,
  value,
  step,
  active,
  tokenKey,
  onHoverToken,
  reducedMotion,
  isSpotlight = false,
  dimmed = false,
  onClick,
}: TokenPillProps) {
  const morphed = step >= 2;
  const effectiveBorder = dimmed ? "var(--color-rule-strong)" : color;
  const effectiveColor = dimmed ? "var(--color-ink-muted)" : color;
  const effectiveBg = dimmed
    ? "var(--color-surface-hover)"
    : `color-mix(in srgb, ${color} ${isSpotlight ? "18%" : "10%"}, transparent)`;

  return (
    <span
      className={`relative inline-flex flex-col items-center cursor-pointer outline-none transition-opacity duration-200 ${
        dimmed ? "opacity-40 grayscale" : "opacity-100"
      }`}
      onClick={onClick}
      onMouseEnter={() => onHoverToken(tokenKey)}
      onMouseLeave={() => onHoverToken(null)}
      onFocus={() => onHoverToken(tokenKey)}
      onBlur={() => onHoverToken(null)}
      tabIndex={0}
      title={label}
    >
      <motion.span
        layout={reducedMotion ? false : "position"}
        animate={{ scale: isSpotlight && !reducedMotion ? 1.06 : 1 }}
        transition={reducedMotion ? NO_ANIM : SPRING_TACTILE}
        className="relative inline-flex items-center justify-center rounded-xl border px-3 py-1 font-mono text-base sm:text-lg font-bold shadow-xs transition-colors duration-200"
        style={{
          borderColor: effectiveBorder,
          color: effectiveColor,
          backgroundColor: effectiveBg,
          boxShadow: isSpotlight
            ? `0 0 0 3px color-mix(in srgb, ${color} 45%, transparent)`
            : active
            ? `0 0 0 2px color-mix(in srgb, ${color} 50%, transparent)`
            : undefined,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={morphed ? "number" : "symbol"}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -4 }}
            transition={reducedMotion ? NO_ANIM : { duration: 0.15 }}
            className="relative z-10 tabular-nums"
          >
            {morphed ? value : symbol}
          </motion.span>
        </AnimatePresence>
      </motion.span>
      <span className="flex h-4 items-center" aria-hidden="true">
        <AnimatePresence initial={false}>
          {morphed && (
            <motion.span
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={reducedMotion ? NO_ANIM : { duration: 0.2 }}
              className="text-[10px] font-sans font-bold uppercase tracking-wider dark:brightness-150"
              style={{ color }}
            >
              {ghost}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
});
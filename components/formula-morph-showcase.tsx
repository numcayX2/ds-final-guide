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

// ---------------------------------------------------------------------------
// Shared constants (module scope: zero per-render allocation)
// ---------------------------------------------------------------------------
const AUTOPLAY_MS = 2800;

// Tactile, organic springs: soft enough to feel physical, damped enough to
// never overshoot into layout jitter. Badges slightly snappier for emphasis.
const SPRING_TACTILE = { type: "spring" as const, stiffness: 270, damping: 28, mass: 0.9 };
const SPRING_BADGE = { type: "spring" as const, stiffness: 300, damping: 24, mass: 0.9 };
const NO_ANIM = { duration: 0 } as const;

const STEP_LABELS = [
  "1. โครงสร้างสูตร (Symbolic)",
  "2. ชำแหละตัวแปร (Anatomy)",
  "3. แทนค่าสด (Substitution)",
  "4. ตัดทอนคำนวณ (Reduction & Verdict)",
];

const TOPICS: { key: FormulaTopic; label: string }[] = [
  { key: "tukey", label: "📊 1. Tukey's Outlier (Lect 05)" },
  { key: "gini", label: "🌿 2. Decision Tree Gini (Lect 07)" },
  { key: "confusion", label: "🎯 3. Confusion Matrix & F1 (Lect 08)" },
  { key: "kmeans", label: "📍 4. K-Means Distance (Lect 08-09)" },
];

// Exam dataset (Lect 08): 10 actual-positive + 10 actual-negative scores.
const POS_SCORES = [0.35, 0.42, 0.52, 0.58, 0.65, 0.72, 0.78, 0.82, 0.88, 0.94];
const NEG_SCORES = [0.12, 0.18, 0.25, 0.31, 0.38, 0.45, 0.53, 0.59, 0.64, 0.71];

// Lecture points (Lect 09) + centroids.
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

export function FormulaMorphShowcase() {
  const [topic, setTopic] = useState<FormulaTopic>("tukey");
  const [step, setStep] = useState<number>(0);
  const [anatomySubstep, setAnatomySubstep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hoveredToken, setHoveredToken] = useState<string | null>(null);

  // 1. Tukey State (Lect 05)
  const [q1, setQ1] = useState<number>(22);
  const [q3, setQ3] = useState<number>(30);
  const multiplier = 1.5; // Locked to 1.5 as per exam syllabus
  const [testPoint, setTestPoint] = useState<number>(45);

  // 2. Gini State (Lect 07)
  const [activeCustomers, setActiveCustomers] = useState<number>(5);
  const totalCustomers = 6;

  // 3. Confusion Matrix State (Lect 08)
  const [threshold, setThreshold] = useState<number>(0.5); // 0.2 to 0.8

  // 4. K-Means State (Lect 08-09)
  const [selectedPointKey, setSelectedPointKey] = useState<string>("A2");
  const [metricMode, setMetricMode] = useState<"euclidean" | "manhattan">("euclidean");
  const [targetCentroid, setTargetCentroid] = useState<"C1" | "C2">("C2");

  const reducedMotion = Boolean(useReducedMotion());
  const totalSteps = 4;

  // ---- Memoized computations: slider ticks re-render, but never recompute
  // more than the slice that changed. ---------------------------------------
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
    return { inactive, pActive, pInactive, pActiveSq, pInactiveSq, gini: 1 - (pActiveSq + pInactiveSq) };
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

  // ---- Stable callbacks: memoized pills + step controls keep their identity
  // so slider ticks never re-render the formula tree from new fn ids.
  const handleHoverToken = useCallback((t: string | null) => setHoveredToken(t), []);

  const handleSelectTopic = useCallback((newTopic: FormulaTopic) => {
    setTopic(newTopic);
    setStep(0);
    setAnatomySubstep(0);
    setIsPlaying(false);
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
  }, [topic]);

  // Auto-play driver for Step 0, 2, 3 (timeout chain, one step per tick).
  // In Step 1 (Anatomy), TypewriterSubtitleOverlay owns the pacing and
  // auto-advances to Step 2 when done. Chained setTimeout (not setInterval)
  // so each tick re-arms from the settled step — no updater side effects.
  useEffect(() => {
    if (!isPlaying) return;
    if (step === 1) return; // TypewriterSubtitleOverlay drives Step 1
    if (step >= totalSteps - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setAnatomySubstep(0);
      setStep(step + 1);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [isPlaying, step, totalSteps]);

  // Pause autoplay when browser tab is hidden to avoid background throttling desync
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && isPlaying) {
        setIsPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isPlaying]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="space-y-4 sm:space-y-5">
        {/* 4 Topic Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-rule bg-surface p-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-rule bg-surface-hover p-1">
            {TOPICS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => handleSelectTopic(t.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  topic === t.key ? "bg-surface text-accent shadow-xs" : "text-ink-muted hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-surface-hover px-2.5 py-1.5 text-xs font-medium text-ink-muted hover:text-ink transition-colors"
              title="รีเซ็ตค่าเริ่มต้นทั้งหมด"
            >
              <ResetIcon className="size-3.5" /> รีเซ็ตสูตร
            </button>
          </div>
        </div>

        {/* Main Display Board */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Left: Formula Stage (Hero Animation) */}
          <div className="lg:col-span-8 flex flex-col rounded-2xl border border-rule bg-surface p-4 sm:p-6 shadow-xs">
            <div>
              {/* Stage Tag */}
              <div className="flex items-center justify-between pb-3 border-b border-rule">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent-ink">
                  <span className={`size-2 rounded-full bg-accent ${reducedMotion ? "" : "animate-pulse"}`} />
                  {STEP_LABELS[step]}
                  {step === 1 && (
                    <span className="text-[11px] font-normal text-accent-ink/80">
                      ({anatomySubstep + 1}/{topic === "confusion" ? 3 : 2})
                    </span>
                  )}
                </span>
                <span className="text-xs text-ink-subtle">
                  {step === 0 && "สูตรเชิงสัญลักษณ์พร้อม Color Tokens"}
                  {step === 1 && (
                    topic === "tukey"
                      ? (anatomySubstep === 0 ? "🔵 ลำดับ 1: อธิบาย Q₃ (สีฟ้า)" : "🟠 ลำดับ 2: อธิบาย IQR (สีส้ม)")
                      : topic === "gini"
                      ? (anatomySubstep === 0 ? "🟢 ลำดับ 1: อธิบาย p(Active)" : "🔴 ลำดับ 2: อธิบาย p(Inactive)")
                      : topic === "confusion"
                      ? (anatomySubstep === 0 ? "🟢 ลำดับ 1: ผลบวกจริง TP (เขียว)" : anatomySubstep === 1 ? "🟠 ลำดับ 2: ผลบวกลวง FP (ส้ม)" : "🔴 ลำดับ 3: ผลลบลวง FN (แดง)")
                      : (anatomySubstep === 0 ? "🔵 ลำดับ 1: พิกัดจุดข้อมูล (สีฟ้า)" : "🟠 ลำดับ 2: พิกัด Centroid (สีส้ม)")
                  )}
                  {step === 2 && "Morph สัญลักษณ์กลายเป็นตัวเลขจริง"}
                  {step === 3 && "คำนวณตัดทอนจนได้ผลลัพธ์สุทธิ"}
                </span>
              </div>

              {/* Formula Morphing Area */}
              <div className="py-4 sm:py-6 flex items-center justify-center">
                {topic === "tukey" && (
                  <TukeyMorphFormula
                    step={step}
                    anatomySubstep={anatomySubstep}
                    onSelectAnatomySubstep={setAnatomySubstep}
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
                    onHoverToken={handleHoverToken}
                    reducedMotion={reducedMotion}
                  />
                )}
                {topic === "gini" && (
                  <GiniMorphFormula
                    step={step}
                    anatomySubstep={anatomySubstep}
                    onSelectAnatomySubstep={setAnatomySubstep}
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
                    onHoverToken={handleHoverToken}
                    reducedMotion={reducedMotion}
                  />
                )}
                {topic === "confusion" && (
                  <ConfusionMorphFormula
                    step={step}
                    anatomySubstep={anatomySubstep}
                    onSelectAnatomySubstep={setAnatomySubstep}
                    onNextStep={handleAdvanceToStep2}
                    isPlaying={isPlaying}
                    tp={cm.tp}
                    fp={cm.fp}
                    fn={cm.fn}
                    tn={cm.tn}
                    precision={cm.precision}
                    recall={cm.recall}
                    f1={cm.f1}
                    threshold={threshold}
                    hoveredToken={hoveredToken}
                    onHoverToken={handleHoverToken}
                    reducedMotion={reducedMotion}
                  />
                )}
                {topic === "kmeans" && (
                  <KMeansMorphFormula
                    step={step}
                    anatomySubstep={anatomySubstep}
                    onSelectAnatomySubstep={setAnatomySubstep}
                    onNextStep={handleAdvanceToStep2}
                    isPlaying={isPlaying}
                    pt={km.pt}
                    c={km.c}
                    dx={km.dx}
                    dy={km.dy}
                    distEuclidean={km.distEuclidean}
                    distManhattan={km.distManhattan}
                    mode={metricMode}
                    targetCentroid={targetCentroid}
                    hoveredToken={hoveredToken}
                    onHoverToken={handleHoverToken}
                    reducedMotion={reducedMotion}
                  />
                )}
              </div>
            </div>

            {/* Stepper Timeline Buttons + Player Controls (Positioned directly above the 4 step tabs) */}
            <div className="border-t border-rule pt-3 mt-1 space-y-2.5">
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
                    style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                  />
                )}
              </div>

              {/* Player Controller Row: Play/Pause Button + Step Trackers */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!isPlaying && step >= totalSteps - 1) {
                      setStep(0);
                      setAnatomySubstep(0);
                    }
                    setIsPlaying((p) => !p);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent-wash px-3 py-1.5 text-xs sm:text-sm font-semibold text-accent-ink hover:bg-accent/15 transition-all shadow-xs"
                >
                  {isPlaying ? (
                    <>
                      <PauseIcon className="size-3.5 sm:size-4" /> พักแอนิเมชัน
                    </>
                  ) : (
                    <>
                      <PlayIcon className="size-3.5 sm:size-4" /> เล่นแบบคลิปอัตโนมัติ
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <span className="font-mono text-xs text-ink-muted mr-1 hidden sm:inline">
                    ขั้นที่ {step + 1} จาก {totalSteps}
                  </span>
                  <button
                    type="button"
                    disabled={step === 0}
                    onClick={() => { setIsPlaying(false); setStep((s) => Math.max(0, s - 1)); setAnatomySubstep(0); }}
                    className="rounded-lg border border-rule p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover disabled:opacity-30 transition-colors"
                    title="ย้อนกลับ 1 ขั้น"
                  >
                    <TrackPreviousIcon className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={step === totalSteps - 1}
                    onClick={() => { setIsPlaying(false); setStep((s) => Math.min(totalSteps - 1, s + 1)); setAnatomySubstep(0); }}
                    className="rounded-lg border border-rule p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover disabled:opacity-30 transition-colors"
                    title="ถัดไป 1 ขั้น"
                  >
                    <TrackNextIcon className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* 4 Step Timeline Tabs */}
              <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                {STEP_LABELS.map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => { setIsPlaying(false); setStep(idx); setAnatomySubstep(0); }}
                    className={`flex flex-col items-center gap-0.5 rounded-lg px-1.5 py-1.5 text-center text-xs font-medium transition-all ${
                      step === idx
                        ? "bg-accent-wash text-accent-ink border border-accent/40 font-semibold shadow-xs"
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

          {/* Right: Live Interactive Sandbox & Diagram Link */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 rounded-2xl border border-rule bg-surface p-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-rule">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink">🎛️ Live Parameter Sensitivity</h3>
                <span className="text-xs text-ink-subtle">ปรับค่าสด</span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                เมื่อลากเลื่อนค่าด้านล่าง ตัวเลขในสมการฝั่งซ้ายจะ{" "}
                <strong className="text-ink">คำนวณและ Morph ทันที</strong> สะท้อนคณิตศาสตร์แบบ Real-time:
              </p>

              {/* Topic 1: Tukey Sandbox */}
              {topic === "tukey" && (
                <div className="mt-5 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-accent-ink font-semibold">จุดทดสอบ x (Data Point)</span>
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded tabular-nums ${
                          tukey.isOutlier ? "bg-bad-wash text-bad" : "bg-surface-hover text-ink"
                        }`}
                      >
                        <AnimatedNumber
                          value={testPoint}
                          decimals={1}
                          reducedMotion={reducedMotion}
                        />
                      </span>
                    </div>
                    <input
                      type="range"
                      min={TUKEY_MIN}
                      max={TUKEY_MAX}
                      step={0.5}
                      value={testPoint}
                      onChange={(e) => setTestPoint(Number(e.target.value))}
                      aria-label="จุดทดสอบ x เทียบกับรั้วบน"
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
                      aria-label="ควอร์ไทล์ที่ 3"
                      className="mt-2 w-full accent-accent cursor-pointer"
                    />
                  </div>

                  {/* Multiplier locked to 1.5 */}
                  <div className="rounded-xl border border-rule bg-surface-hover/80 p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-ink">ตัวคูณ Tukey Multiplier</span>
                      <span className="rounded-md border border-warn/40 bg-warn/10 px-2 py-0.5 font-mono font-bold text-warn">
                        1.5 × IQR
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11px] text-ink-subtle leading-relaxed">
                      🔒 <strong>กับดักข้อสอบ:</strong> ใช้ 1.5 (Inner Fence) เสมอ — อย่าหยิบ 3.0 (Outer Fence ไม่ออกสอบ)
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

              {/* Topic 2: Gini Sandbox */}
              {topic === "gini" && (
                <div className="mt-5 space-y-5">
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
                      aria-label="จำนวนลูกค้ากลุ่ม Active"
                      className="mt-2 w-full accent-good cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-ink-subtle">
                      <span>0 Active (Pure I)</span>
                      <span>3 Active (ปนกันครึ่งๆ 0.5)</span>
                      <span>6 Active (Pure A)</span>
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

              {/* Topic 3: Confusion Matrix Sandbox */}
              {topic === "confusion" && (
                <div className="mt-5 space-y-5">
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
                      aria-label="เกณฑ์ตัดสินใจ Threshold"
                      className="mt-2 w-full accent-accent cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-ink-subtle">
                      <span>0.20 (ระแวงสูง: Recall สูง)</span>
                      <span>0.80 (เข้มงวด: Precision สูง)</span>
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

                  {/* 2x2 Matrix Table Mini Diagram */}
                  <div className="mt-4 rounded-xl border border-rule bg-surface-hover p-3.5 text-xs">
                    <p className="text-[11px] font-semibold uppercase text-ink-muted pb-2 border-b border-rule">
                      Confusion Matrix (N = 20)
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-center">
                      <div className="rounded-lg border border-teal-500/30 bg-teal-500/10 p-2">
                        <span className="text-[10px] text-ink-subtle block font-sans">True Positive</span>
                        <strong className="text-base text-teal-700 dark:text-teal-300 tabular-nums">TP = {cm.tp}</strong>
                      </div>
                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2">
                        <span className="text-[10px] text-ink-subtle block font-sans">False Positive</span>
                        <strong className="text-base text-amber-700 dark:text-amber-300 tabular-nums">
                          FP = {cm.fp}
                        </strong>
                      </div>
                      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2">
                        <span className="text-[10px] text-ink-subtle block font-sans">False Negative</span>
                        <strong className="text-base text-red-700 dark:text-red-300 tabular-nums">FN = {cm.fn}</strong>
                      </div>
                      <div className="rounded-lg border border-slate-500/30 bg-slate-500/10 p-2">
                        <span className="text-[10px] text-ink-subtle block font-sans">True Negative</span>
                        <strong className="text-base text-slate-700 dark:text-slate-300 tabular-nums">TN = {cm.tn}</strong>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-ink-subtle">
                      🎯 <strong>กับดัก:</strong> T ต่ำ → จับคนป่วยครบ (Recall↑) แต่ทายผิดเยอะ (Precision↓) — F1 คือ
                      harmonic mean ไม่ใช่ค่าเฉลี่ยธรรมดา
                    </p>
                  </div>
                </div>
              )}

              {/* Topic 4: K-Means Sandbox */}
              {topic === "kmeans" && (
                <div className="mt-5 space-y-5">
                  <div>
                    <label className="text-xs font-semibold text-ink block mb-1.5">เลือกจุดข้อมูลจากข้อสอบจริง:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {Object.entries(POINTS).map(([k, p]) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setSelectedPointKey(k)}
                          className={`rounded-lg border px-2.5 py-1.5 text-xs font-mono transition-all ${
                            selectedPointKey === k
                              ? "border-accent bg-accent-wash text-accent-ink font-bold shadow-xs"
                              : "border-rule bg-surface hover:bg-surface-hover text-ink-muted"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-ink block mb-1.5">เปรียบเทียบระยะทางกับ Centroid:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setTargetCentroid("C1")}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-mono transition-all ${
                          targetCentroid === "C1"
                            ? "border-blue-500 bg-blue-500/15 text-blue-700 dark:text-blue-300 font-bold shadow-xs"
                            : "border-rule bg-surface text-ink-muted hover:bg-surface-hover"
                        }`}
                      >
                        C1 (2, 10)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTargetCentroid("C2")}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-mono transition-all ${
                          targetCentroid === "C2"
                            ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold shadow-xs"
                            : "border-rule bg-surface text-ink-muted hover:bg-surface-hover"
                        }`}
                      >
                        C2 (5, 8)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-ink block mb-1.5">
                      ฟังก์ชันวัดระยะทาง (Distance Metric):
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setMetricMode("euclidean")}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs transition-all ${
                          metricMode === "euclidean"
                            ? "border-accent bg-accent text-on-accent font-semibold"
                            : "border-rule bg-surface text-ink-muted hover:bg-surface-hover"
                        }`}
                      >
                        📐 Euclidean (L2)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMetricMode("manhattan")}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs transition-all ${
                          metricMode === "manhattan"
                            ? "border-accent bg-accent text-on-accent font-semibold"
                            : "border-rule bg-surface text-ink-muted hover:bg-surface-hover"
                        }`}
                      >
                        🏙️ Manhattan (L1)
                      </button>
                    </div>
                  </div>

                  <KMeansTriangleSVG pt={km.pt} c={km.c} mode={metricMode} pointKey={selectedPointKey} targetKey={targetCentroid} />

                  {/* Distance Comparison Card */}
                  <div className="rounded-xl border border-rule bg-surface-hover p-3 text-xs space-y-1.5 font-mono">
                    <p className="font-sans font-semibold text-ink text-[11px] uppercase">
                      เปรียบเทียบระยะสู่ C1 vs C2 ({metricMode}):
                    </p>
                    <div className="flex justify-between pt-1 tabular-nums">
                      <span>
                        d({selectedPointKey}, C1):
                      </span>
                      <strong className="text-blue-600">
                        <AnimatedNumber
                          value={metricMode === "euclidean" ? km.d1Euclid : km.d1Manhattan}
                          decimals={metricMode === "euclidean" ? 3 : 1}
                          reducedMotion={reducedMotion}
                        />
                      </strong>
                    </div>
                    <div className="flex justify-between tabular-nums">
                      <span>
                        d({selectedPointKey}, C2):
                      </span>
                      <strong className="text-amber-600">
                        <AnimatedNumber
                          value={metricMode === "euclidean" ? km.d2Euclid : km.d2Manhattan}
                          decimals={metricMode === "euclidean" ? 3 : 1}
                          reducedMotion={reducedMotion}
                        />
                      </strong>
                    </div>
                    <div className="pt-2 border-t border-rule font-sans text-[11px] text-ink-muted">
                      {metricMode === "euclidean"
                        ? km.d1Euclid < km.d2Euclid
                          ? "✨ ใกล้ C1 มากกว่า → อยู่ Cluster 1"
                          : "✨ ใกล้ C2 มากกว่า → อยู่ Cluster 2"
                        : km.d1Manhattan < km.d2Manhattan
                        ? "✨ ใกล้ C1 มากกว่า → อยู่ Cluster 1"
                        : "✨ ใกล้ C2 มากกว่า → อยู่ Cluster 2"}
                    </div>
                    {selectedPointKey === "A2" && (
                      <div className="rounded-lg border border-warn/40 bg-warn/10 p-2 font-sans text-[11px] leading-relaxed text-ink">
                        🪤 <strong>กับดักข้อสอบ:</strong> A2 → Euclid ใกล้ C2 (
                        <span className="font-mono font-bold tabular-nums">
                          <AnimatedNumber value={km.d2Euclid} decimals={3} reducedMotion={reducedMotion} /> {"<"}{" "}
                          <AnimatedNumber value={km.d1Euclid} decimals={3} reducedMotion={reducedMotion} />
                        </span>
                        ) แต่ Manhattan ใกล้ C1 (
                        <span className="font-mono font-bold tabular-nums">
                          <AnimatedNumber value={km.d1Manhattan} decimals={0} reducedMotion={reducedMotion} /> {"<"}{" "}
                          <AnimatedNumber value={km.d2Manhattan} decimals={0} reducedMotion={reducedMotion} />
                        </span>
                        ) — เมตริกพลิกคำตอบ
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={resetAll}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-rule px-3 py-2 text-xs font-medium text-ink-muted hover:border-rule-strong hover:text-ink transition-colors"
            >
              <ResetIcon className="size-3.5" /> รีเซ็ตค่าเริ่มต้นตามสไลด์
            </button>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

// -------------------------------------------------------------
// Number ticker: eased rAF interpolation toward the live target.
// Isolated per instance → slider scrub re-renders only the digits,
// never the formula tree. Reduced-motion returns the target as-is.
// -------------------------------------------------------------
function useTweenedNumber(target: number, reducedMotion: boolean, duration = 200): number {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);

  useEffect(() => {
    if (reducedMotion) {
      displayRef.current = target;
      setDisplay(target);
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

  return display;
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

// -------------------------------------------------------------
// Tukey 1D axis: tick marks, IQR box, glowing fence, springy dot.
// -------------------------------------------------------------
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
    <div className="mt-6 rounded-xl border border-rule bg-surface-hover p-4">
      <p className="text-[11px] font-semibold uppercase text-ink-muted">แผนภาพระนาบ 1 มิติ (Mini Axis)</p>
      <div className="relative mt-7 h-10 flex items-center" role="img" aria-label={`แกน 1 มิติ รั้วบน ${upperFence.toFixed(1)} จุดทดสอบ ${testPoint.toFixed(1)}`}>
        <div className="w-full h-1 bg-rule-strong rounded-full" />
        {/* Tick marks at 20 / 30 / 40 / 50 */}
        {TUKEY_TICKS.map((t) => (
          <div key={t} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${pos(t)}%` }} aria-hidden="true">
            <div className="w-px h-2.5 bg-ink-subtle/60 mx-auto" />
            <span className="absolute top-3 -translate-x-1/2 left-1/2 text-[9px] font-mono text-ink-subtle tabular-nums">
              {t}
            </span>
          </div>
        ))}
        {/* IQR box */}
        <div
          className="absolute h-4 rounded border border-accent bg-accent/20"
          style={{ left: `${pos(q1)}%`, width: `${Math.max(1.5, pos(q3) - pos(q1))}%` }}
          title={`IQR Box: [${q1}, ${q3}]`}
        >
          <span className="absolute -bottom-4 left-0 -translate-x-1/2 text-[9px] font-mono font-bold text-accent">
            Q1
          </span>
          <span className="absolute -bottom-4 right-0 translate-x-1/2 text-[9px] font-mono font-bold text-accent">
            Q3
          </span>
        </div>
        {/* Glowing fence boundary */}
        <div
          className="absolute -top-1.5 w-0.5 h-7 bg-warn z-10 rounded-full"
          style={{
            left: `${pos(upperFence)}%`,
            boxShadow: "0 0 14px 2px color-mix(in srgb, var(--color-warn) 65%, transparent)",
          }}
        >
          <span className="absolute -top-4 -translate-x-1/2 text-[9px] font-mono text-warn font-bold whitespace-nowrap tabular-nums">
            Fence {upperFence.toFixed(1)}
          </span>
        </div>
        {reducedMotion ? (
          <div className={dotClass} style={{ left: dotLeft }} />
        ) : (
          <motion.div className={dotClass} initial={false} animate={{ left: dotLeft }} transition={SPRING_TACTILE} />
        )}
      </div>

      <div className="mt-5 flex items-center justify-between text-xs">
        <span className="text-ink-subtle">สถานะจุด:</span>
        {isOutlier ? (
          <span className="inline-flex items-center gap-1 font-bold text-bad">
            <ExclamationTriangleIcon className="size-3.5" /> Outlier! (เกินรั้ว{" "}
            <span className="tabular-nums">
              <AnimatedNumber value={testPoint - upperFence} decimals={1} reducedMotion={reducedMotion} />
            </span>
            )
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 font-bold text-good">
            <CheckCircledIcon className="size-3.5" /> Normal (Inlier)
          </span>
        )}
      </div>
    </div>
  );
});

// -------------------------------------------------------------
// Gini population panel: dots + animated impurity meter (0 → 0.5).
// -------------------------------------------------------------
interface GiniPanelProps {
  active: number;
  total: number;
  gini: number;
  reducedMotion: boolean;
}

const GiniPopulationPanel = memo(function GiniPopulationPanel({ active, total, gini, reducedMotion }: GiniPanelProps) {
  const meterColor = gini === 0 ? "var(--color-good)" : gini >= 0.45 ? "var(--color-bad)" : "var(--color-warn)";
  return (
    <div className="mt-6 rounded-xl border border-rule bg-surface-hover p-4">
      <p className="text-[11px] font-semibold uppercase text-ink-muted">การกระจายตัวของประชากร</p>
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

      {/* Impurity meter: full bar = 0.5 (2-class max — the exam trap) */}
      <div className="mt-4 pt-3 border-t border-rule">
        <div className="flex justify-between text-xs">
          <span className="text-ink-muted">Impurity Meter:</span>
          <span className="font-mono font-bold tabular-nums" style={{ color: meterColor }}>
            <AnimatedNumber value={gini} decimals={3} reducedMotion={reducedMotion} />{" "}
            {gini === 0 ? "✨ Pure!" : gini >= 0.5 ? "⚡ Maximally Mixed" : ""}
          </span>
        </div>
        <div
          className="relative mt-2 h-2 overflow-hidden rounded-full bg-rule-strong/40"
          role="img"
          aria-label={`Gini impurity ${gini.toFixed(3)} จากสูงสุด 0.5`}
        >
          {reducedMotion ? (
            <div className="h-full rounded-full" style={{ width: `${(gini / 0.5) * 100}%`, backgroundColor: meterColor }} />
          ) : (
            <motion.div
              className="h-full rounded-full"
              initial={false}
              animate={{ width: `${(gini / 0.5) * 100}%`, backgroundColor: meterColor }}
              transition={SPRING_TACTILE}
            />
          )}
        </div>
        <div className="mt-1 flex justify-between text-[9px] font-mono text-ink-subtle tabular-nums">
          <span>0 (Pure)</span>
          <span>0.25</span>
          <span>0.5 (ปนครึ่งๆ = สูงสุด)</span>
        </div>
      </div>
    </div>
  );
});

// -------------------------------------------------------------
// Threshold strip: 20 exam cases as dots on a score axis; the T line
// visibly re-sorts them into TP/FN vs FP/TN + population bars.
// -------------------------------------------------------------
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
    { label: "Actual ⊕ (ป่วยจริง)", scores: posScores, isPos: true },
    { label: "Actual ⊖ (ไม่ป่วย)", scores: negScores, isPos: false },
  ];
  const bars = [
    { label: "TP", count: tp, total: posScores.length, cls: "bg-teal-500", text: "text-teal-700 dark:text-teal-300" },
    { label: "FN", count: fn, total: posScores.length, cls: "bg-red-500", text: "text-red-700 dark:text-red-300" },
    { label: "FP", count: fp, total: negScores.length, cls: "bg-amber-500", text: "text-amber-700 dark:text-amber-300" },
    { label: "TN", count: tn, total: negScores.length, cls: "bg-slate-400", text: "text-slate-600 dark:text-slate-300" },
  ];

  return (
    <div className="mt-4 rounded-xl border border-rule bg-surface-hover p-3.5 text-xs">
      <p className="text-[11px] font-semibold uppercase text-ink-muted pb-2 border-b border-rule">
        เกณฑ์ T กวาดแยก 20 เคส (ดูจุดย้ายฝั่ง)
      </p>
      <div
        className="relative mt-3 space-y-4 pb-5"
        role="img"
        aria-label={`เคสที่เกณฑ์ ${threshold.toFixed(2)}: TP ${tp} FN ${fn} FP ${fp} TN ${tn}`}
      >
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
                  ? "#d97706"
                  : "#64748b";
                return (
                  <div
                    key={`${row.label}-${s}`}
                    title={`${s.toFixed(2)} → ${row.isPos ? (predicted ? "TP" : "FN") : predicted ? "FP" : "TN"}`}
                    className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-white shadow-xs"
                    style={{
                      left: `calc(${pos(s)}% - 6px)`,
                      backgroundColor: color,
                      transition: reducedMotion ? undefined : "background-color 160ms ease",
                    }}
                  />
                );
              })}
              {/* Threshold line spanning both rows */}
              <div
                className="absolute -top-1 -bottom-1 w-0.5 rounded-full bg-accent z-10"
                style={{
                  left: tLeft,
                  boxShadow: "0 0 10px 1px color-mix(in srgb, var(--color-accent) 60%, transparent)",
                  transition: reducedMotion ? undefined : "left 160ms ease-out",
                }}
              />
            </div>
          </div>
        ))}
        <div className="absolute bottom-0 flex justify-between text-[9px] font-mono text-ink-subtle tabular-nums" style={{ left: 0, right: 0 }}>
          <span>0.1</span>
          <span className="font-bold text-accent">T = {threshold.toFixed(2)}</span>
          <span>1.0</span>
        </div>
      </div>

      {/* Population bars */}
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

// -------------------------------------------------------------
// K-Means right-triangle: Δx run (blue) × Δy rise (amber), hypotenuse
// for Euclidean vs L-path for Manhattan.
// -------------------------------------------------------------
interface KMeansSVGProps {
  pt: { x: number; y: number; label: string };
  c: { x: number; y: number; label: string };
  mode: "euclidean" | "manhattan";
  pointKey: string;
  targetKey: string;
}

const KMeansTriangleSVG = memo(function KMeansTriangleSVG({ pt, c, mode, pointKey, targetKey }: KMeansSVGProps) {
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
        สามเหลี่ยมระยะทาง {pointKey} → {targetKey} ({mode})
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`สามเหลี่ยมระยะทางจาก ${pt.label} ถึง ${c.label}`}>
        <title>{`Δx = ${adx}, Δy = ${ady}`}</title>
        {/* Grid */}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`gx${i}`} x1={X(i)} y1={H - PAD} x2={X(i)} y2={PAD - 10} stroke="#94a3b8" strokeOpacity={0.25} strokeWidth={1} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`gy${i}`} x1={PAD} y1={Y(i * 2)} x2={W - PAD} y2={Y(i * 2)} stroke="#94a3b8" strokeOpacity={0.25} strokeWidth={1} />
        ))}
        {!degenerate && (
          <g style={{ transition: "opacity 180ms ease" }}>
            {/* Δx run: point → corner */}
            <line x1={px} y1={py} x2={rx} y2={ry} stroke="#2563eb" strokeWidth={isEuclid ? 2 : 3} strokeOpacity={legOpacity} strokeLinecap="round" />
            {/* Δy rise: corner → centroid */}
            <line x1={rx} y1={ry} x2={cx} y2={cy} stroke="#d97706" strokeWidth={isEuclid ? 2 : 3} strokeOpacity={legOpacity} strokeLinecap="round" />
            {/* Hypotenuse */}
            <line
              x1={px} y1={py} x2={cx} y2={cy}
              stroke="#7c3aed" strokeWidth={isEuclid ? 3 : 2} strokeOpacity={hypOpacity}
              strokeDasharray={isEuclid ? undefined : "6 4"} strokeLinecap="round"
            />
            {/* Right-angle marker */}
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
            {/* Leg labels */}
            {adx > 0 && (
              <text x={(px + rx) / 2} y={(py + ry) / 2 - 7} textAnchor="middle" fontSize={11} fontFamily="monospace" fontWeight="bold" fill="#2563eb">
                Δx={adx}
              </text>
            )}
            {ady > 0 && (
              <text x={(rx + cx) / 2 + 8} y={(ry + cy) / 2} textAnchor="start" fontSize={11} fontFamily="monospace" fontWeight="bold" fill="#d97706">
                Δy={ady}
              </text>
            )}
          </g>
        )}
        {/* Centroid */}
        <circle cx={cx} cy={cy} r={8} fill="#d97706" stroke="#fff" strokeWidth={2.5} />
        <text x={cx} y={cy - 13} textAnchor="middle" fontSize={11} fontFamily="monospace" fontWeight="bold" fill="#d97706">
          {targetKey}
        </text>
        {/* Data point */}
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
            จุดตรงกับ centroid — ระยะ 0
          </text>
        )}
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[10px] font-mono text-ink-subtle">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-0.5 w-4 bg-blue-600" /> Δx run
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-0.5 w-4 bg-amber-600" /> Δy rise
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-0.5 w-4 bg-violet-600" /> {isEuclid ? "เส้นตรง (Euclid)" : "เส้นตรง (อ้างอิง)"}
        </span>
        {!isEuclid && (
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-0.5 w-4 bg-blue-600" /> + <span className="inline-block h-0.5 w-4 bg-amber-600" />{" "}
            เส้นหักมุม (Manhattan)
          </span>
        )}
      </div>
    </div>
  );
});

// -------------------------------------------------------------
// Typewriter Subtitle Overlay (Character-by-Character Streaming)
// Types out subtitle text letter-by-letter like video closed captions.
// Features:
// - Intl.Segmenter Thai grapheme splitting (keeps tone marks & vowels intact)
// - Character-by-character typing with blinking cursor
// - Translucent obsidian glass backdrop (bg-neutral-950/92 backdrop-blur-md)
// - Crisp, high-contrast white text (ZERO blurry neon glow)
// - Micro hairline timeline scrubber along the bottom edge
// - Minimalist video controls: replay ↺, play/pause ⏯, chapter scrubbers
// - Automatic smooth transition to the next color when typing finishes!
// -------------------------------------------------------------
function getGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    try {
      const segmenter = new (Intl as any).Segmenter("th", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (s: any) => s.segment);
    } catch {
      // fallback
    }
  }
  return Array.from(text);
}

interface TypewriterSubtitleOverlayProps {
  glowColor: string;
  badgeText: string;
  speakerTag?: string;
  text: string;
  isActive: boolean;
  autoAdvance?: boolean;
  onComplete: () => void;
  chapterIndex: number;
  totalChapters: number;
  chapterLabels: string[];
  onSelectChapter?: (idx: number) => void;
  reducedMotion: boolean;
  onNextStep?: () => void;
}

function TypewriterSubtitleOverlay({
  glowColor,
  badgeText,
  speakerTag,
  text,
  isActive,
  autoAdvance = true,
  onComplete,
  chapterIndex,
  totalChapters,
  chapterLabels,
  onSelectChapter,
  reducedMotion,
  onNextStep,
}: TypewriterSubtitleOverlayProps) {
  const graphemes = useMemo(() => getGraphemes(text), [text]);
  const [charCount, setCharCount] = useState(() => (reducedMotion ? getGraphemes(text).length : 0));
  const [isPaused, setIsPaused] = useState(false);
  // Stable callback ref: parents pass inline onComplete arrows (new identity
  // per render from slider/hover state). Without this, the ticker effect
  // below would cancel + re-arm the 28ms / 1.1s timers on every unrelated
  // re-render (visible typing stall while scrubbing sliders).
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  // Reset only on chapter switch (NOT on text identity): the IQR/Gini/TP
  // subtitles embed live slider values, so resetting on `text` restarts
  // typing on every slider tick and traps scrubbers in a retype loop.
  // Live value edits clamp instead (see ticker effect).
  useEffect(() => {
    setCharCount(reducedMotion ? graphemes.length : 0);
    setIsPaused(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterIndex, reducedMotion]);

  // Pause typing when document is hidden (background tab) to avoid timer pileup
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // 1) Typewriter streaming ticker: advances 1 grapheme per 28ms
  useEffect(() => {
    if (!isActive || isPaused || reducedMotion) return;
    if (charCount < graphemes.length) {
      const timer = setTimeout(() => {
        setCharCount((prev) => Math.min(prev + 1, graphemes.length));
      }, 28);
      return () => clearTimeout(timer);
    }
  }, [isActive, isPaused, charCount, graphemes.length, reducedMotion]);

  // 2) Auto-advance ticker: triggers after sentence typing completes (1.1s reading pause)
  // or paced AUTOPLAY_MS under reducedMotion. Decoupled from charCount ticking so it never self-cancels.
  const isTypingDone = charCount >= graphemes.length;

  useEffect(() => {
    if (!isActive || isPaused || !autoAdvance) return;

    if (reducedMotion) {
      const timer = setTimeout(() => {
        onCompleteRef.current();
      }, AUTOPLAY_MS);
      return () => clearTimeout(timer);
    }

    if (isTypingDone) {
      const timer = setTimeout(() => {
        onCompleteRef.current();
      }, 1100); // 1.1s natural pause to read complete sentence before advancing to next color
      return () => clearTimeout(timer);
    }
  }, [isActive, isPaused, autoAdvance, isTypingDone, reducedMotion, chapterIndex]);

  const handleReplay = () => {
    if (reducedMotion) return; // full text already shown; replay is a no-op
    setCharCount(0);
    setIsPaused(false);
  };

  const handleSkipToEnd = () => {
    setCharCount(graphemes.length);
  };
  // Render window: settled prefix as one static node, kinetic spring pop only
  // for the trailing few graphemes. Keeps the tactile feel with ~8 live
  // motion nodes instead of ~150 simultaneous springs on long Thai sentences.
  const POP_WINDOW = 8;
  const popStart = Math.max(0, charCount - POP_WINDOW);
  const staticPrefix = graphemes.slice(0, popStart).join("");
  const popChars = graphemes.slice(popStart, charCount);
  const progress = graphemes.length > 0 ? charCount / graphemes.length : 1;

  return (
    <div className="w-full max-w-xl mx-auto pt-4 sm:pt-5 pb-1 text-center select-none">
      {/* Clean Topic Header & Controls (Native to website style, no black box, no CC frame) */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-rule text-xs text-ink-muted">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="size-2 rounded-full shrink-0 animate-pulse"
            style={{ backgroundColor: glowColor }}
          />
          <span className="font-bold text-xs sm:text-sm tracking-tight truncate" style={{ color: glowColor }}>
            {badgeText}
          </span>
          {speakerTag && (
            <span className="hidden sm:inline-block text-[11px] text-ink-subtle shrink-0">
              ({speakerTag})
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {/* Chapter dots / pills */}
          <div className="flex items-center gap-1">
            {chapterLabels.map((label, idx) => {
              const isCurrent = idx === chapterIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectChapter?.(idx)}
                  className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition-all ${
                    isCurrent
                      ? "font-bold text-ink bg-surface-hover border-b-2"
                      : "text-ink-subtle hover:text-ink hover:bg-surface-hover/60"
                  }`}
                  style={isCurrent ? { borderColor: glowColor } : undefined}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleReplay}
            className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
            title="พิมพ์ซ้ำตั้งแต่ต้น"
          >
            <ResetIcon className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
            title={isPaused ? "พิมพ์ต่อ" : "พักการพิมพ์"}
          >
            {isPaused ? <PlayIcon className="size-3.5" /> : <PauseIcon className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* Micro hairline timeline: reading progress toward the 1.1s auto-advance */}
      <div className="h-px w-full bg-rule/70" aria-hidden="true">
        <div
          className="h-full transition-[width] duration-150 ease-linear"
          style={{ width: `${Math.round(progress * 100)}%`, backgroundColor: glowColor }}
        />
      </div>

      {/* Kinetic Pop Typing Subtitle Text */}
      <div
        className="py-2.5 sm:py-3 min-h-[58px] sm:min-h-[66px] flex items-center justify-center cursor-pointer"
        onClick={handleSkipToEnd}
        title="คลิกเพื่อแสดงข้อความทั้งหมดทันที"
      >
        <p className="text-base sm:text-lg leading-relaxed font-sans font-medium tracking-normal text-center text-ink" aria-live="off">
          {staticPrefix && <span className="inline">{staticPrefix}</span>}
          {popChars.map((char, i) => {
            const idx = popStart + i;
            if (char === " ") {
              return (
                <span key={idx} className="inline" style={{ whiteSpace: "pre" }}>
                  {" "}
                </span>
              );
            }
            return reducedMotion ? (
              <span key={idx} className="inline-block">
                {char}
              </span>
            ) : (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.65, y: 3 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 520,
                  damping: 22,
                  mass: 0.5,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Component 1: Tukey's Formula with Smooth Morph Transition
// -------------------------------------------------------------
interface TukeyMorphProps {
  step: number;
  anatomySubstep: number;
  onSelectAnatomySubstep: (idx: number) => void;
  onNextStep?: () => void;
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

  return (
    <div className="w-full max-w-2xl space-y-3.5">
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
          dimmed={step === 1 && anatomySubstep > 0}
          onClick={() => onSelectAnatomySubstep(0)}
        />
        <span className="text-ink-muted">+</span>
        <span className="rounded-lg border border-rule bg-surface-hover px-2.5 py-1 font-mono text-ink text-base sm:text-lg tabular-nums">
          {multiplier.toFixed(1)}
        </span>
        <span className="text-ink-muted">×</span>
        <TokenPill
          color="#d97706"
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
          dimmed={step === 1 && anatomySubstep === 0}
          onClick={() => onSelectAnatomySubstep(1)}
        />
      </div>

      <AnimatePresence mode="wait">
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
            transition={anim ?? { duration: 0.22 }}
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
                    {multiplier.toFixed(1)} × <AnimatedNumber value={iqr} decimals={1} reducedMotion={reducedMotion} />
                  </>
                ) : (
                  <AnimatedNumber value={fenceOffset} decimals={1} reducedMotion={reducedMotion} />
                )}
              </span>
            </div>

            {step >= 3 && (
              <motion.div
                initial={{ scale: reducedMotion ? 1 : 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={anim ?? SPRING_BADGE}
                className="inline-flex flex-wrap items-center gap-3 rounded-2xl border border-accent/40 bg-accent-wash px-5 py-3 shadow-xs"
              >
                <span className="text-xs uppercase font-sans tracking-wider text-ink-muted font-bold">รั้วบนสุทธิ:</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-accent-ink tracking-tight tabular-nums">
                  <AnimatedNumber value={upperFence} decimals={1} reducedMotion={reducedMotion} />
                </span>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={anim ?? { delay: 0.15, duration: 0.22 }}
                className="mt-4 rounded-xl border border-rule bg-surface-hover p-3 text-xs sm:text-sm font-sans flex flex-wrap items-center justify-center gap-2 tabular-nums"
              >
                <span>ทดสอบจุด</span>
                <span className="font-mono font-bold text-ink">
                  x = <AnimatedNumber value={testPoint} decimals={1} reducedMotion={reducedMotion} />
                </span>
                <span>เทียบกับรั้ว</span>
                <span className="font-mono font-bold text-accent">
                  <AnimatedNumber value={upperFence} decimals={1} reducedMotion={reducedMotion} />
                </span>
                <span>:</span>
                {isOutlier ? (
                  <span className="font-bold text-bad bg-bad-wash px-2 py-0.5 rounded tabular-nums">
                    {testPoint.toFixed(1)} &gt; {upperFence.toFixed(1)} → 🚨 จัดเป็น Outlier!
                  </span>
                ) : (
                  <span className="font-bold text-good bg-good-wash px-2 py-0.5 rounded tabular-nums">
                    {testPoint.toFixed(1)} ≤ {upperFence.toFixed(1)} → ปกติ (ไม่ใช่ Outlier)
                  </span>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {step === 1 && (
        <AnimatePresence mode="wait" initial={false}>
          {anatomySubstep === 0 ? (
            <TypewriterSubtitleOverlay
              key="sub-q3"
              glowColor="#2563eb"
              badgeText="Q₃ · ควอร์ไทล์ที่ 3 (75th Percentile)"
              speakerTag="สีฟ้าสว่างขึ้นก่อน"
              text="Q₃ คือ ควอร์ไทล์ที่ 3 (75th Percentile) จุดตัดที่ข้อมูล 75% กองอยู่ฝั่งซ้าย ทำหน้าที่เป็น 'หมุดตั้งต้น' เพื่อเริ่มปักเสารั้วบน (Upper Fence)"
              isActive={true}
              autoAdvance={true}
              onComplete={() => onSelectAnatomySubstep(1)}
              chapterIndex={0}
              totalChapters={2}
              chapterLabels={["1. Q₃ (สีฟ้า)", "2. IQR (สีส้ม)"]}
              onSelectChapter={onSelectAnatomySubstep}
              reducedMotion={reducedMotion}
            />
          ) : (
            <TypewriterSubtitleOverlay
              key="sub-iqr"
              glowColor="#d97706"
              badgeText="IQR · Interquartile Range (Q₃ − Q₁)"
              speakerTag="สีส้มสว่างตามมา"
              text={`IQR คือ Interquartile Range ส่วนต่าง Q₃ − Q₁ (${q3} − ${q1} = ${iqr.toFixed(1)}) แทนความกว้าง 50% ตรงกลาง นำไปคูณ 1.5 เท่า แล้วยืดรั้วออกจากหมุด Q₃`}
              isActive={true}
              autoAdvance={isPlaying}
              onComplete={() => (isPlaying ? onNextStep?.() : undefined)}
              chapterIndex={1}
              totalChapters={2}
              chapterLabels={["1. Q₃ (สีฟ้า)", "2. IQR (สีส้ม)"]}
              onSelectChapter={onSelectAnatomySubstep}
              reducedMotion={reducedMotion}
              onNextStep={onNextStep}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Component 2: Gini Formula with Smooth Morph Transition
// -------------------------------------------------------------
interface GiniMorphProps {
  step: number;
  anatomySubstep: number;
  onSelectAnatomySubstep: (idx: number) => void;
  onNextStep?: () => void;
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
  return (
    <div className="w-full max-w-2xl space-y-3.5">
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
            dimmed={step === 1 && anatomySubstep > 0}
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
            dimmed={step === 1 && anatomySubstep === 0}
            onClick={() => onSelectAnatomySubstep(1)}
          />
          <sup className="text-sm font-bold text-ink-muted">2</sup>
        </div>
        <span className="text-ink font-semibold">]</span>
      </div>

      <AnimatePresence mode="wait">
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
            transition={anim ?? { duration: 0.22 }}
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
                initial={{ scale: reducedMotion ? 1 : 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={anim ?? SPRING_BADGE}
                className="inline-flex flex-wrap items-center gap-3 rounded-2xl border border-teal-500/40 bg-teal-500/10 px-6 py-3 shadow-xs"
              >
                <span className="text-xs uppercase font-sans tracking-wider text-ink-muted font-bold">
                  Gini Impurity สุทธิ:
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 dark:text-teal-300 tracking-tight tabular-nums">
                  <AnimatedNumber value={gini} decimals={3} reducedMotion={reducedMotion} />
                </span>
                {gini === 0 && (
                  <span className="text-xs bg-teal-500/20 text-teal-700 dark:text-teal-300 font-sans font-bold px-2.5 py-1 rounded-full">
                    ✨ โหนดบริสุทธิ์ 100%
                  </span>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {step === 1 && (
        <AnimatePresence mode="wait" initial={false}>
          {anatomySubstep === 0 ? (
            <TypewriterSubtitleOverlay
              key="sub-pactive"
              glowColor="#0f766e"
              badgeText="p(Active) · ลูกค้ากลุ่มใช้งานประจำ"
              speakerTag="สีเขียวสว่างขึ้นก่อน"
              text={`p(Active) คือ สัดส่วนลูกค้ากลุ่มใช้งานประจำ (${active}/${total} = ${pActive.toFixed(3)}) เป็นกลุ่มแรกที่เราจะนำค่ายกกำลังสองในสูตร Gini Impurity`}
              isActive={true}
              autoAdvance={true}
              onComplete={() => onSelectAnatomySubstep(1)}
              chapterIndex={0}
              totalChapters={2}
              chapterLabels={["1. Active (สีเขียว)", "2. Inactive (สีแดง)"]}
              onSelectChapter={onSelectAnatomySubstep}
              reducedMotion={reducedMotion}
            />
          ) : (
            <TypewriterSubtitleOverlay
              key="sub-pinactive"
              glowColor="#b91c1c"
              badgeText="p(Inactive) · ลูกค้ากลุ่มไม่ใช้งาน"
              speakerTag="สีแดงสว่างตามมา"
              text={`p(Inactive) คือ สัดส่วนลูกค้ากลุ่มไม่ใช้งาน (${inactive}/${total} = ${pInactive.toFixed(3)}) นำมายกกำลังสองแล้วบวกกับกลุ่มแรก ก่อนนำผลรวมทั้งหมดไปหักออกจาก 1`}
              isActive={true}
              autoAdvance={isPlaying}
              onComplete={() => (isPlaying ? onNextStep?.() : undefined)}
              chapterIndex={1}
              totalChapters={2}
              chapterLabels={["1. Active (สีเขียว)", "2. Inactive (สีแดง)"]}
              onSelectChapter={onSelectAnatomySubstep}
              reducedMotion={reducedMotion}
              onNextStep={onNextStep}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Component 3: Confusion Matrix & F1 Morph Transition
// -------------------------------------------------------------
interface ConfusionMorphProps {
  step: number;
  anatomySubstep: number;
  onSelectAnatomySubstep: (idx: number) => void;
  onNextStep?: () => void;
  isPlaying: boolean;
  tp: number;
  fp: number;
  fn: number;
  tn: number;
  precision: number;
  recall: number;
  f1: number;
  threshold: number;
  hoveredToken: string | null;
  onHoverToken: (t: string | null) => void;
  reducedMotion: boolean;
}

function ConfusionMorphFormula({
  step,
  anatomySubstep,
  onSelectAnatomySubstep,
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
  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* Precision Row */}
      <div className="space-y-2">
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
                color="#d97706"
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
      </div>

      {/* Recall Row */}
      <div className="space-y-2 pt-2.5 border-t border-rule/50">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl font-medium tracking-tight">
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
      </div>

      {/* Reduction & Final F1 Badge on Step 3 */}
      {step >= 3 && (
        <motion.div
          initial={{ scale: reducedMotion ? 1 : 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={anim ?? SPRING_BADGE}
          className="pt-2 text-center"
        >
          <div className="inline-flex flex-wrap items-center gap-3 rounded-2xl border border-purple-500/40 bg-purple-500/10 px-6 py-3 shadow-xs">
            <span className="text-xs uppercase font-sans tracking-wider text-ink-muted font-bold">
              Harmonic Mean F1-Score:
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-700 dark:text-purple-300 font-mono tracking-tight tabular-nums">
              <AnimatedNumber value={f1} decimals={3} reducedMotion={reducedMotion} />
            </span>
            <span className="text-xs text-ink-muted font-mono font-medium">(2 × P × R / (P + R))</span>
          </div>
        </motion.div>
      )}

      {step === 1 && (
        <AnimatePresence mode="wait" initial={false}>
          {anatomySubstep === 0 && (
            <TypewriterSubtitleOverlay
              key="sub-tp"
              glowColor="#0f766e"
              badgeText="TP · True Positive (ผลบวกจริง)"
              speakerTag="ทายถูกว่าป่วย / สีเขียวสว่างก่อน"
              text={`TP (True Positive) คือ ผลบวกจริง เคสที่คนป่วยจริงและโมเดลทายถูก ${tp} คน เป็นตัวตั้งสำคัญที่สุดทั้งในสูตร Precision และ Recall`}
              isActive={true}
              autoAdvance={true}
              onComplete={() => onSelectAnatomySubstep(1)}
              chapterIndex={0}
              totalChapters={3}
              chapterLabels={["1. TP (เขียว)", "2. FP (ส้ม)", "3. FN (แดง)"]}
              onSelectChapter={onSelectAnatomySubstep}
              reducedMotion={reducedMotion}
            />
          )}

          {anatomySubstep === 1 && (
            <TypewriterSubtitleOverlay
              key="sub-fp"
              glowColor="#d97706"
              badgeText="FP · False Positive (ผลบวกลวง)"
              speakerTag="เตือนหลอก / สีส้มสว่างตามมา"
              text={`FP (False Positive) คือ ผลบวกลวง คนปกติแต่โมเดลทายผิดว่าป่วย ${fp} คน เป็นตัวการบวกเพิ่มในตัวหารของ Precision ทำให้ความแม่นยำลดลง`}
              isActive={true}
              autoAdvance={true}
              onComplete={() => onSelectAnatomySubstep(2)}
              chapterIndex={1}
              totalChapters={3}
              chapterLabels={["1. TP (เขียว)", "2. FP (ส้ม)", "3. FN (แดง)"]}
              onSelectChapter={onSelectAnatomySubstep}
              reducedMotion={reducedMotion}
            />
          )}

          {anatomySubstep === 2 && (
            <TypewriterSubtitleOverlay
              key="sub-fn"
              glowColor="#b91c1c"
              badgeText="FN · False Negative (ผลลบลวง)"
              speakerTag="ตรวจหลุดรอด / สีแดงสว่างตัวสุดท้าย"
              text={`FN (False Negative) คือ ผลลบลวง คนป่วยจริงแต่โมเดลตรวจไม่เจอ ${fn} คน เป็นตัวการบวกเพิ่มในตัวหารของ Recall ซึ่งอันตรายมากทางการแพทย์`}
              isActive={true}
              autoAdvance={isPlaying}
              onComplete={() => (isPlaying ? onNextStep?.() : undefined)}
              chapterIndex={2}
              totalChapters={3}
              chapterLabels={["1. TP (เขียว)", "2. FP (ส้ม)", "3. FN (แดง)"]}
              onSelectChapter={onSelectAnatomySubstep}
              reducedMotion={reducedMotion}
              onNextStep={onNextStep}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Component 4: K-Means Distance Morph Transition
// -------------------------------------------------------------
interface KMeansMorphProps {
  step: number;
  anatomySubstep: number;
  onSelectAnatomySubstep: (idx: number) => void;
  onNextStep?: () => void;
  isPlaying: boolean;
  pt: { x: number; y: number; label: string };
  c: { x: number; y: number; label: string };
  dx: number;
  dy: number;
  distEuclidean: number;
  distManhattan: number;
  mode: "euclidean" | "manhattan";
  targetCentroid: string;
  hoveredToken: string | null;
  onHoverToken: (t: string | null) => void;
  reducedMotion: boolean;
}

function KMeansMorphFormula({
  step,
  anatomySubstep,
  onSelectAnatomySubstep,
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

  return (
    <div className="w-full max-w-2xl space-y-3.5">
      {/* Distance Formula */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xl sm:text-2xl font-medium tracking-tight">
        <span className="text-ink font-semibold">{isEuclid ? "d(p, c) = √[" : "d(p, c) = "}</span>

        {/* Delta X Component */}
        <div className="inline-flex items-center gap-0.5">
          {isEuclid ? "(" : "|"}
          <TokenPill
            color="#2563eb"
            label="x_p"
            ghost="xₚ"
            symbol="xₚ"
            value={step < 2 ? "xₚ" : pt.x}
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
            color="#d97706"
            label="c_x"
            ghost="cₓ"
            symbol="cₓ"
            value={step < 2 ? "cₓ" : c.x}
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

        {/* Delta Y Component */}
        <div className="inline-flex items-center gap-0.5">
          {isEuclid ? "(" : "|"}
          <TokenPill
            color="#2563eb"
            label="y_p"
            ghost="yₚ"
            symbol="yₚ"
            value={step < 2 ? "yₚ" : pt.y}
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
            color="#d97706"
            label="c_y"
            ghost="cᵧ"
            symbol="cᵧ"
            value={step < 2 ? "cᵧ" : c.y}
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

      {/* Reduction steps */}
      <AnimatePresence mode="wait">
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
            transition={anim ?? { duration: 0.22 }}
            className="space-y-3 pt-3 border-t border-rule/60 text-center font-mono"
          >
            {isEuclid ? (
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-sm md:text-base text-ink-muted tabular-nums">
                <span>= √[({dx})² + ({dy})²]</span>
                <span className="hidden sm:inline text-ink-subtle">→</span>
                <span>= √[{dx ** 2} + {dy ** 2}]</span>
                <span className="hidden sm:inline text-ink-subtle">→</span>
                <span>= √{dx ** 2 + dy ** 2}</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-sm md:text-base text-ink-muted tabular-nums">
                <span>= |{dx}| + |{dy}|</span>
                <span className="hidden sm:inline text-ink-subtle">→</span>
                <span>= {Math.abs(dx)} + {Math.abs(dy)}</span>
              </div>
            )}

            {step >= 3 && (
              <motion.div
                initial={{ scale: reducedMotion ? 1 : 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={anim ?? SPRING_BADGE}
                className="inline-flex flex-wrap items-center gap-3 rounded-2xl border border-blue-500/40 bg-blue-500/10 px-6 py-3 shadow-xs"
              >
                <span className="text-xs uppercase font-sans tracking-wider text-ink-muted font-bold">
                  ระยะทางสุทธิ ({mode}):
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
        <AnimatePresence mode="wait" initial={false}>
          {anatomySubstep === 0 ? (
            <TypewriterSubtitleOverlay
              key="sub-pt"
              glowColor="#2563eb"
              badgeText="(xₚ, yₚ) · พิกัดข้อมูลที่ต้องการจัดกลุ่ม"
              speakerTag="สีฟ้าสว่างขึ้นก่อน"
              text={`พิกัดจุด (xₚ, yₚ) คือ ตำแหน่งของข้อมูลจุด ${pt.label} (xₚ = ${pt.x}, yₚ = ${pt.y}) ทำหน้าที่เป็นหมุดตั้งต้นในการวัดระยะห่างไปยังคลัสเตอร์`}
              isActive={true}
              autoAdvance={true}
              onComplete={() => onSelectAnatomySubstep(1)}
              chapterIndex={0}
              totalChapters={2}
              chapterLabels={["1. พิกัดจุด (ฟ้า)", "2. Centroid (ส้ม)"]}
              onSelectChapter={onSelectAnatomySubstep}
              reducedMotion={reducedMotion}
            />
          ) : (
            <TypewriterSubtitleOverlay
              key="sub-centroid"
              glowColor="#d97706"
              badgeText="(cₓ, cᵧ) · จุดกึ่งกลาง Centroid"
              speakerTag="สีส้มสว่างตามมา"
              text={`พิกัด Centroid (cₓ, cᵧ) คือ จุดกึ่งกลางคลัสเตอร์ ${c.label} (cₓ = ${c.x}, cᵧ = ${c.y}) ทำหน้าที่เป็นหมุดอ้างอิงเพื่อหาผลต่าง Δx = ${Math.abs(dx)} และ Δy = ${Math.abs(dy)}`}
              isActive={true}
              autoAdvance={isPlaying}
              onComplete={() => (isPlaying ? onNextStep?.() : undefined)}
              chapterIndex={1}
              totalChapters={2}
              chapterLabels={["1. พิกัดจุด (ฟ้า)", "2. Centroid (ส้ม)"]}
              onSelectChapter={onSelectAnatomySubstep}
              reducedMotion={reducedMotion}
              onNextStep={onNextStep}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Helper: TokenPill — tactile spring morph + persistent ghost trace.
// The ghost caption reserves a fixed h-4 slot (no CLS) and fades in
// on substitution, legible in both themes via full-strength token
// color boosted under the dark variant.
// -------------------------------------------------------------
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

  // When dimmed, token loses its vivid accent color and becomes neutral/faint
  const effectiveBorder = dimmed ? "var(--color-rule-strong)" : color;
  const effectiveColor = dimmed ? "var(--color-ink-muted)" : color;
  const effectiveBg = dimmed
    ? "var(--color-surface-hover)"
    : `color-mix(in srgb, ${color} ${isSpotlight ? "18%" : "10%"}, transparent)`;

  return (
    <span
      className={`relative inline-flex flex-col items-center cursor-pointer outline-none transition-all duration-300 ${
        dimmed ? "opacity-35 grayscale" : "opacity-100"
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
        animate={{
          scale: isSpotlight && !reducedMotion ? 1.06 : 1,
        }}
        transition={reducedMotion ? NO_ANIM : SPRING_TACTILE}
        className="relative inline-flex items-center justify-center rounded-xl border px-3 py-1 font-mono text-base sm:text-lg font-bold shadow-xs transition-colors duration-200"
        style={{
          borderColor: effectiveBorder,
          color: effectiveColor,
          backgroundColor: effectiveBg,
          boxShadow: isSpotlight
            ? `0 0 0 3px color-mix(in srgb, ${color} 50%, transparent), 0 6px 16px color-mix(in srgb, ${color} 30%, transparent)`
            : active
            ? `0 0 0 2px color-mix(in srgb, ${color} 55%, transparent)`
            : undefined,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={morphed ? "number" : "symbol"}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -5 }}
            transition={reducedMotion ? NO_ANIM : { duration: 0.16 }}
            className="relative z-10 tabular-nums"
          >
            {morphed ? value : symbol}
          </motion.span>
        </AnimatePresence>
      </motion.span>
      {/* Ghost trace: fixed slot, fades gracefully, always legible */}
      <span className="flex h-4 items-center" aria-hidden="true">
        <AnimatePresence initial={false}>
          {morphed && (
            <motion.span
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={reducedMotion ? NO_ANIM : { duration: 0.22 }}
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

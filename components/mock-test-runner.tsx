"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SegmentedControl } from "@radix-ui/themes";
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

function playChime(isCorrect: boolean) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (isCorrect) {
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
      osc.frequency.setValueAtTime(220, ctx.currentTime + 0.08); // A3
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch {
    // Ignore audio restriction if muted by browser
  }
}

interface MockTestRunnerProps {
  test?: MockTest;
  tests?: MockTest[];
}

export function MockTestRunner({ test: initialTest, tests }: MockTestRunnerProps) {
  const testList = useMemo(() => {
    if (tests && tests.length > 0) return tests;
    if (initialTest) return [initialTest];
    return [];
  }, [tests, initialTest]);

  const [activeTestIndex, setActiveTestIndex] = useState(0);
  const activeTest = testList[activeTestIndex] || testList[0];

  // Learning Mode: Practice (instant feedback & hints) vs Exam (timed & bulk submit)
  const [mode, setMode] = useState<"practice" | "exam">("practice");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hintLevels, setHintLevels] = useState<Record<number, number>>({});
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState(activeTest ? activeTest.timeLimitSeconds : 0);
  const [finished, setFinished] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const q: Question | undefined = activeTest?.questions[idx];

  const submit = useCallback(() => {
    setFinished(true);
    setRemaining(0);
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }, []);

  // Timer. Runs only while in Exam mode and not finished.
  useEffect(() => {
    if (finished || mode === "practice") return;
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
  }, [finished, mode]);

  // Auto-submit when the clock reaches zero in Exam mode.
  useEffect(() => {
    if (
      mode === "exam" &&
      remaining === 0 &&
      !finished &&
      Object.keys(answers).length >= 0 &&
      (activeTest?.timeLimitSeconds ?? 0) > 0
    ) {
      submit();
    }
  }, [remaining, finished, activeTest, mode, submit, answers]);

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
    const isFirstTime = !answers[q.n];
    setAnswers((a) => ({ ...a, [q.n]: label }));

    if (mode === "practice" && isFirstTime) {
      const right = q.options?.find((o) => o.correct)?.label;
      const isCorrect = label === right;
      if (isCorrect) {
        setStreak((s) => {
          const next = s + 1;
          setBestStreak((b) => Math.max(b, next));
          return next;
        });
        if (soundEnabled) playChime(true);
      } else {
        setStreak(0);
        if (soundEnabled) playChime(false);
      }
    }
  }

  function go(next: number) {
    setIdx(next);
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }

  function toggleHint(questionN: number) {
    setHintLevels((prev) => {
      const current = prev[questionN] || 0;
      const next = current >= 2 ? 0 : current + 1;
      return { ...prev, [questionN]: next };
    });
  }

  function switchTest(newIndex: number) {
    if (newIndex === activeTestIndex) return;
    const nextTest = testList[newIndex];
    if (!nextTest) return;
    setActiveTestIndex(newIndex);
    setAnswers({});
    setHintLevels({});
    setStreak(0);
    setIdx(0);
    setFinished(false);
    setRemaining(nextTest.timeLimitSeconds);
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }

  // Keyboard navigation & shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!q) return;

      const keyMap: Record<string, string> = {
        "1": "a",
        "2": "b",
        "3": "c",
        "4": "d",
        a: "a",
        b: "b",
        c: "c",
        d: "d",
      };
      const mapped = keyMap[e.key.toLowerCase()];
      if (mapped && q.options) {
        const optionExists = q.options.some((o) => o.label.toLowerCase() === mapped);
        if (optionExists) {
          choose(mapped);
          return;
        }
      }

      if (e.key === "ArrowRight" || (e.key === "Enter" && answers[q.n])) {
        if (idx < total - 1) go(idx + 1);
      } else if (e.key === "ArrowLeft") {
        if (idx > 0) go(idx - 1);
      } else if (e.key.toLowerCase() === "h") {
        toggleHint(q.n);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [q, idx, total, answers, mode, soundEnabled]);

  if (!activeTest || !q) {
    return <div className="py-8 text-ink-subtle">ไม่พบชุดข้อสอบ</div>;
  }

  /* ---------------- Result View (Bulk Exam Review) ---------------- */
  if (finished) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const passedA = pct >= 80;
    const passedMin = pct >= 60;

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
                  className={`tap px-4 py-2 border text-sm transition-colors duration-200 cursor-pointer ${
                    ti === activeTestIndex
                      ? "border-accent text-accent-ink font-medium bg-surface"
                      : "border-rule-strong text-ink hover:border-ink"
                  }`}
                >
                  <span className="meta-label tracking-display">{t.titleTh}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Coursera-style Mastery Score Card */}
        <div className="bento-card p-6 sm:p-8 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="eyebrow eyebrow-accent">สรุปผลการทดสอบ</span>
                <span className={`bento-pill font-mono font-semibold ${
                  passedA ? "border-mint text-mint bg-mint-wash" : passedMin ? "border-amber text-amber" : "border-rose text-rose"
                }`}>
                  {passedA ? "🏆 ระดับเกียรตินิยม (Target A)" : passedMin ? "✅ ผ่านเกณฑ์มาตรฐาน" : "📚 แนะนำให้ทบทวนเพิ่ม"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-ink">
                {activeTest.titleTh}
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                เกณฑ์ประเมินแนะนำ: ควรได้ 80% ขึ้นไป (24/{total} ข้อ) เพื่อการันตีความพร้อมระดับสูงสุดในห้องสอบจริง
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="index text-5xl text-ink">
                {score}
                <span className="text-ink-subtle text-2xl">/{total}</span>
              </span>
              <p className="text-sm font-semibold text-mint mt-0.5 font-mono tnum">{pct}% ความถูกต้อง</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setHintLevels({});
                setStreak(0);
                setIdx(0);
                setFinished(false);
                setRemaining(activeTest.timeLimitSeconds);
              }}
              className="tactile-btn tactile-btn-accent px-5 py-2.5 bg-accent text-white border border-accent text-xs sm:text-sm font-semibold cursor-pointer hover:bg-accent-ink"
            >
              ทำชุดนี้อีกครั้ง &rarr;
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("practice");
                setAnswers({});
                setHintLevels({});
                setIdx(0);
                setFinished(false);
              }}
              className="tactile-btn px-5 py-2.5 bg-surface text-ink border border-rule-strong text-xs sm:text-sm font-semibold cursor-pointer hover:border-ink"
            >
              ⚡ สลับไปฝึกทำทันใจทีละข้อ
            </button>
          </div>
        </div>

        <h3
          ref={headingRef}
          tabIndex={-1}
          className="mt-12 text-2xl font-bold text-ink border-b border-rule pb-4 outline-none flex items-center justify-between"
        >
          <span>เฉลยและวิธีคิดละเอียดทุกข้อ</span>
          <span className="text-xs text-ink-subtle font-normal font-mono">
            {total} ITEMS
          </span>
        </h3>

        <ol className="mt-6 space-y-5">
          {activeTest.questions.map((item, i) => {
            const right = item.options?.find((o) => o.correct)?.label;
            const mine = answers[item.n];
            const ok = mine && right && mine === right;
            const unanswered = !mine;
            return (
              <li key={item.n} className="bento-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-8 h-8 font-bold text-xs flex items-center justify-center font-mono border ${
                      ok
                        ? "border-mint text-mint bg-mint-wash"
                        : unanswered
                          ? "border-rule text-ink-subtle"
                          : "border-rose text-rose bg-rose-wash"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`bento-pill border ${
                      ok
                        ? "border-mint text-mint"
                        : unanswered
                          ? "border-rule text-ink-subtle"
                          : "border-rose text-rose"
                    }`}>
                      {ok ? "ถูกต้อง" : unanswered ? "ไม่ได้ตอบ" : "ตอบผิด"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {item.lectures.map((l) => (
                      <span key={l} className="bento-pill border border-rule text-ink-subtle">
                        {l}
                      </span>
                    ))}
                    {KIND_LABELS[item.kind] && (
                      <span className="bento-pill border border-rule text-ink-subtle">
                        {KIND_LABELS[item.kind]}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-base sm:text-lg font-bold text-ink mt-2 leading-relaxed">
                  {item.prompt}
                </p>

                <div className="mt-3.5 p-3 bg-surface-hover border border-rule flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-ink-subtle">คำตอบที่ถูกต้อง: </span>
                    <span className="font-mono font-bold text-mint text-base">
                      {right?.toUpperCase()}
                    </span>
                  </div>
                  {!ok && (
                    <div className="pl-3 border-l border-rule">
                      <span className="text-ink-subtle">คุณเลือก: </span>
                      <span className="font-mono font-bold text-rose">
                        {unanswered ? "ไม่ได้ตอบ" : mine?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-xs sm:text-sm text-ink-muted leading-relaxed bg-surface p-4 border border-rule">
                  <p className="font-bold text-xs text-ink mb-1">คำอธิบายและวิธีคิด:</p>
                  {item.explanation}
                </div>

                {item.distractor && (
                  <div className="exam-pitfall-card mt-3">
                    <p className="eyebrow eyebrow-amber mb-1">จุดที่มักตอบผิด (Common Trap)</p>
                    <p className="text-xs sm:text-sm text-ink-muted">{item.distractor}</p>
                  </div>
                )}

                {item.slideRef && (
                  <div className="mt-4 pt-3 border-t border-rule flex items-center justify-end text-[11px] text-ink-subtle">
                    <span className="font-mono">{item.slideRef}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  /* ---------------- Active Test Experience ---------------- */
  const minutesLeft = Math.floor(remaining / 60);
  const currentRight = q.options?.find((o) => o.correct)?.label;
  const currentChosen = answers[q.n];
  const hasAnsweredCurrent = Boolean(currentChosen);
  const isCurrentCorrect = hasAnsweredCurrent && currentChosen === currentRight;
  const currentHintLevel = hintLevels[q.n] || 0;

  return (
    <div>
      {/* Paper selection bar */}
      {testList.length > 1 && (
        <div className="mb-6 pb-4 border-b border-rule">
          <p className="eyebrow mb-3">เลือกชุดข้อสอบ</p>
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
                  className={`px-4 py-2 border text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-ink text-bg border-ink font-semibold"
                      : "bg-surface border-rule-strong text-ink-muted hover:text-ink"
                  }`}
                >
                  {t.titleTh}
                </button>
              );
            })}
          </div>
          {activeTest.description && (
            <p className="mt-2 text-xs sm:text-sm text-ink-muted">{activeTest.description}</p>
          )}
        </div>
      )}

      {/* Control & Mode Switcher Bar */}
      <div className="sticky top-20 z-40 bento-card p-4 sm:p-5 mt-4">
        <div className="grid-12 items-center gap-4">
          {/* Mode Switcher */}
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow block mb-1.5">โหมดการเรียนรู้</span>
            <SegmentedControl.Root
              size="2"
              value={mode}
              onValueChange={(val) => setMode(val as "practice" | "exam")}
            >
              <SegmentedControl.Item value="practice">⚡ ฝึกทำทันใจ (Practice)</SegmentedControl.Item>
              <SegmentedControl.Item value="exam">⏱️ จับเวลา 45 น. (Exam)</SegmentedControl.Item>
            </SegmentedControl.Root>
          </div>

          {/* Dynamic Metric Display */}
          <div className="col-span-6 md:col-span-3">
            {mode === "exam" ? (
              <>
                <span className="eyebrow block mb-1">เวลาที่เหลือ</span>
                <p role="timer" aria-live="off" className="font-mono text-2xl sm:text-3xl font-bold text-accent-ink mt-0.5 tnum">
                  {fmt(remaining)}
                </p>
              </>
            ) : (
              <>
                <span className="eyebrow block mb-1">สถิติความแม่นยำ</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-accent-ink">
                    🔥 {streak}
                  </span>
                  <span className="text-xs text-ink-subtle">
                    (สูงสุด {bestStreak} ข้อ)
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="col-span-6 md:col-span-2">
            <span className="eyebrow block mb-1">ความคืบหน้า</span>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-ink mt-0.5 tnum">
              {answered}
              <span className="text-ink-subtle text-base font-normal">/{total} ข้อ</span>
            </p>
          </div>

          {/* Action Bar */}
          <div className="col-span-12 md:col-span-3 flex items-center justify-between md:justify-end gap-3">
            <button
              type="button"
              onClick={() => setSoundEnabled((v) => !v)}
              title={soundEnabled ? "ปิดเสียงเอฟเฟกต์" : "เปิดเสียงเอฟเฟกต์"}
              className="tactile-btn w-9 h-9 border border-rule text-ink-subtle text-xs"
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>

            {mode === "exam" ? (
              <button
                type="button"
                onClick={submit}
                className="tactile-btn tactile-btn-accent px-4 py-2 bg-ink text-bg border border-ink text-xs sm:text-sm font-semibold hover:bg-accent-ink"
              >
                ส่งข้อสอบ &rarr;
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                className="tactile-btn px-4 py-2 bg-surface text-ink border border-rule-strong text-xs sm:text-sm font-semibold hover:border-ink"
              >
                ดูสรุปผล &rarr;
              </button>
            )}
          </div>
        </div>

        {mode === "exam" && minutesLeft <= 3 && minutesLeft > 0 && (
          <div aria-live="polite" className="mt-2 text-xs font-bold text-amber">
            ⚠️ เหลือเวลาอีก {minutesLeft} นาที ระบบจะส่งคำตอบอัตโนมัติเมื่อหมดเวลา
          </div>
        )}
      </div>

      {/* Progress Beads Rail */}
      <div className="mt-6 flex flex-wrap gap-1.5" role="group" aria-label="เลือกข้อ">
        {activeTest.questions.map((item, i) => {
          const on = i === idx;
          const myAnswer = answers[item.n];
          const done = Boolean(myAnswer);
          const rightAnswer = item.options?.find((o) => o.correct)?.label;
          const isRight = done && myAnswer === rightAnswer;

          let beadClass = "border-rule-strong bg-surface text-ink-subtle";
          if (on) {
            beadClass = "border-ink bg-ink text-bg font-bold shadow-sm";
          } else if (done) {
            if (mode === "practice") {
              beadClass = isRight
                ? "border-mint bg-mint-wash text-mint font-bold"
                : "border-rose bg-rose-wash text-rose font-bold";
            } else {
              beadClass = "border-mint text-mint bg-surface font-bold";
            }
          }

          return (
            <button
              key={item.n}
              type="button"
              onClick={() => go(i)}
              aria-current={on ? "true" : undefined}
              className={`tactile-btn w-9 h-9 sm:w-10 sm:h-10 text-xs font-mono border cursor-pointer tnum ${beadClass}`}
            >
              <span>{String(item.n).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      {/* Question Sheet */}
      <section className="mt-6 bento-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bento-pill border border-accent text-accent-ink font-semibold">
              ข้อที่ {q.n} จาก {total}
            </span>
            {q.lectures.map((l) => (
              <span key={l} className="bento-pill border border-rule text-ink-subtle">
                {l}
              </span>
            ))}
            {KIND_LABELS[q.kind] && (
              <span className="bento-pill border border-rule text-ink-subtle">
                {KIND_LABELS[q.kind]}
              </span>
            )}
          </div>

          {/* Khan Academy-style Hint Ladder Toggle */}
          <button
            type="button"
            onClick={() => toggleHint(q.n)}
            className="tactile-btn px-3 py-1.5 text-xs font-semibold text-amber border border-amber/50 bg-amber-wash/30 hover:bg-amber-wash cursor-pointer"
          >
            💡 {currentHintLevel === 0 ? "ขอคำใบ้ (Hint)" : currentHintLevel === 1 && q.distractor ? "คำใบ้ขั้น 2 (จุดดัก)" : "ปิดคำใบ้"}
          </button>
        </div>

        {/* Scaffolded Hint Box */}
        {currentHintLevel >= 1 && (
          <div className="mb-4 p-4 border border-dashed border-amber bg-surface text-xs text-ink leading-relaxed rounded-none">
            <div className="flex items-center gap-1.5 text-amber font-bold mb-1">
              <span>💡 คำใบ้ระดับ 1:</span>
              <span className="text-ink-subtle font-normal">
                ข้อนี้เน้นหลักการ {q.lectures.join(", ")} {q.slideRef ? `(อ้างอิง ${q.slideRef})` : ""}
              </span>
            </div>
            <p className="text-ink-muted">
              ลองสังเกตโจทย์และพิจารณาสูตรคำนวณที่เกี่ยวข้องก่อนสรุปคำตอบ
            </p>
            {currentHintLevel >= 2 && q.distractor && (
              <div className="mt-2.5 pt-2.5 border-t border-rule">
                <p className="text-amber font-bold mb-0.5">⚠️ คำใบ้ระดับ 2 (กับดักข้อสอบที่มักผิด):</p>
                <p className="text-ink-muted">{q.distractor}</p>
              </div>
            )}
          </div>
        )}

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-xl sm:text-2xl font-bold text-ink leading-snug outline-none"
        >
          {q.prompt}
        </h2>

        <fieldset className="mt-6 border-0 p-0">
          <legend className="eyebrow mb-2">
            เลือกคำตอบที่ถูกต้องที่สุด {mode === "practice" && "(ตอบแล้วระบบจะเฉลยทันที)"}
          </legend>

          <div className="mt-3 space-y-2.5">
            {q.options?.map((o) => {
              const id = `q${q.n}-${o.label}`;
              const isSelected = answers[q.n] === o.label;

              let choiceStyle = "border-rule bg-surface text-ink-muted hover:text-ink";
              if (mode === "practice" && hasAnsweredCurrent) {
                if (o.correct) {
                  choiceStyle = "is-correct text-mint font-medium";
                } else if (isSelected && !o.correct) {
                  choiceStyle = "is-incorrect text-rose font-medium";
                } else {
                  choiceStyle = "border-rule bg-surface opacity-70";
                }
              } else if (isSelected) {
                choiceStyle = "is-selected text-ink";
              }

              return (
                <label
                  key={o.label}
                  htmlFor={id}
                  className={`tactile-choice flex items-start gap-3.5 p-4 cursor-pointer ${choiceStyle}`}
                >
                  <input
                    id={id}
                    type="radio"
                    name={`q-${q.n}`}
                    value={o.label}
                    checked={isSelected}
                    onChange={() => choose(o.label)}
                    className="mt-1 w-4 h-4 accent-[var(--accent)] shrink-0"
                  />
                  <span className="font-mono font-bold text-accent-ink">
                    {o.label.toUpperCase()}.
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed">{o.text}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Duolingo-style Immediate Feedback Card (Practice Mode) */}
        {mode === "practice" && hasAnsweredCurrent && (
          <div className={`mt-6 p-5 border transition-all ${
            isCurrentCorrect ? "bg-mint-wash border-mint" : "bg-rose-wash border-rose"
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{isCurrentCorrect ? "🎉" : "💡"}</span>
                <div>
                  <h4 className={`text-base font-bold ${
                    isCurrentCorrect ? "text-mint" : "text-rose"
                  }`}>
                    {isCurrentCorrect
                      ? `ถูกต้อง! ยอดเยี่ยมมาก${streak > 1 ? ` (Streak ต่อเนื่อง ${streak} ข้อ 🔥)` : ""}`
                      : `ยังไม่ถูกต้อง — คำตอบที่ถูกคือข้อ ${currentRight?.toUpperCase()}`}
                  </h4>
                </div>
              </div>

              {idx < total - 1 && (
                <button
                  type="button"
                  onClick={() => go(idx + 1)}
                  className="tactile-btn tactile-btn-accent px-4 py-2 bg-ink text-bg text-xs font-semibold hover:bg-accent-ink"
                >
                  ข้อถัดไป &rarr;
                </button>
              )}
            </div>

            <div className="text-xs sm:text-sm text-ink leading-relaxed mt-3 pt-3 border-t border-rule/50">
              <p className="font-bold text-xs text-ink mb-1">สรุปวิธีคิด:</p>
              <p>{q.explanation}</p>
              {q.distractor && !isCurrentCorrect && (
                <div className="mt-2 text-xs text-amber font-medium">
                  ⚠️ <strong>จุดที่มักเข้าใจผิด:</strong> {q.distractor}
                </div>
              )}
              {q.slideRef && (
                <p className="mt-2 text-[11px] font-mono text-ink-subtle text-right">
                  📖 ตรวจทานตรงสไลด์: {q.slideRef}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Question Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-rule flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(Math.max(0, idx - 1))}
            disabled={idx === 0}
            className="tactile-btn px-5 py-2.5 border border-rule hover:border-rule-strong text-ink text-xs sm:text-sm font-semibold cursor-pointer"
          >
            &larr; ข้อก่อนหน้า
          </button>

          <div className="flex items-center gap-2 text-xs text-ink-subtle font-mono tnum">
            <span>{idx + 1} / {total}</span>
            <span className="hidden sm:inline text-ink-subtle">&middot; คีย์ลัด A-D หรือ 1-4</span>
          </div>

          <button
            type="button"
            onClick={() => go(Math.min(total - 1, idx + 1))}
            disabled={idx === total - 1}
            className="tactile-btn tactile-btn-accent px-5 py-2.5 bg-accent text-white border border-accent text-xs sm:text-sm font-semibold cursor-pointer hover:bg-accent-ink"
          >
            ข้อถัดไป &rarr;
          </button>
        </div>
      </section>

      <p className="mt-6 text-xs text-ink-muted text-center">
        💡 เคล็ดลับ: สามารถกดปุ่ม <strong>1-4</strong> หรือ <strong>A-D</strong> บนคีย์บอร์ดเพื่อตอบ, กด <strong>H</strong> เพื่อเปิดคำใบ้, และกด <strong>Enter / ลูกศรขวา</strong> เพื่อไปข้อถัดไป
      </p>
    </div>
  );
}
"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  CheckIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import type { MockTest, Question } from "@/content/types";
import { EmptyState, Note, Segmented } from "./ui";

type Mode = "practice" | "exam";
type Phase = "setup" | "running" | "review";
type Result = { q: Question; right?: string; mine?: string; gradable: boolean; ok: boolean };
type OptionState = "idle" | "selected" | "correct" | "wrong" | "dim";

const KIND_LABELS: Record<string, string> = {
  numeric: "คำนวณ",
  interpretation: "ตีความ",
  scenario: "สถานการณ์",
  "true-false": "ถูก / ผิด",
  essay: "อธิบาย",
};

const OPTION_STYLE: Record<OptionState, string> = {
  idle: "border-rule bg-surface hover:border-rule-strong cursor-pointer",
  selected: "border-accent bg-accent-wash cursor-pointer",
  correct: "border-good bg-good-wash",
  wrong: "border-bad bg-bad-wash",
  dim: "border-rule bg-surface opacity-60",
};
const BADGE_STYLE: Record<OptionState, string> = {
  idle: "border-rule-strong text-ink-muted",
  selected: "border-accent bg-accent text-on-accent",
  correct: "border-good bg-good text-paper",
  wrong: "border-bad bg-bad text-paper",
  dim: "border-rule text-ink-subtle",
};

const correctOf = (q: Question) => q.options?.find((o) => o.correct);
const optionText = (q: Question, label?: string) => q.options?.find((o) => o.label === label)?.text;
const L = (label?: string) => (label ?? "").toUpperCase();
const maxHint = (q: Question) => (q.distractor ? 2 : 1);

function clock(sec: number) {
  const s = Math.max(0, sec);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function isTypingTarget(t: EventTarget | null) {
  if (!(t instanceof HTMLElement)) return false;
  if (t.isContentEditable || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement) return true;
  return t instanceof HTMLInputElement && !["radio", "checkbox", "button"].includes(t.type);
}

export function MockTestRunner({ test, tests }: { test?: MockTest; tests?: MockTest[] }) {
  const list = useMemo(() => (tests?.length ? tests : test ? [test] : []), [tests, test]);

  const [testIdx, setTestIdx] = useState(0);
  const [mode, setMode] = useState<Mode>("practice");
  const [phase, setPhase] = useState<Phase>("setup");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [shown, setShown] = useState<Record<number, boolean>>({});
  const [hints, setHints] = useState<Record<number, number>>({});
  const [flags, setFlags] = useState<Record<number, boolean>>({});
  const [idx, setIdx] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [now, setNow] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [filter, setFilter] = useState<"all" | "missed">("all");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const t = list[testIdx];
  const questions = useMemo(() => t?.questions ?? [], [t]);
  const q = questions[idx];

  const results = useMemo<Result[]>(
    () =>
      questions.map((item) => {
        const right = correctOf(item)?.label;
        const mine = answers[item.n];
        return { q: item, right, mine, gradable: right !== undefined, ok: right !== undefined && mine === right };
      }),
    [questions, answers],
  );

  const gradable = results.filter((r) => r.gradable).length;
  const score = results.filter((r) => r.ok).length;
  const answered = results.filter((r) => r.mine !== undefined).length;
  const checked = results.filter((r) => r.gradable && r.mine !== undefined).length;
  const missing = gradable - checked;

  const timed = phase === "running" && mode === "exam" && (t?.timeLimitSeconds ?? 0) > 0;
  const remaining = timed ? Math.max(0, Math.ceil((deadline - now) / 1000)) : 0;

  const focusHeading = () => requestAnimationFrame(() => headingRef.current?.focus());

  const submit = useCallback(() => {
    setConfirming(false);
    setFilter("all");
    setPhase("review");
    window.scrollTo({ top: 0 });
    requestAnimationFrame(() => headingRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!timed) return;
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, [timed]);

  useEffect(() => {
    if (timed && remaining === 0) {
      window.setTimeout(() => submit(), 0);
    }
  }, [timed, remaining, submit]);

  useEffect(() => {
    if (!timed) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [timed]);

  function start() {
    if (!t) return;
    setAnswers({});
    setShown({});
    setHints({});
    setFlags({});
    setIdx(0);
    setConfirming(false);
    const n = Date.now();
    setNow(n);
    setDeadline(n + t.timeLimitSeconds * 1000);
    setPhase("running");
    focusHeading();
  }

  function go(i: number) {
    if (i < 0 || i >= questions.length) return;
    setIdx(i);
    setConfirming(false);
    focusHeading();
  }

  function choose(label: string) {
    if (!q) return;
    if (mode === "practice" && answers[q.n] !== undefined) return;
    setAnswers((a) => ({ ...a, [q.n]: label }));
  }

  function nextHint() {
    if (!q) return;
    setHints((h) => ({ ...h, [q.n]: Math.min(maxHint(q), (h[q.n] ?? 0) + 1) }));
  }

  const requestSubmit = () => (missing > 0 ? setConfirming(true) : submit());

  const onKey = useRef<(e: KeyboardEvent) => void>(() => {});
  useEffect(() => {
    onKey.current = (e) => {
      if (phase !== "running" || !q) return;
      if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return;
      const k = e.key.toLowerCase();
      if (k === "arrowright" || k === "arrowleft") {
        if (e.target instanceof HTMLInputElement) return;
        e.preventDefault();
        go(idx + (k === "arrowright" ? 1 : -1));
        return;
      }
      const label = /^[1-9]$/.test(k)
        ? q.options?.[Number(k) - 1]?.label
        : q.options?.find((o) => o.label.toLowerCase() === k)?.label;
      if (label) {
        e.preventDefault();
        choose(label);
      } else if (k === "h" && mode === "practice") {
        nextHint();
      }
    };
  });
  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKey.current(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!t) return <EmptyState>ไม่พบชุดข้อสอบ</EmptyState>;

  /* ============================== Setup ============================== */
  if (phase === "setup") {
    const minutes = Math.round(t.timeLimitSeconds / 60);
    return (
      <div className="space-y-8">
        {list.length > 1 ? (
          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-ink">เลือกชุดข้อสอบ</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {list.map((x, i) => (
                <ChoiceCard key={x.id ?? x.title} name="mock-test" checked={i === testIdx} onChange={() => setTestIdx(i)} title={x.titleTh}>
                  {x.description ? <span className="block">{x.description}</span> : null}
                  <span className="num mt-1 block font-mono text-xs text-ink-subtle">
                    {x.questions.length} ข้อ · {Math.round(x.timeLimitSeconds / 60)} นาที
                  </span>
                </ChoiceCard>
              ))}
            </div>
          </fieldset>
        ) : null}

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-ink">เลือกโหมด</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <ChoiceCard name="mock-mode" checked={mode === "practice"} onChange={() => setMode("practice")} title="ฝึกทีละข้อ">
              เฉลยทันทีหลังตอบ ขอคำใบ้ได้ ไม่จับเวลา — เหมาะกับช่วงทบทวน
            </ChoiceCard>
            <ChoiceCard name="mock-mode" checked={mode === "exam"} onChange={() => setMode("exam")} title="จำลองสอบ">
              จับเวลา {minutes} นาที ไม่มีคำใบ้ ดูเฉลยหลังส่ง — เหมาะกับวันก่อนสอบ
            </ChoiceCard>
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-4">
          <button type="button" className="btn btn-primary" onClick={start}>
            เริ่มทำ {t.questions.length} ข้อ
            <ArrowRightIcon aria-hidden />
          </button>
          <p className="text-sm text-ink-subtle">
            คีย์ลัด: <kbd>A</kbd>–<kbd>D</kbd> หรือ <kbd>1</kbd>–<kbd>4</kbd> ตอบ · <kbd>←</kbd> <kbd>→</kbd> เปลี่ยนข้อ
          </p>
        </div>
      </div>
    );
  }

  /* ============================== Review ============================== */
  if (phase === "review") {
    const pct = gradable ? Math.round((score / gradable) * 100) : 0;
    const target = Math.ceil(gradable * 0.8);
    const verdict =
      pct >= 80 ? "พร้อมสำหรับหัวข้อในชุดนี้" : pct >= 60 ? "ผ่านเกณฑ์ ทบทวนข้อที่ผิดด้านล่าง" : "ควรทบทวนเพิ่ม เริ่มจากบทที่ได้คะแนนต่ำสุด";

    const byLecture = new Map<string, { ok: number; total: number }>();
    for (const r of results) {
      if (!r.gradable) continue;
      for (const l of r.q.lectures) {
        const s = byLecture.get(l) ?? { ok: 0, total: 0 };
        s.total += 1;
        if (r.ok) s.ok += 1;
        byLecture.set(l, s);
      }
    }
    const lectureRows = [...byLecture].sort((a, b) => a[1].ok / a[1].total - b[1].ok / b[1].total);
    const missed = results.filter((r) => r.gradable && !r.ok);
    const visible = filter === "missed" ? missed : results;

    return (
      <div className="space-y-10">
        <section className="rounded-xl border border-rule bg-surface p-6 sm:p-8">
          <p className="text-sm text-ink-subtle">
            {t.titleTh} · {mode === "exam" ? "จำลองสอบ" : "ฝึกทีละข้อ"}
          </p>
          <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-semibold text-ink outline-none sm:text-3xl">
            ได้ <span className="num font-mono">{score}</span> จาก <span className="num font-mono">{gradable}</span> ข้อ{" "}
            <span className="text-ink-subtle">({pct}%)</span>
          </h2>
          <p className="mt-2 text-ink-muted">
            {verdict} · เป้าหมาย 80% คือ <span className="num">{target}</span> ข้อขึ้นไป
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn btn-primary" onClick={start}>
              ทำชุดนี้อีกครั้ง
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setPhase("setup")}>
              เลือกชุดหรือโหมดอื่น
            </button>
          </div>
        </section>

        {lectureRows.length > 1 ? (
          <section>
            <h3 className="mb-3 text-sm font-semibold text-ink">คะแนนแยกตามบท (เรียงจากต่ำไปสูง)</h3>
            <ul className="space-y-2">
              {lectureRows.map(([lect, s]) => (
                <li key={lect} className="grid grid-cols-[5.5rem_minmax(0,1fr)_3.5rem] items-center gap-3 text-sm">
                  <span className="font-mono text-ink">{lect}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-rule">
                    <span className="block h-full rounded-full bg-accent" style={{ width: `${(s.ok / s.total) * 100}%` }} />
                  </span>
                  <span className="num text-right font-mono text-ink-muted">
                    {s.ok}/{s.total}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-ink-subtle">ข้อที่เกี่ยวกับหลายบทจะนับในทุกบทนั้น</p>
          </section>
        ) : null}

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-3">
            <h3 className="text-xl font-semibold text-ink">เฉลยและวิธีคิด</h3>
            <Segmented
              label="กรองข้อ"
              value={filter}
              onChange={setFilter}
              options={[
                { value: "all", label: `ทั้งหมด ${results.length}` },
                { value: "missed", label: `ผิดหรือไม่ได้ตอบ ${missed.length}` },
              ]}
            />
          </div>
          {visible.length === 0 ? (
            <EmptyState>ไม่มีข้อที่ผิด</EmptyState>
          ) : (
            <ol className="space-y-4">
              {visible.map((r) => (
                <ReviewItem key={r.q.n} r={r} flagged={flags[r.q.n]} />
              ))}
            </ol>
          )}
        </section>
      </div>
    );
  }

  /* ============================== Running ============================== */
  if (!q) return null;
  const mine = answers[q.n];
  const right = correctOf(q);
  const revealed = mode === "practice" && (mine !== undefined || Boolean(shown[q.n]));
  const hintLevel = hints[q.n] ?? 0;
  const isLast = idx === questions.length - 1;
  const timeWarn = !timed
    ? ""
    : remaining <= 60
      ? "เหลือเวลาไม่ถึง 1 นาที ระบบจะส่งอัตโนมัติเมื่อหมดเวลา"
      : remaining <= 300
        ? "เหลือเวลาไม่ถึง 5 นาที"
        : "";

  return (
    <div>
      <div className="sticky top-[var(--header-h)] z-30 -mx-5 border-b border-rule bg-paper/95 px-5 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{t.titleTh}</p>
            <p className="text-xs text-ink-subtle">{mode === "exam" ? "จำลองสอบ" : "ฝึกทีละข้อ"}</p>
          </div>
          {timed ? (
            <p role="timer" aria-label={`เวลาที่เหลือ ${clock(remaining)}`} className={`num font-mono text-xl ${remaining <= 300 ? "text-bad" : "text-ink"}`}>
              {clock(remaining)}
            </p>
          ) : (
            <p className="text-sm text-ink-muted">
              ถูก <span className="num font-mono text-ink">{score}</span> จาก <span className="num font-mono">{checked}</span>
            </p>
          )}
          <p className="text-sm text-ink-muted">
            ตอบแล้ว <span className="num font-mono text-ink">{answered}/{questions.length}</span>
          </p>
          <button type="button" className={`btn h-9 ${mode === "exam" ? "btn-primary" : "btn-secondary"}`} onClick={requestSubmit}>
            {mode === "exam" ? "ส่งข้อสอบ" : "ดูสรุปผล"}
          </button>
        </div>

        {confirming ? (
          <div role="alert" className="mt-3 flex flex-wrap items-center gap-3 border-t border-rule pt-3 text-sm">
            <span className="text-ink">ยังไม่ได้ตอบ {missing} ข้อ ต้องการส่งเลยไหม?</span>
            <button type="button" className="btn btn-primary h-9" onClick={submit}>
              ส่งเลย
            </button>
            <button type="button" className="btn btn-secondary h-9" onClick={() => setConfirming(false)}>
              ทำต่อ
            </button>
          </div>
        ) : null}

        <p aria-live="polite" className="text-xs text-bad empty:hidden">
          {timeWarn}
        </p>
      </div>

      <nav aria-label="เลือกข้อ" className="mt-6">
        <ol className="flex flex-wrap gap-1.5">
          {results.map((r, i) => {
            const current = i === idx;
            const state =
              mode === "practice" && r.mine !== undefined ? (r.ok ? "ok" : "bad") : r.mine !== undefined ? "done" : "todo";
            const cls = current
              ? "border-accent bg-accent text-on-accent"
              : state === "ok"
                ? "border-good bg-good-wash text-good"
                : state === "bad"
                  ? "border-bad bg-bad-wash text-bad"
                  : state === "done"
                    ? "border-rule-strong bg-surface-hover text-ink"
                    : "border-rule bg-surface text-ink-subtle";
            const words = { ok: "ถูก", bad: "ผิด", done: "ตอบแล้ว", todo: "ยังไม่ตอบ" }[state];
            return (
              <li key={r.q.n}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={current ? "step" : undefined}
                  aria-label={`ข้อ ${r.q.n} ${words}${flags[r.q.n] ? " ปักธงไว้" : ""}`}
                  className={`num relative h-9 w-9 rounded-md border font-mono text-xs transition-colors ${cls}`}
                >
                  {r.q.n}
                  {flags[r.q.n] ? <span aria-hidden className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-warn" /> : null}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <article className="mt-6 rounded-xl border border-rule bg-surface">
        <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-rule px-6 py-3 text-xs text-ink-subtle">
          <span className="num font-mono text-sm text-accent">
            ข้อ {idx + 1}/{questions.length}
          </span>
          <span>{q.lectures.join(" · ")}</span>
          {KIND_LABELS[q.kind] ? <span>{KIND_LABELS[q.kind]}</span> : null}
          <span className="ml-auto flex items-center gap-1">
            {mode === "exam" ? (
              <button
                type="button"
                aria-pressed={Boolean(flags[q.n])}
                onClick={() => setFlags((f) => ({ ...f, [q.n]: !f[q.n] }))}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-surface-hover hover:text-ink"
              >
                {flags[q.n] ? <BookmarkFilledIcon className="text-warn" aria-hidden /> : <BookmarkIcon aria-hidden />}
                ปักธงไว้ทบทวน
              </button>
            ) : !revealed && hintLevel < maxHint(q) ? (
              <button
                type="button"
                onClick={nextHint}
                className="rounded-md px-2 py-1 text-warn transition-colors hover:bg-warn-wash"
              >
                ขอคำใบ้ {hintLevel + 1}/{maxHint(q)}
              </button>
            ) : null}
          </span>
        </header>

        <div className="px-6 py-6">
          {mode === "practice" && hintLevel > 0 && !revealed ? (
            <div className="mb-5 space-y-2">
              <Note tone="pitfall" title="คำใบ้ 1: หัวข้อ">
                ข้อนี้อยู่ใน {q.lectures.join(", ")}
                {q.slideRef ? ` — ดู ${q.slideRef}` : ""}
              </Note>
              {hintLevel >= 2 && q.distractor ? (
                <Note tone="pitfall" title="คำใบ้ 2: กับดักของข้อนี้">
                  {q.distractor}
                </Note>
              ) : null}
            </div>
          ) : null}

          <h2 ref={headingRef} tabIndex={-1} className="whitespace-pre-line text-xl font-semibold leading-relaxed text-ink outline-none">
            {q.prompt}
          </h2>

          {q.options?.length ? (
            <fieldset className="mt-6">
              <legend className="sr-only">ตัวเลือกของข้อ {idx + 1}</legend>
              <ul className="space-y-2">
                {q.options.map((o) => {
                  const selected = mine === o.label;
                  const state: OptionState = revealed
                    ? o.correct
                      ? "correct"
                      : selected
                        ? "wrong"
                        : "dim"
                    : selected
                      ? "selected"
                      : "idle";
                  return (
                    <li key={o.label}>
                      <label
                        className={`flex items-start gap-3 rounded-lg border px-4 py-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${OPTION_STYLE[state]}`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.n}`}
                          value={o.label}
                          checked={selected}
                          disabled={revealed}
                          onChange={() => choose(o.label)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${BADGE_STYLE[state]}`}
                        >
                          {state === "correct" ? <CheckIcon /> : state === "wrong" ? <Cross2Icon /> : L(o.label)}
                        </span>
                        <span className="text-[15px] leading-relaxed text-ink">
                          <span className="sr-only">{L(o.label)}. </span>
                          {o.text}
                          {state === "correct" ? <span className="sr-only"> (คำตอบที่ถูก)</span> : null}
                          {state === "wrong" ? <span className="sr-only"> (คำตอบของคุณ ผิด)</span> : null}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          ) : (
            <div className="mt-6 space-y-2">
              {mode === "practice" && !shown[q.n] ? (
                <button type="button" className="btn btn-secondary" onClick={() => setShown((s) => ({ ...s, [q.n]: true }))}>
                  ดูแนวคำตอบ
                </button>
              ) : null}
              {mode === "exam" ? <p className="text-sm text-ink-muted">ข้อเขียน: ตอบลงกระดาษ แล้วดูแนวคำตอบหลังส่ง</p> : null}
              <p className="text-xs text-ink-subtle">ข้อนี้ไม่นับคะแนน</p>
            </div>
          )}

          {revealed ? (
            <div
              role="status"
              className={`mt-6 rounded-r-lg border-l-2 px-5 py-4 ${
                !right ? "border-accent bg-accent-wash" : mine === right.label ? "border-good bg-good-wash" : "border-bad bg-bad-wash"
              }`}
            >
              <p className="font-semibold text-ink">
                {!right ? "แนวคำตอบ" : mine === right.label ? "ถูกต้อง" : `ยังไม่ถูก — คำตอบคือ ${L(right.label)}`}
              </p>
              <p className="mt-2 whitespace-pre-line leading-relaxed text-ink-muted">{q.explanation}</p>
              {right && mine !== right.label && q.distractor ? (
                <p className="mt-3 text-sm text-ink-muted">
                  <strong className="text-ink">จุดที่มักผิด: </strong>
                  {q.distractor}
                </p>
              ) : null}
              {q.slideRef ? <p className="mt-3 font-mono text-xs text-ink-subtle">{q.slideRef}</p> : null}
            </div>
          ) : null}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-rule px-6 py-4">
          <button type="button" className="btn btn-secondary" disabled={idx === 0} onClick={() => go(idx - 1)}>
            <ArrowLeftIcon aria-hidden />
            ก่อนหน้า
          </button>
          <span className="hidden text-xs text-ink-subtle md:inline">
            <kbd>A</kbd>–<kbd>D</kbd> ตอบ · <kbd>←</kbd> <kbd>→</kbd> เปลี่ยนข้อ{mode === "practice" ? <> · <kbd>H</kbd> คำใบ้</> : null}
          </span>
          {isLast ? (
            <button type="button" className="btn btn-primary" onClick={requestSubmit}>
              {mode === "exam" ? "ส่งข้อสอบ" : "ดูสรุปผล"}
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => go(idx + 1)}>
              ข้อถัดไป
              <ArrowRightIcon aria-hidden />
            </button>
          )}
        </footer>
      </article>
    </div>
  );
}

function ChoiceCard({
  name,
  checked,
  onChange,
  title,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
        checked ? "border-accent bg-accent-wash" : "border-rule bg-surface hover:border-rule-strong"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1.5 h-4 w-4 shrink-0 accent-[var(--color-accent)]" />
      <span className="min-w-0">
        <span className="block font-semibold text-ink">{title}</span>
        <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">{children}</span>
      </span>
    </label>
  );
}

function ReviewItem({ r, flagged }: { r: Result; flagged?: boolean }) {
  const status = !r.gradable ? "ข้อเขียน" : r.ok ? "ถูก" : r.mine === undefined ? "ไม่ได้ตอบ" : "ผิด";
  const tone = !r.gradable ? "text-ink-subtle" : r.ok ? "text-good" : "text-bad";
  return (
    <li className="rounded-xl border border-rule bg-surface">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-rule px-5 py-3 text-xs text-ink-subtle">
        <span className="num font-mono text-sm text-ink">ข้อ {r.q.n}</span>
        <span className={`inline-flex items-center gap-1 font-medium ${tone}`}>
          {r.gradable ? r.ok ? <CheckIcon aria-hidden /> : <Cross2Icon aria-hidden /> : null}
          {status}
        </span>
        {flagged ? <span className="text-warn">ปักธงไว้</span> : null}
        <span className="ml-auto">
          {r.q.lectures.join(" · ")}
          {KIND_LABELS[r.q.kind] ? ` · ${KIND_LABELS[r.q.kind]}` : ""}
        </span>
      </header>
      <div className="space-y-4 px-5 py-5">
        <p className="whitespace-pre-line font-medium leading-relaxed text-ink">{r.q.prompt}</p>
        {r.gradable ? (
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div className="rounded-lg border border-good bg-good-wash px-3 py-2">
              <dt className="text-xs text-ink-subtle">คำตอบที่ถูก</dt>
              <dd className="text-ink">
                <span className="font-mono">{L(r.right)}.</span> {optionText(r.q, r.right)}
              </dd>
            </div>
            {!r.ok ? (
              <div className="rounded-lg border border-rule px-3 py-2">
                <dt className="text-xs text-ink-subtle">คุณตอบ</dt>
                <dd className="text-ink">
                  {r.mine ? (
                    <>
                      <span className="font-mono">{L(r.mine)}.</span> {optionText(r.q, r.mine)}
                    </>
                  ) : (
                    "ไม่ได้ตอบ"
                  )}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}
        <div>
          <p className="mb-1 text-xs text-ink-subtle">วิธีคิด</p>
          <p className="whitespace-pre-line leading-relaxed text-ink-muted">{r.q.explanation}</p>
        </div>
        {r.q.distractor ? (
          <Note tone="pitfall" title="จุดที่มักผิด">
            {r.q.distractor}
          </Note>
        ) : null}
        {r.q.slideRef ? <p className="text-right font-mono text-xs text-ink-subtle">{r.q.slideRef}</p> : null}
      </div>
    </li>
  );
}

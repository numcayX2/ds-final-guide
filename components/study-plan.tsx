"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { CheckIcon, ClockIcon, ResetIcon } from "@radix-ui/react-icons";
import { Reveal } from "./reveal";

export interface PlanStep {
  step: string;
  day: string;
  title: string;
  desc: string;
  href: string;
  time: string;
  tag: string;
}

const STORAGE_KEY = "ds-plan-done-v1";

/* localStorage as the single source of truth: no setState-in-effect,
   no hydration mismatch (server snapshot is always "[]"). */
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("ds-plan-done", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("ds-plan-done", callback);
  };
}

function getSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot(): string {
  return "[]";
}

function parseDone(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

function writeDone(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* storage unavailable (private mode): progress just won't persist */
  }
  window.dispatchEvent(new Event("ds-plan-done"));
}

/**
 * The 3-day study plan: a horizontal timeline of three step cards with
 * checkboxes. Completion state persists in localStorage so a student can
 * leave and come back without losing progress.
 */
export function StudyPlan({ steps }: { steps: PlanStep[] }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const done = parseDone(raw);

  const toggle = useCallback(
    (id: string) => {
      writeDone(
        done.includes(id)
          ? done.filter((x) => x !== id)
          : [...done, id]
      );
    },
    [done]
  );

  const reset = useCallback(() => writeDone([]), []);

  const total = steps.length;
  const count = done.filter((id) => steps.some((s) => s.step === id)).length;
  const pct = total === 0 ? 0 : Math.round((count / total) * 100);
  const complete = count === total && total > 0;


  return (
    <div>
      {/* Progress tracker */}
      <div className="bento-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm font-bold text-ink">
              ความคืบหน้าแผน 3 วัน
            </span>
            <span className="text-xs font-mono font-medium text-ink-muted">
              {count}/{total} สเต็ป &middot; {pct}%
            </span>
          </div>
          <div
            className="progress-track mt-2.5"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="ความคืบหน้าแผน 3 วัน"
          >
            <div
              className={`progress-fill ${complete ? "is-complete" : ""}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {complete ? (
            <span className="bento-pill border border-mint text-mint bg-mint-wash/30 font-semibold text-[11px]">
              <CheckIcon className="w-3.5 h-3.5" />
              เสร็จสมบูรณ์
            </span>
          ) : (
            <span className="text-xs text-ink-subtle hidden sm:block">
              ทำเครื่องหมายสเต็ปที่เสร็จแล้ว
            </span>
          )}
          {count > 0 && (
            <button
              type="button"
              onClick={reset}
              className="tactile-btn text-xs font-semibold text-ink-muted px-3 py-2 inline-flex items-center gap-1.5"
            >
              <ResetIcon className="w-3.5 h-3.5" />
              รีเซ็ต
            </button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="plan-track grid gap-4 md:gap-6 md:grid-cols-3">
        {steps.map((s, idx) => {
          const isDone = done.includes(s.step);
          return (
            <Reveal key={s.step} delay={idx * 60} className="h-full" scrollCrumble alt={idx % 2 === 1}>
              <article
                className={`bento-card p-6 flex flex-col h-full group ${
                  isDone ? "border-mint" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="plan-node" aria-hidden="true">
                      {s.step}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="bento-pill border border-mint text-mint bg-mint-wash/30 font-bold font-mono">
                        {s.day}
                      </span>
                      <span className="text-[11px] text-ink-subtle font-mono inline-flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        {s.time}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={isDone}
                    aria-label={`${s.day} เสร็จแล้ว`}
                    onClick={() => toggle(s.step)}
                    className={`plan-check ${isDone ? "is-checked" : ""}`}
                  >
                    {isDone && <CheckIcon className="w-4 h-4" />}
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-ink mt-4 tracking-tight">
                  <Link
                    href={s.href}
                    className="hover:text-accent transition-colors"
                  >
                    {s.title}
                  </Link>
                </h3>
                <p className="text-xs text-ink-subtle mt-1 font-medium">
                  {s.tag}
                </p>
                <p className="text-sm text-ink-muted mt-3 leading-relaxed">
                  {s.desc}
                </p>

                {isDone && (
                  <p className="mt-3">
                    <span className="bento-pill border border-mint text-mint bg-mint-wash/30 text-[10px] font-semibold">
                      <CheckIcon className="w-3 h-3" />
                      เสร็จแล้ว
                    </span>
                  </p>
                )}

                <div className="mt-auto pt-6 border-t border-rule flex items-center justify-between text-xs font-semibold text-accent">
                  <Link href={s.href}>เริ่มสเต็ปนี้</Link>
                  <Link
                    href={s.href}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    &rarr;
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

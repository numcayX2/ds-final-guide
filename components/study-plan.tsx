"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

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
const EVENT = "ds-plan-done";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

const getServerSnapshot = () => "[]";

function parseDone(raw: string): string[] {
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeDone(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* private mode: progress won't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function StudyPlan({ steps }: { steps: PlanStep[] }) {
  const done = parseDone(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
  const toggle = (id: string) => writeDone(done.includes(id) ? done.filter((x) => x !== id) : [...done, id]);
  const count = steps.filter((s) => done.includes(s.step)).length;

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div
          role="progressbar"
          aria-label="ความคืบหน้าแผน 3 วัน"
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-valuenow={count}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-rule"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${steps.length ? (count / steps.length) * 100 : 0}%` }}
          />
        </div>
        <span className="num font-mono text-sm text-ink-muted">
          {count}/{steps.length}
        </span>
        {count > 0 ? (
          <button type="button" onClick={() => writeDone([])} className="text-link text-sm">
            ล้าง
          </button>
        ) : null}
      </div>

      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((s) => {
          const isDone = done.includes(s.step);
          const id = `plan-${s.step}`;
          return (
            <li
              key={s.step}
              className={`flex flex-col rounded-xl border p-5 transition-colors ${
                isDone ? "border-good bg-good-wash" : "border-rule bg-surface"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-sm text-accent">{s.day}</span>
                <span className="font-mono text-xs text-ink-subtle">{s.time}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{s.title}</h3>
              <p className="mt-0.5 text-xs text-ink-subtle">{s.tag}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{s.desc}</p>

              <div className="mt-auto pt-5">
                <div className="flex items-center justify-between gap-3 border-t border-rule pt-4">
                  <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
                    <input
                      id={id}
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggle(s.step)}
                      className="h-4 w-4 accent-[var(--color-good)]"
                    />
                    ทำเสร็จแล้ว
                  </label>
                  <Link href={s.href} className="text-link inline-flex items-center gap-1 text-sm font-medium">
                    เริ่ม
                    <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

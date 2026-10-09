"use client";

import { useMemo, useState } from "react";
import type { Formula } from "@/content/types";
import { Tex } from "./math-formula";
import { Note } from "./ui";

const LECTURE_TABS = [
  { id: "all", label: "ทั้งหมด" },
  { id: "Lect 05", label: "Lect 05 · EDA" },
  { id: "Lect 07", label: "Lect 07 · Trees" },
  { id: "Lect 08", label: "Lect 08 · Metrics" },
  { id: "Lect 09", label: "Lect 09 · K-Means & RDS" },
] as const;

export function FormulaExplorer({ formulas }: { formulas: Formula[] }) {
  const [lect, setLect] = useState<string>("all");
  const [query, setQuery] = useState("");

  const indexed = useMemo(
    () =>
      formulas.map((f, i) => ({
        f,
        no: String(i + 1).padStart(2, "0"),
        haystack: [f.name, f.expression, f.output, f.pitfall ?? "", ...f.symbols.flatMap((s) => [s.symbol, s.meaning])]
          .join(" ")
          .toLowerCase(),
      })),
    [formulas],
  );

  const counts = useMemo(
    () =>
      Object.fromEntries(
        LECTURE_TABS.map((t) => [
          t.id,
          formulas.filter((f) => t.id === "all" || (f.lectures as readonly string[]).includes(t.id)).length,
        ])
      ),
    [formulas],
  );

  const q = query.trim().toLowerCase();
  const filtered = indexed.filter(
    (x) =>
      (lect === "all" || (x.f.lectures as readonly string[]).includes(lect)) &&
      (!q || x.haystack.includes(q))
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-[var(--header-h,4rem)] z-30 border-b border-rule bg-paper/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-3 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1" role="group" aria-label="กรองตามบทเรียน">
            {LECTURE_TABS.map((tab) => {
              const on = lect === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setLect(tab.id)}
                  className={`shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                    on ? "border-accent bg-accent-wash text-accent-ink" : "border-transparent text-ink-muted hover:text-ink"
                  }`}
                >
                  {tab.label} <span className="num font-mono text-ink-subtle">{counts[tab.id]}</span>
                </button>
              );
            })}
          </div>
          <div className="relative w-full md:w-72">
            <label htmlFor="formula-search" className="sr-only">ค้นหาสูตร</label>
            <input
              id="formula-search"
              type="search"
              placeholder="ค้นหาชื่อสูตร หรือสัญลักษณ์"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field field-sm pr-9 font-sans"
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} aria-label="ล้างคำค้นหา"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink">
                ×
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
        <p className="mb-6 text-sm text-ink-subtle" aria-live="polite">
          แสดง {filtered.length} จาก {formulas.length} สูตร
        </p>

        <div className="space-y-6">
          {filtered.map(({ f, no }) => (
            <article key={f.id} id={f.id} className="scroll-mt-40 rounded-xl border border-rule bg-surface">
              <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-rule px-6 py-4">
                <span className="num font-mono text-sm text-accent">{no}</span>
                <h2 className="text-xl font-semibold tracking-tight text-ink">{f.name}</h2>
                <span className="ml-auto font-mono text-xs text-ink-subtle">{f.lectures.join(" · ")}</span>
              </header>

              <div className="grid gap-8 p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                <div>
                  <p className="text-ink-muted">{f.output}</p>
                  <div className="my-5 overflow-x-auto rounded-lg bg-accent-wash px-5 py-5 text-lg text-ink">
                    {f.tex ? <Tex tex={f.tex} display /> : <p className="text-center font-mono text-xl">{f.expression}</p>}
                  </div>
                  {f.symbols.length > 0 ? (
                    <>
                      <p className="mb-2 text-xs text-ink-subtle">โดยที่</p>
                      <dl className="space-y-2">
                        {f.symbols.map((s) => (
                          <div key={s.symbol} className="grid grid-cols-[minmax(4rem,auto)_minmax(0,1fr)] items-baseline gap-4">
                            <dt className="font-mono text-ink">{s.symbol}</dt>
                            <dd className="text-[15px] text-ink-muted">{s.meaning}</dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  ) : null}
                </div>

                <div className="space-y-5">
                  {f.example ? (
                    <section>
                      <p className="mb-2 text-xs text-ink-subtle">ตัวอย่าง</p>
                      <p className="font-mono text-sm text-ink">{f.example.given}</p>
                      <ol className="mt-3 space-y-1.5">
                        {f.example.steps.map((s, k) => (
                          <li key={k} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2 text-sm text-ink-muted">
                            <span className="num font-mono text-xs text-ink-subtle">{k + 1}</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ol>
                      <p className="mt-3 flex items-baseline justify-between border-t border-rule pt-3">
                        <span className="text-sm text-ink-subtle">คำตอบ</span>
                        <span className="answer num font-mono font-semibold text-ink">{f.example.result}</span>
                      </p>
                    </section>
                  ) : null}
                  {f.pitfall ? <Note tone="pitfall" title="จุดที่มักผิด">{f.pitfall}</Note> : null}
                  {f.verification === "needs-slide-check" ? (
                    <p className="text-xs text-warn">ยังไม่ได้เทียบกับสไลด์ — ตรวจกับเอกสารอาจารย์ก่อนใช้</p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-rule-strong px-6 py-12 text-center">
              <p className="font-semibold text-ink">ไม่พบสูตรที่ตรงกับ “{query}”</p>
              <button type="button" onClick={() => { setLect("all"); setQuery(""); }} className="btn btn-secondary mt-4">
                ล้างตัวกรอง
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

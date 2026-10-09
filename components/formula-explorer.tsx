"use client";

import { useState, useMemo } from "react";
import type { Formula } from "@/content/types";
import { Reveal } from "./reveal";

interface FormulaExplorerProps {
  formulas: Formula[];
}

const LECTURE_TABS = [
  { id: "all", label: "ทุกบทเรียน" },
  { id: "Lect 05", label: "Lect 05 (EDA)" },
  { id: "Lect 07", label: "Lect 07 (Trees)" },
  { id: "Lect 08", label: "Lect 08 (Metrics)" },
  { id: "Lect 09", label: "Lect 09 (RDS & K-Means)" },
];

export function FormulaExplorer({ formulas }: FormulaExplorerProps) {
  const [selectedLect, setSelectedLect] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return formulas.filter((f) => {
      if (selectedLect !== "all" && !f.lectures.includes(selectedLect as any)) {
        return false;
      }
      if (!q) return true;
      const matchName = f.name.toLowerCase().includes(q);
      const matchExpr = f.expression.toLowerCase().includes(q);
      const matchOutput = f.output.toLowerCase().includes(q);
      const matchPitfall = f.pitfall ? f.pitfall.toLowerCase().includes(q) : false;
      const matchSymbols = f.symbols.some(
        (s) =>
          s.symbol.toLowerCase().includes(q) || s.meaning.toLowerCase().includes(q)
      );
      return matchName || matchExpr || matchOutput || matchPitfall || matchSymbols;
    });
  }, [formulas, selectedLect, searchQuery]);

  return (
    <div>
      {/* Controls Bar */}
      <div className="shell py-4 border-b border-rule bg-bg/92 backdrop-blur-md sticky top-[68px] sm:top-[74px] z-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          {/* Lecture Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {LECTURE_TABS.map((tab) => {
              const active = selectedLect === tab.id;
              const count =
                tab.id === "all"
                  ? formulas.length
                  : formulas.filter((f) => f.lectures.includes(tab.id as any)).length;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedLect(tab.id)}
                  aria-pressed={active}
                  className={`px-3 py-1.5 text-xs font-semibold border transition-colors cursor-pointer ${
                    active
                      ? "bg-ink text-bg border-ink"
                      : "bg-surface text-ink-muted border-rule-strong hover:text-ink"
                  }`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="search"
              placeholder="ค้นหาชื่อสูตร หรือสัญลักษณ์..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2 bg-surface border border-rule-strong focus:border-accent outline-none text-ink placeholder:text-ink-subtle"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-subtle hover:text-ink"
                aria-label="ล้างคำค้นหา"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Status count */}
        <p className="mt-2 text-[11px] text-ink-subtle">
          แสดง {filtered.length} จากทั้งหมด {formulas.length} สูตร
          {searchQuery && ` (ผลการค้นหา: "${searchQuery}")`}
        </p>
      </div>

      {/* Formula Sheets */}
      <div className="shell py-8">
        <div className="grid gap-6">
          {filtered.map((f, i) => (
            <Reveal key={f.id} delay={Math.min(i * 30, 200)}>
              <article
                id={f.id}
                className="bento-card p-6 sm:p-7 scroll-mt-36"
              >
                <div className="grid-12 gap-6 items-start">
                  {/* Left Column: Title, Expression, Variable Glossary */}
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="index text-2xl text-ink-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-ink">
                        {f.name}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-ink-muted mb-4">{f.output}</p>

                    {/* Expression */}
                    <p className="font-mono text-xl sm:text-2xl font-bold text-ink border-l-2 border-accent pl-4 mb-5 tnum">
                      {f.expression}
                    </p>

                    {/* Variables Table */}
                    {f.symbols.length > 0 && (
                      <div className="space-y-2 mt-4 pt-4 border-t border-rule">
                        <span className="eyebrow block mb-2">
                          ความหมายตัวแปรในสูตร (Variables)
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {f.symbols.map((s) => (
                            <div
                              key={s.symbol}
                              className="p-2.5 bg-surface-hover border border-rule flex items-start gap-2.5 text-xs"
                            >
                              <span className="font-mono font-bold text-accent-ink shrink-0 bg-surface px-1.5 py-0.5 border border-rule">
                                {s.symbol}
                              </span>
                              <span className="text-ink-muted leading-relaxed">
                                {s.meaning}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Worked Example & Exam Pitfall */}
                  <div className="col-span-12 lg:col-span-5 flex flex-col justify-between h-full">
                    {/* Worked Example */}
                    {f.example ? (
                      <div className="p-4 border border-rule bg-surface">
                        <span className="eyebrow block mb-2">ตัวอย่างการคำนวณจริง</span>
                        <p className="text-xs font-mono text-ink-muted mt-1">{f.example.given}</p>
                        <ol className="mt-2.5 space-y-1 text-xs text-ink-muted pl-4 list-decimal">
                          {f.example.steps.map((s, k) => (
                            <li key={k} className="leading-relaxed">
                              {s}
                            </li>
                          ))}
                        </ol>
                        <div className="mt-3 pt-2 border-t border-rule flex items-center justify-between">
                          <span className="text-xs text-ink-subtle">คำตอบ:</span>
                          <span className="font-mono font-bold text-base text-mint tnum">
                            = {f.example.result}
                          </span>
                        </div>
                      </div>
                    ) : null}

                    {/* Exam Pitfall Box */}
                    {f.pitfall ? (
                      <div className="exam-pitfall-card mt-4">
                        <p className="eyebrow eyebrow-amber mb-1.5">จุดระวังในห้องสอบ (Exam Trap)</p>
                        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                          {f.pitfall}
                        </p>
                      </div>
                    ) : null}

                    {/* Footer tags */}
                    <div className="mt-5 pt-3 border-t border-rule flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {f.lectures.map((l) => (
                          <span
                            key={l}
                            className="bento-pill border border-rule text-ink-subtle"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                      {f.verification !== "needs-slide-check" && (
                        <span className="bento-pill border border-mint text-mint">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          {filtered.length === 0 && (
            <div className="bento-card p-12 text-center">
              <p className="text-base font-semibold text-ink">
                ไม่พบสูตรที่ตรงกับคำค้นหา &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-ink-muted mt-1">ลองค้นหาด้วยคำอื่น หรือกดรีเซ็ตตัวกรอง</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedLect("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold border border-accent bg-accent text-white hover:bg-accent-ink cursor-pointer transition-colors"
              >
                รีเซ็ตตัวกรองทั้งหมด
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

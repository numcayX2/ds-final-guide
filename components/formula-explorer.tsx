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
  { id: "Lect 07", label: "Lect 07 (Trees & Metrics)" },
  { id: "Lect 08", label: "Lect 08 (K-Means)" },
  { id: "Lect 09", label: "Lect 09 (RDS & SHAP)" },
];

export function FormulaExplorer({ formulas }: FormulaExplorerProps) {
  const [selectedLect, setSelectedLect] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return formulas.filter((f) => {
      // Lecture filter
      if (selectedLect !== "all" && !f.lectures.includes(selectedLect as any)) {
        return false;
      }
      // Text search
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
      <div className="shell py-5 border-b border-rule bg-bg/85 backdrop-blur-md sticky top-[65px] z-40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Lecture Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
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
                  className={`tap px-3 py-1.5 text-xs font-mono font-medium border transition-all duration-200 ${
                    active
                      ? "border-accent bg-accent text-white cyber-glow font-bold"
                      : "border-rule-strong hover:border-accent hover:text-accent-ink"
                  }`}
                >
                  {tab.label} [{count}]
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="search"
              placeholder="SEARCH // ค้นหาชื่อสูตร สัญลักษณ์..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="tap w-full text-xs font-mono px-3.5 py-2 bg-bg/90 border border-rule-strong focus:border-accent outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-ink-muted hover:text-accent-ink"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Status text */}
        <p className="mt-2.5 text-[11px] font-mono text-ink-subtle">
          INDEX_COUNT: {filtered.length} / {formulas.length} FORMULAS
          {searchQuery && ` (FILTER: "${searchQuery}")`}
        </p>
      </div>

      {/* Formula Cards List */}
      <ol className="shell">
        {filtered.map((f, i) => (
          <Reveal as="li" key={f.id} delay={Math.min(i * 30, 200)}>
            <article id={f.id} className="grid-12 py-sp-1 border-t border-rule items-start scroll-mt-36">
              <div className="col-span-12 lg:col-span-1">
                <span className="index text-2xl font-mono text-ink-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="col-span-12 lg:col-span-6 mt-4 lg:mt-0">
                <h2 className="text-2xl lg:text-3xl tracking-reset font-medium">
                  {f.name}
                </h2>
                <p className="mt-2 text-ink-muted">{f.output}</p>
                <div className="mt-4 p-4 bg-accent-wash/60 border border-rule-strong/40 hud-bracket">
                  <p className="meta-label tracking-display text-accent-ink tnum text-lg font-mono font-bold">
                    {f.expression}
                  </p>
                </div>

                {f.symbols.length > 0 && (
                  <dl className="mt-6 space-y-2">
                    {f.symbols.map((s) => (
                      <div key={s.symbol} className="flex gap-4 text-sm">
                        <dt className="tnum font-medium w-36 shrink-0">{s.symbol}</dt>
                        <dd className="text-ink-muted">{s.meaning}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0 lg:col-start-9">
                {f.example ? (
                  <div className="border-t border-rule pt-4">
                    <p className="meta-label tracking-display text-ink-subtle">
                      ตัวอย่างการคำนวณ
                    </p>
                    <p className="mt-3 text-sm tnum text-ink-muted">{f.example.given}</p>
                    <ol className="mt-3 space-y-1">
                      {f.example.steps.map((s, k) => (
                        <li key={k} className="tnum text-sm text-ink-muted pl-4 relative">
                          <span className="absolute left-0 text-ink-subtle">{k + 1}.</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 tnum text-xl text-accent-ink font-medium">
                      = {f.example.result}
                    </p>
                  </div>
                ) : null}

                {f.pitfall ? (
                  <div className="mt-6 border-t-2 border-accent pt-4">
                    <p className="meta-label tracking-display text-accent-ink">
                      จุดระวังข้อสอบ
                    </p>
                    <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                      {f.pitfall}
                    </p>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {f.lectures.map((l) => (
                    <span
                      key={l}
                      className="px-2 py-0.5 text-xs font-mono border border-rule text-ink-subtle"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        {filtered.length === 0 && (
          <li className="py-sp-2 text-center border-t border-rule">
            <p className="text-ink-muted">ไม่พบสูตรที่ตรงกับคำค้นหา &ldquo;{searchQuery}&rdquo;</p>
            <button
              type="button"
              onClick={() => {
                setSelectedLect("all");
                setSearchQuery("");
              }}
              className="mt-4 tap px-4 py-2 text-xs font-medium border border-rule-strong hover:border-accent hover:text-accent-ink transition-colors"
            >
              รีเซ็ตตัวกรองทั้งหมด
            </button>
          </li>
        )}
      </ol>
    </div>
  );
}

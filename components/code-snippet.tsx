"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

/**
 * A value the exam expects students to fill in themselves: either a bare
 * identifier (`"max_depth"`), or an identifier plus a short Thai hint that is
 * shown in the legend under the snippet.
 */
export type CodeParam = string | { token: string; note?: string };

type Param = { token: string; note?: string };

function normalizeParams(params?: CodeParam[]): Param[] {
  return (params ?? [])
    .map((p) => (typeof p === "string" ? { token: p } : p))
    .filter((p) => p.token.trim().length > 0);
}

/**
 * The part of a line that is actual Python code: everything before an
 * unquoted `#`. A parameter mentioned inside a Thai comment is not a parameter
 * the student has to fill in, so it must not be highlighted.
 */
function codePartOf(line: string): string {
  let quote: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quote) {
      if (ch === "\\") i++;
      else if (ch === quote) quote = null;
    } else if (ch === "'" || ch === '"') {
      quote = ch;
    } else if (ch === "#") {
      return line.slice(0, i);
    }
  }
  return line;
}

/** Ranges (in the raw line) covered by a must-change parameter. */
function paramSpans(line: string, params: Param[]): { start: number; end: number }[] {
  const code = codePartOf(line);
  const spans: { start: number; end: number }[] = [];
  for (const { token } of params) {
    const literal = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`\\b${literal}\\b`, "g");
    for (let match = re.exec(code); match; match = re.exec(code)) {
      let end = match.index + match[0].length;
      // Extend over the assigned value (`max_depth=3`) so the highlight covers
      // what the student actually has to type. Stops at a space, comma or `)`.
      const assignment = /^\s*=\s*[^\s,)]+/.exec(code.slice(end));
      if (assignment) end += assignment[0].length;
      spans.push({ start: match.index, end });
    }
  }
  return spans.sort((a, b) => a.start - b.start);
}

function renderLine(line: string, spans: { start: number; end: number }[]): ReactNode {
  if (spans.length === 0) return line;
  const out: ReactNode[] = [];
  let at = 0;
  spans.forEach((span, index) => {
    if (span.start < at) return; // overlapping tokens: first one wins
    if (span.start > at) out.push(line.slice(at, span.start));
    out.push(
      <mark key={index} className="rounded-[3px] bg-accent/15 text-accent-ink">
        {line.slice(span.start, span.end)}
      </mark>,
    );
    at = span.end;
  });
  if (at < line.length) out.push(line.slice(at));
  return out;
}

/**
 * Horizontal scroller for code. The right-edge fade is painted only while the
 * content is actually wider than the box and not yet scrolled to the end, so
 * mobile readers can see that a line continues past the edge. Assumes a
 * surface-coloured background (the fade starts from `surface`).
 */
export function CodeScroll({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState({ overflowing: false, atEnd: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const overflowing = max > 1;
    const atEnd = !overflowing || el.scrollLeft >= max - 1;
    setState((prev) =>
      prev.overflowing === overflowing && prev.atEnd === atEnd ? prev : { overflowing, atEnd },
    );
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(el);
    // The webfonts land after first paint and change how wide the longest line is.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      el.removeEventListener("scroll", measure);
      observer?.disconnect();
    };
  }, [measure]);

  return (
    <div className="relative">
      <div
        ref={ref}
        role={state.overflowing ? "group" : undefined}
        tabIndex={state.overflowing ? 0 : undefined}
        aria-label={state.overflowing ? (label ?? "โค้ดที่เลื่อนดูแนวนอนได้") : undefined}
        className={`overflow-x-auto ${className}`}
      >
        {children}
      </div>
      {state.overflowing && !state.atEnd && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface via-surface/80 to-transparent"
        />
      )}
    </div>
  );
}

export function CodeSnippet({
  code,
  language = "python",
  title,
  params,
}: {
  code: string;
  language?: string;
  title?: string;
  /** Identifiers the student has to change; matched against the snippet source. */
  params?: CodeParam[];
}) {
  const [copied, setCopied] = useState(false);
  const wanted = normalizeParams(params);
  const lines = code.split("\n");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }

  return (
    <div className="relative my-4 overflow-hidden rounded-xl border border-rule-strong bg-surface shadow-xs">
      <div className="flex items-center justify-between gap-3 border-b border-rule bg-surface-hover/60 px-4 py-2 text-xs">
        <div className="flex min-w-0 items-center gap-2">
          <span className="font-mono font-medium text-ink-subtle uppercase">
            {language}
          </span>
          {title && (
            <span className="border-l border-rule pl-2 font-semibold text-ink">
              {title}
            </span>
          )}
        </div>
        {/* Thai label stays on the sans stack: Plex Mono carries no Thai glyphs. */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "คัดลอกแล้ว" : "คัดลอกโค้ด"}
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-md border border-rule px-3 text-[11px] font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink sm:min-h-7 sm:px-2"
        >
          {copied ? (
            <>
              <CheckIcon className="h-3.5 w-3.5 text-good" />
              <span className="font-semibold text-good">คัดลอกแล้ว</span>
            </>
          ) : (
            <>
              <CopyIcon className="h-3.5 w-3.5" />
              <span>คัดลอกโค้ด</span>
            </>
          )}
        </button>
      </div>

      <CodeScroll
        className="font-mono text-xs leading-relaxed text-ink selection:bg-accent/20"
        label={title ? `โค้ด ${title}` : `โค้ด ${language}`}
      >
        <pre className="m-0 w-max min-w-full py-3">
          <code className="block">
            {lines.map((line, index) => {
              const spans = paramSpans(line, wanted);
              const marked = spans.length > 0;
              return (
                <span
                  key={index}
                  data-param={marked ? true : undefined}
                  className={`flex ${marked ? "bg-accent-wash/70" : ""}`}
                >
                  <span
                    aria-hidden
                    className={`sticky left-0 z-10 w-10 shrink-0 select-none border-r border-r-rule bg-surface pr-2 text-right ${
                      marked
                        ? "border-l-2 border-l-accent font-semibold text-accent-ink"
                        : "border-l-2 border-l-transparent text-ink-subtle"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="whitespace-pre pl-3 pr-6">{renderLine(line, spans)}</span>
                </span>
              );
            })}
          </code>
        </pre>
      </CodeScroll>

      {wanted.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-rule bg-surface-hover/40 px-4 py-2.5 text-[11px]">
          <span className="font-semibold text-ink-subtle">ค่าที่ต้องแก้เองในห้องสอบ</span>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {wanted.map(({ token, note }) => (
              <li key={token} className="inline-flex items-center gap-1.5 text-ink-muted">
                <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono font-medium text-accent-ink">
                  {token}
                </code>
                {note && <span>{note}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

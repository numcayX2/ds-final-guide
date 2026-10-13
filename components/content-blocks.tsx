import Link from "next/link";
import type { ReactNode } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import type { ContentBlock } from "@/content/types";
import { formulas } from "@/content/formulas";
import { Tex } from "./math-formula";

const NUMERIC = /^[\s+-]?[\d.,]+\s*%?$/;

/**
 * Wrap every case-insensitive occurrence of `query` in a `<mark>`.
 * Thai has no case, so a plain lowercase compare is enough; the length guard
 * skips highlighting when lowercasing would shift indices (locale edge cases).
 */
export function highlight(text: string, query: string): ReactNode {
  const q = query.trim();
  if (!q) return text;
  const hay = text.toLowerCase();
  const needle = q.toLowerCase();
  if (hay.length !== text.length || !hay.includes(needle)) return text;
  const out: ReactNode[] = [];
  let from = 0;
  let at = hay.indexOf(needle);
  let key = 0;
  while (at !== -1) {
    if (at > from) out.push(text.slice(from, at));
    out.push(
      <mark key={key++} className="rounded-sm bg-mark px-0.5 text-ink">
        {text.slice(at, at + needle.length)}
      </mark>,
    );
    from = at + needle.length;
    at = hay.indexOf(needle, from);
  }
  out.push(text.slice(from));
  return out;
}

/** Small metadata label — matches the eyebrow treatment used across pages. */
function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`shrink-0 rounded-sm border px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${className}`}
    >
      {children}
    </span>
  );
}

export function ContentBlockView({ block, hl = "" }: { block: ContentBlock; hl?: string }) {
  switch (block.kind) {
    case "prose":
      return <p className="max-w-prose text-[17px] leading-[1.85] text-ink">{highlight(block.text, hl)}</p>;

    case "definition":
      return (
        <div className="max-w-prose rounded-xl border border-rule border-l-2 border-l-accent bg-surface px-5 py-4">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <Tag className="border-accent/40 bg-accent-wash text-accent-ink">นิยาม</Tag>
            <dfn className="min-w-0 font-semibold not-italic text-ink">{highlight(block.term, hl)}</dfn>
          </div>
          <p className="mt-1.5 leading-relaxed text-ink-muted">{highlight(block.text, hl)}</p>
        </div>
      );

    case "marker":
      return (
        <p className="max-w-prose rounded-lg bg-accent-wash px-4 py-3 font-semibold leading-relaxed text-ink">
          {highlight(block.text, hl)}
        </p>
      );

    case "pitfall":
      return (
        <div className="max-w-prose rounded-r-xl border-l-4 border-warn bg-warn-wash px-5 py-4">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <ExclamationTriangleIcon className="h-4 w-4 shrink-0 text-warn" aria-hidden />
            <span className="text-sm font-semibold text-ink">
              ระวังในข้อสอบ: {highlight(block.title, hl)}
            </span>
          </p>
          <p className="mt-1.5 leading-relaxed text-ink-muted">{highlight(block.text, hl)}</p>
        </div>
      );

    case "worked-example":
      return (
        <figure className="max-w-prose overflow-hidden rounded-xl border border-rule bg-surface">
          <figcaption className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-rule bg-surface-hover px-5 py-3">
            <span className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
              <Tag className="border-rule bg-paper text-ink-subtle">ตัวอย่างโจทย์</Tag>
              <span className="font-semibold text-ink">{highlight(block.title, hl)}</span>
            </span>
            <span className="font-mono text-xs text-ink-subtle">ทีละขั้น</span>
          </figcaption>
          <ol className="space-y-3.5 px-5 py-4">
            {block.steps.map((s, i) => (
              <li key={i} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3">
                <span
                  aria-hidden="true"
                  className="num mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-rule bg-paper font-mono text-[11px] font-semibold text-ink-muted"
                >
                  {i + 1}
                </span>
                <span className="text-[15px] leading-relaxed text-ink-muted">{highlight(s, hl)}</span>
              </li>
            ))}
          </ol>
          <div className="flex items-baseline justify-between gap-3 border-t border-rule px-5 py-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">คำตอบ</span>
            <span className="answer num font-mono text-lg font-semibold text-ink">
              {highlight(block.answer, hl)}
            </span>
          </div>
        </figure>
      );

    case "table": {
      const numericCol = block.headers.map((_, j) => block.rows.every((r) => NUMERIC.test(String(r[j] ?? ""))));
      return (
        <figure className="max-w-3xl">
          {block.caption ? (
            <figcaption className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium text-ink">
              <Tag className="border-rule bg-paper text-ink-subtle">ตาราง</Tag>
              {highlight(block.caption, hl)}
            </figcaption>
          ) : null}
          <div
            role="region"
            aria-label={block.caption || "ตารางข้อมูล"}
            tabIndex={0}
            className="overflow-x-auto rounded-xl border border-rule"
          >
            <table className="w-full min-w-[30rem] text-sm">
              <thead className="bg-surface-hover">
                <tr>
                  {block.headers.map((h, j) => (
                    <th
                      key={j}
                      scope="col"
                      className={`px-4 py-2.5 font-medium text-ink-muted ${numericCol[j] ? "text-right" : "text-left"}`}
                    >
                      {highlight(h, hl)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rule bg-surface">
                {block.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 1 ? "bg-surface-hover/60" : ""}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-4 py-2.5 ${numericCol[j] ? "num text-right font-mono text-ink" : "text-ink"}`}
                      >
                        {highlight(cell, hl)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );
    }

    case "formula": {
      const f = formulas.find((x) => x.id === block.formulaId);
      if (!f) return <p className="text-sm text-bad">ไม่พบสูตร “{block.formulaId}” ในคลังสูตร</p>;
      return (
        <Link
          href={`/formulas#${f.id}`}
          className="group block max-w-prose rounded-xl border border-rule bg-surface px-5 py-4 transition-colors hover:border-accent"
        >
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="font-semibold text-ink group-hover:text-accent-ink">{highlight(f.name, hl)}</span>
            <span className="shrink-0 text-xs text-ink-subtle">คลังสูตร →</span>
          </div>
          <div className="mt-2 overflow-x-auto text-ink">
            {f.tex ? <Tex tex={f.tex} display /> : <p className="font-mono">{f.expression}</p>}
          </div>
        </Link>
      );
    }

    case "image":
      return (
        <figure className="max-w-prose">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} loading="lazy" decoding="async" className="w-full rounded-xl border border-rule" />
          {block.caption ? (
            <figcaption className="mt-2 text-center text-sm text-ink-subtle">{highlight(block.caption, hl)}</figcaption>
          ) : null}
        </figure>
      );

    default: {
      const _never: never = block;
      return _never;
    }
  }
}

/**
 * A chapter's sections. Pass `idPrefix` when several chapters share one page
 * so section ids stay unique. `index` is the section's position in the full
 * chapter — pass the original index when the array has been filtered, so
 * numbering and anchors do not shift while a search is active.
 */
export function ChapterBody({
  sections,
  idPrefix = "section",
  hl = "",
}: {
  sections: Array<{ heading: string; body: ContentBlock[]; index?: number }>;
  idPrefix?: string;
  hl?: string;
}) {
  return (
    <div className="space-y-14">
      {sections.map((section, i) => {
        const n = section.index ?? i + 1;
        return (
          <section key={n} id={`${idPrefix}-${n}`} className="scroll-mt-24">
            <h2 className="mb-6 flex items-baseline gap-3 border-b border-rule pb-3 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              <span className="num font-mono text-sm font-normal text-accent">{n}</span>
              {highlight(section.heading, hl)}
            </h2>
            <div className="space-y-6">
              {section.body.map((block, k) => (
                <ContentBlockView key={k} block={block} hl={hl} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
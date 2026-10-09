import Link from "next/link";
import type { ContentBlock } from "@/content/types";
import { formulas } from "@/content/formulas";
import { Tex } from "./math-formula";
import { Note } from "./ui";

const NUMERIC = /^[\s−+-]?[\d.,]+\s*%?$/;

export function ContentBlockView({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "prose":
      return <p className="max-w-prose text-[17px] leading-[1.85] text-ink">{block.text}</p>;

    case "definition":
      return (
        <div className="max-w-prose border-l-2 border-accent pl-4">
          <dfn className="block font-semibold not-italic text-ink">{block.term}</dfn>
          <p className="mt-1 leading-relaxed text-ink-muted">{block.text}</p>
        </div>
      );

    case "marker":
      return (
        <p className="max-w-prose rounded-lg bg-accent-wash px-4 py-3 font-semibold leading-relaxed text-ink">
          {block.text}
        </p>
      );

    case "pitfall":
      return (
        <div className="max-w-prose">
          <Note tone="pitfall" title={<>จุดที่มักผิด: {block.title}</>}>{block.text}</Note>
        </div>
      );

    case "worked-example":
      return (
        <figure className="max-w-prose rounded-xl border border-rule bg-surface">
          <figcaption className="flex items-baseline justify-between gap-3 border-b border-rule px-5 py-3">
            <span className="font-semibold text-ink">{block.title}</span>
            <span className="font-mono text-xs text-ink-subtle">ตัวอย่าง</span>
          </figcaption>
          <ol className="space-y-2.5 px-5 py-4">
            {block.steps.map((s, i) => (
              <li key={i} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3 text-[15px] leading-relaxed text-ink-muted">
                <span className="num pt-0.5 font-mono text-xs text-ink-subtle">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <div className="flex items-baseline justify-between gap-3 border-t border-rule px-5 py-3">
            <span className="text-sm text-ink-subtle">คำตอบ</span>
            <span className="answer num font-mono text-lg font-semibold text-ink">{block.answer}</span>
          </div>
        </figure>
      );

    case "table": {
      const numericCol = block.headers.map((_, j) => block.rows.every((r) => NUMERIC.test(String(r[j] ?? ""))));
      return (
        <figure className="max-w-3xl">
          {block.caption ? <figcaption className="mb-2 text-sm font-medium text-ink">{block.caption}</figcaption> : null}
          <div className="overflow-x-auto rounded-xl border border-rule">
            <table className="w-full text-sm">
              <thead className="bg-surface-hover">
                <tr>
                  {block.headers.map((h, j) => (
                    <th key={j} scope="col" className={`px-4 py-2.5 font-medium text-ink-muted ${numericCol[j] ? "text-right" : "text-left"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rule bg-surface">
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-2.5 ${numericCol[j] ? "num text-right font-mono text-ink" : "text-ink"}`}>
                        {cell}
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
            <span className="font-semibold text-ink group-hover:text-accent-ink">{f.name}</span>
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
          {block.caption ? <figcaption className="mt-2 text-center text-sm text-ink-subtle">{block.caption}</figcaption> : null}
        </figure>
      );

    default: {
      const _never: never = block;
      return _never;
    }
  }
}

/** A chapter's sections. Pass idPrefix when several chapters share one page. */
export function ChapterBody({
  sections,
  idPrefix = "section",
}: {
  sections: Array<{ heading: string; body: ContentBlock[] }>;
  idPrefix?: string;
}) {
  return (
    <div className="space-y-14">
      {sections.map((section, i) => (
        <section key={section.heading} id={`${idPrefix}-${i + 1}`} className="scroll-mt-24">
          <h2 className="mb-6 flex items-baseline gap-3 border-b border-rule pb-3 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            <span className="num font-mono text-sm font-normal text-accent">{i + 1}</span>
            {section.heading}
          </h2>
          <div className="space-y-6">
            {section.body.map((block, k) => (
              <ContentBlockView key={k} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

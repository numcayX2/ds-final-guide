import type { ContentBlock } from "@/content/types";
import { Reveal } from "./reveal";

/**
 * Renders one block of chapter copy. Every block kind in `ContentBlock` gets a
 * layout here, so adding a kind to the schema forces a visual decision rather
 * than silently falling through.
 */
export function ContentBlockView({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "prose":
      return <p className="text-lg text-ink max-w-prose">{block.text}</p>;

    case "definition":
      return (
        <div className="border-l-2 border-accent pl-6 py-1">
          <p className="meta-label tracking-reset text-accent-ink">{block.term}</p>
          <p className="mt-2 text-ink-muted max-w-prose">{block.text}</p>
        </div>
      );

    case "marker":
      return (
        <p className="text-lg text-accent-ink font-medium max-w-prose border-t-2 border-accent pt-5">
          {block.text}
        </p>
      );

    case "pitfall":
      return (
        <aside className="border-t-2 border-accent pt-5">
          <p className="meta-label tracking-display text-accent-ink">
            จุดระวังข้อสอบ
          </p>
          <p className="mt-2 font-medium text-ink">{block.title}</p>
          <p className="mt-2 text-ink-muted max-w-prose">{block.text}</p>
        </aside>
      );

    case "worked-example":
      return (
        <div className="border border-rule p-6">
          <p className="meta-label tracking-display text-ink-subtle">{block.title}</p>
          <ol className="mt-4 space-y-2">
            {block.steps.map((s, i) => (
              <li key={i} className="tnum text-ink-muted pl-6 relative">
                <span className="absolute left-0 index text-ink-subtle">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-5 pt-4 border-t border-rule tnum text-xl text-accent-ink font-medium">
            {block.answer}
          </p>
        </div>
      );

    case "table":
      return (
        <figure className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="text-left meta-label tracking-display text-ink-subtle pb-4">
              {block.caption}
            </caption>
            <thead>
              <tr className="border-t border-b border-rule-strong">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={`py-3 pr-4 font-medium ${i === 0 ? "text-left" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-rule">
                  {row.map((cell, j) => (
                    <td key={j} className="py-3 pr-4 tnum text-ink-muted">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );

    case "formula":
      return (
        <p className="meta-label tracking-display tnum border-t border-rule pt-4">
          ดูสูตรที่ {block.formulaId} ในคลังสูตร
        </p>
      );

    case "image":
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} className="w-full border border-rule" />
          {block.caption ? (
            <figcaption className="mt-3 meta-label tracking-display text-ink-subtle">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );

    default: {
      // Exhaustiveness guard: adding a kind to ContentBlock without a case here
      // becomes a compile error rather than a silently blank block.
      const _never: never = block;
      return _never;
    }
  }
}

/** A chapter's worth of sections, rendered with staggered reveals. */
export function ChapterBody({
  sections,
}: {
  sections: Array<{ heading: string; body: ContentBlock[] }>;
}) {
  return (
    <>
      {sections.map((section, i) => (
        <Reveal as="section" key={section.heading} delay={Math.min(i * 60, 200)}>
          <h2 className="text-3xl lg:text-4xl tracking-reset border-b border-rule pb-6 mb-sp-1">
            {section.heading}
          </h2>
          <div className="space-y-sp-1">
            {section.body.map((block, k) => (
              <ContentBlockView key={k} block={block} />
            ))}
          </div>
        </Reveal>
      ))}
    </>
  );
}
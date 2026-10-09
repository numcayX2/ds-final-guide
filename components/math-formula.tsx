import katex from "katex";

/**
 * KaTeX → HTML. Works in server and client components.
 * `\ans{…}` wraps a final answer in the yellow highlighter (.answer in globals.css).
 */
export function renderTex(tex: string, display = false): string {
  return katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    strict: "ignore",
    output: "htmlAndMathml",
    trust: (ctx) => ctx.command === "\\htmlClass",
    macros: { "\\ans": "\\htmlClass{answer}{#1}" },
  });
}

type TexProps = { tex: string; display?: boolean; className?: string };

export function Tex({ tex, display = false, className }: TexProps) {
  const Tag = display ? "div" : "span";
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: renderTex(tex, display) }} />;
}

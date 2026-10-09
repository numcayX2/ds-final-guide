import katex from "katex";

/**
 * Server-safe KaTeX renderer. LaTeX is compiled to HTML at build time,
 * so formula cards ship real math markup (fractions, sub/superscripts)
 * with zero client JS. Falls back to the raw source string if KaTeX
 * cannot parse the expression.
 */
export function MathFormula({
  tex,
  className = "",
}: {
  tex: string;
  className?: string;
}) {
  const html = katex.renderToString(tex, {
    displayMode: true,
    throwOnError: false,
    strict: false,
  });
  return (
    <span
      className={`math-tex ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

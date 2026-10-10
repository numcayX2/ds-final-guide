import { Tex } from "@/components/math-formula";

export function HomeworkStepItem({ text, index }: { text: string; index: number }) {
  const headerMatch = text.match(/^(A\d)\((\d+,\s*\d+)\)\s*ถึง\s+(.*)$/);

  if (!headerMatch) {
    return (
      <li className="flex gap-4 py-3.5 border-b border-rule">
        <span className="index text-lg text-ink-subtle shrink-0 w-6 text-right font-mono">
          {index + 1}
        </span>
        <p className="text-xs sm:text-sm text-ink leading-relaxed">
          {text}
        </p>
      </li>
    );
  }

  const pointName = headerMatch[1];
  const coords = headerMatch[2];
  const rest = headerMatch[3];

  const arrowParts = rest.split("→").map((s) => s.trim());
  const distancePart = arrowParts[0];
  const decisionText = arrowParts.slice(1).join(" → ");
  const assignedCluster = arrowParts[arrowParts.length - 1] || "";

  const distSegments = distancePart.split(/·\s*(?:ถึง\s*)?/).map((s) => s.trim());
  const distances = distSegments
    .filter(Boolean)
    .map((seg) => {
      const eqIdx = seg.indexOf("=");
      return eqIdx !== -1
        ? { target: seg.slice(0, eqIdx).trim(), calc: seg.slice(eqIdx + 1).trim() }
        : { target: "", calc: seg };
    });

  return (
    <li className="py-3 border-b border-rule">
      <div className="rounded-xl border border-rule bg-surface p-3.5 sm:p-4 transition-colors hover:border-rule-strong">
        {/* Point Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-hover text-xs font-mono text-ink-subtle">
              {index + 1}
            </span>
            <span className="font-mono text-base font-bold text-ink">
              {pointName}
            </span>
            <span className="rounded bg-paper px-2 py-0.5 font-mono text-xs text-ink-muted">
              ({coords})
            </span>
          </div>

          {/* Winner Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-good/30 bg-good-wash px-2.5 py-1 text-xs font-medium text-good">
            <span>เข้ากลุ่ม</span>
            <span className="font-mono font-bold">{assignedCluster}</span>
          </div>
        </div>

        {/* Distances Breakdown: 1 column per line with soft highlight for picked cluster */}
        <div className="mt-2.5 space-y-1.5">
          {distances.map((d, i) => {
            const isPicked =
              assignedCluster &&
              (d.target.trim().toLowerCase() === assignedCluster.trim().toLowerCase() ||
                assignedCluster.trim().toLowerCase().includes(d.target.trim().toLowerCase()));

            // Transform raw unicode/math string into LaTeX syntax for KaTeX rendering
            const texFormula = d.calc
              .replace(/√\(((?:[^()]|\([^()]*\))*)\)/g, "\\sqrt{$1}")
              .replace(/√(\d+)/g, "\\sqrt{$1}")
              .replace(/²/g, "^2")
              .replace(/≈/g, "\\approx ")
              .replace(/×/g, "\\times ");

            return (
              <div
                key={i}
                className={`flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded-lg border px-3 py-2 text-xs transition-colors ${
                  isPicked
                    ? "border-good/50 bg-good-wash text-ink"
                    : "border-rule/60 bg-paper/60 text-ink-muted"
                }`}
              >
                <span
                  className={`shrink-0 font-mono font-semibold ${
                    isPicked ? "text-good" : "text-ink-subtle"
                  }`}
                >
                  ถึง {d.target}:
                </span>
                <span className="text-right overflow-x-auto text-ink py-0.5">
                  <Tex tex={texFormula} />
                </span>
              </div>
            );
          })}
        </div>

        {/* Decision Footer */}
        {decisionText ? (
          <div className="mt-2.5 flex items-center justify-between rounded-lg bg-surface-hover/70 px-3 py-1.5 text-xs">
            <span className="text-ink-subtle">เกณฑ์การตัดสิน:</span>
            <span className="font-mono font-medium text-ink">
              {decisionText}
            </span>
          </div>
        ) : null}
      </div>
    </li>
  );
}

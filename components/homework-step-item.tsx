import { Tex } from "@/components/math-formula";

/* -------------------------------------------------------------------------- */
/* Types & Parsing Helpers                                                    */
/* -------------------------------------------------------------------------- */

interface MetricItem {
  name: string;
  formula: string;
  decimal: string;
  pct: string;
}

interface ModelCalcData {
  model: string;
  params: { k: string; v: string }[];
  metrics: MetricItem[];
}

function parseModelCalc(text: string): ModelCalcData | null {
  const m = text.match(/^คำนวณ\s+Model\s+([A-Z])\s*\((.*?)\):\s*(.*)$/);
  if (!m) return null;
  const model = m[1];
  const params = m[2].split(",").map((s) => {
    const [k, v] = s.trim().split("=");
    return { k: k?.trim() || "", v: v?.trim() || "" };
  });

  const metrics: MetricItem[] = m[3]
    .split("·")
    .map((s) => {
      const met = s.trim();
      const match = met.match(
        /^([A-Za-z0-9]+)\s*=\s*(.*?)(?:=|≈)\s*([0-9.]+)\s*\((.*?)\)$/
      );
      if (!match) return null;
      return {
        name: match[1],
        formula: match[2].trim(),
        decimal: match[3].trim(),
        pct: match[4].trim(),
      };
    })
    .filter(Boolean) as MetricItem[];

  return { model, params, metrics };
}

function parseRetentionImpact(text: string) {
  if (!text.startsWith("วิเคราะห์ผลกระทบต่อ Retention Decision:")) return null;
  const fpMatch = text.match(
    /\(1\)\s*False Positive\s*\((.*?)\)\s*หมายถึง\s*(.*?)\s*ผลกระทบคือ\s*(.*?)(?=\s*\(2\))/
  );
  const fnMatch = text.match(
    /\(2\)\s*False Negative\s*\((.*?)\)\s*หมายถึง\s*(.*?)\s*ผลกระทบคือ\s*(.*)$/
  );
  if (!fpMatch || !fnMatch) return null;

  return {
    fp: {
      meaning: fpMatch[2].trim(),
      impact: fpMatch[3].trim(),
    },
    fn: {
      meaning: fnMatch[2].trim(),
      impact: fnMatch[3].trim(),
    },
  };
}

function parseModelSelection(text: string) {
  if (!text.startsWith("การเลือก Primary Metric และ Model:")) return null;
  const rawCases = text
    .replace("การเลือก Primary Metric และ Model:", "")
    .split(/\(\d\)/)
    .map((s) => s.trim())
    .filter(Boolean);

  return [
    {
      title: "กรณีที่ 1: ต้องการโมเดลที่สมดุลที่สุด (Balanced All-Rounder)",
      recommended: "Model C",
      badgeColor: "good",
      metrics: "Accuracy 85.00% · F1-Score 81.01% (สูงสุดทั้งคู่)",
      detail:
        rawCases[0] ||
        "แนะนำ Model C เพราะได้ Accuracy สูงสุด (85%) และ F1 สูงสุด (0.81) โดยมี Precision 82% และ Recall 80% สูงทั้งสองด้าน",
      highlight: "ตัวเลือกแนะนำสูงสุดสำหรับระบบทั่วไป",
    },
    {
      title: "กรณีที่ 2: กลัวลูกค้าหลุดที่สุด (High Churn Cost)",
      recommended: "Model B",
      badgeColor: "accent",
      metrics: "Recall 90.00% (สูงสุดใน 3 โมเดล)",
      detail:
        rawCases[1] ||
        "หากธุรกิจกลัวลูกค้าหลุดที่สุด (ต้นทุนเสียลูกค้าสูงมาก) แนะนำ Model B เพราะได้ Recall สูงสุดถึง 90%",
      highlight: "Churn Defender: เก็บลูกค้าจะเลิกได้ 36 จาก 40 คน",
    },
    {
      title: "กรณีที่ 3: งบประมาณแคมเปญจำกัดมาก (Tight Campaign Budget)",
      recommended: "Model A",
      badgeColor: "warn",
      metrics: "Precision 88.89% (สูงสุดใน 3 โมเดล)",
      detail:
        rawCases[2] ||
        "หากงบประมาณแคมเปญจำกัดมาก (ต้นทุนต่อคนสูง) แนะนำ Model A เพราะได้ Precision สูงสุดถึง 89%",
      highlight: "Precision Focus: โปรโมชั่นแม่น ไม่ตำน้ำพริกละลายแม่น้ำ",
    },
  ];
}

function parseSingleMetric(text: string) {
  const match = text.match(
    /^(Accuracy|Precision|Recall|F1)\s*=\s*(.*?)=\s*([0-9.]+)\s*=\s*([0-9.]+%?)$/
  );
  if (!match) return null;
  return {
    metric: match[1],
    formula: match[2].trim(),
    decimal: match[3].trim(),
    pct: match[4].trim(),
  };
}

function parseCentroidCalc(text: string) {
  const match = text.match(/^(C[\w()]+(?:\s*ใหม่)?)\s*=\s*(.*)$/);
  if (!match) return null;
  const parts = match[2].split("=").map((s) => s.trim());
  return {
    centroidName: match[1],
    formula: parts.slice(0, -1).join(" = "),
    result: parts[parts.length - 1],
  };
}

/* -------------------------------------------------------------------------- */
/* Subcomponents                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Homework 2 — Steps 1, 2, 3: Model A, B, C Calculations
 */
function ModelCalculationCard({
  data,
  index,
}: {
  data: ModelCalcData;
  index: number;
}) {
  const { model, params, metrics } = data;

  // Determine strengths & badges per model
  const modelConfig = {
    A: {
      badgeBg: "border-series-1/40 bg-series-1/10 text-series-1",
      tag: "เด่นด้าน Precision (88.89%)",
      summary:
        "เหมาะเมื่องบประมาณแคมเปญจำกัดมาก ยิงโปรโมชั่นตรงเป้า แต่ Recall ต่ำสุด (60.00%)",
      winners: ["Precision"],
    },
    B: {
      badgeBg: "border-series-2/40 bg-series-2/10 text-series-2",
      tag: "เด่นด้าน Recall (90.00%)",
      summary:
        "เหมาะเมื่อต้นทุนการเสียลูกค้าสูงมาก ดักจับลูกค้าเลิกได้เกือบหมด แต่ Precision ต่ำสุด (66.67%)",
      winners: ["Recall"],
    },
    C: {
      badgeBg: "border-good/40 bg-good-wash text-good",
      tag: "สมดุลสูงสุด — แนะนำทั่วไป",
      summary:
        "Accuracy 85.00% และ F1 81.01% สูงสุดทั้งคู่ Precision (82%) และ Recall (80%) สูงสม่ำเสมอ",
      winners: ["Accuracy", "F1"],
    },
  }[model] || {
    badgeBg: "border-rule bg-surface text-ink",
    tag: "",
    summary: "",
    winners: [],
  };

  const metricLabels: Record<string, { th: string; theory: string }> = {
    Accuracy: { th: "ความถูกต้อง", theory: "(TP + TN) / N" },
    Precision: { th: "ความแม่นยำ", theory: "TP / (TP + FP)" },
    Recall: { th: "ความครอบคลุม", theory: "TP / (TP + FN)" },
    F1: { th: "F1-Score", theory: "2·TP / (2·TP + FP + FN)" },
  };

  return (
    <li className="py-3 border-b border-rule">
      <div className="rounded-xl border border-rule bg-surface p-4 sm:p-5 transition-colors hover:border-rule-strong space-y-4">
        {/* Header Row: Model Badge + Confusion Matrix Breakdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-hover text-xs font-mono font-bold text-ink-subtle">
              {index + 1}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm sm:text-base font-mono font-bold ${modelConfig.badgeBg}`}
            >
              Model {model}
            </span>
            {modelConfig.tag && (
              <span className="hidden sm:inline-block rounded-full bg-surface-hover px-2.5 py-0.5 text-xs font-medium text-ink-muted">
                {modelConfig.tag}
              </span>
            )}
          </div>

          {/* Confusion Matrix Values */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {params.map(({ k, v }) => {
              let colorClass = "bg-paper text-ink-subtle border-rule";
              if (k === "TP")
                colorClass = "bg-good-wash/70 text-good border-good/40 font-semibold";
              if (k === "FN")
                colorClass = "bg-bad-wash/70 text-bad border-bad/40 font-semibold";
              if (k === "FP")
                colorClass = "bg-warn-wash/70 text-warn border-warn/40 font-semibold";
              if (k === "TN")
                colorClass = "bg-surface-hover text-ink-muted border-rule";

              return (
                <span
                  key={k}
                  className={`rounded border px-2 py-0.5 ${colorClass}`}
                >
                  <span className="opacity-75">{k}=</span>
                  <span>{v}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* 2×2 Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {metrics.map((met) => {
            const isWinner = modelConfig.winners.includes(met.name);
            const labelInfo = metricLabels[met.name] || { th: "", theory: "" };

            return (
              <div
                key={met.name}
                className={`relative flex flex-col justify-between rounded-xl border p-3.5 transition-colors ${
                  isWinner
                    ? "border-good/60 bg-good-wash/30 ring-1 ring-good/20 shadow-xs"
                    : "border-rule/70 bg-paper/60 hover:bg-surface"
                }`}
              >
                {/* Metric Title & Winner Badge */}
                <div className="mb-2">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-baseline gap-1.5 min-w-0">
                      <span
                        className={`text-sm font-bold tracking-tight ${
                          isWinner ? "text-good" : "text-ink"
                        }`}
                      >
                        {met.name}
                      </span>
                      {labelInfo.th && (
                        <span className="text-xs text-ink-subtle">
                          ({labelInfo.th})
                        </span>
                      )}
                    </div>
                    {isWinner && (
                      <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 rounded bg-good px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                        <span>สูงสุด</span>
                      </span>
                    )}
                  </div>

                  {labelInfo.theory && (
                    <p className="text-[11px] font-mono text-ink-subtle">
                      สูตร: {labelInfo.theory}
                    </p>
                  )}
                </div>

                {/* Substitution Step - Clean wrapped monospace, NO scrollbar */}
                <div className="rounded-lg bg-surface-hover/80 px-2.5 py-1.5 border border-rule/60 text-xs font-mono text-ink leading-relaxed break-words mb-3">
                  {met.formula}
                </div>

                {/* Final Value & Percentage */}
                <div className="flex items-center justify-between pt-2.5 mt-auto border-t border-rule/50">
                  <div className="text-xs font-mono text-ink-muted">
                    <span className="text-ink-subtle">ทศนิยม: </span>
                    <strong className="text-ink font-semibold">{met.decimal}</strong>
                  </div>
                  <span
                    className={`rounded-lg px-2.5 py-0.5 text-base sm:text-lg font-bold font-mono tracking-tight tnum ${
                      isWinner
                        ? "bg-good-wash text-good border border-good/40 font-black"
                        : "bg-surface-hover text-ink border border-rule"
                    }`}
                  >
                    {met.pct}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Insight Bar */}
        <div className="flex items-center gap-2 rounded-lg bg-surface-hover/80 px-3 py-2 text-xs text-ink-muted">
          <span className="shrink-0 font-medium text-ink">สรุป:</span>
          <span>{modelConfig.summary}</span>
        </div>
      </div>
    </li>
  );
}

/**
 * Homework 2 — Step 4: Retention Decision Error Impact (FP vs FN)
 */
function RetentionImpactCard({
  data,
  index,
}: {
  data: {
    fp: { meaning: string; impact: string };
    fn: { meaning: string; impact: string };
  };
  index: number;
}) {
  return (
    <li className="py-3 border-b border-rule">
      <div className="rounded-xl border border-rule bg-surface p-4 sm:p-5 transition-colors hover:border-rule-strong space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-rule pb-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-wash text-xs font-mono font-bold text-accent-ink">
            {index + 1}
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-ink">
              วิเคราะห์ผลกระทบต่อ Retention Decision (Type I vs Type II Error)
            </h3>
            <p className="text-xs text-ink-muted">
              การเปรียบเทียบต้นทุนทางธุรกิจระหว่าง False Positive กับ False Negative
            </p>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* False Positive (FP) */}
          <div className="rounded-xl border border-warn/40 bg-warn-wash/40 p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-warn/50 bg-warn-wash px-2.5 py-1 text-xs font-mono font-bold text-warn">
                  False Positive (FP)
                </span>
                <span className="text-[11px] font-mono text-ink-subtle">
                  Type I Error
                </span>
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle mb-1">
                ความหมายในโจทย์
              </div>
              <p className="text-xs sm:text-sm text-ink leading-relaxed">
                {data.fp.meaning}
              </p>
            </div>

            <div className="pt-2.5 border-t border-warn/30">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-warn mb-1">
                ผลกระทบทางธุรกิจ (Business Cost)
              </div>
              <p className="text-xs sm:text-sm font-medium text-ink leading-relaxed">
                {data.fp.impact}
              </p>
              <div className="mt-2 inline-block rounded bg-paper/80 px-2 py-0.5 text-[11px] font-medium text-ink-muted border border-rule/50">
                สถานะ: สิ้นเปลืองงบการตลาด แต่ยังไม่เสียลูกค้า
              </div>
            </div>
          </div>

          {/* False Negative (FN) */}
          <div className="rounded-xl border border-bad/40 bg-bad-wash/40 p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-bad/50 bg-bad-wash px-2.5 py-1 text-xs font-mono font-bold text-bad">
                  False Negative (FN)
                </span>
                <span className="text-[11px] font-mono text-ink-subtle">
                  Type II Error
                </span>
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle mb-1">
                ความหมายในโจทย์
              </div>
              <p className="text-xs sm:text-sm text-ink leading-relaxed">
                {data.fn.meaning}
              </p>
            </div>

            <div className="pt-2.5 border-t border-bad/30">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-bad mb-1">
                ผลกระทบทางธุรกิจ (Business Cost)
              </div>
              <p className="text-xs sm:text-sm font-medium text-ink leading-relaxed">
                {data.fn.impact}
              </p>
              <div className="mt-2 inline-block rounded bg-bad-wash px-2 py-0.5 text-[11px] font-bold text-bad border border-bad/30">
                สถานะ: ร้ายแรงที่สุดใน Churn! ลูกค้าหลุดไปหาคู่แข่งถาวร
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * Homework 2 — Step 5: Strategic Model Selection Decision Cards
 */
function ModelRecommendationCard({
  cases,
  index,
}: {
  cases: ReturnType<typeof parseModelSelection>;
  index: number;
}) {
  if (!cases) return null;

  return (
    <li className="py-3 border-b border-rule">
      <div className="rounded-xl border border-rule bg-surface p-4 sm:p-5 transition-colors hover:border-rule-strong space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-wash text-xs font-mono font-bold text-accent-ink">
              {index + 1}
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-ink">
                การเลือก Primary Metric และ Model ตามบริบททางธุรกิจ
              </h3>
              <p className="text-xs text-ink-muted">
                สไลด์ 35: คำตอบขึ้นอยู่กับบริบท แต่ Metric และ Model ต้องสอดคล้องกัน
              </p>
            </div>
          </div>
          <span className="rounded-full bg-accent-wash px-2.5 py-0.5 text-xs font-mono font-bold text-accent-ink">
            3 สถานการณ์ธุรกิจ
          </span>
        </div>

        {/* 3 Strategy Cards */}
        <div className="space-y-3">
          {cases.map((c, i) => {
            let borderWash = "border-rule bg-paper";
            let badgeStyle = "bg-surface-hover text-ink border-rule";

            if (c.badgeColor === "good") {
              borderWash = "border-good/50 bg-good-wash/30";
              badgeStyle = "bg-good text-white border-transparent";
            } else if (c.badgeColor === "accent") {
              borderWash = "border-series-2/40 bg-series-2/10";
              badgeStyle = "bg-series-2 text-white border-transparent";
            } else if (c.badgeColor === "warn") {
              borderWash = "border-warn/40 bg-warn-wash/30";
              badgeStyle = "bg-series-1 text-white border-transparent";
            }

            return (
              <div
                key={i}
                className={`rounded-xl border p-3.5 sm:p-4 transition-colors ${borderWash}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-mono font-bold ${badgeStyle}`}
                    >
                      {c.recommended}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-ink">
                      {c.title}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-ink-subtle">
                    {c.metrics}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-ink leading-relaxed mb-2">
                  {c.detail}
                </p>

                <div className="text-[11px] font-medium text-ink-muted">
                  {c.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </li>
  );
}

/**
 * Homework 1 — Steps 2, 3, 4, 5: Single Metric Card
 */
function SingleMetricCard({
  data,
  index,
}: {
  data: { metric: string; formula: string; decimal: string; pct: string };
  index: number;
}) {
  return (
    <li className="py-2.5 border-b border-rule">
      <div className="rounded-xl border border-rule bg-surface p-3 sm:p-4 transition-colors hover:border-rule-strong flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-hover text-xs font-mono text-ink-subtle">
            {index + 1}
          </span>
          <span className="rounded bg-accent-wash px-2.5 py-1 text-xs font-mono font-bold text-accent-ink border border-accent/20">
            {data.metric}
          </span>
          <span className="text-xs sm:text-sm font-mono text-ink-muted">
            {data.formula}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-xs text-ink-subtle">{data.decimal}</span>
          <span className="rounded-full bg-good-wash px-3 py-1 text-xs sm:text-sm font-bold text-good border border-good/30 tnum">
            {data.pct}
          </span>
        </div>
      </div>
    </li>
  );
}

/**
 * Homework 3 & 4: Centroid Calculation Card
 */
function CentroidCalculationCard({
  data,
  index,
}: {
  data: { centroidName: string; formula: string; result: string };
  index: number;
}) {
  return (
    <li className="py-2.5 border-b border-rule">
      <div className="rounded-xl border border-rule bg-surface p-3 sm:p-4 transition-colors hover:border-rule-strong flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-hover text-xs font-mono text-ink-subtle">
            {index + 1}
          </span>
          <span className="rounded bg-surface-hover px-2.5 py-1 text-xs font-mono font-bold text-ink border border-rule">
            {data.centroidName}
          </span>
          {data.formula && (
            <span className="text-xs font-mono text-ink-muted break-words no-scrollbar">
              = {data.formula}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 font-mono">
          <span className="text-xs text-ink-subtle">พิกัดใหม่:</span>
          <span className="rounded-lg bg-good-wash px-2.5 py-1 text-xs sm:text-sm font-bold text-good border border-good/30 tnum">
            {data.result}
          </span>
        </div>
      </div>
    </li>
  );
}

/**
 * Multi-segment card (for items joined by '·')
 */
function MultiSegmentCard({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const segments = text.split("·").map((s) => s.trim()).filter(Boolean);

  return (
    <li className="py-3 border-b border-rule">
      <div className="rounded-xl border border-rule bg-surface p-3.5 sm:p-4 transition-colors hover:border-rule-strong">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-hover text-xs font-mono text-ink-subtle">
            {index + 1}
          </span>
          <span className="text-xs font-bold text-ink uppercase tracking-wide">
            ขั้นตอนการแจกแจง
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {segments.map((seg, i) => (
            <div
              key={i}
              className="rounded-lg border border-rule bg-paper px-3 py-1.5 text-xs font-mono text-ink leading-relaxed"
            >
              {seg}
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}

/**
 * K-Means Point Distance Calculation Step
 */
function KMeansDistanceCard({
  index,
  headerMatch,
}: {
  index: number;
  headerMatch: RegExpMatchArray;
}) {
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

        {/* Distances Breakdown */}
        <div className="mt-2.5 space-y-1.5">
          {distances.map((d, i) => {
            const isPicked =
              assignedCluster &&
              (d.target.trim().toLowerCase() === assignedCluster.trim().toLowerCase() ||
                assignedCluster.trim().toLowerCase().includes(d.target.trim().toLowerCase()));

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
                <span className="text-right overflow-x-auto no-scrollbar text-ink py-0.5">
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

/* -------------------------------------------------------------------------- */
/* Main HomeworkStepItem Component                                            */
/* -------------------------------------------------------------------------- */

export function HomeworkStepItem({ text, index }: { text: string; index: number }) {
  // 1. K-Means Point Distance
  const kMeansMatch = text.match(/^(A\d)\((\d+,\s*\d+)\)\s*ถึง\s+(.*)$/);
  if (kMeansMatch) {
    return <KMeansDistanceCard index={index} headerMatch={kMeansMatch} />;
  }

  // 2. Model Calculation (HW2, Steps 1-3)
  const modelCalcData = parseModelCalc(text);
  if (modelCalcData) {
    return <ModelCalculationCard data={modelCalcData} index={index} />;
  }

  // 3. Retention Error Impact (HW2, Step 4)
  const retentionData = parseRetentionImpact(text);
  if (retentionData) {
    return <RetentionImpactCard data={retentionData} index={index} />;
  }

  // 4. Model Recommendation & Strategy (HW2, Step 5)
  const selectionData = parseModelSelection(text);
  if (selectionData) {
    return <ModelRecommendationCard cases={selectionData} index={index} />;
  }

  // 5. Single Metric Formula (HW1, Steps 2-5)
  const singleMetricData = parseSingleMetric(text);
  if (singleMetricData) {
    return <SingleMetricCard data={singleMetricData} index={index} />;
  }

  // 6. Centroid Calculation (HW3 & HW4)
  const centroidData = parseCentroidCalc(text);
  if (centroidData) {
    return <CentroidCalculationCard data={centroidData} index={index} />;
  }

  // 7. Multi-segment with '·'
  if (text.includes(" · ")) {
    return <MultiSegmentCard text={text} index={index} />;
  }

  // 8. Default fallback for plain notes or narrative steps
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

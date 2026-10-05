import {
  GiniCalculator,
  KMeansCalculator,
  MetricCalculator,
  TukeyCalculator,
} from "@/components/calculators";
import { Reveal } from "@/components/reveal";

const TOOLS = [
  {
    id: "tukey-iqr",
    name: "Tukey IQR Outlier Detector",
    nameTh: "ตรวจ Outlier ด้วย IQR",
    lectures: "Lect 05",
  },
  {
    id: "gini-gain",
    name: "Gini Impurity & Gain Calculator",
    nameTh: "คำนวณ Gini Impurity & Gini Gain",
    lectures: "Lect 07",
  },
  {
    id: "confusion-matrix",
    name: "Confusion Matrix Calculator",
    nameTh: "คำนวณมาตรวัดจากตารางสับสน",
    lectures: "Lect 07",
  },
  {
    id: "kmeans-iteration",
    name: "K-Means Iteration & Distance",
    nameTh: "คำนวณ K-Means Iteration & Centroid",
    lectures: "Lect 08",
  },
];

export default function ToolsPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1">
      <section className="shell pt-sp-2 pb-sp-1 cyber-grid relative">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border border-rule-strong/50 bg-accent-wash/50 text-accent-ink mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent cyber-beacon" />
                <span>LABS // INTERACTIVE_CALCULATORS</span>
                <span className="text-ink-subtle">|</span>
                <span className="text-ink-muted">4 TOOLS OPERATIONAL</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display tracking-reset">
                ลองคำนวณ
                <br />
                <span className="text-accent-ink cyber-text-glow">ด้วยตัวเอง</span>
              </h1>
            </Reveal>

            {/* Quick Tool Jump Pills */}
            <Reveal delay={120}>
              <div className="flex flex-wrap gap-2 mt-8">
                {TOOLS.map((t, idx) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="tap px-3 py-1.5 text-xs font-mono border border-rule-strong/70 hover:border-accent hover:text-accent-ink transition-all bg-bg/80 hover:bg-accent-wash/40"
                  >
                    [0{idx + 1}] // {t.id.replace("-", "_").toUpperCase()}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-sp-1 lg:mt-0">
            <Reveal delay={160}>
              <div className="hud-bracket border border-rule p-5 bg-bg/80 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-rule pb-2 mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-ink-subtle uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent cyber-beacon" />
                    CALCULATOR_CORE
                  </span>
                  <span className="text-[10px] font-mono text-accent-ink font-semibold">
                    READY
                  </span>
                </div>
                <dl className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-baseline border-b border-rule/50 pb-2">
                    <dt className="text-ink-subtle">AVAILABLE_TOOLS</dt>
                    <dd className="font-semibold text-accent-ink">{TOOLS.length} APPS</dd>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-rule/50 pb-2">
                    <dt className="text-ink-subtle">MATHEMATICS</dt>
                    <dd className="text-ink">IQR / GINI / MATRIX / K-MEANS</dd>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <dt className="text-ink-subtle">ZERO_DIV_GUARD</dt>
                    <dd className="text-accent-ink font-semibold">ACTIVE (หารไม่ได้)</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tool 01: Tukey IQR */}
      <section id="tukey-iqr" className="shell py-sp-1 border-t border-rule scroll-mt-24">
        <Reveal>
          <TukeyCalculator />
        </Reveal>
      </section>

      {/* Tool 02: Gini Gain */}
      <section id="gini-gain" className="shell py-sp-2 border-t border-rule scroll-mt-24">
        <Reveal>
          <GiniCalculator />
        </Reveal>
      </section>

      {/* Tool 03: Confusion Matrix */}
      <section id="confusion-matrix" className="shell py-sp-2 border-t border-rule scroll-mt-24">
        <Reveal>
          <MetricCalculator />
        </Reveal>
      </section>

      {/* Tool 04: K-Means */}
      <section id="kmeans-iteration" className="shell py-sp-2 border-t border-rule scroll-mt-24">
        <Reveal>
          <KMeansCalculator />
        </Reveal>
      </section>

      <footer className="shell py-sp-2 border-t border-rule">
        <p className="meta-label tracking-display text-ink-subtle">
          ถ้าตัวส่วนเป็นศูนย์ เครื่องจะแจ้งว่าหารไม่ได้ ไม่ใช่ตอบ 0 &middot; ทุกเครื่องมือตรงตามโจทย์ข้อสอบจริง
        </p>
      </footer>
    </main>
  );
}
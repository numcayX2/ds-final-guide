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
    name: "Tukey IQR Outlier",
    lectures: "Lect 05",
  },
  {
    id: "gini-gain",
    name: "Gini Impurity & Gain",
    lectures: "Lect 07",
  },
  {
    id: "confusion-matrix",
    name: "Confusion Matrix 2x2",
    lectures: "Lect 08",
  },
  {
    id: "kmeans-iteration",
    name: "K-Means Step-Through",
    lectures: "Lect 08-09",
  },
];

export default function ToolsPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1">
      {/* Header */}
      <section className="shell pt-14 pb-10 border-b border-rule">
        <Reveal>
          <p className="eyebrow">Calculators &middot; ห้องแล็บคำนวณ</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight text-ink leading-[1.08]">
            เครื่องคิดเลข
            <span className="block text-accent-ink">จำลองข้อสอบสด</span>
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-ink-muted leading-relaxed">
            กรอกตัวเลขจริงจากโจทย์ข้อสอบ แล้วดูขั้นตอนการคำนวณทีละก้าวแบบสดๆ
            พร้อมตัวตรวจจับการหารด้วยศูนย์ (Zero-division guard)
          </p>
        </Reveal>

        {/* Quick Tool Jump Tabs */}
        <Reveal delay={140}>
          <div className="flex flex-wrap gap-2 mt-8">
            {TOOLS.map((t, i) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="px-3.5 py-2 text-xs font-semibold border border-rule bg-surface text-ink-muted hover:text-ink hover:border-rule-strong transition-colors"
              >
                <span className="font-mono text-ink-subtle mr-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t.name}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Tool 01: Tukey IQR */}
      <section id="tukey-iqr" className="shell py-12 border-b border-rule scroll-mt-24">
        <Reveal>
          <p className="eyebrow eyebrow-accent mb-4">Tool 01 &middot; Lect 05</p>
          <TukeyCalculator />
        </Reveal>
      </section>

      {/* Tool 02: Gini Gain */}
      <section id="gini-gain" className="shell py-12 border-b border-rule scroll-mt-24">
        <Reveal>
          <p className="eyebrow eyebrow-accent mb-4">Tool 02 &middot; Lect 07</p>
          <GiniCalculator />
        </Reveal>
      </section>

      {/* Tool 03: Confusion Matrix */}
      <section id="confusion-matrix" className="shell py-12 border-b border-rule scroll-mt-24">
        <Reveal>
          <p className="eyebrow eyebrow-accent mb-4">Tool 03 &middot; Lect 08</p>
          <MetricCalculator />
        </Reveal>
      </section>

      {/* Tool 04: K-Means */}
      <section id="kmeans-iteration" className="shell py-12 border-b border-rule scroll-mt-24">
        <Reveal>
          <p className="eyebrow eyebrow-accent mb-4">Tool 04 &middot; Lect 08-09</p>
          <KMeansCalculator />
        </Reveal>
      </section>
    </main>
  );
}

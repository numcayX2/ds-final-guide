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
      <section className="shell pt-sp-2 pb-sp-1">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="meta-label text-ink-subtle mb-8">
                เครื่องคิดเลข &middot; Calculators &amp; Labs
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display tracking-reset">
                ลองคำนวณ
                <br />
                ด้วยตัวเอง
              </h1>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 mt-sp-1 lg:mt-0">
            <Reveal delay={160}>
              <dl className="space-y-6">
                <div>
                  <dt className="meta-label tracking-display text-ink-subtle">Tools</dt>
                  <dd className="meta-value mt-2 tnum text-3xl">{TOOLS.length}</dd>
                </div>
                <div>
                  <dt className="meta-label tracking-display text-ink-subtle">Based on</dt>
                  <dd className="meta-value mt-2">สูตรและชุดข้อมูลจากสไลด์จริง</dd>
                </div>
              </dl>
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
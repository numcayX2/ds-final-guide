import { MetricCalculator, TukeyCalculator } from "@/components/calculators";
import { Reveal } from "@/components/reveal";

const TOOLS = [
  {
    id: "tukey-iqr",
    name: "Tukey IQR Outlier Detector",
    nameTh: "ตรวจ Outlier ด้วย IQR",
    lectures: "Lect 05",
  },
  {
    id: "confusion-matrix",
    name: "Confusion Matrix Calculator",
    nameTh: "คำนวณมาตรวัดจากตารางสับสน",
    lectures: "Lect 07",
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="shell pt-sp-2 pb-sp-1">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="meta-label text-ink-subtle mb-8">
                เครื่องคิดเลข &middot; Calculators
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
                  <dd className="meta-value mt-2">สูตรที่ยืนยันกับสไลด์แล้ว</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-sp-1 border-t border-rule">
        <Reveal>
          <TukeyCalculator />
        </Reveal>
      </section>

      <section className="shell py-sp-2 border-t border-rule">
        <Reveal>
          <MetricCalculator />
        </Reveal>
      </section>

      <footer className="shell py-sp-2 border-t border-rule">
        <p className="meta-label tracking-display text-ink-subtle">
          ถ้าตัวส่วงเป็นศูนย์ เครื่องจะบอกว่าหารไม่ได้ ไม่ใช่ตอบ 0
        </p>
      </footer>
    </>
  );
}
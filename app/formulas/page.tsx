import { formulas } from "@/content/formulas";
import { Reveal } from "@/components/reveal";
import { FormulaExplorer } from "@/components/formula-explorer";

const UNVERIFIED = "needs-slide-check";

export default function FormulasPage() {
  const unverified = formulas.filter((f) => f.verification === UNVERIFIED).length;

  return (
    <main id="main" tabIndex={-1} className="flex-1">
      {/* Header */}
      <section className="shell pt-14 pb-10 border-b border-rule">
        <Reveal>
          <p className="eyebrow">Formula Vault &middot; คลังสูตร</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight text-ink leading-[1.08]">
            คลังสูตรคำนวณ
            <span className="block text-accent-ink">ที่ต้องจำก่อนสอบ</span>
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-ink-muted leading-relaxed">
            รวบรวมครบทุกสมการตั้งแต่ EDA, Decision Tree Gini, Confusion Matrix
            ตลอดจน K-Means Distance พร้อมตัวอย่างวิธีคิดและจุดที่มักผิด
          </p>
        </Reveal>
        <Reveal delay={140}>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-5 max-w-md">
            <div>
              <dt className="sr-only">Total</dt>
              <dd className="index text-3xl text-ink">
                {formulas.length}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  สูตรทั้งหมด
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Verified</dt>
              <dd className="index text-3xl text-ink">
                {formulas.length - unverified}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  ตรวจสอบแล้ว
                </span>
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* Explorer Component */}
      <FormulaExplorer formulas={formulas} />
    </main>
  );
}

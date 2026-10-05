import { formulas } from "@/content/formulas";
import { Reveal } from "@/components/reveal";
import { FormulaExplorer } from "@/components/formula-explorer";

const UNVERIFIED = "needs-slide-check";

export default function FormulasPage() {
  const unverified = formulas.filter((f) => f.verification === UNVERIFIED).length;

  return (
    <main id="main" tabIndex={-1} className="flex-1">
      <section className="shell pt-sp-2 pb-sp-1">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="meta-label text-ink-subtle mb-8">คลังสูตร &middot; Formula Reference</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display tracking-reset">
                สูตร
                <br />
                ที่ต้องจำ
              </h1>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 mt-sp-1 lg:mt-0">
            <Reveal delay={160}>
              <dl className="space-y-6">
                <div>
                  <dt className="meta-label tracking-display text-ink-subtle">Total</dt>
                  <dd className="meta-value mt-2 tnum text-3xl">{formulas.length} สูตร</dd>
                </div>
                <div>
                  <dt className="meta-label tracking-display text-ink-subtle">Verified</dt>
                  <dd className="meta-value mt-2 tnum text-3xl text-accent-ink">
                    {formulas.length - unverified}
                  </dd>
                </div>
                {unverified > 0 ? (
                  <div>
                    <dt className="meta-label tracking-display text-ink-subtle">Pending</dt>
                    <dd className="meta-value mt-2 tnum text-3xl text-ink-subtle">{unverified}</dd>
                  </div>
                ) : null}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <FormulaExplorer formulas={formulas} />

      <footer className="shell py-sp-2 border-t border-rule">
        <p className="meta-label tracking-display text-ink-subtle">
          {formulas.length} สูตรคำนวณยืนยันความถูกต้องตามหลักการและภาพสไลด์แล้ว &mdash; ครบถ้วนสำหรับการสอบ Final
        </p>
      </footer>
    </main>
  );
}


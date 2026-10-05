import { formulas } from "@/content/formulas";
import { Reveal } from "@/components/reveal";

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

      <ol className="shell">
        {formulas.map((f, i) => (
          <Reveal as="li" key={f.id} delay={Math.min(i * 40, 240)}>
            <article className="grid-12 py-sp-1 border-t border-rule items-start">
              <div className="col-span-12 lg:col-span-1">
                <span className="index text-2xl text-ink-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="col-span-12 lg:col-span-6 mt-4 lg:mt-0">
                <h2 className="text-2xl lg:text-3xl tracking-reset">{f.name}</h2>
                <p className="mt-2 text-ink-muted">{f.output}</p>
                <p className="mt-4 meta-label tracking-display text-ink-subtle tnum">
                  {f.expression}
                </p>

                {f.symbols.length > 0 && (
                  <dl className="mt-6 space-y-2">
                    {f.symbols.map((s) => (
                      <div key={s.symbol} className="flex gap-4 text-sm">
                        <dt className="tnum font-medium w-32 shrink-0">{s.symbol}</dt>
                        <dd className="text-ink-muted">{s.meaning}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0 lg:col-start-9">
                {f.example ? (
                  <div className="border-t border-rule pt-4">
                    <p className="meta-label tracking-display text-ink-subtle">ตัวอย่าง</p>
                    <p className="mt-3 text-sm tnum">{f.example.given}</p>
                    <ol className="mt-3 space-y-1">
                      {f.example.steps.map((s, k) => (
                        <li key={k} className="tnum text-sm text-ink-muted pl-4 relative">
                          <span className="absolute left-0 text-ink-subtle">{k + 1}.</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 tnum text-xl text-accent-ink font-medium">
                      = {f.example.result}
                    </p>
                  </div>
                ) : null}

                {f.pitfall ? (
                  <div className="mt-6 border-t-2 border-accent pt-4">
                    <p className="meta-label tracking-display text-accent-ink">
                      จุดระวังข้อสอบ
                    </p>
                    <p className="mt-2 text-sm text-ink-muted">{f.pitfall}</p>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {f.lectures.map((l) => (
                    <span key={l} className="meta-label tracking-display text-ink-subtle">
                      {l}
                    </span>
                  ))}
                  {f.verification === UNVERIFIED && (
                    <span className="tap inline-flex items-center gap-2 border border-rule px-3">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" aria-hidden="true" />
                      <span className="meta-label tracking-display text-ink-subtle">
                        รอยืนยัน
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>

      <footer className="shell py-sp-2 border-t border-rule">
        <p className="meta-label tracking-display text-ink-subtle">
          {formulas.length - unverified} จาก {formulas.length} สูตรยืนยันกับสไลด์แล้ว &mdash; ที่เหลือรออ่านภาพสไลด์
        </p>
      </footer>
    </main>
  );
}

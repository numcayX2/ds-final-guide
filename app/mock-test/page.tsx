import { allMockTests } from "@/content/mock-test";
import { MockTestRunner } from "@/components/mock-test-runner";
import { Reveal } from "@/components/reveal";

export default function MockTestPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1">
      <section className="shell pt-sp-2 pb-sp-1">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="meta-label text-ink-subtle mb-8">
                Mock Test &middot; ข้อสอบจำลอง
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display tracking-reset">
                ลองสอบ
                <br />
                ด้วยเวลา
              </h1>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 mt-sp-1 lg:mt-0">
            <Reveal delay={160}>
              <dl className="space-y-6">
                <div>
                  <dt className="meta-label tracking-display text-ink-subtle">Total Bank</dt>
                  <dd className="meta-value mt-2 tnum text-3xl">30 ข้อ</dd>
                </div>
                <div>
                  <dt className="meta-label tracking-display text-ink-subtle">Coverage</dt>
                  <dd className="meta-value mt-2">Lect 05 &ndash; Lect 09 ครบทุกบท</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-sp-1 border-t border-rule">
        <MockTestRunner tests={allMockTests} />
      </section>

      <footer className="shell py-sp-2 border-t border-rule">
        <p className="meta-label tracking-display text-ink-subtle">
          ทุกข้อระบุเลขหน้าสไลด์ที่ใช้ตรวจคำตอบไว้ในเฉลย &mdash; ตรวจสอบตัวเลขกับสไลด์จริงทุกข้อ
        </p>
      </footer>
    </main>
  );
}
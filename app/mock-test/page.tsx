import { mockTestLect09 } from "@/content/mock-test";
import { MockTestRunner } from "@/components/mock-test-runner";
import { Reveal } from "@/components/reveal";

export default function MockTestPage() {
  const t = mockTestLect09;
  return (
    <main id="main" tabIndex={-1} className="flex-1">
      <section className="shell pt-sp-2 pb-sp-1">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="meta-label text-ink-subtle mb-8">
                Mock Test &middot; {t.titleTh}
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
                  <dt className="meta-label tracking-display text-ink-subtle">Questions</dt>
                  <dd className="meta-value mt-2 tnum text-3xl">{t.questions.length}</dd>
                </div>
                <div>
                  <dt className="meta-label tracking-display text-ink-subtle">Time limit</dt>
                  <dd className="meta-value mt-2 tnum text-3xl">
                    {t.timeLimitSeconds / 60} นาที
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-sp-1 border-t border-rule">
        <MockTestRunner test={t} />
      </section>

      <footer className="shell py-sp-2 border-t border-rule">
        <p className="meta-label tracking-display text-ink-subtle">
          ทุกข้อระบุเลขหน้าสไลด์ที่ใช้ตรวจคำตอบไว้ในเฉลย
        </p>
      </footer>
    </main>
  );
}
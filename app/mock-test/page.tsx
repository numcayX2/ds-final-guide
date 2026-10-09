import { allMockTests } from "@/content/mock-test";
import { MockTestRunner } from "@/components/mock-test-runner";
import { Reveal } from "@/components/reveal";

export default function MockTestPage() {
  const totalQuestions = allMockTests.reduce((n, t) => n + t.questions.length, 0);

  return (
    <main id="main" tabIndex={-1} className="flex-1">
      {/* Header */}
      <section className="shell pt-14 pb-10 border-b border-rule">
        <Reveal>
          <p className="eyebrow">Mock Test &middot; จับเวลาจริง 45 นาที</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight text-ink leading-[1.08]">
            ลองสอบเสมือนจริง
            <span className="block text-accent-ink">พร้อมเฉลยละเอียด</span>
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-ink-muted leading-relaxed">
            ข้อสอบ {allMockTests.length} ชุด รวม {totalQuestions} ข้อ
            ครอบคลุม Lect 05 ถึง Lect 09 พร้อมคำอธิบายเฉลยและสไลด์อ้างอิงทุกข้อ
          </p>
        </Reveal>
        <Reveal delay={140}>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-5 max-w-md">
            <div>
              <dt className="sr-only">Papers</dt>
              <dd className="index text-3xl text-ink">
                {allMockTests.length}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  ชุดข้อสอบ
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Questions</dt>
              <dd className="index text-3xl text-ink">
                {totalQuestions}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  ข้อสอบรวม
                </span>
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      <section className="shell py-8">
        <MockTestRunner tests={allMockTests} />
      </section>

      <footer className="shell py-8 border-t border-rule mt-12">
        <p className="text-xs text-ink-subtle">
          ทุกข้อระบุเลขหน้าสไลด์ที่ใช้ตรวจคำตอบไว้ในเฉลย &mdash; ตรวจสอบตัวเลขกับสไลด์จริงทุกข้อ
        </p>
      </footer>
    </main>
  );
}

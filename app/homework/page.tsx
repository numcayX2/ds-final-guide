import { homeworkProblems } from "@/content/homework";
import { Reveal } from "@/components/reveal";

/**
 * Homework solutions — exam-sheet editorial style.
 *
 * Read-only. Every figure on this page comes from `content/homework.ts`, which
 * was transcribed from the lecture slides; nothing is recomputed here, so the
 * page cannot disagree with the content layer.
 */

export default function HomeworkPage() {
  const totalSteps = homeworkProblems.reduce(
    (n, p) => n + p.solutionSteps.length,
    0
  );
  const lectureCount = new Set(homeworkProblems.flatMap((p) => p.lectures)).size;

  return (
    <main id="main" tabIndex={-1} className="flex-1 pb-16">
      {/* Hero */}
      <section className="shell pt-14 pb-10 border-b border-rule">
        <Reveal>
          <p className="eyebrow">Homework &middot; เฉลยจากสไลด์บรรยาย</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight text-ink leading-[1.08]">
            เฉลยการบ้าน
            <span className="block text-accent-ink">4 ข้อหลักฉบับทางการ</span>
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-ink-muted leading-relaxed">
            ถอดวิธีทำและตัวเลขคำตอบตรงจากสไลด์อาจารย์ ครอบคลุมทั้ง Confusion Matrix,
            การเลือก Classifier Model, และ K-Means Clustering (Manhattan &amp; Euclidean)
          </p>
        </Reveal>
        <Reveal delay={140}>
          <dl className="mt-10 grid grid-cols-3 gap-x-6 gap-y-4 border-t border-rule pt-5 max-w-xl">
            <div>
              <dt className="sr-only">Problems</dt>
              <dd className="index text-3xl text-ink">
                {homeworkProblems.length}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  โจทย์
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Steps</dt>
              <dd className="index text-3xl text-ink">
                {totalSteps}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  ขั้นตอน
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Lectures</dt>
              <dd className="index text-3xl text-ink">
                {lectureCount}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  บรรยาย
                </span>
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* Problems */}
      <div className="shell mt-10 space-y-10">
        {homeworkProblems.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 60, 240)}>
            <article className="bento-card p-6 sm:p-8">
              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-rule mb-6">
                <div className="flex items-baseline gap-4">
                  <span className="index text-3xl text-ink-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="bento-pill border border-rule text-ink-subtle">
                      {p.lectures.join(", ")}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1.5">
                      Homework ข้อที่ {i + 1}
                    </h2>
                  </div>
                </div>

                <span className="bento-pill border border-rule text-ink-subtle">
                  {p.source}
                </span>
              </div>

              {/* Problem statement */}
              <div className="border border-l-2 border-l-accent border-rule bg-surface-hover p-5 mb-8">
                <p className="eyebrow eyebrow-accent mb-2">โจทย์</p>
                <p className="text-base sm:text-lg text-ink font-medium leading-relaxed">
                  {p.statement}
                </p>
              </div>

              {/* 2-Column Split: Given & Pitfall on Left, Steps & Answer on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="border border-rule bg-surface p-5">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-rule">
                      <p className="eyebrow">ข้อมูลที่โจทย์กำหนด</p>
                      <span className="text-xs text-ink-muted">{p.given.length} รายการ</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs sm:text-sm">
                        <tbody>
                          {p.given.map((g, idx) => (
                            <tr key={idx} className="border-b border-rule/60 last:border-0">
                              <td className="py-2.5 pr-3 text-ink-muted font-medium">
                                {g.label}
                              </td>
                              <td className="py-2.5 pl-2 font-mono text-ink text-right font-semibold tnum">
                                {g.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {p.transcriptionNote ? (
                    <aside className="exam-pitfall-card">
                      <p className="eyebrow eyebrow-amber mb-2">จุดระวังข้อสอบ &amp; หมายเหตุการถอดสไลด์</p>
                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                        {p.transcriptionNote}
                      </p>
                    </aside>
                  ) : null}
                </div>

                {/* Right Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="eyebrow eyebrow-accent">วิธีทำและขั้นตอนคำนวณ</p>
                      <span className="text-xs text-ink-muted">
                        {p.solutionSteps.length} ขั้นตอน
                      </span>
                    </div>

                    <ol className="border-t border-rule">
                      {p.solutionSteps.map((s, k) => (
                        <li
                          key={k}
                          className="flex gap-4 py-3.5 border-b border-rule"
                        >
                          <span className="index text-lg text-ink-subtle shrink-0 w-6 text-right">
                            {k + 1}
                          </span>
                          <p className="text-xs sm:text-sm text-ink leading-relaxed">
                            {s}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Verified Answer */}
                  <div className="border border-l-2 border-l-mint border-rule bg-surface p-5">
                    <p className="eyebrow eyebrow-mint mb-1.5">คำตอบสุดท้าย</p>
                    <p className="text-sm sm:text-base font-mono font-bold text-ink leading-relaxed tnum">
                      {p.answer}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}

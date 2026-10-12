import Link from "next/link";
import { homeworkProblems } from "@/content/homework";
import { Reveal } from "@/components/reveal";
import { HomeworkStepItem } from "@/components/homework-step-item";

/**
 * Homework solutions — exam-sheet editorial style.
 *
 * Read-only. Every figure on this page comes from `content/homework.ts`, which
 * was transcribed from the lecture slides; nothing is recomputed here, so the
 * page cannot disagree with the content layer.
 */

const pad = (n: number) => String(n).padStart(2, "0");
const anchor = (id: string) => `hw-${id}`;

export default function HomeworkPage() {
  const totalSteps = homeworkProblems.reduce(
    (n, p) => n + p.solutionSteps.length,
    0,
  );
  const lectureCount = new Set(homeworkProblems.flatMap((p) => p.lectures)).size;

  const stats = [
    { label: "โจทย์", value: homeworkProblems.length },
    { label: "ขั้นตอนคำนวณ", value: totalSteps },
    { label: "บทบรรยาย", value: lectureCount },
  ];

  return (
    <main id="main" tabIndex={-1} className="flex-1">
      {/* ───────────── Hero ───────────── */}
      <section className="border-b border-rule">
        <div className="shell pt-14 pb-12 sm:pt-20 sm:pb-14">
          <Reveal>
            <p className="eyebrow">Homework &middot; เฉลยจากสไลด์บรรยาย</p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl font-extrabold tracking-tight text-ink leading-[1.08] text-balance">
              เฉลยการบ้าน
              <span className="block text-accent-ink">
                {homeworkProblems.length} ข้อหลักฉบับทางการ
              </span>
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-ink-muted leading-relaxed">
              ถอดวิธีทำและตัวเลขคำตอบตรงจากสไลด์อาจารย์ ครอบคลุมทั้ง Confusion Matrix,
              การเลือก Classifier Model, และ K-Means Clustering (Manhattan &amp; Euclidean)
            </p>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-px border border-rule bg-rule">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col-reverse bg-surface px-4 py-3 sm:px-5 sm:py-4"
                >
                  <dt className="mt-1 text-xs font-semibold text-ink-subtle">
                    {s.label}
                  </dt>
                  <dd className="index text-2xl sm:text-3xl text-ink tabular-nums">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Problem index ───────────── */}
      <nav aria-label="เลือกโจทย์" className="border-b border-rule">
        <div className="shell py-10">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <p className="eyebrow">เลือกโจทย์</p>
            <span className="text-xs text-ink-subtle">
              กดเพื่อกระโดดไปยังเฉลย
            </span>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {homeworkProblems.map((p, i) => (
              <li key={p.id}>
                <a
                  href={`#${anchor(p.id)}`}
                  className="group flex h-full flex-col border border-rule bg-surface p-4 transition-colors hover:border-ink"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="index text-2xl text-ink-subtle transition-colors group-hover:text-accent-ink">
                      {pad(i + 1)}
                    </span>
                    <span className="font-mono text-[11px] text-ink-subtle">
                      {p.lectures.join(", ")}
                    </span>
                  </span>
                  <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                    {p.statement}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* ───────────── Problems ───────────── */}
      <div className="shell space-y-12 py-12 sm:space-y-16 sm:py-16">
        {homeworkProblems.map((p, i) => {
          const no = pad(i + 1);
          const headingId = `${anchor(p.id)}-title`;

          return (
            <article
              key={p.id}
              id={anchor(p.id)}
              aria-labelledby={headingId}
              className="scroll-mt-24"
            >
              <Reveal>
                <div className="bento-card p-6 sm:p-8 lg:p-10">
                  {/* Header */}
                  <header className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-6">
                    <div className="flex items-center gap-4 sm:gap-5">
                      <span
                        aria-hidden="true"
                        className="index text-4xl sm:text-5xl leading-none text-ink-subtle"
                      >
                        {no}
                      </span>
                      <div>
                        <p className="eyebrow eyebrow-accent">
                          {p.lectures.join(" · ")}
                        </p>
                        <h2
                          id={headingId}
                          className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-ink"
                        >
                          Homework ข้อที่ {i + 1}
                        </h2>
                      </div>
                    </div>

                    <span className="bento-pill border border-rule text-ink-subtle">
                      {p.source}
                    </span>
                  </header>

                  {/* Problem statement */}
                  <section
                    aria-label="โจทย์"
                    className="relative mb-10 bg-surface-hover p-5 pl-6 sm:p-6 sm:pl-7"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1 bg-accent"
                    />
                    <p className="eyebrow eyebrow-accent mb-2">โจทย์</p>
                    <p className="max-w-3xl text-base sm:text-lg font-medium leading-relaxed text-ink">
                      {p.statement}
                    </p>
                  </section>

                  {/* Given (sticky on desktop) + Solution */}
                  <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                    {/* Left: given data + note */}
                    <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
                      <div className="border border-rule bg-surface">
                        <div className="flex items-center justify-between border-b border-rule px-5 py-3">
                          <h3 className="eyebrow">ข้อมูลที่โจทย์กำหนด</h3>
                          <span className="text-xs text-ink-subtle">
                            {p.given.length} รายการ
                          </span>
                        </div>

                        <dl className="divide-y divide-rule/60">
                          {p.given.map((g, idx) => (
                            <div
                              key={idx}
                              className="grid grid-cols-[minmax(0,1fr)_minmax(0,auto)] items-baseline gap-4 px-5 py-2.5 text-xs sm:text-sm"
                            >
                              <dt className="font-medium text-ink-muted">
                                {g.label}
                              </dt>
                              <dd className="break-words text-right font-mono font-semibold text-ink tnum">
                                {g.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      {p.transcriptionNote && (
                        <aside className="exam-pitfall-card">
                          <p className="eyebrow eyebrow-amber mb-2">
                            จุดระวังข้อสอบ &amp; หมายเหตุการถอดสไลด์
                          </p>
                          <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                            {p.transcriptionNote}
                          </p>
                        </aside>
                      )}
                    </div>

                    {/* Right: steps + answer */}
                    <div className="min-w-0 lg:col-span-7">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="eyebrow eyebrow-accent">
                          วิธีทำและขั้นตอนคำนวณ
                        </h3>
                        <span className="text-xs text-ink-subtle">
                          {p.solutionSteps.length} ขั้นตอน
                        </span>
                      </div>

                      <ol className="border-t border-rule">
                        {p.solutionSteps.map((s, k) => (
                          <HomeworkStepItem key={k} text={s} index={k} />
                        ))}
                      </ol>

                      {/* Final answer */}
                      <div className="relative mt-8 border border-rule bg-surface p-5 pl-6">
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-0 left-0 w-1 bg-mint"
                        />
                        <p className="eyebrow eyebrow-mint mb-1.5">คำตอบสุดท้าย</p>
                        <p className="font-mono text-sm sm:text-base font-bold leading-relaxed text-ink tnum">
                          {p.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>

      {/* ───────────── Footer ───────────── */}
      <footer className="border-t border-rule">
        <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-subtle">
            {homeworkProblems.length} โจทย์ &middot; {totalSteps} ขั้นตอน &mdash;
            ถอดจากสไลด์บรรยาย ไม่มีการคำนวณใหม่
          </p>
          <nav aria-label="ลิงก์ท้ายหน้า" className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <Link href="/tools" className="font-semibold text-ink hover:text-accent-ink">
              ลองคำนวณเองในเครื่องคิดเลข
            </Link>
            <Link href="/mock-test" className="font-semibold text-ink hover:text-accent-ink">
              ทำข้อสอบจำลอง
            </Link>
            <a href="#main" className="text-ink-subtle hover:text-ink">
              กลับขึ้นด้านบน ↑
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckCircledIcon,
  ClockIcon,
  CodeIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  FileTextIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";

const THEORY_CHAPTERS = [
  { no: "บท 5", title: "Exploratory Data Analysis (EDA)" },
  { no: "บท 6", title: "Machine Learning Modeling in Data Science" },
  { no: "บท 7", title: "Decision Tree Classifier and Evaluation" },
  { no: "บท 8", title: "K-Mean Clustering and Evaluation" },
  { no: "บท 9", title: "Responsible Data Science" },
] as const;

const LAB_MISSIONS = [
  { label: "Run", text: "สั่งรันตามขั้นตอน Instruction ใน Colab" },
  { label: "เติม Code", text: "เติมคำสั่ง scikit-learn / pandas ที่เว้นไว้" },
  { label: "เขียนคำอธิบาย", text: "วิเคราะห์ผล แปลความหมายตัวเลขลง Paper work" },
] as const;

export function ExamNoticeCard() {
  return (
    <section
      aria-labelledby="exam-briefing-title"
      className="rounded-2xl border border-rule bg-surface shadow-sm"
    >
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <header className="border-b border-rule p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-wash px-3 py-1 text-xs font-semibold text-accent-ink">
            <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            ประกาศทางการจากคาบเรียน
          </span>
          <span className="hidden font-mono text-xs text-ink-subtle sm:inline">
            CS341 · 10301351 Data Science
          </span>
        </div>
        <h2
          id="exam-briefing-title"
          className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
        >
          สรุปขอบเขตข้อสอบ &amp; กติกาห้องสอบปลายภาค
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
          บันทึกคำสั่งและกำหนดการสอบอย่างเป็นทางการจากผู้สอน — ข้อเขียน 5 บท + สอบแล็บ Colab
        </p>
      </header>

      {/* ── Two exam tracks ──────────────────────────────────────── */}
      <div className="grid gap-px bg-rule md:grid-cols-2">
        {/* ข้อสอบทฤษฎี */}
        <article
          aria-labelledby="theory-exam-title"
          className="flex flex-col bg-surface"
        >
          <div className="flex items-center justify-between gap-2 px-6 pt-6 sm:px-8">
            <h3
              id="theory-exam-title"
              className="flex items-center gap-2 text-base font-semibold text-ink"
            >
              <FileTextIcon className="h-4.5 w-4.5 text-accent" aria-hidden />
              ข้อสอบทฤษฎี (ข้อเขียน)
            </h3>
            <span className="rounded-full bg-accent-wash px-2.5 py-1 text-[11px] font-semibold text-accent-ink">
              ออกสอบ 5 บท
            </span>
          </div>

          <div className="flex-1 px-6 py-5 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              บทที่ออกสอบ · Lecture 05–09
            </p>

            <ul className="mt-3 divide-y divide-rule">
              {THEORY_CHAPTERS.map((ch) => (
                <li key={ch.no} className="flex items-start gap-2.5 py-2.5">
                  <CheckCircledIcon
                    className="mt-0.5 h-4 w-4 shrink-0 text-good"
                    aria-hidden
                  />
                  <span className="text-sm text-ink">
                    <span className="text-xs font-semibold text-accent-ink">
                      {ch.no}
                    </span>{" "}
                    <span className="font-medium">{ch.title}</span>
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-2.5 py-2.5">
                <CrossCircledIcon
                  className="mt-0.5 h-4 w-4 shrink-0 text-bad"
                  aria-hidden
                />
                <span className="text-sm text-ink-muted">
                  <span className="text-xs font-semibold text-bad">
                    บทที่ 10
                  </span>{" "}
                  <strong className="font-semibold text-bad">ไม่ออกสอบ</strong>{" "}
                  — เป็นภาพรวม Modern Data Science
                </span>
              </li>
            </ul>

            {/* Calculator warning — the one thing nobody may miss */}
            <div
              role="alert"
              className="mt-5 rounded-lg border-l-4 border-warn bg-warn-wash p-4"
            >
              <div className="flex items-start gap-2.5">
                <ExclamationTriangleIcon
                  className="mt-0.5 h-5 w-5 shrink-0 text-warn"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-bold leading-snug text-ink">
                    ให้นำเครื่องคิดเลขเข้าห้องสอบด้วย
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                    มีโจทย์คำนวณมือแน่นอน (Gini, Distance, Centroid, IQR) — สำคัญมาก ห้ามลืมเด็ดขาด
                  </p>
                </div>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-ink-muted">
              <li className="flex items-start gap-2">
                <Pencil2Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-subtle" aria-hidden />
                <span>
                  ใช้<strong className="text-ink">ปากกา</strong>เขียนคำตอบ — เขียนชื่อ นามสกุล รหัส
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Pencil2Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-subtle" aria-hidden />
                <span>
                  ทดในกระดาษคำถามได้ และหลังกระดาษคำตอบ{" "}
                  <strong className="text-ink">
                    (ไม่ต้องส่งกระดาษทดพร้อมกระดาษคำตอบ)
                  </strong>
                </span>
              </li>
            </ul>
          </div>

          <div className="border-t border-rule px-6 py-4 sm:px-8">
            <Link
              href="/chapters"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-accent-ink hover:underline"
            >
              อ่านสรุปเจาะลึก 5 บทเรียน
              <ArrowRightIcon
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </article>

        {/* ข้อสอบปฏิบัติ */}
        <article
          aria-labelledby="lab-exam-title"
          className="flex flex-col bg-surface"
        >
          <div className="flex items-center justify-between gap-2 px-6 pt-6 sm:px-8">
            <h3
              id="lab-exam-title"
              className="flex items-center gap-2 text-base font-semibold text-ink"
            >
              <CalendarIcon className="h-4.5 w-4.5 text-good" aria-hidden />
              ข้อสอบปฏิบัติ (Lab Exam)
            </h3>
            <span className="rounded-full bg-good-wash px-2.5 py-1 font-mono text-[11px] font-semibold text-good">
              Colab version3
            </span>
          </div>

          <div className="flex-1 px-6 py-5 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              กำหนดการ &amp; สถานที่
            </p>

            <div className="mt-3 rounded-lg border border-rule bg-paper p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-ink">
                <CalendarIcon className="h-4 w-4 text-accent" aria-hidden />
                พฤหัสบดี 22 ต.ค.
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-sm text-ink">
                <ClockIcon className="h-4 w-4 shrink-0 text-ink-subtle" aria-hidden />
                <span>
                  13.00 – 15.00 น.
                  <span className="ml-1.5 text-xs text-ink-subtle">2 ชม.</span>
                </span>
              </p>
              <p className="mt-1.5 text-sm text-ink">
                Sci Digital Lab ชั้น 1 อาคาร 60 ปี
              </p>
              <p className="mt-1 text-[11px] text-ink-subtle">
                ถ้าขอใช้ห้องไม่ได้ จะย้ายไปสอบชั้น 6
              </p>
            </div>

            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              รูปแบบข้อสอบ · Colab + Paper work (Hybrid)
            </p>
            <div className="mt-3 space-y-2.5">
              <p className="rounded-md border border-rule bg-paper px-3 py-2 text-xs text-ink">
                อาจารย์แจกไฟล์{" "}
                <code className="rounded bg-surface-hover px-1.5 py-0.5 font-mono font-semibold text-accent-ink">
                  colab version3
                </code>
              </p>
              <ol className="space-y-2">
                {LAB_MISSIONS.map((m, i) => (
                  <li key={m.label} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent-wash font-mono text-[11px] font-bold text-accent-ink"
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs leading-relaxed text-ink-muted">
                      <strong className="font-semibold text-ink">{m.label}:</strong>{" "}
                      {m.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="border-t border-rule px-6 py-4 sm:px-8">
            <Link href="/lab" className="btn btn-primary w-full justify-center text-xs py-2">
              <CodeIcon className="h-3.5 w-3.5" aria-hidden />
              เปิดคู่มือ &amp; แนวโค้ดเตรียมสอบ Lab (Colab Guide)
              <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

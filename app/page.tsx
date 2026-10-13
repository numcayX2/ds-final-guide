import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { HomePageTransition } from "@/components/home-page-transition";
import { StudyPlan, type PlanStep } from "@/components/study-plan";
import { Tex } from "@/components/tex";
import {
  ArrowRightIcon,
  CheckCircledIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
  PlayIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import { chapters as allChapters } from "@/content/chapters";
import { formulas as allFormulas } from "@/content/formulas";
import { episodes } from "@/content/episodes";
import { allMockTests } from "@/content/mock-test";
import { ExamNoticeCard } from "@/components/exam-notice";

const SHELL = "mx-auto w-full max-w-5xl px-5 sm:px-8";
const CALCULATOR_COUNT = 4;

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const CHAPTERS = [
  {
    n: "01",
    lect: "Lect 05",
    en: "Exploratory Data Analysis",
    th: "สำรวจข้อมูลเบื้องต้น และตรวจหา Outlier ด้วย IQR",
    slug: "eda",
  },
  {
    n: "02",
    lect: "Lect 06–07",
    en: "Modeling & Decision Tree",
    th: "สร้างโมเดล คำนวณ Gini Impurity และ Information Gain",
    slug: "modeling",
  },
  {
    n: "03",
    lect: "Lect 08",
    en: "Confusion Matrix & Metrics",
    th: "Accuracy, Precision, Recall และ F1-Score",
    slug: "confusion-matrix",
  },
  {
    n: "04",
    lect: "Lect 08–09",
    en: "K-Means Clustering",
    th: "จัดกลุ่มด้วย K-Means ระยะ Manhattan และ Euclidean",
    slug: "kmeans",
  },
  {
    n: "05",
    lect: "Lect 09",
    en: "Responsible Data Science",
    th: "จริยธรรม ความเป็นธรรม และความเป็นส่วนตัวของข้อมูล",
    slug: "responsible-ds",
  },
];

const PLAN_STEPS: PlanStep[] = [
  {
    step: "01",
    day: "Day 1",
    title: "อ่านสรุป 5 บทให้ครบ",
    desc: "ทำความเข้าใจนิยามศัพท์ และจดจุดหลอกที่อาจารย์มักออกสอบ",
    href: "/chapters",
    time: "45 นาที",
    tag: "ความเข้าใจ",
  },
  {
    step: "02",
    day: "Day 2",
    title: "ฝึกคำนวณด้วยมือ แล้วเช็กกับเครื่องมือ",
    desc: "ไล่วิธีคิดทีละขั้นใน Thinking Player แล้วลองเปลี่ยนตัวเลขในเครื่องคิดเลข",
    href: "/player",
    time: "35 นาที",
    tag: "ฝึกคำนวณ",
  },
  {
    step: "03",
    day: "Day 3",
    title: "ทำข้อสอบจำลองแบบจับเวลา",
    desc: "ทำชุดเต็มใน 45 นาที หรือใช้โหมดฝึกเพื่อดูคำใบ้และเฉลยละเอียดทีละข้อ",
    href: "/mock-test",
    time: "45 นาที",
    tag: "จำลองสอบ",
  },
];

type Tool = {
  href: string;
  title: string;
  desc: string;
  meta: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

const TOTAL_QUESTIONS = allMockTests.reduce(
  (n, t) => n + t.questions.length,
  0,
);

const FEATURED_TOOL: Tool = {
  href: "/mock-test",
  title: "ข้อสอบจำลอง",
  desc: "ชุดเต็ม 30 ข้อแบบจับเวลา และชุดย่อยรายหัวข้อ มีโหมดฝึกที่ตรวจคำตอบทันทีพร้อมคำใบ้ทุกข้อ",
  meta: "45 นาที",
  icon: CheckCircledIcon,
};

const TOOLS: Tool[] = [
  {
    href: "/tools",
    title: "เครื่องคิดเลข",
    desc: "Confusion Matrix, Gini Splitter, Tukey IQR, K-Means",
    meta: `${CALCULATOR_COUNT} เครื่องมือ`,
    icon: MixerHorizontalIcon,
  },
  {
    href: "/formulas",
    title: "คลังสูตร",
    desc: "ทุกสูตรพร้อมวิธีทำทีละขั้นและจุดที่มักผิด",
    meta: `${allFormulas.length} สูตร`,
    icon: SymbolIcon,
  },
  {
    href: "/homework",
    title: "เฉลยการบ้าน",
    desc: "Customer Inactivity, Candidate Models, K-Means",
    meta: "4 ข้อ",
    icon: Pencil2Icon,
  },
  {
    href: "/player",
    title: "Thinking Player",
    desc: "ดูวิธีคิดทีละขั้นแบบเลื่อนอ่าน",
    meta: `${episodes.length} ตอน`,
    icon: PlayIcon,
  },
];

type FormulaCard = {
  name: string;
  tag: string;
  tex: string;
  where: { sym: string; meaning: string }[];
  example: string;
  pitfall: string;
};

const FORMULAS: FormulaCard[] = [
  {
    name: "Interquartile Range",
    tag: "Lect 05",
    tex: "\\mathrm{IQR} = Q_3 - Q_1",
    where: [
      { sym: "Q_1", meaning: "ควอร์ไทล์ที่ 1 (เปอร์เซ็นไทล์ที่ 25)" },
      { sym: "Q_3", meaning: "ควอร์ไทล์ที่ 3 (เปอร์เซ็นไทล์ที่ 75)" },
    ],
    example:
      "Q_1 = 20,\\; Q_3 = 35 \\;\\Rightarrow\\; \\mathrm{IQR} = 35 - 20 = \\boxed{15}",
    pitfall: "IQR วัดเฉพาะข้อมูล 50% ตรงกลาง ไม่ใช่ max − min",
  },
  {
    name: "Tukey's Fences",
    tag: "Lect 05",
    tex: "\\big[\\, Q_1 - 1.5\\,\\mathrm{IQR},\\;\\; Q_3 + 1.5\\,\\mathrm{IQR} \\,\\big]",
    where: [
      { sym: "1.5", meaning: "ค่าคงที่ของ Tukey สำหรับ Outlier ทั่วไป" },
      {
        sym: "x \\notin [\\cdot]",
        meaning: "ค่าที่อยู่นอกช่วงนี้ถือเป็น Outlier",
      },
    ],
    example:
      "[\\,20 - 22.5,\\; 35 + 22.5\\,] = \\boxed{[-2.5,\\; 57.5]}",
    pitfall: "ต้องบวก/ลบจาก Q₁ และ Q₃ ไม่ใช่จาก Median",
  },
  {
    name: "Gini Impurity (2 คลาส)",
    tag: "Lect 07",
    tex: "\\mathrm{Gini}(S) = 1 - \\left( p_+^{\\,2} + p_-^{\\,2} \\right)",
    where: [
      { sym: "p_+", meaning: "สัดส่วนคลาสบวกในโหนด" },
      { sym: "p_-", meaning: "สัดส่วนคลาสลบในโหนด" },
    ],
    example:
      "p_+ = 0.6,\\; p_- = 0.4 \\;\\Rightarrow\\; 1 - (0.36 + 0.16) = \\boxed{0.48}",
    pitfall: "ยกกำลังสองที่สัดส่วน ไม่ใช่จำนวนนับ — ค่าสูงสุดคือ 0.5",
  },
  {
    name: "F1-Score",
    tag: "Lect 08",
    tex: "F_1 = 2 \\cdot \\dfrac{P \\cdot R}{P + R}",
    where: [
      { sym: "P", meaning: "Precision = TP / (TP + FP)" },
      { sym: "R", meaning: "Recall = TP / (TP + FN)" },
    ],
    example:
      "P = 0.8,\\; R = 0.5 \\;\\Rightarrow\\; 2 \\cdot \\tfrac{0.40}{1.30} \\approx \\boxed{0.615}",
    pitfall: "เป็น Harmonic Mean — ถ้าเฉลี่ยธรรมดาจะได้ 0.65 ซึ่งผิด",
  },
];

const STATS = [
  { n: allChapters.length, label: "บทเรียน" },
  { n: allFormulas.length, label: "สูตร" },
  { n: TOTAL_QUESTIONS, label: "ข้อสอบจำลอง" },
  { n: CALCULATOR_COUNT, label: "เครื่องคิดเลข" },
  { n: episodes.length, label: "ตอนคิดทีละขั้น" },
];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${SHELL} scroll-mt-24 border-t border-rule py-16 sm:py-20`}
    >
      {children}
    </section>
  );
}

function SectionHead({
  id,
  no,
  title,
  desc,
  action,
}: {
  id: string;
  no: number;
  title: string;
  desc?: string;
  action?: { href: string; label: string };
}) {
  return (
    <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-xs text-accent">
          §{String(no).padStart(2, "0")}
        </p>
        <h2
          id={`${id}-title`}
          className="mt-2 text-2xl font-semibold tracking-tight text-ink text-balance sm:text-[1.75rem]"
        >
          {title}
        </h2>
        {desc && <p className="mt-2 max-w-2xl text-ink-muted">{desc}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="text-link group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium"
        >
          {action.label}
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </header>
  );
}

/** Hero visual: a real worked problem instead of decoration. */
function WorkedExample() {
  return (
    <figure className="graph-paper rounded-xl border border-rule-strong p-6 sm:p-7">
      <figcaption className="flex items-center justify-between text-sm">
        <span className="font-semibold text-ink">ตัวอย่างโจทย์</span>
        <span className="font-mono text-xs text-ink-subtle">
          Gini · Lect 07
        </span>
      </figcaption>

      <p className="mt-4 text-[15px] text-ink-muted">
        โหนดหนึ่งมีข้อมูลคลาส <strong className="text-ink">+</strong> จำนวน 6
        ตัว และคลาส <strong className="text-ink">−</strong> จำนวน 4 ตัว ค่า Gini
        เท่าไร?
      </p>

      <ol className="mt-5 space-y-3 border-l-2 border-accent pl-4">
        <li>
          <span className="mb-0.5 block font-mono text-xs text-ink-subtle">
            ขั้น 1 · หาสัดส่วน
          </span>
          <Tex tex="p_+ = \tfrac{6}{10} = 0.6,\quad p_- = \tfrac{4}{10} = 0.4" />
        </li>
        <li>
          <span className="mb-0.5 block font-mono text-xs text-ink-subtle">
            ขั้น 2 · แทนค่าในสูตร
          </span>
          <Tex tex="\mathrm{Gini} = 1 - (0.6^2 + 0.4^2)" />
        </li>
        <li>
          <span className="mb-0.5 block font-mono text-xs text-ink-subtle">
            ขั้น 3 · คำนวณ
          </span>
          <Tex tex="= 1 - (0.36 + 0.16) = \boxed{0.48}" />
        </li>
      </ol>

      <p className="mt-5 border-t border-rule pt-4 text-sm text-ink-muted">
        ค่าใกล้ 0.5 แปลว่าโหนดนี้ยังปนกันมาก ควรแบ่งต่อ{" "}
        <Link href="/tools" className="text-link font-medium">
          ลองเปลี่ยนตัวเลขเอง
        </Link>
      </p>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  const FeaturedIcon = FEATURED_TOOL.icon;

  return (
    <HomePageTransition>
      {/* ---------- Hero ---------- */}
      <section className={`${SHELL} pb-16 pt-14 sm:pb-20 sm:pt-20`}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14">
          <div>
            <p className="font-mono text-xs text-ink-subtle">
              10301351 · Data Science · Final Exam · Lect 05–09
            </p>

            <h1 className="mt-5 text-[2.25rem] font-semibold leading-[1.25] tracking-tight text-ink text-balance sm:text-5xl">
              ทบทวน Data Science
              <span className="block text-accent">
                ให้เข้าใจที่มาของทุกตัวเลข
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-lg text-ink-muted">
              สรุปบทเรียน สูตรพร้อมตัวอย่างคำนวณทีละขั้น
              และข้อสอบจำลองที่มีเฉลยละเอียด
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#exam-notice" className="btn btn-primary">
                ประกาศสอบล่าสุด
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/lab" className="btn btn-secondary">
                คู่มือสอบ Lab
              </Link>
              <Link href="/mock-test" className="btn btn-secondary">
                ทำข้อสอบจำลอง
              </Link>
            </div>
          </div>

          <WorkedExample />
        </div>

        {/* Official Exam Notice from Classroom */}
        <div id="exam-notice" className="mt-12 scroll-mt-20">
          <ExamNoticeCard />
        </div>

        {/* Stats strip — full width, evenly divided */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col-reverse bg-surface px-5 py-4 last:col-span-2 sm:last:col-span-1"
            >
              <dt className="mt-0.5 text-xs text-ink-subtle">{s.label}</dt>
              <dd className="num font-mono text-2xl font-medium text-ink tabular-nums">
                {s.n}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- §1 Plan ---------- */}
      <Section id="plan">
        <SectionHead
          id="plan"
          no={1}
          title="แผนทบทวน 3 วัน"
          desc="เรียงตามลำดับสไลด์บรรยาย กดทำเครื่องหมายเมื่อเสร็จแต่ละขั้น — ความคืบหน้าบันทึกไว้ในเบราว์เซอร์นี้"
        />
        <StudyPlan steps={PLAN_STEPS} />
      </Section>

      {/* ---------- §2 Chapters ---------- */}
      <Section id="chapters">
        <SectionHead
          id="chapters"
          no={2}
          title={`เนื้อหา ${CHAPTERS.length} บท`}
          desc="ครอบคลุม Lecture 05–09 พร้อมจุดที่มักออกสอบในแต่ละบท"
          action={{ href: "/chapters", label: "อ่านทั้งหมด" }}
        />

        <ol className="border-t border-rule">
          {CHAPTERS.map((c) => (
            <li key={c.slug} className="border-b border-rule">
              <Link
                href={`/chapters#${c.slug}`}
                className="group -mx-3 grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-4 rounded-md px-3 py-5 transition-colors hover:bg-surface-hover"
              >
                <span className="num font-mono text-sm text-ink-subtle">
                  {c.n}
                </span>

                <span className="min-w-0">
                  <span className="block text-lg font-semibold text-ink transition-colors group-hover:text-accent-ink">
                    {c.en}
                  </span>
                  <span className="mt-0.5 block text-[15px] text-ink-muted">
                    {c.th}
                  </span>
                  {/* Lecture tag moves under the title on mobile */}
                  <span className="mt-1.5 block font-mono text-xs text-ink-subtle sm:hidden">
                    {c.lect}
                  </span>
                </span>

                <span className="flex items-center gap-4 self-center">
                  <span className="hidden font-mono text-xs text-ink-subtle sm:inline">
                    {c.lect}
                  </span>
                  <ArrowRightIcon
                    aria-hidden
                    className="h-4 w-4 text-ink-subtle transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- §3 Formulas ---------- */}
      <Section id="formulas">
        <SectionHead
          id="formulas"
          no={3}
          title="สูตรที่ออกสอบบ่อย"
          desc="แต่ละสูตรมีความหมายของสัญลักษณ์ ตัวอย่างแทนค่า และจุดที่คนมักทำผิด"
          action={{
            href: "/formulas",
            label: `ดูทั้ง ${allFormulas.length} สูตร`,
          }}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {FORMULAS.map((f) => (
            <article
              key={f.name}
              className="flex flex-col rounded-xl border border-rule bg-surface p-6 transition-colors hover:border-rule-strong"
            >
              <header className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold text-ink">{f.name}</h3>
                <span className="shrink-0 font-mono text-xs text-ink-subtle">
                  {f.tag}
                </span>
              </header>

              {/* Formula — visual centre of the card */}
              <div className="my-5 overflow-x-auto rounded-lg bg-accent-wash px-4 py-4 text-ink">
                <Tex tex={f.tex} display />
              </div>

              {/* Symbol legend — shared columns keep symbols aligned */}
              <div className="text-[15px]">
                <p className="mb-2 text-xs text-ink-subtle">โดยที่</p>
                <dl className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1.5">
                  {f.where.map((w) => (
                    <div key={w.sym} className="contents">
                      <dt className="text-ink">
                        <Tex tex={w.sym} />
                      </dt>
                      <dd className="text-ink-muted">{w.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Worked example */}
              <div className="mt-5 border-t border-rule pt-4">
                <p className="mb-1.5 text-xs text-ink-subtle">ตัวอย่าง</p>
                <div className="overflow-x-auto text-ink">
                  <Tex tex={f.example} />
                </div>
              </div>

              {/* Common mistake — pinned to the bottom */}
              <div className="mt-auto pt-5">
                <p className="border-l-2 border-accent pl-3 text-sm text-ink-muted">
                  <span className="font-semibold text-ink">จุดที่มักผิด: </span>
                  {f.pitfall}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ---------- §4 Tools ---------- */}
      <Section id="tools">
        <SectionHead
          id="tools"
          no={4}
          title="เครื่องมือฝึก"
          desc="ใช้ควบคู่กับแผน 3 วัน — เริ่มจากข้อสอบจำลอง แล้วใช้เครื่องมืออื่นเติมจุดที่ยังพลาด"
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Featured: mock test */}
          <Link
            href={FEATURED_TOOL.href}
            className="group flex flex-col rounded-xl border border-rule-strong bg-accent-wash p-6 transition-colors hover:border-accent sm:p-7"
          >
            <span className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-rule-strong bg-surface">
                <FeaturedIcon className="h-5 w-5 text-accent" aria-hidden />
              </span>
              <span className="font-mono text-xs text-ink-subtle">
                {FEATURED_TOOL.meta}
              </span>
            </span>

            <span className="mt-6 block text-xl font-semibold text-ink group-hover:text-accent-ink">
              {FEATURED_TOOL.title}
            </span>
            <span className="mt-2 block text-[15px] text-ink-muted">
              {FEATURED_TOOL.desc}
            </span>

            <span className="mt-6 flex items-baseline gap-2 border-t border-rule pt-4">
              <span className="num font-mono text-2xl font-medium text-ink">
                {TOTAL_QUESTIONS}
              </span>
              <span className="text-xs text-ink-subtle">ข้อทั้งหมดในคลัง</span>
            </span>

            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-accent-ink">
              เริ่มทำข้อสอบ
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          {/* Other tools — 2 × 2 grid */}
          <ul className="grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-2">
            {TOOLS.map((t) => {
              const Icon = t.icon;
              return (
                <li key={t.href} className="bg-surface">
                  <Link
                    href={t.href}
                    className="group flex h-full flex-col p-5 transition-colors hover:bg-surface-hover"
                  >
                    <span className="flex items-center justify-between">
                      <Icon className="h-4 w-4 text-accent" aria-hidden />
                      <span className="font-mono text-xs text-ink-subtle">
                        {t.meta}
                      </span>
                    </span>
                    <span className="mt-4 font-semibold text-ink group-hover:text-accent-ink">
                      {t.title}
                    </span>
                    <span className="mt-1 text-sm text-ink-muted">
                      {t.desc}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* ---------- Footer ---------- */}
      <footer className={`${SHELL} border-t border-rule py-8`}>
        <div className="flex flex-col gap-4 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>© 2026 DS Final Guide — วิชา 10301351 Data Science</p>
            <p>เรียบเรียงจากสไลด์บรรยาย Lect 05–09</p>
          </div>
          <nav
            aria-label="ลิงก์ท้ายหน้า"
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            <Link href="/chapters" className="hover:text-ink">
              บทเรียน
            </Link>
            <Link href="/formulas" className="hover:text-ink">
              สูตร
            </Link>
            <Link href="/mock-test" className="hover:text-ink">
              ข้อสอบจำลอง
            </Link>
            <Link href="/lab" className="hover:text-ink">
              สอบ Lab
            </Link>
            <Link href="/tools" className="hover:text-ink">
              เครื่องคิดเลข
            </Link>
          </nav>
        </div>
      </footer>
    </HomePageTransition>
  );
}

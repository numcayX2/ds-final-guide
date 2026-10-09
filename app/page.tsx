import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
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

const SHELL = "mx-auto w-full max-w-5xl px-5 sm:px-8";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const CHAPTERS = [
  { n: "01", lect: "Lect 05", en: "Exploratory Data Analysis", th: "สำรวจข้อมูลเบื้องต้น และตรวจหา Outlier ด้วย IQR", slug: "eda" },
  { n: "02", lect: "Lect 06–07", en: "Modeling & Decision Tree", th: "สร้างโมเดล คำนวณ Gini Impurity และ Information Gain", slug: "modeling" },
  { n: "03", lect: "Lect 08", en: "Confusion Matrix & Metrics", th: "Accuracy, Precision, Recall และ F1-Score", slug: "confusion-matrix" },
  { n: "04", lect: "Lect 08–09", en: "K-Means Clustering", th: "จัดกลุ่มด้วย K-Means ระยะ Manhattan และ Euclidean", slug: "kmeans" },
  { n: "05", lect: "Lect 09", en: "Responsible Data Science", th: "จริยธรรม ความเป็นธรรม และความเป็นส่วนตัวของข้อมูล", slug: "responsible-ds" },
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

const TOOLS: Tool[] = [
  { href: "/mock-test", title: "ข้อสอบจำลอง", desc: "ชุดเต็ม 30 ข้อ และชุดย่อยรายหัวข้อ มีโหมดฝึกพร้อมคำใบ้", meta: "45 นาที", icon: CheckCircledIcon },
  { href: "/tools", title: "เครื่องคิดเลข", desc: "Confusion Matrix, Gini Splitter, Tukey IQR, K-Means", meta: "4 เครื่องมือ", icon: MixerHorizontalIcon },
  { href: "/formulas", title: "คลังสูตร", desc: "ทุกสูตรพร้อมวิธีทำทีละขั้นและจุดที่มักผิด", meta: `${allFormulas.length} สูตร`, icon: SymbolIcon },
  { href: "/homework", title: "เฉลยการบ้าน", desc: "Customer Inactivity, Candidate Models, K-Means", meta: "4 ข้อ", icon: Pencil2Icon },
  { href: "/player", title: "Thinking Player", desc: "ดูวิธีคิดทีละขั้นแบบเลื่อนอ่าน", meta: `${episodes.length} ตอน`, icon: PlayIcon },
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
    example: "Q_1 = 20,\\; Q_3 = 35 \\;\\Rightarrow\\; \\mathrm{IQR} = 35 - 20 = \\colorbox{var(--color-mark)}{15}",
    pitfall: "IQR วัดเฉพาะข้อมูล 50% ตรงกลาง ไม่ใช่ max − min",
  },
  {
    name: "Tukey's Fences",
    tag: "Lect 05",
    tex: "\\big[\\, Q_1 - 1.5\\,\\mathrm{IQR},\\;\\; Q_3 + 1.5\\,\\mathrm{IQR} \\,\\big]",
    where: [
      { sym: "1.5", meaning: "ค่าคงที่ของ Tukey สำหรับ Outlier ทั่วไป" },
      { sym: "x \\notin [\\cdot]", meaning: "ค่าที่อยู่นอกช่วงนี้ถือเป็น Outlier" },
    ],
    example: "[\\,20 - 22.5,\\; 35 + 22.5\\,] = \\colorbox{var(--color-mark)}{[-2.5,\\; 57.5]}",
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
    example: "p_+ = 0.6,\\; p_- = 0.4 \\;\\Rightarrow\\; 1 - (0.36 + 0.16) = \\colorbox{var(--color-mark)}{0.48}",
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
    example: "P = 0.8,\\; R = 0.5 \\;\\Rightarrow\\; 2 \\cdot \\tfrac{0.40}{1.30} \\approx \\colorbox{var(--color-mark)}{0.615}",
    pitfall: "เป็น Harmonic Mean — ถ้าเฉลี่ยธรรมดาจะได้ 0.65 ซึ่งผิด",
  },
];

const TOTAL_QUESTIONS = allMockTests.reduce((n, t) => n + t.questions.length, 0);

const STATS = [
  { n: allChapters.length, label: "บทเรียน" },
  { n: allFormulas.length, label: "สูตร" },
  { n: TOTAL_QUESTIONS, label: "ข้อสอบจำลอง" },
  { n: 4, label: "เครื่องคิดเลข" },
  { n: episodes.length, label: "ตอนคิดทีละขั้น" },
];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function SectionHead({
  no,
  title,
  desc,
  action,
}: {
  no: number;
  title: string;
  desc?: string;
  action?: { href: string; label: string };
}) {
  return (
    <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
          <span className="font-mono text-base font-normal text-accent">§{no}</span>
          {title}
        </h2>
        {desc && <p className="mt-2 max-w-2xl text-ink-muted">{desc}</p>}
      </div>
      {action && (
        <Link href={action.href} className="text-link inline-flex shrink-0 items-center gap-1.5 text-sm font-medium">
          {action.label}
          <ArrowRightIcon className="h-3.5 w-3.5" />
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
        <span className="font-mono text-xs text-ink-subtle">Gini · Lect 07</span>
      </figcaption>

      <p className="mt-4 text-[15px] text-ink-muted">
        โหนดหนึ่งมีข้อมูลคลาส <strong className="text-ink">+</strong> จำนวน 6 ตัว และคลาส{" "}
        <strong className="text-ink">−</strong> จำนวน 4 ตัว ค่า Gini เท่าไร?
      </p>

      <ol className="mt-5 space-y-3 border-l-2 border-accent pl-4">
        <li>
          <span className="mb-0.5 block font-mono text-xs text-ink-subtle">ขั้น 1 · หาสัดส่วน</span>
          <Tex tex="p_+ = \tfrac{6}{10} = 0.6,\quad p_- = \tfrac{4}{10} = 0.4" />
        </li>
        <li>
          <span className="mb-0.5 block font-mono text-xs text-ink-subtle">ขั้น 2 · แทนค่าในสูตร</span>
          <Tex tex="\mathrm{Gini} = 1 - (0.6^2 + 0.4^2)" />
        </li>
        <li>
          <span className="mb-0.5 block font-mono text-xs text-ink-subtle">ขั้น 3 · คำนวณ</span>
          <Tex tex="= 1 - (0.36 + 0.16) = \colorbox{var(--color-mark)}{0.48}" />
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
  return (
    <HomePageTransition>
      {/* ---------- Hero ---------- */}
      <section className={`${SHELL} pb-16 pt-14 sm:pt-20`}>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-mono text-xs text-ink-subtle">
              10301351 · Data Science · Final Exam · Lect 05–09
            </p>

            <h1 className="mt-5 text-[2.25rem] font-semibold tracking-tight text-ink sm:text-5xl leading-[1.25]">
              ทบทวน Data Science
              <br />
              <span className="text-accent">ให้เข้าใจที่มาของทุกตัวเลข</span>
            </h1>

            <p className="mt-5 max-w-lg text-lg text-ink-muted">
              สรุปบทเรียน สูตรพร้อมตัวอย่างคำนวณทีละขั้น และข้อสอบจำลองที่มีเฉลยละเอียด
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#plan" className="btn btn-primary">
                เริ่มแผน 3 วัน
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/mock-test" className="btn btn-secondary">
                ทำข้อสอบจำลอง
              </Link>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-rule pt-6">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="text-xs text-ink-subtle">{s.label}</dt>
                  <dd className="num font-mono text-2xl font-medium text-ink">{s.n}</dd>
                </div>
              ))}
            </dl>
          </div>

          <WorkedExample />
        </div>
      </section>

      {/* ---------- §1 Plan ---------- */}
      <section id="plan" className={`${SHELL} scroll-mt-24 border-t border-rule py-16`}>
        <SectionHead
          no={1}
          title="แผนทบทวน 3 วัน"
          desc="เรียงตามลำดับสไลด์บรรยาย กดทำเครื่องหมายเมื่อเสร็จแต่ละขั้น — ความคืบหน้าบันทึกไว้ในเบราว์เซอร์นี้"
        />
        <StudyPlan steps={PLAN_STEPS} />
      </section>

      {/* ---------- §2 Chapters (table of contents) ---------- */}
      <section className={`${SHELL} border-t border-rule py-16`}>
        <SectionHead
          no={2}
          title="เนื้อหา 5 บท"
          desc="ครอบคลุม Lecture 05–09 พร้อมจุดที่มักออกสอบในแต่ละบท"
          action={{ href: "/chapters", label: "อ่านทั้งหมด" }}
        />

        <ol className="border-t border-rule">
          {CHAPTERS.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/chapters#${c.slug}`}
                className="group -mx-3 grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 rounded-md border-b border-rule px-3 py-5 transition-colors hover:bg-surface-hover"
              >
                <span className="num font-mono text-sm text-ink-subtle">{c.n}</span>
                <span>
                  <span className="block text-lg font-semibold text-ink transition-colors group-hover:text-accent-ink">
                    {c.en}
                  </span>
                  <span className="mt-0.5 block text-[15px] text-ink-muted">{c.th}</span>
                </span>
                <span className="font-mono text-xs text-ink-subtle">{c.lect}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- §3 Formulas ---------- */}
      <section className={`${SHELL} border-t border-rule py-16`}>
        <SectionHead
          no={3}
          title="สูตรที่ออกสอบบ่อย"
          desc="แต่ละสูตรมีความหมายของสัญลักษณ์ ตัวอย่างแทนค่า และจุดที่คนมักทำผิด"
          action={{ href: "/formulas", label: `ดูทั้ง ${allFormulas.length} สูตร` }}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {FORMULAS.map((f) => (
            <article key={f.name} className="flex flex-col rounded-xl border border-rule bg-surface p-6">
              <header className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold text-ink">{f.name}</h3>
                <span className="shrink-0 font-mono text-xs text-ink-subtle">{f.tag}</span>
              </header>

              {/* The formula itself — the visual centre of the card */}
              <div className="my-5 rounded-lg bg-accent-wash px-4 py-4 text-ink">
                <Tex tex={f.tex} display />
              </div>

              {/* Symbol legend */}
              <dl className="space-y-1.5 text-[15px]">
                <p className="mb-1 text-xs text-ink-subtle">โดยที่</p>
                {f.where.map((w) => (
                  <div key={w.sym} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3">
                    <dt className="text-ink">
                      <Tex tex={w.sym} />
                    </dt>
                    <dd className="text-ink-muted">{w.meaning}</dd>
                  </div>
                ))}
              </dl>

              {/* Worked example */}
              <div className="mt-5 border-t border-rule pt-4">
                <p className="mb-1.5 text-xs text-ink-subtle">ตัวอย่าง</p>
                <div className="overflow-x-auto text-ink">
                  <Tex tex={f.example} />
                </div>
              </div>

              {/* Common mistake */}
              <p className="mt-auto pt-5 text-sm text-ink-muted">
                <span className="font-semibold text-ink">จุดที่มักผิด: </span>
                {f.pitfall}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- §4 Tools (reference list) ---------- */}
      <section className={`${SHELL} border-t border-rule py-16`}>
        <SectionHead
          no={4}
          title="เครื่องมือฝึก"
          desc="ใช้ควบคู่กับแผน 3 วัน — ข้อสอบจำลองมีโหมดฝึกที่ตรวจคำตอบทันทีและขอคำใบ้ได้ทุกข้อ"
        />

        <ul className="grid border-t border-rule sm:grid-cols-2 sm:gap-x-10">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.href} className="border-b border-rule">
                <Link
                  href={t.href}
                  className="group -mx-3 flex items-start gap-4 rounded-md px-3 py-4 transition-colors hover:bg-surface-hover"
                >
                  <Icon className="mt-1.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-ink group-hover:text-accent-ink">{t.title}</span>
                      <span className="shrink-0 font-mono text-xs text-ink-subtle">{t.meta}</span>
                    </span>
                    <span className="mt-0.5 block text-sm text-ink-muted">{t.desc}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className={`${SHELL} border-t border-rule py-8`}>
        <div className="flex flex-col gap-1 text-xs text-ink-subtle sm:flex-row sm:justify-between">
          <p>© 2026 DS Final Guide — วิชา 10301351 Data Science</p>
          <p>เรียบเรียงจากสไลด์บรรยาย Lect 05–09</p>
        </div>
      </footer>
    </HomePageTransition>
  );
}

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { HomePageTransition } from "@/components/home-page-transition";
import { StudyPlan, type PlanStep } from "@/components/study-plan";
import { MathFormula } from "@/components/math-formula";
import {
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

const chapters = [
  {
    n: "01",
    lect: "Lect 05",
    en: "Exploratory Data Analysis",
    th: "การวิเคราะห์ข้อมูลเบื้องต้นและตรวจจับ Outlier",
    slug: "eda",
  },
  {
    n: "02",
    lect: "Lect 06-07",
    en: "Modeling & Decision Tree",
    th: "โมเดลและการคำนวณ Gini Impurity / Information Gain",
    slug: "modeling",
  },
  {
    n: "03",
    lect: "Lect 08",
    en: "Confusion Matrix & Metrics",
    th: "ตารางสับสน Accuracy, Precision, Recall, F1",
    slug: "confusion-matrix",
  },
  {
    n: "04",
    lect: "Lect 08-09",
    en: "K-Means Clustering",
    th: "การจัดกลุ่ม K-Means ระยะ Manhattan และ Euclidean",
    slug: "kmeans",
  },
  {
    n: "05",
    lect: "Lect 09",
    en: "Responsible Data Science",
    th: "วิทยาการข้อมูลที่รับผิดชอบ จริยธรรม และความเป็นส่วนตัว",
    slug: "responsible-ds",
  },
];

/** The single main path on the homepage: the 3-day plan. */
const PLAN_STEPS: PlanStep[] = [
  {
    step: "01",
    day: "Day 1",
    title: "สร้างรากฐาน 5 บทเรียน",
    desc: "อ่านสรุปเข้ม 5 หัวข้อหลัก ทำความเข้าใจนิยามศัพท์เฉพาะ และจุดหลอกที่พบบ่อยในข้อสอบอาจารย์",
    href: "/chapters",
    time: "45 นาที",
    tag: "Concept Mastery",
  },
  {
    step: "02",
    day: "Day 2",
    title: "ซ้อมคำนวณสดและเล่นแบบจำลอง",
    desc: "ฝึกไล่ขั้นตอนการคิดทีละก้าวใน Thinking Player และลองใส่ตัวเลขทดสอบในเครื่องคิดเลขคำนวณสด",
    href: "/player",
    time: "35 นาที",
    tag: "Active Simulation",
  },
  {
    step: "03",
    day: "Day 3",
    title: "ตะลุยโจทย์เสมือนจริง 4 ชุด",
    desc: "ฝึกทำโจทย์แบบจับเวลา 45 นาที หรือเลือกโหมดฝึกทำทันใจเพื่อตรวจเช็กคำใบ้ (Hints) และคำอธิบายลึก",
    href: "/mock-test",
    time: "45 นาที",
    tag: "Exam Simulation",
  },
];

/** Secondary entry points — compact, one line each, no competition with the plan. */
const HUB_MODULES = [
  {
    href: "/mock-test",
    title: "Mock Exam",
    desc: "ข้อสอบเสมือนจริง 4 ชุด: ชุดเต็ม 30 ข้อ และเจาะลึก 10 ข้อรายหัวข้อ",
    time: "45 นาที",
    tag: "30 ข้อ",
    icon: CheckCircledIcon,
  },
  {
    href: "/tools",
    title: "เครื่องคิดเลข",
    desc: "คำนวณสด: Confusion Matrix, Gini Gain Splitter, Tukey IQR, K-Means",
    time: "Interactive",
    tag: "4 เครื่องมือ",
    icon: MixerHorizontalIcon,
  },
  {
    href: "/formulas",
    title: "คลังสูตร",
    desc: "15 สูตรคำนวณ พร้อมวิธีทำทีละก้าวและจุดดักที่คนมักผิด",
    time: "15 นาที",
    tag: "15 สูตร",
    icon: SymbolIcon,
  },
  {
    href: "/homework",
    title: "เฉลยการบ้าน",
    desc: "เฉลยวิธีคิดทุกขั้น: Customer Inactivity, Candidate Models, K-Means",
    time: "20 นาที",
    tag: "4 ข้อ",
    icon: Pencil2Icon,
  },
  {
    href: "/player",
    title: "Thinking Player",
    desc: "จำลองขั้นตอนการคิดทีละก้าว 6 ตอนแบบ Scrollytelling",
    time: "25 นาที",
    tag: "6 ตอน",
    icon: PlayIcon,
  },
];

const formulas = [
  {
    name: "IQR (Interquartile Range)",
    tex: "\\mathrm{IQR} = Q_3 - Q_1",
    note: "ผลต่างระหว่างควอร์ไทล์ที่สามกับอันดับหนึ่ง สำหรับหาการกระจายของข้อมูล",
    tag: "Lect 05",
  },
  {
    name: "Tukey's Fences (Outlier)",
    tex: "[\\,Q_1 - 1.5 \\cdot \\mathrm{IQR},\\; Q_3 + 1.5 \\cdot \\mathrm{IQR}\\,]",
    note: "ค่าที่อยู่นอกช่วงนี้ถือเป็น Outlier ทั้งฝั่งต่ำและฝั่งสูง",
    tag: "Lect 05",
  },
  {
    name: "Gini Impurity (2-Class)",
    tex: "\\mathrm{Gini}(S) = 1 - \\left[ (p_+)^2 + (p_-)^2 \\right]",
    note: "ค่าต่ำสุด = 0.0 (Pure), ค่าสูงสุด = 0.5 (สัดส่วน 50/50 ปนกันมากสุด)",
    tag: "Lect 07",
  },
  {
    name: "F1-Score (Harmonic Mean)",
    tex: "F_1 = 2 \\times \\dfrac{P \\times R}{P + R}",
    note: "ใช้ Harmonic Mean เพื่อลงโทษกรณีที่ Precision หรือ Recall ด้านใดด้านหนึ่งต่ำมาก",
    tag: "Lect 08",
  },
];

const TOTAL_QUESTIONS = allMockTests.reduce((n, t) => n + t.questions.length, 0);

const STATS = [
  { n: String(allChapters.length), label: "บทเรียน" },
  { n: String(allFormulas.length), label: "สูตรคำนวณ" },
  { n: String(TOTAL_QUESTIONS), label: "ข้อสอบจำลอง" },
  { n: "4", label: "เครื่องมือสด" },
  { n: String(episodes.length), label: "ตอนคิดทีละขั้น" },
];

export default function Home() {
  return (
    <HomePageTransition>
      {/* ---------- Hero ---------- */}
      <section className="shell pt-16 pb-12">
        <Reveal>
          <p className="eyebrow eyebrow-accent">10301351 &middot; Data Science &middot; Final Exam Prep</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-ink hero-headline">
            เตรียมสอบ Data Science
            <span className="hero-headline-sub text-accent">อย่างมั่นใจและเข้าใจจริง</span>
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed">
            คู่มือสอบไล่ Lect 05&ndash;09: บทเรียนสรุปเข้ม สูตรคำนวณที่ตรวจทานแล้ว และข้อสอบจำลองจริง
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#plan"
              className="tactile-btn tactile-btn-accent inline-flex items-center gap-2 px-6 py-2.5 text-[15px] font-medium"
            >
              ดูแผน 3 วัน &rarr;
            </Link>
            <Link
              href="/mock-test"
              className="tactile-btn tactile-btn-ghost inline-flex items-center gap-2 px-6 py-2.5 text-[15px] font-medium"
            >
              ทำ Mock Exam
            </Link>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-3 border-t border-rule pt-6">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bento-card p-4 flex flex-col justify-between group hover:border-rule-strong transition-all"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="index text-3xl font-mono font-bold text-ink">
                  {s.n}
                  <span className="block mt-1 text-[11px] uppercase tracking-[0.12em] text-ink-subtle font-mono font-medium">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ---------- 3-Day Plan (the main path) ---------- */}
      <section id="plan" className="shell py-16 border-t border-rule scroll-mt-24">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow eyebrow-mint">3-Day Plan</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1.5 tracking-tight">
                แผนทบทวน 3 วันสู่เป้าหมายเกรด A
              </h2>
              <p className="text-sm text-ink-muted mt-2 max-w-2xl">
                เส้นทางติวเร่งรัดที่จัดลำดับตามโครงสร้างสไลด์บรรยาย ทำเครื่องหมายสเต็ปที่เสร็จแล้วได้เลย — บันทึกไว้ในเบราว์เซอร์เครื่องนี้
              </p>
            </div>
          </div>
        </Reveal>

        <StudyPlan steps={PLAN_STEPS} />
      </section>

      {/* ---------- Fast Track (secondary entry points) ---------- */}
      <section className="shell py-16 border-t border-rule">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <div>
              <p className="eyebrow eyebrow-accent">Fast Track</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1.5 tracking-tight">
                ทางลัดสู่เครื่องมือทุกชิ้น
              </h2>
              <p className="text-sm text-ink-muted mt-2 max-w-2xl">
                ทางเข้ารอง ใช้คู่กับแผน 3 วัน — Mock Exam มี{" "}
                <strong className="text-ink font-semibold">โหมดฝึก (Practice)</strong>: ตรวจคำตอบทันทีและขอคำใบ้ (Hints) ได้ทุกข้อ
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {HUB_MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.href} delay={i * 40} className="h-full" scrollCrumble alt={i % 2 === 1}>
                <Link
                  href={m.href}
                  className="bento-card bento-card-interactive p-4 sm:p-5 flex flex-col gap-4 h-full group"
                >
                  <div className="flex items-center justify-between">
                    <span className="hub-icon">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="index text-lg text-ink-subtle group-hover:text-accent-ink transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink group-hover:text-accent-ink transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-rule pt-3 text-[11px]">
                    <span className="font-mono text-ink-subtle">
                      {m.time} &middot; {m.tag}
                    </span>
                    <span className="text-accent-ink font-semibold group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- Chapters ---------- */}
      <section className="shell py-16 border-t border-rule">
        <Reveal>
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="eyebrow">Course Roadmap</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1.5 tracking-tight">
                5 บทเรียนหลักสำหรับสอบ Final
              </h2>
              <p className="text-sm text-ink-muted mt-2">
                ครอบคลุมเนื้อหา Lecture 05 ถึง 09 พร้อมจุดระวังข้อสอบ
              </p>
            </div>
            <Link
              href="/chapters"
              className="tactile-btn text-xs font-semibold text-accent-ink hover:underline shrink-0"
            >
              อ่านเนื้อหาทั้งหมด &rarr;
            </Link>
          </div>
        </Reveal>

        <div className="border-t border-rule">
          {chapters.map((c, i) => (
            <Reveal key={c.n} delay={i * 40}>
              <Link
                href={`/chapters#${c.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 py-5 border-b border-rule hover:bg-surface-hover/60 transition-colors px-2 -mx-2"
              >
                <div className="flex items-baseline gap-5">
                  <span className="index text-2xl text-ink-subtle w-10 shrink-0 group-hover:text-accent-ink transition-colors">
                    {c.n}
                  </span>
                  <div>
                    <span className="text-base sm:text-lg font-bold text-ink group-hover:text-accent-ink transition-colors">
                      {c.en}
                    </span>
                    <span className="bento-pill border border-rule text-ink-subtle ml-2 align-middle">
                      {c.lect}
                    </span>
                    <p className="text-xs sm:text-sm text-ink-muted mt-0.5">{c.th}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-ink-subtle group-hover:text-accent-ink transition-colors shrink-0">
                  อ่านสรุป &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Formulas ---------- */}
      <section className="shell py-16 border-t border-rule">
        <Reveal>
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="eyebrow eyebrow-rose">Formula Vault</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1.5 tracking-tight">
                สูตรคำนวณที่ออกสอบบ่อย
              </h2>
              <p className="text-sm text-ink-muted mt-2">
                จำง่ายด้วยนิยามที่ชัดเจนและหลักการจำแบบ Active Recall
              </p>
            </div>
            <Link
              href="/formulas"
              className="tactile-btn text-xs font-semibold text-accent-ink hover:underline shrink-0"
            >
              ดูสูตรทั้งหมด ({allFormulas.length} สูตร) &rarr;
            </Link>
          </div>
        </Reveal>

        <div className="grid-12 gap-4">
          {formulas.map((f, i) => (
            <Reveal key={f.name} delay={i * 50} className="col-span-12 md:col-span-6">
              <div className="bento-card p-5 sm:p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4 gap-3">
                    <span className="text-sm font-bold text-ink">{f.name}</span>
                    <span className="bento-pill border border-rule text-ink-subtle shrink-0">
                      {f.tag}
                    </span>
                  </div>
                  <div className="border-l-2 border-accent pl-4">
                    <MathFormula tex={f.tex} />
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {f.note}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-rule text-right text-xs">
                  <Link href="/formulas" className="text-accent-ink hover:underline">
                    รายละเอียด &rarr;
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="shell py-8 border-t border-rule">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-subtle">
          <p>&copy; 2026 DS Final Guide &mdash; สำหรับเตรียมสอบวิชา 10301351 Data Science</p>
          <p>เรียบเรียงจากสไลด์บรรยาย Lect 05&ndash;09</p>
        </div>
      </footer>
    </HomePageTransition>
  );
}

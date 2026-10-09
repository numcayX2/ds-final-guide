import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { HomePageTransition } from "@/components/home-page-transition";
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

const TOPIC_TAGS = [
  { label: "📊 EDA & Outliers (Lect 05)", href: "/chapters#eda" },
  { label: "🌲 Decision Tree & Gini (Lect 06-07)", href: "/chapters#modeling" },
  { label: "🎯 Confusion Matrix & F1 (Lect 08)", href: "/chapters#confusion-matrix" },
  { label: "📍 K-Means Clustering (Lect 08-09)", href: "/chapters#kmeans" },
  { label: "⚖️ Responsible AI & SHAP (Lect 09)", href: "/chapters#responsible-ds" },
];

const STUDY_SPRINT = [
  {
    step: "01",
    day: "Day 1",
    title: "สร้างรากฐาน 5 บทเรียน",
    desc: "อ่านสรุปเข้ม 5 หัวข้อหลัก ทำความเข้าใจนิยามศัพท์เฉพาะ และจุดหลอกที่พบบ่อยในข้อสอบอาจารย์",
    href: "/chapters",
    time: "⏱️ 45 นาที",
    tag: "Concept Mastery",
  },
  {
    step: "02",
    day: "Day 2",
    title: "ซ้อมคำนวณสดและเล่นแบบจำลอง",
    desc: "ฝึกไล่ขั้นตอนการคิดทีละก้าวใน Thinking Player และลองใส่ตัวเลขทดสอบใน Formula Sandbox & เครื่องคิดเลข",
    href: "/player",
    time: "⏱️ 35 นาที",
    tag: "Active Simulation",
  },
  {
    step: "03",
    day: "Day 3",
    title: "ตะลุยโจทย์เสมือนจริง 4 ชุด",
    desc: "ฝึกทำโจทย์แบบจับเวลา 45 นาที หรือเลือกโหมดฝึกทำทันใจเพื่อตรวจเช็กคำใบ้ (Hints) และคำอธิบายลึก",
    href: "/mock-test",
    time: "⏱️ 45 นาที",
    tag: "Exam Simulation",
  },
];

const HUB_MODULES = [
  {
    href: "/mock-test",
    title: "Mock Exam (30 ข้อ)",
    subtitle: "จำลองสอบจับเวลาจริง 45 นาที หรือฝึกทันใจ",
    desc: "ข้อสอบเสมือนจริง 4 ชุด: ชุดเต็ม 30 ข้อ และเจาะลึก 10 ข้อรายหัวข้อ พร้อมโหมดฝึกทำทันใจ ตรวจถูก/ผิดทันที และขอคำใบ้ได้",
    tag: "30 ข้อ",
    time: "⏱️ 45 นาที",
    badge: "🔥 แนะนำ",
  },
  {
    href: "/tools",
    title: "เครื่องคิดเลขข้อสอบ",
    subtitle: "Interactive Exam Calculators",
    desc: "4 เครื่องมือคำนวณสด: Confusion Matrix 2x2 พร้อมมาตรวัดทันที, Gini Gain Splitter, Tukey IQR Outlier, K-Means Step",
    tag: "4 เครื่องมือ",
    time: "⏱️ สด Interactive",
    badge: "💡 ทดลองสด",
  },
  {
    href: "/formulas",
    title: "คลัง 15 สูตรคำนวณ",
    subtitle: "Formula Vault & Search",
    desc: "ค้นหาสูตรเร็ว พร้อมตัวแปรสัญลักษณ์สีแยกชัดเจน วิธีทำทีละก้าว และจุดดักที่คนมักผิดในห้องสอบ",
    tag: "15 สูตร",
    time: "⏱️ 15 นาที",
    badge: "📖 Active Recall",
  },
  {
    href: "/homework",
    title: "เฉลยการบ้าน 4 ข้อ",
    subtitle: "Step-by-Step Proofs",
    desc: "เฉลยละเอียดแสดงวิธีคิดทุกขั้น: Customer Inactivity (all 60%), Candidate Models A/B/C, K-Means Q1 & Q2",
    tag: "4 ข้อ",
    time: "⏱️ 20 นาที",
    badge: "📝 แสดงวิธีทำ",
  },
  {
    href: "/player",
    title: "Thinking Player",
    subtitle: "จำลองขั้นตอนการคิดทีละก้าว",
    desc: "6 ตอน Interactive: Boxplot Outlier, Gini Split, Confusion Matrix, K-Means Step, SHAP Force, Concept Drift",
    tag: "6 ตอน",
    time: "⏱️ 25 นาที",
    badge: "🎬 Scrollytelling",
  },
];

const formulas = [
  {
    name: "IQR (Interquartile Range)",
    expr: "IQR = Q3 − Q1",
    note: "ผลต่างระหว่างควอร์ไทล์ที่สามกับอันดับหนึ่ง สำหรับหาการกระจายของข้อมูล",
    tag: "Lect 05",
  },
  {
    name: "Tukey's Fences (Outlier)",
    expr: "[Q1 − 1.5×IQR,  Q3 + 1.5×IQR]",
    note: "ค่าที่อยู่นอกช่วงนี้ถือเป็น Outlier ทั้งฝั่งต่ำและฝั่งสูง",
    tag: "Lect 05",
  },
  {
    name: "Gini Impurity (2-Class)",
    expr: "Gini(S) = 1 − [(p+)² + (p−)²]",
    note: "ค่าต่ำสุด = 0.0 (Pure), ค่าสูงสุด = 0.5 (สัดส่วน 50/50 ปนกันมากสุด)",
    tag: "Lect 07",
  },
  {
    name: "F1-Score (Harmonic Mean)",
    expr: "F1 = 2 × (P × R) / (P + R)",
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
      <section className="shell pt-14 pb-12">
        <Reveal>
          <p className="eyebrow">10301351 &middot; Data Science &middot; Final Exam Prep</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.08]">
            เตรียมสอบ Data Science
            <span className="block text-accent-ink">อย่างมั่นใจและเข้าใจจริง</span>
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed">
            คู่มือและศูนย์การเรียนรู้เชิงโต้ตอบสำหรับสอบไล่ รวบรวมสรุป {allChapters.length} บทเรียน
            พร้อมคลังสูตรที่ตรวจทานตรงสไลด์ {allFormulas.length} สูตร เครื่องคิดเลขจำลอง 4 ตัว
            และชุดข้อสอบเสมือนจริง {TOTAL_QUESTIONS} ข้อ
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/mock-test"
              className="tactile-btn tactile-btn-accent inline-flex items-center gap-2 bg-ink text-bg border border-ink px-5 py-3 text-sm font-semibold hover:bg-accent-ink hover:text-bg hover:border-accent-ink"
            >
              เริ่มทำ Mock Exam &rarr;
            </Link>
            <Link
              href="/tools"
              className="tactile-btn inline-flex items-center gap-2 bg-surface text-ink border border-rule-strong px-5 py-3 text-sm font-semibold hover:border-ink"
            >
              เปิดเครื่องคิดเลข &rarr;
            </Link>
          </div>
        </Reveal>

        {/* ParentSquare-style Semantic Floating Topic Cloud */}
        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-semibold text-ink-subtle mr-1">หัวข้อบรรยายหลัก:</span>
            {TOPIC_TAGS.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className="tactile-btn px-3 py-1.5 border border-rule bg-surface text-xs font-semibold text-ink-muted hover:text-ink hover:border-rule-strong"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-4 border-t border-rule pt-5">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="index text-3xl text-ink">
                  {s.n}
                  <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ---------- Study hub ---------- */}
      <section className="shell py-12 border-t border-rule">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow eyebrow-accent">Fast Track</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1.5">
                ทางลัดทบทวนและฝึกทำโจทย์
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid-12 gap-4">
          {HUB_MODULES.map((m, i) => (
            <Reveal
              key={m.href}
              delay={i * 50}
              className={i < 2 ? "col-span-12 lg:col-span-6" : "col-span-12 md:col-span-4"}
            >
              <Link
                href={m.href}
                className="bento-card bento-card-interactive border-rule-strong p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="index text-3xl text-ink-subtle group-hover:text-accent-ink transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {m.badge && (
                        <span className="bento-pill border border-accent/40 bg-accent-wash/30 text-accent-ink font-semibold">
                          {m.badge}
                        </span>
                      )}
                      <span className="bento-pill border border-rule text-ink-subtle">
                        {m.time}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-ink mt-4 group-hover:text-accent-ink transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-accent-ink font-semibold mt-1">{m.subtitle}</p>
                  <p className="text-sm text-ink-muted mt-3 leading-relaxed">{m.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-rule flex items-center justify-between text-xs font-semibold text-accent-ink">
                  <span>เข้าสู่บทเรียนนี้</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- 3-Day Sprint Track (Coursera & Khan Academy style) ---------- */}
      <section className="shell py-12 border-t border-rule">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow eyebrow-mint">Study Wayfinding</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1.5">
                แผนทบทวน 3 วันสู่เป้าหมายเกรด A
              </h2>
              <p className="text-sm text-ink-muted mt-2">
                เส้นทางติวเร่งรัดแบบ Step-by-Step จัดลำดับความสำคัญตามโครงสร้างสไลด์บรรยาย
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid-12 gap-4">
          {STUDY_SPRINT.map((s, idx) => (
            <Reveal key={s.step} delay={idx * 60} className="col-span-12 md:col-span-4">
              <Link
                href={s.href}
                className="bento-card bento-card-interactive p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="bento-pill border border-mint text-mint bg-mint-wash/30 font-bold font-mono">
                      {s.day}
                    </span>
                    <span className="text-xs text-ink-subtle font-mono">
                      {s.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-ink group-hover:text-accent-ink transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-ink-subtle font-mono mt-1 font-semibold">
                    {s.tag}
                  </p>
                  <p className="text-sm text-ink-muted mt-3 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-rule flex items-center justify-between text-xs font-semibold text-accent-ink">
                  <span>เริ่มสเต็ปนี้</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Chapters ---------- */}
      <section className="shell py-12 border-t border-rule">
        <Reveal>
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="eyebrow">Course Roadmap</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1.5">
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
      <section className="shell py-12 border-t border-rule">
        <Reveal>
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="eyebrow">Formula Vault</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1.5">
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
              ดูสูตรทั้งหมด ({formulas.length} สูตร) &rarr;
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
                  <p className="font-mono text-lg sm:text-xl font-semibold text-ink border-l-2 border-accent pl-4">
                    {f.expr}
                  </p>
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

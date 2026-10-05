import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Reveal } from "@/components/reveal";

const chapters = [
  {
    n: "01",
    lect: "Lect 05",
    en: "Exploratory Data Analysis",
    th: "การวิเคราะห์ข้อมูลเบื้องต้น",
    slug: "eda",
  },
  {
    n: "02",
    lect: "Lect 06-07",
    en: "Modeling & Decision Tree",
    th: "โมเดลและต้นไม้การตัดสินใจ",
    slug: "modeling",
  },
  {
    n: "03",
    lect: "Lect 07",
    en: "Confusion Matrix & Metrics",
    th: "ตารางสับสนและมาตรวัด",
    slug: "confusion-matrix",
  },
  {
    n: "04",
    lect: "Lect 08",
    en: "K-Means Clustering",
    th: "การจัดกลุ่มแบบ K-Means",
    slug: "kmeans",
  },
  {
    n: "05",
    lect: "Lect 09",
    en: "Responsible Data Science",
    th: "วิทยาข้อมูลที่รับผิดชอบ",
    slug: "responsible-ds",
  },
];

const HUB_MODULES = [
  {
    href: "/mock-test",
    title: "Mock Exam (30 ข้อ)",
    subtitle: "ชุดข้อสอบเสมือนจริง 45 นาที",
    desc: "ครอบคลุมครบ 5 บทเรียน มีทั้งชุดเต็ม 30 ข้อ และแยกเจาะลึก 10 ข้อรายหัวข้อ พร้อมเฉลยละเอียดและสไลด์อ้างอิง",
    badge: "ครบ 30 ข้อ",
  },
  {
    href: "/player",
    title: "Thinking Player",
    subtitle: "จำลองขั้นตอนการคิดทีละก้าว",
    desc: "6 ตอน Interactive: Boxplot Outlier, Gini Split, Confusion Matrix, K-Means Step, SHAP Force, Concept Drift",
    badge: "6 Episodes",
  },
  {
    href: "/homework",
    title: "เฉลยการบ้าน 4 ข้อ",
    subtitle: "โจทย์จริงพร้อมวิธีคิดทุกสเต็ป",
    desc: "Customer Inactivity (all 60%), Candidate Models A/B/C (Slide 35), K-Means Q1 (K=2) และ Q2 (K=3 Euclidean)",
    badge: "4 ข้อครบ",
  },
  {
    href: "/formulas",
    title: "คลัง 15 สูตรคำนวณ",
    subtitle: "Formula Vault & Search",
    desc: "ค้นหาสูตรเร็ว พร้อมตัวอย่างวิธีทำ ตัวแปรสัญลักษณ์ และจุดหลอกที่คนมักผิดในข้อสอบ",
    badge: "15 สูตรยืนยัน",
  },
  {
    href: "/tools",
    title: "เครื่องคิดเลขข้อสอบ",
    subtitle: "Interactive Exam Calculators",
    desc: "เครื่องมือคำนวณ 4 ตัวช่วย: Tukey IQR, Gini Gain, Confusion Matrix 4 ตัวชี้วัด, K-Means Iteration & Centroid",
    badge: "4 เครื่องมือ",
  },
];

const formulas = [
  { name: "IQR", expr: "Q3 - Q1", note: "ผลต่างระหว่างควอร์ไทล์ที่สามกับอันดับหนึ่ง" },
  { name: "Upper Fence", expr: "Q3 + 1.5 x IQR", note: "รั้วบนกว่าค่าจริงใดเสมอ" },
  { name: "Gini Gain", expr: "Gini(parent) - Gini(split)", note: "เลือก split ที่ได้ค่าสูงสุด" },
  { name: "F1-Score", expr: "2 x (P x R) / (P + R)", note: "ใช้เมื่อ Precision กับ Recall ขัดกัน" },
];

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex-1">
      {/* ---------- Hero: giant display, asymmetric ---------- */}
      <section className="shell pt-sp-3 pb-sp-2">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <p className="meta-label text-ink-subtle mb-8">
                Course 10301351 &middot; Data Science
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 lang="en" className="display">
                Final Exam
                <br />
                Guide
              </h1>
            </Reveal>
          </div>

          {/* Metadata block */}
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 mt-sp-1 lg:mt-0">
            <Reveal delay={160}>
              <dl className="space-y-8">
                <div>
                  <dt className="meta-label tracking-display text-ink-subtle">Currently</dt>
                  <dd className="meta-value mt-2">
                    คู่มือเตรียมสอบ Final
                    <br />
                    5 บทเรียน &middot; ครบถ้วน
                  </dd>
                </div>
                <div>
                  <dt className="meta-label tracking-display text-ink-subtle">Based on</dt>
                  <dd className="meta-value mt-2">
                    Lecture 05 - 09
                    <br />
                    10301351 Data Science
                  </dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-12 border-t border-rule pt-6">
                <ThemeToggle />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Fast Track / Study Hub ---------- */}
      <section className="shell py-sp-2 border-t border-rule">
        <Reveal>
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="index text-sm text-ink-subtle">Fast Track &middot; ทางลัดเตรียมสอบ</h2>
            <span className="meta-label text-xs text-accent-ink">ทุกส่วนยืนยันตัวเลขกับสไลด์จริง</span>
          </div>
        </Reveal>
        <div className="grid-12 gap-6">
          {HUB_MODULES.map((m, i) => (
            <Reveal
              key={m.href}
              delay={i * 60}
              className={i < 2 ? "col-span-12 lg:col-span-6" : "col-span-12 md:col-span-4"}
            >
              <Link
                href={m.href}
                className="tap group block h-full border-t-2 border-rule-strong hover:border-accent p-6 bg-bg hover:bg-accent-wash/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="meta-label text-xs tracking-display text-accent-ink">
                    {m.badge}
                  </span>
                  <span className="text-sm text-ink-subtle group-hover:text-accent-ink transition-colors">
                    &rarr;
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-medium mt-3 group-hover:text-accent-ink transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs font-mono text-ink-muted mt-1">{m.subtitle}</p>
                <p className="text-sm text-ink-muted mt-3 leading-relaxed">{m.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Chapters ---------- */}
      <section className="shell py-sp-2 border-t border-rule">
        <Reveal>
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="index text-sm text-ink-subtle">Chapters &middot; เนื้อหา 5 บทเรียน</h2>
            <Link
              href="/chapters"
              className="meta-label text-xs text-ink-subtle hover:text-accent-ink transition-colors"
            >
              เปิดหน้าบทเรียนทั้งหมด &rarr;
            </Link>
          </div>
        </Reveal>
        <ul className="space-y-0">
          {chapters.map((c, i) => (
            <Reveal as="li" key={c.n} delay={i * 60}>
              <Link
                href={`/chapters#${c.slug}`}
                className="tap group grid-12 items-baseline py-8 border-t border-rule hover:bg-accent-wash transition-colors duration-200"
              >
                <span className="col-span-2 lg:col-span-1 index text-2xl text-accent-ink">
                  {c.n}
                </span>
                <span className="col-span-10 lg:col-span-4">
                  <span className="line-mask tracking-display text-xl lg:text-2xl font-medium group-hover:text-accent-ink transition-colors">
                    {c.en}
                  </span>
                </span>
                <span className="col-span-12 lg:col-span-3 mt-2 lg:mt-0 text-ink-muted">
                  {c.th}
                </span>
                <span className="col-span-12 lg:col-span-2 lg:col-start-11 mt-2 lg:mt-0 meta-label tracking-display text-ink-subtle flex items-center justify-between">
                  <span>{c.lect}</span>
                  <span className="text-xs group-hover:text-accent-ink transition-colors opacity-0 group-hover:opacity-100">
                    อ่าน &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------- Formula typography ---------- */}
      <section className="shell py-sp-2 border-t border-rule">
        <Reveal>
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="index text-sm text-ink-subtle">
              Formula &mdash; tabular numerals
            </h2>
            <Link
              href="/formulas"
              className="meta-label text-xs text-accent-ink hover:underline"
            >
              ดูสูตรทั้งหมด 15 สูตรพร้อมวิธีทำ &rarr;
            </Link>
          </div>
        </Reveal>
        <div className="grid-12 gap-6">
          {formulas.map((f, i) => (
            <Reveal key={f.name} delay={i * 60} className="col-span-12 md:col-span-6">
              <div className="h-full border-t border-rule pt-5">
                <p className="meta-label tracking-display text-ink-subtle">{f.name}</p>
                <p className="tnum mt-4 text-2xl lg:text-3xl font-medium">{f.expr}</p>
                <p className="mt-4 text-ink-muted">{f.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Accent discipline ---------- */}
      <section className="shell py-sp-3 border-t border-rule">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-5">
            <h2 className="index text-sm text-ink-subtle mb-6">Accent discipline</h2>
            <p className="text-lg">
              สีส้ม{" "}
              <span className="text-accent-ink font-medium">ใช้เฉพาะจุดที่ต้องจำ</span>{" "}
              — คำสำคัญ ผลลัพธ์ของสูตร และจุดระวังข้อสอบ ไม่ใช้กับเนื้อความทั่วไป
            </p>
          </Reveal>
          <Reveal delay={120} className="col-span-12 lg:col-span-4 lg:col-start-9 mt-sp-1 lg:mt-0">
            <dl className="space-y-6">
              {[
                ["--accent", "#FF4D00", "markers, rules, focus ring"],
                ["--accent-ink (light)", "#D93F00", "4.51:1 on white"],
                ["--accent-ink (dark)", "#FF6A2B", "5.96:1 on black"],
              ].map(([name, hex, use]) => (
                <div key={name} className="flex items-baseline gap-4 border-b border-rule pb-4">
                  <dt className="font-mono text-sm tnum">{name}</dt>
                  <dd className="tnum text-sm text-accent-ink w-20">{hex}</dd>
                  <dd className="text-sm text-ink-muted">{use}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <footer className="shell py-sp-1 border-t border-rule">
        <p className="meta-label tracking-display text-ink-subtle">
          Less, but better. &mdash; Dieter Rams &middot; 10301351 Data Science Final Exam Guide
        </p>
      </footer>
    </main>
  );
}

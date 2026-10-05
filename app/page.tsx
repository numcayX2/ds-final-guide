import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Reveal } from "@/components/reveal";

const chapters = [
  {
    n: "01",
    lect: "Lect 05",
    tag: "SYS.01 // EDA",
    en: "Exploratory Data Analysis",
    th: "การวิเคราะห์ข้อมูลเบื้องต้น",
    slug: "eda",
  },
  {
    n: "02",
    lect: "Lect 06-07",
    tag: "SYS.02 // MODEL_TREE",
    en: "Modeling & Decision Tree",
    th: "โมเดลและต้นไม้การตัดสินใจ",
    slug: "modeling",
  },
  {
    n: "03",
    lect: "Lect 07",
    tag: "SYS.03 // CONFUSION_MATRIX",
    en: "Confusion Matrix & Metrics",
    th: "ตารางสับสนและมาตรวัด",
    slug: "confusion-matrix",
  },
  {
    n: "04",
    lect: "Lect 08",
    tag: "SYS.04 // K_MEANS",
    en: "K-Means Clustering",
    th: "การจัดกลุ่มแบบ K-Means",
    slug: "kmeans",
  },
  {
    n: "05",
    lect: "Lect 09",
    tag: "SYS.05 // RESPONSIBLE_AI",
    en: "Responsible Data Science",
    th: "วิทยาข้อมูลที่รับผิดชอบ",
    slug: "responsible-ds",
  },
];

const HUB_MODULES = [
  {
    modId: "SYS.MOD // 01",
    href: "/mock-test",
    title: "Mock Exam (30 ข้อ)",
    subtitle: "ชุดข้อสอบเสมือนจริง 45 นาที",
    desc: "ครอบคลุมครบ 5 บทเรียน มีทั้งชุดเต็ม 30 ข้อ และแยกเจาะลึก 10 ข้อรายหัวข้อ พร้อมเฉลยละเอียดและสไลด์อ้างอิง",
    badge: "ครบ 30 ข้อ",
  },
  {
    modId: "SYS.MOD // 02",
    href: "/player",
    title: "Thinking Player",
    subtitle: "จำลองขั้นตอนการคิดทีละก้าว",
    desc: "6 ตอน Interactive: Boxplot Outlier, Gini Split, Confusion Matrix, K-Means Step, SHAP Force, Concept Drift",
    badge: "6 Episodes",
  },
  {
    modId: "SYS.MOD // 03",
    href: "/homework",
    title: "เฉลยการบ้าน 4 ข้อ",
    subtitle: "โจทย์จริงพร้อมวิธีคิดทุกสเต็ป",
    desc: "Customer Inactivity (all 60%), Candidate Models A/B/C (Slide 35), K-Means Q1 (K=2) และ Q2 (K=3 Euclidean)",
    badge: "4 ข้อครบ",
  },
  {
    modId: "SYS.MOD // 04",
    href: "/formulas",
    title: "คลัง 15 สูตรคำนวณ",
    subtitle: "Formula Vault & Search",
    desc: "ค้นหาสูตรเร็ว พร้อมตัวอย่างวิธีทำ ตัวแปรสัญลักษณ์ และจุดหลอกที่คนมักผิดในข้อสอบ",
    badge: "15 สูตรยืนยัน",
  },
  {
    modId: "SYS.MOD // 05",
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
      {/* ---------- Hero: giant display with cyber grid background ---------- */}
      <section className="shell pt-sp-3 pb-sp-2 cyber-grid relative">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border border-rule-strong/50 bg-accent-wash/50 text-accent-ink mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent cyber-beacon" />
                <span>TERMINAL // 10301351.DATA_SCIENCE</span>
                <span className="text-ink-subtle">|</span>
                <span className="text-ink-muted">REVISION_CORE // LECT_05-09</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 lang="en" className="display tracking-tight">
                Final Exam
                <br />
                <span className="text-accent-ink cyber-text-glow">Guide</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 text-lg text-ink-muted max-w-xl leading-relaxed">
                คู่มือเตรียมสอบวิชา 10301351 Data Science ฉบับสมบูรณ์
                ตรวจสอบตัวเลขและทฤษฎีตรงตามภาพสไลด์จริง 100%
              </p>
            </Reveal>
          </div>

          {/* Futuristic Telemetry HUD block */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-sp-1 lg:mt-0">
            <Reveal delay={160}>
              <div className="hud-bracket border border-rule p-6 bg-bg/80 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-rule pb-3 mb-5">
                  <span className="text-[11px] font-mono tracking-widest text-ink-subtle uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    SYS.TELEMETRY
                  </span>
                  <span className="text-[11px] font-mono text-accent-ink font-semibold">
                    STATUS: READY
                  </span>
                </div>

                <dl className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-baseline border-b border-rule/50 pb-2">
                    <dt className="text-ink-subtle">CORE_MODULES</dt>
                    <dd className="font-semibold text-ink">5 CHAPTERS (L05-L09)</dd>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-rule/50 pb-2">
                    <dt className="text-ink-subtle">MOCK_QUESTIONS</dt>
                    <dd className="font-semibold text-accent-ink">30 ITEMS / 45 MIN</dd>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-rule/50 pb-2">
                    <dt className="text-ink-subtle">HOMEWORK_PROOFS</dt>
                    <dd className="font-semibold text-ink">4 PROBLEMS VERIFIED</dd>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-rule/50 pb-2">
                    <dt className="text-ink-subtle">THINKING_PLAYER</dt>
                    <dd className="font-semibold text-ink">6 INTERACTIVE EPS</dd>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <dt className="text-ink-subtle">DATA_VERIFICATION</dt>
                    <dd className="font-semibold text-accent-ink">100% SLIDE CHECKED</dd>
                  </div>
                </dl>

                <div className="mt-6 pt-4 border-t border-rule flex items-center justify-between">
                  <span className="text-[11px] font-mono text-ink-subtle">DISPLAY_THEME:</span>
                  <ThemeToggle />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Fast Track / Study Hub ---------- */}
      <section className="shell py-sp-2 border-t border-rule">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 text-[10px] font-mono bg-accent-wash text-accent-ink border border-rule-strong/40">
                HUB.INDEX
              </span>
              <h2 className="index text-sm text-ink-subtle uppercase tracking-wider font-mono">
                Fast Track // ทางลัดเตรียมสอบ
              </h2>
            </div>
            <span className="text-xs font-mono text-accent-ink">
              [ ALL DATA GROUNDED IN REAL LECTURES ]
            </span>
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
                className="tap group block h-full border border-rule-strong/80 hover:border-accent p-6 bg-bg hover:bg-accent-wash/30 transition-all duration-300 hud-bracket hud-scanline cyber-glow-hover"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[11px] font-mono tracking-widest text-ink-subtle uppercase group-hover:text-accent-ink transition-colors">
                    {m.modId}
                  </span>
                  <span className="px-2 py-0.5 text-[11px] font-mono text-accent-ink border border-accent/40 bg-accent-wash/60">
                    {m.badge}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-medium mt-4 group-hover:text-accent-ink transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs font-mono text-ink-subtle mt-1.5">{m.subtitle}</p>
                <p className="text-sm text-ink-muted mt-3.5 leading-relaxed">{m.desc}</p>

                <div className="mt-6 pt-3 border-t border-rule/60 flex items-center justify-between text-xs font-mono text-ink-subtle group-hover:text-accent-ink transition-colors">
                  <span>ENTER_MODULE</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Chapters ---------- */}
      <section className="shell py-sp-2 border-t border-rule">
        <Reveal>
          <div className="flex items-baseline justify-between mb-12">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 text-[10px] font-mono bg-accent-wash text-accent-ink border border-rule-strong/40">
                CH.CORPUS
              </span>
              <h2 className="index text-sm text-ink-subtle uppercase tracking-wider font-mono">
                Chapters // 5 บทเรียนสรุปเข้ม
              </h2>
            </div>
            <Link
              href="/chapters"
              className="text-xs font-mono text-ink-subtle hover:text-accent-ink transition-colors"
            >
              VIEW_ALL_CHAPTERS &rarr;
            </Link>
          </div>
        </Reveal>

        <ul className="space-y-0">
          {chapters.map((c, i) => (
            <Reveal as="li" key={c.n} delay={i * 60}>
              <Link
                href={`/chapters#${c.slug}`}
                className="tap group grid-12 items-baseline py-7 border-t border-rule hover:bg-accent-wash/30 transition-all duration-200 hud-scanline"
              >
                <span className="col-span-2 lg:col-span-1 index text-2xl font-mono text-accent-ink">
                  {c.n}
                </span>
                <span className="col-span-10 lg:col-span-4">
                  <span className="line-mask tracking-display text-xl lg:text-2xl font-medium group-hover:text-accent-ink transition-colors">
                    {c.en}
                  </span>
                </span>
                <span className="col-span-12 lg:col-span-4 mt-2 lg:mt-0 text-ink-muted text-sm">
                  {c.th}
                </span>
                <span className="col-span-12 lg:col-span-3 mt-2 lg:mt-0 font-mono text-xs text-ink-subtle flex items-center justify-between">
                  <span className="px-2 py-0.5 border border-rule bg-bg">{c.lect}</span>
                  <span className="text-accent-ink group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100">
                    ACCESS &rarr;
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
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 text-[10px] font-mono bg-accent-wash text-accent-ink border border-rule-strong/40">
                MATH.LIB
              </span>
              <h2 className="index text-sm text-ink-subtle uppercase tracking-wider font-mono">
                Key Formulas // สูตรคำนวณหลัก
              </h2>
            </div>
            <Link
              href="/formulas"
              className="text-xs font-mono text-accent-ink hover:underline"
            >
              EXPLORE_ALL_15_FORMULAS &rarr;
            </Link>
          </div>
        </Reveal>

        <div className="grid-12 gap-6">
          {formulas.map((f, i) => (
            <Reveal key={f.name} delay={i * 60} className="col-span-12 md:col-span-6">
              <div className="h-full border border-rule p-5 bg-bg hud-bracket hover:border-accent transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-accent-ink font-semibold">{f.name}</span>
                  <span className="text-[10px] font-mono text-ink-subtle">VERIFIED</span>
                </div>
                <div className="p-3 bg-accent-wash/50 border-l-2 border-accent">
                  <p className="tnum font-mono text-xl lg:text-2xl font-bold text-ink">{f.expr}</p>
                </div>
                <p className="mt-3 text-xs text-ink-muted leading-relaxed">{f.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Accent discipline ---------- */}
      <section className="shell py-sp-3 border-t border-rule">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <h2 className="index text-sm text-ink-subtle uppercase tracking-wider font-mono">
                COLOR_SPEC // ACCENT DISCIPLINE
              </h2>
            </div>
            <p className="text-lg leading-relaxed">
              สีส้ม{" "}
              <span className="text-accent-ink font-semibold cyber-text-glow">ใช้เฉพาะจุดที่ต้องจำ</span>{" "}
              — คำสำคัญ ผลลัพธ์ของสูตร และจุดระวังข้อสอบ ตามหลักสุนทรียศาสตร์และการเข้าถึง (WCAG AA)
            </p>
          </Reveal>

          <Reveal delay={120} className="col-span-12 lg:col-span-5 lg:col-start-8 mt-sp-1 lg:mt-0">
            <dl className="space-y-4 border border-rule p-5 font-mono text-xs bg-bg hud-bracket">
              {[
                ["--accent", "#FF4D00", "Cyber Orange // Markers, focus ring"],
                ["--accent-ink (light)", "#D93F00", "High contrast // 4.51:1 on white"],
                ["--accent-ink (dark)", "#FF6A2B", "Neon luminescence // 6.93:1 on dark"],
              ].map(([name, hex, use]) => (
                <div key={name} className="flex items-baseline justify-between gap-4 border-b border-rule/60 pb-3">
                  <dt className="tnum font-semibold">{name}</dt>
                  <dd className="tnum text-accent-ink font-bold">{hex}</dd>
                  <dd className="text-ink-subtle text-[11px] hidden sm:inline">{use}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <footer className="shell py-sp-1 border-t border-rule">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-subtle">
          <p>LESS, BUT BETTER &mdash; DIETER RAMS</p>
          <p>DS_FINAL_GUIDE // CORE_RUNTIME v1.0 &middot; 10301351</p>
        </div>
      </footer>
    </main>
  );
}

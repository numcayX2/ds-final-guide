import { ThemeToggle } from "@/components/theme-toggle";
import { Reveal } from "@/components/reveal";

/* P0 checkpoint: a page that exercises every token in the THEME CONTRACT. */

const chapters = [
  { n: "01", lect: "Lect 05", en: "Exploratory Data Analysis", th: "การวิเคราะห์ข้อมูลเบื้องต้น" },
  { n: "02", lect: "Lect 06-07", en: "Modeling & Decision Tree", th: "โมเดลและต้นไม้การตัดสินใจ" },
  { n: "03", lect: "Lect 07", en: "Confusion Matrix & Metrics", th: "ตารางสับสนและมาตรวัด" },
  { n: "04", lect: "Lect 08", en: "K-Means Clustering", th: "การจัดกลุ่มแบบ K-Means" },
  { n: "05", lect: "Lect 09", en: "Responsible Data Science", th: "วิทยาข้อมูลที่รับผิดชอบ" },
];

const formulas = [
  { name: "IQR", expr: "Q3 - Q1", note: "ผลต่างระหว่างควอร์ไทล์ที่สามกับอันดับหนึ่ง" },
  { name: "Upper Fence", expr: "Q3 + 1.5 x IQR", note: "รั้วบนกว่าค่าจริงใดเสมอ" },
  { name: "Gini Gain", expr: "Gini(parent) - Gini(split)", note: "เลือก split ที่ได้ค่าสูงสุด" },
  { name: "F1-Score", expr: "2 x (P x R) / (P + R)", note: "ใช้เมื่อ Precision กับ Recall ขัดกัน" },
];

export default function Home() {
  return (
    <main className="flex-1">
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
              <h1 className="display tracking-reset">
                Final Exam
                <br />
                Guide
              </h1>
            </Reveal>
          </div>

          {/* Bhagas metadata block, mirrored to the right rail */}
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 mt-sp-1 lg:mt-0">
            <Reveal delay={160}>
              <dl className="space-y-8">
                <div>
                  <dt className="meta-label tracking-display text-ink-subtle">Currently</dt>
                  <dd className="meta-value mt-2">
                    คู่มือเตรียมสอบ Final
                    <br />
                    5 บทเรียน
                  </dd>
                </div>
                <div>
                  <dt className="meta-label tracking-display text-ink-subtle">Based on</dt>
                  <dd className="meta-value mt-2">
                    Lecture 05 - 09
                    <br />
                    10301351
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

      {/* ---------- Spacing rhythm proof ---------- */}
      <section className="shell py-sp-2 border-t border-rule">
        <Reveal>
          <h2 className="index text-sm text-ink-subtle mb-10">Negative space scale</h2>
        </Reveal>
        <div className="grid-12 gap-6">
          {[80, 120, 160].map((px, i) => (
            <Reveal key={px} delay={i * 90} className="col-span-12 md:col-span-4">
              <div className="border-t-2 border-accent pt-4">
                <p className="index text-5xl">{px}</p>
                <p className="meta-value text-ink-muted mt-2">px vertical rhythm</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Chapters ---------- */}
      <section className="shell py-sp-2 border-t border-rule">
        <Reveal>
          <h2 className="index text-sm text-ink-subtle mb-12">Chapters</h2>
        </Reveal>
        <ul className="space-y-0">
          {chapters.map((c, i) => (
            <Reveal as="li" key={c.n} delay={i * 60}>
              <a
                href="#"
                className="tap group grid-12 items-baseline py-8 border-t border-rule hover:bg-accent-wash transition-colors duration-200"
              >
                <span className="col-span-2 lg:col-span-1 index text-2xl text-accent-ink">
                  {c.n}
                </span>
                <span className="col-span-10 lg:col-span-4">
                  <span className="line-mask tracking-display text-xl lg:text-2xl font-medium">
                    {c.en}
                  </span>
                </span>
                <span className="col-span-12 lg:col-span-3 mt-2 lg:mt-0 text-ink-muted">
                  {c.th}
                </span>
                <span className="col-span-12 lg:col-span-2 lg:col-start-11 mt-2 lg:mt-0 meta-label tracking-display text-ink-subtle">
                  {c.lect}
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------- Formula typography ---------- */}
      <section className="shell py-sp-2 border-t border-rule">
        <Reveal>
          <h2 className="index text-sm text-ink-subtle mb-12">
            Formula &mdash; tabular numerals
          </h2>
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
          Less, but better. &mdash; Dieter Rams
        </p>
      </footer>
    </main>
  );
}

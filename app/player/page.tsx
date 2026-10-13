import type { Metadata } from "next";
import { episodes } from "@/content/episodes";
import { EpisodePlayer } from "@/components/episode-player";
import { FormulaMorphShowcase } from "@/components/formula-morph-showcase";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Thinking Player | DS Final Guide",
  description: "จำลองกระบวนการแก้โจทย์จริงด้วย Formula Morph Transition และ Scrollytelling ละเอียดทีละขั้น",
};

export default function PlayerPage() {
  const totalSteps = episodes.reduce((n, e) => n + e.steps.length, 0);
  const lectureCount = new Set(episodes.flatMap((e) => e.lectures)).size;

  return (
    <main id="main" tabIndex={-1} className="flex-1 pb-16">
      {/* Hero */}
      <section className="shell pt-14 pb-10 border-b border-rule">
        <Reveal>
          <p className="eyebrow">Thinking Player &middot; แล็บคิดละเอียด</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight text-ink leading-[1.08]">
            คิดทีละขั้น
            <span className="block text-accent-ink">จำลองกระบวนการแก้โจทย์จริง</span>
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-ink-muted leading-relaxed">
            ทำความเข้าใจโจทย์ยากด้วยการคลี่ขั้นตอนออกทีละสเต็ป
            ตั้งแต่การคำนวณ Confusion Matrix, K-Means Clustering, ไปจนถึง SHAP Force Plot และ Concept Drift
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 flex items-center gap-2.5 text-sm text-ink-muted">
            <span className="font-mono text-accent-ink font-bold">&darr;</span>
            เลื่อนหน้าจอเพื่อคลี่ขั้นตอน — แผนภาพจะเคลื่อนไหวและปรับค่าตาม Step อัตโนมัติ
          </p>
        </Reveal>
        <Reveal delay={180}>
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 border-t border-rule pt-5 max-w-2xl">
            <div>
              <dt className="sr-only">Episodes</dt>
              <dd className="index text-3xl text-ink">
                {episodes.length}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  ตอน Scrollytelling
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Morph Topics</dt>
              <dd className="index text-3xl text-ink">
                4
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  สูตร Morph Player
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Steps</dt>
              <dd className="index text-3xl text-ink">
                {totalSteps}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  ขั้นตอนคิด
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Lectures</dt>
              <dd className="index text-3xl text-ink">
                {lectureCount}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  บทบรรยาย
                </span>
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* Formula Morph Transition (Interactive Formula Thinking Player) */}
      <section id="morph-player" className="shell mt-12 sm:mt-14 space-y-6">
        <Reveal>
          <div className="space-y-2 border-b border-rule pb-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-ink">
              <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-accent-ink font-bold">
                Kinetic Morph Player
              </span>
              <span>&middot;</span>
              <span>แปลงร่างสูตรทีละขั้น</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
              Formula Morph Transition
            </h2>
            <p className="text-sm sm:text-base text-ink-muted max-w-2xl leading-relaxed">
              จำลองกระบวนการแทนค่าและตัดทอนสูตรแบบ Smooth Morph Transition พร้อมคำอธิบาย Subtitle ทีละตัวอักษรและการเล่นอัตโนมัติ (Tukey, Gini, Confusion Matrix, K-Means)
            </p>
          </div>
        </Reveal>

        <FormulaMorphShowcase />
      </section>

      {/* Main Interactive Player Section */}
      <section className="shell mt-16 sm:mt-20 pt-12 border-t border-rule space-y-6">
        <Reveal>
          <div className="space-y-2 pb-2">
            <p className="eyebrow">Scrollytelling &middot; ลงลึกรายกรณี</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
              Episodes ทั้งหมด
            </h2>
            <p className="text-sm sm:text-base text-ink-muted max-w-2xl leading-relaxed">
              เลื่อนหน้าจอเพื่อคลี่ขั้นตอนการคำนวณอย่างละเอียดพร้อมแผนภาพประกอบการวิเคราะห์
            </p>
          </div>
        </Reveal>
        <EpisodePlayer episodes={episodes} />
      </section>
    </main>
  );
}

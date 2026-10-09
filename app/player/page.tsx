import { episodes } from "@/content/episodes";
import { EpisodePlayer } from "@/components/episode-player";
import { Reveal } from "@/components/reveal";

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
          <dl className="mt-10 grid grid-cols-3 gap-x-6 gap-y-4 border-t border-rule pt-5 max-w-xl">
            <div>
              <dt className="sr-only">Episodes</dt>
              <dd className="index text-3xl text-ink">
                {episodes.length}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  ตอน
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Steps</dt>
              <dd className="index text-3xl text-ink">
                {totalSteps}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  ขั้นตอน
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Lectures</dt>
              <dd className="index text-3xl text-ink">
                {lectureCount}
                <span className="block mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  บรรยาย
                </span>
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* Main Interactive Player Section */}
      <section className="shell mt-12 sm:mt-14">
        <EpisodePlayer episodes={episodes} />
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { episodes } from "@/content/episodes";
import { EpisodePlayer } from "@/components/episode-player";
import { FormulaMorphShowcase } from "@/components/formula-morph-showcase";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Thinking Player | DS Final Guide",
  description: "ฝึกแก้โจทย์และทำความเข้าใจสูตรคำนวณทีละขั้นตอน",
};

export default function PlayerPage() {
  const totalSteps = episodes.reduce((sum, ep) => sum + ep.steps.length, 0);
  const lectureCount = new Set(episodes.flatMap((ep) => ep.lectures)).size;

  const stats = [
    { label: "โจทย์ตัวอย่าง", value: episodes.length },
    { label: "สูตรคำนวณ", value: 4 },
    { label: "ขั้นตอนย่อย", value: totalSteps },
    { label: "บทเรียนที่เกี่ยวข้อง", value: lectureCount },
  ];

  return (
    <main id="main" tabIndex={-1} className="flex-1 pb-20">
      {/* Hero Section */}
      <section className="shell pt-12 pb-10 border-b border-rule">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <p className="eyebrow">Thinking Player</p>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
                แกะรอยวิธีคิด{" "}
                <span className="text-accent-ink">ทีละขั้นตอน</span>
              </h1>
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                เห็นภาพการแทนค่าสูตรและวิเคราะห์โจทย์ตั้งแต่ต้นจนจบ ครอบคลุมทั้ง
                Confusion Matrix, K-Means, SHAP และ Concept Drift
              </p>
            </div>

            {/* Stats Summary */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 border-rule shrink-0">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <dd className="index text-2xl sm:text-3xl font-bold text-ink">
                    {stat.value}
                  </dd>
                  <dt className="text-xs font-medium text-ink-subtle">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* Section 1: Formula Morph */}
      <section id="morph-player" className="shell mt-12 sm:mt-16 space-y-6">
        <Reveal>
          <header className="space-y-1">
            <p className="eyebrow text-accent-ink">Interactive Formula</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              การแทนค่าและลดรูปสมการ
            </h2>
            <p className="text-sm sm:text-base text-ink-muted max-w-xl">
              ดูที่มาของตัวเลขในแต่ละพจน์ของสมการ Tukey, Gini, Confusion Matrix
              และ K-Means
            </p>
          </header>
        </Reveal>

        <FormulaMorphShowcase />
      </section>

      {/* Section 2: Scrollytelling Episodes */}
      <section className="shell mt-16 sm:mt-20 pt-12 border-t border-rule space-y-6">
        <Reveal>
          <header className="space-y-1">
            <p className="eyebrow">Step-by-Step Walkthrough</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              โจทย์วิเคราะห์รายกรณี
            </h2>
            <p className="text-sm sm:text-base text-ink-muted max-w-xl">
              เลื่อนดูการคำนวณควบคู่ไปกับการเปลี่ยนแปลงของกราฟในแต่ละขั้นตอน
            </p>
          </header>
        </Reveal>

        <EpisodePlayer episodes={episodes} />
      </section>
    </main>
  );
}
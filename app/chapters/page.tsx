import { chapters } from "@/content/chapters";
import { ChapterBody } from "@/components/content-blocks";
import { Reveal } from "@/components/reveal";

const CHAPTER_ESTIMATES: Record<string, { time: string; badge: string }> = {
  "01": { time: "⏱️ 8 นาทีอ่าน", badge: "🧮 ตรวจจับ Outlier" },
  "02": { time: "⏱️ 12 นาทีอ่าน", badge: "🌲 Gini & Information Gain" },
  "03": { time: "⏱️ 10 นาทีอ่าน", badge: "🎯 Confusion Matrix & F1" },
  "04": { time: "⏱️ 10 นาทีอ่าน", badge: "📍 K-Means Distance" },
  "05": { time: "⏱️ 8 นาทีอ่าน", badge: "⚖️ SHAP Force & Ethics" },
};

export default function ChaptersPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1">
      {/* Header */}
      <section className="shell pt-14 pb-10 border-b border-rule">
        <Reveal>
          <p className="eyebrow">Chapters &middot; สรุปจากสไลด์บรรยาย</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight text-ink leading-[1.08]">
            สรุปเนื้อหาบทเรียน
            <span className="block text-accent-ink">5 หัวข้อหลัก</span>
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-ink-muted leading-relaxed">
            สรุปเข้มจากสไลด์อาจารย์จริง ครอบคลุมการคำนวณ นิยามศัพท์เฉพาะ
            และจุดหลอกที่พบบ่อยในข้อสอบ
          </p>
        </Reveal>

        {/* Coursera-style Quick Chapter Wayfinding Bar */}
        <Reveal delay={140}>
          <div className="flex flex-wrap items-center gap-2 mt-8 pt-5 border-t border-rule">
            <span className="text-xs font-semibold text-ink-subtle mr-1">เลือกกระโดดไปยังบท:</span>
            {chapters.map((ch) => (
              <a
                key={ch.slug}
                href={`#${ch.slug}`}
                className="tactile-btn px-3 py-1.5 border border-rule bg-surface text-xs font-semibold text-ink hover:border-ink cursor-pointer"
              >
                CH {ch.index}: {ch.title.split(":")[0]}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Chapters Content */}
      <div className="shell py-12 space-y-14">
        {chapters.map((ch) => {
          const estimate = CHAPTER_ESTIMATES[ch.index];
          return (
            <article
              key={ch.slug}
              id={ch.slug}
              className="scroll-mt-24 border-t-2 border-ink pt-6"
            >
              <header className="border-b border-rule pb-8 mb-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-baseline gap-4">
                    <span className="index text-5xl text-ink">{ch.index}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="eyebrow eyebrow-accent block">
                          Chapter {ch.index}
                        </span>
                        {estimate && (
                          <span className="bento-pill border border-accent/40 bg-accent-wash/30 text-accent-ink font-semibold">
                            {estimate.time}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-ink-subtle">
                        {ch.lectures.join(" · ")} {estimate ? `· ${estimate.badge}` : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {ch.keyTerms.map((t) => (
                      <span
                        key={t}
                        className="bento-pill border border-rule text-ink-subtle"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-ink mt-2">
                {ch.title}
              </h2>
              <p className="text-base sm:text-lg text-ink-muted mt-1 font-medium">{ch.titleTh}</p>
              <p className="text-sm text-ink-muted mt-3 max-w-2xl leading-relaxed">{ch.standfirst}</p>
            </header>

            <div className="pt-2">
              <ChapterBody sections={ch.sections} />
            </div>
          </article>
        );
      })}
      </div>

      <footer className="shell py-8 border-t border-rule">
        <p className="text-xs text-ink-subtle">
          {chapters.length} บทเรียน &mdash; ครอบคลุมเนื้อหาสำคัญ Lect 05 ถึง Lect 09 สำหรับสอบ Final
        </p>
      </footer>
    </main>
  );
}

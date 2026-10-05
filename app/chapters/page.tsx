import { chapters } from "@/content/chapters";
import { ChapterBody } from "@/components/content-blocks";
import { Reveal } from "@/components/reveal";

export default function ChaptersPage() {
  return (
    /* tabIndex -1 so the skip link actually moves focus into main, not just the
           scroll position. It stays out of the tab order. */
    <main id="main" tabIndex={-1} className="flex-1">
      <section className="shell pt-sp-2 pb-sp-1 cyber-grid relative">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border border-rule-strong/50 bg-accent-wash/50 text-accent-ink mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent cyber-beacon" />
                <span>CORPUS // 5_CORE_MODULES</span>
                <span className="text-ink-subtle">|</span>
                <span className="text-ink-muted">LECT_05-09 GROUNDED</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display tracking-reset">
                เนื้อหา
                <br />
                <span className="text-accent-ink cyber-text-glow">ที่ยืนยันแล้ว</span>
              </h1>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-sp-1 lg:mt-0">
            <Reveal delay={160}>
              <div className="hud-bracket border border-rule p-5 bg-bg/80 backdrop-blur-sm">
                <p className="meta-value text-xs font-mono text-ink-muted leading-relaxed">
                  ทุกตัวเลขในหน้านี้ผ่านการตรวจกับภาพสไลด์จริงแล้ว 100%
                  บทที่ตัวเลขยังอ่านไม่ได้จะไม่ถูกเขียนลงที่นี่จนกว่าจะยืนยันได้
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {chapters.map((ch) => (
        <article key={ch.slug} id={ch.slug} className="shell pt-sp-2 scroll-mt-24">
          <header className="grid-12 items-start pb-sp-1 border-t-2 border-accent">
            <div className="col-span-12 lg:col-span-1">
              <span className="index text-4xl font-mono text-accent-ink">{ch.index}</span>
            </div>
            <div className="col-span-12 lg:col-span-6 mt-4 lg:mt-0">
              <span className="text-[11px] font-mono tracking-widest text-accent-ink uppercase block mb-1">
                [SYS.CH // {ch.index}]
              </span>
              <h2 lang="en" className="text-4xl lg:text-5xl">{ch.title}</h2>
              <p className="mt-3 text-xl text-ink-muted">{ch.titleTh}</p>
            </div>
            <div className="col-span-12 lg:col-span-4 mt-6 lg:mt-0 lg:col-start-9">
              <p className="meta-value text-ink-muted">{ch.standfirst}</p>
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {ch.keyTerms.map((t) => (
                  <li key={t} className="meta-label tracking-display text-accent-ink">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 meta-label tracking-display text-ink-subtle">
                {ch.lectures.join(" \u00b7 ")}
              </p>
            </div>
          </header>

          <div className="space-y-sp-2 pt-sp-1">
            <ChapterBody sections={ch.sections} />
          </div>
        </article>
      ))}

      <footer className="shell py-sp-3 border-t border-rule">
        <p className="meta-label tracking-display text-ink-subtle">
          {chapters.length} บทเรียนที่ยืนยันแล้ว &mdash; ครอบคลุมเนื้อหาสำคัญ Lect 05 ถึง Lect 09
        </p>
      </footer>
    </main>
  );
}
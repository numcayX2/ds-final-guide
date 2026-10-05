import { chapters } from "@/content/chapters";
import { ChapterBody } from "@/components/content-blocks";
import { Reveal } from "@/components/reveal";

export default function ChaptersPage() {
  return (
    /* tabIndex -1 so the skip link actually moves focus into main, not just the
           scroll position. It stays out of the tab order. */
    <main id="main" tabIndex={-1} className="flex-1">
      <section className="shell pt-sp-2 pb-sp-1">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="meta-label text-ink-subtle mb-8">
                บทเรียน &middot; Chapters
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display tracking-reset">
                เนื้อหา
                <br />
                ที่ยืนยันแล้ว
              </h1>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 mt-sp-1 lg:mt-0">
            <Reveal delay={160}>
              <p className="meta-value text-ink-muted">
                ทุกตัวเลขในหน้านี้ผ่านการตรวจกับภาพสไลด์จริงแล้ว
                บทที่ตัวเลขยังอ่านไม่ได้จะไม่ถูกเขียนลงที่นี่จนกว่าจะยืนยันได้
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {chapters.map((ch) => (
        <article key={ch.slug} id={ch.slug} className="shell pt-sp-2 scroll-mt-24">
          <header className="grid-12 items-start pb-sp-1 border-t-2 border-accent">
            <div className="col-span-12 lg:col-span-1">
              <span className="index text-4xl text-accent-ink">{ch.index}</span>
            </div>
            <div className="col-span-12 lg:col-span-6 mt-4 lg:mt-0">
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
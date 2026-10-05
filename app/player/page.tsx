import { episodes } from "@/content/episodes";
import { EpisodePlayer } from "@/components/episode-player";
import { Reveal } from "@/components/reveal";

export default function PlayerPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1">
      <section className="shell pt-sp-2 pb-sp-1">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="meta-label text-ink-subtle mb-8">
                Thinking Player &middot; Step by Step
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display tracking-reset">
                คิด
                <br />
                ทีละขั้น
              </h1>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 mt-sp-1 lg:mt-0">
            <Reveal delay={160}>
              <p className="meta-value text-ink-muted">
                แต่ละตอนเดินจากแนวคิดไปถึงตัวเลขที่ยืนยันกับสไลด์แล้ว
                เลื่อนขั้นตอนได้ด้วยปุ่มลูกศร หรือใช้แถบเลื่อนด้านล่าง
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-sp-1 border-t border-rule">
        {/* h2 sits between the page h1 and the player component's h3 step
            headlines, so the heading levels descend one at a time. */}
        <h2 className="index text-sm text-ink-subtle mb-sp-1">
          Thinking Player &mdash; ทีละขั้น
        </h2>
        <EpisodePlayer episodes={episodes} />
      </section>

      <footer className="shell py-sp-2 border-t border-rule">
        <p className="meta-label tracking-display text-ink-subtle">
          ครบทั้ง {episodes.length} ตอน &mdash; ทุกตัวเลขและสูตรได้รับการยืนยันความถูกต้องตามหลักการและสไลด์
        </p>
      </footer>
    </main>
  );
}
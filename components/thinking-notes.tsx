import type { EpisodeId } from "@/content/types";
import { THINKING_NOTES } from "@/content/thinking-notes";
import { Tex } from "./math-formula";
import { Note } from "./ui";

export function ThinkingNotes({ episodeId, stepIndex }: { episodeId: EpisodeId; stepIndex: number }) {
  const note = THINKING_NOTES[episodeId]?.[stepIndex];
  if (!note) return null;

  return (
    <section aria-label="สรุปวิธีคิด" className="space-y-4">
      {note.tex ? (
        <div className="overflow-x-auto rounded-lg bg-accent-wash px-4 py-3 text-ink">
          <Tex tex={note.tex} display />
        </div>
      ) : null}
      <dl className="space-y-3 text-[15px] leading-relaxed">
        <div>
          <dt className="text-xs text-ink-subtle">วิธีคิด</dt>
          <dd className="text-ink">{note.idea}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink-subtle">ทางลัดในห้องสอบ</dt>
          <dd className="text-ink-muted">{note.shortcut}</dd>
        </div>
      </dl>
      <Note tone="pitfall" title="จุดที่มักผิด">
        {note.trap}
      </Note>
    </section>
  );
}

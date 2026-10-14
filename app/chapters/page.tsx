"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  Cross2Icon,
  ExclamationTriangleIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { useLenis } from "lenis/react";

import { chapters } from "@/content/chapters";
import type { Chapter, ContentBlock } from "@/content/types";
import { formulas } from "@/content/formulas";
import { ChapterBody, highlight } from "@/components/content-blocks";
import { Reveal } from "@/components/reveal";
import { EmptyState } from "@/components/ui";

type ChapterEstimate = { minutes: number; focus: string };

const CHAPTER_ESTIMATES: Record<string, ChapterEstimate> = {
  "01": { minutes: 8, focus: "ตรวจจับ Outlier" },
  "02": { minutes: 12, focus: "Gini & Information Gain" },
  "03": { minutes: 10, focus: "Confusion Matrix & F1" },
  "04": { minutes: 10, focus: "K-Means Distance" },
  "05": { minutes: 8, focus: "SHAP Force & Ethics" },
};

const shortTitle = (title: string) => title.split(":")[0].trim();

const totalMinutes = chapters.reduce(
  (sum, ch) => sum + (CHAPTER_ESTIMATES[ch.index]?.minutes ?? 0),
  0,
);

/* ───────────── Search & filter ───────────── */

type KindFilter = "all" | ContentBlock["kind"];

const KIND_FILTERS: Array<{ id: KindFilter; label: string }> = [
  { id: "all", label: "ทั้งหมด" },
  { id: "definition", label: "นิยาม" },
  { id: "pitfall", label: "จุดที่มักผิด" },
  { id: "worked-example", label: "ตัวอย่างโจทย์" },
  { id: "table", label: "ตาราง" },
  { id: "formula", label: "สูตร" },
];

/** Every searchable string inside a block, for the query filter. */
function blockHaystack(b: ContentBlock): string {
  switch (b.kind) {
    case "prose":
      return b.text;
    case "definition":
      return `${b.term} ${b.text}`;
    case "marker":
      return b.text;
    case "pitfall":
      return `${b.title} ${b.text}`;
    case "worked-example":
      return `${b.title} ${b.steps.join(" ")} ${b.answer}`;
    case "table":
      return `${b.caption} ${b.headers.join(" ")} ${b.rows.flat().join(" ")}`;
    case "image":
      return `${b.alt} ${b.caption ?? ""}`;
    case "formula": {
      const f = formulas.find((x) => x.id === b.formulaId);
      return f ? `${f.name} ${f.expression} ${f.id}` : b.formulaId;
    }
  }
}

type ViewSection = { heading: string; body: ContentBlock[]; index: number };
type ViewChapter = { ch: Chapter; sections: ViewSection[] };

function filterChapters(query: string, kind: KindFilter): ViewChapter[] {
  const q = query.trim().toLowerCase();
  return chapters.flatMap((ch): ViewChapter[] => {
    const est = CHAPTER_ESTIMATES[ch.index];
    const meta = (
      `${ch.index} ${ch.title} ${ch.titleTh} ${ch.standfirst} ${ch.keyTerms.join(" ")} ${ch.lectures.join(" ")} ` +
      `${est?.focus ?? ""} ${(BRIDGES[ch.slug] ?? []).map((b) => b.label).join(" ")}`
    ).toLowerCase();
    const metaHit = q !== "" && meta.includes(q);
    const sections = ch.sections.flatMap((section, idx): ViewSection[] => {
      const headingHit = q !== "" && section.heading.toLowerCase().includes(q);
      const body = section.body.filter(
        (b) =>
          (kind === "all" || b.kind === kind) &&
          (q === "" || metaHit || headingHit || blockHaystack(b).toLowerCase().includes(q)),
      );
      return body.length > 0 ? [{ heading: section.heading, body, index: idx + 1 }] : [];
    });
    return sections.length > 0 ? [{ ch, sections }] : [];
  });
}

/* ───────────── Read-state store (localStorage) ───────────── */

const READ_KEY = "ds-ch-read-v1";
const READ_EVENT = "ds-ch-read";

function subscribeRead(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(READ_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(READ_EVENT, cb);
  };
}
function readSnapshot(): string {
  try {
    return localStorage.getItem(READ_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}
const readServerSnapshot = () => "[]";
function parseSlugs(raw: string): string[] {
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function toggleRead(slug: string) {
  const cur = parseSlugs(readSnapshot());
  const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
  try {
    localStorage.setItem(READ_KEY, JSON.stringify(next));
  } catch {
    /* private mode: progress won't persist */
  }
  window.dispatchEvent(new Event(READ_EVENT));
}

/* ───────────── Contextual bridges (Pillar 3) ───────────── */

type BridgeLink = { href: string; label: string; desc: string };

const BRIDGES: Record<string, BridgeLink[]> = {
  eda: [
    { href: "/tools#tukey-iqr", label: "เครื่องคิดเลข Tukey IQR", desc: "กรอกชุดข้อมูล ดู Quartile, Fence และ Outlier ทันที" },
    { href: "/player?ep=ep01", label: "Thinking Player EP01", desc: "คลายขั้น Boxplot & Tukey ทีละเฟรม" },
  ],
  modeling: [
    { href: "/tools#gini-gain", label: "เครื่องคิดเลข Gini Gain", desc: "ดู Impurity ก่อน/หลังแตกกิ่งและ Information Gain" },
    { href: "/homework#hw-hw1-customer-churn-metrics", label: "เฉลยการบ้าน Churn Metrics", desc: "การบ้านข้อ 1 จาก Lect 07 พร้อมขั้นทำ" },
  ],
  "confusion-matrix": [
    { href: "/tools#confusion-matrix", label: "เครื่องคิดเลข Confusion Matrix", desc: "ป้อน TP/FP/FN/TN แล้วได้ Accuracy, Recall, F1" },
    { href: "/player?ep=ep03", label: "Thinking Player EP03", desc: "ดูที่มาของเมทริกซ์และมาตรวัดทุกตัว" },
  ],
  kmeans: [
    { href: "/tools#kmeans-iteration", label: "เครื่องคิดเลข K-Means", desc: "เดินวน Assign → Update ทีละรอบจน Centroid นิ่ง" },
    { href: "/player?ep=ep04", label: "Thinking Player EP04", desc: "ดู Centroid เคลื่อนที่ทีละเฟรม" },
  ],
  "responsible-ds": [
    { href: "/mock-test", label: "เริ่มข้อสอบจำลอง", desc: "จับเวลา 45 นาที เหมือนสอบจริง" },
  ],
};

/** Chapters with calculations need the calculator banned in the exam room. */
const CALC_CHAPTERS: Record<string, true> = { "01": true, "02": true, "03": true, "04": true };

/* ───────────── Page ───────────── */

export default function ChaptersPage() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [activeId, setActiveId] = useState<string>(chapters[0]?.slug ?? "");
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const lenis = useLenis();

  const rawRead = useSyncExternalStore(subscribeRead, readSnapshot, readServerSnapshot);
  const readSet = useMemo(() => new Set(parseSlugs(rawRead)), [rawRead]);
  const readCount = chapters.filter((ch) => readSet.has(ch.slug)).length;

  const filtering = query.trim() !== "" || kind !== "all";
  const trimmedQuery = query.trim();
  const activeFilterCount = (trimmedQuery !== "" ? 1 : 0) + (kind !== "all" ? 1 : 0);
  const kindLabel = KIND_FILTERS.find((f) => f.id === kind)?.label ?? "";
  const view = useMemo(() => filterChapters(query, kind), [query, kind]);
  const matchedBlocks = useMemo(
    () => view.reduce((n, v) => n + v.sections.reduce((m, s) => m + s.body.length, 0), 0),
    [view],
  );

  const clearFilters = () => {
    setQuery("");
    setKind("all");
  };

  const mainRef = useRef<HTMLElement | null>(null);

  /* Reading progress + back-to-top (rAF-throttled scroll listener) */
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      setShowTop(window.scrollY > 480);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [view]);

  /*
   * Scroll-spy via IntersectionObserver. The reading band sits just under the
   * sticky chrome, so a heading counts as current the moment it reaches that
   * band — no rect sampling that trails a Lenis-smoothed scroll. Chapters and
   * their sections are both observed and the *last* mark in document order
   * wins, which resolves to the deepest section while `activeChapterSlug`
   * still lights up its chapter through the id prefix.
   */
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const marks = Array.from(root.querySelectorAll<HTMLElement>("[data-track], section[id]"));
    if (marks.length === 0) return;
    const seen = new Set<Element>();
    const sync = () => {
      for (let i = marks.length - 1; i >= 0; i--) {
        const el = marks[i];
        if (seen.has(el)) {
          const id = el.dataset.track ?? el.id;
          if (id) setActiveId(id);
          return;
        }
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target);
          else seen.delete(entry.target);
        }
        sync();
      },
      { rootMargin: "-104px 0px -60% 0px", threshold: 0 },
    );
    for (const el of marks) io.observe(el);
    return () => io.disconnect();
  }, [view]);

  /* Escape dismisses the mobile TOC drawer from anywhere, not just inside it. */
  useEffect(() => {
    if (!tocOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTocOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [tocOpen]);

  /**
   * Jump to an anchor through Lenis when it is driving the page, so the smooth
   * scroll and the spy agree instead of fighting each other. Without Lenis it
   * falls back to native scrolling; reduced motion always lands instantly.
   */
  const scrollToId = (id: string) => {
    const inDrawer = tocOpen;
    setTocOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Clears the sticky header (~56px) plus the mobile TOC bar when it is shown.
    const offset = window.innerWidth >= 1024 ? -104 : -128;
    window.history.replaceState(null, "", `#${id}`);
    if (lenis) {
      lenis.scrollTo(el, { offset, immediate: reduce, duration: reduce ? 0 : 0.9 });
    } else {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
    if (inDrawer) {
      // The drawer link that fired this unmounts with the drawer; hand focus to
      // the chapter heading so keyboard users keep their place.
      const chapter = el.closest<HTMLElement>("[data-track]");
      const heading =
        chapter && document.getElementById(`${chapter.dataset.track ?? chapter.id}-title`);
      heading?.focus({ preventScroll: true });
    }
  };

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenis) {
      lenis.scrollTo(0, { immediate: reduce, duration: reduce ? 0 : 0.9 });
      return;
    }
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const activeChapterSlug = chapters.find(
    (ch) => activeId === ch.slug || activeId.startsWith(`${ch.slug}-sec-`),
  )?.slug;

  const pct = Math.round(progress * 100);

  return (
    <main ref={mainRef} id="main" tabIndex={-1} className="flex-1">
      {/* ───────────── Hero ───────────── */}
      <section className="border-b border-rule">
        <div className="shell pt-14 pb-10 sm:pt-20 sm:pb-14">
          <Reveal>
            <p className="eyebrow">Chapters &middot; สรุปจากสไลด์บรรยาย</p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl font-extrabold tracking-tight text-ink leading-[1.08]">
              สรุปเนื้อหาบทเรียน
              <span className="block text-accent-ink">{chapters.length} หัวข้อหลัก</span>
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-ink-muted leading-relaxed">
              สรุปเข้มจากสไลด์อาจารย์จริง ครอบคลุมการคำนวณ นิยามศัพท์เฉพาะ
              และจุดหลอกที่พบบ่อยในข้อสอบ
            </p>
          </Reveal>

          {/* Read-progress badge + stats strip */}
          <Reveal delay={140}>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
              <dl className="grid grid-cols-3 max-w-xl flex-1 divide-x divide-rule border-y border-rule">
                {[
                  { label: "บทเรียน", value: chapters.length },
                  { label: "นาทีอ่านรวม", value: `~${totalMinutes}` },
                  { label: "ครอบคลุม", value: "Lect 05–09" },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-3 first:pl-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
                      {s.label}
                    </dt>
                    <dd className="mt-1 text-lg sm:text-xl font-extrabold text-ink tabular-nums">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1.5 self-start rounded-xl border border-rule bg-surface px-4 py-3">
                <span
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={chapters.length}
                  aria-valuenow={readCount}
                  aria-label="ความคืบหน้าการอ่านบทเรียน"
                  className="block h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-rule"
                >
                  <span
                    className="block h-full rounded-full bg-accent transition-[width] duration-300"
                    style={{ width: `${(readCount / chapters.length) * 100}%` }}
                  />
                </span>
                <span className="text-sm font-semibold text-ink">
                  อ่านแล้ว <span className="num">{readCount}</span>/{chapters.length} บท
                </span>
                {readCount === chapters.length && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-good">
                    <CheckIcon className="h-3.5 w-3.5" aria-hidden />
                    ครบทุกบทแล้ว
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Quick search & filter ───────────── */}
      <section aria-label="ค้นหาและกรองเนื้อหา" className="border-b border-rule">
        <div className="shell py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full max-w-xl">
              <label
                htmlFor="ch-q"
                className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink-subtle"
              >
                ค้นหาในบทเรียน
              </label>
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle"
                  aria-hidden
                />
                <input
                  id="ch-q"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setQuery("");
                  }}
                  placeholder="เช่น Gini, IQR, Confusion Matrix"
                  aria-describedby="ch-q-status"
                  className="h-11 w-full rounded-lg border border-rule-strong bg-surface pl-9 pr-12 text-[15px] text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-wash"
                />
                {query !== "" && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="ล้างคำค้นหา"
                    className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md text-ink-subtle transition-colors hover:text-ink"
                  >
                    <Cross2Icon className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </div>
            </div>

            <div role="group" aria-label="กรองตามประเภทเนื้อหา" className="flex flex-wrap gap-2">
              {KIND_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="chip min-h-11"
                  aria-pressed={kind === f.id}
                  onClick={() => setKind(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filtering && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-ink-subtle">กำลังกรองด้วย</span>
              {trimmedQuery !== "" && (
                <button
                  type="button"
                  className="chip min-h-11 border-accent/40 bg-accent-wash text-accent-ink"
                  onClick={() => setQuery("")}
                  aria-label={`ล้างตัวกรองคำค้นหา ${trimmedQuery}`}
                >
                  คำค้นหา “{trimmedQuery}”
                  <Cross2Icon className="ml-1 h-3.5 w-3.5" aria-hidden />
                </button>
              )}
              {kind !== "all" && (
                <button
                  type="button"
                  className="chip min-h-11 border-accent/40 bg-accent-wash text-accent-ink"
                  onClick={() => setKind("all")}
                  aria-label={`ล้างตัวกรองหมวด ${kindLabel}`}
                >
                  หมวด {kindLabel}
                  <Cross2Icon className="ml-1 h-3.5 w-3.5" aria-hidden />
                </button>
              )}
              <button
                type="button"
                className="chip min-h-11 border-rule-strong font-semibold text-ink"
                onClick={clearFilters}
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}

          <p id="ch-q-status" role="status" aria-live="polite" className="mt-3 text-sm text-ink-muted">
            {!filtering ? null : view.length === 0 ? (
              <>ไม่พบเนื้อหาที่ตรงกับตัวกรองที่เลือก — กด “ล้างตัวกรองทั้งหมด” เพื่อเริ่มใหม่</>
            ) : (
              <>
                พบ <span className="num">{matchedBlocks}</span> รายการ ใน{" "}
                <span className="num">{view.length}</span> บท
                {activeFilterCount > 1 && (
                  <>
                    {" "}
                    — ใช้ตัวกรอง <span className="num">{activeFilterCount}</span> อย่างพร้อมกัน
                  </>
                )}
              </>
            )}
          </p>
        </div>
      </section>

      {/* ───────────── Mobile / tablet sticky wayfinding ───────────── */}
      <nav
        aria-label="นำทางบทเรียน"
        className="sticky top-14 z-30 border-b border-rule bg-paper/95 backdrop-blur lg:hidden"
      >
        <div className="shell relative">
          <div className="flex items-center gap-2 py-2">
            <button
              type="button"
              aria-expanded={tocOpen}
              aria-controls="ch-toc-drawer"
              onClick={() => setTocOpen((open) => !open)}
              className="chip min-h-11 shrink-0 border-rule-strong font-semibold text-ink"
            >
              <ListBulletIcon className="mr-1.5 h-4 w-4" aria-hidden />
              สารบัญ
              <ChevronDownIcon
                className={`ml-1 h-4 w-4 transition-transform ${tocOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <ul className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto">
              {view.map(({ ch }) => {
                const isActive = activeChapterSlug === ch.slug;
                const isRead = readSet.has(ch.slug);
                return (
                  <li key={ch.slug} className="shrink-0">
                    <a
                      href={`#${ch.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(ch.slug);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? "border-accent bg-accent-wash text-accent-ink"
                          : "border-rule bg-surface text-ink-muted"
                      }`}
                    >
                      <span className="num text-xs text-ink-subtle">{ch.index}</span>
                      {shortTitle(ch.title)}
                      {isRead && <CheckIcon className="h-3.5 w-3.5 text-good" aria-hidden />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Drawer: full TOC (chapters + sections); a selection closes it. */}
          <div
            id="ch-toc-drawer"
            hidden={!tocOpen}
            className="absolute inset-x-0 top-full z-40 max-h-[70vh] overflow-y-auto border-y border-rule-strong bg-paper shadow-xl"
          >
            <div className="shell py-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
                สารบัญทั้งหมด
              </p>
              <ol className="space-y-1">
                {view.map(({ ch, sections }) => (
                  <li key={ch.slug}>
                    <a
                      href={`#${ch.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(ch.slug);
                      }}
                      aria-current={activeChapterSlug === ch.slug ? "location" : undefined}
                      className={`flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold ${
                        activeChapterSlug === ch.slug ? "bg-accent-wash text-accent-ink" : "text-ink"
                      }`}
                    >
                      <span className="num text-xs text-ink-subtle">{ch.index}</span>
                      {shortTitle(ch.title)}
                      {readSet.has(ch.slug) && (
                        <CheckIcon className="h-3.5 w-3.5 text-good" aria-hidden />
                      )}
                    </a>
                    {sections.length > 0 && (
                      <ul className="ml-3 border-l border-rule pl-2">
                        {sections.map((s) => {
                          const id = `${ch.slug}-sec-${s.index}`;
                          const on = activeId === id;
                          return (
                            <li key={s.index}>
                              <a
                                href={`#${id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToId(id);
                                }}
                                aria-current={on ? "location" : undefined}
                                className={`flex min-h-11 items-center rounded-lg px-3 text-sm ${
                                  on ? "bg-accent-wash font-semibold text-accent-ink" : "text-ink-muted"
                                }`}
                              >
                                {s.heading}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-rule">
            <div
              className="h-full bg-accent transition-[width] duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </nav>

      {/* ───────────── Body: sidebar + chapters ───────────── */}
      <div className="shell py-12 sm:py-16 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[15rem_minmax(0,1fr)]">
        {/* Desktop sticky TOC with ScrollSpy + progress */}
        <aside className="hidden lg:block">
          <nav
            aria-label="สารบัญบทเรียน"
            className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8"
          >
            <div className="mb-4 rounded-lg border border-rule bg-surface p-3">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-ink-subtle">อ่านถึง</span>
                <span className="num font-semibold text-ink">{pct}%</span>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
                aria-label="ความคืบหน้าการอ่านหน้านี้"
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-rule"
              >
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-150"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-ink-subtle">
                อ่านแล้ว <span className="num font-semibold text-ink">{readCount}</span>/{chapters.length} บท
              </p>
            </div>

            <p className="eyebrow mb-3">สารบัญ</p>
            <ol className="border-l border-rule">
              {view.map(({ ch, sections }) => {
                const est = CHAPTER_ESTIMATES[ch.index];
                const isActive = activeChapterSlug === ch.slug;
                const isRead = readSet.has(ch.slug);
                return (
                  <li key={ch.slug}>
                    <a
                      href={`#${ch.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(ch.slug);
                      }}
                      aria-current={isActive ? "location" : undefined}
                      className={`group -ml-px flex gap-3 border-l-2 py-2.5 pl-4 pr-2 transition-colors ${
                        isActive
                          ? "border-accent bg-accent-wash/50"
                          : "border-transparent hover:border-ink"
                      }`}
                    >
                      <span
                        className={`num text-sm ${isActive ? "text-accent-ink" : "text-ink-subtle group-hover:text-accent-ink"}`}
                      >
                        {ch.index}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-sm font-semibold leading-snug ${isActive ? "text-accent-ink" : "text-ink"}`}
                        >
                          {shortTitle(ch.title)}
                          {isRead && (
                            <CheckIcon className="ml-1 inline h-3.5 w-3.5 align-baseline text-good" aria-hidden />
                          )}
                        </span>
                        {est && (
                          <span className="mt-0.5 block text-xs text-ink-subtle">{est.minutes} นาที</span>
                        )}
                      </span>
                    </a>

                    {isActive && sections.length > 0 && (
                      <ol className="mb-2 ml-4 mt-1 space-y-0.5 pr-2">
                        {sections.map((s) => {
                          const id = `${ch.slug}-sec-${s.index}`;
                          const on = activeId === id;
                          return (
                            <li key={s.index}>
                              <a
                                href={`#${id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToId(id);
                                }}
                                aria-current={on ? "location" : undefined}
                                className={`block rounded px-2 py-1 text-xs leading-snug transition-colors ${
                                  on
                                    ? "bg-accent-wash font-semibold text-accent-ink"
                                    : "text-ink-muted hover:bg-surface-hover hover:text-ink"
                                }`}
                              >
                                {s.heading}
                              </a>
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        {/* Chapters */}
        <div className="space-y-20 sm:space-y-24">
          {view.length === 0 ? (
            <EmptyState>
              <span className="block">
                {trimmedQuery !== "" && kind !== "all" ? (
                  <>ไม่พบเนื้อหาที่ตรงกับ “{trimmedQuery}” ในหมวด “{kindLabel}”</>
                ) : trimmedQuery !== "" ? (
                  <>ไม่พบเนื้อหาที่ตรงกับ “{trimmedQuery}”</>
                ) : (
                  <>ไม่พบเนื้อหาในหมวด “{kindLabel}”</>
                )}
              </span>
              <button type="button" className="btn btn-secondary mt-4" onClick={clearFilters}>
                ล้างตัวกรองทั้งหมด
              </button>
            </EmptyState>
          ) : (
            view.map(({ ch, sections }) => {
              const est = CHAPTER_ESTIMATES[ch.index];
              const isRead = readSet.has(ch.slug);
              const bridge = BRIDGES[ch.slug] ?? [];
              return (
                <article
                  key={ch.slug}
                  id={ch.slug}
                  data-track={ch.slug}
                  aria-labelledby={`${ch.slug}-title`}
                  className="scroll-mt-32 border-t-2 border-ink pt-6 lg:scroll-mt-24"
                >
                  <header className="mb-10 grid gap-x-6 gap-y-4 border-b border-rule pb-8 sm:grid-cols-[auto_minmax(0,1fr)]">
                    {/* Big index */}
                    <span aria-hidden="true" className="index text-5xl sm:text-7xl leading-none text-ink tabular-nums">
                      {ch.index}
                    </span>

                    <div className="min-w-0">
                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="eyebrow eyebrow-accent">Chapter {ch.index}</span>
                        {est && (
                          <>
                            <span className="bento-pill border border-accent/40 bg-accent-wash/30 text-accent-ink font-semibold">
                              {est.minutes} นาทีอ่าน
                            </span>
                            <span className="text-xs text-ink-subtle">
                              {highlight(est.focus, query)}
                            </span>
                          </>
                        )}
                        {CALC_CHAPTERS[ch.index] && (
                          <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1 rounded-md border border-warn/50 bg-warn-wash px-2 py-1 text-xs font-semibold text-warn">
                            <ExclamationTriangleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                            <span>นำเครื่องคิดเลขเข้าห้องสอบสำหรับบทนี้</span>
                          </span>
                        )}
                        {isRead && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-good/50 bg-good-wash px-2.5 py-1 text-xs font-semibold text-good">
                            <CheckIcon className="h-3 w-3" aria-hidden /> อ่านแล้ว
                          </span>
                        )}
                      </div>

                      {/* Titles */}
                      <h2
                        id={`${ch.slug}-title`}
                        tabIndex={-1}
                        className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-ink leading-tight text-balance"
                      >
                        {highlight(ch.title, query)}
                      </h2>
                      <p className="mt-1.5 text-base sm:text-lg font-medium text-ink-muted">
                        {highlight(ch.titleTh, query)}
                      </p>
                      <p className="mt-4 max-w-2xl text-sm sm:text-base text-ink-muted leading-relaxed">
                        {highlight(ch.standfirst, query)}
                      </p>

                      {/* Lectures + key terms */}
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                        <p className="shrink-0 text-xs font-semibold text-ink-subtle">
                          {ch.lectures.join(" · ")}
                        </p>
                        {ch.keyTerms.length > 0 && (
                          <ul aria-label="คำสำคัญ" className="flex flex-wrap gap-1.5">
                            {ch.keyTerms.map((t) => (
                              <li key={t} className="bento-pill border border-rule text-ink-subtle">
                                {highlight(t, query)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </header>

                  <div className="max-w-3xl">
                    <ChapterBody sections={sections} idPrefix={`${ch.slug}-sec`} hl={query} />

                    {/* Contextual action bridge */}
                    {bridge.length > 0 && (
                      <section
                        aria-label={`ฝึกฝนต่อจากบท ${ch.index}`}
                        className="mt-12 rounded-xl border border-rule bg-surface p-5"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
                          ฝึกฝนต่อกับเครื่องมือในเว็บนี้
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-3">
                          {bridge.map((b) => (
                            <li key={b.href}>
                              <Link
                                href={b.href}
                                className="group flex items-center gap-3 rounded-lg border border-rule bg-paper px-4 py-3 transition-colors hover:border-accent hover:bg-accent-wash/40"
                              >
                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold text-ink group-hover:text-accent-ink">
                                    {b.label}
                                  </span>
                                  <span className="mt-0.5 block text-xs text-ink-subtle">{b.desc}</span>
                                </span>
                                <ArrowRightIcon
                                  className="h-4 w-4 shrink-0 text-ink-subtle group-hover:text-accent-ink"
                                  aria-hidden
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Mark as read */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
                      <p className="text-sm text-ink-muted">
                        {isRead
                          ? "บันทึกไว้ในเครื่องนี้แล้ว — กดอีกครั้งเพื่อยกเลิก"
                          : "อ่านจบแล้ว? ทำเครื่องหมายเพื่อเก็บความคืบหน้าไว้ในเครื่องนี้"}
                      </p>
                      <button
                        type="button"
                        aria-pressed={isRead}
                        onClick={() => toggleRead(ch.slug)}
                        className={`btn ${isRead ? "border border-good bg-good-wash text-good" : "btn-secondary"}`}
                      >
                        {isRead ? (
                          <>
                            <CheckIcon aria-hidden /> อ่านเข้าใจแล้ว
                          </>
                        ) : (
                          "ทำเครื่องหมายว่าอ่านเข้าใจแล้ว"
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>

      {/* ───────────── Back to top ───────────── */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="กลับขึ้นด้านบน"
          title="กลับขึ้นด้านบน"
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-rule-strong bg-surface text-ink shadow-lg transition-colors hover:border-accent hover:text-accent-ink"
        >
          <ArrowUpIcon className="h-5 w-5" aria-hidden />
        </button>
      )}

      {/* ───────────── Footer ───────────── */}
      <footer className="border-t border-rule">
        <div className="shell flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-subtle">
            {chapters.length} บทเรียน &mdash; ครอบคลุมเนื้อหาสำคัญ Lect 05 ถึง
            Lect 09 สำหรับสอบ Final
          </p>
          <a
            href="#main"
            className="text-xs font-semibold text-ink hover:text-accent-ink"
          >
            กลับขึ้นด้านบน ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
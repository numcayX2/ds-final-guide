"use client";

import { useEffect, useState, type ReactNode } from "react";

/** A boundary marker drawn under the track. Keep the label numeric — it sits one line tall. */
export type RangeTick = { value: number; label: string };

const MARKER_TONES = {
  accent: "bg-accent",
  good: "bg-good",
  bad: "bg-bad",
} as const;

type RangeFieldProps = {
  /** Base id — also used for the synced number input. */
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Digits used for the text input and the out-of-range message. */
  decimals?: number;
  /** Spoken description of the current value, e.g. "จุดทดสอบ 45.0 เกินรั้วบน 42.0". */
  valueText: (value: number) => string;
  /** Key boundaries, drawn as marks + compact labels under the track. */
  ticks?: readonly RangeTick[];
  /** A moving threshold drawn on the track (e.g. the Tukey fence). */
  marker?: { value: number; tone: keyof typeof MARKER_TONES };
  /** One wrapping line of explanation under the ticks. */
  hint?: ReactNode;
  /** Status chip shown beside the number input. */
  badge?: ReactNode;
  accentClass?: string;
  labelClass?: string;
  disabled?: boolean;
  className?: string;
};

/**
 * A range slider paired with its own numeric text input.
 *
 * The slider and the input share one piece of state, so typing moves the thumb and
 * dragging rewrites the text. Boundary ticks are positioned at their true fraction of
 * the track and the first/last labels are edge-anchored, so nothing collides or
 * overflows on a 320px screen.
 */
export function RangeField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  decimals = 0,
  valueText,
  ticks = [],
  marker,
  hint,
  badge,
  accentClass = "accent-accent",
  labelClass = "text-ink",
  disabled = false,
  className = "",
}: RangeFieldProps) {
  const [draft, setDraft] = useState(() => value.toFixed(decimals));
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const labelId = `${id}-label`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;

  // Dragging the slider (or a reset) rewrites the text unless the user is mid-type.
  useEffect(() => {
    if (!editing) setDraft(value.toFixed(decimals));
  }, [value, decimals, editing]);

  // Snap to the same step grid the native range uses, then clamp into range.
  const snap = (n: number) => {
    const stepped = min + Math.round((n - min) / step) * step;
    return Number(Math.min(max, Math.max(min, stepped)).toFixed(6));
  };

  const handleTyping = (raw: string) => {
    setDraft(raw);
    const n = Number(raw.trim().replace(",", "."));
    if (raw.trim() === "") {
      setError(null);
      return;
    }
    if (!Number.isFinite(n)) {
      setError(`กรอกได้เฉพาะตัวเลข (${min.toFixed(decimals)}–${max.toFixed(decimals)})`);
      return;
    }
    if (n < min || n > max) {
      setError(`ค่าต้องอยู่ระหว่าง ${min.toFixed(decimals)}–${max.toFixed(decimals)}`);
      return;
    }
    setError(null);
    onChange(snap(n));
  };

  const commitTyping = () => {
    setEditing(false);
    const n = Number(draft.trim().replace(",", "."));
    const next = Number.isFinite(n) ? snap(n) : value;
    setError(null);
    setDraft(next.toFixed(decimals));
    if (next !== value) onChange(next);
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
        <span id={labelId} className={`min-w-0 text-xs font-medium sm:text-sm ${labelClass}`}>
          {label}
        </span>
        <div className="flex shrink-0 items-center gap-1.5">
          {badge}
          <input
            id={id}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            disabled={disabled}
            value={draft}
            onChange={(e) => handleTyping(e.target.value)}
            onFocus={() => setEditing(true)}
            onBlur={commitTyping}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commitTyping();
              }
            }}
            aria-labelledby={labelId}
            aria-describedby={[hintId, errId].filter(Boolean).join(" ") || undefined}
            aria-invalid={error ? true : undefined}
            className="field field-sm w-[4.5rem] text-right"
          />
        </div>
      </div>

      <div className="relative mt-1.5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-labelledby={labelId}
          aria-valuetext={valueText(value)}
          aria-describedby={hintId}
          className={`touch-target w-full cursor-pointer ${accentClass}`}
        />
        {marker && marker.value >= min && marker.value <= max ? (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${MARKER_TONES[marker.tone]}`}
            style={{ left: `${((marker.value - min) / (max - min)) * 100}%` }}
          />
        ) : null}
      </div>

      {ticks.length > 0 ? (
        <div className="relative mt-1 h-5 text-[10px] leading-none text-ink-subtle">
          {ticks.map((t) => {
            const left = `${((t.value - min) / (max - min)) * 100}%`;
            const first = t.value === ticks[0].value;
            const last = t.value === ticks[ticks.length - 1].value;
            const shift = first ? undefined : last ? "translateX(-100%)" : "translateX(-50%)";
            return (
              <span key={t.value}>
                <span
                  aria-hidden="true"
                  className="absolute top-0 h-1 w-px bg-rule-strong"
                  style={{ left, transform: shift }}
                />
                <span className="absolute top-1 whitespace-nowrap tabular-nums" style={{ left, transform: shift }}>
                  {t.label}
                </span>
              </span>
            );
          })}
        </div>
      ) : null}

      {hint ? (
        <p id={hintId} className="mt-1 text-[11px] leading-relaxed text-ink-subtle">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errId} className="mt-1 text-[11px] text-bad">
          {error}
        </p>
      ) : null}
    </div>
  );
}

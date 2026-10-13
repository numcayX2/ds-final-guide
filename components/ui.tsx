import type { ReactNode } from "react";
import { Tex } from "./math-formula";

/* ---------- Number formatting ---------- */

/** Round for display without trailing zeros: 0.27777 → "0.2778", 15 → "15". */
export function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  const r = Number(n.toFixed(digits));
  return Object.is(r, -0) ? "0" : String(r);
}

/** Like fmt, but wraps negatives in parentheses for substitution: 1.5 × (−3). */
export function sub(n: number, digits = 4): string {
  return n < 0 ? `(${fmt(n, digits)})` : fmt(n, digits);
}

export const pct = (x: number, digits = 2) => `${(x * 100).toFixed(digits)}%`;

/* ---------- Layout ---------- */

export function Panel({
  title,
  meta,
  children,
  className = "",
}: {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-rule bg-surface ${className}`}>
      {title || meta ? (
        <header className="flex items-baseline justify-between gap-3 border-b border-rule px-5 py-3">
          <h3 className="text-sm font-semibold text-ink">{title}</h3>
          {meta ? <span className="font-mono text-xs text-ink-subtle">{meta}</span> : null}
        </header>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  );
}

const NOTE_TONES = {
  info: "border-accent bg-accent-wash",
  pitfall: "border-warn bg-warn-wash",
  bad: "border-bad bg-bad-wash",
} as const;

export function Note({
  tone = "info",
  title,
  children,
}: {
  tone?: keyof typeof NOTE_TONES;
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-r-lg border-l-2 px-4 py-3 text-sm ${NOTE_TONES[tone]}`}>
      {title ? <p className="mb-1 font-semibold text-ink">{title}</p> : null}
      <div className="leading-relaxed text-ink-muted">{children}</div>
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-rule-strong px-5 py-10 text-center text-sm text-ink-subtle">
      {children}
    </p>
  );
}

/* ---------- Form controls ---------- */

type NumberFieldProps = {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  integer?: boolean;
  /** iOS decimal keypads have no minus key — use a text keypad when negatives are valid. */
  allowNegative?: boolean;
  inputMode?: "text" | "numeric" | "decimal" | "none" | "tel" | "search" | "email" | "url";
  size?: "md" | "sm";
};

export function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  onBlur,
  error,
  inputMode = "decimal",
  size = "md",
}: NumberFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="text-xs text-ink-subtle">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        type="text"
        inputMode={inputMode ?? "decimal"}
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errId].filter(Boolean).join(" ") || undefined}
        className={`field mt-1.5 ${size === "sm" ? "field-sm" : ""}`}
      />
      {error ? (
        <p id={errId} className="mt-1 text-xs text-bad">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: ReadonlyArray<{ value: T; label: ReactNode }>;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-lg border border-rule bg-paper p-0.5">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              on ? "bg-surface text-ink shadow-[0_0_0_1px_var(--color-rule-strong)]" : "text-ink-subtle hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Worked solution ---------- */

/** Numbered working, written the way a student writes it on an exam paper. */
export function WorkingSteps({ steps }: { steps: ReadonlyArray<{ label: ReactNode; tex: string }> }) {
  return (
    <ol className="space-y-4">
      {steps.map((s, i) => (
        <li key={i} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3">
          <span className="num pt-0.5 font-mono text-xs text-ink-subtle">{i + 1}</span>
          <div>
            <p className="text-xs text-ink-subtle">{s.label}</p>
            <div className="mt-1 overflow-x-auto pb-1 text-ink">
              <Tex tex={s.tex} />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

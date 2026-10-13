"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

export function CodeSnippet({
  code,
  language = "python",
  title,
}: {
  code: string;
  language?: string;
  title?: string;
  highlightLines?: number[];
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }

  return (
    <div className="relative my-4 overflow-hidden rounded-xl border border-rule-strong bg-surface shadow-xs">
      <div className="flex items-center justify-between border-b border-rule bg-surface-hover/60 px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-medium text-ink-subtle uppercase">
            {language}
          </span>
          {title && (
            <span className="font-semibold text-ink border-l border-rule pl-2">
              {title}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "คัดลอกแล้ว" : "คัดลอกโค้ด"}
          className="inline-flex items-center gap-1.5 rounded-md border border-rule px-2 py-1 font-mono text-[11px] font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink"
        >
          {copied ? (
            <>
              <CheckIcon className="h-3.5 w-3.5 text-good" />
              <span className="text-good font-semibold">คัดลอกแล้ว</span>
            </>
          ) : (
            <>
              <CopyIcon className="h-3.5 w-3.5" />
              <span>คัดลอกโค้ด</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-ink selection:bg-accent/20">
        <pre className="m-0">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

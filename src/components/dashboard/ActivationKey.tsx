"use client";

import { useCopyToClipboard } from "@/lib/hooks";
import { CopyIcon, CheckIcon } from "@/components/ui/icons";

export function ActivationKey({ activationKey }: { activationKey: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
        Ключ активации
      </span>
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-bg-elevated px-4 py-3.5">
        <code className="truncate font-mono text-sm tracking-wide text-ink">
          {activationKey}
        </code>
        <button
          type="button"
          onClick={() => copy(activationKey)}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
            copied
              ? "bg-success-soft text-success"
              : "bg-surface-2 text-ink-dim hover:text-ink"
          }`}
        >
          {copied ? (
            <>
              <CheckIcon className="h-3.5 w-3.5" />
              Скопировано
            </>
          ) : (
            <>
              <CopyIcon className="h-3.5 w-3.5" />
              Копировать
            </>
          )}
        </button>
      </div>
    </div>
  );
}

"use client";

import {
  formatLastActive,
  formatPlatformLabel,
  type AccountDevice,
} from "@/lib/subscription";
import { LaptopIcon, PhoneIcon } from "@/components/ui/icons";

const MAX_DEVICES = 1;

function DeviceIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  if (p === "ios" || p === "android") {
    return <PhoneIcon className="h-4 w-4" />;
  }
  return <LaptopIcon className="h-4 w-4" />;
}

export function DeviceList({ devices }: { devices: AccountDevice[] }) {
  const shown = devices.slice(0, MAX_DEVICES);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
          Подключённое устройство
        </span>
        <span className="text-xs font-medium text-ink-dim">
          {Math.min(shown.length, MAX_DEVICES)} / {MAX_DEVICES}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {shown.length > 0 ? (
          shown.map((device) => {
            const title =
              device.model.trim() || formatPlatformLabel(device.platform);
            return (
              <div
                key={device.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-bg-elevated px-4 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <DeviceIcon platform={device.platform} />
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold text-ink">
                    {title}
                  </span>
                  <span className="text-xs text-ink-faint">
                    {formatPlatformLabel(device.platform)} ·{" "}
                    {formatLastActive(device.lastActiveAt)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-border px-4 py-3 text-center text-xs text-ink-faint">
            Сейчас никто не использует аккаунт
          </div>
        )}
      </div>
    </div>
  );
}

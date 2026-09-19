import type { ComponentType } from "react";
import { downloadTargets } from "@/lib/data";
import {
  AppleIcon,
  AndroidIcon,
  WindowsIcon,
  DownloadIcon,
  type IconProps,
} from "@/components/ui/icons";

const iconMap: Record<string, ComponentType<IconProps>> = {
  apple: AppleIcon,
  android: AndroidIcon,
  windows: WindowsIcon,
  mac: AppleIcon,
};

export function DownloadApps() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/60 p-6 sm:p-7">
      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
        <DownloadIcon className="h-4 w-4 text-accent" />
        Скачать приложение
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {downloadTargets.map((target) => {
          const Icon = iconMap[target.platform];
          return (
            <a
              key={target.id}
              href="#"
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-bg-elevated px-3 py-4 text-center transition-colors duration-200 hover:border-border-strong hover:bg-surface-3"
            >
              <Icon className="h-5 w-5 text-ink" />
              <span className="text-xs font-semibold text-ink">{target.label}</span>
              <span className="text-[11px] text-ink-faint">{target.sublabel}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

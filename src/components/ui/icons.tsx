import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5l7 2.6v5.4c0 4.4-3 8.2-7 9.4-4-1.2-7-5-7-9.4V6.1l7-2.6Z" />
      <path d="M9 12.2l2 2 4-4.2" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12.5 3 5 13.2h5.4L11 21l7.5-10.4H13z" strokeLinejoin="round" />
    </svg>
  );
}

export function DevicesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="13" height="9" rx="1.6" />
      <path d="M7.5 17.5h4" />
      <rect x="16.6" y="9" width="4.4" height="8" rx="1.1" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z" />
    </svg>
  );
}

export function InfinityIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 8.5a3.5 3.5 0 1 0 0 7c1.9 0 3.2-1.4 5-3.5 1.8-2.1 3.1-3.5 5-3.5a3.5 3.5 0 1 1 0 7c-1.9 0-3.2-1.4-5-3.5-1.8-2.1-3.1-3.5-5-3.5Z" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
      <path d="M12 14.5v2.2" />
    </svg>
  );
}

export function HeadsetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13.5v-1.8a8 8 0 0 1 16 0v1.8" />
      <rect x="3" y="13.2" width="4" height="5.6" rx="1.4" />
      <rect x="17" y="13.2" width="4" height="5.6" rx="1.4" />
      <path d="M19 18.8v.6a3 3 0 0 1-3 3h-2.4" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5 9.5 17 19 7" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9.5 12 15l6-5.5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15M13 5.5 19.5 12 13 18.5" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5v11.4M7.5 10.6 12 15l4.5-4.4" />
      <path d="M4.5 17v1.6a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V17" />
    </svg>
  );
}

export function PowerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v7.2" />
      <path d="M7.2 6.6a7.5 7.5 0 1 0 9.6 0" />
    </svg>
  );
}

export function CardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10.5h18" />
      <path d="M7 15h4" />
    </svg>
  );
}

export function QrIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1" />
      <path d="M14.5 14.5h3v3M20.5 14.5v2M17.5 20.5h3" />
    </svg>
  );
}

export function CoinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v9M9.5 9.6c0-1.2 1-2 2.5-2s2.5.8 2.5 1.9c0 2.4-5 1.4-5 3.8 0 1.1 1 1.9 2.5 1.9s2.5-.8 2.5-2" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7 12 12.5 19.5 7" />
    </svg>
  );
}

export function LockKeyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.3" r="4" />
      <path d="M12 12.3v2M9 20l1-4h4l1 4" />
    </svg>
  );
}

export function AppleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15.5 4.2c-.9 0-2 .6-2.6 1.4-.6.7-1 1.7-.9 2.7 1 .1 2-.5 2.6-1.3.6-.7 1-1.7.9-2.8Z" />
      <path d="M18.7 16.8c-.4 1-.9 1.9-1.6 2.7-.9 1-1.8 2-3.1 2-1.2 0-1.6-.8-3-.8-1.4 0-1.9.7-3 .8-1.2.1-2.2-1.1-3.1-2.1-1.9-2.1-3.3-6-1.4-8.6 1-1.4 2.5-2.3 4.2-2.3 1.3 0 2.1.9 3.2.9 1 0 1.7-.9 3.2-.9 1.1 0 2.4.6 3.3 1.6-2.9 1.6-2.4 5.7 1.3 6.7Z" />
    </svg>
  );
}

export function AndroidIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 10.5v5.8M17 10.5v5.8" />
      <rect x="6.5" y="9" width="11" height="9.5" rx="1.5" />
      <path d="M9 5.5 7.8 3.7M15 5.5l1.2-1.8" />
      <path d="M9 6.8h6" />
      <path d="M9.5 21v-2M14.5 21v-2" />
    </svg>
  );
}

export function WindowsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 6.4 11 5.3v6.3H3.5V6.4ZM12.2 5.1 20.5 4v7.6h-8.3V5.1ZM3.5 12.6H11V19l-7.5-1.1v-5.3ZM12.2 12.6h8.3V20l-8.3-1.2v-6.2Z" />
    </svg>
  );
}

export function LaptopIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="5" width="14" height="9.5" rx="1.4" />
      <path d="M3 19h18M9.5 19l.6-2h3.8l.6 2" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7.5" y="3" width="9" height="18" rx="2" />
      <path d="M11 18.2h2" />
    </svg>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 4.5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3" />
      <path d="M14 15.5 19 12l-5-3.5M19 12H9" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4 3 19.5h18L12 4Z" strokeLinejoin="round" />
      <path d="M12 10.2v4M12 16.8v.1" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 13.4 9.2 19 10.5l-5.6 1.3L12 17.5l-1.4-5.7L5 10.5l5.6-1.3L12 3.5Z" />
      <path d="M18.2 3.8v2.8M17 5.2h2.8M6.2 16.2v2.2M5.2 17.3h2.2" />
    </svg>
  );
}

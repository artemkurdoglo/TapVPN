export interface FeatureItem {
  icon: "shield" | "bolt" | "sparkle" | "globe";
  title: string;
  description: string;
}

export const features: FeatureItem[] = [
  {
    icon: "shield",
    title: "Защита данных",
    description:
      "Весь трафик проходит через шифрованный туннель — ваши данные недоступны посторонним.",
  },
  {
    icon: "bolt",
    title: "Высокая скорость",
    description:
      "Стабильное подключение без просадок скорости и лишних ограничений.",
  },
  {
    icon: "sparkle",
    title: "Удобный дизайн",
    description:
      "Минималистичное приложение TAP VPN — всё нужное на одном экране, без лишних настроек.",
  },
  {
    icon: "globe",
    title: "Глобальный доступ",
    description:
      "Подключайтесь к серверам по всему миру и получайте доступ к контенту без границ.",
  },
];

export interface StepItem {
  index: string;
  title: string;
  description: string;
}

export const steps: StepItem[] = [
  {
    index: "01",
    title: "Выберите тариф",
    description: "Сравните условия и выберите подходящий период подписки.",
  },
  {
    index: "02",
    title: "Оплатите подписку",
    description: "Оформите оплату удобным способом — это займёт меньше минуты.",
  },
  {
    index: "03",
    title: "Подключите TAP VPN",
    description: "Активируйте ключ в приложении и выходите в интернет без ограничений.",
  },
];

export interface TrustItem {
  icon: "bolt" | "lock" | "power" | "headset";
  label: string;
}

export const trustChecklist: TrustItem[] = [
  { icon: "bolt", label: "Высокая скорость" },
  { icon: "power", label: "Снятие ограничений в 1 клик" },
  { icon: "headset", label: "Поддержка 24/7" },
  { icon: "lock", label: "Простая активация" },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "На каких устройствах можно использовать VPN?",
    answer:
      "TAP VPN доступен на iOS и Android. Скачайте приложение, войдите в аккаунт и подключитесь одним нажатием.",
  },
  {
    question: "Как происходит оплата?",
    answer:
      "Оплата производится банковской картой, через СБП или криптовалютой. Подписка активируется сразу после успешной оплаты. Первая неделя — всего за 1 ₽, далее действует выбранный тариф.",
  },
  {
    question: "Как активировать подписку?",
    answer:
      "После оплаты вы получите ключ активации на почту и в личном кабинете. Введите его в приложении TAP VPN — и подключение будет готово.",
  },
  {
    question: "Можно ли отменить подписку?",
    answer:
      "Да, отменить автопродление можно в любой момент в разделе «Управление подпиской» личного кабинета.",
  },
];

export interface DeviceItem {
  id: string;
  name: string;
  platform: "iOS" | "Android" | "Windows" | "macOS";
  lastActive: string;
}

export const connectedDevices: DeviceItem[] = [
  { id: "dev-1", name: "iPhone 15 Pro", platform: "iOS", lastActive: "Сейчас в сети" },
];

export interface DownloadTarget {
  id: string;
  label: string;
  sublabel: string;
  platform: "apple" | "android" | "windows" | "mac";
}

export const downloadTargets: DownloadTarget[] = [
  { id: "ios", label: "App Store", sublabel: "iOS", platform: "apple" },
  { id: "android", label: "Google Play", sublabel: "Android", platform: "android" },
];

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  serverTimestamp,
  type Timestamp,
  type Unsubscribe,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";

export interface SubscriptionData {
  uid: string;
  plan: string;
  status: string;
  expiresAt: Date | null;
  licenseKey: string | null;
  active: boolean;
}

export interface AccountDevice {
  id: string;
  platform: string;
  model: string;
  lastActiveAt: Date | null;
  sessionValid: boolean;
}

export function formatLicenseKey(raw: string | null | undefined): string {
  if (!raw) return "";
  const clean = raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  return clean.replace(/(.{4})/g, "$1-").replace(/-$/, "");
}

export function formatPlanLabel(plan: string | null | undefined): string {
  if (!plan) return "—";
  const map: Record<string, string> = {
    standard: "Standard",
    "1m": "1 месяц",
    "6m": "6 месяцев",
    "12m": "12 месяцев",
  };
  return map[plan] ?? plan.charAt(0).toUpperCase() + plan.slice(1);
}

export function formatPlatformLabel(platform: string): string {
  const map: Record<string, string> = {
    ios: "iOS",
    android: "Android",
    macos: "macOS",
    windows: "Windows",
    linux: "Linux",
    web: "Web",
  };
  return map[platform.toLowerCase()] ?? platform;
}

export function formatLastActive(date: Date | null): string {
  if (!date) return "Неизвестно";
  const diffMs = Date.now() - date.getTime();
  if (diffMs < 2 * 60 * 1000) return "Сейчас в сети";
  if (diffMs < 60 * 60 * 1000) {
    const mins = Math.max(1, Math.floor(diffMs / 60000));
    return `${mins} мин. назад`;
  }
  if (diffMs < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diffMs / 3600000);
    return `${hours} ч. назад`;
  }
  const days = Math.floor(diffMs / 86400000);
  return `${days} дн. назад`;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Достаёт локальные 10 цифр РФ-номера из любого ввода.
 * Код страны (+7 / 8) отбрасывается, только если он явно есть в строке
 * или номер пришёл в полном формате (11 цифр).
 */
export function phoneDigits(input: string): string {
  const trimmed = input.trim();
  const hasExplicitCountry =
    trimmed.startsWith("+") ||
    trimmed.startsWith("8") ||
    trimmed.includes("+7");

  let digits = input.replace(/\D/g, "");

  if (digits.startsWith("7") || digits.startsWith("8")) {
    if (digits.length >= 11 || hasExplicitCountry) {
      digits = digits.slice(1);
    }
  }

  return digits.slice(0, 10);
}

/** Маска из локальных цифр: +7 (900) 123-45-67 */
export function formatPhoneDisplay(digitsOrInput: string): string {
  const d = phoneDigits(digitsOrInput);
  if (d.length === 0) return "+7 ";
  if (d.length <= 3) return `+7 (${d}`;
  if (d.length <= 6) return `+7 (${d.slice(0, 3)}) ${d.slice(3)}`;
  if (d.length <= 8) {
    return `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  return `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8, 10)}`;
}

/** E.164 из локальных цифр или сырого ввода. */
export function normalizePhone(input: string): string {
  const digits = phoneDigits(input);
  return digits.length === 10 ? `+7${digits}` : "";
}

/** Только цифры SMS-кода, максимум 6. */
export function formatSmsCode(input: string): string {
  return input.replace(/\D/g, "").slice(0, 6);
}

/**
 * Проверка identifierIndex: вход разрешён только если за email/телефоном
 * уже закреплён погашенный ключ (как в приложении TapVPN).
 */
export async function ensureIdentifierHasSubscription(
  identifier: string
): Promise<{ uid: string; licenseKey?: string }> {
  const key = identifier.trim();
  const snap = await getDoc(doc(getFirebaseDb(), "identifierIndex", key));
  const data = snap.data();

  if (!snap.exists() || data?.hasSubscription !== true) {
    throw Object.assign(
      new Error(
        "Аккаунт с этим email или номером не найден. Сначала активируйте подписку ключом в приложении TAP VPN."
      ),
      { code: "identifier-not-found" }
    );
  }

  return {
    uid: String(data.uid ?? ""),
    licenseKey: data.licenseKey ? String(data.licenseKey) : undefined,
  };
}

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "object" && value !== null && "toDate" in value) {
    return (value as Timestamp).toDate();
  }
  return null;
}

function parseSubscription(
  uid: string,
  data: Record<string, unknown>
): SubscriptionData {
  const expiresAt = toDate(data.expiresAt);
  const statusRaw = String(data.status ?? "");
  const active =
    statusRaw !== "expired" &&
    statusRaw !== "revoked" &&
    statusRaw !== "cancelled" &&
    (!expiresAt || expiresAt.getTime() > Date.now()) &&
    (statusRaw === "active" || statusRaw === "" || Boolean(expiresAt));

  return {
    uid,
    plan: String(data.plan ?? "standard"),
    status: active ? "active" : statusRaw || "expired",
    expiresAt,
    licenseKey: data.licenseKey ? String(data.licenseKey) : null,
    active,
  };
}

export async function loadSubscription(
  uid: string
): Promise<SubscriptionData | null> {
  const snap = await getDoc(doc(getFirebaseDb(), "subscriptions", uid));
  if (!snap.exists()) return null;
  return parseSubscription(uid, snap.data() as Record<string, unknown>);
}

/** Подписка на изменения subscriptions/{uid}. */
export function watchSubscription(
  uid: string,
  onData: (sub: SubscriptionData | null) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  return onSnapshot(
    doc(getFirebaseDb(), "subscriptions", uid),
    (snap) => {
      if (!snap.exists()) {
        onData(null);
        return;
      }
      onData(parseSubscription(uid, snap.data() as Record<string, unknown>));
    },
    (err) => onError?.(err)
  );
}

/**
 * Активные устройства — та же логика, что в приложении:
 * sessionValid != false (поле отсутствует = ещё считается активным).
 * После revokeDevice / выхода sessionValid=false или документ удалён.
 */
function mapDeviceDocs(
  docs: { id: string; data: () => Record<string, unknown> }[]
): AccountDevice[] {
  return docs
    .map((d) => {
      const data = d.data();
      return {
        id: d.id,
        platform: String(data.platform ?? "unknown"),
        model: String(data.model ?? ""),
        lastActiveAt: toDate(data.lastActiveAt),
        sessionValid: data.sessionValid !== false,
      } satisfies AccountDevice;
    })
    .filter((d) => d.sessionValid)
    .sort((a, b) => {
      const at = a.lastActiveAt?.getTime() ?? 0;
      const bt = b.lastActiveAt?.getTime() ?? 0;
      return bt - at;
    });
}

export async function loadDevices(uid: string): Promise<AccountDevice[]> {
  const snap = await getDocs(
    collection(getFirebaseDb(), "users", uid, "devices")
  );
  return mapDeviceDocs(snap.docs);
}

/** Подписка на users/{uid}/devices. */
export function watchDevices(
  uid: string,
  onData: (devices: AccountDevice[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  return onSnapshot(
    collection(getFirebaseDb(), "users", uid, "devices"),
    (snap) => {
      onData(mapDeviceDocs(snap.docs));
    },
    (err) => onError?.(err)
  );
}

/**
 * То же по смыслу, что «Отключить» на экране лимита в приложении.
 *
 * Важно: документ НЕ удаляем — ставим sessionValid: false.
 * Если удалить, приложение при следующей проверке снова зарегистрирует
 * то же устройство (слот свободен) и VPN снова заработает без входа.
 * С «надгробием» sessionValid=false приложение видит deviceValid=false
 * и должно выйти из аккаунта; повторный вход снова активирует сессию.
 */
export async function revokeDeviceSession(
  uid: string,
  deviceId: string
): Promise<void> {
  const auth = getFirebaseAuth();
  const currentUid = auth.currentUser?.uid;
  if (!currentUid) {
    throw new Error("Нужно войти в аккаунт.");
  }
  if (currentUid !== uid) {
    throw new Error("Нельзя отключить устройство чужого аккаунта.");
  }

  const ref = doc(getFirebaseDb(), "users", uid, "devices", deviceId);

  try {
    await setDoc(
      ref,
      {
        sessionValid: false,
        lastActiveAt: serverTimestamp(),
        revokedAt: serverTimestamp(),
        revokedFrom: "web",
      },
      { merge: true }
    );
  } catch (err) {
    const code =
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      typeof (err as { code: unknown }).code === "string"
        ? (err as { code: string }).code
        : "";
    throw new Error(
      code === "permission-denied"
        ? "Нет прав на отключение устройства. Обновите страницу и войдите снова."
        : "Не удалось отключить устройство. Попробуйте ещё раз."
    );
  }
}

/** @deprecated используйте revokeDeviceSession */
export async function disconnectDevice(
  uid: string,
  deviceId: string
): Promise<void> {
  return revokeDeviceSession(uid, deviceId);
}

/**
 * Достаём ключ активации:
 * 1) subscriptions/{uid}.licenseKey
 * 2) identifierIndex по email и телефону
 * 3) licenses где claimedByUid == uid
 *
 * Вход в кабинет не требует ключа в UI — достаточно hasSubscription /
 * активной подписки. Поэтому ключ мог «пропасть» из документа, хотя доступ есть.
 * Если нашли — дописываем обратно в subscription и индекс.
 */
export async function resolveLicenseKey(
  user: User,
  subscription: SubscriptionData | null
): Promise<string | null> {
  if (subscription?.licenseKey) return subscription.licenseKey;

  const db = getFirebaseDb();
  const contacts = userContacts(user);

  for (const contact of contacts) {
    const indexSnap = await getDoc(doc(db, "identifierIndex", contact));
    const fromIndex = indexSnap.data()?.licenseKey;
    if (fromIndex) {
      const key = String(fromIndex);
      await backfillLicenseKey(user.uid, key, contacts);
      return key;
    }
  }

  try {
    const snap = await getDocs(
      query(
        collection(db, "licenses"),
        where("claimedByUid", "==", user.uid),
        limit(1)
      )
    );
    if (!snap.empty) {
      const key = snap.docs[0].id;
      await backfillLicenseKey(user.uid, key, contacts);
      return key;
    }
  } catch (err) {
    console.warn("[TapVPN] license query failed", err);
  }

  return null;
}

function userContacts(user: User): string[] {
  const list: string[] = [];
  if (user.email) list.push(normalizeEmail(user.email));
  if (user.phoneNumber) list.push(user.phoneNumber);
  return list;
}

async function backfillLicenseKey(
  uid: string,
  licenseKey: string,
  contacts: string[]
): Promise<void> {
  const db = getFirebaseDb();
  const clean = licenseKey.replace(/-/g, "").toUpperCase();

  await setDoc(
    doc(db, "subscriptions", uid),
    {
      uid,
      licenseKey: clean,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  ).catch(() => undefined);

  await Promise.all(
    contacts.map((contact) =>
      setDoc(
        doc(db, "identifierIndex", contact),
        {
          uid,
          hasSubscription: true,
          licenseKey: clean,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      ).catch(() => undefined)
    )
  );
}

/**
 * Как в приложении: если ключ активировали анонимно с purchaseEmail/phone,
 * после входа по почте/телефону переносим подписку на текущий uid.
 */
export async function restoreSubscriptionIfNeeded(
  user: User
): Promise<SubscriptionData | null> {
  const uid = user.uid;
  const email = user.email ? normalizeEmail(user.email) : null;
  const phone = user.phoneNumber ?? null;
  const contact = email || phone;
  if (!contact) return loadSubscription(uid);

  const own = await loadSubscription(uid);
  if (own?.active) return own;

  const indexSnap = await getDoc(doc(getFirebaseDb(), "identifierIndex", contact));
  if (!indexSnap.exists() || indexSnap.data()?.hasSubscription !== true) {
    return own;
  }

  const ownerUid = String(indexSnap.data()?.uid ?? "");
  if (!ownerUid || ownerUid === uid) return own;

  const ownerSub = await loadSubscription(ownerUid);
  if (!ownerSub?.active) return own;

  const licenseKey =
    ownerSub.licenseKey ||
    (indexSnap.data()?.licenseKey ? String(indexSnap.data()?.licenseKey) : null);

  const db = getFirebaseDb();

  await setDoc(
    doc(db, "subscriptions", uid),
    {
      uid,
      plan: ownerSub.plan,
      status: "active",
      expiresAt: ownerSub.expiresAt,
      licenseKey,
      restoredFromUid: ownerUid,
      updatedAt: serverTimestamp(),
      source: "web-restore",
    },
    { merge: true }
  );

  await setDoc(
    doc(db, "users", uid),
    {
      email: user.email ?? null,
      phone: user.phoneNumber ?? null,
      updatedAt: serverTimestamp(),
      entitlement: {
        plan: ownerSub.plan,
        status: "active",
        expiresAt: ownerSub.expiresAt,
      },
    },
    { merge: true }
  );

  await setDoc(
    doc(db, "identifierIndex", contact),
    {
      uid,
      hasSubscription: true,
      licenseKey,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  if (licenseKey) {
    const cleanKey = licenseKey.replace(/-/g, "").toUpperCase();
    await updateDoc(doc(db, "licenses", cleanKey), {
      claimedByUid: uid,
      restoredAt: serverTimestamp(),
    }).catch(() => undefined);
  }

  return loadSubscription(uid);
}

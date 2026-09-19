"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
  type ConfirmationResult,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import {
  ensureIdentifierHasSubscription,
  normalizeEmail,
  normalizePhone,
  restoreSubscriptionIfNeeded,
} from "@/lib/subscription";

const PENDING_EMAIL_KEY = "tapvpn_pending_email";
const AUTH_TIMEOUT_MS = 15_000;
const RECAPTCHA_CONTAINER_ID = "tapvpn-recaptcha";

let phoneRecaptcha: RecaptchaVerifier | null = null;
let recaptchaNetPatched = false;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      reject(
        Object.assign(
          new Error(
            `${label}: нет ответа. Проверьте интернет и попробуйте снова.`
          ),
          { code: "auth/timeout" }
        )
      );
    }, ms);
    promise.then(
      (value) => {
        window.clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        window.clearTimeout(timer);
        reject(err);
      }
    );
  });
}

/**
 * Firebase тянет reCAPTCHA с google.com — в части сетей это блокируется.
 * Подменяем URL на recaptcha.net (официальный зеркальный домен Google).
 */
function patchRecaptchaToNetDomain() {
  if (recaptchaNetPatched || typeof document === "undefined") return;
  recaptchaNetPatched = true;

  const rewrite = (url: string) =>
    url
      .replace("://www.google.com/recaptcha", "://www.recaptcha.net/recaptcha")
      .replace("://www.gstatic.com/recaptcha", "://www.gstatic.com/recaptcha");

  const origAppendChild = Element.prototype.appendChild;
  Element.prototype.appendChild = function patchedAppend<T extends Node>(
    node: T
  ): T {
    if (
      node instanceof HTMLScriptElement &&
      typeof node.src === "string" &&
      node.src.includes("google.com/recaptcha")
    ) {
      node.src = rewrite(node.src);
    }
    return origAppendChild.call(this, node) as T;
  };

  const origInsertBefore = Element.prototype.insertBefore;
  Element.prototype.insertBefore = function patchedInsert<T extends Node>(
    node: T,
    ref: Node | null
  ): T {
    if (
      node instanceof HTMLScriptElement &&
      typeof node.src === "string" &&
      node.src.includes("google.com/recaptcha")
    ) {
      node.src = rewrite(node.src);
    }
    return origInsertBefore.call(this, node, ref) as T;
  };
}

function clearPhoneRecaptcha() {
  if (phoneRecaptcha) {
    try {
      phoneRecaptcha.clear();
    } catch {
      // ignore
    }
    phoneRecaptcha = null;
  }
  const container = document.getElementById(RECAPTCHA_CONTAINER_ID);
  if (container) container.innerHTML = "";
}

async function createPhoneRecaptcha(): Promise<RecaptchaVerifier> {
  patchRecaptchaToNetDomain();

  const auth = getFirebaseAuth();
  await auth.authStateReady();
  auth.languageCode = "ru";

  clearPhoneRecaptcha();

  const container = document.getElementById(RECAPTCHA_CONTAINER_ID);
  if (!container) {
    throw Object.assign(
      new Error("Обновите страницу и попробуйте снова."),
      { code: "auth/missing-recaptcha" }
    );
  }

  const verifier = new RecaptchaVerifier(auth, RECAPTCHA_CONTAINER_ID, {
    size: "invisible",
    callback: () => {},
    "expired-callback": () => {
      clearPhoneRecaptcha();
    },
  });
  phoneRecaptcha = verifier;
  await withTimeout(verifier.render(), AUTH_TIMEOUT_MS, "Проверка безопасности");
  return verifier;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  configured: boolean;
  requestEmailLink: (email: string) => Promise<void>;
  completeEmailLink: (emailLink: string, email?: string) => Promise<void>;
  requestPhoneCode: (phone: string) => Promise<ConfirmationResult>;
  confirmPhoneCode: (
    confirmation: ConfirmationResult,
    code: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isFirebaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(configured);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      if (nextUser) {
        try {
          await withTimeout(
            restoreSubscriptionIfNeeded(nextUser),
            AUTH_TIMEOUT_MS,
            "Восстановление подписки"
          );
        } catch {
          // ignore
        }
      }
      setUser(nextUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearPhoneRecaptcha();
    };
  }, [configured]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured,

      async requestEmailLink(email: string) {
        if (!configured) throw new Error("Firebase не настроен");
        const normalized = normalizeEmail(email);
        await withTimeout(
          ensureIdentifierHasSubscription(normalized),
          AUTH_TIMEOUT_MS,
          "Проверка аккаунта"
        );

        const auth = getFirebaseAuth();
        await auth.authStateReady();
        const continueUrl = `${window.location.origin}/login`;

        await withTimeout(
          sendSignInLinkToEmail(auth, normalized, {
            url: continueUrl,
            handleCodeInApp: true,
          }),
          AUTH_TIMEOUT_MS,
          "Отправка ссылки"
        );

        window.localStorage.setItem(PENDING_EMAIL_KEY, normalized);
      },

      async completeEmailLink(emailLink: string, email?: string) {
        if (!configured) throw new Error("Firebase не настроен");
        const auth = getFirebaseAuth();
        await auth.authStateReady();
        if (!isSignInWithEmailLink(auth, emailLink)) {
          throw Object.assign(new Error("Это не ссылка для входа."), {
            code: "auth/invalid-action-code",
          });
        }

        const resolved = normalizeEmail(
          email || window.localStorage.getItem(PENDING_EMAIL_KEY) || ""
        );
        if (!resolved) {
          throw Object.assign(
            new Error("Введите email, на который пришла ссылка."),
            { code: "auth/missing-email" }
          );
        }

        await withTimeout(
          ensureIdentifierHasSubscription(resolved),
          AUTH_TIMEOUT_MS,
          "Проверка аккаунта"
        );
        await withTimeout(
          signInWithEmailLink(auth, resolved, emailLink),
          AUTH_TIMEOUT_MS,
          "Вход по ссылке"
        );
        window.localStorage.removeItem(PENDING_EMAIL_KEY);
      },

      async requestPhoneCode(phone: string) {
        if (!configured) throw new Error("Firebase не настроен");
        const e164 = normalizePhone(phone);
        if (!e164) {
          throw Object.assign(new Error("Некорректный номер телефона."), {
            code: "auth/invalid-phone-number",
          });
        }

        await withTimeout(
          ensureIdentifierHasSubscription(e164),
          AUTH_TIMEOUT_MS,
          "Проверка аккаунта"
        );

        const auth = getFirebaseAuth();
        const verifier = await createPhoneRecaptcha();

        try {
          return await withTimeout(
            signInWithPhoneNumber(auth, e164, verifier),
            AUTH_TIMEOUT_MS,
            "Отправка SMS"
          );
        } catch (err) {
          clearPhoneRecaptcha();
          throw err;
        }
      },

      async confirmPhoneCode(confirmation: ConfirmationResult, code: string) {
        await withTimeout(
          confirmation.confirm(code.trim()),
          AUTH_TIMEOUT_MS,
          "Проверка кода"
        );
        clearPhoneRecaptcha();
      },

      async signOut() {
        if (!configured) return;
        clearPhoneRecaptcha();
        await firebaseSignOut(getFirebaseAuth());
      },
    }),
    [user, loading, configured]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
}

export function mapAuthError(error: unknown): string {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
      ? (error as { code: string }).code
      : "";

  const message =
    error instanceof Error
      ? error.message
      : "Не удалось войти. Попробуйте ещё раз.";

  if (typeof window !== "undefined" && (code || message)) {
    console.warn("[TapVPN auth]", code || "no-code", message);
  }

  switch (code) {
    case "identifier-not-found":
      return message;
    case "auth/invalid-email":
      return "Некорректный email.";
    case "auth/missing-email":
      return "Введите email, на который пришла ссылка.";
    case "auth/invalid-action-code":
      return "Ссылка для входа недействительна или устарела.";
    case "auth/invalid-phone-number":
      return "Некорректный номер телефона.";
    case "auth/invalid-verification-code":
      return "Неверный код из SMS.";
    case "auth/too-many-requests":
      return "Слишком много попыток. Попробуйте позже.";
    case "auth/network-request-failed":
      return "Не удалось отправить SMS. Отключите VPN/блокировщик и попробуйте снова.";
    case "auth/timeout":
      return message;
    case "auth/missing-recaptcha":
      return message;
    case "auth/captcha-check-failed":
    case "auth/invalid-app-credential":
      return "Проверка безопасности не прошла. Обновите страницу и попробуйте снова.";
    case "auth/operation-not-allowed":
      return "Вход по телефону отключён в настройках Firebase.";
    case "auth/quota-exceeded":
      return "Превышен лимит SMS. Попробуйте позже или войдите по email.";
    case "auth/user-disabled":
      return "Этот аккаунт отключён.";
    case "unavailable":
    case "firestore/unavailable":
      return "Сервер временно недоступен. Попробуйте через минуту.";
    default:
      if (message.includes("не настроен")) {
        return "Firebase не настроен. Добавьте ключи в .env.local.";
      }
      if (message.includes("активируйте") || message.includes("нет ответа")) {
        return message;
      }
      return message || "Не удалось войти. Попробуйте ещё раз.";
  }
}

export function getPendingEmail(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(PENDING_EMAIL_KEY) || "";
}

export { RECAPTCHA_CONTAINER_ID };

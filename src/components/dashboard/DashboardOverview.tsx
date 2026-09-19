"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ConnectionOrb } from "@/components/ui/ConnectionOrb";
import { ActivationKey } from "@/components/dashboard/ActivationKey";
import { DeviceList } from "@/components/dashboard/DeviceList";
import { DownloadApps } from "@/components/dashboard/DownloadApps";
import { SubscriptionModal } from "@/components/dashboard/SubscriptionModal";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatDate } from "@/lib/format";
import {
  formatLicenseKey,
  formatPlanLabel,
  resolveLicenseKey,
  restoreSubscriptionIfNeeded,
  watchDevices,
  watchSubscription,
  type AccountDevice,
  type SubscriptionData,
} from "@/lib/subscription";

export function DashboardOverview() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [devices, setDevices] = useState<AccountDevice[]>([]);
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelledLocally, setCancelledLocally] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setSubscription(null);
      setDevices([]);
      setLicenseKey(null);
      return;
    }

    let cancelled = false;
    let unsubSub: (() => void) | undefined;
    let unsubDevices: (() => void) | undefined;

    async function start() {
      setLoading(true);
      try {
        await restoreSubscriptionIfNeeded(user!);
      } catch {
        // продолжаем слушать Firestore даже если restore не удался
      }

      if (cancelled) return;

      unsubSub = watchSubscription(
        user!.uid,
        async (sub) => {
          if (cancelled) return;
          setSubscription(sub);
          try {
            const key = await resolveLicenseKey(user!, sub);
            if (!cancelled) setLicenseKey(key);
          } catch {
            if (!cancelled) setLicenseKey(sub?.licenseKey ?? null);
          }
          setLoading(false);
        },
        () => {
          if (!cancelled) setLoading(false);
        }
      );

      unsubDevices = watchDevices(user!.uid, (list) => {
        if (!cancelled) setDevices(list);
      });
    }

    void start();

    return () => {
      cancelled = true;
      unsubSub?.();
      unsubDevices?.();
    };
  }, [user]);

  const isActive = Boolean(subscription?.active) && !cancelledLocally;
  const planLabel = formatPlanLabel(subscription?.plan);
  const expiryLabel = subscription?.expiresAt
    ? formatDate(subscription.expiresAt)
    : "—";
  const activationKey = formatLicenseKey(licenseKey ?? subscription?.licenseKey);
  const hasDeviceOnline = devices.some((d) => {
    if (!d.lastActiveAt) return false;
    return Date.now() - d.lastActiveAt.getTime() < 2 * 60 * 1000;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {user?.email || user?.phoneNumber ? (
        <div className="rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-ink-dim">
          Аккаунт:{" "}
          <span className="font-semibold text-ink">
            {user.email || user.phoneNumber}
          </span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="flex justify-center lg:justify-start">
          <ConnectionOrb size={140} />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Статус подписки
              </span>
              <Badge tone={isActive ? "success" : "neutral"} className="w-fit">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-success" : "bg-ink-faint"
                  }`}
                />
                {isActive ? "Активна" : "Не активна"}
              </Badge>
            </div>
            <Button size="sm" variant="secondary" onClick={() => setModalOpen(true)}>
              Управление подпиской
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-ink-faint">Тариф</span>
              <span className="text-sm font-semibold text-ink">{planLabel}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-ink-faint">Дата окончания</span>
              <span className="text-sm font-semibold text-ink">{expiryLabel}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-ink-faint">Устройство</span>
              <span className="text-sm font-semibold text-ink">
                {devices.length > 0
                  ? hasDeviceOnline
                    ? "В сети"
                    : "Зарегистрировано"
                  : "Не используется"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {!subscription ? (
        <div className="rounded-2xl border border-border bg-surface/60 p-6 text-sm text-ink-dim">
          Активная подписка не найдена. Активируйте ключ в приложении TAP VPN,
          затем войдите снова — доступ появится автоматически.
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-7">
          <DeviceList devices={devices} />
        </div>
        <div className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-7">
          {activationKey ? (
            <ActivationKey activationKey={activationKey} />
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Ключ активации
              </span>
              <p className="text-sm text-ink-dim">
                {subscription
                  ? "Подписка активна, но ключ не найден в данных аккаунта. Обновите страницу или войдите снова."
                  : "Ключ пока не привязан к аккаунту."}
              </p>
            </div>
          )}
        </div>
      </div>

      <DownloadApps />

      <SubscriptionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isActive={isActive}
        onCancelSubscription={() => setCancelledLocally(true)}
      />
    </div>
  );
}

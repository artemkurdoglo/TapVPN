"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertIcon, ArrowRightIcon } from "@/components/ui/icons";

export function SubscriptionModal({
  open,
  onClose,
  onCancelSubscription,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  onCancelSubscription: () => void;
  isActive: boolean;
}) {
  const [confirmingCancel, setConfirmingCancel] = useState(false);

  function handleClose() {
    setConfirmingCancel(false);
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Управление подпиской">
      {confirmingCancel ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3.5 text-sm text-danger">
            <AlertIcon className="h-4 w-4 shrink-0" />
            <span>
              Автопродление будет отключено. Доступ сохранится до конца
              оплаченного периода.
            </span>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setConfirmingCancel(false)}
            >
              Назад
            </Button>
            <button
              type="button"
              onClick={() => {
                onCancelSubscription();
                handleClose();
              }}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-danger text-[15px] font-semibold text-bg transition-all duration-200 hover:brightness-110"
            >
              Подтвердить
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Link
            href="/#pricing"
            onClick={handleClose}
            className="flex items-center justify-between rounded-xl border border-border bg-surface/60 px-4 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-border-strong"
          >
            Изменить тариф
            <ArrowRightIcon className="h-4 w-4 text-ink-faint" />
          </Link>

          <button
            type="button"
            disabled
            className="flex cursor-not-allowed items-center justify-between rounded-xl border border-border bg-surface/60 px-4 py-3.5 text-left text-sm font-semibold text-ink-faint"
          >
            История платежей
            <span className="text-xs font-medium">Скоро</span>
          </button>

          {isActive ? (
            <button
              type="button"
              onClick={() => setConfirmingCancel(true)}
              className="flex items-center justify-between rounded-xl border border-danger/30 bg-danger-soft px-4 py-3.5 text-left text-sm font-semibold text-danger transition-colors hover:brightness-110"
            >
              Отменить подписку
            </button>
          ) : (
            <div className="rounded-xl border border-border bg-surface/60 px-4 py-3.5 text-sm text-ink-dim">
              Автопродление отключено. Подписка активна до конца периода.
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

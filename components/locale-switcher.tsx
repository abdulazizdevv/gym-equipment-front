"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, ChevronRight, Globe, Languages, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LOCALE_CODE: Record<(typeof routing.locales)[number], string> = {
  en: "EN",
  ru: "RU",
  uz: "UZ",
};

type LocaleSwitcherProps = {
  className?: string;
};

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as (typeof routing.locales)[number];
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const closeOnDesktop = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", closeOnDesktop);
    return () => mq.removeEventListener("change", closeOnDesktop);
  }, []);

  const selectLocale = (loc: string) => {
    router.replace(pathname, { locale: loc });
    setOpen(false);
  };

  const mobileSheet =
    open &&
    mounted &&
    createPortal(
      <>
        <button
          type="button"
          className="fixed inset-0 z-[200] bg-black/55 backdrop-blur-[2px] transition-opacity"
          aria-label={t("close")}
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="locale-sheet-title"
          className="fixed right-0 bottom-0 left-0 z-[201] max-h-[min(85vh,32rem)] animate-in slide-in-from-bottom-4 fade-in duration-300"
        >
          <div className="rounded-t-3xl border border-border border-b-0 bg-card/95 px-4 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="mx-auto mb-3 h-1 w-10 shrink-0 rounded-full bg-muted-foreground/35" aria-hidden />
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p id="locale-sheet-title" className="font-display text-lg font-semibold text-foreground">
                  {t("label")}
                </p>
                <p className="text-xs text-muted-foreground">{t("sheetHint")}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/80 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground touch-manipulation"
                aria-label={t("close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex max-h-[min(55vh,22rem)] flex-col gap-2 overflow-y-auto overscroll-contain pb-1">
              {routing.locales.map((loc) => {
                const active = locale === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => selectLocale(loc)}
                    className={cn(
                      "flex min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors touch-manipulation active:scale-[0.99]",
                      active
                        ? "border-primary/40 bg-primary/12 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.2)]"
                        : "border-border/80 bg-secondary/40 hover:border-primary/25 hover:bg-secondary",
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-base font-semibold text-foreground">{t(loc)}</div>
                      <div className="mt-0.5 font-mono text-xs text-muted-foreground">{LOCALE_CODE[loc]}</div>
                    </div>
                    {active ? (
                      <Check className="h-6 w-6 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
                    ) : (
                      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/45" aria-hidden />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </>,
      document.body,
    );

  return (
    <div className={cn("inline-flex max-w-full min-w-0 items-center", className)}>
      <span className="sr-only">{t("label")}</span>

      {/* Mobile: globus + joriy kod, sheet orqali tanlash */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-haspopup="dialog"
          className="flex h-11 min-w-[3.25rem] items-center justify-center gap-1.5 rounded-xl border border-border bg-secondary/90 px-2.5 shadow-sm backdrop-blur-sm transition-all touch-manipulation active:scale-[0.98] hover:border-primary/40 hover:bg-secondary"
        >
          <Globe className="h-[18px] w-[18px] shrink-0 text-primary" aria-hidden />
          <span className="font-display text-[11px] font-bold tracking-wider text-primary">{LOCALE_CODE[locale]}</span>
        </button>
        {mobileSheet}
      </div>

      {/* Desktop: select */}
      <div className="group relative hidden max-w-full min-w-0 items-center sm:inline-flex">
        <div className="pointer-events-none absolute left-2.5 z-10 text-primary/90 transition-colors group-hover:text-primary">
          <Languages className="h-3.5 w-3.5" aria-hidden />
        </div>
        <select
          value={locale}
          onChange={(e) => router.replace(pathname, { locale: e.target.value })}
          aria-label={t("label")}
          className={cn(
            "font-body relative z-0 w-full min-w-32 cursor-pointer appearance-none truncate rounded-xl border border-border bg-secondary/80 py-2 pr-9 pl-9 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm transition-all duration-200",
            "hover:border-primary/35 hover:bg-secondary hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.12)]",
            "focus:border-primary/50 focus:ring-2 focus:ring-primary/25 focus:outline-none",
          )}
        >
          {routing.locales.map((loc) => (
            <option key={loc} value={loc} className="bg-card text-foreground">
              {t(loc)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-2 z-10 text-muted-foreground transition-colors group-hover:text-primary">
          <ChevronDown className="h-3.5 w-3.5 opacity-80" aria-hidden />
        </div>
      </div>
    </div>
  );
}

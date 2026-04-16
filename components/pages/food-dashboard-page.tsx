"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import {
  BicepsFlexed,
  UtensilsCrossed,
  X,
  Loader2,
  Sparkles,
  History,
} from "lucide-react"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { Button } from "@/components/ui/button"
import { HeaderActionLink } from "@/components/ui/header-action"
import { IconButton } from "@/components/ui/icon-button"
import { Link, useRouter } from "@/i18n/navigation"

export function FoodDashboardPage() {
  const t = useTranslations("FoodDashboard")
  const tc = useTranslations("Common")
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const setImageFile = (file: File | null) => {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return file ? URL.createObjectURL(file) : null
    })
    setSelectedFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setImageFile(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  const handleAnalyze = () => {
    if (!selectedFile || isAnalyzing) return
    setIsAnalyzing(true)
    setTimeout(() => {
      router.push("/food/result")
    }, 1400)
  }

  return (
    <div className="gradient-mesh min-h-screen bg-background">
      <header className="glass sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
        <div className="container mx-auto flex min-h-14 items-center justify-between gap-2 px-3 sm:min-h-16 sm:px-4">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
              <BicepsFlexed className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display truncate text-base font-bold text-foreground sm:text-lg">
              Mus<span className="text-primary">kul</span>
            </span>
          </Link>
          <div className="-mr-1 flex min-w-0 max-w-[min(100%,calc(100vw-5.5rem))] flex-nowrap items-center justify-end gap-1 overflow-x-auto overflow-y-hidden py-0.5 [-webkit-overflow-scrolling:touch] sm:mr-0 sm:max-w-none sm:gap-3 sm:overflow-visible sm:py-0">
            <LocaleSwitcher className="shrink-0" />
            <HeaderActionLink
              href="/dashboard"
              icon={<BicepsFlexed className="h-4 w-4 shrink-0" />}
              label={tc("dashboard")}
            />
            <HeaderActionLink
              href="/food/history"
              icon={<History className="h-4 w-4 shrink-0" />}
              label={tc("history")}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-3 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-12">
        <div className="space-y-8">
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
              <UtensilsCrossed className="h-3 w-3" />
              {t("badge")}
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-md px-1 text-sm text-muted-foreground sm:px-0 sm:text-base">
              {t("subtitle")}
            </p>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
              previewUrl
                ? "border-accent/40 bg-accent/5"
                : isDragging
                  ? "scale-[1.01] border-accent bg-accent/10"
                  : "border-border bg-card/50 hover:border-accent/30"
            }`}
          >
            {previewUrl ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element -- object URLs from user upload */}
                <img
                  src={previewUrl}
                  alt={t("imageAlt")}
                  className="mx-auto max-h-[500px] w-full object-contain"
                />
                <IconButton
                  type="button"
                  onClick={() => setImageFile(null)}
                  icon={<X className="h-4 w-4" />}
                  variant="glass"
                  size="sm"
                  className="absolute top-4 right-8 sm:right-4"
                  aria-label={t("removeImage")}
                />

                {isAnalyzing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="animate-scan h-1 w-full bg-linear-to-r from-transparent via-accent to-transparent" />
                    </div>
                    <div className="glass mx-3 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-xl px-4 py-3 sm:mx-0 sm:max-w-none sm:gap-3 sm:px-6 sm:py-4">
                      <Loader2 className="h-5 w-5 shrink-0 animate-spin text-accent" />
                      <span className="font-display text-sm font-medium text-foreground sm:text-base">
                        {t("analyzing")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="cursor-pointer space-y-4 p-5 text-center sm:space-y-6 sm:p-8 md:p-16"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="animate-float mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 sm:h-20 sm:w-20">
                  <UtensilsCrossed className="h-8 w-8 text-accent sm:h-10 sm:w-10" />
                </div>
                <div className="space-y-2">
                  <p className="font-display text-base font-semibold text-foreground sm:text-lg">
                    {t("dropTitle")}
                  </p>
                  <p className="text-sm text-muted-foreground">{t("dropHint")}</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 gap-x-4 text-[11px] text-muted-foreground sm:text-xs">
                  <span>{t("formats")}</span>
                  <span className="bg-muted-foreground h-1 w-1 rounded-full" />
                  <span>{t("maxSize")}</span>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {selectedFile && !isAnalyzing && (
            <div className="text-center">
              <Button
                type="button"
                onClick={handleAnalyze}
                variant="primary"
                size="lg"
                className="group w-full min-h-12 gap-3 bg-accent text-base text-accent-foreground hover:opacity-90 sm:w-auto sm:min-h-11 sm:px-10 sm:text-lg"
              >
                <Sparkles className="h-5 w-5" />
                {t("analyzeBtn")}
              </Button>
            </div>
          )}

          <div className="space-y-4 pt-8">
            <h2 className="font-display flex items-center gap-2 text-lg font-semibold text-foreground">
              <History className="h-4 w-4 text-accent" />
              {t("recentTitle")}
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[1, 2, 3, 4].map((id) => (
                <Link
                  key={id}
                  href="/food/result"
                  className="group space-y-2 rounded-xl glass p-3 transition-colors hover:border-accent/30"
                >
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-secondary">
                    <UtensilsCrossed className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                  <div>
                    <p className="truncate text-xs font-medium text-foreground transition-colors group-hover:text-accent">
                      {t("dishTitle", { id })}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {t("hoursAgo")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

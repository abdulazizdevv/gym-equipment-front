"use client"

import { useMemo, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl"
import {
  BicepsFlexed,
  Camera,
  X,
  Loader2,
  LogOut,
  History,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { Button } from "@/components/ui/button"
import { HeaderAction, HeaderActionLink } from "@/components/ui/header-action"
import { IconButton } from "@/components/ui/icon-button"
import { Link, useRouter } from "@/i18n/navigation"
import { getAiSessions, postAiEquipmentSearch } from "@/lib/api/ai"
import { getApiErrorMessage } from "@/lib/api/http"
import { useAuthStore } from "@/stores/auth"
import { useAiStore } from "@/stores/ai"

export function DashboardPage() {
  const t = useTranslations("Dashboard")
  const tc = useTranslations("Common")
  const locale = useLocale()
  const router = useRouter()
  const queryClient = useQueryClient()
  const logout = useAuthStore((s) => s.logout)
  const setAiResult = useAiStore((s) => s.setResult)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const recentQuery = useQuery({
    queryKey: ["ai-sessions-recent", locale],
    queryFn: () => getAiSessions({ lang: locale, page: 1, limit: 4 }),
  })

  const recent = useMemo(
    () =>
      (recentQuery.data?.items ?? []).map((x) => ({
        id: x.id,
        title: x.title?.trim() || `Session #${x.id}`,
        imageUrl: x.imageUrl
          ? `${process.env.NEXT_PUBLIC_API_URL ?? ""}${x.imageUrl}`
          : null,
        createdAt: x.createdAt,
      })),
    [recentQuery.data],
  )

  const analyzeMutation = useMutation({
    mutationFn: (file: File) =>
      postAiEquipmentSearch({
        image: file,
        lang: locale,
      }),
    onSuccess: (res) => {
      setAiResult({ sessionId: res.sessionId, data: res.data })
      queryClient.invalidateQueries({
        queryKey: ["ai-sessions-recent", locale],
      })
      router.push(`/result?sessionId=${res.sessionId}`)
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err))
    },
  })

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

  const handleAnalyze = async () => {
    if (!selectedFile) return
    if (analyzeMutation.isPending) return
    await analyzeMutation.mutateAsync(selectedFile)
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
          <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-3">
            <LocaleSwitcher className="shrink-0" />
            <HeaderActionLink
              href="/history"
              icon={<History className="h-4 w-4 shrink-0" />}
              label={tc("history")}
            />
            <HeaderAction
              icon={<LogOut className="h-4 w-4 shrink-0" />}
              label={tc("logout")}
              onClick={() => {
                logout()
                router.push("/auth")
              }}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-3 py-8 sm:px-4 sm:py-12">
        <div className="space-y-8">
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" />
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
                ? "border-primary/40 bg-primary/5"
                : isDragging
                  ? "scale-[1.01] border-primary bg-primary/10"
                  : "border-border bg-card/50 hover:border-primary/30"
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
                  aria-label="Remove image"
                />

                {analyzeMutation.isPending && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="animate-scan h-1 w-full bg-linear-to-r from-transparent via-primary to-transparent" />
                    </div>
                    <div className="glass mx-3 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-xl px-4 py-3 sm:mx-0 sm:max-w-none sm:gap-3 sm:px-6 sm:py-4">
                      <Loader2 className="h-5 w-5 shrink-0 animate-spin text-primary" />
                      <span className="font-display text-sm font-medium text-foreground sm:text-base">
                        {t("analyzing")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="cursor-pointer space-y-5 p-8 text-center sm:space-y-6 sm:p-16"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="animate-float mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 sm:h-20 sm:w-20">
                  <Camera className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
                </div>
                <div className="space-y-2">
                  <p className="font-display text-base font-semibold text-foreground sm:text-lg">
                    {t("dropTitle")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("dropHint")}
                  </p>
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

          {selectedFile && (
            <div className="text-center">
              <Button
                type="button"
                onClick={handleAnalyze}
                variant="primary"
                size="lg"
                disabled={analyzeMutation.isPending}
                className="group w-full gap-3 sm:w-auto sm:px-10 sm:text-lg"
              >
                {analyzeMutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="h-5 w-5" />
                )}
                {t("analyzeBtn")}
              </Button>
            </div>
          )}

          <div className="space-y-4 pt-8">
            <h2 className="font-display flex items-center gap-2 text-lg font-semibold text-foreground">
              <History className="h-4 w-4 text-primary" />
              {t("recentTitle")}
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {recent.map((item) => (
                <Link
                  key={item.id}
                  href={`/result?sessionId=${item.id}`}
                  className="group space-y-2 rounded-xl glass p-3 transition-colors hover:border-primary/30"
                >
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-secondary">
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- backend-hosted upload preview
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <BicepsFlexed className="h-8 w-8 text-muted-foreground/30" />
                    )}
                  </div>
                  <div>
                    <p className="truncate text-xs font-medium text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString(locale)}
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

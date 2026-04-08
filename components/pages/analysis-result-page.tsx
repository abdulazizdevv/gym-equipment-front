"use client"

import { useMemo } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import {
  BicepsFlexed,
  ArrowLeft,
  Target,
  Zap,
  Info,
  ChevronRight,
  BookOpen,
  Star,
  AlertTriangle,
  Sparkles,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { HeaderActionLink } from "@/components/ui/header-action"
import { PreviewImage } from "@/components/ui/preview-image"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import {
  getAiSessionById,
  getLatestSessionResult,
  getSessionUploadImageUrl,
  getLatestSessionPost,
  postAiGenerateImage,
} from "@/lib/api/ai"
import { getApiErrorMessage, getUploadUrl } from "@/lib/api/http"
import { useAiStore } from "@/stores/ai"

function renderBoldInline(text: string) {
  const parts = text.split("**")
  if (parts.length === 1) return <>{text}</>
  return (
    <>
      {parts.map((p, idx) =>
        idx % 2 === 1 ? (
          <strong key={idx} className="font-semibold text-foreground">
            {p}
          </strong>
        ) : (
          <span key={idx}>{p}</span>
        ),
      )}
    </>
  )
}


export function AnalysisResultPage() {
  const t = useTranslations("Result")
  const tc = useTranslations("Common")
  const locale = useLocale()
  const searchParams = useSearchParams()
  const sessionIdParam = searchParams.get("sessionId")
  const sessionId = sessionIdParam ? Number(sessionIdParam) : null
  const queryClient = useQueryClient()

  const storeSessionId = useAiStore((s) => s.sessionId)
  const storeData = useAiStore((s) => s.data)

  const sessionQuery = useQuery({
    queryKey: ["ai-session", locale, sessionId],
    queryFn: async () => {
      const session = await getAiSessionById(sessionId as number, {
        lang: locale,
      })
      const result = getLatestSessionResult(session)
      if (result && sessionId) {
        useAiStore.getState().setResult({ sessionId, data: result })
      }
      return session
    },
    enabled: Boolean(sessionId),
  })

  const { analysis, uploadImagePath, postId } = useMemo(() => {
    const session = sessionQuery.data
    const post = getLatestSessionPost(session)
    const fromApi = post?.result
    const fallback =
      sessionId != null && storeSessionId === sessionId ? storeData : null
    return {
      analysis: fromApi ?? fallback ?? null,
      uploadImagePath: getSessionUploadImageUrl(session),
      postId: post?.id ?? null,
    }
  }, [sessionQuery.data, sessionId, storeSessionId, storeData])

  const generateImageMutation = useMutation({
    mutationFn: (args: { sId: number; pId: number }) =>
      postAiGenerateImage({
        sessionId: args.sId,
        postId: args.pId,
        lang: locale,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ai-session", locale, sessionId],
      })
      toast.success(t("generateSuccess"))
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err))
    },
  })

  const handleGenerateImage = () => {
    if (sessionId && postId) {
      generateImageMutation.mutate({ sId: sessionId, pId: postId })
    }
  }

  const equipmentName = analysis?.equipment?.name ?? t("title")
  const confidenceText =
    typeof analysis?.equipment?.confidence === "number"
      ? `${Math.round(analysis.equipment.confidence * 100)}%`
      : null

  const heroSrc = uploadImagePath ? getUploadUrl(uploadImagePath) : ""

  const galleryImages = useMemo(() => {
    const list = analysis?.images ?? []
    if (!uploadImagePath) return list
    const uploadAbs = getUploadUrl(uploadImagePath)
    return list.filter((img) => getUploadUrl(img.url) !== uploadAbs)
  }, [analysis, uploadImagePath])

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
              href="/dashboard"
              icon={<ArrowLeft className="h-4 w-4 shrink-0" />}
              label={tc("back")}
              className="min-w-0 px-1.5 sm:px-2"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="glass overflow-hidden rounded-2xl">
              {heroSrc ? (
                <PreviewImage
                  src={heroSrc}
                  alt={equipmentName}
                  caption={equipmentName}
                  className="aspect-4/3 w-full object-cover"
                />
              ) : (
                <div className="flex aspect-4/3 items-center justify-center bg-secondary">
                  <BicepsFlexed className="h-16 w-16 text-muted-foreground/20" />
                </div>
              )}
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span className="text-xs font-medium text-primary">
                    {t("aiDetected")}
                  </span>
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {equipmentName}
                </h1>
                {confidenceText ? (
                  <p className="text-sm text-muted-foreground">
                    {t("confidence", { value: confidenceText })}
                  </p>
                ) : null}
                <div className="flex flex-wrap gap-2 pt-1">
                  {analysis?.equipment?.name ? (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {t("resultReady")}
                    </span>
                  ) : (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {t("noResult")}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="glass space-y-1 rounded-xl p-4 text-center">
                <Target className="mx-auto h-5 w-5 text-primary" />
                <p className="text-xs text-muted-foreground">
                  {t("targetMuscles")}
                </p>
                <p className="truncate font-display text-sm font-semibold text-foreground">
                  {analysis?.muscles?.length ?? "-"}
                </p>
              </div>
              <div className="glass space-y-1 rounded-xl p-4 text-center">
                <Zap className="mx-auto h-5 w-5 text-accent" />
                <p className="text-xs text-muted-foreground">
                  {t("confidenceShort")}
                </p>
                <p className="font-display text-sm font-semibold text-foreground">
                  {confidenceText ?? "-"}
                </p>
              </div>
            </div>

            <div className="glass space-y-3 rounded-2xl p-5">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  {t("aiImage")}
                </h3>
              </div>
              {galleryImages.length ? (
                <div className="space-y-3">
                  {galleryImages.map((image, idx) => (
                    <div
                      key={`${image.url}-${idx}`}
                      className="overflow-hidden rounded-xl border border-border/60 bg-secondary/30"
                    >
                      <PreviewImage
                        src={getUploadUrl(image.url) ?? ""}
                        alt={image.caption || `${equipmentName} ${idx + 1}`}
                        caption={image.caption || `${equipmentName} ${idx + 1}`}
                        className="aspect-video w-full object-cover"
                      />
                      {image.caption ? (
                        <p className="line-clamp-2 p-2 text-[11px] text-muted-foreground">
                          {image.caption}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3 rounded-2xl border border-dashed border-border bg-secondary/30 p-6 text-center transition-colors hover:bg-secondary/50">
                  <p className="text-xs leading-relaxed text-muted-foreground max-w-[250px] mx-auto">
                    {t("noAiImageText")}
                  </p>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleGenerateImage}
                    disabled={
                      generateImageMutation.isPending || !sessionId || !postId
                    }
                    className="gap-2 mt-2 h-9 px-4 shadow-sm"
                  >
                    {generateImageMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    {generateImageMutation.isPending
                      ? t("generating")
                      : t("generateImageBtn")}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-3">
            <div className="glass space-y-4 rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">
                  {t("description")}
                </h2>
              </div>
              {sessionQuery.isPending ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("loading")}
                </p>
              ) : sessionQuery.isError ? (
                <p className="text-sm leading-relaxed text-destructive">
                  {getApiErrorMessage(sessionQuery.error)}
                </p>
              ) : analysis ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("detectedEquipment", { name: analysis.equipment.name })}
                </p>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("openFromDashboard")}
                </p>
              )}
            </div>

            {analysis?.usage?.steps?.length ? (
              <div className="glass space-y-4 rounded-2xl p-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    {t("howToUse")}
                  </h2>
                </div>
                <div className="space-y-2">
                  {analysis.usage.steps.map((line, i) => (
                    <div
                      key={i}
                      className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap"
                    >
                      {renderBoldInline(line)}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {analysis?.muscles?.length ? (
              <div className="glass space-y-5 rounded-2xl p-6">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    {t("targetMuscles")}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.muscles.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-foreground"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              {analysis?.usage?.cues?.length ? (
                <div className="glass space-y-4 rounded-2xl p-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      {t("cuesTitle")}
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {analysis.usage.cues.map((x, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {x}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {analysis?.usage?.commonMistakes?.length ? (
                <div className="glass space-y-4 rounded-2xl p-6">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      {t("mistakesTitle")}
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {analysis.usage.commonMistakes.map((x, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {x}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {analysis?.tips?.length ? (
              <div className="glass space-y-4 rounded-2xl p-6">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    {t("tips")}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {analysis.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {tip}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-4 font-display font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {t("newAnalysis")}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

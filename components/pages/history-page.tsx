"use client"

import { useMemo, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl"
import { Dumbbell, ArrowLeft, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { HeaderActionLink } from "@/components/ui/header-action"
import { IconButton } from "@/components/ui/icon-button"
import { Link } from "@/i18n/navigation"
import { deleteAiSession, getAiSessions } from "@/lib/api/ai"
import { getApiErrorMessage } from "@/lib/api/http"

type HistoryItem = {
  id: number
  name: string
  category: string
  date: string
  time: string
  imageUrl: string | null
}

function uploadsUrl(pathOrUrl: string | null) {
  if (!pathOrUrl) return null
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://"))
    return pathOrUrl
  const base = process.env.NEXT_PUBLIC_API_URL ?? ""
  return `${base}${pathOrUrl}`
}

export function HistoryPage() {
  const t = useTranslations("History")
  const tc = useTranslations("Common")
  const queryClient = useQueryClient()
  const locale = useLocale()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [page, setPage] = useState(1)
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current)
    searchDebounceRef.current = setTimeout(() => {
      setDebouncedSearch(value.trim())
      setPage(1)
    }, 350)
  }

  const historyQuery = useQuery({
    queryKey: ["ai-sessions", locale, page, debouncedSearch],
    queryFn: () =>
      getAiSessions({
        lang: locale,
        page,
        limit: 10,
        q: debouncedSearch || undefined,
      }),
  })

  const items = useMemo<HistoryItem[]>(
    () =>
      (historyQuery.data?.items ?? []).map((session) => {
        const equipmentName = session.title?.trim() || `Session #${session.id}`
        const category = session.primaryMuscle?.trim() || "AI"
        const d = new Date(session.createdAt)
        return {
          id: session.id,
          name: equipmentName,
          category,
          date: d.toLocaleDateString(locale),
          time: d.toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
          }),
          imageUrl: uploadsUrl(session.imageUrl ?? null),
        }
      }),
    [historyQuery.data, locale],
  )

  const total = historyQuery.data?.meta.total ?? items.length
  const totalPages = historyQuery.data?.meta.totalPages ?? 1
  const loading = historyQuery.isPending

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAiSession(id, { lang: locale }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-sessions"] })
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err))
    },
  })

  const handleDelete = async (id: number) => {
    if (deleteMutation.isPending) return
    await deleteMutation.mutateAsync(id)
  }

  return (
    <div className="gradient-mesh min-h-screen bg-background">
      <header className="glass sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
        <div className="container mx-auto flex min-h-14 items-center justify-between gap-2 px-3 sm:min-h-16 sm:px-4">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
              <Dumbbell className="h-4 w-4 text-primary" />
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

      <main className="container mx-auto max-w-3xl px-3 py-6 sm:px-4 sm:py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("title")}
            </h1>
            <span className="text-xs text-muted-foreground">
              {t("count", { count: total })}
            </span>
          </div>

          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="pr-4 pl-10"
            />
          </div>

          {loading ? (
            <div className="glass rounded-xl p-4 text-sm text-muted-foreground">
              {t("loading")}
            </div>
          ) : items.length === 0 ? (
            <div className="glass rounded-xl p-4 text-sm text-muted-foreground">
              {t("empty")}
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/result?sessionId=${item.id}`}
                  className="group flex items-center gap-3 rounded-xl glass p-3 transition-all hover:border-primary/30 sm:gap-4 sm:p-4"
                >
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- backend-hosted upload preview
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-12 w-12 shrink-0 rounded-xl object-cover sm:h-14 sm:w-14"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary sm:h-14 sm:w-14">
                      <Dumbbell className="h-5 w-5 text-muted-foreground/30 sm:h-6 sm:w-6" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="min-w-0 flex-1 truncate font-display text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
                        {item.name}
                      </h3>
                      <span className="shrink-0 whitespace-nowrap text-[10px] text-muted-foreground sm:text-xs">
                        {item.date} · {item.time}
                      </span>
                    </div>
                    <div className="mt-1 flex min-w-0 items-center gap-2">
                      <span className="min-w-0 max-w-full truncate rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary sm:text-[11px]">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <IconButton
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleDelete(item.id)
                    }}
                    icon={<Trash2 className="h-4 w-4" />}
                    variant="ghost"
                    size="sm"
                    disabled={deleteMutation.isPending}
                    className="rounded-lg opacity-100 hover:bg-destructive/10 hover:text-destructive sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label={t("delete")}
                  />
                </Link>
              ))}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1 || loading}
                  className="rounded-lg border border-border px-3 py-1 text-xs text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-xs text-muted-foreground">
                  {page} / {Math.max(1, totalPages)}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages || loading}
                  className="rounded-lg border border-border px-3 py-1 text-xs text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

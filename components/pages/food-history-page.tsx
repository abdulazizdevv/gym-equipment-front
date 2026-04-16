"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { BicepsFlexed, UtensilsCrossed, ArrowLeft, Search, Trash2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { HeaderActionLink } from "@/components/ui/header-action"
import { IconButton } from "@/components/ui/icon-button"
import { Link } from "@/i18n/navigation"

type FoodHistoryItem = {
  id: number
  name: string
  category: string
  date: string
  time: string
}

const initialHistory: FoodHistoryItem[] = [
  { id: 1, name: "Osh (Palov)", category: "Main dish", date: "2026-04-15", time: "12:00" },
  { id: 2, name: "Caesar Salad", category: "Salad", date: "2026-04-14", time: "13:40" },
  { id: 3, name: "Lagman", category: "Soup", date: "2026-04-14", time: "10:30" },
  { id: 4, name: "Somsa", category: "Snack", date: "2026-04-13", time: "09:55" },
]

export function FoodHistoryPage() {
  const t = useTranslations("FoodHistory")
  const tc = useTranslations("Common")
  const [search, setSearch] = useState("")
  const [items, setItems] = useState(initialHistory)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q),
    )
  }, [items, search])

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
              href="/food"
              icon={<ArrowLeft className="h-4 w-4 shrink-0" />}
              label={tc("back")}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-3 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-display flex min-w-0 items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
              <UtensilsCrossed className="h-5 w-5 shrink-0 text-accent" />
              <span className="truncate">{t("title")}</span>
            </h1>
            <span className="shrink-0 text-xs text-muted-foreground">
              {t("count", { count: filtered.length })}
            </span>
          </div>

          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="pr-4 pl-10"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="glass rounded-xl p-4 text-sm text-muted-foreground">
              {t("empty")}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  href="/food/result"
                  className="group flex items-center gap-3 rounded-xl glass p-3 transition-all hover:border-accent/30 sm:gap-4 sm:p-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 sm:h-14 sm:w-14">
                    <UtensilsCrossed className="h-5 w-5 text-accent/40 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="min-w-0 flex-1 truncate font-display text-sm font-semibold text-foreground transition-colors group-hover:text-accent sm:text-base">
                        {item.name}
                      </h3>
                      <span className="shrink-0 whitespace-nowrap text-[10px] text-muted-foreground sm:text-xs">
                        {item.date} · {item.time}
                      </span>
                    </div>
                    <div className="mt-1 flex min-w-0 items-center gap-2">
                      <span className="min-w-0 max-w-full truncate rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent sm:text-[11px]">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <IconButton
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setItems((prev) => prev.filter((x) => x.id !== item.id))
                    }}
                    icon={<Trash2 className="h-4 w-4" />}
                    variant="ghost"
                    size="sm"
                    className="rounded-lg opacity-100 hover:bg-destructive/10 hover:text-destructive sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label={t("delete")}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

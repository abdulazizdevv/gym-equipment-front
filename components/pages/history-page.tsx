"use client";

import Link from "next/link";
import { Dumbbell, ArrowLeft, Search, Trash2 } from "lucide-react";

const mockHistory = [
  { id: 1, name: "Lat Pulldown Machine", category: "Orqa", date: "2024-03-15", time: "14:30" },
  { id: 2, name: "Leg Press Machine", category: "Oyoq", date: "2024-03-14", time: "10:15" },
  { id: 3, name: "Cable Crossover", category: "Ko'krak", date: "2024-03-13", time: "09:00" },
  { id: 4, name: "Smith Machine", category: "Universal", date: "2024-03-12", time: "16:45" },
  { id: 5, name: "Seated Row Machine", category: "Orqa", date: "2024-03-11", time: "11:20" },
  { id: 6, name: "Pec Deck Machine", category: "Ko'krak", date: "2024-03-10", time: "08:30" },
];

export function HistoryPage() {
  return (
    <div className="gradient-mesh min-h-screen bg-background">
      <header className="glass sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
              <Dumbbell className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              Gym<span className="text-primary">AI</span>
            </span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Orqaga
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-foreground">Tahlillar tarixi</h1>
            <span className="text-xs text-muted-foreground">{mockHistory.length} ta tahlil</span>
          </div>

          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Qidirish..."
              className="w-full rounded-xl border border-border bg-secondary py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {mockHistory.map((item) => (
              <Link
                key={item.id}
                href="/result"
                className="group flex items-center gap-4 rounded-xl glass p-4 transition-all hover:border-primary/30"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <Dumbbell className="h-6 w-6 text-muted-foreground/30" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display font-semibold text-foreground transition-colors group-hover:text-primary">
                    {item.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {item.date} · {item.time}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-colors hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

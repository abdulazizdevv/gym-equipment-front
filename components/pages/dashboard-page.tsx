"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dumbbell, Camera, X, Loader2, LogOut, History, Sparkles } from "lucide-react";

export function DashboardPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setSelectedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setSelectedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      router.push("/result");
    }, 2000);
  };

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
          <div className="flex items-center gap-3">
            <Link
              href="/history"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Tarix</span>
            </Link>
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8">
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              AI Tahlil
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Gym apparatingiz rasmini yuklang
            </h1>
            <p className="mx-auto max-w-md text-muted-foreground">
              {`AI apparatni aniqlab, to'liq ma'lumot va mashq tavsiyalarini beradi`}
            </p>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
              selectedImage
                ? "border-primary/40 bg-primary/5"
                : isDragging
                  ? "scale-[1.01] border-primary bg-primary/10"
                  : "border-border bg-card/50 hover:border-primary/30"
            }`}
          >
            {selectedImage ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element -- data URLs from user upload */}
                <img
                  src={selectedImage}
                  alt="Selected equipment"
                  className="mx-auto max-h-[500px] w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="glass absolute top-4 right-8 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-destructive/20 sm:right-4"
                >
                  <X className="h-4 w-4 text-foreground" />
                </button>

                {isAnalyzing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="animate-scan h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                    </div>
                    <div className="glass flex items-center gap-3 rounded-xl px-6 py-4">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="font-display font-medium text-foreground">AI tahlil qilmoqda...</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="cursor-pointer space-y-6 p-16 text-center" onClick={() => fileInputRef.current?.click()}>
                <div className="animate-float mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                  <Camera className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="font-display text-lg font-semibold text-foreground">Rasmni shu yerga tashlang</p>
                  <p className="text-sm text-muted-foreground">yoki bosing va faylni tanlang</p>
                </div>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>JPG, PNG, WEBP</span>
                  <span className="bg-muted-foreground h-1 w-1 rounded-full" />
                  <span>Max 10MB</span>
                </div>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          </div>

          {selectedImage && !isAnalyzing && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleAnalyze}
                className="group glow-primary inline-flex items-center gap-3 rounded-xl bg-primary px-10 py-4 font-display text-lg font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                <Sparkles className="h-5 w-5" />
                AI bilan tahlil qilish
              </button>
            </div>
          )}

          <div className="space-y-4 pt-8">
            <h2 className="font-display flex items-center gap-2 text-lg font-semibold text-foreground">
              <History className="h-4 w-4 text-primary" />
              {`So'nggi tahlillar`}
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Link
                  key={i}
                  href="/result"
                  className="group space-y-2 rounded-xl glass p-3 transition-colors hover:border-primary/30"
                >
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-secondary">
                    <Dumbbell className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                  <div>
                    <p className="truncate text-xs font-medium text-foreground transition-colors group-hover:text-primary">
                      Apparat #{i}
                    </p>
                    <p className="text-[10px] text-muted-foreground">2 soat oldin</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

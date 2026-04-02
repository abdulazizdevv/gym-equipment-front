"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Dumbbell, Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";

export function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    setIsSignup(mode === "signup");
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Auth submit:", { isSignup, ...formData });
  };

  return (
    <div className="gradient-mesh flex min-h-screen bg-background">
      <div className="relative hidden flex-1 items-center justify-center overflow-hidden lg:flex">
        <div className="animate-pulse-glow absolute top-1/3 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div
          className="animate-pulse-glow absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 max-w-md space-y-8 p-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Dumbbell className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              Gym<span className="text-primary">AI</span>
            </span>
          </Link>

          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold text-foreground">{`AI bilan gym apparatlarini o'rganing`}</h2>
            <p className="leading-relaxed text-muted-foreground">
              Rasm yuklang, AI apparatni aniqlasin — qanday ishlatish, qaysi muskullar uchun foydali — hammasi bir
              joyda.
            </p>
          </div>

          <div className="space-y-4">
            {["500+ gym apparat bazasi", "Tez AI tahlil — 2 soniya", "Muskullar xaritasi"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">
                Gym<span className="text-primary">AI</span>
              </span>
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="font-display text-2xl font-bold text-foreground">
              {isSignup ? "Ro'yxatdan o'tish" : "Tizimga kirish"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignup ? "Bepul hisob yarating va boshlang" : "Hisobingizga kiring"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Ism</label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-secondary py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground transition-shadow focus:ring-2 focus:ring-primary/30 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Email</label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-border bg-secondary py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground transition-shadow focus:ring-2 focus:ring-primary/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Parol</label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-xl border border-border bg-secondary py-3 pr-10 pl-10 text-sm text-foreground placeholder:text-muted-foreground transition-shadow focus:ring-2 focus:ring-primary/30 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="glow-primary flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-display font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              {isSignup ? "Ro'yxatdan o'tish" : "Kirish"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">yoki</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google bilan kirish
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? "Hisobingiz bormi?" : "Hisobingiz yo'qmi?"}{" "}
            <button type="button" onClick={() => setIsSignup(!isSignup)} className="font-medium text-primary hover:underline">
              {isSignup ? "Kirish" : "Ro'yxatdan o'tish"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

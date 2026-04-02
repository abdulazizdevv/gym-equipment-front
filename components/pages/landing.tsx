import Link from "next/link";
import {
  Camera,
  Cpu,
  Zap,
  Target,
  ArrowRight,
  Dumbbell,
  Brain,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Rasm yuklang",
    description: "Gym apparatingiz rasmini yuklang — AI uni bir zumda aniqlaydi",
  },
  {
    icon: Brain,
    title: "AI tahlil",
    description: "Sun'iy intellekt apparat turini, funksiyasini va xususiyatlarini tahlil qiladi",
  },
  {
    icon: Target,
    title: "Maqsadli muskullar",
    description: "Qaysi mushak guruhlarini ishlatishini aniq ko'rsatib beradi",
  },
  {
    icon: Zap,
    title: "Mashq rejasi",
    description: "Apparat bilan samarali mashq qilish bo'yicha tavsiyalar",
  },
];

const stats = [
  { value: "500+", label: "Gym apparatlari" },
  { value: "50+", label: "Mushak guruhlari" },
  { value: "99%", label: "Aniqlik darajasi" },
  { value: "2s", label: "Tahlil vaqti" },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 z-50 w-full glass">
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
              href="/auth"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Kirish
            </Link>
            <Link
              href="/auth?mode=signup"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Boshlash
            </Link>
          </div>
        </div>
      </nav>

      <section className="gradient-mesh relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="animate-pulse-glow absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div
          className="animate-pulse-glow absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 pt-24">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Cpu className="h-3.5 w-3.5" />
              AI bilan quvvatlangan
            </div>

            <h1 className="font-display text-5xl leading-tight font-bold md:text-7xl">
              Gym apparatingizni <span className="text-gradient">AI bilan</span> tahlil qiling
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {`Rasm yuklang — sun'iy intellekt apparatni aniqlaydi, qanday foydalanishni o'rgatadi va qaysi muskullarni ishlatishini ko'rsatadi`}
            </p>

            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Link
                href="/auth?mode=signup"
                className="group glow-primary inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-display text-lg font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                Bepul boshlash
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/auth"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-8 py-4 font-display text-lg font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {`Demo ko'rish`}
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <div className="glow-primary glass rounded-2xl p-1.5">
              <div className="overflow-hidden rounded-xl bg-card">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-primary/40" />
                  <div className="h-3 w-3 rounded-full bg-primary/60" />
                  <span className="ml-3 font-body text-xs text-muted-foreground">GymAI Dashboard</span>
                </div>
                <div className="flex flex-col items-center gap-8 p-8 md:flex-row md:p-12">
                  <div className="w-full flex-1">
                    <div className="space-y-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                        <Camera className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Gym apparat rasmini shu yerga tashlang</p>
                      <div className="inline-flex rounded-lg bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
                        Rasm yuklash
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex-1 space-y-4">
                    <div className="glass space-y-2 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                        <span className="text-xs font-medium text-primary">AI tahlil natijasi</span>
                      </div>
                      <h3 className="font-display font-bold text-foreground">Lat Pulldown Machine</h3>
                      <p className="text-xs text-muted-foreground">
                        {`Orqa muskullarni kuchaytirish uchun mo'ljallangan apparat`}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["Latissimus", "Biceps", "Rhomboids"].map((m) => (
                        <div key={m} className="glass rounded-lg p-2 text-center">
                          <span className="text-[10px] font-medium text-primary">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2 text-center">
                <div className="font-display text-3xl font-bold text-gradient md:text-4xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-mesh py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Imkoniyatlar
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">Qanday ishlaydi?</h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              {`4 oddiy qadam bilan gym apparatingiz haqida to'liq ma'lumot oling`}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative space-y-4 overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:border-primary/30"
              >
                <div className="absolute top-0 right-0 pr-3 font-display text-6xl font-bold text-foreground/[0.03]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-shadow group-hover:glow-primary">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="glass relative mx-auto max-w-3xl overflow-hidden rounded-3xl p-12 text-center space-y-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative z-10 space-y-6">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">{`Hoziroq sinab ko'ring`}</h2>
              <p className="mx-auto max-w-md text-muted-foreground">
                {`Ro'yxatdan o'ting va gym apparatingiz rasmini yuklang — AI hamma narsani tushuntiradi`}
              </p>
              <Link
                href="/auth?mode=signup"
                className="group glow-primary inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-display font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                {`Bepul ro'yxatdan o'tish`}
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-primary" />
            <span className="font-display text-sm font-bold text-foreground">
              Gym<span className="text-primary">AI</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 GymAI. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}

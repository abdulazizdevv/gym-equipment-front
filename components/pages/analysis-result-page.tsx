import Link from "next/link";
import {
  Dumbbell,
  ArrowLeft,
  Target,
  Zap,
  Info,
  ChevronRight,
  Repeat,
  BookOpen,
  Star,
  AlertTriangle,
} from "lucide-react";

const mockResult = {
  name: "Lat Pulldown Machine",
  nameUz: "Lat Pulldown Mashinasi",
  category: "Orqa muskullar",
  difficulty: "O'rta",
  description:
    "Lat pulldown mashinasi — bu orqa muskullarni, ayniqsa latissimus dorsi (keng orqa muskuli) ni kuchaytirish uchun mo'ljallangan. Bu mashq yuqoridan pastga tortish harakatini bajaradi.",
  howToUse: [
    "O'rindiqqa o'tiring va tizzalaringizni pad ostiga joylashtiring",
    "Barni yelka kengligidan bir oz kengroq ushlang",
    "Ko'krak suyagiga qarab sekin pastga torting",
    "Tirsaklaringizni orqaga va pastga yo'naltiring",
    "Sekin yuqoriga qaytaring va takrorlang",
  ],
  muscles: {
    primary: [
      { name: "Latissimus Dorsi", nameUz: "Keng orqa muskuli", percentage: 85 },
      { name: "Teres Major", nameUz: "Katta dumaloq muskul", percentage: 70 },
    ],
    secondary: [
      { name: "Biceps Brachii", nameUz: "Biceps", percentage: 55 },
      { name: "Rhomboids", nameUz: "Rombsimon muskullar", percentage: 45 },
      { name: "Posterior Deltoid", nameUz: "Orqa deltoid", percentage: 35 },
    ],
  },
  tips: [
    "Juda og'ir vazndan boshlashdan saqlaning",
    "Orqa muskullarni siqishga e'tibor bering",
    "Tana holatini to'g'ri saqlang — orqaga juda ko'p yotmang",
    "Har bir takrorlashda to'liq harakat amplitudasini bajaring",
  ],
  sets: "3-4 set × 10-12 takrorlash",
  restTime: "60-90 soniya",
};

export function AnalysisResultPage() {
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

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="glass overflow-hidden rounded-2xl">
              <div className="flex aspect-[4/3] items-center justify-center bg-secondary">
                <Dumbbell className="h-16 w-16 text-muted-foreground/20" />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span className="text-xs font-medium text-primary">AI aniqladi</span>
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground">{mockResult.name}</h1>
                <p className="text-sm text-muted-foreground">{mockResult.nameUz}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {mockResult.category}
                  </span>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {mockResult.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="glass space-y-1 rounded-xl p-4 text-center">
                <Repeat className="mx-auto h-5 w-5 text-primary" />
                <p className="text-xs text-muted-foreground">Tavsiya</p>
                <p className="font-display text-sm font-semibold text-foreground">{mockResult.sets}</p>
              </div>
              <div className="glass space-y-1 rounded-xl p-4 text-center">
                <Zap className="mx-auto h-5 w-5 text-accent" />
                <p className="text-xs text-muted-foreground">Dam olish</p>
                <p className="font-display text-sm font-semibold text-foreground">{mockResult.restTime}</p>
              </div>
            </div>

            <div className="glass space-y-3 rounded-2xl p-5">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <h3 className="font-display text-sm font-semibold text-foreground">AI yaratgan rasm</h3>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="space-y-2 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Mushak xaritasi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-3">
            <div className="glass space-y-4 rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Tavsif</h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{mockResult.description}</p>
            </div>

            <div className="glass space-y-4 rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Qanday foydalanish</h2>
              </div>
              <ol className="space-y-3">
                {mockResult.howToUse.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <span className="font-display text-xs font-bold text-primary">{i + 1}</span>
                    </div>
                    <p className="pt-1 text-sm leading-relaxed text-muted-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="glass space-y-5 rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Maqsadli muskullar</h2>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-medium tracking-wider text-primary uppercase">Asosiy muskullar</h3>
                {mockResult.muscles.primary.map((muscle) => (
                  <div key={muscle.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-foreground">{muscle.nameUz}</span>
                        <span className="ml-2 text-xs text-muted-foreground">({muscle.name})</span>
                      </div>
                      <span className="font-display text-sm font-bold text-primary">{muscle.percentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000"
                        style={{ width: `${muscle.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-medium tracking-wider text-accent uppercase">Yordamchi muskullar</h3>
                {mockResult.muscles.secondary.map((muscle) => (
                  <div key={muscle.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-foreground">{muscle.nameUz}</span>
                        <span className="ml-2 text-xs text-muted-foreground">({muscle.name})</span>
                      </div>
                      <span className="font-display text-sm font-bold text-accent">{muscle.percentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-1000"
                        style={{ width: `${muscle.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass space-y-4 rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Maslahatlar</h2>
              </div>
              <ul className="space-y-2">
                {mockResult.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-4 font-display font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Yangi tahlil qilish
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

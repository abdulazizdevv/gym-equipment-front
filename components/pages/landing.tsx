import {
  Camera,
  Cpu,
  Target,
  ArrowRight,
  BicepsFlexed,
  Brain,
  UtensilsCrossed,
  ChevronRight,
  Dumbbell,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { LocaleSwitcher } from '@/components/locale-switcher';
import { Link } from '@/i18n/navigation';

export async function LandingPage() {
  const t = await getTranslations('Landing');
  const tc = await getTranslations('Common');
  const tf = await getTranslations('FoodResult');

  const features = [
    { icon: Camera, title: t('feature1Title'), description: t('feature1Desc') },
    { icon: Brain, title: t('feature2Title'), description: t('feature2Desc') },
    { icon: Target, title: t('feature3Title'), description: t('feature3Desc') },
    {
      icon: UtensilsCrossed,
      title: t('feature4Title'),
      description: t('feature4Desc'),
    },
  ];

  const stats = [
    { value: '500+', label: t('statEquipment') },
    { value: '1000+', label: t('statGroups') },
    { value: '99%', label: t('statAccuracy') },
    { value: '2s', label: t('statTime') },
  ];

  return (
    <div className='min-h-screen bg-background'>
      <nav className='fixed top-0 z-50 w-full glass pt-[max(0.5rem,env(safe-area-inset-top))]'>
        <div className='container mx-auto flex min-h-14 flex-wrap items-center justify-between gap-x-2 gap-y-2 px-3 sm:min-h-16 sm:flex-nowrap sm:gap-3 sm:px-4'>
          <Link href='/' className='flex min-w-0 shrink-0 items-center gap-2'>
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 sm:h-8 sm:w-8'>
              <BicepsFlexed className='h-4 w-4 text-primary' />
            </div>
            <span className='font-display truncate text-[15px] font-bold text-foreground sm:text-lg'>
              Mus<span className='text-primary'>kul</span>
            </span>
          </Link>
          <div className='flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-2 gap-y-1 sm:flex-nowrap sm:gap-3'>
            <LocaleSwitcher className='shrink-0' />
            <Link
              href='/auth'
              className='inline-flex min-h-10 items-center rounded-lg px-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground sm:min-h-0 sm:px-3'
            >
              {tc('login')}
            </Link>
            <Link
              href='/auth?mode=signup'
              className='inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:min-h-11 sm:px-4'
            >
              {tc('getStarted')}
            </Link>
          </div>
        </div>
      </nav>

      <section className='gradient-mesh relative flex min-h-screen items-center justify-center overflow-hidden'>
        <div className='animate-pulse-glow absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl' />
        <div
          className='animate-pulse-glow absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl'
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className='relative z-10 container mx-auto px-4 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:pt-28'>
          <div className='mx-auto max-w-4xl space-y-6 text-center sm:space-y-8'>
            <div className='inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary sm:px-4 sm:text-sm'>
              <Cpu className='h-3.5 w-3.5' />
              {t('badgePowered')}
            </div>

            <h1 className='font-display text-[1.65rem] leading-[1.12] font-bold tracking-tight sm:text-5xl md:text-7xl'>
              {t('heroBefore')}
              <span className='text-gradient'>{t('heroGradient')}</span>
              {t('heroAfter')}
            </h1>

            <p className='mx-auto max-w-2xl px-0.5 text-sm leading-relaxed text-muted-foreground sm:px-0 sm:text-lg md:text-xl'>
              {t('heroSubtitle')}
            </p>

            <div className='mx-auto flex w-full flex-col items-stretch justify-center gap-3 pt-2 sm:w-auto sm:flex-row sm:gap-3 sm:pt-3'>
              <Link
                href='/equipment'
                className='group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-display text-base font-semibold text-primary-foreground transition-all hover:opacity-90 sm:min-w-56 sm:w-auto sm:px-6 sm:py-3 sm:text-base'
              >
                <Dumbbell className='h-5 w-5 shrink-0' />
                <span className='text-center'>{t('equipmentTab')}</span>
                <ArrowRight className='h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1' />
              </Link>
              <Link
                href='/food'
                className='group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 font-display text-base font-semibold text-accent-foreground transition-all hover:opacity-90 sm:min-w-56 sm:w-auto sm:px-6 sm:py-3 sm:text-base'
              >
                <UtensilsCrossed className='h-5 w-5 shrink-0' />
                <span className='text-center'>{t('foodTab')}</span>
                <ArrowRight className='h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1' />
              </Link>
            </div>
          </div>

          <div className='mx-auto mt-12 max-w-5xl sm:mt-20'>
            <div className='glow-primary glass rounded-2xl p-1 sm:p-1.5'>
              <div className='overflow-hidden rounded-xl bg-card'>
                <div className='flex min-w-0 items-center gap-2 border-b border-border px-3 py-2.5 sm:px-4 sm:py-3'>
                  <div className='h-2.5 w-2.5 shrink-0 rounded-full bg-destructive/60 sm:h-3 sm:w-3' />
                  <div className='h-2.5 w-2.5 shrink-0 rounded-full bg-primary/40 sm:h-3 sm:w-3' />
                  <div className='h-2.5 w-2.5 shrink-0 rounded-full bg-primary/60 sm:h-3 sm:w-3' />
                  <span className='ml-1 min-w-0 truncate font-body text-[10px] text-muted-foreground sm:ml-3 sm:text-xs'>
                    {t('mockWindow')}
                  </span>
                </div>

                <div className='grid min-w-0 gap-5 p-4 sm:gap-6 sm:p-8 md:grid-cols-2 md:p-12'>
                  <div className='min-w-0 space-y-2 sm:space-y-3'>
                    <div className='flex items-center gap-2 text-[11px] font-medium text-primary sm:text-xs'>
                      <Dumbbell className='h-3.5 w-3.5 shrink-0' />
                      {t('equipmentTab')}
                    </div>
                    <div className='space-y-2 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4 text-center sm:space-y-3 sm:p-6'>
                      <Camera className='mx-auto h-7 w-7 text-primary sm:h-8 sm:w-8' />
                      <p className='text-[11px] leading-snug text-muted-foreground sm:text-xs'>
                        {t('mockUploadHint')}
                      </p>
                    </div>
                  </div>

                  <div className='min-w-0 space-y-2 sm:space-y-3'>
                    <div className='flex items-center gap-2 text-[11px] font-medium text-accent sm:text-xs'>
                      <UtensilsCrossed className='h-3.5 w-3.5 shrink-0' />
                      {t('foodTab')}
                    </div>
                    <div className='glass space-y-2 rounded-lg p-3 sm:space-y-3 sm:p-4'>
                      <div className='flex items-center gap-2'>
                        <div className='h-2 w-2 shrink-0 animate-pulse rounded-full bg-accent' />
                        <span className='text-[11px] font-medium text-accent sm:text-xs'>
                          {tf('detected')}
                        </span>
                      </div>
                      <div className='grid min-w-0 grid-cols-3 gap-1.5 pt-0.5 sm:gap-2 sm:pt-1'>
                        {[
                          { label: tf('calories'), value: '520' },
                          { label: tf('proteins'), value: '22g' },
                          { label: tf('carbs'), value: '65g' },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className='glass min-w-0 rounded-lg p-1.5 text-center sm:p-2'
                          >
                            <span className='block truncate text-[9px] leading-tight text-muted-foreground sm:text-[10px]'>
                              {item.label}
                            </span>
                            <span className='text-[11px] font-semibold text-foreground sm:text-xs'>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='border-y border-border py-12 sm:py-20'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4'>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className='space-y-1.5 text-center sm:space-y-2'
              >
                <div className='font-display text-2xl font-bold text-gradient sm:text-3xl md:text-4xl'>
                  {stat.value}
                </div>
                <div className='text-xs text-muted-foreground sm:text-sm'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='gradient-mesh py-16 sm:py-24'>
        <div className='container mx-auto px-4'>
          <div className='mb-10 space-y-3 text-center sm:mb-16 sm:space-y-4'>
            <div className='inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase sm:text-xs'>
              {t('capabilities')}
            </div>
            <h2 className='font-display text-2xl font-bold text-foreground sm:text-3xl md:text-5xl'>
              {t('howItWorks')}
            </h2>
            <p className='mx-auto max-w-lg px-2 text-sm text-muted-foreground sm:px-0 sm:text-base'>
              {t('howItWorksDesc')}
            </p>
          </div>

          <div className='mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className='group relative space-y-3 overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:border-primary/30 sm:space-y-4 sm:p-6'
              >
                <div className='absolute top-0 right-0 pr-3 font-display text-6xl font-bold text-foreground/3'>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-shadow group-hover:glow-primary'>
                  <feature.icon className='h-5 w-5 text-primary' />
                </div>
                <h3 className='font-display text-base font-semibold text-foreground sm:text-lg'>
                  {feature.title}
                </h3>
                <p className='text-xs leading-relaxed text-muted-foreground sm:text-sm'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-12 sm:py-24'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2'>
            <div className='group relative overflow-hidden rounded-2xl glass p-5 transition-all hover:border-primary/30 sm:rounded-3xl sm:p-10'>
              <div className='absolute inset-0 bg-linear-to-br from-primary/5 to-transparent' />
              <div className='relative z-10 space-y-4 sm:space-y-5'>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 sm:h-14 sm:w-14'>
                  <Dumbbell className='h-6 w-6 text-primary sm:h-7 sm:w-7' />
                </div>
                <h2 className='font-display text-xl font-bold text-foreground sm:text-2xl'>
                  {t('equipmentTab')}
                </h2>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {t('equipmentCardDesc')}
                </p>
                <Link
                  href='/equipment'
                  className='inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-display text-sm font-semibold text-primary-foreground glow-primary transition-all hover:opacity-90 sm:inline-flex sm:w-auto sm:px-6 sm:text-base'
                >
                  {tc('getStarted')}
                  <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-2xl glass p-5 transition-all hover:border-accent/30 sm:rounded-3xl sm:p-10'>
              <div className='absolute inset-0 bg-linear-to-br from-accent/5 to-transparent' />
              <div className='relative z-10 space-y-4 sm:space-y-5'>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 sm:h-14 sm:w-14'>
                  <UtensilsCrossed className='h-6 w-6 text-accent sm:h-7 sm:w-7' />
                </div>
                <h2 className='font-display text-xl font-bold text-foreground sm:text-2xl'>
                  {t('foodTab')}
                </h2>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {t('foodCardDesc')}
                </p>
                <Link
                  href='/food'
                  className='inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-display text-sm font-semibold text-accent-foreground glow-accent transition-all hover:opacity-90 sm:inline-flex sm:w-auto sm:px-6 sm:text-base'
                >
                  {tc('getStarted')}
                  <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className='border-t border-border py-8 pb-[max(2rem,env(safe-area-inset-bottom))]'>
        <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
          <div className='flex items-center gap-2'>
            <BicepsFlexed className='h-4 w-4 text-primary' />
            <span className='font-display text-sm font-bold text-foreground'>
              Mus<span className='text-primary'>kul</span>
            </span>
          </div>
          <p className='text-xs text-muted-foreground'>
            {tc('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </div>
  );
}

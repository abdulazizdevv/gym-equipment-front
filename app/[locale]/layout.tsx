import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { Inter, Space_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';

import { Providers } from '@/components/providers';
import { SetHtmlLang } from '@/components/set-html-lang';
import { routing } from '@/i18n/routing';

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin', 'cyrillic'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const title = t('title');
  const description = t('description');
  const keywords = t.has('keywords')
    ? t('keywords')
    : 'gym equipment analyzer, muskul fit, AI fitness';

  const baseUrl = 'https://muskul.fit';
  const alternateLanguages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    alternateLanguages[l] = `${baseUrl}/${l}`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | Muskul`,
    },
    description,
    keywords,
    applicationName: 'Muskul',
    authors: [{ name: 'Abdulaziz' }],
    creator: 'Abdulaziz',
    publisher: 'Muskul',
    icons: {
      icon: [
        { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon/favicon.svg', type: 'image/svg+xml' }
      ],
      apple: [
        { url: '/favicon/apple-touch-icon.png' }
      ]
    },
    manifest: '/favicon/site.webmanifest',
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      locale,
      url: `${baseUrl}/${locale}`,
      title,
      description,
      siteName: 'Muskul',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Muskul - AI Gym Equipment Analyzer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    verification: {
      google: 'qa0jKkwuh_Sl1Wj0icQqLS9q9cuVl7uUp7X2qLSv8yo',
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <div
      className={`${inter.variable} ${spaceGrotesk.variable} font-body flex min-h-full flex-col pb-[env(safe-area-inset-bottom)] antialiased`}
    >
      <SetHtmlLang locale={locale} />
      <NextIntlClientProvider messages={messages}>
        <Providers>{children}</Providers>
      </NextIntlClientProvider>
    </div>
  );
}

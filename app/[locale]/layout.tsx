import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { Providers } from "@/components/providers";
import { SetHtmlLang } from "@/components/set-html-lang";
import { routing } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
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
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
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

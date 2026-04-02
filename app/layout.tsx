import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { Providers } from "@/components/providers";

import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GymAI — gym apparatlarini AI bilan tahlil qiling",
  description:
    "Rasm yuklang — sun'iy intellekt apparatni aniqlaydi, qanday foydalanishni o'rgatadi va qaysi muskullarni ishlatishini ko'rsatadi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning className="h-full">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body flex min-h-full flex-col antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

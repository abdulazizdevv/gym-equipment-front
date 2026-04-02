import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("title")}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("description")}</p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          {t("link")}
        </Link>
      </div>
    </div>
  );
}

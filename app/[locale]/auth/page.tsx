import { Suspense } from "react";
import { Metadata } from "next";

import { AuthPage } from "@/components/pages/auth-page";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Auth() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <AuthPage />
    </Suspense>
  );
}

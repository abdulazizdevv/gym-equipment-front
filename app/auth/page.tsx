import { Suspense } from "react";

import { AuthPage } from "@/components/pages/auth-page";

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

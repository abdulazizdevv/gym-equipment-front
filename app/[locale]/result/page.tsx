import { Suspense } from "react";

import { AnalysisResultPage } from "@/components/pages/analysis-result-page";

export default function Page() {
  return (
    <Suspense>
      <AnalysisResultPage />
    </Suspense>
  );
}

import { Suspense } from "react";

import { StepIndicator } from "./_components/step-indicator";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl p-3 md:p-0">
      <Suspense>
        <StepIndicator />
      </Suspense>
      {children}
    </div>
  );
}

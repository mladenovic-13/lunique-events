import { Suspense } from "react";

import { AuthErrorProvider } from "@/components/providers/auth-error-provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <AuthErrorProvider />
      </Suspense>
      {children}
    </>
  );
}

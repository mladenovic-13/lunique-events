import { type Viewport } from "next";
import { Roboto } from "next/font/google";

import { ModalProvider } from "@/components/providers/modal-provider";
import { OrganizationStoreProvider } from "@/components/providers/organization-provider";
import NextAuthProvider from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";

import "@/styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Lunique Events",
  description: "Make your event, event from the future.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `font-sans ${roboto.variable}`,
          "bg-background antialiased",
        )}
      >
        {/* Fix scrollbar layout shifts */}
        <div className="pl-[calc(100vw-100%)]">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <NextAuthProvider>
                <OrganizationStoreProvider>
                  <ModalProvider />
                  <Toaster />
                  {children}
                </OrganizationStoreProvider>
              </NextAuthProvider>
            </TRPCReactProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

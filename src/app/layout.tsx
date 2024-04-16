import { Roboto } from "next/font/google";

import { ModalProvider } from "@/components/providers/modal-provider";
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
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, , user-scalable=no",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
                <ModalProvider />
                <Toaster />
                {children}
              </NextAuthProvider>
            </TRPCReactProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

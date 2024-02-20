import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/components/providers/modal-provider";
import NextAuthProvider from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Better Event",
  description: "Make your event, event from the future.",
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
          `font-sans ${inter.variable}`,
          "bg-background antialiased",
        )}
      >
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
      </body>
    </html>
  );
}

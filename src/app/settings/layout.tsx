import { redirect } from "next/navigation";

import { Footer } from "@/components/navigation/footer";
import { Navbar } from "@/components/navigation/navbar";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

import { SettingsNav } from "./_components/settings-nav";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) return redirect(paths.signin.root);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-4xl pt-1.5">
        <p className="px-3 text-2xl font-semibold md:px-0 md:text-3xl">
          Settings
        </p>
        <SettingsNav />
      </div>
      <Separator />
      <main className="mx-auto max-w-4xl p-3 md:px-0 md:py-6">{children}</main>
      <Footer />
    </>
  );
}

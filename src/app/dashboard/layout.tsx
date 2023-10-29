import { DashboardNav } from "@/components/navigation/dashboard-nav";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) return redirect(paths.auth.signIn);

  return (
    <>
      <DashboardNav />
      <main className="container min-h-[calc(100vh-65px)] py-5">
        {children}
      </main>
    </>
  );
}

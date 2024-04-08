import { redirect } from "next/navigation";

import { Footer } from "@/components/navigation/footer";
import { Navbar } from "@/components/navigation/navbar";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

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
      {children}
      <Footer />
    </>
  );
}

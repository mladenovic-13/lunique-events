import { redirect } from "next/navigation";

import Ripple from "@/components/magicui/ripple";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

import { EmailSignInForm } from "./_components/email-sign-in";

export default async function SignIn() {
  const session = await getServerAuthSession();

  if (session) return redirect(paths.home.root);

  return (
    <main className="relative flex h-screen w-full items-start justify-center overflow-hidden bg-background from-primary/50 via-background to-background px-4 pt-40 dark:bg-gradient-to-br md:items-center md:p-0">
      <EmailSignInForm />
      <Ripple color="bg-primary md:hidden" />
      <div className="absolute top-0 flex size-full backdrop-blur-[10px] md:hidden" />
    </main>
  );
}

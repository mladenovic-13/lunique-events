import { redirect } from "next/navigation";

import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

import { EmailSignInForm } from "./_components/email-sign-in";

export default async function SignIn() {
  const session = await getServerAuthSession();

  if (session) return redirect(paths.home.root);

  return (
    <main className="flex h-[70vh] items-center justify-center">
      <div className="w-full max-w-md">
        <EmailSignInForm />
      </div>
    </main>
  );
}

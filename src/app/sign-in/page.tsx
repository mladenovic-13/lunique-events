import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

import { EmailSignInForm } from "./_components/email-sign-in";

export default async function SignIn() {
  const session = await getServerAuthSession();

  if (session) return redirect(paths.home.root);

  return (
    <main className="h-fill flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>

          <CardContent className="my-5">
            <EmailSignInForm />
          </CardContent>

          <CardFooter>
            <p className="mt-5 w-full text-center text-sm text-zinc-500">
              By signing in, you agree to our <br />
              <Link href="/" className="underline underline-offset-2">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/" className="underline underline-offset-2">
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

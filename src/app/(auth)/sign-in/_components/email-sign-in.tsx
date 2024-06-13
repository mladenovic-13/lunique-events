"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCsrfToken } from "next-auth/react";
import * as z from "zod";

import Ripple from "@/components/magicui/ripple";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import logoImg from "@/public/logo.png";

const formSchema = z.object({
  email: z.string().email({ message: "Please add valid email." }),
});

type FormFields = z.infer<typeof formSchema>;

export const EmailSignInForm = () => {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: FormFields) => {
    setSendingEmail(true);

    const csrfToken = await getCsrfToken();

    if (csrfToken) {
      const response = await axios.post("/api/auth/signin/email", {
        csrfToken,
        email: values.email,
      });

      if (response.status === 200) {
        setIsEmailSent(true);
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Email sign in failed. Try again!",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Email sign in failed. Try again!",
      });
    }

    setSendingEmail(false);
  };

  if (!isEmailSent)
    return (
      <Card className="z-10 flex h-2/3 w-full items-center justify-center overflow-hidden rounded-lg border bg-muted/70 shadow-lg md:h-4/5 md:w-[900px]">
        <div className="flex size-full flex-col items-start justify-center gap-2 px-2 backdrop-blur-xl md:w-1/2">
          <CardHeader className="gap-2 text-left">
            <CardTitle className="text-2xl font-bold md:text-5xl">
              Sign In
            </CardTitle>
            <CardDescription>
              Enter your email to receive a{" "}
              <strong className="text-primary">Magic Link</strong>
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          {...field}
                          className="border-accent-foreground/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={sendingEmail}
                  className="w-full md:w-1/3"
                >
                  {sendingEmail && (
                    <LoaderCircleIcon className="mr-1.5 size-5 animate-spin" />
                  )}
                  {sendingEmail ? "Sending Email..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <p className="mt-5 w-full text-left text-sm text-zinc-500">
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
        </div>
        <div className="hidden h-full w-1/2  flex-col shadow-none md:flex">
          <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden bg-background p-20">
            <Image
              src={logoImg.src}
              height={400}
              width={400}
              alt="logo"
              className="z-10 w-1/2 cursor-pointer brightness-75 transition-all hover:scale-105 dark:brightness-50"
            />
            <Ripple color="bg-primary" />
          </div>
        </div>
      </Card>
    );

  if (isEmailSent)
    return (
      <Card className="z-10 flex h-2/3 w-full items-center justify-center overflow-hidden rounded-lg border bg-muted/70 shadow-lg md:h-4/5 md:w-[900px]">
        <div className="flex size-full flex-col items-start justify-center gap-2 px-2 backdrop-blur-xl md:w-1/2">
          <CardHeader className="gap-2 text-left">
            <CardTitle className="text-2xl font-bold md:text-5xl">
              We have sent you verification link
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p>
              Please check your email inbox, it also might be in your spam
              folder!
            </p>
          </CardContent>

          <CardFooter>
            <Button
              variant="link"
              className="p-0"
              onClick={() => setIsEmailSent(false)}
            >
              Change Email Address
            </Button>
          </CardFooter>
        </div>
        <div className="hidden h-full w-1/2  flex-col shadow-none md:flex">
          <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden bg-background p-20">
            <Image
              src={logoImg.src}
              height={400}
              width={400}
              alt="logo"
              className="z-10 w-1/2 cursor-pointer brightness-75 transition-all hover:scale-105 dark:brightness-50"
            />
            <Ripple color="bg-primary" />
          </div>
        </div>
      </Card>
    );

  return null;
};

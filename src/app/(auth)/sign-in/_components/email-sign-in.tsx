"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { getCsrfToken } from "next-auth/react";
import * as z from "zod";

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
      <Card className="border-none shadow-none">
        <CardHeader className="text-center">
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent className="my-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={sendingEmail} className="w-full">
                {sendingEmail && (
                  <LoaderCircleIcon className="mr-1.5 size-5 animate-spin" />
                )}
                {sendingEmail ? "Sending Email..." : "Sign In"}
              </Button>
            </form>
          </Form>
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
    );

  if (isEmailSent)
    return (
      <Card className="space-y-2 text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            We have sent you verification link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Please check your email inbox, it also might be in your spam folder!
          </p>
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            className="mx-auto"
            onClick={() => setIsEmailSent(false)}
          >
            Change Email Address
          </Button>
        </CardFooter>
      </Card>
    );

  return null;
};

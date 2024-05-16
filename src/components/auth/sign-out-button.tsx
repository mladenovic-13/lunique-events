"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { Button, type ButtonProps } from "../ui/button";
import { useToast } from "../ui/use-toast";

export const SignOutButton = (props: ButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: () => signOut({ redirect: false }),
    onSuccess: () => router.refresh(),
    onError: () =>
      toast({
        variant: "destructive",
        description: "Failed to sign out. Please try again.",
      }),
  });

  return (
    <Button onClick={() => mutate()} className="w-[92px]" {...props}>
      Sign Out
    </Button>
  );
};

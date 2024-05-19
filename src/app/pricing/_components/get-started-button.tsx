"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { paths } from "@/routes/paths";

export const GetStartedButton = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const onClick = () => {
    router.push(paths.signin.root);
  };

  return (
    <Button
      disabled={!!session?.user.id}
      variant="secondary"
      className="w-full"
      onClick={onClick}
    >
      Get Started
    </Button>
  );
};

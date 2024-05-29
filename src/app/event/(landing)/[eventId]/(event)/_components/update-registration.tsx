"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

interface CancelRegistrationProps {
  inviteId: string;
}

export const UpdateRegistration = ({ inviteId }: CancelRegistrationProps) => {
  const { mutate: updateStatus } = api.invite.updateStatus.useMutation();

  const { toast } = useToast();

  const utils = api.useUtils();

  const onClick = () => {
    updateStatus(
      { id: inviteId, status: "GOING" },
      {
        onSuccess: () => {
          toast({ title: "You have successfully updated registration" }),
            utils.invalidate().catch(() => ({}));
        },
        onError: () =>
          toast({
            variant: "destructive",
            title: "Failed to update registration",
          }),
      },
    );
  };

  return (
    <Button onClick={onClick} className="w-full">
      I’m going after all
    </Button>
  );
};

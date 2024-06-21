"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

interface CancelRegistrationProps {
  inviteId: string;
}

export const CancelRegistration = ({ inviteId }: CancelRegistrationProps) => {
  const { mutate: updateStatus } = api.invite.updateStatus.useMutation();

  const { toast } = useToast();

  const utils = api.useUtils();

  const onClick = () => {
    updateStatus(
      { id: inviteId, status: "NOT_GOING" },
      {
        onSuccess: () => {
          toast({ title: "You have successfully canceled registration" });
          utils.invalidate().catch(() => ({}));
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to canceled registration",
          });
        },
      },
    );
  };

  return (
    <Button variant="ghost" onClick={onClick} className="w-full">
      Cancel registration
    </Button>
  );
};

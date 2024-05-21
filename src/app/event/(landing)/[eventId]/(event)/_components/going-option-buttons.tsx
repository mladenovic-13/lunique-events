"use client";

import { useCallback, useState } from "react";
import { type Invite } from "@prisma/client";
import { CheckIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

export const GoingOptionButtons = ({ invite }: { invite: Invite }) => {
  const [isUserDecided, setIsUserDecided] = useState(
    () => invite.status !== "PENDING",
  );

  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    api.invite.updateStatus.useMutation();

  const { toast } = useToast();
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ title: "Succsesstully updated invitation status" });
    router.refresh();
    setIsUserDecided(true);
  }, [toast, router]);
  const onError = useCallback(
    () =>
      toast({
        variant: "destructive",
        title: "Failed to update invitation status",
      }),
    [toast],
  );

  const onGoingClick = () => {
    updateStatus({ id: invite.id, status: "GOING" }, { onSuccess, onError });
  };
  const onMaybeClick = () => {
    updateStatus({ id: invite.id, status: "MAYBE" }, { onSuccess, onError });
  };
  const onNotgoingClick = () => {
    updateStatus(
      { id: invite.id, status: "NOT_GOING" },
      { onSuccess, onError },
    );
  };

  const isGoingDisabled = invite.status === "GOING";
  const isMaybeDisabled = invite.status === "MAYBE";
  const isNotgoingDisabled = invite.status === "NOT_GOING";

  if (isUserDecided)
    return (
      <div className="w-full space-y-2">
        {invite.status === "GOING" && (
          <p className="rounded-md border bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground">
            You are coming to the event
          </p>
        )}
        {invite.status === "MAYBE" && (
          <p className="rounded-md border bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground">
            Maybe you will come to the event
          </p>
        )}
        {invite.status === "NOT_GOING" && (
          <p className="rounded-md border bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground">
            You are not coming to the event
          </p>
        )}

        <Button
          onClick={() => setIsUserDecided(false)}
          variant="ghost"
          className="w-full"
        >
          Change your mind
        </Button>
      </div>
    );

  return (
    <div className="flex w-full gap-3">
      {!isGoingDisabled && (
        <Button
          disabled={isUpdatingStatus}
          onClick={onGoingClick}
          className="w-full"
        >
          <CheckIcon className="mr-1.5 size-4" />
          Going
        </Button>
      )}
      {!isMaybeDisabled && (
        <Button
          disabled={isUpdatingStatus}
          onClick={onMaybeClick}
          variant="secondary"
          className="w-full"
        >
          Maybe
        </Button>
      )}
      {!isNotgoingDisabled && (
        <Button
          disabled={isUpdatingStatus}
          onClick={onNotgoingClick}
          variant="secondary"
          className="w-full"
        >
          <XIcon className="mr-1.5 size-4" /> Not Going
        </Button>
      )}
    </div>
  );
};

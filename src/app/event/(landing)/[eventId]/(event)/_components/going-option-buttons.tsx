"use client";

import { useCallback, useState } from "react";
import {
  type Guest,
  type Invite,
  type RegistrationSettings,
} from "@prisma/client";
import { CheckIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

import { RegisterGuestModal } from "./register-guest-modal";

interface GoingOptionButtons {
  invite: Invite;
  guest?: Guest | null;
  rules: RegistrationSettings;
}

export const GoingOptionButtons = ({
  invite,
  guest,
  rules,
}: GoingOptionButtons) => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isUserDecided, setIsUserDecided] = useState(
    () => invite.status !== "PENDING",
  );
  const [isGuestCreated, setIsGuestCreated] = useState(() => !!guest);

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

  console.log({ isGuestCreated });

  const onGoingClick = () => {
    if (!isGuestCreated) {
      setIsRegistrationOpen(true);
    }
    if (isGuestCreated) {
      updateStatus({ id: invite.id, status: "GOING" }, { onSuccess, onError });
    }
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

  const onGuestCreated = () => {
    updateStatus({ id: invite.id, status: "GOING" }, { onSuccess, onError });
    setIsGuestCreated(true);
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
          type="button"
          variant="ghost"
          className="w-full"
        >
          Change your mind
        </Button>
      </div>
    );

  return (
    <div className="flex w-full gap-3">
      <RegisterGuestModal
        open={isRegistrationOpen}
        onOpenChange={setIsRegistrationOpen}
        eventId={invite.eventId}
        email={invite.email}
        rules={rules}
        onSuccess={onGuestCreated}
      />

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

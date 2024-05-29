"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";

import { CancelRegistration } from "./cancel-registration";
import { RegistrationForm } from "./registration-form";
import { UpdateRegistration } from "./update-registration";

interface RegisterGuestProps {
  eventId: string;
  inviteId: string | null;
}

export const RegisterGuest = ({ eventId, inviteId }: RegisterGuestProps) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const { data: rules, isLoading: isLoadingRules } =
    api.event.getRegistration.useQuery({
      eventId: eventId,
    });
  const { data: invite, isLoading: isLoadingInvite } = api.invite.get.useQuery(
    { id: inviteId },
    { enabled: !!inviteId },
  );

  const { mutate: updateStatus } = api.invite.updateStatus.useMutation();

  const onGuestRegistered = () => {
    if (inviteId) updateStatus({ id: inviteId, status: "GOING" });

    setIsRegistered(true);
    setIsOpen(false);
    router.refresh();
  };

  const isLoadingForm = isLoadingInvite || isLoadingRules;
  const isGuestRegistered = isRegistered || invite?.status === "GOING";
  const isCancelAvailable = invite?.id && invite?.status === "GOING";
  const isGuestCanceled = invite?.id && invite.status === "NOT_GOING";
  const isRegisterAvailable =
    !isGuestRegistered && !isLoadingForm && !isGuestCanceled;

  if (isLoadingRules || isLoadingInvite)
    return <div>TODO: Loading Skeleton...</div>;

  return (
    <Card>
      <CardHeader className="rounded-t-lg bg-card-foreground/5 px-3 py-2">
        <CardTitle className="text-sm">Registration</CardTitle>
      </CardHeader>
      <CardContent className="p-3 text-center">
        {!isGuestRegistered && (
          <p>Welcome! To join the event, please register below.</p>
        )}
        {isGuestRegistered && (
          <p>You have successfully registered for the event</p>
        )}
      </CardContent>
      <CardFooter className="p-3">
        {isRegisterAvailable && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Register</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Your info</DialogTitle>
              </DialogHeader>

              <RegistrationForm
                eventId={eventId}
                email={invite?.email}
                fields={{
                  name: rules?.name,
                  linkedIn: rules?.linkedIn,
                  website: rules?.website,
                }}
                onSuccess={onGuestRegistered}
              />
            </DialogContent>
          </Dialog>
        )}
        {isCancelAvailable && <CancelRegistration inviteId={invite.id} />}
        {isGuestCanceled && <UpdateRegistration inviteId={invite.id} />}
      </CardFooter>
    </Card>
  );
};

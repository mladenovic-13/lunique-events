import React from "react";
import {
  ChevronLeftIcon,
  LoaderCircleIcon,
  SendIcon,
  UserRoundPlusIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  useGuestEmails,
  useGuestEmailSending,
  useInviteGuestActions,
  useInviteStep,
} from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  className?: string;
}
function ActionButtons({ className }: ActionButtonsProps) {
  const step = useInviteStep();
  const { setStep } = useInviteGuestActions();
  const guestEmails = useGuestEmails();
  const emailSending = useGuestEmailSending();
  return (
    <div className={cn("flex w-full items-center", className && className)}>
      {(step === "add-emails" ||
        step === "list-events" ||
        step === "search-guests") && (
        <div className={cn("w-full", className && className)}>
          <Button
            onClick={() => setStep("add-emails")}
            variant={"ghost"}
            className={cn(
              "bg-transparent pl-0 hover:bg-transparent",
              guestEmails.length === 0 && "text-destructive",
            )}
            disabled={guestEmails.length === 0}
          >
            {guestEmails.length} Selected
          </Button>
          <Button
            onClick={() => setStep("generate-email")}
            disabled={guestEmails.length === 0}
          >
            Next
          </Button>
        </div>
      )}
      {step === "generate-email" && (
        <div className={cn("w-full", className && className)}>
          <Button
            onClick={() => setStep("add-emails")}
            variant={"secondary"}
            className="flex gap-2 pl-2"
          >
            <ChevronLeftIcon className="size-4" />
            Back
          </Button>
          <Button className="flex gap-2" form="new-send-invites-form">
            {!emailSending && <SendIcon className="size-4" />}
            {!emailSending && "Send Invites"}
            {emailSending && (
              <svg
                className="size-5 animate-spin text-inherit"
                viewBox="0 0 24 24"
              >
                <LoaderCircleIcon />
              </svg>
            )}
            {emailSending && "Sending Invites..."}
          </Button>
        </div>
      )}
      {step === "add-guests-directly" && (
        <div className={cn("w-full", className && className)}>
          <Button
            onClick={() => setStep("add-emails")}
            variant={"secondary"}
            className="flex gap-2 pl-2"
          >
            <ChevronLeftIcon className="size-4" />
            Back
          </Button>
          <Button className="flex gap-2">
            <UserRoundPlusIcon className="size-4" />
            Add Guests Directly
          </Button>
        </div>
      )}
    </div>
  );
}

export default ActionButtons;

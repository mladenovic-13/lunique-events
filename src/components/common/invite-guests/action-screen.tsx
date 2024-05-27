import React from "react";

import { useInviteStep } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";

import AddEmails from "./add-emails";
import AddGuestsDirectly from "./add-guests-directly";
import { EventList } from "./event-list";
import GenerateEmail from "./generate-email";
import SearchGuests from "./search-guests";
interface ActionScreenProps {
  eventId: string;
  onInviteComplete?: () => void;
  className?: string;
}
const ActionScreen = ({
  className,
  onInviteComplete,
  eventId,
}: ActionScreenProps) => {
  const step = useInviteStep();
  return (
    <div className={cn("flex h-full", className && className)}>
      {/* <div className="hidden md:flex"></div>
      <div className="flex size-full pt-4 md:hidden">
        {step === "list-events" && <EventList className="w-full" />}
        {step === "add-emails" && <AddEmails className="w-full" />}
        {step === "search-guests" && <SearchGuests className="w-full" />}
      </div> */}

      <div className="flex size-full">
        {step === "list-events" && (
          <EventList className="flex w-full pt-4 md:hidden md:pt-0" />
        )}
        {step === "add-emails" && (
          <AddEmails className="size-full pt-4 md:p-0" />
        )}
        {step === "search-guests" && (
          <SearchGuests className="w-full pt-4 md:p-0" />
        )}
        {step === "generate-email" && (
          <GenerateEmail
            className="w-full pt-4 md:p-0"
            onInviteComplete={onInviteComplete}
            eventId={eventId}
          />
        )}
        {step === "add-guests-directly" && (
          <AddGuestsDirectly className="w-full pt-4 md:p-0" />
        )}
      </div>
    </div>
  );
};

export default ActionScreen;

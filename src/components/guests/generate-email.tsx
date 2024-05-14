import React from "react";
import { TicketIcon } from "lucide-react";

import { useInviteGuestActions } from "@/hooks/use-guest-store";

import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

interface GenerateEmailProps {
  value: string;
  onValueChange: () => void;
}

export const GenerateEmail = ({ value, onValueChange }: GenerateEmailProps) => {
  const { setStep } = useInviteGuestActions();
  return (
    <section className="flex flex-col items-center gap-3 px-4">
      <div className="flex w-full flex-col rounded-lg border-[1.5px] border-accent-foreground/10">
        <div className="p-4">
          <p>Hi, Nikola Mladenovic invites you to join Bigest Event Ever.</p>
        </div>
        <Textarea
          value={value}
          onChange={onValueChange}
          className="min-h-28 rounded-none border-none bg-muted"
          placeholder="Add a custom message here..."
        />
        <div className="p-4">
          <p className="text-sm">Event Page Link</p>
        </div>
      </div>
      <div className="flex w-full items-center gap-2 pl-0">
        <div className="flex size-8 items-center justify-center rounded-md bg-accent-foreground/10  p-1.5">
          <TicketIcon className="text-accent-foreground/80" />
        </div>
        <p className="text-sm">
          We will send guests an invite link to register for the event.
        </p>
      </div>
      <Separator />
      <p className="text-xs font-medium leading-6 text-accent-foreground/50">
        You can bypass registration and payment by adding guests directly to the
        guest list.{" "}
        <a
          className="text-primary/50 transition-all hover:cursor-pointer hover:text-primary "
          onClick={() => {
            setStep("add-guests-directly");
          }}
        >
          Add Guests Directly
        </a>{" "}
      </p>
    </section>
  );
};

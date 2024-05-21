import React from "react";
import { TicketIcon } from "lucide-react";

import { env } from "@/env.mjs";
import { useInviteGuestActions } from "@/hooks/use-guest-store";
import { paths } from "@/routes/paths";

import { Separator } from "../../ui/separator";
import { Textarea } from "../../ui/textarea";

import { InviteList } from "./invite-list";

interface GenerateEmailProps {
  value: string;
  onChange: () => void;
  eventId: string;
  userName: string;
}

export const GenerateEmail = ({
  value,
  onChange,
  eventId,
  userName,
}: GenerateEmailProps) => {
  const { setStep } = useInviteGuestActions();
  const eventLandingPage = `${env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}${paths.event.landing.root(eventId)}`;
  return (
    <section className="flex h-full flex-col items-center gap-3 text-sm md:text-base">
      <div className="flex w-full flex-col rounded-lg border-[1.5px] border-accent-foreground/10">
        <div className="p-4">
          <p className="">
            Hello, <br />
            <strong>{userName}</strong> has invited you to the event.
          </p>
        </div>
        <Textarea
          value={value}
          onChange={onChange}
          className="min-h-28 rounded-none border-none bg-muted"
          placeholder="Add a custom message here..."
        />
        <div className="p-4">
          <p className="text-sm ">
            <strong>RVSP:</strong>
            <br />
            <p className="line-clamp-1">{eventLandingPage}</p>
          </p>
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
      <div className="flex size-full flex-col gap-2 md:hidden">
        <Separator />
        <InviteList />
      </div>
    </section>
  );
};

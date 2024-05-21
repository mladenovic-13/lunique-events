"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import InviteGuests from "@/components/common/invite-guests/index";
import { Button } from "@/components/ui/button";
import { useGuestCapacity } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";

import {
  StepContainer,
  StepContent,
  StepDescription,
  StepHeader,
  StepTitle,
} from "./common";

export const EventInviteGuestsStep = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id") ?? "";

  const username = useSession().data?.user.name ?? "";
  const guestCapacity = useGuestCapacity();
  const router = useRouter();

  return (
    <StepContainer className="size-full">
      <StepHeader>
        <StepTitle>
          <div className="flex justify-between">
            Invite Guests
            <Button
              variant={"outline"}
              className={cn(
                "flex h-6 cursor-pointer items-center rounded-full border border-accent-foreground/50  px-2 text-xs text-accent-foreground/50 transition-all hover:border-accent-foreground hover:text-accent-foreground",
                guestCapacity === 0 && "border-red-500 text-red-500",
              )}
            >
              <p className="uppercase">{guestCapacity} left</p>
            </Button>
          </div>
        </StepTitle>
        <StepDescription>Invite your guests</StepDescription>
      </StepHeader>
      <StepContent className="size-full border-t px-0 md:px-2 ">
        <div className="h-[500px] justify-center  px-0 md:h-[500px] md:w-full">
          <InviteGuests
            eventId={eventId}
            userName={username}
            onInviteComplete={() =>
              router.push(paths.event.manage.overview(eventId))
            }
          />
        </div>
      </StepContent>
    </StepContainer>
  );
};

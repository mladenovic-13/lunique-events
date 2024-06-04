"use client";

import { useRouter, useSearchParams } from "next/navigation";

import InviteGuestPartial from "@/components/common/invite-guests";
import { Button } from "@/components/ui/button";
import { useGuestCapacity } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";

import {
  StepContainer,
  StepContent,
  StepDescription,
  StepFooter,
  StepHeader,
  StepTitle,
} from "./common";

export const EventInviteGuestsStep = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id") ?? "";

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
      <StepContent className="size-full flex-none border-t px-0 md:flex md:px-2">
        <div className="h-[550px] justify-center  px-0 md:h-[500px] md:w-full">
          <InviteGuestPartial
            eventId={eventId}
            className="size-full"
            onInviteComplete={() =>
              router.push(paths.event.manage.overview(eventId))
            }
          />
        </div>
        <div className="hidden h-[490px] items-end md:flex">
          <Button
            type="button"
            size="sm"
            onClick={() => router.push(paths.event.manage.overview(eventId))}
            variant="ghost"
          >
            Skip for now
          </Button>
        </div>
      </StepContent>
      <StepFooter className="-mt-6 flex items-center justify-end md:hidden">
        <Button
          type="button"
          size="sm"
          className="pr-0 hover:bg-transparent"
          onClick={() => router.push(paths.event.manage.overview(eventId))}
          variant="ghost"
        >
          Skip for now
        </Button>
      </StepFooter>
    </StepContainer>
  );
};

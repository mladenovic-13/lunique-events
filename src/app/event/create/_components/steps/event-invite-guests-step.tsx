"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import InviteGuests from "@/components/common/invite-guests/index";
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

  const router = useRouter();

  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Invite Guests</StepTitle>
        <StepDescription>Invite your guests</StepDescription>
      </StepHeader>
      <StepContent className="border-t md:px-2">
        <div className="flex h-[500px] w-full px-0">
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

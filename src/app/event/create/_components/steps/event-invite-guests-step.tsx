"use client";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import InviteGuests from "@/components/common/invite-guests/index";

import {
  StepContainer,
  StepContent,
  StepDescription,
  StepHeader,
  StepTitle,
} from "./common";

export const EventInviteGuestsStep = () => {
  const searchParams = useSearchParams();
  const eventId: string = searchParams.get("id") ?? "";
  const userName = useSession().data?.user.name ?? "";
  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Invite Guests</StepTitle>
        <StepDescription>Invite your guestdsdss</StepDescription>
      </StepHeader>
      <StepContent className="border-t">
        <div className="flex h-[500px] w-full px-2">
          <InviteGuests eventId={eventId} userName={userName} />
        </div>
      </StepContent>
    </StepContainer>
  );
};

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
  // TODO: embed invite guests modal @Lukiano99
  const searchParams = useSearchParams();
  const eventId: string = searchParams.get("id") ?? "";
  const userName = useSession().data?.user.name ?? "";
  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Invite Guests</StepTitle>
        <StepDescription>Invite your guests</StepDescription>
      </StepHeader>
      <StepContent className="max-h-[500px] border-t">
        <InviteGuests eventId={eventId} userName={userName} />
      </StepContent>
    </StepContainer>
  );
};

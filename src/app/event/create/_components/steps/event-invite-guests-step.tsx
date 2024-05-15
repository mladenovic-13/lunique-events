"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { InviteGuests } from "@/components/guests/invite-guests-panel";
import { buttonVariants } from "@/components/ui/button";

import {
  StepContainer,
  StepContent,
  StepDescription,
  StepFooter,
  StepHeader,
  StepTitle,
} from "./common";

export const EventInviteGuestsStep = () => {
  // TODO: embed invite guests modal @Lukiano99
  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Invite Guests</StepTitle>
        <StepDescription>Invite your guests</StepDescription>
      </StepHeader>
      <StepContent className="max-h-[500px] border-t">
        <InviteGuests />
      </StepContent>
    </StepContainer>
  );
};

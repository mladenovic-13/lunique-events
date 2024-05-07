"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

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
      <StepContent>Coming soon</StepContent>
      <StepFooter className="justify-end gap-3">
        <Link
          className={buttonVariants({ size: "sm", variant: "ghost" })}
          href="/"
        >
          Skip for now
        </Link>

        <Link className={buttonVariants({ size: "sm" })} href="/">
          Continue
          <ChevronRightIcon className="ml-1.5 size-4" />
        </Link>
      </StepFooter>
    </StepContainer>
  );
};

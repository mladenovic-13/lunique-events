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
  const eventId: string = searchParams.get("id") ?? "";
  const userName = useSession().data?.user.name ?? "";
  const router = useRouter();
  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Invite Guests</StepTitle>
        <StepDescription>Invite your guestdsdss</StepDescription>
      </StepHeader>
      <StepContent className="border-t">
        <div className="flex h-[500px] w-full px-2">
          <InviteGuests
            eventId={eventId}
            userName={userName}
            onInviteComplete={() => {
              router.push(paths.home.root);
            }}
          />
        </div>
      </StepContent>
    </StepContainer>
  );
};

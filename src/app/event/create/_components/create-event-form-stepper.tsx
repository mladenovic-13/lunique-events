"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { CreateEventStep } from "./steps/create-event-step";
import { EventInviteGuestsStep } from "./steps/event-invite-guests-step";
import { EventRegistrationStep } from "./steps/event-registration-step";

export const CreateEventSteper = () => {
  const searchParams = useSearchParams();

  const step = searchParams.get("step") ?? "create";

  if (step === "create") return <CreateEventStep />;
  if (step === "registration") return <EventRegistrationStep />;
  if (step === "guests") return <EventInviteGuestsStep />;

  return null;
};

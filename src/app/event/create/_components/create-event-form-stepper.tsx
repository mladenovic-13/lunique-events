"use client";

import React from "react";
import {
  CalendarIcon,
  MapPinIcon,
  TextIcon,
  UserCheck2Icon,
  Users2Icon,
} from "lucide-react";

import { Step, type StepItem, Stepper } from "@/components/common/stepper";
import { StepperStoreProvider } from "@/components/providers/stepper-store-provider";

import { EventBasicDetailsStep } from "./steps/event-basic-details-step";
import { EventDateStep } from "./steps/event-date-step";
import { EventInviteGuestsStep } from "./steps/event-invite-guests-step";
import { EventLocationStep } from "./steps/event-location-step";
import { EventRegistrationStep } from "./steps/event-registration-step";

const steps = [
  { label: "Basic Details", icon: TextIcon },
  { label: "Location", icon: MapPinIcon },
  { label: "Date & Time", icon: CalendarIcon },
  { label: "Registration", icon: UserCheck2Icon },
  { label: "Guests", icon: Users2Icon },
] satisfies StepItem[];

const stepsContent = [
  <EventBasicDetailsStep key={0} />,
  <EventLocationStep key={1} />,
  <EventDateStep key={2} />,
  <EventRegistrationStep key={3} />,
  <EventInviteGuestsStep key={4} />,
];

export const CreateEventSteper = () => {
  return (
    <StepperStoreProvider>
      <Stepper
        orientation="horizontal"
        size="sm"
        initialStep={0}
        steps={steps}
        className="pb-5 md:py-5"
        variant="line"
        responsive={false}
        styles={{
          "step-label-container": "hidden md:block",
        }}
      >
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              {stepsContent[index]}
            </Step>
          );
        })}
      </Stepper>
    </StepperStoreProvider>
  );
};

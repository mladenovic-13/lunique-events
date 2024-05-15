"use client";

import React from "react";
import { TextIcon, UserCheck2Icon, Users2Icon } from "lucide-react";

import { Step, type StepItem, Stepper } from "@/components/common/stepper";
import { StepperStoreProvider } from "@/components/providers/stepper-store-provider";

import { EventBasicDetailsStep } from "./steps/create-event-step";
import { EventInviteGuestsStep } from "./steps/event-invite-guests-step";
import { EventRegistrationStep } from "./steps/event-registration-step";

const steps = [
  { label: "Create Event", icon: TextIcon },
  { label: "Registration", icon: UserCheck2Icon },
  { label: "Guests", icon: Users2Icon },
] satisfies StepItem[];

const stepsContent = [
  <EventBasicDetailsStep key={0} />,
  <EventRegistrationStep key={1} />,
  <EventInviteGuestsStep key={2} />,
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

"use client";

import React from "react";
import {
  CalendarIcon,
  CheckCheckIcon,
  DollarSignIcon,
  MapPinIcon,
  TextIcon,
  UserCheck2Icon,
} from "lucide-react";

import {
  Step,
  type StepItem,
  Stepper,
  useStepper,
} from "@/components/common/stepper";

import { EventBasicDetailsStep } from "./steps/event-basic-details-step";
import { EventConfirmStep } from "./steps/event-confirm-step";
import { EventDateStep } from "./steps/event-date-step";
import { EventInviteGuestsStep } from "./steps/event-invite-guests-step";
import { EventLocationStep } from "./steps/event-location-step";
import { EventRegistrationStep } from "./steps/event-registration-step";
import { EventTicketsStep } from "./steps/event-tickets-step";

const steps = [
  { label: "Basic Details", icon: TextIcon },
  { label: "Location", icon: MapPinIcon },
  { label: "Date & Time", icon: CalendarIcon },
  { label: "Registration", icon: UserCheck2Icon },
  { label: "Tickets", icon: DollarSignIcon },
  { label: "Confirm", icon: CheckCheckIcon },
] satisfies StepItem[];

const stepsContent = [
  <EventBasicDetailsStep key={1} />,
  <EventLocationStep key={2} />,
  <EventDateStep key={3} />,
  <EventRegistrationStep key={4} />,
  <EventTicketsStep key={5} />,
  <EventConfirmStep key={6} />,
];

export const CreateEventSteper = () => {
  return (
    <Stepper
      orientation="horizontal"
      size="sm"
      initialStep={0}
      steps={steps}
      className="md:py-5"
      variant="line"
    >
      {steps.map((stepProps, index) => {
        return (
          <Step key={stepProps.label} {...stepProps} className="">
            {stepsContent[index]}
          </Step>
        );
      })}

      <AfterStepperCompleted>
        <EventInviteGuestsStep />
      </AfterStepperCompleted>
    </Stepper>
  );
};

const AfterStepperCompleted = ({ children }: { children: React.ReactNode }) => {
  const { hasCompletedAllSteps } = useStepper();

  return hasCompletedAllSteps ? children : null;
};

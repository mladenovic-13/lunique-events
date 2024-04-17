"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
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
import { Form } from "@/components/ui/form";

import { EventBasicInfoStep } from "./steps/event-basic-info-step";
import { EventDateStep } from "./steps/event-date-step";
import { EventInviteGuestsStep } from "./steps/event-invite-guests-step";
import { EventLocationStep } from "./steps/event-location-step";
import { EventRegistrationStep } from "./steps/event-registration-step";
import { EventTicketsStep } from "./steps/event-tickets-step";
import { defaultValues, eventSchema } from "./validation";

const steps = [
  { label: "Basic Info", icon: TextIcon },
  { label: "Location", icon: MapPinIcon },
  { label: "Date & Time", icon: CalendarIcon },
  { label: "Registration", icon: UserCheck2Icon },
  { label: "Tickets", icon: DollarSignIcon },
] satisfies StepItem[];

const stepsContent = [
  <EventBasicInfoStep key={1} />,
  <EventLocationStep key={2} />,
  <EventDateStep key={3} />,
  <EventRegistrationStep key={4} />,
  <EventTicketsStep key={5} />,
];

export const CreateEventSteper = () => {
  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <Stepper
        orientation="horizontal"
        size="sm"
        initialStep={0}
        steps={steps}
        className="md:py-5"
      >
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              {stepsContent[index]}
            </Step>
          );
        })}

        <AfterStepperCompleted>
          <EventInviteGuestsStep />
        </AfterStepperCompleted>
      </Stepper>
    </Form>
  );
};

const AfterStepperCompleted = ({ children }: { children: React.ReactNode }) => {
  const { hasCompletedAllSteps } = useStepper();

  return hasCompletedAllSteps ? children : null;
};

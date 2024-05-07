"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useStepper } from "@/components/common/stepper";
import { Button } from "@/components/ui/button";

import {
  StepContainer,
  StepContent,
  StepDescription,
  StepFooter,
  StepHeader,
  StepTitle,
} from "./common";

export const EventTicketsStep = () => {
  const { isDisabledStep, nextStep, prevStep } = useStepper();

  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Tickets</StepTitle>
        <StepDescription>Tickets description</StepDescription>
      </StepHeader>
      <StepContent>Coming soon</StepContent>
      <StepFooter className="justify-between">
        <Button
          type="button"
          size="sm"
          disabled={isDisabledStep}
          onClick={prevStep}
          variant="secondary"
        >
          <ChevronLeftIcon className="mr-1.5 size-4" /> Back
        </Button>
        <Button type="button" size="sm" onClick={nextStep}>
          Continue <ChevronRightIcon className="ml-1.5 size-4" />
        </Button>
      </StepFooter>
    </StepContainer>
  );
};

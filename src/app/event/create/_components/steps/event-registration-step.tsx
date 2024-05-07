"use client";

import { ChevronRightIcon } from "lucide-react";

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

export const EventRegistrationStep = () => {
  const { isDisabledStep, nextStep } = useStepper();

  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Registration</StepTitle>
        <StepDescription>Registration description</StepDescription>
      </StepHeader>
      <StepContent>Coming soon</StepContent>
      <StepFooter className="justify-end gap-3">
        <Button
          type="button"
          size="sm"
          disabled={isDisabledStep}
          onClick={nextStep}
          variant="ghost"
        >
          Skip for now
        </Button>
        <Button size="sm" onClick={nextStep}>
          Continue
          <ChevronRightIcon className="ml-1.5 size-4" />
        </Button>
      </StepFooter>
    </StepContainer>
  );
};

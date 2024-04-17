"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useStepper } from "@/components/common/stepper";
import { Button } from "@/components/ui/button";

import {
  StepContent,
  StepDescriptiom,
  StepFooter,
  StepHeader,
  StepTitle,
} from "./common";

// import { useFormContext } from "react-hook-form";

// import { type EventSchema } from "./validation";

export const EventLocationStep = () => {
  const { isDisabledStep, nextStep, prevStep } = useStepper();
  // const form = useFormContext<EventSchema>();

  return (
    <StepContent>
      <StepHeader>
        <StepTitle>Location</StepTitle>
        <StepDescriptiom>Location description</StepDescriptiom>
      </StepHeader>
      <div></div>
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
          Continue
          <ChevronRightIcon className="ml-1.5 size-4" />
        </Button>
      </StepFooter>
    </StepContent>
  );
};

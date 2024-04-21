"use client";

import { ChevronLeftIcon, SparklesIcon } from "lucide-react";

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

export const EventConfirmStep = () => {
  const { isDisabledStep, nextStep, prevStep } = useStepper();
  // const form = useFormContext<EventSchema>();

  return (
    <StepContent>
      <StepHeader>
        <StepTitle>Confirm</StepTitle>
        <StepDescriptiom>Confirm deskription</StepDescriptiom>
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
        <Button type="submit" size="sm" onClick={nextStep}>
          Create Event <SparklesIcon className="ml-1.5 size-4" />
        </Button>
      </StepFooter>
    </StepContent>
  );
};

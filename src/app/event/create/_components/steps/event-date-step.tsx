"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { utcToZonedTime } from "date-fns-tz";
import { ChevronRightIcon } from "lucide-react";
import * as z from "zod";

import { useStepper } from "@/components/common/stepper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { EventDateInput } from "../inputs/event-date-input";
import { EventTimeInput } from "../inputs/event-time-input";
import { EventTimezoneInput } from "../inputs/event-timezone-input";

import {
  StepContainer,
  StepContent,
  StepDescription,
  StepFooter,
  StepHeader,
  StepTitle,
} from "./common";

const formSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  timezone: z.string(),
});

type DateTime = z.infer<typeof formSchema>;

const defaultValues: DateTime = {
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export const EventDateStep = () => {
  const { isDisabledStep, nextStep, prevStep } = useStepper();

  const form = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: DateTime) => {
    console.log({ values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <StepContainer>
          <StepHeader>
            <StepTitle>Date & Time</StepTitle>
            <StepDescription>Enter your event date & time</StepDescription>
          </StepHeader>
          <StepContent className="mx-auto max-w-md">
            <FormField
              control={form.control}
              name="timezone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Timezone</FormLabel>
                  <FormControl>
                    <EventTimezoneInput
                      value={field.value}
                      onChange={field.onChange}
                      isDirty={fieldState.isDirty}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start date</FormLabel>
                    <FormControl>
                      <EventDateInput
                        value={new Date(field.value)}
                        onChange={(date) => field.onChange(date?.toISOString())}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start time</FormLabel>
                    <FormControl>
                      <EventTimeInput
                        value={new Date(field.value)}
                        onChange={(date) => field.onChange(date?.toISOString())}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>End date</FormLabel>
                    <FormControl>
                      <EventDateInput
                        value={new Date(field.value)}
                        onChange={(date) => field.onChange(date?.toISOString())}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End time</FormLabel>
                    <FormControl>
                      <EventTimeInput
                        value={new Date(field.value)}
                        onChange={(date) => field.onChange(date?.toISOString())}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </StepContent>
          <StepFooter className="md:justify-end md:gap-3">
            <Button
              type="button"
              size="sm"
              disabled={isDisabledStep}
              onClick={nextStep}
              variant="ghost"
            >
              Skip for now
            </Button>
            <Button size="sm">
              Continue
              <ChevronRightIcon className="ml-1.5 size-4" />
            </Button>
          </StepFooter>
        </StepContainer>
      </form>
    </Form>
  );
};

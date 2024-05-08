"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { utcToZonedTime } from "date-fns-tz";
import { ChevronRightIcon } from "lucide-react";
import * as z from "zod";

import { useStepper } from "@/components/common/stepper";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

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
  const { isDisabledStep, nextStep } = useStepper();

  const form = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: DateTime) => {
    console.log({ values });
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <StepContainer>
          <StepHeader className="flex justify-between gap-3 space-y-0 md:flex-row">
            <div>
              <StepTitle>Date & Time</StepTitle>
              <StepDescription>Enter your event date & time</StepDescription>
            </div>
            <FormField
              control={form.control}
              name="timezone"
              render={({ field, fieldState }) => (
                <FormItem>
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
          </StepHeader>
          <StepContent className="space-y-5 md:flex md:flex-row md:justify-center md:gap-10 md:space-y-0 md:py-5">
            <div className="md:space-y-2">
              <p className="text-center font-medium">Start Date</p>
              <div>
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <EventDateInput
                          value={new Date(field.value)}
                          onChange={(date) =>
                            field.onChange(date?.toISOString())
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex justify-center  space-y-0">
                      <FormControl>
                        <EventTimeInput
                          value={new Date(field.value)}
                          onChange={(date) =>
                            field.onChange(date?.toISOString())
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="md:space-y-2">
              <p className="text-center font-medium">End Date</p>
              <div>
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <EventDateInput
                          value={new Date(field.value)}
                          onChange={(date) =>
                            field.onChange(date?.toISOString())
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex justify-center space-y-0">
                      <FormControl>
                        <EventTimeInput
                          value={new Date(field.value)}
                          onChange={(date) =>
                            field.onChange(date?.toISOString())
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </StepContent>
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

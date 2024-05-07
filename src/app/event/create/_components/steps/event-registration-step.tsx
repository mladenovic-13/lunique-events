"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronRightIcon,
  GlobeIcon,
  LinkedinIcon,
  MailIcon,
  User2Icon,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import {
  StepContainer,
  StepContent,
  StepDescription,
  StepFooter,
  StepHeader,
  StepTitle,
} from "./common";

const formSchema = z.object({
  requireApproval: z.boolean(),
  capacity: z.boolean(),
  capacityValue: z.number(),
  capacityWaitlist: z.boolean(),
  name: z.boolean(),
  email: z.boolean(),
  website: z.boolean(),
  linkedIn: z.boolean(),
});

type RegistrationData = z.infer<typeof formSchema>;

export const EventRegistrationStep = () => {
  const { isDisabledStep, nextStep } = useStepper();

  const form = useForm<RegistrationData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: true,
      email: true,
      capacity: false,
      capacityValue: 0,
      capacityWaitlist: false,
      linkedIn: false,
      requireApproval: false,
      website: false,
    },
  });

  const onSubmit = (values: RegistrationData) => {
    console.log({ values });
  };

  const capacity = form.watch("capacity");

  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Registration</StepTitle>
        <StepDescription>Enter registration details</StepDescription>
      </StepHeader>
      <StepContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-3 md:gap-10">
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem className="flex max-w-xs items-center justify-between space-y-0">
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacityValue"
                disabled={!capacity}
                render={({ field }) => (
                  <FormItem className="flex max-w-xs items-center justify-between space-y-0">
                    <FormLabel>Max Capacity</FormLabel>
                    <FormControl>
                      <>
                        {capacity && (
                          <Input className="w-16" type="number" {...field} />
                        )}
                        {!capacity && (
                          <p className="text-muted-foreground">Unlimited</p>
                        )}
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacityWaitlist"
                render={({ field }) => (
                  <FormItem className="flex max-w-xs items-center justify-between space-y-0">
                    <div className="inline-flex items-center gap-1.5">
                      <FormLabel>Over-Capacity Waitlist</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={!capacity}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <StepHeader className="p-0">
              <StepTitle>Registration Questions</StepTitle>
              <StepDescription>
                We will ask guests the following questions when they register
                for the event.
              </StepDescription>
            </StepHeader>
            <div className="grid md:grid-cols-2 md:gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex max-w-xs items-center justify-between space-y-0">
                    <div className="inline-flex items-center gap-1.5">
                      <User2Icon className="size-4" />
                      <FormLabel>Name</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={() => (
                  <FormItem className="flex max-w-xs items-center justify-between space-y-0">
                    <div className="inline-flex items-center gap-1.5">
                      <MailIcon className="size-4" />
                      <FormLabel>Email</FormLabel>
                    </div>
                    <FormControl>
                      <Switch checked={true} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="flex max-w-xs items-center justify-between space-y-0">
                    <div className="inline-flex items-center gap-1.5">
                      <GlobeIcon className="size-4" />
                      <FormLabel>Website</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedIn"
                render={({ field }) => (
                  <FormItem className="flex max-w-xs items-center justify-between space-y-0">
                    <div className="inline-flex items-center gap-1.5">
                      <LinkedinIcon className="size-4" />
                      <FormLabel>LinkedIn</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <StepHeader className="p-0">
              <StepTitle>Custom Questions</StepTitle>
              <StepDescription>
                You are not asking guests additional questions.
              </StepDescription>
            </StepHeader>
          </form>
        </Form>
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
        <Button size="sm" onClick={nextStep}>
          Continue
          <ChevronRightIcon className="ml-1.5 size-4" />
        </Button>
      </StepFooter>
    </StepContainer>
  );
};

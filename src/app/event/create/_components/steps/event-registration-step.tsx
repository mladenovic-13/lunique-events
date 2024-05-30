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
import { redirect, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  type EventRegistration,
  eventRegistrationSchema,
} from "@/lib/validation";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

import { EventQuestionsInput } from "../inputs/event-questions-input";

import {
  StepContainer,
  StepContent,
  StepDescription,
  StepFooter,
  StepHeader,
  StepTitle,
} from "./common";

export const EventRegistrationStep = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const step = searchParams.get("step");

  const form = useForm<EventRegistration>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      name: true,
      email: true,
      website: false,
      linkedIn: false,
      capacity: false,
      capacityValue: 100,
      capacityWaitlist: false,
      requireApproval: false,
      questions: [],
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const { mutate: createRules } =
    api.event.createRegisrationRules.useMutation();

  const onSubmit = (values: EventRegistration) => {
    if (!id) return;

    console.log({ values });

    createRules(
      { ...values, eventId: id },
      {
        onSuccess: () => {
          toast({ title: "Successfully created registration rules" });
          const params = new URLSearchParams();
          params.set("id", id);
          params.set("step", "guests");

          router.push(paths.event.create + "?" + params.toString());
        },
        onError: () =>
          toast({
            title: "Failed to create registration rules",
            variant: "destructive",
          }),
      },
    );
  };

  const onSkip = () => {
    if (!id) return;

    const params = new URLSearchParams();
    params.set("id", id);
    params.set("step", "guests");
    router.push(paths.event.create + "?" + params.toString());
  };

  const capacity = form.watch("capacity");

  if (!step || !id) redirect(paths.event.create);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:space-y-8">
        <StepContainer>
          <StepHeader>
            <StepTitle>Registration</StepTitle>
            <StepDescription>Enter registration details</StepDescription>
          </StepHeader>
          <StepContent className="space-y-3 md:space-y-8">
            <div className="grid md:grid-cols-4 md:gap-5">
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem className="flex h-9 items-center justify-between  gap-3 space-y-0 md:justify-start">
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
                  <FormItem className="flex h-9 items-center justify-between  gap-3 space-y-0 md:justify-start">
                    <FormLabel>Max Capacity</FormLabel>
                    <FormControl className="w-16">
                      <>
                        {capacity && (
                          <Input className="w-20" type="number" {...field} />
                        )}
                        {!capacity && (
                          <Input
                            className="w-20 text-xs"
                            type="text"
                            value="Unlimited"
                            disabled
                          />
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
                  <FormItem className="flex h-9 items-center  justify-between gap-3 space-y-0 md:justify-start">
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

              <FormField
                control={form.control}
                name="requireApproval"
                render={({ field }) => (
                  <FormItem className="flex h-9 items-center justify-between gap-3 space-y-0 md:justify-start">
                    <FormLabel>Require Approval</FormLabel>
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

            <StepHeader className="p-0 pt-3 md:p-0">
              <StepTitle>Registration Questions</StepTitle>
              <StepDescription>
                We will ask guests the following questions when they register
                for the event.
              </StepDescription>
            </StepHeader>

            <div className="grid gap-1.5 md:grid-cols-4 md:gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex h-9 items-center justify-between gap-3 space-y-0 md:justify-start">
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
                  <FormItem className="flex h-9 items-center justify-between gap-3 space-y-0 md:justify-start">
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
                  <FormItem className="flex h-9 items-center justify-between gap-3 space-y-0 md:justify-start">
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
                  <FormItem className="flex h-9 items-center justify-between gap-3 space-y-0 md:justify-start">
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

            <StepHeader className="p-0 py-5 md:p-0">
              <StepTitle>Custom Questions</StepTitle>
              <StepDescription>
                Add a question to collect information from your guests.
              </StepDescription>
            </StepHeader>

            <FormField
              control={form.control}
              name="questions"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-3 space-y-0 md:justify-start">
                  <FormControl>
                    <EventQuestionsInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </StepContent>
          <StepFooter className="justify-end gap-3 pt-5 md:pt-0">
            <Button type="button" size="sm" onClick={onSkip} variant="ghost">
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

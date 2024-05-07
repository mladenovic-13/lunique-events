"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SparklesIcon } from "lucide-react";

import { useStepper } from "@/components/common/stepper";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { basicDetailsSchema, type EventBasicDetails } from "@/lib/validation";
import { api } from "@/trpc/react";

import { EventOrganizationInput } from "../inputs/event-organization-input";
import { EventVisibilityInput } from "../inputs/event-visibility-input";
import { ImageUpload } from "../inputs/image-upload";

import {
  StepContainer,
  StepContent,
  StepDescription,
  StepFooter,
  StepHeader,
  StepTitle,
} from "./common";

const defaultValues: EventBasicDetails = {
  name: "",
  description: "",
  public: true,
  thumbnailUrl: "",
  organization: "",
};

export const EventBasicDetailsStep = () => {
  const { nextStep } = useStepper();

  const form = useForm({
    defaultValues,
    resolver: zodResolver(basicDetailsSchema),
  });

  const { mutate: createEvent } = api.event.create.useMutation();
  const { toast } = useToast();

  const onSubmit = (values: EventBasicDetails) => {
    createEvent(values, {
      onSuccess: () =>
        toast({
          title: "Event create",
          description: "Event created successfully",
        }),
      onError: () => toast({ title: "Failed to create event" }),
    });
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <StepContainer>
          <StepHeader>
            <StepTitle>Basic Details</StepTitle>
            <StepDescription>
              Enter basic details about your event
            </StepDescription>
          </StepHeader>
          <StepContent className="grid grid-cols-1 gap-5 md:grid-cols-5">
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-3 md:col-span-3">
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <EventOrganizationInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="public"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <EventVisibilityInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter youre event name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={7}
                        placeholder="Enter youre event short description..."
                        className="resize-none"
                        {...field}
                      />
                      <FormMessage />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </StepContent>

          <StepFooter className="flex justify-end">
            <Button size="sm">
              <SparklesIcon className="mr-1.5 size-4" />
              Create Event
            </Button>
          </StepFooter>
        </StepContainer>
      </form>
    </Form>
  );
};

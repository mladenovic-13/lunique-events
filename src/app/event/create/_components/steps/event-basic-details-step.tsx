"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SparklesIcon } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

import { ImageUpload } from "../image-upload";
import { EventOrganizationInput } from "../inputs/event-organization-input";
import { EventVisibilityInput } from "../inputs/event-visibility-input";

import {
  StepContainer,
  StepContent,
  StepDescription,
  StepFooter,
  StepHeader,
  StepTitle,
} from "./common";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  thumbnailUrl: z.string(),
  organization: z.string(),
  public: z.boolean(),
});

type BasicDetails = z.infer<typeof formSchema>;

const defaultValues: BasicDetails = {
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
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: BasicDetails) => {
    console.log({ values });
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
                    <EventOrganizationInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="public"
                  render={({ field }) => (
                    <EventVisibilityInput
                      value={field.value}
                      onChange={field.onChange}
                    />
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

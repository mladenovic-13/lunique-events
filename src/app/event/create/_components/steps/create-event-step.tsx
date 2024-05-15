"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Libraries, useLoadScript } from "@react-google-maps/api";
import { SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { env } from "@/env.mjs";
import { useOrganizationId } from "@/hooks/use-config-store";
import { basicDetailsSchema, type EventBasicDetails } from "@/lib/validation";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

import { EventDateInput } from "../inputs/event-date-input";
import { EventLocationInput } from "../inputs/event-location-input";
import { EventTimeInput } from "../inputs/event-time-input";
import { EventTimezoneInput } from "../inputs/event-timezone-input";
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
  date: new Date().toISOString(),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  location: null,
};

export const CreateEventStep = () => {
  const libraries = useMemo<Libraries>(() => ["places"], []);

  const organization = useOrganizationId();

  const form = useForm({
    defaultValues,
    resolver: zodResolver(basicDetailsSchema),
  });

  const { mutate: createEvent, isLoading } = api.event.create.useMutation();
  const { toast } = useToast();
  const router = useRouter();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    preventGoogleFontsLoading: true,
    libraries,
  });

  const onSubmit = (values: EventBasicDetails) => {
    if (!values.location?.placeId) {
      form.setError("location", {
        type: "required",
        message: "Please select valid location",
      });
      return;
    }
    if (!organization) return;

    createEvent(
      { ...values, organization },
      {
        onSuccess: (event) => {
          toast({
            title: "Event created",
            description: "Event created successfully",
          });
          const params = new URLSearchParams();
          params.set("step", "registration");
          params.set("id", event.id);

          router.replace(paths.event.create + "?" + params.toString());
        },
        onError: () => toast({ title: "Failed to create event" }),
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <StepContainer>
          <StepHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <StepTitle>Event details</StepTitle>
              <StepDescription>Enter youre event basic details</StepDescription>
            </div>
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
          </StepHeader>
          <StepContent className="grid gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Event name"
                      className="h-fit rounded-none border-x-0 border-b border-t-0 p-0 text-5xl shadow-none focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-5 gap-10">
              <div className="col-span-2">
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
              <div className="col-span-3 space-y-2">
                <div className="space-y-2">
                  <Label>Date & Time</Label>
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="date"
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
                      name="date"
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
                  </div>
                </div>

                {isLoaded && (
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <EventLocationInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Enter your event short description..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </StepContent>

          <StepFooter className="flex justify-end">
            <Button size="sm" disabled={isLoading}>
              <SparklesIcon className="mr-1.5 size-4" />
              Create Event
            </Button>
          </StepFooter>
        </StepContainer>
      </form>
    </Form>
  );
};

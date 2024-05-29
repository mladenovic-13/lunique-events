"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Libraries, useLoadScript } from "@react-google-maps/api";
import { GlobeIcon, LinkedinIcon, MailIcon, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { EventDateInput } from "@/app/event/create/_components/inputs/event-date-input";
import { EventLocationInput } from "@/app/event/create/_components/inputs/event-location-input";
import { EventTimeInput } from "@/app/event/create/_components/inputs/event-time-input";
import { EventTimezoneInput } from "@/app/event/create/_components/inputs/event-timezone-input";
import { EventVisibilityInput } from "@/app/event/create/_components/inputs/event-visibility-input";
import { OrganizationSelect } from "@/app/home/(events)/_components/organization-select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";
import { type UpdateEvent, updateEventSchema } from "@/lib/validation";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/react";

// import { PickLocation } from "./update-form/pick-location";
// import { SelectOrganization } from "./update-form/select-organization";
// import { TimePicker } from "./update-form/time-picker";
// import { DatePickerDemo } from "./date-picker-demo";

interface EditEventFormProps {
  event: RouterOutputs["event"]["get"];
  defaultValues: UpdateEvent;
  onEventUpdate: () => void;
}
export const NewEditEventForm = ({
  event,
  defaultValues,
  onEventUpdate,
}: EditEventFormProps) => {
  const updateForm = useForm<UpdateEvent>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: defaultValues,
  });
  const { mutate: updateEvent } = api.event.update.useMutation();
  const { data: organizations } = api.organization.list.useQuery();

  const router = useRouter();

  const libraries: Libraries = ["places"];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const capacity = updateForm.watch("capacity");
  const onSubmit = (data: UpdateEvent) => {
    if (event) {
      console.log(data);
      updateEvent(
        { eventId: event.id, eventSchema: data },
        {
          onSuccess: () => {
            toast({ title: "Event updated" });
            onEventUpdate();
            router.refresh();
          },
          onError: () =>
            toast({ variant: "destructive", title: "Failed to update event" }),
        },
      );
    }
  };
  const onErrors = (errors: unknown) => {
    toast({ title: "Frontend error, check console" });
    console.log("ERROS", { errors });
    console.log(defaultValues);
  };

  useEffect(() => {
    if (!updateForm.formState.isDirty) {
      updateForm.reset({
        ...defaultValues,
      });
    }
  }, [updateForm, defaultValues]);

  return (
    <div className="">
      {event && organizations && (
        <Form {...updateForm}>
          <form
            onSubmit={updateForm.handleSubmit(onSubmit, onErrors)}
            id="edit-event-form"
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-6 px-0 md:flex-row md:justify-between md:px-4">
              <div className="flex w-full flex-col gap-4 md:pr-2">
                <h1 className="text-base font-semibold md:pb-4 md:text-xl">
                  Basic Details
                </h1>
                <div className="flex w-full justify-between md:flex-row">
                  <FormField
                    control={updateForm.control}
                    name="organization"
                    render={() => (
                      <FormItem>
                        <FormLabel>Organization</FormLabel>
                        <FormControl>
                          <OrganizationSelect
                            className="bg-background"

                            // value={field.value}
                            // onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={updateForm.control}
                    name="public"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visibility</FormLabel>
                        <FormControl>
                          <EventVisibilityInput
                            className="bg-background"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={updateForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex. Lunique Hackathon, Conference, etc.."
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex w-full items-end justify-start gap-4 md:flex-row">
                  <FormField
                    control={updateForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date & Time</FormLabel>

                        <FormControl>
                          <EventDateInput
                            // value={new Date(field.value)}
                            // onChange={(date) =>
                            //   field.onChange(date?.toISOString())
                            // }
                            value={new Date()}
                            onChange={() => field.onChange(field.value)}
                            className="bg-background"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={updateForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <EventTimeInput
                            value={new Date(field.value)}
                            onChange={(date) =>
                              field.onChange(date?.toISOString())
                            }
                            className="bg-background"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={updateForm.control}
                    name="timezone"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <EventTimezoneInput
                            value={field.value}
                            onChange={field.onChange}
                            isDirty={fieldState.isDirty}
                            className="bg-background"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {isLoaded && (
                  <FormField
                    control={updateForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <EventLocationInput
                            value={field.value}
                            onChange={field.onChange}
                            className="bg-background"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={updateForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Enter your event short description..."
                          className="resize-none bg-background"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col gap-4 md:pl-2">
                <h1 className="text-base font-semibold md:pb-4 md:text-xl">
                  Registration Settings
                </h1>
                <div className="flex w-full flex-col gap-1 rounded-lg border bg-background p-4">
                  <FormField
                    control={updateForm.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem className="flex w-full items-start justify-between">
                        <div className="flex flex-col items-start justify-start gap-1">
                          <FormLabel>Capacity</FormLabel>
                          <FormDescription>
                            <p>
                              Turn ON to enable Maximum Capacity input,
                              <br />
                              otherwise, capacity is unlimited.
                            </p>
                          </FormDescription>
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
                    control={updateForm.control}
                    name="capacityValue"
                    disabled={!capacity}
                    render={({ field }) => (
                      <FormItem className="flex h-9 items-center justify-between  gap-3 space-y-0">
                        <FormLabel
                          className={cn(
                            !capacity && "text-accent-foreground/40",
                            capacity && "text-accent-foreground",
                          )}
                        >
                          Max Capacity
                        </FormLabel>
                        <FormControl className="w-16">
                          <>
                            {capacity && (
                              <Input
                                className="w-20 text-right"
                                type="number"
                                {...field}
                              />
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
                </div>
                <FormField
                  control={updateForm.control}
                  name="capacityWaitlist"
                  disabled={!capacity}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between gap-4 rounded-lg border bg-background p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Over-Capacity Waitlist
                        </FormLabel>
                        <FormDescription className=" ">
                          Toggle Waitlist for Overflow Guests
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={!capacity}
                          checked={!capacity ? false : field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="requireApproval"
                  disabled={!capacity}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between gap-4 rounded-lg border bg-background p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Required Approval
                        </FormLabel>
                        <FormDescription className=" ">
                          Toggle Required Approval for Event
                        </FormDescription>
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
            </div>
            <div className="flex flex-col gap-2 p-0 md:mx-4 md:rounded-lg md:bg-background md:p-4">
              <div className="flex flex-col gap-0 md:pb-4">
                <h1 className="text-base font-semibold  md:text-xl">
                  Registration Questions
                </h1>
                <p className="text-sm text-accent-foreground/60">
                  We will ask guests the following questions when they register
                  for the event.
                </p>
              </div>
              <div className="grid gap-1.5 rounded-lg bg-background p-4 md:grid-cols-4 md:gap-5 md:rounded-none md:bg-transparent md:p-0">
                <FormField
                  control={updateForm.control}
                  name="userName"
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
                  control={updateForm.control}
                  name="userEmail"
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
                  control={updateForm.control}
                  name="userWebsite"
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
                  control={updateForm.control}
                  name="userLinkedIn"
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
              {/* <FormField
                control={updateForm.control}
                name="questions"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-3 space-y-0 rounded-lg bg-background p-2 md:justify-start md:rounded-none md:bg-transparent md:p-0">
                    <FormControl>
                      <EventQuestionsInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

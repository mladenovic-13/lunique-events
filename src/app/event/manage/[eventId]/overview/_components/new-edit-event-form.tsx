"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Libraries, useLoadScript } from "@react-google-maps/api";
import { ArrowRightIcon, CircleCheckBigIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  defaultValues,
  type EventSchema,
  eventSchema,
} from "@/app/event/create/_components/validation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";

import { PickLocation } from "./update-form/pick-location";
import { SelectOrganization } from "./update-form/select-organization";
import { TimePicker } from "./update-form/time-picker";
import { DatePickerDemo } from "./date-picker-demo";

interface EditEventFormProps {
  event: RouterOutputs["event"]["get"];
  onEventUpdate: () => void;
}
export const NewEditEventForm = ({
  event,
  onEventUpdate,
}: EditEventFormProps) => {
  const updateForm = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultValues,
  });
  const { mutate: updateEvent } = api.event.update.useMutation();
  const { data: organizations } = api.organization.list.useQuery();
  const router = useRouter();

  useEffect(() => {
    if (event && !updateForm.formState.isDirty) {
      updateForm.reset({
        name: event.name ?? undefined,
        startDateTime: {
          date: event.startDate,
          time: event.startTime,
        },
        endDateTime: {
          date: event.endDate ?? undefined,
          time: event.endTime ?? undefined,
        },
        capacity: {
          value: event.capacityValue,
          waitlist: event.capacityWaitlist ?? undefined,
        },
        description: event.description ?? undefined,
        public: event.isPublic,
        requireApproval: event.requireApproval,
        tickets: event.tickets,
        thumbnailUrl: event.thumbnailUrl ?? "testUrl",
        location: {
          ...event.location,
          description: event.location?.description ?? "null",
          position: {
            lat: event.location?.lat ?? undefined,
            lng: event.location?.lng ?? undefined,
          },
        },
        organization: event.organization.name,
        theme: {
          theme: event.pageStyle?.theme ?? undefined,
          font: event.pageStyle?.font ?? undefined,
          mode: event.pageStyle?.mode ?? undefined,
        },
        timezone: {
          label: event.timezone?.label ?? undefined,
          value: event.timezone?.value ?? undefined,
          city: event.timezone?.city ?? undefined,
        },
      });
    }
  }, [updateForm, event]);

  const libraries: Libraries = ["places"];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onSubmit = (data: EventSchema) => {
    if (event) {
      updateEvent(
        { eventId: event.id, eventSchema: data },
        {
          onSuccess: (event) => {
            console.log({ event });
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
    console.log({ errors });
  };

  return (
    <div className="">
      {event && organizations && (
        <Form {...updateForm}>
          <form
            onSubmit={updateForm.handleSubmit(onSubmit, onErrors)}
            className="space-y-5 px-0 md:px-4"
            id="edit-event-form"
          >
            <div className="flex flex-col gap-4  md:flex md:flex-row md:justify-between">
              <div className="w-full space-y-4 p-0">
                <h1 className="text-lg font-bold">Basic Info</h1>
                <FormField
                  control={updateForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Event name</FormLabel>
                      <FormControl>
                        <Input placeholder="Event name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="capacity.value"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="How many people can register"
                          {...updateForm.register("capacity.value", {
                            valueAsNumber: true,
                          })}
                          value={field.value ?? 0}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Card className="flex items-center justify-between bg-background/50">
                  <div className="w-1/2">
                    <FormField
                      control={updateForm.control}
                      name="startDateTime.date"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <DatePickerDemo
                              value={field.value}
                              onChange={field.onChange}
                              className="justify-start"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={updateForm.control}
                      name="startDateTime.time"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <TimePicker
                              onChange={field.onChange}
                              value={field.value}
                              className="justify-start"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <ArrowRightIcon />
                  <div className="w-1/2">
                    <FormField
                      control={updateForm.control}
                      name="endDateTime.date"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <DatePickerDemo
                              value={field.value}
                              onChange={field.onChange}
                              className="justify-end"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={updateForm.control}
                      name="endDateTime.time"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <TimePicker
                              onChange={field.onChange}
                              value={field.value}
                              className="justify-end"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
                <div className="w-full space-y-4">
                  {isLoaded && (
                    <FormField
                      control={updateForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <PickLocation
                              defaultValue={field.value?.description}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              {/* ------------------------------------------ */}

              <div className="w-full space-y-4   px-0">
                <h1 className="text-lg font-bold">Organization</h1>
                <FormField
                  control={updateForm.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <SelectOrganization
                          organizations={organizations}
                          value={field.value ?? ""}
                          onChangeValue={field.onChange}
                          organizationId={event.organizationId}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <h1 className="text-lg font-bold">Event Options</h1>
                <FormField
                  control={updateForm.control}
                  name="capacity.waitlist"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Waitlist</FormLabel>
                        <FormDescription className=" ">
                          Toggle Waitlist for Overflow Guests
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
                  name="public"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Public Visibility
                        </FormLabel>
                        <FormDescription className=" ">
                          Switch to Set Event Visibility: Public/Private
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
                  name="tickets"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Tickets</FormLabel>
                        <FormDescription className=" ">
                          Toggle to Set Ticket Pricing: Free/Paid
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
                  name="requireApproval"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
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
            <Button className="flex w-full gap-2">
              <CircleCheckBigIcon size={20} />
              Update Event
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

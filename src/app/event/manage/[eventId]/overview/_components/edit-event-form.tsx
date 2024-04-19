"use client";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Event } from "@prisma/client";
import { Z } from "@upstash/redis/zmscore-07021e27";
import { CircleCheckIcon, ClockIcon } from "lucide-react";
import { z } from "zod";

import {
  defaultValues,
  type EventSchema,
  eventSchema,
} from "@/app/event/create/_components/validation";
import { OrganizationSelect } from "@/app/home/(events)/_components/organization-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { times } from "@/lib/times";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";

import { DatePickerDemo } from "./date-picker-demo";

interface EditEventFormProps {
  // event: Event; //Event model from Prisma client
  event: RouterOutputs["event"]["get"];
}
export const EditEventForm = ({ event }: EditEventFormProps) => {
  const updateForm = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultValues,
  });
  const { mutate: updateEvent } = api.event.update.useMutation();

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
        public: event.isPublic ?? undefined,
        requireApproval: event.requireApproval ?? undefined,
        tickets: event.tickets ?? undefined,
        thumbnailUrl: event.thumbnailUrl ?? "testUrl",
        location: {
          ...event.location,
          descripton: event.location?.description ?? "null",
          position: {
            lat: event.location?.lat ?? undefined,
            lng: event.location?.lng ?? undefined,
          },
        },
        organization: event.organization.name ?? undefined,
        theme: {
          theme: event.pageStyle?.theme ?? undefined,
          font: event.pageStyle?.font ?? undefined,
          mode: event.pageStyle?.mode ?? undefined,
        },
        timezone: {
          id: 123,
          label: event.timezone?.label ?? undefined,
          value: event.timezone?.value ?? undefined,
          city: event.timezone?.city ?? undefined,
        },
      });
    }
  }, [updateForm, event]);

  const onSubmit = (data: EventSchema) => {
    if (event) {
      updateEvent(
        { eventId: event.id, eventSchema: data },
        {
          onSuccess: (event) => {
            console.log({ event });
            toast({ title: "Event updated" });
          },
          onError: () =>
            toast({ variant: "destructive", title: "Failed to update event" }),
        },
      );
    }
  };
  const onErrors = (errors: unknown) => {
    alert("Frontend error, check console");
    console.log({ errors });
    console.log({ updateForm: updateForm });
  };

  return (
    <div className="p-2 pt-14">
      {event && (
        <form
          onSubmit={updateForm.handleSubmit(onSubmit, onErrors)}
          className="space-y-5"
        >
          <div className="flex flex-col gap-2">
            <Label className="">Organization</Label>
            <OrganizationSelect />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="">Event name</Label>
            <Input
              className="h-12 border-none text-4xl font-medium focus-visible:ring-0"
              placeholder="Event name"
              {...updateForm.register("name")}
            />
          </div>
          <div className="flex flex-col justify-between gap-5">
            <div className="flex w-full flex-col gap-2">
              <Label className=" font-semibold">Start</Label>
              <div className="flex  gap-2">
                <Controller
                  control={updateForm.control}
                  name="startDateTime.date"
                  render={({ field }) => (
                    <DatePickerDemo
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  control={updateForm.control}
                  name="startDateTime.time"
                  render={({ field }) => (
                    <TimePicker value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label className=" font-semibold">End</Label>
              <div className="flex  gap-2">
                <Controller
                  control={updateForm.control}
                  name="endDateTime.date"
                  render={({ field }) => (
                    <DatePickerDemo
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  control={updateForm.control}
                  name="endDateTime.time"
                  render={({ field }) => (
                    <TimePicker value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col gap-2">
            <Label>Location</Label>
            <Input
              type="search"
              placeholder="Location"
              value={event.locationId!}
            />
          </div> */}
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              {...updateForm.register("description")}
              placeholder="Type your description here"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Capacity</Label>
            <div className="flex items-center gap-2">
              (
              <Input
                type="number"
                {...updateForm.register("capacity.value", {
                  valueAsNumber: true,
                })}
              />
              <Input
                type="checkbox"
                {...updateForm.register("capacity.waitlist")}
              />
              <Switch checked={true} />
              <Label className="font-normal">Waitlist</Label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={true} />
            <Label className="font-normal">Public visibility</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={true} />
            <Label className="font-normal">Paid tickets</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={true} />
            <Label className="font-normal">Require approval</Label>
          </div>
          <div className="flex items-center gap-3">
            <Button className="gap-2 ">
              <CircleCheckIcon size={20} />
              <p className="text-base">Update Event</p>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

const TimePicker = ({ value, onChange }: TimePickerProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        icon={false}
        className="flex size-full w-fit items-center justify-center  border  bg-transparent p-0 px-4 text-sm shadow-none focus:ring-0 data-[state=open]:bg-muted-foreground/30 md:text-base"
      >
        <div className="flex items-center gap-2 text-sm">
          <ClockIcon size={17} className="text-accent-foreground/70" />
          {value}
        </div>
      </SelectTrigger>

      <SelectContent
        className="max-h-52 min-w-fit"
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
      >
        {times.map((time, idx) => (
          <SelectItem
            key={idx}
            icon={false}
            value={time}
            className="flex w-full justify-center"
          >
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

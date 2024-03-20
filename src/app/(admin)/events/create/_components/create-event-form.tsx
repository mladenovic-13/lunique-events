"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { EventApproval } from "./event-approval";
import { CalendarSelect } from "./event-calendar-select";
import { EventCapacity } from "./event-capacity";
import { EventDatePicker } from "./event-date";
import { EventDescription } from "./event-description";
import { EventLocation } from "./event-location";
import { EventTheme } from "./event-theme";
import { EventTickets } from "./event-tickets";
import { EventTimezone } from "./event-timezone";
import { VisibilitySelect } from "./event-visibility-select";
import { ImageUpload } from "./image-upload";
import { defaultValues, type EventSchema, eventSchema } from "./validation";

export const CreateEventForm = () => {
  const methods = useForm<EventSchema>({
    defaultValues,
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = (data: EventSchema) => {
    alert(JSON.stringify(data));
  };
  const onErrors = (errors: unknown) => {
    alert(JSON.stringify(errors));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, onErrors)}
        className="w-full space-y-5 md:flex md:flex-1 md:gap-5"
      >
        <div className="space-y-3 md:col-span-1 md:flex-1">
          <ImageUpload />
          <EventTheme />
        </div>

        <div className="space-y-3 md:w-3/5">
          <div className="flex justify-between">
            <CalendarSelect />

            <Controller
              control={methods.control}
              name="public"
              render={({ field }) => (
                <VisibilitySelect
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <Input
            className="h-12 border-none text-4xl font-medium focus-visible:ring-0"
            placeholder="Event name"
            {...methods.register("name")}
          />

          <div className="flex gap-2">
            {/* TODO: split in two components wrapped inside controller's render method */}
            <EventDatePicker />

            <Controller
              control={methods.control}
              name="timezone"
              render={({ field }) => (
                <EventTimezone value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <Controller
            control={methods.control}
            name="location"
            render={({ field }) => (
              <EventLocation value={field.value} onChange={field.onChange} />
            )}
          />

          <Controller
            control={methods.control}
            name="description"
            render={({ field }) => (
              <EventDescription value={field.value} onChange={field.onChange} />
            )}
          />

          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-muted-foreground">
              Event Options
            </p>
            <div className="rounded-md bg-muted ">
              <Controller
                control={methods.control}
                name="tickets"
                render={({ field }) => (
                  <EventTickets value={field.value} onChange={field.onChange} />
                )}
              />
              <div className="h-0.5 w-full bg-background" />
              <Controller
                control={methods.control}
                name="requireApproval"
                render={({ field }) => (
                  <EventApproval
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="h-0.5 w-full bg-background" />
              <Controller
                control={methods.control}
                name="capacity"
                render={({ field }) => (
                  <EventCapacity
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Create Event
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

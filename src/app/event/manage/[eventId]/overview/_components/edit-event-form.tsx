"use client";
import React, {
  type HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Libraries, useLoadScript } from "@react-google-maps/api";
import {
  Building2Icon,
  CircleCheckIcon,
  ClockIcon,
  MapPinIcon,
  SearchIcon,
  User2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { EventTimezone } from "@/app/event/create/_components/event-timezone";
import {
  defaultValues,
  type EventSchema,
  eventSchema,
} from "@/app/event/create/_components/validation";
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
import { env } from "@/env.mjs";
import { times } from "@/lib/times";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";
import { type Place } from "@/types";

import { DatePickerDemo } from "./date-picker-demo";

interface EditEventFormProps {
  event: RouterOutputs["event"]["get"];
  onEventUpdate: () => void;
}
export const EditEventForm = ({ event, onEventUpdate }: EditEventFormProps) => {
  const updateForm = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultValues,
  });
  const { mutate: updateEvent } = api.event.update.useMutation();
  const { data: organizations } = api.organization.list.useQuery();
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
  const router = useRouter();

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
    alert("Frontend error, check console");
    console.log({ errors });
  };

  return (
    <div className="pt-14 ">
      {event && organizations && (
        <form
          onSubmit={updateForm.handleSubmit(onSubmit, onErrors)}
          className="space-y-5"
        >
          <div className="flex flex-col gap-2">
            <Label className="">Organization</Label>
            {/* <OrganizationSelect /> */}
            <Controller
              control={updateForm.control}
              name="organization"
              render={({ field }) => (
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="h-8 w-full md:w-fit">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate">
                        {
                          organizations.find((org) =>
                            field.value
                              ? org.id === field.value
                              : org.id === event.organizationId,
                          )?.name
                        }
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {organizations
                      ?.sort((org) => (org.isPersonal ? -1 : 1))
                      .map((org) => (
                        <SelectItem key={org.id} value={org.id}>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center">
                              {org.isPersonal && (
                                <User2Icon className="size-4" />
                              )}
                              {!org.isPersonal && (
                                <Building2Icon className="size-4" />
                              )}
                            </div>
                            {org.name}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
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
            <div>
              <Controller
                control={updateForm.control}
                name="timezone"
                render={({ field }) => (
                  <EventTimezone
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Location</Label>
            {isLoaded && (
              <Controller
                control={updateForm.control}
                name="location"
                render={({ field }) => (
                  <PlacesAutocomplete
                    onChange={field.onChange}
                    defaultValue={field.value?.description ?? ""}
                  />
                )}
              />
            )}
          </div>
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
              <Input
                type="number"
                {...updateForm.register("capacity.value", {
                  valueAsNumber: true,
                })}
              />
              <Controller
                control={updateForm.control}
                name="capacity.waitlist"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label className="font-normal">Waitlist</Label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Controller
              control={updateForm.control}
              name="public"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label className="font-normal">Public visibility</Label>
          </div>
          <div className="flex items-center gap-3">
            <Controller
              control={updateForm.control}
              name="tickets"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label className="font-normal">Paid tickets</Label>
          </div>
          <div className="flex items-center gap-3">
            <Controller
              control={updateForm.control}
              name="requireApproval"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label className="font-normal">Require approval</Label>
          </div>
          <div className="sticky bottom-0 flex w-full items-center gap-3 rounded-lg p-4 backdrop-blur-sm">
            <Button className="w-full gap-2">
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

const PlacesAutocomplete = (props: {
  onChange: (place: Place) => void;
  defaultValue?: string;
}) => {
  const { onChange, defaultValue } = props;
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue, setValue]);

  const onSelect = useCallback(
    async (value: string) => {
      const place = data.find((item) => item.place_id === value);
      if (!place) return;

      const results = await getGeocode({ placeId: value });

      if (!results[0]) return;

      const position = getLatLng(results[0]);

      onChange({
        placeId: place.place_id,
        description: place.description,
        mainText: place.structured_formatting.main_text,
        secondaryText: place.structured_formatting.secondary_text,
        position,
      });
      setValue(place.description);
      setOpen(false);
    },
    [onChange, data, setOpen, setValue],
  );

  const isResultOpen = !!status;
  return (
    <div>
      <AutocompleteInput
        value={value}
        onValueChange={(val) => {
          setValue(val);
          setOpen(true);
        }}
        disabled={!ready}
        placeholder="Enter a location..."
      />
      {open && isResultOpen && (
        <AutocompleteResult>
          {open && isResultOpen && status === "OK" && (
            <AutocompleteResultGroup heading="Locations">
              {data.map(({ place_id, description }) => (
                <AutocompleteResultItem
                  key={place_id}
                  value={place_id}
                  onSelect={onSelect}
                >
                  <MapPinIcon className="mr-1.5 size-4 min-w-fit" />
                  {description}
                </AutocompleteResultItem>
              ))}
            </AutocompleteResultGroup>
          )}
          {open && isResultOpen && status === "ZERO_RESULTS" && (
            <AutocompleteResultEmpty />
          )}
        </AutocompleteResult>
      )}
    </div>
  );
};

interface AutocompleteInputProps extends HTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const AutocompleteInput = ({
  value,
  onValueChange,
  className,
  disabled,
  placeholder,
  ...props
}: AutocompleteInputProps) => {
  return (
    <span className="relative">
      <Input
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "h-10 items-center pl-10 shadow-none focus-visible:ring-0",
          className,
        )}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        {...props}
      />
      <div className="absolute left-0 top-0 flex size-10 items-center justify-center">
        <SearchIcon className="size-4" />
      </div>
    </span>
  );
};

const AutocompleteResultEmpty = () => (
  <div className="px-3 py-2 text-sm text-muted-foreground">
    Looks like there is no results. Try again with different terms.
  </div>
);

interface AutocompleteResultProps {
  children: React.ReactNode;
}

const AutocompleteResult = (props: AutocompleteResultProps) => (
  <div className="space-y-1.5 overflow-x-auto rounded-b-md bg-popover p-1.5">
    {props.children}
  </div>
);

interface AutocompleteResultGroupProps {
  heading?: string;
  children?: React.ReactNode;
}

const AutocompleteResultGroup = (props: AutocompleteResultGroupProps) => (
  <div>
    {props.heading && (
      <p className="px-3 py-2 text-sm font-semibold text-muted-foreground">
        {props.heading}
      </p>
    )}
    <div>{props.children}</div>
  </div>
);

interface AutocompleteResultItemProps {
  value: string;
  onSelect: (value: string) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const AutocompleteResultItem = (props: AutocompleteResultItemProps) => {
  const { value, onSelect, disabled } = props;

  return (
    <Button
      type="button"
      disabled={disabled}
      variant="ghost"
      onClick={() => onSelect(value)}
      className="flex w-full items-center justify-start px-3 hover:bg-accent/50"
    >
      {props.children}
    </Button>
  );
};

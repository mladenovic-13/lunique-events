"use client";

import { useCallback, useState } from "react";
import * as Popover from "@radix-ui/react-dialog";
import { type Libraries, useLoadScript } from "@react-google-maps/api";
import { MapPinIcon, VideoIcon, XIcon } from "lucide-react";
import usePlacesAutocomplete from "use-places-autocomplete";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { env } from "@/env.mjs";
import { type Place } from "@/types";

const libraries: Libraries = ["places"];

interface EventLocationProps {
  value: Place | null | undefined;
  onChange: (place: Place | null) => void;
}

export const EventLocation = ({ value, onChange }: EventLocationProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="relative">
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger
            type="button"
            className="w-full rounded-md border border-border bg-muted px-3.5 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30"
          >
            <span className="flex flex-col items-start">
              <span className="flex items-center gap-3 md:gap-5">
                <MapPinIcon className="size-4 text-muted-foreground md:size-5" />
                <span className="text-lg font-medium">
                  {value ? value.mainText : "Add Event Location"}
                </span>
              </span>
              <span className="pl-7 text-sm text-muted-foreground md:pl-9">
                {value
                  ? value.secondaryText
                  : "Offline location or virtual link"}
              </span>
            </span>
          </Popover.Trigger>

          <Popover.Overlay className="fixed inset-0 -top-3 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:hidden" />

          <Popover.Content className="fixed left-1/2  top-0 z-50 w-full max-w-lg -translate-x-1/2 p-3 duration-200 focus:outline-none focus-visible:ring-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]  sm:rounded-lg md:absolute md:left-0 md:top-16 md:w-full md:max-w-full md:translate-x-0 md:p-0 md:data-[state=closed]:slide-out-to-right-0 md:data-[state=closed]:slide-out-to-top-1/4 md:data-[state=open]:slide-in-from-left-0 md:data-[state=open]:slide-in-from-top-1/2">
            {isLoaded && (
              <PlacesAutocomplete onChange={onChange} setOpen={setOpen} />
            )}
          </Popover.Content>
        </Popover.Root>

        {value && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => onChange(null)}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full hover:bg-muted-foreground/30"
          >
            <XIcon className="size-4" />
          </Button>
        )}
      </div>

      {value && (
        <div className="py-3">TODO: Render map for {value.placeId}</div>
      )}
    </div>
  );
};

const PlacesAutocomplete = (props: {
  onChange: (place: Place) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { onChange, setOpen } = props;

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete();

  console.log({ data });

  const onSelect = useCallback(
    (value: string) => {
      const place = data.find((item) => item.place_id === value);
      if (!place) return;

      onChange({
        placeId: place.place_id,
        descripton: place.description,
        mainText: place.structured_formatting.main_text,
        secondaryText: place.structured_formatting.secondary_text,
      });
      setOpen(false);
    },
    [onChange, data, setOpen],
  );

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        disabled={!ready}
        value={value}
        onValueChange={setValue}
        placeholder="Enter event location..."
      />
      <CommandList>
        {status === "ZERO_RESULTS" && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        {status === "OK" && (
          <CommandGroup>
            {data.map(({ place_id, description }) => (
              <CommandItem
                key={place_id}
                value={place_id}
                onSelect={onSelect}
                keywords={[description]}
              >
                <MapPinIcon className="mr-1.5 size-4" />
                {description}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {!value && (
          // TODO: add recently used locations
          <CommandGroup heading="Recent Locations">
            <p className="px-2 text-sm text-muted-foreground">
              No recently used locations.
            </p>
          </CommandGroup>
        )}
        {!value && (
          // TODO: add zoom integrations
          <CommandGroup heading="Virtual Options">
            <CommandItem>
              <VideoIcon className="mr-1.5 size-4" />
              Create Zoom meeting
            </CommandItem>
            <CommandItem>
              <VideoIcon className="mr-1.5 size-4" />
              Select existing Zoom
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

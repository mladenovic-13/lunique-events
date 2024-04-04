"use client";

import React, { useCallback, useState } from "react";
import { Combobox } from "@headlessui/react";
import { type Libraries, LoadScript } from "@react-google-maps/api";
import { MapPinIcon } from "lucide-react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { env } from "@/env.mjs";
import { type Place } from "@/types";

import { LocationMap } from "./location-map";

const libraries: Libraries = ["places"];

const DEFAULT_LAT_LNG = {
  lat: 52.3676,
  lng: 4.9041,
};

interface EventLocationProps {
  value: Place | null;
  onChange: (place: Place | null) => void;
}

export const LocationInput = ({ value, onChange }: EventLocationProps) => {
  const [isInputVisible, setIsInputVisible] = useState(true);

  const onValueChange = (value: string) => {
    if (value === "city") {
      setIsInputVisible(true);
    }
    if (!value) {
      setIsInputVisible(false);
      onChange(null);
    }
  };

  return (
    <LoadScript
      id="google-map-script-loader"
      googleMapsApiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="space-y-1.5">
        <Label>Location</Label>

        <div className="relative">
          <Tabs
            value={isInputVisible ? "city" : ""}
            onValueChange={onValueChange}
            className="absolute left-1.5 top-1.5 z-50"
          >
            <TabsList>
              <TabsTrigger value="city">City</TabsTrigger>
              <TabsTrigger value="">Global</TabsTrigger>
            </TabsList>
          </Tabs>
          <LocationMap
            position={value?.position ?? DEFAULT_LAT_LNG}
            zoom={10}
          />
          {isInputVisible && (
            <div className="absolute inset-x-1.5 bottom-1.5 z-10">
              <PlacesAutocomplete value={value} onChange={onChange} />
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
};

const PlacesAutocomplete = (props: {
  value: Place | null;
  onChange: (place: Place) => void;
}) => {
  const { onChange, value } = props;

  const {
    ready,
    value: query,
    setValue: setQuery,
    suggestions: { data },
  } = usePlacesAutocomplete();

  const onSelect = useCallback(
    (value: (typeof data)[0]) => {
      if (!value) return;

      const place = data.find((item) => item.place_id === value.place_id);
      if (!place) return;

      getGeocode({ placeId: value.place_id })
        .then((res) => {
          if (!res[0]) return;

          const position = getLatLng(res[0]);

          onChange({
            placeId: place.place_id,
            descripton: place.description,
            mainText: place.structured_formatting.main_text,
            secondaryText: place.structured_formatting.secondary_text,
            position,
          });
        })
        .catch((err) => console.log(err));
    },
    [onChange, data],
  );

  if (!ready) return null;

  return (
    <div className="relative">
      {/* @ts-expect-error  TODO: fix type*/}
      <Combobox value={value} onChange={onSelect}>
        <div className="relative">
          <Combobox.Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            displayValue={(value: Place | null) => value?.descripton ?? ""}
            placeholder="Enter location..."
            className="flex h-9  w-full rounded-md border border-input bg-card px-3 py-1 pl-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="absolute inset-y-0 left-0 flex w-10 items-center justify-center">
            <MapPinIcon className="size-5 text-card-foreground/80" />
          </div>
        </div>
        <Combobox.Options className="absolute inset-x-0 top-10 z-50 rounded-md border bg-popover shadow">
          {data.map((item) => (
            <Combobox.Option
              key={item.place_id}
              value={item}
              className="cursor-pointer px-3 py-2 text-sm transition-all duration-200 hover:bg-muted/50"
            >
              {item.description}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

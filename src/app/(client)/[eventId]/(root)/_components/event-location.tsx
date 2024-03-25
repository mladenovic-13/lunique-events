"use client";

import { type Libraries, useLoadScript } from "@react-google-maps/api";

import { env } from "@/env.mjs";

import { EventSection } from "./event-section";
import { LocationMap } from "./location-map";

const libraries: Libraries = ["core"];

export const EventLocation = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <EventSection heading="Location">
      <div>
        <p className="font-medium">Obiliceva 51</p>
        <p className="text-sm text-muted-foreground">Pirot 18300, Serbia</p>
      </div>
      {isLoaded && (
        <LocationMap position={{ lat: 44.7971328, lng: 20.4537856 }} />
      )}
    </EventSection>
  );
};

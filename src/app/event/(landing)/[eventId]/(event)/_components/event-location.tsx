"use client";

import { useMemo } from "react";
import { type Libraries, useLoadScript } from "@react-google-maps/api";

import { env } from "@/env.mjs";

import { EventSection } from "./event-section";
import { LocationMap } from "./location-map";

interface EventLocationProps {
  lat?: number;
  lng?: number;
  mainText?: string;
  secondaryText?: string;
}

export const EventLocation = ({
  lat,
  lng,
  mainText: primaryText,
  secondaryText,
}: EventLocationProps) => {
  const libraries = useMemo<Libraries>(() => ["core"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <EventSection heading="Location">
      <div>
        {primaryText && <p className="font-medium">{primaryText}</p>}
        {secondaryText && (
          <p className="text-sm text-muted-foreground">{secondaryText}</p>
        )}
      </div>
      {isLoaded && (
        <LocationMap
          position={{ lat: lat ?? 44.7971328, lng: lng ?? 20.4537856 }}
        />
      )}
    </EventSection>
  );
};

import React, { useState } from "react";
import { CircleCheckIcon, MapPinIcon, VideoIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { type MeetingMode, type Place } from "@/types";

import { PlacesAutocomplete } from "./location-autocomplete";

// @TODO => add InPerson/Virtual field in locaition table ?

interface PickLocationProps {
  onChange: (place: Place) => void;
  defaultValue?: string;
}
export const PickLocation = ({ onChange, defaultValue }: PickLocationProps) => {
  const [meetingMode, setMeetingMode] = useState<MeetingMode>("inPerson");

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <LocationAccess
          defaultValue={meetingMode}
          onMeetingModeChange={(mode: MeetingMode) => setMeetingMode(mode)}
        />
        {meetingMode === "inPerson" && (
          <div className="w-full">
            <PlacesAutocomplete
              onChange={onChange}
              defaultValue={defaultValue}
            />
          </div>
        )}
      </div>
    </section>
  );
};

// @TODO
interface LocationAccessProps {
  defaultValue: MeetingMode;
  onMeetingModeChange: (mode: MeetingMode) => void;
}
const LocationAccess = ({
  defaultValue,
  onMeetingModeChange,
}: LocationAccessProps) => {
  const [meetingMode, setMeetingMode] = useState<MeetingMode>(defaultValue);
  const handleChangeMode = (mode: MeetingMode) => {
    setMeetingMode(mode);
    onMeetingModeChange(mode);
  };
  return (
    <div className="flex gap-4">
      <LocationPlatform
        value={"inPerson"}
        checked={meetingMode === "inPerson"}
        onClick={() => handleChangeMode("inPerson")}
      />
      <LocationPlatform
        value={"virutal"}
        checked={meetingMode === "virutal"}
        onClick={() => handleChangeMode("virutal")}
      />
    </div>
  );
};
interface LocationPlatformProps {
  value: MeetingMode;
  checked: boolean;
  onClick: () => void;
}
const LocationPlatform = ({
  value,
  checked,
  onClick,
}: LocationPlatformProps) => {
  let content = <div></div>;

  if (value === "inPerson")
    content = (
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-green-900/40 p-2">
          <MapPinIcon className="rounded-lg text-green-400" />
        </div>
        <p className="font-medium">In Person</p>
      </div>
    );
  if (value === "virutal")
    content = (
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-blue-900/40 p-2">
          <VideoIcon className="rounded-lg text-blue-400" />
        </div>
        <div className="flex flex-col">
          <p className="font-medium">Virtual</p>
        </div>
      </div>
    );

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border border-accent-foreground/10 bg-muted/90 p-1.5 transition-all hover:cursor-pointer hover:bg-inherit",
        !checked && "text-accent-foreground/30",
      )}
    >
      {content}
      {checked && (
        <CircleCheckIcon
          className={cn(
            value === "inPerson" && "text-green-400",
            value === "virutal" && "text-blue-400",
          )}
        />
      )}
    </div>
  );
};

import React from "react";

import { EventSettingsSkeleton } from "../event/manage/[eventId]/settings/_components/event-settings-skeleton";

function Loading() {
  return (
    <div className="mx-auto max-w-4xl">
      <EventSettingsSkeleton />
    </div>
  );
}

export default Loading;

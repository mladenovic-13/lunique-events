"use client";

import { cn } from "@/lib/utils";

// import { EventContact } from "./event-contact";
// import { EventDetails } from "./event-details";
// import { EventGallery } from "./event-gallery";
// import { EventGuests } from "./event-guests";
// import { EventHostedBy } from "./event-hosted-by";
// import { EventLocation } from "./event-location";
// import { EventThumbnail } from "./event-thumbnail";
// import { RegisterGuest } from "./register-guest";

export const EventPageContent = ({
  isMobile = false,
}: {
  isMobile?: boolean;
}) => {
  return (
    <div
      className={cn(
        "mx-auto max-w-4xl space-y-5 p-3 pb-10 md:flex md:gap-5 md:space-y-0",
        isMobile && "flex-col",
      )}
    >
      <div className={cn("space-y-5 md:w-2/5", isMobile && "w-full md:w-full")}>
        {/* <EventThumbnail /> */}
        <div
          className={cn(
            "hidden space-y-5 md:block",
            isMobile && "hidden md:hidden",
          )}
        >
          {/* <EventHostedBy /> */}
          {/* <EventGuests /> */}
          {/* <EventContact /> */}
        </div>
      </div>
      <div className={cn("space-y-5 md:w-3/5", isMobile && "w-full md:w-full")}>
        {/* <EventDetails /> */}
        {/* <RegisterGuest /> */}
        {/* <EventGallery /> */}
        {/* <EventLocation /> */}
        <div
          className={cn("space-y-5 md:hidden", isMobile && "block md:block")}
        >
          {/* <EventHostedBy /> */}
          {/* <EventGuests /> */}
          {/* <EventContact /> */}
        </div>
      </div>
    </div>
  );
};

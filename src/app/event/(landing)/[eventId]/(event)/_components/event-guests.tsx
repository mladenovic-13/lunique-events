import { type Guest } from "@prisma/client";

import { EventSection } from "./event-section";

export const EventGuests = ({ guests }: { guests: Guest[] }) => {
  return (
    <EventSection heading={`${guests.length} Going`}>
      {guests.length !== 0 && (
        <ul className="flex text-sm">
          {/* {guests.map((guest) => guest.name).join(", ")} */}
        </ul>
      )}
      {guests.length === 0 && (
        <p className="text-xs text-muted-foreground">No guests yet.</p>
      )}
    </EventSection>
  );
};

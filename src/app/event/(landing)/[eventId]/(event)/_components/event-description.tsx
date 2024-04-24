import { EventSection } from "./event-section";

export const EventDescription = ({ description }: { description: string }) => {
  return (
    <EventSection heading="Description">
      <p className="text-lg">{description}</p>
    </EventSection>
  );
};

import { EventSection } from "./event-section";

export const EventHostedBy = ({ name }: { name: string }) => {
  return <EventSection heading="Hosted By">{name}</EventSection>;
};

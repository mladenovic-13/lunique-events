import { EventPageContent } from "./_components/event-page-content";

export default function EventPage(
  {
    // params: { eventId },
  }: {
    params: {
      eventId: string;
    };
  },
) {
  return <EventPageContent />;
}

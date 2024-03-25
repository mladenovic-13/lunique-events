import { EventPageContent } from "./_components/event-page-content";

export default function ClientEventIdPage(
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

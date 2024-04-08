import { MainPage } from "@/components/layout/main-page";

import { EventActions } from "./_components/event-actions";
import { Events } from "./_components/events";

export default function EventsPage() {
  return (
    <MainPage>
      <EventActions />
      <Events />
    </MainPage>
  );
}

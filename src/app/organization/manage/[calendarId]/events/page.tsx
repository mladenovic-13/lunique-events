import { EventActions } from "@/app/home/(events)/_components/event-actions";
import { Events } from "@/app/home/(events)/_components/events";
import { MainPage } from "@/components/layout/main-page";

export default function CalendarEventsPage() {
  return (
    <MainPage>
      <EventActions />
      <Events />
    </MainPage>
  );
}

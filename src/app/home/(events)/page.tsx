import { notFound } from "next/navigation";

import { MainPage } from "@/components/layout/main-page";
import { api } from "@/trpc/server";

// import { EventActions } from "./_components/event-actions";
// import { Events } from "./_components/events";

export default async function EventsPage() {
  const events = await api.event.list.query();

  if (!events) notFound();

  return (
    <MainPage>
      {events.map((event) => (
        <div key={event.id}>Name: {event.name}</div>
      ))}
      {/* <EventActions /> */}
      {/* <Events /> */}
    </MainPage>
  );
}

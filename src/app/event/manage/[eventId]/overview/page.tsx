import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";

import { ActionButtons } from "./_components/action-buttons";
import { EventDetails } from "./_components/event-details";
import { SocialButtons } from "./_components/social-buttons";

export default async function EventOverviewPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const event = await api.event.get({
    id: params.eventId,
  });
  const registrationSettings = await api.event.getRegistration({
    eventId: params.eventId,
  });

  console.log({ event });
  console.log({ registrationSettings });
  if (!event || !registrationSettings) notFound();

  return (
    <div className="space-y-3 md:space-y-5">
      <ActionButtons />
      <Card className="rounded-lg  bg-muted-foreground/10 px-3 md:grid md:grid-cols-1 md:gap-5 md:px-5">
        <div className="space-y-3  md:flex md:flex-col md:justify-between">
          <div className="space-y-3 md:space-y-5">
            <EventDetails
              event={event}
              registrationSettings={registrationSettings}
            />
          </div>

          <div className="flex"></div>
          <div className="space-y-3 md:flex md:flex-col md:justify-between">
            <SocialButtons />
          </div>
        </div>
      </Card>
    </div>
  );
}

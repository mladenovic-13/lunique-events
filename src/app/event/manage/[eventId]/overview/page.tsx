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

  if (!event || !registrationSettings) notFound();

  return (
    <div className="space-y-3 md:space-y-5">
      <ActionButtons />
      <Card className="rounded-lg  bg-muted-foreground/10 px-3 md:grid md:grid-cols-1 md:gap-5 md:px-5">
        <div className="flex flex-col gap-4 md:gap-0 md:pt-5">
          <EventDetails
            event={event}
            registrationSettings={registrationSettings}
          />
          <SocialButtons />
        </div>
      </Card>
    </div>
  );
}

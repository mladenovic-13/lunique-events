import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";

import { ActionButtons } from "./_components/action-buttons";
import { EventDetails } from "./_components/event-details";
import { SocialButtons } from "./_components/social-buttons";

export default async function EventOverviewPage({
  params, // params: { eventId },
}: {
  params: {
    eventId: string;
  };
}) {
  const event: RouterOutputs["event"]["get"] = await api.event.get.query({
    id: params.eventId,
  });
  return (
    <div className="space-y-3 md:space-y-5">
      <ActionButtons />
      {/* <EditEventForm event={event} /> */}

      <Card className="rounded-lg  bg-muted-foreground/10 px-3 md:grid md:grid-cols-1 md:gap-5 md:px-5">
        <div className="space-y-3  md:flex md:flex-col md:justify-between">
          <div className="space-y-3 md:space-y-5">
            <EventDetails event={event} />
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

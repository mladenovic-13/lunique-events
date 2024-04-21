import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";

import { ActionButtons } from "./_components/action-buttons";
import { CheckInButton } from "./_components/check-in-button";
import { EditEventForm } from "./_components/edit-event-form";
import { EventDetails } from "./_components/event-details";
import { EventPagePreview } from "./_components/event-page-preview";
import { GuestList } from "./_components/guest-list";
import { InviteInsights } from "./_components/invite-insights";
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

      <div className="space-y-3 rounded-md bg-muted p-3 md:grid md:grid-cols-2 md:gap-5 md:p-5">
        <div className="space-y-3 md:flex md:flex-col md:justify-between">
          <EventPagePreview />
          <SocialButtons />
        </div>

        <div className="space-y-3 md:flex md:flex-col md:justify-between">
          <div className="space-y-3 md:space-y-5">
            <EventDetails eventId={params.eventId} />
            <CheckInButton />
          </div>

          <div className="flex">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" className="flex-1 ">
                  Edit Event
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-scroll">
                <SheetTitle>Edit Event</SheetTitle>
                <EditEventForm event={event} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="space-y-3 md:space-y-5">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Invites</h2>
          <p className=" text-muted-foreground">
            Invite subscibers, contacts and past guests via email or SMS
          </p>
        </div>

        <div className="grid  grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
          <div className="md:col-span-1">
            <InviteInsights />
          </div>

          <div className="md:col-span-2">
            <GuestList />
          </div>
        </div>
      </div>
    </div>
  );
}

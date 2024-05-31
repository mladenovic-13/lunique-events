import { notFound } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";

import { GuestListActions } from "./_components/guest-list-actions";
import GuestsActionButtons from "./_components/guests-action-buttons";
import { GuestsStatus } from "./_components/guests-status";
import GuestsTable from "./_components/guests-table";

export type GuestStatus = "PENDING" | "MAYBE" | "GOING" | "NOT_GOING";
export type GuestsArray = Array<Guest>;
export interface Guest {
  name: string;
  email: string;
  status: GuestStatus;
  dateRegistered: string;
}

export default async function EventGuestsPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const guests = await api.invite.list({ eventId: params.eventId });
  if (!guests) notFound();
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">At a Glance</h1>
      <GuestsStatus guestStatuses={guests.map((g) => g.status)} />
      <GuestsActionButtons />
      <Separator />
      <div>
        <GuestListActions />
        <GuestsTable guests={guests.map((g) => ({ ...g, date: new Date() }))} />
      </div>
    </div>
  );
}

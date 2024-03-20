import { Separator } from "@/components/ui/separator";

import GuestsActionButtons from "./_components/guests-action-buttons";
import { GuestsProgressBar } from "./_components/guests-progress-bar";
import { GuestsTable } from "./guests-table";

export type GuestStatus = "going" | "not going" | "invited";

export default function EventGuestsPage({}: {
  params: {
    eventId: string;
  };
}) {
  interface Guest {
    name: string;
    email: string;
    status: GuestStatus;
    dateRegistered: string;
  }
  type GuestsArray = Array<Guest>;

  const guests: GuestsArray = [
    {
      name: "Luka Stojadinovic",
      email: "luka@lunique.tech",
      status: "going",
      dateRegistered: "Mar 14",
    },
    {
      name: "Nikola Mladenovic",
      email: "nikola@lunique.tech",
      status: "going",
      dateRegistered: "Mar 15",
    },
    {
      name: "Petar Petrovic",
      email: "petar@lunique.tech",
      status: "invited",
      dateRegistered: "Mar 13",
    },
    {
      name: "Janko Jankovic",
      email: "janko@lunique.tech",
      status: "invited",
      dateRegistered: "Mar 13",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">At a Glance</h1>
      <GuestsProgressBar guestStatuses={guests.map((g) => g.status)} />
      <GuestsActionButtons />
      <Separator />
      <GuestsTable />
    </div>
  );
}

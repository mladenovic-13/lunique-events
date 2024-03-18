"use client";

import { ArrowUpToLineIcon, Ticket, TicketIcon } from "lucide-react";

import { ActionButton } from "../overview/_components/action-buttons";

export default function RegistrationPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  return (
    <div className="flex flex-col space-y-4">
      <div>TODO: {params.eventId} registration</div>
      <div className="flex gap-1.5 overflow-x-auto pb-1.5 md:grid md:grid-cols-3 md:overflow-hidden">
        <ActionButton
          title="Registration"
          Icon={Ticket}
          onClick={() => alert("Registration")}
        />
        <ActionButton
          title="Event Capacity"
          Icon={ArrowUpToLineIcon}
          onClick={() => alert("Event Capacity")}
        />
        <ActionButton
          title="Group Registration"
          Icon={TicketIcon}
          onClick={() => alert("Group Registration")}
        />
      </div>
    </div>
  );
}

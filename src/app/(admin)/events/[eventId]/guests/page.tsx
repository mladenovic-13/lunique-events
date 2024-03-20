import { Separator } from "@/components/ui/separator";

import GuestsActionButtons from "./_components/guests-action-buttons";
import { GuestsProgressBar } from "./_components/guests-progress-bar";
import { GuestsTable } from "./guests-table";
export default function EventGuestsPage({}: {
  params: {
    eventId: string;
  };
}) {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">At a Glance</h1>
      <GuestsProgressBar />
      <GuestsActionButtons />
      <Separator />
      <GuestsTable />
    </div>
  );
}

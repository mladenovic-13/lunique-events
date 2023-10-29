import { CreateEventButton } from "@/components/buttons/create-event-button";
import { CalendarCheckIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold">Events</h1>
          <p className="hidden text-xl text-zinc-500 md:block">
            Create end manage your events.
          </p>
        </div>
        <CreateEventButton />
      </div>
      <div className="flex h-96 w-full flex-col items-center justify-center gap-8 rounded-lg border border-dashed text-center">
        <div className="h-fit w-fit rounded-full bg-primary/60 p-5">
          <CalendarCheckIcon className="h-8 w-8 text-primary-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-xl font-semibold">No events created</p>
          <p className="text-sm text-zinc-500">
            You don&apos;t have any events yet. Create your first event to get
            started.
          </p>
        </div>
        <CreateEventButton variant="outline" />
      </div>
    </div>
  );
}

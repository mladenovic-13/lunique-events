import { Button } from "@/components/ui/button";
import { CalendarCheckIcon, PlusCircleIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">Events</h1>
          <p className="hidden text-xl text-zinc-500 md:block">
            Create end manage your events.
          </p>
        </div>
        <Button size="sm">
          <PlusCircleIcon className="mr-1.5 h-5 w-5" /> Create
        </Button>
      </div>
      <div className="flex h-96 w-full flex-col items-center justify-center gap-8 rounded-lg border border-dashed text-center">
        <div className="h-fit w-fit rounded-full bg-zinc-400/60 p-5">
          <CalendarCheckIcon className="h-8 w-8 text-primary-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-xl font-semibold">No events created</p>
          <p className="text-sm text-zinc-500">
            You don&apos;t have any events yet. Create your first event to get
            started.
          </p>
        </div>
        <Button size="sm" variant="outline">
          <PlusCircleIcon className="mr-1.5 h-5 w-5" /> Create
        </Button>
      </div>
    </div>
  );
}

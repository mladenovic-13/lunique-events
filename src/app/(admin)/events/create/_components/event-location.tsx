import { MapPinIcon } from "lucide-react";

export const EventLocation = () => {
  return (
    <div>
      <button
        type="button"
        className="w-full rounded-md border border-border bg-muted px-3.5 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30"
      >
        <span className="flex flex-col items-start">
          <span className="flex items-center gap-3 md:gap-5">
            <MapPinIcon className="size-4 text-muted-foreground md:size-5" />
            <span className="text-lg font-medium">Add Event Location</span>
          </span>
          <span className="pl-7 text-sm text-muted-foreground md:pl-9">
            Offline location or virtual link
          </span>
        </span>
      </button>
    </div>
  );
};

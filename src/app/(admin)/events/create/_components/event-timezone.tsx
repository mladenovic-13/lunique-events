import { GlobeIcon } from "lucide-react";

export const EventTimezone = () => {
  return (
    <div className="flex w-24 flex-col justify-between gap-1.5 rounded-md bg-muted px-3 py-1.5">
      <GlobeIcon className="size-5 text-muted-foreground md:size-6" />
      <div className="flex flex-col">
        <span className="text-xs md:text-sm">GMT+01:00</span>
        <span className="text-xs text-muted-foreground md:text-sm">
          Belgrade
        </span>
      </div>
    </div>
  );
};

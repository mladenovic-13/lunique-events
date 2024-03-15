import { NewspaperIcon } from "lucide-react";

export const EventDescription = () => {
  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md border border-border bg-muted px-3.5 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30 md:gap-5"
      >
        <NewspaperIcon className="size-4 text-muted-foreground md:size-5" />
        <span className="text-lg font-medium">Add Description</span>
      </button>
    </div>
  );
};

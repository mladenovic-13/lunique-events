import { AppWindowIcon, PenIcon } from "lucide-react";

// TODO: create event themes
export const EventTheme = () => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-3 rounded-md border border-border bg-muted px-3 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30"
    >
      <span className="flex items-center gap-3">
        <AppWindowIcon className="size-12 text-muted-foreground" />
        <span className="flex flex-col items-start gap-0.5">
          <span className="text-xs text-muted-foreground">Theme</span>
          <span className="font-medium">Minimal</span>
        </span>
      </span>
      <PenIcon className="size-5" />
    </button>
  );
};

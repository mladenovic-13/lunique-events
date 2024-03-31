import { type Dispatch, type SetStateAction, useEffect } from "react";
import { PlusCircleIcon, SettingsIcon, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { CalendarIcon as CustomCalendarIcon } from "@/components/icons/calendar-icon";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { upcomingAndPastEvents } from "@/lib/mock-events";
import { paths } from "@/routes/paths";

interface SearchCommandProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchCommand = ({ isOpen, setIsOpen }: SearchCommandProps) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setIsOpen]);

  const router = useRouter();

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => router.push(paths.event.create)}>
            <PlusCircleIcon className="mr-2 size-4" />
            <span>Create event</span>
          </CommandItem>
          <CommandItem onSelect={() => router.push(paths.settings.root)}>
            <SettingsIcon className="mr-2 size-4" />
            <span>Settings</span>
          </CommandItem>
          <CommandItem onSelect={() => router.push(paths.settings.account)}>
            <User2Icon className="mr-2 size-4" />
            <span>Account</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Upcoming Events">
          {upcomingAndPastEvents.upcoming.map((event) => (
            <CommandItem key={event.id} className="flex items-center gap-3">
              <CustomCalendarIcon size="sm" date={event.date} />
              <span className="font-medium">{event.name}</span>
              <span className="text-xs text-muted-foreground">
                Hosted By {event.owner.name}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Past Events">
          {upcomingAndPastEvents.past.map((event) => (
            <CommandItem key={event.id} className="flex items-center gap-3">
              <CustomCalendarIcon size="sm" date={event.date} />
              <span className="font-medium">{event.name}</span>
              <span className="text-xs text-muted-foreground">
                Hosted By {event.owner.name}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

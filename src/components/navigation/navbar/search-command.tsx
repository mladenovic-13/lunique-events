"use client";

import { useEffect, useState } from "react";
import {
  PlusCircleIcon,
  SearchIcon,
  SettingsIcon,
  User2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { CalendarIcon as CustomCalendarIcon } from "@/components/icons/calendar-icon";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

export const SearchCommand = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: upcomingEvents } = api.event.list.useQuery({
    eventTimeFrame: "upcoming",
  });
  const { data: pastEvents } = api.event.list.useQuery({
    eventTimeFrame: "past",
  });

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
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="icon"
        className="rounded-full text-muted-foreground duration-200 md:border-none md:shadow-none"
      >
        <SearchIcon className="size-4" />
      </Button>
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
            {upcomingEvents?.map((event) => (
              <CommandItem
                key={event.id}
                className="flex items-center gap-3"
                onSelect={() =>
                  router.push(paths.event.manage.overview(event.id))
                }
              >
                <CustomCalendarIcon size="sm" date={event.startDate} />
                <span className="font-medium">{event.name}</span>
                <span className="text-xs text-muted-foreground">
                  Hosted By {event.organization.owner.name}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Past Events">
            {pastEvents?.map((event) => (
              <CommandItem
                key={event.id}
                className="flex items-center gap-3"
                onSelect={() =>
                  router.push(paths.event.manage.overview(event.id))
                }
              >
                <CustomCalendarIcon size="sm" date={event.startDate} />
                <span className="font-medium">{event.name}</span>
                <span className="text-xs text-muted-foreground">
                  Hosted By {event.organization.owner.name}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

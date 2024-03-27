"use client";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import {
  ArrowUpRightIcon,
  BellIcon,
  CalendarIcon,
  CompassIcon,
  PlusCircleIcon,
  SearchIcon,
  SettingsIcon,
  TicketIcon,
  User2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { upcomingAndPastEvents } from "@/lib/mock-events";
import logoImg from "@/public/logo.png";
import { paths } from "@/routes/paths";

import { CalendarIcon as CustomCalendarIcon } from "../icons/calendar-icon";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { AccountMenu } from "./account-menu";

const links = [
  {
    label: "Events",
    href: paths.home.root,
    Icon: TicketIcon,
  },
  {
    label: "Calendars",
    href: paths.home.calendars,
    Icon: CalendarIcon,
  },
  {
    label: "Explore",
    href: paths.explore,
    Icon: CompassIcon,
  },
];

export const Navbar = () => {
  const { data: session } = useSession();

  const isUserLoggedIn = !!session?.user.id;

  if (isUserLoggedIn) return <PrivateNavbar session={session} />;
  if (!isUserLoggedIn) return <PublicNavbar />;
};

const PrivateNavbar = ({ session }: { session: Session }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="flex h-12 items-center justify-between px-3 md:px-5">
      <div className="mr-3 md:mr-0 md:w-[calc((100%-56rem)/2)]">
        <Link href={paths.home.root}>
          <Image
            src={logoImg}
            alt="Lunique Events Logo"
            width={30}
            height={30}
            className="size-5 md:size-8"
          />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-start md:-ml-3 md:gap-1.5">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "text-muted-foreground transition duration-200",
            })}
          >
            <link.Icon className="size-4 md:mr-1.5" />
            <span className="hidden md:block">{link.label}</span>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex items-center md:gap-1.5">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground duration-200"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <SearchIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-popover text-accent-foreground shadow">
                <p className="flex w-full items-center gap-1.5 text-sm">
                  Search
                  <CommandShortcut>⌘K</CommandShortcut>
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground  duration-200"
                >
                  <BellIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-popover text-accent-foreground shadow">
                <p className="flex w-full items-center gap-1.5 text-sm">
                  Notifications
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ThemeToggle />
        </div>

        <AccountMenu
          name={session?.user.name}
          email={session?.user.email}
          image={session?.user.image}
        />
      </div>

      <SearchCommand isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </nav>
  );
};

const PublicNavbar = () => {
  return (
    <nav className="flex h-12 items-center justify-between px-3 md:px-5">
      <Link href={paths.home.root}>
        <Image
          src={logoImg}
          alt="Lunique Events Logo"
          width={30}
          height={30}
          className="size-5 md:size-8"
        />
      </Link>
      <div className="flex items-center gap-1.5">
        <Link
          href={paths.explore}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          Explore Events <ArrowUpRightIcon className="ml-1.5 size-3.5" />
        </Link>
        <Link
          href={paths.signin.root}
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

interface SearchCommand {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchCommand = ({ isOpen, setIsOpen }: SearchCommand) => {
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

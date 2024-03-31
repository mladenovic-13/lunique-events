import { useState } from "react";
import {
  CalendarIcon,
  CompassIcon,
  SearchIcon,
  TicketIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type Session } from "next-auth";

import { Button, buttonVariants } from "@/components/ui/button";
import { CommandShortcut } from "@/components/ui/command";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import logoImg from "@/public/logo.png";
import { paths } from "@/routes/paths";

import { AccountMenu } from "./account-menu";
import { NotificationsPopover } from "./notifications-popover";
import { SearchCommand } from "./search-command";

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

export const PrivateNavbar = ({ session }: { session: Session }) => {
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
                <NotificationsPopover />
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

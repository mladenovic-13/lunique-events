"use client";

import {
  ArrowUpRightIcon,
  BellIcon,
  CalendarIcon,
  CommandIcon,
  CompassIcon,
  SearchIcon,
  TicketIcon,
} from "lucide-react";
import Link from "next/link";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";

import { paths } from "@/routes/paths";

import { ThemedLogoIcon } from "../icons/themed-logo-icon";
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
  return (
    <nav className="flex h-12 items-center justify-between px-3 md:px-5">
      <div className="md:w-[calc((100%-56rem)/2)]">
        <Link href={paths.home.root}>
          <ThemedLogoIcon />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-start gap-1.5 md:-ml-3">
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
            <link.Icon className="mr-1.5 size-4" />
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground duration-200"
              >
                <SearchIcon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-popover text-accent-foreground shadow">
              <p className="flex w-full items-center gap-1.5 text-sm">
                Search <CommandIcon className="size-3" />{" "}
                <span className="flex items-center">+ K</span>
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
        <AccountMenu
          name={session?.user.name}
          email={session?.user.email}
          image={session?.user.image}
        />
      </div>
    </nav>
  );
};

const PublicNavbar = () => {
  return (
    <nav className="flex h-12 items-center justify-between px-3 md:px-5">
      <Link href={paths.home.root}>
        <ThemedLogoIcon />
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

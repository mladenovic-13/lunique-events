"use client";

import {
  BarChart3Icon,
  ChevronLeft,
  ChevronRightCircle,
  ClipboardListIcon,
  ImageIcon,
  MailsIcon,
  PanelLeftIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";

import { buttonVariants } from "../ui/button";

export const EventNav = ({ id }: { id: string }) => {
  const items = [
    {
      title: "Overview",
      href: paths.event.manage.overview(id),
      Icon: PanelLeftIcon,
    },
    {
      title: "Guests",
      href: paths.event.manage.guests(id),
      Icon: UsersIcon,
    },
    {
      title: "Registration",
      href: paths.event.manage.registration(id),
      Icon: ClipboardListIcon,
    },
    {
      title: "Emails",
      href: paths.event.manage.emails(id),
      Icon: MailsIcon,
    },
    {
      title: "Photos",
      href: paths.event.manage.photos(id),
      Icon: ImageIcon,
    },
    {
      title: "Insights",
      href: paths.event.manage.insights(id),
      Icon: BarChart3Icon,
    },
    {
      title: "Settings",
      href: paths.event.manage.settings(id),
      Icon: SettingsIcon,
    },
  ];

  const pathname = usePathname();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center md:gap-1.5">
          <Link href={paths.home.root}>
            <div className="flex items-center gap-1.5 rounded-lg px-3 py-1 hover:bg-accent hover:text-accent-foreground">
              <ChevronLeft />
              <h1 className="text-xl font-semibold md:text-2xl">Events</h1>
            </div>
          </Link>
        </div>
        <Link
          href={paths.event.landing.root(id)}
          className={buttonVariants({ variant: "ghost" })}
        >
          Event Page <ChevronRightCircle className="ml-1.5 size-4" />
        </Link>
      </div>
      <div className="flex">
        <ul className="flex justify-start gap-5 overflow-x-auto overflow-y-hidden rounded-none bg-transparent px-3 text-muted-foreground md:overflow-hidden md:px-0">
          {items.map((item) => (
            <Link key={item.title} href={item.href}>
              <li
                className={cn(
                  "flex items-center rounded-none border-b-2 border-transparent py-2 text-sm font-medium transition duration-300 hover:text-primary/90",
                  pathname === item.href && "border-primary text-primary",
                )}
              >
                <item.Icon className="mr-1.5 size-4" />
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

interface ManageNavProps {
  items: { title: string; href: string }[];
  title: string;
  landingPage: {
    label: string;
    href: string;
  };
}

export const ManageNav = ({ items, title, landingPage }: ManageNavProps) => {
  const pathname = usePathname();

  const isCalendarSettings =
    pathname.includes("settings") && pathname.includes("calendar");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-3 md:px-0">
        <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
        <Link
          href={landingPage.href}
          className={buttonVariants({
            variant: "secondary",
            size: "sm",
          })}
        >
          <span className="hidden md:block">{landingPage.label}</span>
          <ArrowUpRightIcon className="size-4 md:ml-1.5" />
        </Link>
      </div>
      <div className="flex">
        <ul className="flex justify-start gap-5 overflow-x-auto overflow-y-hidden rounded-none bg-transparent px-3 text-muted-foreground md:overflow-hidden md:px-0">
          {items.map((item) => (
            <Link key={item.title} href={item.href}>
              <li
                className={cn(
                  "flex items-center rounded-none border-b-2 border-transparent py-2 text-sm font-medium transition duration-300",
                  (pathname === item.href ||
                    (item.href.includes("settings") && isCalendarSettings)) &&
                    "border-secondary-foreground text-secondary-foreground",
                )}
              >
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

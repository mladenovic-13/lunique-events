"use client";

import {
  DollarSignIcon,
  FileTextIcon,
  Settings2Icon,
  SparklesIcon,
  TagIcon,
  UserCheckIcon,
  WandIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";

export const CalendarSettingsNav = ({ id }: { id: string }) => {
  const pathname = usePathname();

  const items = [
    {
      label: "Display",
      href: paths.calendar.manage.settings.display(id),
      Icon: WandIcon,
    },
    {
      label: "Payment",
      href: paths.calendar.manage.settings.payment(id),
      Icon: DollarSignIcon,
    },
    {
      label: "Options",
      href: paths.calendar.manage.settings.options(id),
      Icon: Settings2Icon,
    },
    {
      label: "Admins",
      href: paths.calendar.manage.settings.admins(id),
      Icon: UserCheckIcon,
    },
    {
      label: "Tags",
      href: paths.calendar.manage.settings.tags(id),
      Icon: TagIcon,
    },
    {
      label: "Embed",
      href: paths.calendar.manage.settings.embed(id),
      Icon: FileTextIcon,
    },
    {
      label: "Events Plus",
      href: paths.calendar.manage.settings.plus(id),
      Icon: SparklesIcon,
    },
  ];

  return (
    <ul className="flex items-center gap-3 overflow-x-auto bg-muted/60 px-3 py-2 text-sm md:flex-col md:items-start md:gap-1.5 md:bg-transparent md:p-0 md:text-base">
      {items.map((item) => (
        <Link key={item.label} href={item.href}>
          <li
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap font-medium text-muted-foreground md:w-40 md:py-0.5",
              pathname === item.href && "text-primary-foreground",
            )}
          >
            <item.Icon className="hidden size-4 md:block" />
            {item.label}
          </li>
        </Link>
      ))}
    </ul>
  );
};

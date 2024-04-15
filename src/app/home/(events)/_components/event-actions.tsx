"use client";

import { useCallback } from "react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ViewTabs } from "@/app/organization/(landing)/[organizationId]/_components/view-tabs";
import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/routes/paths";

import { EventTimeframeSelect } from "./event-timeframe-select";
import { OrganizationSelect } from "./organization-select";

export const EventActions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timeframe = searchParams.get("timeframe") ?? "upcoming";
  const view = searchParams.get("view") ?? "card";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const query = new URLSearchParams(searchParams.toString());
      query.set(name, value);

      return query.toString();
    },
    [searchParams],
  );

  const onTimeframeChange = (value: string) => {
    router.push(pathname + "?" + createQueryString("timeframe", value), {
      scroll: false,
    });
  };
  const onViewChange = (value: string) => {
    router.push(pathname + "?" + createQueryString("view", value), {
      scroll: false,
    });
  };

  return (
    <div className="space-y-1.5 md:flex md:items-center md:justify-between md:space-y-0">
      <div className="flex gap-1.5 overflow-x-auto py-1 md:gap-2 md:overflow-hidden md:p-0.5">
        <OrganizationSelect />

        <EventTimeframeSelect
          value={timeframe}
          onValueChange={onTimeframeChange}
        />
        <ViewTabs value={view} onValueChange={onViewChange} />
      </div>
      <Link
        href={paths.event.create}
        className={buttonVariants({
          variant: "secondary",
          size: "sm",
          className: "hidden md:flex",
        })}
      >
        <PlusIcon className="mr-1.5 size-4" />
        Create Event
      </Link>
    </div>
  );
};

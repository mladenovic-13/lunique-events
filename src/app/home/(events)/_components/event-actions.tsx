"use client";

import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  type ViewMode,
  ViewTabs,
} from "@/app/organization/(landing)/[organizationId]/_components/view-tabs";
import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/routes/paths";

import { EventTimeframeSelect } from "./event-timeframe-select";
import { type Timeframe } from "./events";
import { OrganizationSelect } from "./organization-select";

export const EventActions = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [timeframe, setTimeframe] = useState<Timeframe>("upcoming");

  useEffect(() => {
    const query = new URLSearchParams();
    query.set("tab", timeframe);
    query.set("viewMode", viewMode);
    router.replace(`${pathname}?${query.toString()}`, { scroll: false });
  }, [timeframe, viewMode, pathname, router]);

  const onValueChange = (value: Timeframe) => {
    const query = new URLSearchParams();
    setTimeframe(value);
    query.set("tab", value);
    query.set("viewMode", viewMode);
    router.push(`${pathname}?${query.toString()}`, { scroll: false });
  };
  const onViewModeChange = (value: ViewMode) => {
    setViewMode(value);
    const query = new URLSearchParams();
    query.set("viewMode", value);
    query.set("tab", timeframe);
    router.push(`${pathname}?${query.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex gap-1.5">
        <div className="flex flex-col gap-1.5 md:flex-row">
          <div className="flex gap-1.5">
            <OrganizationSelect />

            <EventTimeframeSelect
              value={timeframe as Timeframe}
              onValueChange={onValueChange}
            />
          </div>
          <ViewTabs
            value={"card" as ViewMode}
            onValueChange={onViewModeChange}
          />
        </div>
      </div>
      <Link
        href={paths.event.create}
        className={buttonVariants({ variant: "secondary", size: "sm" })}
      >
        <PlusIcon className="mr-1.5 size-4" />
        Create
      </Link>
    </div>
  );
};

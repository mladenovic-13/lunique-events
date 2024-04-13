"use client";

import { useEffect } from "react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/routes/paths";

import { EventTimeframeSelect } from "./event-timeframe-select";
import { type Timeframe } from "./events";
import { OrganizationSelect } from "./organization-select";

const timeframes: Timeframe[] = ["upcoming", "past"];

export const EventActions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeframe = searchParams.get("tab");

  useEffect(() => {
    if (timeframe && timeframes.includes(timeframe as Timeframe)) return;

    const query = new URLSearchParams();
    query.set("tab", "upcoming");
    router.replace(`${pathname}?${query.toString()}`, { scroll: false });
  }, [timeframe, pathname, router]);

  const onValueChange = (value: Timeframe) => {
    const query = new URLSearchParams();
    query.set("tab", value);
    router.push(`${pathname}?${query.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-1.5">
        <OrganizationSelect />

        <EventTimeframeSelect
          value={timeframe as Timeframe}
          onValueChange={onValueChange}
        />
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

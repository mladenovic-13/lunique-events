"use client";

import { useEffect } from "react";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/routes/paths";

import { EventTimeframeTabs } from "./event-date-tabs";
import { type Timeframe } from "./events";

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
      <EventTimeframeTabs
        value={timeframe as Timeframe}
        onValueChange={onValueChange}
      />
      <Link
        href={paths.event.create}
        className={buttonVariants({ variant: "ghost" })}
      >
        Create Event <PlusCircleIcon className="ml-1.5 size-4" />
      </Link>
    </div>
  );
};

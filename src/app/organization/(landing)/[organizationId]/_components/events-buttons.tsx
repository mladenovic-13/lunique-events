"use client";
import React, { useEffect } from "react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { paths } from "@/routes/paths";

import { type ViewMode, ViewTabs } from "./view-tabs";

interface EventButtonsProps {
  mode: ViewMode;
  onValueChange: (value: ViewMode) => void;
}
const viewModes: ViewMode[] = ["card", "list"];

export const EventsButtons = ({ mode, onValueChange }: EventButtonsProps) => {
  const viewMode = useSearchParams().get("viewMode");
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (viewMode && viewModes.includes(viewMode as ViewMode)) return;

    const query = new URLSearchParams();
    query.set("viewMode", "card");
    router.replace(`${pathname}?${query.toString()}`, { scroll: false });
  }, [viewMode, pathname, router]);

  return (
    <section className="flex justify-between pb-6">
      <div>
        <h1 className="text-2xl font-semibold">Events</h1>
      </div>
      <div className="flex  space-x-2">
        <Link href={paths.event.create}>
          <Button variant={"secondary"} className="h-8 space-x-2 pl-2">
            <PlusIcon size={14} />
            <p className="text-sm font-normal">Add Event</p>
          </Button>
        </Link>
        <div className="">
          <ViewTabs value={mode as ViewMode} onValueChange={onValueChange} />
        </div>
      </div>
    </section>
  );
};

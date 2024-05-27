import React from "react";

import { Separator } from "@/components/ui/separator";
import { useInviteStep } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";

import { EventList } from "./event-list";
import ImportActions from "./import-actions";
import InviteList from "./invite-list";
interface MenuBarProps {
  className?: string;
}
const MenuBar = ({ className }: MenuBarProps) => {
  const step = useInviteStep();
  return (
    <div
      className={cn(
        "flex h-full flex-col",
        className ?? className,
        step === "generate-email" && "hidden md:flex",
      )}
    >
      <ImportActions className="flex h-1/5 w-full flex-row md:flex-col" />
      <Separator className="hidden md:block" />
      {step !== "generate-email" && step !== "add-guests-directly" && (
        <EventList className="hidden  h-4/5 md:flex md:max-h-full" />
      )}
      {(step === "generate-email" || step === "add-guests-directly") && (
        <InviteList className="hidden  h-4/5 md:flex md:max-h-full" />
      )}
    </div>
  );
};

export default MenuBar;

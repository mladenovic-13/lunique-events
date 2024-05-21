import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useInviteGuestActions, useInviteStep } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
interface TopBarProps {
  className?: string;
}
const TopBar = ({ className }: TopBarProps) => {
  const { setStep } = useInviteGuestActions();
  const step = useInviteStep();
  return (
    <div className={cn("flex w-full flex-col ", className && className)}>
      <section className="flex w-full items-center  gap-6 px-4">
        <Button
          className={cn(
            "flex w-fit items-center justify-start gap-2 rounded-none px-0 py-5 text-sm font-bold text-accent-foreground/70 md:text-base",
            step === "add-emails" &&
              "border-b-2 border-accent-foreground text-accent-foreground",
          )}
          variant={"ghost"}
          onClick={() => setStep("add-emails")}
        >
          <p>Enter Emails</p>
        </Button>
        <Button
          className={cn(
            "flex w-fit items-center justify-between gap-2 rounded-none px-0 py-5 text-sm font-bold text-accent-foreground/70 md:text-base",
            (step === "list-events" || step === "search-guests") &&
              "border-b-2 border-accent-foreground text-accent-foreground",
          )}
          variant={"ghost"}
          onClick={() => setStep("list-events")}
        >
          <p>Past Events</p>
        </Button>
      </section>
      <Separator className="w-full bg-accent-foreground/20 " />
    </div>
  );
};

export default TopBar;

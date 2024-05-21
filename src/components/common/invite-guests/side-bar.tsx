import React from "react";
import { FileTextIcon, PencilLineIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useInviteGuestActions, useInviteStep } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";

import { Button } from "../../ui/button";
import { Label } from "../../ui/label";

import { EventList } from "./event-list";
import { InviteList } from "./invite-list";
interface SideBarProps {
  className?: string;
}
export const SideBar = ({ className }: SideBarProps) => {
  const step = useInviteStep();
  return (
    <section
      className={cn(
        "flex h-full min-w-[210px] max-w-[210px] flex-col pt-2",
        className && className,
      )}
    >
      {step !== "generate-email" && step !== "add-guests-directly" && (
        <div className="flex h-full flex-col gap-4  md:w-full">
          <ImportActions />
          <Separator className="bg-accent-foreground/20" />
          <Label className="-mb-2 px-3 pt-2 text-sm font-semibold uppercase  text-accent-foreground/50">
            Events
          </Label>
          <ScrollArea className="w-full">
            <EventList />
          </ScrollArea>
        </div>
      )}
      {(step === "generate-email" || step === "add-guests-directly") && (
        <InviteList />
      )}
    </section>
  );
};

const ImportActions = () => {
  const step = useInviteStep();
  const { setStep } = useInviteGuestActions();
  return (
    <div className="flex flex-col gap-2 px-1">
      <Button
        className={cn(
          "flex items-center justify-start gap-2 pl-2 font-bold text-accent-foreground hover:bg-accent-foreground/10",
          step === "add-emails" && "bg-accent-foreground/10",
        )}
        variant={"ghost"}
        onClick={() => setStep("add-emails")}
      >
        <PencilLineIcon size={17} className="text-accent-foreground/60 " />
        <p>Enter Emails</p>
      </Button>
      <Button
        className={cn(
          "flex items-center justify-between gap-2 px-2  font-bold text-accent-foreground hover:cursor-not-allowed hover:bg-accent-foreground/10",
          step === "import-CSV" && "bg-accent-foreground/10",
        )}
        variant={"ghost"}
        onClick={() => setStep("import-CSV")}
        disabled={true}
      >
        <div className="flex gap-2">
          <FileTextIcon size={17} className="text-accent-foreground/60" />
          <p>Import CSV</p>
        </div>
        <p className=" text-blue-500">Soon</p>
      </Button>
    </div>
  );
};

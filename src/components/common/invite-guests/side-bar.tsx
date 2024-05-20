import React from "react";
import { FileTextIcon, PencilLineIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  useGuestEmails,
  useInviteGuestActions,
  useInviteStep,
} from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/react";

import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Skeleton } from "../../ui/skeleton";

import { EventItem } from "./event-item";
import { InviteList } from "./invite-list";
interface SideBarProps {
  className?: string;
}
export const SideBar = ({ className }: SideBarProps) => {
  const step = useInviteStep();
  const selectedEmails = useGuestEmails();
  return (
    <section
      className={cn(
        "flex h-full flex-col pt-2 md:max-w-[200px]",
        className && className,
      )}
    >
      {step !== "generate-email" && step !== "add-guests-directly" && (
        <div className="flex h-full flex-col gap-4 md:w-full">
          <ImportActions />
          <Separator className="bg-accent-foreground/20" />
          <Label className="-mb-2 px-3 pt-2 text-sm font-semibold uppercase  text-accent-foreground/50">
            Events
          </Label>
          <ScrollArea className="h-full ">
            <EventList />
          </ScrollArea>
        </div>
      )}
      {(step === "generate-email" || step === "add-guests-directly") && (
        <InviteList guestsEmails={selectedEmails} />
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

const EventList = () => {
  const { data: userEvents, isLoading } = api.event.list.useQuery({});
  const { setStep, setSelectedEventName, setEventGuests } =
    useInviteGuestActions();
  const onEventClick = (event: RouterOutputs["event"]["list"][number]) => {
    setStep("search-guests");
    setSelectedEventName(event.name);
    setEventGuests(event.guests.map((guest) => guest.email));
  };
  return (
    <div className="flex flex-col gap-2">
      {isLoading &&
        Array(3)
          .fill(0)
          .map((_, index) => index + 1)
          .map((idx) => (
            <Skeleton
              key={idx}
              className="h-12 w-full animate-pulse bg-accent-foreground/10"
            />
          ))}
      {userEvents?.map((event, idx) => (
        <EventItem
          event={event}
          key={idx}
          onClick={() => onEventClick(event)}
        />
      ))}
    </div>
  );
};

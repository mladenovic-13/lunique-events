import {
  ArrowUpToLineIcon,
  Pencil,
  TicketIcon,
  UserCheckIcon,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";

import { EventOptionButton } from "./event-option-button";

export const EventOptions = () => {
  return (
    <div className="rounded-md bg-muted ">
      <EventOptionButton
        title="Tickets"
        activeColorClass="text-[#47C87F]"
        isActive={false}
        Icon={TicketIcon}
        onClick={() => alert("Tickets clicked")}
        slot={
          <span className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Free</span>
            <Pencil className="size-4 text-muted-foreground" />
          </span>
        }
      />
      <div className="h-0.5 w-full bg-background" />
      <EventOptionButton
        title="Require approval"
        Icon={UserCheckIcon}
        isActive={true}
        activeColorClass="text-[#D77F48]"
        slot={
          <Switch className="focus-visible:ring-0 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-muted-foreground" />
        }
      />
      <div className="h-0.5 w-full bg-background" />
      <EventOptionButton
        title="Capacity"
        Icon={ArrowUpToLineIcon}
        isActive={true}
        activeColorClass="text-[#B596FF]"
        onClick={() => alert("Tickets clicked")}
        slot={
          <span className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Unlimited</span>
            <Pencil className="size-4 text-muted-foreground" />
          </span>
        }
      />
    </div>
  );
};

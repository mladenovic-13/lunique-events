import React from "react";

import { Separator } from "@/components/ui/separator";
import { useInviteStep } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";

import ActionButtons from "./action-buttons";
import ActionScreen from "./action-screen";
import MenuBar from "./menu-bar";

interface InviteGuestPartialProps {
  eventId: string;
  onInviteComplete?: () => void;
  height?: string;
  className?: string;
}
const InviteGuestPartial = ({
  eventId,
  onInviteComplete,
  height,
  className,
}: InviteGuestPartialProps) => {
  const step = useInviteStep();
  return (
    <div className={cn("", className && className, height)}>
      <div className="flex h-[90%] w-full flex-col items-start justify-start md:flex-row md:justify-center">
        <MenuBar className="size-full h-[8%] max-h-full px-2 md:h-full md:w-1/4 md:p-2 md:pb-0" />
        <ActionScreen
          className={cn(
            "h-[92%] w-full px-2  pb-0 md:h-full md:w-3/4 md:p-4",
            step === "generate-email" && "h-full",
          )}
          eventId={eventId}
          onInviteComplete={onInviteComplete}
        />
      </div>
      <Separator />
      <ActionButtons className="flex h-[9%] w-full items-center justify-between px-2" />
    </div>
  );
};

export default InviteGuestPartial;

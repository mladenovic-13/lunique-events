import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useGuestEmails } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
interface InviteListProps {
  className?: string;
}
function InviteList({ className }: InviteListProps) {
  const invitedEmails = useGuestEmails();
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-2  md:pt-6",
        className && className,
      )}
    >
      <h1 className="text-sm font-medium text-accent-foreground/50">
        Inviting {invitedEmails.length}{" "}
        {invitedEmails.length > 2
          ? "People"
          : invitedEmails.length === 1
            ? "Person"
            : "People"}
      </h1>
      <ScrollArea className="h-full">
        <div className="flex h-full flex-col gap-2 px-0 text-sm">
          {invitedEmails.map((email, idx) => (
            <div
              key={idx}
              className="flex w-full items-center justify-start gap-2"
            >
              <div className="flex size-8 min-w-8 items-center justify-center rounded-full bg-accent-foreground/10">
                {email[0]?.toUpperCase()}
              </div>
              <div className="truncate">
                <p className="font-medium">{email}</p>
                <p className="text-xs font-light italic">
                  {email.substring(email.indexOf("@"), email.length)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default InviteList;

import React from "react";

import { Label } from "../ui/label";

interface InviteListProps {
  guestsEmails: Array<string>;
}

export const InviteList = ({ guestsEmails }: InviteListProps) => {
  return (
    <section className="flex flex-col gap-4 overflow-y-auto md:h-[540px] md:w-[200px]">
      <Label className="px-2 pb-2 text-sm text-accent-foreground/50">
        Inviting {guestsEmails.length}{" "}
        {guestsEmails.length === 1 ? "Person" : "People"}
      </Label>
      {guestsEmails.length > 0 &&
        guestsEmails.map((guest, idx) => (
          <InvitedGuestItem email={guest} key={idx} />
        ))}
    </section>
  );
};

interface InvitedGuestItemProps {
  email: string;
}
export const InvitedGuestItem = ({ email }: InvitedGuestItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-8 min-w-8 items-center justify-center rounded-full bg-accent-foreground/10 text-center ">
        <p className="uppercase">{email[0]}</p>
      </div>
      <div className="flex flex-col truncate">
        <p className="line-clamp-1  text-sm font-semibold">{email}</p>
        <p className="text-xs text-accent-foreground/50">{email}</p>
      </div>
    </div>
  );
};

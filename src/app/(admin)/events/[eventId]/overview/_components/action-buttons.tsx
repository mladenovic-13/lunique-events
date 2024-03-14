"use client";

import { MailOpenIcon, MessageSquareIcon, ShareIcon } from "lucide-react";
import { ActionButton } from "./action-button";

export const ActionButtons = () => {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1.5 md:overflow-hidden">
      <ActionButton
        title="Invite Guests"
        Icon={MailOpenIcon}
        onClick={() => alert("Invite Guests")}
      />
      <ActionButton
        title="Send a Post"
        Icon={MessageSquareIcon}
        onClick={() => alert("Send a Post")}
      />
      <ActionButton
        title="Share Event"
        Icon={ShareIcon}
        onClick={() => alert("Share Event")}
      />
    </div>
  );
};

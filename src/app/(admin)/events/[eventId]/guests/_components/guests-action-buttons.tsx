"use client";

import { MailOpenIcon, QrCodeIcon, UsersIcon } from "lucide-react";

import { ActionButton } from "../../overview/_components/action-buttons";

const GuestsActionButtons = () => {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1.5 md:grid md:grid-cols-3 md:overflow-hidden">
      <ActionButton
        title="Invite Guests"
        Icon={MailOpenIcon}
        onClick={() => alert("Invite Guests")}
      />
      <ActionButton
        title="Check In Guests"
        Icon={QrCodeIcon}
        onClick={() => alert("Invite Guests")}
      />
      <ActionButton
        title="Guest List"
        Icon={UsersIcon}
        onClick={() => alert("Guest List")}
      />
    </div>
  );
};

export default GuestsActionButtons;

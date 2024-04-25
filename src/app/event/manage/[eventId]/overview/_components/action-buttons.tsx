"use client";

import {
  type LucideIcon,
  MailOpenIcon,
  MessageSquareIcon,
  ShareIcon,
} from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";

export const ActionButtons = () => {
  const modal = useModal();

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1.5 md:grid md:grid-cols-3 md:overflow-hidden">
      <ActionButton
        title="Invite Guests"
        Icon={MailOpenIcon}
        onClick={() => modal.onOpen("invite-guests")}
        iconColor="rgb(59 130 246)"
        bgColor="rgb(59 130 246 /.2)"
      />
      <ActionButton
        title="Send a Post"
        Icon={MessageSquareIcon}
        onClick={() => alert("Send a Post")}
        iconColor="rgb(217 70 239)"
        bgColor="rgb(217 70 239 /.2)"
      />
      <ActionButton
        title="Share Event"
        Icon={ShareIcon}
        onClick={() => alert("Share Event")}
        iconColor="rgb(236 72 153)"
        bgColor="rgb(236 72 153 /.2)"
      />
    </div>
  );
};

export const ActionButton = (props: {
  title: string;
  Icon: LucideIcon;
  bgColor?: string;
  iconColor?: string;
  description?: string;
  onClick: () => void;
}) => {
  const { title, Icon, bgColor, iconColor, description, onClick } = props;
  const hoverColor = `hover:bg-[${bgColor}]`;
  console.log(hoverColor);
  return (
    <button
      onClick={onClick}
      className="flex min-w-fit items-center gap-3 rounded-lg bg-muted/50 p-1.5 pr-16 text-sm font-medium transition-all hover:bg-accent"
    >
      <div
        className="size-fit rounded-md bg-muted-foreground/10 p-1.5"
        style={{
          backgroundColor: bgColor && bgColor,
          color: iconColor && iconColor,
        }}
      >
        <Icon className="size-6" />
      </div>
      <div className="flex flex-col items-start">
        <p className="text-base text-accent-foreground">{title}</p>
        {description && (
          <p className="text-xs font-medium text-foreground/50">
            {description}
          </p>
        )}
      </div>
    </button>
  );
};

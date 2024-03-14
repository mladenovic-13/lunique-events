"use client";

import { type LucideIcon } from "lucide-react";

export const ActionButton = (props: {
  title: string;
  Icon: LucideIcon;
  onClick: () => void;
}) => {
  const { title, Icon, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="flex min-w-fit items-center gap-3 rounded-md bg-muted p-1.5 pr-16 text-sm font-medium"
    >
      <div className="h-full rounded-md bg-muted-foreground/10 p-1.5">
        <Icon className="h-6 w-6" />
      </div>
      {title}
    </button>
  );
};

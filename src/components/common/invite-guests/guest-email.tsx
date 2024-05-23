import React from "react";
import { CircleCheckIcon, CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface GuestEmailProps {
  email: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}
const GuestEmail = ({
  email,
  className,
  selected,
  onClick,
}: GuestEmailProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-lg p-2 text-accent-foreground/90 transition-all hover:cursor-pointer hover:bg-accent-foreground/10",
        className && className,
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-full bg-accent-foreground/10 text-center">
          <p className="uppercase">{email[0]}</p>
        </div>
        <p className="text-sm font-medium">{email}</p>
      </div>
      <div className="flex items-center gap-4">
        {selected && <CircleCheckIcon size={20} />}
        {!selected && (
          <CircleIcon size={20} className="text-accent-foreground/30" />
        )}
      </div>
    </div>
  );
};

export default GuestEmail;

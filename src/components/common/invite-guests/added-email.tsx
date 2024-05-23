import React from "react";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useInviteGuestActions } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
interface AddedEmailProps {
  email: string;
  className?: string;
}
const AddedEmail = ({ className, email }: AddedEmailProps) => {
  const { removeEmail } = useInviteGuestActions();
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg p-2 text-accent-foreground/90 transition-all",
        className && className,
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-full bg-accent-foreground/10 text-center">
          <p className="uppercase">{email[0]}</p>
        </div>
        <p className="text-sm font-medium">{email}</p>
      </div>
      <Button
        onClick={() => {
          removeEmail(email);
        }}
        className="flex size-fit items-center justify-center rounded-full bg-transparent p-2 text-destructive hover:bg-destructive hover:text-accent-foreground"
      >
        <XIcon size={20} className="m-0" />
      </Button>
    </div>
  );
};

export default AddedEmail;

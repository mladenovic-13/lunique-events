import React from "react";
import { FileIcon, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useInviteGuestActions, useInviteStep } from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";

interface ImportActionsProps {
  className?: string;
}
const ImportActions = ({ className }: ImportActionsProps) => {
  const step = useInviteStep();
  const { setStep } = useInviteGuestActions();
  return (
    <div className={cn("", className && className)}>
      <div
        className={cn(
          "hidden w-full justify-center  md:flex md:flex-col md:gap-1",
        )}
      >
        <Button
          className={cn(
            "flex w-full items-center justify-start gap-2 bg-transparent px-2 text-accent-foreground shadow-none hover:bg-accent-foreground/10",
            step === "add-emails" && "bg-accent-foreground/10",
          )}
          onClick={() => setStep("add-emails")}
        >
          <PencilIcon className="size-4 text-accent-foreground/60" />
          Enter Emails
        </Button>
        <Button
          className={cn(
            "flex w-full items-center justify-start gap-2 bg-transparent px-2 text-accent-foreground shadow-none hover:bg-accent-foreground/10",
            step === "import-CSV" && "bg-accent-foreground/10",
          )}
          onClick={() => setStep("import-CSV")}
          disabled={true}
        >
          <FileIcon className="size-4 text-accent-foreground/60" />
          Import CSV
          <div className="rounded-full px-1 text-xs text-blue-500">soon</div>
        </Button>
      </div>
      <div className="flex gap-4 md:hidden">
        <Button
          className={cn(
            "rounded-none bg-transparent px-0 text-accent-foreground/80 shadow-none",
            step === "add-emails" &&
              "border-b-2 border-accent-foreground text-accent-foreground",
          )}
          onClick={() => setStep("add-emails")}
        >
          Enter Emails
        </Button>
        <Button
          className={cn(
            "rounded-none bg-transparent px-0 text-accent-foreground/80 shadow-none",
            (step === "list-events" || step === "search-guests") &&
              "border-b-2 border-accent-foreground text-accent-foreground",
          )}
          onClick={() => setStep("list-events")}
        >
          Past Events
        </Button>
      </div>
    </div>
  );
};

export default ImportActions;

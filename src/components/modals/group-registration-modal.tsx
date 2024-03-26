"use client";

import { TicketIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const GroupRegistrationModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "group-registration";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] space-y-2 text-left">
        <DialogHeader>
          <div className="size-fit rounded-full bg-muted p-2">
            <TicketIcon size={40} />
          </div>
          <DialogTitle className="text-left text-xl">
            Group Registration
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-2">
          <p>
            If turned on, guests will be able to get multiple tickets at once.
          </p>
          <Button className="p-0" variant={"link"}>
            <p>Learn more about group registration ↗</p>
          </Button>
        </DialogDescription>

        <div className="flex items-center justify-between">
          <Label className="text-base font-medium ">
            Allow Group Registration
          </Label>
          <Switch className="focus-visible:ring-0 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground" />
        </div>
        <Button variant={"default"}>Confirm</Button>
      </DialogContent>
    </Dialog>
  );
};

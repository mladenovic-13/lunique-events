import { type Guest, type RegistrationSettings } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { RegistrationForm } from "./registration-form";

interface RegisterGuestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
  email: string;
  rules: RegistrationSettings;
  isInvited?: boolean;
  onSuccess: (guest: Guest) => void;
}

export const RegisterGuestModal = ({
  open,
  onOpenChange,
  eventId,
  email,
  rules,
  isInvited = false,
  onSuccess,
}: RegisterGuestModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Your info</DialogTitle>
        </DialogHeader>

        <RegistrationForm
          eventId={eventId}
          email={email}
          fields={{
            name: rules?.name,
            linkedIn: rules?.linkedIn,
            website: rules?.website,
          }}
          isInvited={isInvited}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

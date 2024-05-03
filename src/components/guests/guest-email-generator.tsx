import React, { useState } from "react";

import { AddGuestsDirectly } from "./add-guests-directly";
import { SendInvites } from "./send-invites";

type SetGuestsStep = "inviteGuests" | "addGuestsDirectly";

interface GuestEmailGeneratorProps {
  prop?: string;
}
export const GuestEmailGenerator = ({}: GuestEmailGeneratorProps) => {
  const [step, setStep] = useState<SetGuestsStep>("inviteGuests");

  return (
    <>
      {step === "inviteGuests" && (
        <SendInvites onChangeMode={() => setStep("addGuestsDirectly")} />
      )}
      {step === "addGuestsDirectly" && (
        <AddGuestsDirectly onChangeMode={() => setStep("inviteGuests")} />
      )}
    </>
  );
};

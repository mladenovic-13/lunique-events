import React from "react";
import { UserRoundPlusIcon } from "lucide-react";

import { Separator } from "../ui/separator";

interface AddGuestsDirectlyProps {
  onChangeMode: () => void;
}
export const AddGuestsDirectly = ({ onChangeMode }: AddGuestsDirectlyProps) => {
  return (
    <section className="flex flex-col gap-4 px-4">
      <GuestsCardComponent />
      <div className="flex w-full items-center gap-2 pl-0">
        <div className="flex size-8 items-center justify-center rounded-md bg-green-800/20  p-1.5">
          <UserRoundPlusIcon className="text-green-500" />
        </div>
        <p className="text-sm">
          Guests will be added to the guest list, bypassing registration and
          payment.{" "}
        </p>
      </div>
      <Separator />
      <p className="text-xs font-medium leading-6 text-accent-foreground/50">
        If you’d like guests to register, send them an invite instead.{" "}
        <a
          className="text-primary/50 transition-all hover:cursor-pointer hover:text-primary "
          onClick={onChangeMode}
        >
          Invite Guests
        </a>{" "}
        Please only add guests who have already consented to joining this event.
      </p>
    </section>
  );
};

const GuestsCardComponent = () => {
  return (
    <div className="rounded-lg border-[1.5px] border-accent-foreground/10 bg-muted/10 p-2 px-4">
      <div className="flex flex-col gap-3">
        {Array(3)
          .fill(0)
          .map((_, index) => index + 1)
          .map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex w-full items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-accent-foreground/50">
                  {i}
                </div>
                <div className="h-4 w-1/2 rounded-sm bg-muted"></div>
              </div>
              <div className="rounded-md bg-green-800/20 px-2 py-0.5 text-xs text-green-400">
                Going
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

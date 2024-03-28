import React from "react";
import { UserIcon } from "lucide-react";

import { Card, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export const Subscriptions = () => {
  return (
    <section className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-xl font-semibold text-current">Subscriptions</h1>
        <p className="text-base font-normal text-accent-foreground/60">
          Keep up-to-date with calendars you are interested in.
        </p>
      </div>
      <Card className="h-fit transition-all hover:cursor-pointer hover:bg-muted">
        <CardHeader className="flex px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex size-6 items-center justify-center rounded-full border-2 border-accent-foreground p-0">
                <UserIcon className="p-0" />
              </div>
              <h1>Luka Stojadinovic (Luka Stojadinovic)</h1>
            </div>
            <div>
              <Switch />
            </div>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
};

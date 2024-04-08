import React from "react";
import { RssIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CalendarSubscriptionButton = () => {
  return (
    <Button className="h-8 p-2" variant={"secondary"}>
      <RssIcon size={16} />
    </Button>
  );
};

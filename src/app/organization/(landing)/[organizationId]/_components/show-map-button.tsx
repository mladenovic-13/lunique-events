import React from "react";
import { MapIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const ShowMapButton = () => {
  return (
    <Button className="h-7 space-x-2" variant={"secondary"}>
      <MapIcon size={16} />
      <p>ShowMap</p>
    </Button>
  );
};

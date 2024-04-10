import React from "react";
import { ListIcon, TableIcon } from "lucide-react";

import { type Mode } from "@/components/layout/timeline";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ViewMode = "card" | "list";
interface ViewTabsProps {
  value: ViewMode;
  onValueChange: (value: ViewMode) => void;
}

export const ViewTabs = ({ value, onValueChange }: ViewTabsProps) => {
  const defaultValue: ViewMode = "card";
  return (
    <Tabs
      defaultValue={defaultValue}
      onValueChange={(value) => onValueChange(value as ViewMode)}
    >
      <TabsList className="h-8 ">
        <TabsTrigger value="card" className="p-2">
          <TableIcon size={12} />
        </TabsTrigger>
        <TabsTrigger value="list" className="p-2">
          <ListIcon size={12} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

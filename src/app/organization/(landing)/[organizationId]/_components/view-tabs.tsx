// @Lukiano99
// TODO: move to @/components

import React from "react";
import { ListIcon, TableIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ViewTabsProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const ViewTabs = ({ value, onValueChange }: ViewTabsProps) => {
  return (
    <Tabs defaultValue={value} onValueChange={(value) => onValueChange(value)}>
      <TabsList className="h-8">
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

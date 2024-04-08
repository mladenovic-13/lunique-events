import React from "react";
import { ListIcon, TableIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ViewTabs = () => {
  return (
    <Tabs defaultValue="account" className="">
      <TabsList className="h-8">
        <TabsTrigger value="account">
          <TableIcon size={14} />
        </TabsTrigger>
        <TabsTrigger value="password">
          <ListIcon size={14} />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account"></TabsContent>
      <TabsContent value="password"></TabsContent>
    </Tabs>
  );
};

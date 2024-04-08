import React from "react";
import { ListIcon, TableIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ViewTabs = () => {
  return (
    <Tabs defaultValue="account" className="">
      <TabsList className="h-8 ">
        <TabsTrigger value="account" className="p-2">
          <TableIcon size={12} />
        </TabsTrigger>
        <TabsTrigger value="password" className="p-2">
          <ListIcon size={12} />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account"></TabsContent>
      <TabsContent value="password"></TabsContent>
    </Tabs>
  );
};

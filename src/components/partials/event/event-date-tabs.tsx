"use client";

import { Tabs } from "@radix-ui/react-tabs";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EventDateTabsProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const EventTimeframeTabs = ({
  value,
  onValueChange,
}: EventDateTabsProps) => {
  return (
    <Tabs value={value} onValueChange={(value) => onValueChange(value)}>
      <TabsList className="rounded-md">
        <TabsTrigger
          value="upcoming"
          className="w-24 hover:text-accent-foreground md:w-32"
        >
          Upcoming
        </TabsTrigger>

        <TabsTrigger
          value="past"
          className="w-24 hover:text-accent-foreground md:w-32"
        >
          Past
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

import React from "react";
import {
  DollarSignIcon,
  InfoIcon,
  TagIcon,
  TicketIcon,
  UserCheck2Icon,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

const insightItems = [
  {
    name: "Events",
    value: 7,
    lastWeek: 2,
    icon: <TagIcon size={15} className="p-0" />,
  },
  {
    name: "Tickets",
    value: 10,
    lastWeek: 0,
    icon: <TicketIcon size={15} className="p-0" />,
  },
  {
    name: "Subscribers",
    value: 2,
    lastWeek: 0,
    icon: <UserCheck2Icon size={15} className="p-0" />,
  },
  {
    name: "Sales",
    value: 0,
    lastWeek: 0,
    icon: <DollarSignIcon size={15} className="p-0" />,
  },
];

export const Statistics = () => {
  return (
    <section className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-4 gap-8">
          {insightItems.map((item, idx) => (
            <div className="flex flex-col " key={idx}>
              <div className="flex items-center justify-start space-x-1 text-accent-foreground/50">
                <div>{item.icon}</div>
                <h1 className="text-sm">{item.name}</h1>
              </div>
              <div>
                <p className="text-2xl text-accent-foreground">{item.value}</p>
              </div>
              <div>
                <p className="text-sm">{item.lastWeek} last week</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 text-accent-foreground/50">
          <InfoIcon size={15} />
          <p className="text-sm">
            Only events created under this calendar count towards these stats.
          </p>
        </div>
      </div>
      <Separator />
    </section>
  );
};

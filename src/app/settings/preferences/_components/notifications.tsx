import React from "react";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const notifications = [
  {
    category: "Events You Attend",
    items: [
      { name: "Email Reminders", checked: true },
      { name: "Event Posts", checked: true },
      { name: "SMS Reminders", checked: true },
      { name: "Feedback Requests", checked: true },
      { name: "New Sessions", checked: true },
    ],
  },
  {
    category: "Events You Host",
    items: [
      { name: "Feedback Responses", checked: true },
      { name: "New Guest Registered", checked: true },
    ],
  },
  {
    category: "Calendars You Manage",
    items: [
      { name: "New Subscriber", checked: true },
      { name: "Event Submission", checked: true },
    ],
  },
  {
    category: "Lunique Events",
    items: [{ name: "Marketing Emails", checked: true }],
  },
];

export const Notifications = () => {
  return (
    <section className="flex flex-col space-y-6">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-current">
          Notifications & Reminders
        </h1>
        <p className="text-base font-normal text-accent-foreground/60">
          These options apply to all calendars and events you are part of.
        </p>
      </div>
      <Card className="p-4 pb-6">
        <div className="space-y-8">
          {notifications.map((notif, idx) => (
            <div className="flex flex-col space-y-4" key={idx}>
              <div>
                <h1 className="text-sm font-medium text-accent-foreground/50">
                  {notif.category}
                </h1>
              </div>
              <div className="grid grid-cols-3 gap-4 pl-2 ">
                {notif.items.map((item, index) => (
                  <div className="flex items-center space-x-2 " key={index}>
                    <Checkbox id={item.name} checked={item.checked} />
                    <label
                      htmlFor="terms"
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
};

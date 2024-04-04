import React from "react";
import { CalendarIcon, SquareEqualIcon, UsersIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    description: "Manage with your team",
    icon: <UsersIcon className="size-12 text-indigo-500" />,
  },
  {
    description: "Create a public calendar page",
    icon: <CalendarIcon className="size-12 text-green-500" />,
  },
  {
    description: "Curate community events",
    icon: <SquareEqualIcon className="size-12 text-orange-500" />,
  },
];

export const SetUpYourCalendar = () => {
  return (
    <section className="py-2.5">
      <Card className="py-2">
        <CardHeader className="space-y-3">
          <CardTitle className="flex justify-center">
            <p className="capitalize md:text-lg">Set Up Your Calendar</p>
          </CardTitle>
          <CardDescription className="flex  justify-center text-center">
            <div className="flex md:w-3/5">
              <p className="">
                Your Lunique Events Calendar lets you easily manage, share, and
                curate your events.
              </p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="grid grid-cols-1 place-items-center gap-8 md:grid md:grid-cols-3 md:gap-0">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex w-full items-center justify-start space-x-2 md:flex-col md:gap-2 md:space-x-0"
              >
                <div>{item.icon}</div>
                <div className="w-32">
                  <p className="text-left text-sm text-accent-foreground/90 md:text-center">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>
            <p>Get Started</p>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

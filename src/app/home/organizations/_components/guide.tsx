"use client";
import React, { useState } from "react";
import {
  Building2Icon,
  type LucideIcon,
  MailIcon,
  ShareIcon,
  SquareLibraryIcon,
  Users2Icon,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";

const steps = [
  {
    step: 1,
    title: "Welcome To LuniqueEvents Organizations",
    description:
      "LuniqueEvents Organization lets you easily share and manage your events. Every event on LuniqueEvents is part of a organization. Lets see how they work.",
    icon: Building2Icon,
  },
  {
    step: 2,
    title: "Work with Your Team",
    description:
      "Easily add your teammates as organization admins. They’ll have manage access to events managed by the organization.",
    icon: Users2Icon,
  },
  {
    step: 3,
    title: "Share Your Organization Page",
    description:
      "Customize and share your beautiful Organization showcasing your upcoming events. Guests can browse your schedule and subscribe for updates.",
    icon: ShareIcon,
  },
  {
    step: 4,
    title: "Send Newsletters",
    description:
      "As guests subscribe to your Organization, you can send them newsletters to keep them in the loop.",
    icon: MailIcon,
  },
  {
    step: 5,
    title: "Highlight Community Events",
    description:
      "Your Organization can feature events from other Organizations. You can even include events hosted on other websites.",
    icon: SquareLibraryIcon,
  },
];

const OrganizationGuide = () => {
  const [guide, setGuide] = useState(true);
  const [step, setStep] = useState<number>(1);

  const router = useRouter();

  const Icon: LucideIcon = steps[step - 1]?.icon ?? Building2Icon;

  return (
    <Card className={cn("relative", guide && "block", !guide && "hidden")}>
      <CardHeader className="flex flex-col items-start justify-start gap-2  px-2 pb-6 pt-2 md:flex-row md:gap-4 md:p-4">
        <div className="flex h-36 w-full items-center justify-center rounded-lg bg-muted p-2 md:size-28 md:min-h-28 md:min-w-28">
          <Icon
            className="size-2/3 duration-100 animate-in"
            strokeWidth="0.7"
          />
        </div>
        <div className="flex h-full flex-col px-2 md:px-0">
          <div className="flex flex-col gap-4 md:gap-2">
            <CardTitle>{steps[step - 1]?.title}</CardTitle>
            <CardDescription className="h-[80px] md:h-fit md:w-3/4">
              {steps[step - 1]?.description}
            </CardDescription>
          </div>
          <div className="flex flex-row gap-2 pt-6">
            {Array(steps.length)
              .fill(0)
              .map((_, index) => index + 1)
              .map((i) => (
                <div
                  key={i}
                  onClick={() => setStep(i)}
                  className={cn(
                    "h-1 w-6 rounded-sm bg-muted brightness-90 transition-all hover:cursor-pointer dark:brightness-125 md:hover:scale-110 md:hover:bg-primary/50",
                    step === i &&
                      "scale-110 bg-accent-foreground md:hover:bg-accent-foreground",
                  )}
                />
              ))}
          </div>
        </div>
        <Button
          variant={step < steps.length ? "secondary" : "default"}
          size={"sm"}
          className="absolute bottom-4 right-4 transition-all"
          onClick={() => {
            step < steps.length && setStep(step + 1);
            step === steps.length && router.push(paths.organization.create);
          }}
        >
          {step < steps.length && <p>Next</p>}
          {step === steps.length && <p>Create Organization</p>}
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="absolute right-1.5 top-0 rounded-full p-0 transition-all md:hover:bg-transparent md:hover:text-destructive"
          onClick={() => setGuide(!guide)}
        >
          <XIcon className="size-5  p-0" />
        </Button>
      </CardHeader>
    </Card>
  );
};

export default OrganizationGuide;

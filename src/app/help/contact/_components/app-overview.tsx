import React from "react";
import { LifeBuoyIcon, LightbulbIcon, PuzzleIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Customized software solutions",
    description:
      "We create individually tailored software that meets the unique needs of our clients.",
    icon: PuzzleIcon,
  },
  {
    title: "Expertise in the latest technologies",
    description:
      "Our team of deleopers has deep knowledge and experience in the latest technologies.",
    icon: LightbulbIcon,
  },
  {
    title: "Support and maintenance",
    description:
      "We do not stop our work after implementing the solution - we provide continuous support and maintenance.",
    icon: LifeBuoyIcon,
  },
];

const FunctionalityOverview = () => {
  return (
    <Card className="flex h-fit flex-col gap-2 rounded-2xl border-none bg-background px-0 md:w-[450px] md:p-2">
      {features.map((feat, idx) => (
        <Card
          key={idx}
          className="h-32 border-none px-4 transition-all hover:pl-6"
        >
          <CardHeader className="pb-2 pl-4">
            <CardTitle className="flex items-center gap-4">
              <feat.icon className="size-5" />

              <p className="font-medium md:text-base">{feat.title}</p>
            </CardTitle>
          </CardHeader>
          <CardDescription className="p-4 pt-0 ">
            {feat.description}
          </CardDescription>
        </Card>
      ))}
    </Card>
  );
};

export default FunctionalityOverview;

import React from "react";
import { AvatarFallback } from "@radix-ui/react-avatar";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  image?: string;
  name?: string;
  email?: string;
  impression?: string;
  className?: string;
}
const TestimonialCard = ({
  image,
  name,
  email,
  impression,
  className,
}: TestimonialCardProps) => {
  return (
    <Card className={cn("h-52", className && className)}>
      <CardHeader className="flex w-full  flex-row items-center justify-start gap-2 space-y-0 pb-4">
        <div className="flex size-12 items-center justify-center p-0">
          <Avatar className="size-full bg-secondary p-0.5 hover:ring-0">
            <AvatarImage
              src={image}
              className=" rounded-full"
              alt="avatar image"
            />
            <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex h-full flex-col ">
          <h1 className="font-semibold">{name}</h1>
          <h1 className=" text-xs font-light text-accent-foreground/70">
            {email}
          </h1>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-5">{impression}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;

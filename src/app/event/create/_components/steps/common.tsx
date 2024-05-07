import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const StepContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card ref={ref} className={cn("shadow-none", className)} {...props} />
));
StepContainer.displayName = "Card";

export const StepContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={cn("min-h-96", className)} {...props} />
));
StepContent.displayName = "Card";

export const StepHeader = CardHeader;
export const StepTitle = CardTitle;
export const StepDescription = CardDescription;
export const StepFooter = CardFooter;

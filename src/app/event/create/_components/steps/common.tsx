import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const StepContent = ({ children }: { children: React.ReactNode }) => (
  <Card className="flex min-h-96 flex-col justify-between">{children}</Card>
);

export const StepHeader = CardHeader;
export const StepTitle = CardTitle;
export const StepDescriptiom = CardDescription;
export const StepFormContainer = CardContent;
export const StepFooter = CardFooter;

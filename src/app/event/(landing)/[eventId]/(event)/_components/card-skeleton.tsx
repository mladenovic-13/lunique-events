import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export const CardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="rounded-t-lg bg-muted/60 px-3 py-2">
        <div className="h-4 w-32 rounded-md bg-muted" />
      </CardHeader>
      <CardContent className="p-3">
        <div className="h-5 w-4/5 rounded-md bg-muted" />
      </CardContent>
      <CardFooter className="p-3">
        <div className="h-9 w-full rounded-md bg-muted" />
      </CardFooter>
    </Card>
  );
};

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const RegisterGuest = () => {
  return (
    <Card>
      <CardHeader className="rounded-t-lg bg-card-foreground/5 px-3 py-2">
        <CardTitle className="text-sm">Registration</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        Welcome! To join the event, please register below.
      </CardContent>
      <CardFooter className="p-3">
        <Button className="w-full">Register</Button>
      </CardFooter>
    </Card>
  );
};

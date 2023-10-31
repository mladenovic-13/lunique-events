import { CheckCheck } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const BillingPlanCard = () => {
  return (
    <Card>
      <CardHeader className="space-y-0">
        <CardTitle className="text-xl">Current Plan</CardTitle>
        <CardDescription>
          You are currently on the <Badge className="mx-0.5 w-fit">Free</Badge>{" "}
          plan
        </CardDescription>
        <CardContent className="px-0 py-5">
          <ul className="text-zinc-500">
            <li className="flex items-center">
              <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> 500 Total
              photos
            </li>
            <li className="flex items-center">
              <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> 500 Indexed
              images
            </li>
            <li className="flex items-center">
              <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> Unlimited
              Galleries
            </li>
            <li className="flex items-center">
              <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> Unlimited
              Gallery sharing
            </li>
            <li className="flex items-center">
              <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> Unlimited
              Unlimited face searches
            </li>
          </ul>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

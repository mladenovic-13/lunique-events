"use client";

import { CheckCheck, Loader2Icon } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { api } from "@/trpc/react";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { paths } from "@/routes/paths";
import { PLAN_MAP } from "@/server/api/routers/billing";

export const BillingPlanCard = () => {
  const { data: subscription, ...subscriptionQuery } =
    api.billing.getSubscription.useQuery();
  const { data: professionalPlan, ...professionalPlanQuery } =
    api.billing.getPlan.useQuery({ type: "professional" });
  // const { data: personalPlan, ...personalPlanQuery } =
  //   api.billing.getPlan.useQuery({ type: "personal" });

  const { mutate: getCheckoutUrl, ...checkoutUrlMutation } =
    api.billing.getCheckoutUrl.useMutation();
  const { mutate: cancelSubscription, ...cancelSubscriptionMutation } =
    api.billing.cancelSubscription.useMutation();

  const router = useRouter();
  const { toast } = useToast();

  const cancelPremiumPlan = () => {
    if (!subscription) {
      toast({
        variant: "destructive",
        title: "Internal server error",
        description: "Subscription missing",
      });
      return;
    }

    cancelSubscription(
      { lemonSqueezyId: subscription.lemonSqueezyId },
      {
        onSuccess: () =>
          toast({
            title: "Subscription canceled",
            description: "You are now on personal plan.",
          }),
        onError: () => {
          toast({
            variant: "destructive",
            title: "Internal server error",
            description: "Failed to cancel subscription. Please try again.",
          });
        },
      },
    );
  };

  const getPremiumPlan = () => {
    if (!professionalPlan) {
      toast({
        variant: "destructive",
        title: "Internal server error",
        description: "Professional plan data missing",
      });
      return;
    }

    getCheckoutUrl(
      {
        variantId: professionalPlan.variantId,
        embed: false,
      },
      {
        onSuccess: (url) => router.push(url ?? "/"),
        onError: () =>
          toast({
            title: "Error creating a checkout.",
            description:
              "Please check the server console for more information.",
          }),
      },
    );
  };

  const isPersonal = subscription?.plan.name === "Personal";
  const isProfessional = subscription?.plan.name === "Professional";
  const features = isProfessional ? PLAN_MAP.professional : PLAN_MAP.personal;

  if (subscriptionQuery.isLoading || professionalPlanQuery.isLoading)
    return <LoadingSkeleton />;

  if (subscriptionQuery.isError || professionalPlanQuery.isError)
    return redirect(paths.events.root);

  return (
    <Card>
      <CardHeader className="space-y-0">
        <CardTitle>Current Plan</CardTitle>
        <div className="flex items-center gap-1">
          <CardDescription>You are currently on the</CardDescription>
          <Badge className="mx-0.5 w-fit">
            {isProfessional ? "Professional" : "Personal"}
          </Badge>
          <CardDescription>plan</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="text-zinc-500">
          <li className="flex items-center">
            <CheckCheck className="mr-1.5 h-5 w-5 text-primary" />{" "}
            {features.images} Total photos
          </li>
          <li className="flex items-center">
            <CheckCheck className="mr-1.5 h-5 w-5 text-primary" />{" "}
            {features.images} Indexed images
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
      <CardFooter>
        {isPersonal && (
          <Button
            onClick={getPremiumPlan}
            disabled={checkoutUrlMutation.isLoading}
          >
            {checkoutUrlMutation.isLoading && (
              <Loader2Icon className="mr-1.5 h-4 w-4 animate-spin" />
            )}
            Get Professional Plan
          </Button>
        )}
        {isProfessional && (
          <Button
            onClick={cancelPremiumPlan}
            disabled={cancelSubscriptionMutation.isLoading}
          >
            {cancelSubscriptionMutation.isLoading && (
              <Loader2Icon className="mr-1.5 h-4 w-4 animate-spin" />
            )}
            Cancel Professional Plan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <Card>
    <CardHeader className="space-y-0">
      <CardTitle>Current Plan</CardTitle>
      <div className="flex items-center gap-1">
        <CardDescription>You are currently on the</CardDescription>
        <Badge className="mx-0.5 w-fit">Free</Badge>
        <CardDescription>plan</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
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
    <CardFooter>
      <div className="h-9 w-48 rounded-md bg-muted" />
    </CardFooter>
  </Card>
);

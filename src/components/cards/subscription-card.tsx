"use client";

import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CheckoutButton } from "../partials/billing/checkout-button";
import { Button } from "../ui/button";

export const SubscriptionCard = () => {
  // const plans = await api.billing.getAllPlans.query();
  const { data: currentPlan } = api.billing.getCurrentPlan.useQuery();
  const { data: plans } = api.billing.getAllPlans.useQuery();

  const premiumPlan = plans
    ? plans.find((plan) => parseInt(plan.price, 10) > 0)
    : undefined;

  const isPremiumCurrent =
    premiumPlan && currentPlan && currentPlan.id === premiumPlan.id;

  const cancelSubscription = () => {
    alert("Subscription canceled!");
  };

  return (
    <Card>
      <CardHeader className="space-y-0">
        <CardTitle>Subscription Plan</CardTitle>
        {!isPremiumCurrent && (
          <CardDescription>
            You currently on do not have an active subscription.
          </CardDescription>
        )}
        {isPremiumCurrent && (
          <CardDescription>You currently on professional plan.</CardDescription>
        )}
      </CardHeader>
      <CardContent className=" text-zinc-500">
        {premiumPlan && currentPlan && currentPlan.id !== premiumPlan.id && (
          <CheckoutButton
            className="w-full"
            plan={premiumPlan}
            currentPlan={currentPlan}
          >
            Get premium plan
          </CheckoutButton>
        )}
        {currentPlan?.id === premiumPlan?.id && (
          <Button className="w-full" onClick={cancelSubscription}>
            Cancel subscription
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

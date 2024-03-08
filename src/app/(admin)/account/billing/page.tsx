import { BillingPlanCard } from "@/components/cards/billing-plan-card";
import { LicenseCodeCard } from "@/components/cards/license-code-card";

export default function UsagePage() {
  // TODO: fetch billing data

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-zinc-500">
          Manage billing and your subscription plan.
        </p>
      </header>

      <div className="space-y-3">
        <BillingPlanCard />
        <LicenseCodeCard />
      </div>
    </div>
  );
}

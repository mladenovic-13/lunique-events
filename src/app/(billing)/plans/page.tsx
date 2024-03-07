import { Plan } from "@/components/partials/billing/subscription-plan";
import { api } from "@/trpc/server";

export default async function Plans() {
  const plans = await api.billing.getAllPlans.query();
  const currentPlan = await api.billing.getCurrentPlan.query();

  console.log(currentPlan);

  if (!plans.length) {
    return <p>No plans available.</p>;
  }

  return (
    <div>
      <h2>Plans</h2>

      <div className="mb-5 mt-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
        {plans.map((plan, index) => {
          return (
            <Plan key={`plan-${index}`} plan={plan} currentPlan={currentPlan} />
          );
        })}
      </div>
    </div>
  );
}

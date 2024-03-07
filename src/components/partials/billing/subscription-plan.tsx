import { type Plan as PlanType } from "@prisma/client";
import { CheckoutButton } from "./checkout-button";

export function Plan({
  plan,
  currentPlan,
}: {
  plan: PlanType;
  currentPlan?: PlanType;
}) {
  const { description, productName, name, price } = plan;

  return (
    <div>
      <h2>
        {productName} ({name})
      </h2>

      {description ? (
        <div
          dangerouslySetInnerHTML={{
            // Ideally sanitize the description first.
            __html: description,
          }}
        ></div>
      ) : null}

      <p>${price}</p>

      <CheckoutButton plan={plan} embed={true} currentPlan={currentPlan}>
        Get Plan
      </CheckoutButton>
    </div>
  );
}

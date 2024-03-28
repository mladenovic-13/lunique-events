import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const PaymentMethods = () => {
  return (
    <section className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-xl font-semibold text-current">Payment Methods</h1>
        <p className="text-base font-normal text-accent-foreground/60">
          Your saved payment methods are encrypted and stored securely by
          Stripe.
        </p>
      </div>
      <Button
        variant={"default"}
        className="w-fit space-x-2 pl-2 pr-4 capitalize"
      >
        <PlusIcon size={18} className="p-0" />
        <p>Add Card</p>
      </Button>
    </section>
  );
};

export default PaymentMethods;

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import Section from "../../_components/section";

const PaymentMethods = () => {
  return (
    <section className="flex flex-col space-y-6">
      <Section
        title="Payment Methods"
        description="Your saved payment methods are encrypted and stored securely by
          Stripe."
      />
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

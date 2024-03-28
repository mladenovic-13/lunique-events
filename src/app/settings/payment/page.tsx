import { Separator } from "@/components/ui/separator";

import { LuniquePlus } from "./_components/lunique-plus";
import PaymentHistory from "./_components/payment-history";
import PaymentMethods from "./_components/payment-methods";

export default function PaymentSettingsPage() {
  return (
    <div className="flex flex-col space-y-8 px-2">
      <PaymentMethods />
      <Separator />
      <LuniquePlus />
      <Separator />
      <PaymentHistory />
    </div>
  );
}

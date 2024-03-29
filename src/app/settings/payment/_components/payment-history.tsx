import React from "react";
import { WalletCardsIcon } from "lucide-react";

import Section from "../../_components/section";

const PaymentHistory = () => {
  const payments = [];

  return (
    <section className="space-y-8">
      <Section title="Payment History" />
      {payments.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-10">
          <WalletCardsIcon size={200} opacity={0.1} />
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-accent-foreground/80">
              No Payments
            </h1>
            <p className="text-base font-normal capitalize text-accent-foreground/60">
              You have not made any payments on Lunique Events.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PaymentHistory;

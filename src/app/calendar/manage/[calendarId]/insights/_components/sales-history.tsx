import React from "react";
import { ClipboardEditIcon } from "lucide-react";

import Section from "@/components/header/section";
import { Separator } from "@/components/ui/separator";

const salesHistory = [];

export const SalesHistory = () => {
  return (
    <section className="space-y-8">
      <Section title="Sales History" button="Download CSV" />
      {salesHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-10">
          <ClipboardEditIcon size={200} opacity={0.1} />
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-accent-foreground/80">
              No Transactions
            </h1>
            <p className="text-base font-normal capitalize text-accent-foreground/60">
              You have not made any sales.
            </p>
          </div>
        </div>
      )}
      <Separator />
    </section>
  );
};

import React from "react";
import { AlertTriangleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import Section from "../../../../components/header/section";

export const DeleteAccount = () => {
  return (
    <section className="space-y-6">
      <Section
        title="Delete Account"
        description="If you no longer wish to use Lunique Events, you can permanently delete your account."
      />
      <Button variant={"destructive"} className="space-x-2">
        <AlertTriangleIcon size={18} />
        <p className="text-base">Delete My Account</p>
      </Button>
    </section>
  );
};

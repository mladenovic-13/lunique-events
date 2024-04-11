import React from "react";
import { PlusIcon } from "lucide-react";

import Section from "@/components/header/section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Drafts = () => {
  return (
    <div className="flex flex-col space-y-6">
      <section className="space-y-4">
        <Section
          title="Drafts"
          description="As you write, your drafts will be automatically saved and appear here."
        />
        <Button className="space-x-1.5 pl-1 pr-2.5">
          <PlusIcon size={18} />
          <p>New Draft</p>
        </Button>
      </section>
      <Separator />
    </div>
  );
};

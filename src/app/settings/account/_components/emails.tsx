import React from "react";
import { SettingsIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";

import Section from "../../_components/section";

const Emails = () => {
  return (
    <section className="space-y-4">
      <Section
        title="Emails"
        description="Add additional emails to receive event invites sent to those addresses."
        button="Add Email"
      />
      <Card>
        <CardHeader className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-0.5">
              <div className="flex space-x-3">
                <div>
                  <h1 className="text-base font-medium">nikola@lunique.com</h1>
                </div>
                <div>
                  <Badge className="bg-accent-foreground/10">Primary</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-normal text-accent-foreground/50">
                  This email will be shared with hosts when you register for
                  their events.
                </p>
              </div>
            </div>
            <div className="hover:cursor-pointer">
              <SettingsIcon
                size={15}
                className="text-accent-foreground/50 transition-all hover:text-accent-foreground"
              />
            </div>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
};

export default Emails;

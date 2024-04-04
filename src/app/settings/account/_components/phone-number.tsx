import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Section from "../../../../components/header/section";

export const PhoneNumber = () => {
  return (
    <section className="flex flex-col space-y-4">
      <Section
        title="Phone Number"
        description="Manage the phone number you use to sign in to Lunique Events and receive SMS updates."
      />
      <div className="space-y-4">
        <div className="space-y-1">
          <Label className="font-light">Phone Number</Label>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="number"
              placeholder="+381 60 1234567"
              className="text-lg"
            />
            <Button type="submit">Update</Button>
          </div>
        </div>
        <p className="text-sm font-normal text-accent-foreground/50">
          For your security, we will send you a code to verify any change to
          your phone number.
        </p>
      </div>
    </section>
  );
};

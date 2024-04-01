import React from "react";
import { LockIcon, ShieldCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import Section from "../../../../components/header/section";

export const PasswordAndSecurity = () => {
  return (
    <section className="space-y-4">
      <Section
        title="Password & Security"
        description="Secure your account with password and two-factor authentication."
      />
      <Card>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="">
              <LockIcon size={18} className="text-accent-foreground/50" />
            </div>
            <div className="flex flex-col">
              <div>
                <h1 className="font-medium">Account Password</h1>
              </div>
              <div>
                <p className="text-sm">
                  Please follow the instructions in the email to finish setting
                  your password.
                </p>
              </div>
            </div>
          </div>
          <div>
            <Button className="h-8">Set Password</Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Separator className="w-[95%] " />
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="">
              <ShieldCheckIcon
                size={18}
                className="text-accent-foreground/50"
              />
            </div>
            <div className="flex flex-col">
              <div>
                <h1 className="font-medium">Two-Factor Authentication</h1>
              </div>
              <div>
                <p className="text-sm">
                  Please set a password before enabling two-factor
                  authentication.
                </p>
              </div>
            </div>
          </div>
          <div>
            <Button disabled={true} className="h-8">
              Enable 2FA
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

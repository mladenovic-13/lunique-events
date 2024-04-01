import React from "react";
import {
  ChromeIcon,
  FacebookIcon,
  LinkedinIcon,
  Wallet2Icon,
  WifiIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import Section from "../../../../components/header/section";

const accounts = [
  {
    name: "Google",
    link: "nikola@lunique.com",
    icon: <ChromeIcon size={20} />,
  },
  { name: "Facebook", link: "not linked", icon: <FacebookIcon size={20} /> },
  { name: "Stripe", link: "not linked", icon: <Wallet2Icon size={20} /> },
  { name: "Linked In", link: "not linked", icon: <LinkedinIcon size={20} /> },
];

export const ThirdPartyAccounts = () => {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <Section
          title="Third Party Accounts"
          description="Link your accounts to sign in to Luma and automate your workflows."
        />
        <div className="grid grid-cols-3 gap-4">
          {accounts.map((acc, idx) => (
            <Card key={idx}>
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                  {acc.icon}
                  <div className="flex flex-col">
                    <h1 className="font-medium">{acc.name}</h1>
                    <p className="text-sm text-accent-foreground/50">
                      {acc.link}
                    </p>
                  </div>
                </div>
                <div>
                  <Button className="h-8">Link</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Section title="Account Syncing" />
        <Card>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <div className="">
                <WifiIcon size={18} className="text-accent-foreground/50" />
              </div>
              <div className="flex flex-col">
                <div>
                  <h1 className="font-medium">Calendar Syncing</h1>
                </div>
                <div>
                  <p className="text-sm">
                    Sync all of your events with your Google, Outlook, or Apple
                    calendar.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Button variant={"secondary"} className="h-8">
                Add iCal Subscription
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Separator className="w-[95%] " />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <div className="">
                <ChromeIcon size={18} className="text-accent-foreground/50" />
              </div>
              <div className="flex flex-col">
                <div>
                  <h1 className="font-medium">Sync Contacts with Google</h1>
                </div>
                <div>
                  <p className="text-sm">
                    Sync your Gmail contacts to easily invite them to your
                    events.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Button className="h-8">Enable Syncing</Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

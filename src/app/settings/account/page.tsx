import React from "react";

import { Separator } from "@/components/ui/separator";

import { DeleteAccount } from "./_components/delete-account";
import Emails from "./_components/emails";
import { PasswordAndSecurity } from "./_components/password-and-security";
import { PhoneNumber } from "./_components/phone-number";
import EditProfile from "./_components/profile-section";
import { ThirdPartyAccounts } from "./_components/third-party-accounts";

function AccountSettingsPage() {
  return (
    <div className="flex flex-col space-y-8 px-2">
      <EditProfile />
      <Separator />
      <Emails />
      <Separator />
      <PhoneNumber />
      <Separator />
      <PasswordAndSecurity />
      <Separator />
      <ThirdPartyAccounts />
      <Separator />
      <DeleteAccount />
    </div>
  );
}

export default AccountSettingsPage;

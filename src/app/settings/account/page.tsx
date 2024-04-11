import React from "react";

import Section from "@/components/header/section";

import { AccountInfoForm } from "./_components/account-info-form";

function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <Section
        title="Your Profile"
        description=" Choose how you are displayed as a host or guest."
      />
      <div className="flex justify-start space-x-20">
        <AccountInfoForm />
      </div>
    </div>
  );
}

export default AccountSettingsPage;

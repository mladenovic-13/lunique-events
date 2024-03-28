"use client";
import React from "react";
import { CreditCardIcon, SettingsIcon, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";

export const SettingsNav = () => {
  const items = [
    {
      title: "Account",
      href: paths.settings.account,
      Icon: UserCircle2Icon,
    },
    {
      title: "Preferences",
      href: paths.settings.preferences,
      Icon: SettingsIcon,
    },
    {
      title: "Payment",
      href: paths.settings.payment,
      Icon: CreditCardIcon,
    },
  ];
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex pt-4">
      <ul className="flex justify-start gap-5 overflow-x-auto overflow-y-hidden rounded-none bg-transparent px-3 text-muted-foreground md:overflow-hidden md:px-0">
        {items.map((item) => (
          <div key={item.title}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center rounded-none border-b-2 border-transparent py-2 text-sm font-medium transition duration-300 hover:text-primary/90",
                pathname === item.href && "border-primary text-primary",
              )}
            >
              <item.Icon className="mr-1.5 size-4" />
              {item.title}
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

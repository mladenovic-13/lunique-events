import React from "react";
import { ArrowUpRightIcon, UserIcon } from "lucide-react";
import Link from "next/link";

import { Card, CardHeader } from "@/components/ui/card";
import { paths } from "@/routes/paths";

import Section from "../../_components/section";

export const LuniquePlus = () => {
  return (
    <section className="flex flex-col space-y-5">
      <Section
        title="Lunique Plus"
        description="Enjoy 0% platform fees, higher invite and admin limits, priority
          support, and more."
      />
      <div className="flex flex-col space-y-3">
        <Link href={paths.calendar.manage.settings.plus("changeThisID!!!")}>
          <Card className="h-fit transition-all hover:cursor-pointer hover:bg-muted">
            <CardHeader className="flex px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex size-6 items-center justify-center rounded-full border-2 border-accent-foreground p-0">
                    <UserIcon className="p-0" />
                  </div>
                  <h1>Personal</h1>
                </div>
                <div>
                  <ArrowUpRightIcon
                    size={18}
                    className="text-accent-foreground/30"
                  />
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <p className="text-sm font-normal text-accent-foreground/60">
          Lunique Plus applies on the calendar level. Choose the desired
          calendar above to manage its Lunique Plus membership.
        </p>
      </div>
    </section>
  );
};

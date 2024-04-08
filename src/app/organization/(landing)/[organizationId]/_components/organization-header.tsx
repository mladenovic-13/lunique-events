import React from "react";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import thumbImg from "@/public/images/stripeLogo.png";

export const OrganizationHeader = () => {
  return (
    <section className="space-y-2 px-4">
      <div className="flex justify-between ">
        <div className="-mt-9 rounded-xl bg-background p-1">
          <Image
            alt=""
            src={thumbImg}
            width={64}
            height={64}
            className="rounded-lg md:size-20"
          />
        </div>
        <div>
          <Button variant={"outline"} className="h-8 space-x-2">
            <p>Manage</p>
            <ArrowUpRightIcon size={18} />
          </Button>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Calendar theme test</h1>
      </div>
      <Separator className="hidden md:block" />
    </section>
  );
};

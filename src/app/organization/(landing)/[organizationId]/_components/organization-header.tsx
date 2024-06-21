import React from "react";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import thumbImg from "@/public/images/placeholder.jpg";
import { paths } from "@/routes/paths";

interface OrganizationHeaderProps {
  imageSrc?: string | null;
  organizationName?: string | null;
  organizationId: string;
}

export const OrganizationHeader = ({
  imageSrc,
  organizationName,
  organizationId,
}: OrganizationHeaderProps) => {
  return (
    <section className="space-y-2 px-4">
      <div className="flex justify-between ">
        <div className="-mt-9 rounded-xl bg-background p-1">
          <Image
            alt=""
            src={imageSrc ? imageSrc : thumbImg}
            width={200}
            height={200}
            className=" size-16 rounded-lg object-cover md:size-20"
          />
        </div>
        <div>
          <Link href={paths.organization.manage.admins(organizationId)}>
            <Button variant={"outline"} className="h-8 space-x-2">
              <p>Manage</p>
              <ArrowUpRightIcon size={18} />
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">
          {organizationName ? (
            <p>{organizationName}</p>
          ) : (
            <p>Organization name not fetched</p>
          )}
        </h1>
      </div>
    </section>
  );
};

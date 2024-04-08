import { type Organization } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { awsImageLoader } from "@/lib/image-loader";

interface SubscribedCardProps {
  href: string;
  organization: Organization;
}

export const SubscribedCard = ({ organization, href }: SubscribedCardProps) => {
  return (
    <Link href={href}>
      <Card className="flex h-48 cursor-pointer flex-col justify-between rounded-lg p-3 transition duration-200 hover:border-muted-foreground/30 hover:bg-muted/70">
        {organization.thumbnailUrl && (
          <Image
            loader={awsImageLoader}
            width={500}
            height={281}
            src={organization.thumbnailUrl}
            alt={organization.name}
            className="size-20 rounded-lg object-cover "
          />
        )}
        {!organization.thumbnailUrl && (
          <div className="size-20 rounded-md bg-muted" />
        )}
        <div>
          <p className="text-lg font-medium">{organization.name}</p>
          <p className="text-xs text-muted-foreground">No Subscribers</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-5 rounded-full bg-muted" />
          <p className="text-xs text-muted-foreground">3 Admins</p>
        </div>
      </Card>
    </Link>
  );
};

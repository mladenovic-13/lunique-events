"use client";

import { ShieldCheckIcon, UserRoundXIcon } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Section from "@/components/header/section";
import { MainPage } from "@/components/layout/main-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

const OrganizationAdminsPage = () => {
  const { onOpen } = useModal();

  const { organizationId } = useParams<{ organizationId: string }>();
  // const { data: organization, isLoading: isLoadingOrganization } =
  //   api.organization.get.useQuery({
  //     id: organizationId,
  //     timeframe: "upcoming",
  //   });
  const { data: organization, isLoading: isLoadingOrganization } =
    api.organization.getOne.useQuery({
      id: organizationId,
    });
  const user = useSession().data?.user;
  const owner = organization?.owner;
  const ownerPermission = owner?.id === user?.id;

  const { data: organizationAdmins, isLoading: isLoadingAdmins } =
    api.organization.listAdmins.useQuery({
      organizationId,
    });

  if (!organizationId) return notFound();
  if (
    user &&
    organization &&
    !organization.members.map((member) => member.id).includes(user.id) &&
    user.id !== owner?.id
  )
    return notFound();

  return (
    <MainPage>
      <Section
        title="Admins"
        description={
          organization?.isPersonal
            ? "This is your personal organization. If you wish to create an organization where you can add administrators, please start a new organization."
            : "Manage your organization admins."
        }
        button="Add Admin"
        onAction={() => onOpen("org-admins", { organizationId })}
        disabled={organization?.isPersonal}
      />
      <ul className="space-y-2">
        {isLoadingAdmins &&
          isLoadingOrganization &&
          Array(4)
            .fill(0)
            .map((_, index) => index + 1)
            .map((i) => (
              <div
                key={i}
                className="h-10 w-full animate-pulse rounded-lg bg-accent-foreground/20"
              ></div>
            ))}
        {owner && (
          <li>
            <div className="flex items-center justify-between  p-2">
              <div className="flex items-center justify-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full border bg-muted drop-shadow-sm">
                  <p>{owner.email?.[0]?.toUpperCase()}</p>
                </div>
                <h1 className="text-sm font-semibold text-accent-foreground/80">
                  {owner.email}
                </h1>
              </div>
              <div
                className={cn(
                  "flex items-center justify-center gap-2",
                  !ownerPermission && "flex-row-reverse",
                )}
              >
                <Badge
                  className={cn(
                    "bg-green-200 text-green-700 shadow-none transition-all hover:cursor-pointer hover:bg-green-200 dark:bg-green-700/50 dark:text-green-400 dark:hover:bg-green-700/50",
                  )}
                >
                  Owner
                </Badge>
                <Button
                  className="rounded-full transition-all hover:cursor-default  hover:bg-transparent"
                  size={"icon"}
                  variant={"ghost"}
                >
                  <ShieldCheckIcon className="size-4 text-green-700 dark:text-green-400" />
                </Button>
              </div>
            </div>
          </li>
        )}
        {organizationAdmins?.map((admin, idx) => (
          <li key={idx}>
            <div className="flex items-center  justify-between rounded-lg p-2">
              <div className="flex items-center justify-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full border bg-muted drop-shadow-sm">
                  <p>{admin.email?.[0]?.toUpperCase()}</p>
                </div>
                <h1 className="text-sm font-semibold text-accent-foreground/80">
                  {admin.email}
                </h1>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Badge
                  className={cn(
                    "bg-blue-200 text-blue-700 shadow-none transition-all hover:cursor-pointer hover:bg-blue-200 dark:bg-blue-700/50 dark:text-blue-400 dark:hover:bg-blue-700/50",
                  )}
                >
                  Admin
                </Badge>

                {ownerPermission && (
                  <Button
                    className="rounded-full transition-all hover:scale-125 hover:bg-transparent hover:text-destructive"
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => {
                      onOpen("remove-admin", {
                        organizationId: organizationId,
                        adminId: admin.id,
                      });
                    }}
                  >
                    <UserRoundXIcon className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </MainPage>
  );
};

export default OrganizationAdminsPage;

"use client";

import { useEffect, useState } from "react";
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfigActions, useOrganizationId } from "@/hooks/use-config-store";
import { useModal } from "@/hooks/use-modal-store";
import { useSignOut } from "@/hooks/use-sign-out";
import placeholderImg from "@/public/images/placeholder.jpg";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/react";

interface AccountMenuProps {
  image?: string | null;
  name?: string | null;
  email?: string | null;
}

export const AccountMenu = ({ name, image }: AccountMenuProps) => {
  const [organization, setOrganization] = useState<
    RouterOutputs["organization"]["list"][number] | null
  >(null);

  const router = useRouter();

  const { mutate: signOut } = useSignOut();

  const { data: orgs } = api.organization.list.useQuery();
  const { data: orgsAdminOf } = api.organization.listAdminOf.useQuery();

  const { data: isPremiumUser } = api.billing.isPremiumUser.useQuery();

  const { onOpen } = useModal();

  const organizationId = useOrganizationId();
  const { updateOrganizationId } = useConfigActions();

  useEffect(() => {
    // TODO: Move organization fetch to store context privider
    if (!orgs) return;

    const personal = orgs.find((item) => item.isPersonal);
    const current = orgs.find((item) => item.id === organizationId);

    if (current) {
      setOrganization(current);
    }

    if (!current) {
      updateOrganizationId(personal?.id);
    }
  }, [organizationId, orgs, updateOrganizationId]);

  const onNewOrganization = () => {
    if (isPremiumUser) router.push(paths.organization.create);
    if (!isPremiumUser) onOpen("get-now");
  };

  const avatarUrl = organization?.isPersonal
    ? image
    : organization?.thumbnailUrl;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {avatarUrl && <AvatarImage src={avatarUrl} />}
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-5 md:min-w-44">
        {organization && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger icon={false}>
              <div className="flex w-full items-center justify-between gap-5">
                <div className="flex-col items-start">
                  {name && (
                    <p className="min-w-fit whitespace-nowrap font-medium">
                      {organization.isPersonal
                        ? organization.owner.name
                        : organization.name}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {organization.isPersonal ? "Personal" : "Organization"}
                  </p>
                </div>
                <ChevronsUpDownIcon className="size-4 min-w-fit" />
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="space-y-2 md:mr-2">
              {orgs
                ?.sort((item) => (item.isPersonal ? -1 : 1))
                .map((item) => (
                  <DropdownMenuCheckboxItem
                    key={item.id}
                    checked={item.id === organization.id}
                    onCheckedChange={(checked) =>
                      checked && updateOrganizationId(item.id)
                    }
                    className="md:pr-8"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          (item.isPersonal ? image : item.thumbnailUrl) ??
                          placeholderImg
                        }
                        alt="Organization name"
                        width={32}
                        height={32}
                        className="size-8 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <p>{item.isPersonal ? item.owner.name : item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.isPersonal ? "Personal" : "Organization"}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}
              <DropdownMenuSeparator />
              {orgsAdminOf && orgsAdminOf?.length > 0 && (
                <DropdownMenuLabel>Admin of Organizations</DropdownMenuLabel>
              )}
              {orgsAdminOf
                ?.sort((item) => (item.isPersonal ? -1 : 1))
                .map((item) => (
                  <DropdownMenuCheckboxItem
                    key={item.id}
                    checked={item.id === organization.id}
                    onCheckedChange={(checked) =>
                      checked && updateOrganizationId(item.id)
                    }
                    className="md:pr-8"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          (item.isPersonal ? image : item.thumbnailUrl) ??
                          placeholderImg
                        }
                        alt="Organization name"
                        width={32}
                        height={32}
                        className="size-8 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <p>{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.isPersonal ? "Personal" : "Organization"}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="justify-center gap-1.5"
                onSelect={onNewOrganization}
              >
                <PlusIcon className="size-4" /> New organization
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
        <DropdownMenuSeparator />
        <Link href={paths.user.landing("ID")}>
          <DropdownMenuItem>View Profile</DropdownMenuItem>
        </Link>
        <Link href={paths.settings.root}>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        <DropdownMenuItem asChild>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center"
          >
            Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

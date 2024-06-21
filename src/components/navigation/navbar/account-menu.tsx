"use client";

import { useEffect, useState } from "react";
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useConfigActions, useOrganizationId } from "@/hooks/use-config-store";
import { useModal } from "@/hooks/use-modal-store";
import {
  useOrganization,
  useOrganizationActions,
} from "@/hooks/use-organization-store";
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
  // const [organization, setOrganization] = useState<
  //   RouterOutputs["organization"]["list"][number] | null
  // >(null);
  const [organization, setOrganization] = useState<
    RouterOutputs["organization"]["list"][number] | null
  >(null);

  const router = useRouter();

  const { mutate: signOut } = useSignOut();

  const { data: orgs } = api.organization.list.useQuery();

  const { data: isPremiumUser } = api.billing.isPremiumUser.useQuery();

  const { onOpen } = useModal();

  // const organizationId = useOrganizationId();
  // const { updateOrganizationId } = useConfigActions();
  const { id: organizationId } = useOrganization();
  const { update: updateOrganizationId } = useOrganizationActions();

  const userId = useSession().data?.user.id;

  useEffect(() => {
    // TODO: Move organization fetch to store context privider
    if (!orgs) return;
    console.log(organizationId);
    const personal = orgs.find((item) => item.isPersonal === true);
    const current = orgs.find((item) => item.id === organizationId);
    if (current) {
      setOrganization(current);
    }

    if (!current && personal) {
      updateOrganizationId(personal.id, personal.name, personal.ownerId);
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
                        ? // ? organization.ownerId
                          organization.owner.name
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
                      checked &&
                      updateOrganizationId(item.id, item.name, item.ownerId)
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
                        {item.isPersonal ? (
                          <p className="text-xs text-muted-foreground">
                            Personal
                          </p>
                        ) : item.ownerId === userId ? (
                          <Badge className="size-fit bg-green-200 p-0.5 py-0 text-[10px] text-green-700 shadow-none transition-all hover:cursor-pointer hover:bg-green-200 dark:bg-green-700/50 dark:text-green-400 dark:hover:bg-green-700/50">
                            Owner
                          </Badge>
                        ) : (
                          <Badge className="size-fit bg-blue-200 p-0.5 py-0 text-[10px] text-blue-700 shadow-none transition-all hover:cursor-pointer hover:bg-blue-200 dark:bg-blue-700/50 dark:text-blue-400 dark:hover:bg-blue-700/50">
                            Admin
                          </Badge>
                        )}
                      </div>
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}

              {/* {orgsAdminOf
                ?.sort((item) => (item.isPersonal ? -1 : 1))
                .map((item) => (
                  <DropdownMenuCheckboxItem
                    key={item.id}
                    checked={item.id === organization.id}
                    onCheckedChange={(checked) =>
                      checked &&
                      updateOrganizationId(item.id, item.name, item.ownerId)
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
                        <Badge className="size-fit bg-blue-200 p-0.5 py-0 text-[10px] text-blue-700 shadow-none transition-all hover:cursor-pointer hover:bg-blue-200 dark:bg-blue-700/50 dark:text-blue-400 dark:hover:bg-blue-700/50">
                          Admin
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuCheckboxItem>
                ))} */}
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

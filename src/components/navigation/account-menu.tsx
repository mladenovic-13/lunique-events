"use client";

import { LogOutIcon, RotateCwIcon } from "lucide-react";
import Link from "next/link";

import { useSignOut } from "@/hooks/use-sign-out";
import { paths } from "@/routes/paths";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface AccountMenuProps {
  image?: string | null;
  name?: string | null;
  email?: string | null;
}

export const AccountMenu = ({ name, email, image }: AccountMenuProps) => {
  const { mutate, isLoading } = useSignOut();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="size-9">
          {image && <AvatarImage src={image} className="size-9" />}
          <AvatarFallback className="size-9">A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-5">
        <div className="p-2">
          {name && <p className="font-medium">{name}</p>}
          {email && <p className="text-sm text-zinc-500">{email}</p>}
        </div>
        <DropdownMenuSeparator />
        <Link href={paths.home.root}>
          <DropdownMenuItem>
            {/* <LayoutDashboardIcon className="mr-1.5 size-4" /> */}
            Events
          </DropdownMenuItem>
        </Link>
        <Link href={paths.user.landing("ID")}>
          <DropdownMenuItem>
            {/* <UserIcon className="mr-1.5 size-4" /> */}
            View Profile
          </DropdownMenuItem>
        </Link>
        <Link href={paths.settings.root}>
          <DropdownMenuItem>
            {/* <CreditCardIcon className="mr-1.5 size-4" /> */}
            Settings
            {/* <Badge className="ml-auto">Free</Badge> */}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            disabled={isLoading}
            onClick={() => mutate()}
            className="flex w-full items-center"
          >
            {!isLoading && <LogOutIcon className="mr-1.5 size-4" />}
            {isLoading && (
              <RotateCwIcon className="mr-1.5 size-4 animate-spin" />
            )}
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

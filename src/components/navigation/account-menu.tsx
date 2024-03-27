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
        <Avatar>
          {image && <AvatarImage src={image} />}
          <AvatarFallback>A</AvatarFallback>
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
          <DropdownMenuItem>View Profile</DropdownMenuItem>
        </Link>
        <Link href={paths.settings.root}>
          <DropdownMenuItem>Settings</DropdownMenuItem>
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

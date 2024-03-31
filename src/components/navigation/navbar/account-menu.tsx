"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "@/hooks/use-sign-out";
import { paths } from "@/routes/paths";

interface AccountMenuProps {
  image?: string | null;
  name?: string | null;
  email?: string | null;
}

export const AccountMenu = ({ name, image }: AccountMenuProps) => {
  const { mutate, isLoading } = useSignOut();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          {image && <AvatarImage src={image} />}
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-5 w-48">
        <Link href={paths.home.root}>
          <DropdownMenuItem className="flex-col items-start">
            {name && <p className=" font-medium">{name}</p>}
            <p className="text-sm text-muted-foreground">Personal</p>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href={paths.user.landing("ID")}>
          <DropdownMenuItem>View Profile</DropdownMenuItem>
        </Link>
        <Link href={paths.settings.root}>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        <DropdownMenuItem asChild>
          <button
            disabled={isLoading}
            onClick={() => mutate()}
            className="flex w-full items-center"
          >
            Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

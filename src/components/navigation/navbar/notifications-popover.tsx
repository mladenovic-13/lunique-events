import { BellIcon } from "lucide-react";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import placeholderImage from "@/public/images/you-are-invited.jpeg";

export const NotificationsPopover = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "text-muted-foreground  duration-200",
        })}
      >
        <BellIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="space-y-1.5">
        <DropdownMenuItem>
          <p className="max-w-[240px]">
            <span className="font-semibold">Nikola Mladenovic</span> registered
            for <span className="font-semibold">Some Random Event Name</span>
          </p>

          <Image
            src={placeholderImage}
            alt=""
            width={50}
            height={50}
            className="size-14 rounded-md object-cover"
          />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p className="max-w-[240px]">
            <span className="font-semibold">Luka Stojadinovic</span> invited you
            to <span className="font-semibold">Some Random Event Name</span>
          </p>

          <Image
            src={placeholderImage}
            alt=""
            width={50}
            height={50}
            className="size-14 rounded-md object-cover"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

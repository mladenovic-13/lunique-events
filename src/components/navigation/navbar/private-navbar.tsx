import { Building2Icon, CompassIcon, TicketIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type Session } from "next-auth";

import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import logoImg from "@/public/logo.png";
import { paths } from "@/routes/paths";

import { AccountMenu } from "./account-menu";
import { MobileMenuDrawer } from "./mobile-menu-drawer";
import { NotificationsDropdown } from "./notifications-popover";
import { SearchCommand } from "./search-command";

const links = [
  {
    label: "Events",
    href: paths.home.root,
    Icon: TicketIcon,
  },
  {
    label: "Organizations",
    href: paths.home.organizations,
    Icon: Building2Icon,
  },
  {
    label: "Explore",
    href: paths.explore,
    Icon: CompassIcon,
  },
];

export const PrivateNavbar = ({ session }: { session: Session }) => {
  return (
    <nav className="flex h-12 items-center justify-between md:px-5">
      <div className="px-3 md:w-[calc((100%-56rem)/2)]  md:px-0">
        <Link href={paths.home.root}>
          <Image
            src={logoImg}
            alt="Lunique Events Logo"
            width={30}
            height={30}
            className="size-6 md:size-8"
          />
        </Link>
      </div>
      <div className="hidden md:flex md:flex-1 md:items-center md:justify-start md:gap-1.5">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "text-muted-foreground transition duration-200",
            })}
          >
            <link.Icon className="size-4 md:mr-1.5" />
            <span className="hidden md:block">{link.label}</span>
          </Link>
        ))}
      </div>
      <div className="hidden md:flex md:items-center md:gap-5">
        <div className="flex md:items-center md:gap-1.5">
          <SearchCommand />
          <NotificationsDropdown />
          <ThemeToggle />
        </div>

        <AccountMenu
          name={session?.user.name}
          email={session?.user.email}
          image={session?.user.image}
        />
      </div>

      <div className="flex items-center gap-2.5 pr-3 md:hidden">
        <SearchCommand />
        <NotificationsDropdown />
        <ThemeToggle />
        <MobileMenuDrawer
          name={session?.user.name}
          email={session?.user.email}
          image={session?.user.image}
        />
      </div>
    </nav>
  );
};

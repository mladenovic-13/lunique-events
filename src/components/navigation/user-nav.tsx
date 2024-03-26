import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { paths } from "@/routes/paths";

import { ThemedLogoIcon } from "../icons/themed-logo-icon";
import { buttonVariants } from "../ui/button";

export const UserNav = () => {
  return (
    <nav className="container mx-auto flex h-12 items-center justify-between">
      <Link href={paths.home.root}>
        <ThemedLogoIcon />
      </Link>
      <div className="flex items-center gap-1.5">
        <Link
          href={paths.home.root}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          Explore Events <ArrowUpRightIcon className="ml-1.5 size-3.5" />
        </Link>
        <Link
          href={paths.signin.root}
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

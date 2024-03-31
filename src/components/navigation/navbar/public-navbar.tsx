import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import logoImg from "@/public/logo.png";
import { paths } from "@/routes/paths";

export const PublicNavbar = () => {
  return (
    <nav className="flex h-12 items-center justify-between px-3 md:px-5">
      <Link href={paths.home.root}>
        <Image
          src={logoImg}
          alt="Lunique Events Logo"
          width={30}
          height={30}
          className="size-5 md:size-8"
        />
      </Link>
      <div className="flex items-center gap-1.5">
        <Link
          href={paths.explore}
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

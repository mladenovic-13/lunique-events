"use client";

import { useSession } from "next-auth/react";

import { PrivateNavbar } from "./private-navbar";
import { PublicNavbar } from "./public-navbar";

export const Navbar = () => {
  const { data: session } = useSession();

  const isUserLoggedIn = !!session?.user.id;

  if (isUserLoggedIn) return <PrivateNavbar session={session} />;
  if (!isUserLoggedIn) return <PublicNavbar />;

  // if(status === "loading")
  // TODO: Navbar loading skeleton
};

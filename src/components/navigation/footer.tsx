import {
  ArrowUpRightIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

import { paths } from "@/routes/paths";

import { buttonVariants } from "../ui/button";

const links = [
  { label: "Explore", href: "/explore" },
  { label: "Pricing", href: "/pricing" },
  { label: "Help", href: "/help" },
];

const socials = [
  {
    label: "Twitter",
    Icon: TwitterIcon,
    href: "https://www.x.com",
  },
  {
    label: "Facebook",
    Icon: FacebookIcon,
    href: "https://www.facebook.com",
  },
  {
    label: "Instagram",
    Icon: InstagramIcon,
    href: "https://www.instagram.com",
  },
];

export const Footer = () => {
  return (
    <footer className="mx-3 mt-10 max-w-4xl space-y-3 border-t pb-10 pt-3 md:mx-auto md:space-y-5 md:pt-5">
      <div className="flex items-center justify-between">
        <ul className="flex items-center gap-3">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-1.5 text-sm font-medium text-muted-foreground transition duration-200 hover:text-accent-foreground"
            >
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>
        <ul className="flex items-center gap-3">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "text-muted-foreground",
              })}
            >
              <social.Icon className="size-5" />
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center">
        <Link
          href={paths.event.create}
          className={buttonVariants({
            variant: "link",
            className: "font-semibold text-primary",
          })}
        >
          Host your event with Lunique Events
          <ArrowUpRightIcon className="ml-1.5 size-4" />
        </Link>
      </div>
    </footer>
  );
};

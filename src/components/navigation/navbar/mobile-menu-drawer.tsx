"use client";

import { useEffect, useState } from "react";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@radix-ui/react-radio-group";
import {
  ArrowUpRightIcon,
  Building2Icon,
  CheckIcon,
  CompassIcon,
  FacebookIcon,
  InstagramIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  SettingsIcon,
  TicketIcon,
  TwitterIcon,
  User2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { useConfigActions, useOrganizationId } from "@/hooks/use-config-store";
import { useSignOut } from "@/hooks/use-sign-out";
import { awsImageLoader } from "@/lib/image-loader";
import placeholderImg from "@/public/images/placeholder.jpg";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";

const mainLinks = [
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

const footerLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Pricing", href: "/pricing" },
  { label: "Help", href: "/help" },
];

const socialLinks = [
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

interface MobileMenuDrawerProps {
  image?: string | null;
  name?: string | null;
  email?: string | null;
}

export const MobileMenuDrawer = ({ image }: MobileMenuDrawerProps) => {
  const [organization, setOrganization] = useState<
    RouterOutputs["organization"]["list"][number] | null
  >(null);

  const { mutate: signOut, isLoading: isSigningOut } = useSignOut();
  const { data: orgs } = api.organization.list.useQuery();
  const { updateOrganizationId } = useConfigActions();
  const organizationId = useOrganizationId();

  useEffect(() => {
    if (!orgs) return;

    const personal = orgs.find((item) => item.isPersonal);
    const current = orgs.find((item) => item.id === organizationId);

    if (current) {
      setOrganization(current);
    }

    if (!current) {
      updateOrganizationId(personal?.id);
    }
  }, [organizationId, orgs, updateOrganizationId]);

  const avatarUrl = organization?.isPersonal
    ? image
    : organization?.thumbnailUrl;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <MenuIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-evenly">
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "text-muted-foreground transition duration-200",
                })}
              >
                <link.Icon className="mr-1.5 size-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </DrawerHeader>

        <div className="space-y-3 px-5">
          {organization && (
            <div className="flex items-center justify-between rounded-md border px-3 py-2">
              <div className="flex items-center gap-3">
                <Image
                  loader={
                    avatarUrl?.includes("cloudfront")
                      ? awsImageLoader
                      : undefined
                  }
                  src={
                    (organization.isPersonal
                      ? image
                      : organization.thumbnailUrl) ?? placeholderImg
                  }
                  alt="Organization name"
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover"
                />
                <div className="flex flex-col items-start">
                  <span className="leading-5">
                    {organization.isPersonal
                      ? organization.owner.name
                      : organization.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {organization.isPersonal ? "Personal" : "Organization"}
                  </span>
                </div>
              </div>
              <Button
                disabled={isSigningOut}
                variant="secondary"
                size="icon"
                onClick={() => signOut()}
              >
                <LogOutIcon className="size-4" />
              </Button>
            </div>
          )}
          <div className="flex gap-1.5">
            <Link
              href={paths.settings.account}
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
                className: "w-full",
              })}
            >
              <SettingsIcon className="mr-1.5 size-4" />
              Settings
            </Link>
            <Link
              href={paths.settings.account}
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
                className: "w-full",
              })}
            >
              <User2Icon className="mr-1.5 size-4" />
              View Profile
            </Link>
            <Link
              href={paths.event.create}
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
                className: "w-full",
              })}
            >
              <PlusIcon className="mr-1.5 size-4" />
              Create Event
            </Link>
          </div>
          <div className="min-h-60 space-y-2 px-2 pb-5">
            <Label className="text-muted-foreground">Your organizations</Label>
            <RadioGroup
              value={organizationId}
              onValueChange={updateOrganizationId}
              className="max-h-80 space-y-1.5 overflow-y-auto px-1.5"
            >
              {orgs
                ?.sort((item) => (item.isPersonal ? -1 : 1))
                .map((item) => {
                  const url =
                    (item.isPersonal ? image : item.thumbnailUrl) ??
                    placeholderImg.src;

                  return (
                    <RadioGroupItem
                      key={item.id}
                      value={item.id}
                      className="flex w-full items-center justify-between"
                    >
                      <span className="flex items-center gap-3">
                        <Image
                          loader={
                            url.includes("cloudfront")
                              ? awsImageLoader
                              : undefined
                          }
                          src={
                            (item.isPersonal ? image : item.thumbnailUrl) ??
                            placeholderImg
                          }
                          alt="Organization name"
                          width={32}
                          height={32}
                          className="size-8 rounded-full object-cover"
                        />
                        <span className="flex flex-col items-start">
                          <span>
                            {item.isPersonal ? item.owner.name : item.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.isPersonal ? "Personal" : "Organization"}
                          </span>
                        </span>
                      </span>
                      <span className="w-5">
                        <RadioGroupIndicator>
                          <CheckIcon className="size-5" />
                        </RadioGroupIndicator>
                      </span>
                    </RadioGroupItem>
                  );
                })}
            </RadioGroup>
          </div>
        </div>
        <DrawerFooter className="border-t">
          <div className="flex flex-row items-center justify-between ">
            <ul className="flex w-fit justify-evenly gap-1.5">
              {footerLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  <li className="px-3 py-2 text-sm text-muted-foreground">
                    {link.label}
                  </li>
                </Link>
              ))}
            </ul>
            <ul className="flex w-fit justify-evenly gap-1.5">
              {socialLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  <li className="flex size-8 items-center justify-center text-sm text-muted-foreground">
                    <link.Icon className="size-4" />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <Link
              href={paths.event.create}
              className={buttonVariants({
                variant: "link",
                className: "text-sm font-semibold text-primary",
              })}
            >
              Host your event with Lunique Events
              <ArrowUpRightIcon className="ml-1.5 size-4" />
            </Link>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// export const OrganizationSelect = () => {
// };

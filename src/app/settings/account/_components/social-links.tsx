import React from "react";
import {
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  LinkIcon,
  TwitterIcon,
  UserCheck2Icon,
  YoutubeIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const links = [
  {
    link: "instagram.com/",
    placeholder: "username",
    icon: <InstagramIcon size={20} className="text-accent-foreground/60" />,
  },
  {
    link: "twitter.com/",
    placeholder: "username",
    icon: <TwitterIcon size={20} className="text-accent-foreground/60" />,
  },
  {
    link: "youtube.com/@",
    placeholder: "username",
    icon: <YoutubeIcon size={20} className="text-accent-foreground/60" />,
  },
  {
    link: "tiktok.com/@",
    placeholder: "username",
    icon: <LinkIcon size={20} className="text-accent-foreground/60" />,
  },
  {
    link: "linkedin.com",
    placeholder: "in/handle",
    icon: <LinkedinIcon size={20} className="text-accent-foreground/60" />,
  },
  {
    placeholder: "Your website",
    icon: <GlobeIcon size={20} className="text-accent-foreground/60" />,
  },
];

export const SocialLinks = () => {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Label>Social Links</Label>
        <div className="grid grid-cols-2 gap-4">
          {links.map((link, idx) => (
            <div className="flex items-center space-x-4" key={idx}>
              {link.icon}
              <div className="flex overflow-hidden rounded-lg border border-accent-foreground/20 p-0 text-base">
                {link.link && (
                  <div className="w-fit bg-accent p-2 px-4">
                    <p>{link.link}</p>
                  </div>
                )}
                <div
                  className={cn(
                    "flex items-center rounded-r-lg transition-all hover:border hover:border-accent-foreground",
                    !link.link && "rounded-lg",
                  )}
                >
                  <Input
                    placeholder={link.placeholder}
                    className="border-none text-base font-medium focus-visible:ring-0 "
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button className="space-x-2">
        <UserCheck2Icon />
        <p>Save Changes</p>
      </Button>
    </section>
  );
};

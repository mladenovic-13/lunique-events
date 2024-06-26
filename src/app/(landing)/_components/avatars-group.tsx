import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const users = [
  {
    name: "Nikolas",
    image: "/images/invited/invited-2.webp",
  },
  {
    name: "Lukas",
    image: "/images/avatar.png",
  },
  {
    name: "Nikolas",
    image: "/images/invited/invited-7.webp",
  },
];
interface AvatarsGroupProps {
  className?: string;
}
const AvatarsGroup = ({ className }: AvatarsGroupProps) => {
  return (
    <div className={cn("", className && className)}>
      <section className="flex size-full items-center justify-center -space-x-4">
        {users.map((user, idx) => (
          <Avatar key={idx} className="size-[10%] hover:ring-2 md:size-[5%]">
            {user && (
              <AvatarImage
                src={user.image}
                className="rounded-full bg-background p-0.5"
              />
            )}
            <AvatarFallback>X</AvatarFallback>
          </Avatar>
        ))}
      </section>
    </div>
  );
};

export default AvatarsGroup;

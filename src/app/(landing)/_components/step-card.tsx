import React, { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  image?: string;
  className?: string;
  href?: string;
}
const StepCard = ({
  title,
  image,
  className,
  href,
  description,
}: StepCardProps) => {
  const [hoverCard, setHoverCard] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div
      className={cn(
        "z-10 flex flex-col items-start  justify-start gap-4 overflow-hidden rounded-lg border border-secondary-foreground/20 bg-gradient-to-b from-muted/60 to-background transition-all  md:w-[300px]  md:hover:border-accent-foreground/40",
        className,
        hoverCard && "cursor-pointer",
      )}
      onMouseEnter={() => setHoverCard(true)}
      onMouseLeave={() => setHoverCard(false)}
      onTouchStart={() => setHoverCard(true)}
      onTouchEnd={() => setHoverCard(false)}
      onClick={() => {
        href && router.push(href);
      }}
    >
      <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
        {image && (
          <Image
            className="absolute inset-0 mx-auto w-full"
            src={image}
            width={1000}
            height={1000}
            alt={title}
          />
        )}
      </div>
      <div className="flex flex-col items-start justify-start gap-1 p-4 pt-0">
        <h1 className="font-semibold">{title}</h1>
        <p className="line-clamp-2 text-sm text-accent-foreground/60">
          {description}
          {description}
        </p>
        <Button
          variant={"link"}
          className={cn(
            "mt-1 flex gap-2 p-0 transition-all",
            hoverCard && "translate-x-2 ",
          )}
        >
          Learn more
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default StepCard;

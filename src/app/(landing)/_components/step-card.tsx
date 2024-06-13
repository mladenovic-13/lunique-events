import React, { useEffect, useState } from "react";
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
  const router = useRouter();

  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, [setIsServer]);

  return (
    <div
      className={cn(
        "group z-10 flex flex-col items-start justify-start  gap-4 overflow-hidden rounded-lg border border-secondary-foreground/20 bg-gradient-to-b from-muted/60 to-background transition-all hover:cursor-pointer  md:w-[300px]  md:hover:border-accent-foreground/40",
        className,
      )}
      onClick={() => {
        href && router.push(href);
      }}
    >
      <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
        {image && !isServer && (
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
        </p>
        <Button
          variant={"link"}
          className={cn(
            "mt-1 flex gap-2 p-0 transition-all group-hover:translate-x-2 ",
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

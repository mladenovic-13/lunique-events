import React, { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  image?: string;
  className?: string;
  href?: string;
}
const StepCard = ({
  step,
  title,
  description,
  image,
  className,
  href,
}: StepCardProps) => {
  const [hoverCard, setHoverCard] = useState<boolean>(false);
  const router = useRouter();
  return (
    // <div
    //   className={cn(
    //     "flex size-full flex-row items-start justify-center rounded-2xl bg-muted p-8 py-8 md:py-12 ",
    //     className && className,
    //     className &&
    //       className.includes("flex-col") &&
    //       !className.includes("flex-row") &&
    //       "gap-12",
    //   )}
    // >
    //   <div
    //     className={cn(
    //       "flex w-full flex-col gap-6 md:w-1/2 md:gap-2 ",
    //       className &&
    //         className.includes("flex-col") &&
    //         !className.includes("flex-row") &&
    //         "w-full md:w-full",
    //     )}
    //   >
    //     <div className="flex w-fit items-center justify-center rounded-full border-[1.1px] border-primary px-4 py-1 text-primary">
    //       <p>Step {step}</p>
    //     </div>
    //     <h1 className="text-2xl font-semibold md:pt-6 md:text-4xl">{title}</h1>
    //     <p className="text-accent-foreground/60">{description}</p>
    //   </div>
    //   {/* mobile view */}
    //   {image && (
    //     <div
    //       className={cn(
    //         "flex w-1/2 items-center justify-center md:hidden",
    //         className &&
    //           className.includes("flex-col") &&
    //           !className.includes(" flex-row ") &&
    //           "w-full",
    //       )}
    //     >
    //       <Image
    //         src={image}
    //         alt={image}
    //         width={800}
    //         height={800}
    //         className={cn(
    //           "w-full rounded-lg object-cover drop-shadow-lg transition-all",
    //         )}
    //       />
    //     </div>
    //   )}
    //   {/* desktop view */}
    //   {image && (
    //     <div
    //       className={cn(
    //         "hidden w-1/2 items-center justify-center md:flex",
    //         className &&
    //           className.includes("flex-col") &&
    //           !className.includes("flex-row") &&
    //           "w-full",
    //       )}
    //     >
    //       <Image
    //         src={image}
    //         alt={image}
    //         width={800}
    //         height={800}
    //         className={cn(
    //           "w-full rounded-lg object-cover drop-shadow-lg transition-all",
    //         )}
    //       />
    //     </div>
    //   )}
    // </div>
    <div
      className={cn(
        "relative z-10 flex min-h-[310px] flex-col items-start justify-start gap-4 overflow-hidden rounded-lg border border-secondary-foreground/20 bg-muted/90 p-4 hover:bg-muted md:min-h-[240px] md:min-w-[370px] md:p-6",
        className,
        hoverCard && "cursor-pointer",
      )}
      onMouseEnter={() => setHoverCard(true)}
      onMouseLeave={() => setHoverCard(false)}
      onClick={() => {
        href && router.push(href);
      }}
    >
      <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
      <div className={cn("flex items-center justify-center gap-2 md:h-8")}>
        <Badge className="h-full rounded-full bg-primary">My Account</Badge>
        <ArrowRightIcon
          className={cn(
            "h-full w-fit  rounded-full border border-primary p-1 text-primary transition-all dark:border-accent-foreground dark:text-accent-foreground",
            hoverCard &&
              "scale-95 rounded-full bg-primary text-background dark:border-primary dark:text-accent-foreground md:translate-x-1",
          )}
        />
      </div>
      {image && (
        <Image
          src={image}
          width={300}
          height={300}
          alt={title}
          className={cn(
            "absolute -right-2/3 -top-2 w-4/5 rounded-lg shadow-2xl  shadow-primary/40 transition-all",
            hoverCard && "-right-1/2 shadow-black",
          )}
        />
      )}
    </div>
  );
};

export default StepCard;

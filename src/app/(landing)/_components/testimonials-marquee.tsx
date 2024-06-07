import Marquee from "@/components/magicui/marquee";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/lib/mock-events";
import { cn } from "@/lib/utils";

import AvatarsGroup from "./avatars-group";

const reviews = testimonials;

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  name,
  email,
  impression,
  image,
}: {
  name: string;
  email: string;
  impression: string;
  image: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={image}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{email}</p>
        </div>
      </div>
      <blockquote className="mt-2 line-clamp-4 text-sm">
        {impression}
      </blockquote>
    </figure>
  );
};

export const Testimonials = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pt-20">
      <div className="flex size-full flex-col items-center justify-center gap-2">
        <AvatarsGroup className="flex" />
        <Badge
          variant={"secondary"}
          className="rounded-full border-[1.1px] border-accent-foreground/10"
        >
          Testimonials
        </Badge>
      </div>
      <h1 className="text-center text-4xl font-semibold md:text-6xl">
        Thousands of users have already <br /> tried{" "}
        <strong className="bg-gradient-to-br from-primary to-rose-900 bg-clip-text font-semibold text-transparent">
          {" "}
          our application
        </strong>
      </h1>
      <div className="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background py-20 md:shadow-xl">
        <Marquee pauseOnHover className="[--duration:90s]">
          {firstRow.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:90s]">
          {secondRow.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </div>
  );
};

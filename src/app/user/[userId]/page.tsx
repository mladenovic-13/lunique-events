import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CalendarIcon } from "@/components/icons/calendar-icon";
import { MainPage } from "@/components/layout/main-page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { upcomingAndPastEvents } from "@/lib/mock-events";
import eventImg from "@/public/images/you-are-invited.jpeg";
import { paths } from "@/routes/paths";

export default function Home(
  {
    // params: { userId },
  }: {
    params: {
      userId: string;
    };
  },
) {
  return (
    <MainPage>
      <header className="flex h-64 w-full flex-col items-center justify-center gap-5">
        <Avatar className="size-28 hover:ring-0 md:size-36">
          <AvatarFallback className="text-3xl md:text-4xl">NM</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-semibold md:text-3xl">
          Nikola Mladenovic
        </h1>
      </header>
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold md:text-2xl">Events</h2>
          <Link
            href={paths.event.create}
            className={buttonVariants({
              variant: "ghost",
              className: "text-primary hover:text-primary",
            })}
          >
            <PlusCircleIcon className="mr-1.5 size-4 " />
            Create
          </Link>
        </div>
        <div className="space-y-5">
          <h3 className="text-lg font-semibold md:text-xl">Upcoming</h3>
          {upcomingAndPastEvents.past.map((event) => (
            <div
              key={event.id}
              className="flex w-full cursor-pointer select-none items-center gap-8 opacity-60 transition duration-200 hover:opacity-100"
            >
              <div className="hidden md:block">
                <CalendarIcon date={event.date} size="lg" />
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src={eventImg}
                  alt=""
                  width={100}
                  height={100}
                  className="size-24 rounded-md object-cover"
                />
                <div>
                  <p className="text-lg font-medium">Some Event Name</p>
                  <p className="text-sm text-muted-foreground">
                    Tue, 26 Mar, 14:00 - 15:00 CET
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          <h3 className="text-xl font-semibold">Past</h3>
          {upcomingAndPastEvents.past.map((event) => (
            <div
              key={event.id}
              className="flex w-full cursor-pointer select-none items-center gap-8 opacity-60 transition duration-200 hover:opacity-100"
            >
              <div className="hidden md:block">
                <CalendarIcon date={event.date} size="lg" />
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src={eventImg}
                  alt=""
                  width={100}
                  height={100}
                  className="size-24 rounded-md object-cover"
                />
                <div>
                  <p className="text-lg font-medium">Some Event Name</p>
                  <p className="text-sm text-muted-foreground">
                    Tue, 26 Mar, 14:00 - 15:00 CET
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainPage>
  );
}

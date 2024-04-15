"use client";

import { useCallback, useState } from "react";
import { type Event } from "@prisma/client";
import {
  ArrowUpRightIcon,
  ChevronsRightIcon,
  CopyIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

// TODO: move to @/components or refactor
// @Lukiano99
import { EventPageContent } from "@/app/event/(landing)/[eventId]/(event)/_components/event-page-content";
import { EventTimeframeTabs } from "@/app/home/(events)/_components/event-date-tabs";
import { Timeline } from "@/components/layout/timeline";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

import { CalendarSubscriptionButton } from "./_components/callendar-subscription-button";
import { Clock } from "./_components/clock";
import { CoverImage } from "./_components/cover-image";
import { EventCard } from "./_components/event-card";
import { EventListItem } from "./_components/event-list-item";
import { OrganizationHeader } from "./_components/organization-header";
import { OrganizationSkeleton } from "./_components/organization-skeleton";
import { ScrollSectionButtons } from "./_components/scroll-section-buttons";
import { ViewTabs } from "./_components/view-tabs";

export default function CalendarPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeframe = searchParams.get("timeframe") ?? "upcoming";
  const view = searchParams.get("view") ?? "card";

  const { organizationId } = useParams<{ organizationId: string }>();
  const { data: organization, isLoading } = api.organization.get.useQuery({
    id: organizationId,
    timeframe: timeframe,
  });

  const selectedCalendarDays: Date[] = [];
  if (organization) {
    organization.events.forEach((event) =>
      selectedCalendarDays.push(event.startDate),
    );
  }

  const selectedDaysStyle = {
    border: "1px solid currentColor",
    borderRadius: "20px",
    fontWeight: "bolder",
  };

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const handleSheetOpen = (event: Event) => {
    setIsSheetOpen(true);
    setCurrentEvent(event);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setCurrentEvent(null);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const query = new URLSearchParams(searchParams.toString());
      query.set(name, value);

      return query.toString();
    },
    [searchParams],
  );

  const onViewChange = (value: string) => {
    router.push(pathname + "?" + createQueryString("view", value), {
      scroll: false,
    });
  };
  const onTimeframeChange = (value: string) => {
    router.push(pathname + "?" + createQueryString("timeframe", value), {
      scroll: false,
    });
  };

  if (isLoading) return <OrganizationSkeleton />;

  return (
    <section>
      {organization && <CoverImage src={organization?.coverUrl} />}
      <div className="mx-auto min-h-96  space-y-5 p-3 md:space-y-8 md:px-0">
        <div className="mx-auto max-w-4xl">
          {organization && (
            <OrganizationHeader
              imageSrc={organization?.thumbnailUrl}
              organizationName={organization?.name}
              organizationId={organization.id}
            />
          )}
        </div>
        <Separator className="hidden w-full md:block" />
        <ScrollSectionButtons className="md:hidden" />
        <div className="mx-auto max-w-4xl">
          <div className="flex md:justify-between md:space-x-4">
            <div className="flex flex-1 flex-col space-y-4">
              <section className="flex justify-between pb-6">
                <div>
                  <h1 className="text-2xl font-semibold">Events</h1>
                </div>
                <div className="flex  space-x-2">
                  <Link href={paths.event.create}>
                    <Button
                      variant={"secondary"}
                      className="h-8 space-x-2 pl-2"
                    >
                      <PlusIcon size={14} />
                      <p className="text-sm font-normal">Add Event</p>
                    </Button>
                  </Link>
                  <div className="">
                    <ViewTabs value={view} onValueChange={onViewChange} />
                  </div>
                </div>
              </section>
              {organization &&
                organization.events.map(
                  (event, idx) =>
                    view === "card" && (
                      <Timeline
                        mode={"compact"}
                        idx={idx}
                        dataLength={organization.events.length}
                        key={idx}
                        date={event.startDate}
                      >
                        <EventCard
                          event={event}
                          location={event.location}
                          guests={4}
                          onClick={() => handleSheetOpen(event)}
                        />
                      </Timeline>
                    ),
                )}
              <div className="flex flex-col gap-12">
                {organization &&
                  organization.events.map(
                    (event, idx) =>
                      view === "list" && (
                        <EventListItem
                          key={idx}
                          date={event.startDate}
                          event={event}
                          creator={event.creator.name}
                          onClick={() => handleSheetOpen(event)}
                        />
                      ),
                  )}
              </div>
              <Sheet open={isSheetOpen} onOpenChange={handleSheetClose}>
                <SheetContent
                  side="right"
                  close={false}
                  className="overflow-hidden p-0 outline-none"
                >
                  <div className="sticky -top-0.5 z-50 -mt-0.5 flex items-center justify-between rounded-t-md border-y bg-background px-1.5 py-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <ChevronsRightIcon />
                    </Button>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => alert("TODO: Copy link to clipboard")}
                      >
                        <CopyIcon className="mr-1.5 size-4" />
                        Copy Link
                      </Button>
                      <Link
                        href={paths.event.landing.root(currentEvent?.id ?? "")}
                        className={buttonVariants({
                          variant: "secondary",
                          size: "sm",
                        })}
                      >
                        Open Event Page
                        <ArrowUpRightIcon className="ml-1.5 size-4" />
                      </Link>
                    </div>
                  </div>
                  <ScrollArea className="h-full">
                    <EventPageContent isMobile />
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden flex-col space-y-4 md:flex">
              <div className="flex justify-between space-x-2">
                <Clock />
                <CalendarSubscriptionButton />
              </div>
              <div className="flex flex-col space-y-2 rounded-lg border p-1 pb-2">
                <Calendar
                  mode="single"
                  initialFocus
                  modifiers={{ selectedDays: selectedCalendarDays }}
                  modifiersStyles={{ selectedDays: selectedDaysStyle }}
                />
                <EventTimeframeTabs
                  value={timeframe}
                  onValueChange={onTimeframeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Events } from "@/app/home/(events)/_components/events";
import { MainPage } from "@/components/layout/main-page";

import { CoverImage } from "./_components/cover-image";
import { EventsButtons } from "./_components/events-buttons";
import { OrganizationHeader } from "./_components/organization-header";
import { ScrollSectionButtons } from "./_components/scroll-section-buttons";

export default function CalendarPage() {
  return (
    <section>
      <CoverImage />
      <MainPage>
        <OrganizationHeader />
        <ScrollSectionButtons />
        <EventsButtons />
        <Events />
      </MainPage>
    </section>
  );
}

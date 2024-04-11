import { MainPage } from "@/components/layout/main-page";

import { EventFeedback } from "./_components/event-feedback";
import { SalesHistory } from "./_components/sales-history";
import { Statistics } from "./_components/statistics";

export default function CalendarInsightsPage() {
  return (
    <MainPage>
      <Statistics />
      <SalesHistory />
      <EventFeedback />
    </MainPage>
  );
}

import { MainPage } from "@/components/layout/main-page";

import { CreateCalendarForm } from "./_components/create-calendar-form";

export default function CreateCalendarPage() {
  return (
    <MainPage>
      <h1 className="text-2xl font-semibold md:text-3xl">Create Calendar</h1>
      <CreateCalendarForm />
    </MainPage>
  );
}

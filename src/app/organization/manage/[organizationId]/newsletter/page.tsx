import { MainPage } from "@/components/layout/main-page";

import { Drafts } from "./_components/drafts";
import { Published } from "./_components/published";

export default function CalendarNewsletterPage() {
  return (
    <MainPage>
      <div className="flex flex-col space-y-5">
        <Drafts />
        <Published />
      </div>
    </MainPage>
  );
}

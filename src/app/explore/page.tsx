import { MainPage } from "@/components/layout/main-page";

import { ExploreHeader } from "./_components/explore-header";
import { ListEvents } from "./_components/list-events";

export default function ExplorePage() {
  return (
    <MainPage>
      <ExploreHeader />
      <ListEvents />
    </MainPage>
  );
}

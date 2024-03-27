import { MainPage } from "@/components/layout/main-page";

export default function Home({
  params: { userId },
}: {
  params: {
    userId: string;
  };
}) {
  return <MainPage>TODO: User {userId} landig page</MainPage>;
}

import { MainPage } from "@/components/layout/main-page";

export default function Loading() {
  return (
    <MainPage>
      <div className="animate-pulse space-y-5 p-3 pb-10 md:flex md:gap-5 md:space-y-0">
        <div className="space-y-5 md:w-2/5">
          <div className="size-80 rounded-md bg-muted/60" />
        </div>
        <div className="space-y-5 md:w-3/5">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="h-7 w-64 rounded-md bg-muted/80" />
              <div className="h-6 w-44 rounded-md bg-muted/60" />
            </div>
            <div className="flex gap-5">
              <div className="h-10 w-full rounded-md bg-muted/60" />
              <div className="h-10 w-full rounded-md bg-muted/60" />
            </div>
            <div className="h-36 w-full rounded-md bg-muted/60" />
          </div>
        </div>
      </div>
    </MainPage>
  );
}

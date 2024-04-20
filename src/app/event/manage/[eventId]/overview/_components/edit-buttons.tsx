import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const EditButtons = () => {
  return (
    <div className="flex ">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="sm"
            className="flex-1 bg-muted-foreground/30 text-primary hover:bg-muted-foreground/40"
          >
            Edit Event
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Edit Event</SheetTitle>
          {/* <EditEventForm eventId={"test"} /> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};

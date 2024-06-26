import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface EventDateInputProps {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  className?: string;
}

export const EventDateInput = ({
  value,
  onChange,
  className,
}: EventDateInputProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal md:w-fit",
            !value && "text-muted-foreground",
            className && className,
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          className="mx-auto w-[240px]"
        />
      </PopoverContent>
    </Popover>
  );
};

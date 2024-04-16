"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { selectPrevendDefault } from "@/lib/select-ref";

interface EventDateSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const EventTimeframeSelect = ({
  value,
  onValueChange,
}: EventDateSelectProps) => {
  return (
    <Select value={value} onValueChange={(value) => onValueChange(value)}>
      <SelectTrigger className="h-8 w-full capitalize md:w-fit">
        {value}
      </SelectTrigger>
      <SelectContent ref={selectPrevendDefault}>
        <SelectItem value="upcoming">Upcoming</SelectItem>
        <SelectItem value="past">Past</SelectItem>
      </SelectContent>
    </Select>
  );
};

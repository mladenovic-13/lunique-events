"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { type Timeframe } from "./events";

interface EventDateSelectProps {
  value: Timeframe;
  onValueChange: (value: Timeframe) => void;
}

export const EventTimeframeSelect = ({
  value,
  onValueChange,
}: EventDateSelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={(value) => onValueChange(value as Timeframe)}
    >
      <SelectTrigger className="h-8 capitalize md:w-28">{value}</SelectTrigger>
      <SelectContent>
        <SelectItem value="upcoming">Upcoming</SelectItem>
        <SelectItem value="past">Past</SelectItem>
      </SelectContent>
    </Select>
  );
};

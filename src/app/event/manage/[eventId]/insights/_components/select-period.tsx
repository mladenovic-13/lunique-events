import { ClockIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectPrevendDefault } from "@/lib/select-ref";

export const SelectPeriod = () => {
  return (
    <Select>
      <SelectTrigger className="h-7 w-40 space-x-2 bg-muted/50 capitalize">
        <ClockIcon className="size-4 text-muted-foreground" />
        <SelectValue className="capitalize" placeholder="past week" />
      </SelectTrigger>
      <SelectContent ref={selectPrevendDefault}>
        <SelectGroup>
          <SelectItem className="capitalize" value="pastWeek">
            past week
          </SelectItem>
          <SelectItem className="capitalize" value="pastMonth">
            past month
          </SelectItem>
          <SelectItem className="capitalize" value="pastQuarter">
            past quarter
          </SelectItem>
          <SelectItem className="capitalize" value="pastYear">
            past year
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

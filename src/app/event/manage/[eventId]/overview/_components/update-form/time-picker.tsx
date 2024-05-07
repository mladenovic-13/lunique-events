import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { times } from "@/lib/times";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
}

export const TimePicker = ({ value, onChange, className }: TimePickerProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        icon={false}
        className={cn(
          "flex size-full w-full items-center  border border-none bg-transparent  p-0  px-4 text-left text-sm shadow-none hover:bg-muted focus:ring-0 data-[state=open]:bg-muted-foreground/30 md:text-base",
          className && className,
        )}
      >
        <div className="flex  text-xl">
          {/* <ClockIcon size={17} className="text-accent-foreground/70" /> */}
          <p>{value}</p>
        </div>
      </SelectTrigger>

      <SelectContent
        className="max-h-52 min-w-fit"
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
      >
        {times.map((time, idx) => (
          <SelectItem
            key={idx}
            icon={false}
            value={time}
            className="flex w-full justify-center"
          >
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

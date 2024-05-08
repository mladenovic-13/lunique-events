import { Calendar } from "@/components/ui/calendar";

interface EventDateInputProps {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}

export const EventDateInput = ({ value, onChange }: EventDateInputProps) => {
  return (
    <Calendar
      mode="single"
      selected={value}
      onSelect={onChange}
      className="mx-auto max-w-fit"
    />
  );
};

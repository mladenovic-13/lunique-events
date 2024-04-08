import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SlugInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SlugInput = ({ value, onChange }: SlugInputProps) => {
  return (
    <div>
      <Label>Public URL</Label>
      <div className="flex rounded-md border">
        <div className="flex items-center justify-center bg-muted px-3 text-sm">
          events.lunique.tech/
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-l-none border-none shadow-none"
        />
      </div>
    </div>
  );
};

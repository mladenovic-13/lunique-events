import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useState } from "react";

type EventVisibility = "public" | "private";

export function VisibilitySelect() {
  const [visibility, setVisibility] = useState<EventVisibility>("public");

  return (
    <div>
      <Select
        onValueChange={(val) => {
          setVisibility(val as EventVisibility);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Visibility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

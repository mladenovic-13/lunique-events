import React from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const LanguageSelect = () => {
  return (
    <section className="space-y-1.5">
      <Label>Language</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="srpski">Srpski</SelectItem>
            <SelectItem value="english">English</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  );
};

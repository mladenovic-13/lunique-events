import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const NameAndBio = () => {
  return (
    <div className="grid w-full max-w-sm items-center space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Luka Stojadinovic (Luka Stojadinovic)"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          placeholder="Share a little about your background and interests."
          className="resize-none"
        />
      </div>
    </div>
  );
};

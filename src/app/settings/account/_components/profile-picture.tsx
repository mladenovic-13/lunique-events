import React from "react";
import { UploadIcon, UserIcon } from "lucide-react";

export const ProfilePicture = () => {
  return (
    <div className=" flex flex-col space-y-2">
      <h1>Profile Picture</h1>
      <div className="relative">
        <UserIcon
          className="rounded-full border-4 border-accent-foreground"
          size={80}
        />
        <div className="absolute bottom-0 right-4 flex size-8 items-center justify-center rounded-full border-2 border-black bg-primary p-0 transition-all hover:cursor-pointer hover:bg-accent">
          <UploadIcon size={20} />
        </div>
      </div>
    </div>
  );
};

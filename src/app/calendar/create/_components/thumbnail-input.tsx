import { ArrowUpIcon, LoaderIcon } from "lucide-react";

export const ThumbnailInput = () => {
  return (
    <div className="group relative -mt-24 flex size-16 cursor-pointer items-center justify-center rounded-md border bg-white">
      <LoaderIcon className="size-10 text-primary" />
      <div className="absolute bottom-0 right-0 rounded-sm bg-primary p-0.5 transition duration-300 group-hover:scale-125">
        <ArrowUpIcon className="size-3.5 text-white" />
      </div>
    </div>
  );
};

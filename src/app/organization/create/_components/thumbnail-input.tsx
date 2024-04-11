"use client";

import { ArrowUpIcon, LoaderIcon, XIcon } from "lucide-react";
import Image from "next/image";

import { useImageUpload } from "@/hooks/use-image-upload";
import { getThumbnailImagePath } from "@/lib/get-path";

interface ThumbnailInputProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export const ThumbnailInput = ({ onChange }: ThumbnailInputProps) => {
  const { getRootProps, getInputProps, file, setFile } = useImageUpload({
    onSuccess: onChange,
    onError: () => onChange(null),
    pathFormatter: getThumbnailImagePath,
  });

  return file ? (
    <div className="relative -mt-24 w-fit">
      <Image
        src={URL.createObjectURL(file)}
        alt=""
        width={64}
        height={64}
        className="rounded-md"
      />
      <button
        type="button"
        onClick={() => {
          setFile(null);
          onChange(null);
        }}
        className="absolute -right-3 -top-3 cursor-pointer rounded-full bg-destructive p-1 text-destructive-foreground transition duration-200 hover:scale-125"
      >
        <XIcon className="size-3.5" />
      </button>
    </div>
  ) : (
    <div
      className="group relative -mt-24 flex size-16 cursor-pointer items-center justify-center rounded-md border bg-white"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <LoaderIcon className="size-10 text-primary" />
      <div className="absolute bottom-0 right-0 rounded-sm bg-primary p-0.5 transition duration-300 group-hover:scale-125">
        <ArrowUpIcon className="size-3.5 text-white" />
      </div>
    </div>
  );
};

"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/hooks/use-image-upload";
import { getCoverImagePath } from "@/lib/get-path";

interface CoverInputProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export const CoverInput = ({ onChange }: CoverInputProps) => {
  const { file, setFile, getRootProps, getInputProps } = useImageUpload({
    onSuccess: onChange,
    onError: () => onChange(null),
    pathFormatter: getCoverImagePath,
  });

  return file ? (
    <div className="relative h-36 cursor-pointer rounded-t-xl md:h-52">
      <Image
        src={URL.createObjectURL(file)}
        width={900}
        height={200}
        className="h-36 rounded-t-xl object-cover md:h-52"
        alt=""
      />
      <Button
        type="button"
        size="icon"
        variant="destructive"
        onClick={() => {
          onChange(null);
          setFile(null);
        }}
        className="absolute right-3 top-3 rounded-full"
      >
        <XIcon className="size-5" />
      </Button>
    </div>
  ) : (
    <div
      className="relative h-36 w-full cursor-pointer rounded-t-xl bg-muted hover:bg-muted/80 md:h-52"
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="absolute right-3 top-3 bg-card/80 hover:bg-card"
      >
        Change Cover
      </Button>
    </div>
  );
};

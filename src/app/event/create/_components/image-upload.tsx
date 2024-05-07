"use client";

import { useEffect, useMemo } from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ImagePlusIcon, XIcon } from "lucide-react";
import Image from "next/image";

import { useImageUpload } from "@/hooks/use-image-upload";
import { getThumbnailImagePath } from "@/lib/get-path";
import { getRandomNumber } from "@/lib/get-random-number";

interface ImageUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export const ImageUpload = ({ onChange }: ImageUploadProps) => {
  const defaultValue = useMemo(
    () => `/images/invited/invited-${getRandomNumber(15)}.png`,
    [],
  );

  useEffect(() => {
    onChange(defaultValue);
  }, [defaultValue, onChange]);

  const { getInputProps, getRootProps, file, setFile } = useImageUpload({
    pathFormatter: getThumbnailImagePath,
    onSuccess: (url) => onChange(url),
    onError: () => onChange(defaultValue),
  });

  return (
    <div className="relative">
      {!file && (
        <div {...getRootProps()} className="relative">
          <input {...getInputProps()} />

          <AspectRatio ratio={1 / 1}>
            <Image
              fill
              src={defaultValue}
              alt="you are invited"
              className="size-full rounded-md object-cover"
            />
          </AspectRatio>
          <button
            type="button"
            className="absolute bottom-1.5 right-1.5 flex size-10 items-center justify-center rounded-full bg-accent transition duration-200 hover:scale-110"
          >
            <ImagePlusIcon className="size-5 text-primary" />
          </button>
        </div>
      )}
      {file && (
        <div className="relative">
          <AspectRatio ratio={1 / 1}>
            <Image
              fill
              src={URL.createObjectURL(file)}
              alt="you are invited"
              className="size-full rounded-md object-cover"
            />
          </AspectRatio>
          <button
            type="button"
            className="absolute bottom-1.5 right-1.5 flex size-10 items-center justify-center rounded-full bg-destructive text-destructive-foreground transition duration-200 hover:scale-110"
            onClick={() => setFile(null)}
          >
            <XIcon className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
};

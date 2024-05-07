"use client";

import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import axios from "axios";
import { ImagePlusIcon, XIcon } from "lucide-react";
import Image from "next/image";

import { useToast } from "@/components/ui/use-toast";
import { getThumbnailImagePath } from "@/lib/get-path";
import { getRandomNumber } from "@/lib/get-random-number";
import { getImageUrl } from "@/lib/get-url";
import { api } from "@/trpc/react";

interface ImageUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const { mutate: fetchPresignedUrl } = api.s3.getPresignedUrl.useMutation();

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 10 * 1000 * 1000,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    onDropAccepted: (files) => {
      if (!files[0]) return;

      setFile(files[0]);

      const key = getThumbnailImagePath(files[0].name);
      fetchPresignedUrl(
        {
          key,
        },
        {
          onSuccess: (presignedUrl) => {
            axios
              .put(presignedUrl, files[0]!.slice(), {
                headers: { "Content-Type": files[0]!.type },
              })
              .then(() => {
                onChange(getImageUrl(key));
                console.log(getImageUrl(key));
              })
              .catch((err) => {
                console.log(err);
                toast({
                  variant: "destructive",
                  title: "Failed to upload image",
                  description: "Something went wrong. Please try again.",
                });
              });
          },
          onError: () => {
            onChange(null);
            setFile(null);
            toast({
              variant: "destructive",
              title: "Failed to upload image",
              description: "Something went wrong. Please try again.",
            });
          },
        },
      );
    },
  });

  const defaultValue = useMemo(
    () => `/images/invited/invited-${getRandomNumber(15)}.png`,
    [],
  );

  useEffect(() => {
    if (value) return;
    onChange(defaultValue);
  }, [defaultValue, value, onChange]);

  console.log({ defaultValue });

  const src = (file ? URL.createObjectURL(file) : defaultValue) ?? "";

  console.log({ src });
  return (
    <>
      {src && (
        <div className="relative">
          {!file && (
            <div {...getRootProps()} className="relative">
              <input {...getInputProps()} />

              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  src={src}
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
                  src={src}
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
      )}
    </>
  );
};

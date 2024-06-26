"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";
import { getImageUrl } from "@/lib/get-url";
import { api } from "@/trpc/react";

interface UseImageUploadProps {
  onSuccess?: (url: string) => void;
  onError?: (err: unknown) => void;
  pathFormatter: (filename: string) => string;
}

export const useImageUpload = ({
  onSuccess,
  onError,
  pathFormatter,
}: UseImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: fetchPresignedUrl } = api.s3.getPresignedUrl.useMutation();

  const { toast } = useToast();

  const dropzone = useDropzone({
    multiple: false,
    maxSize: 10 * 1000 * 1000,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    onDropAccepted: (files) => {
      if (!files[0]) return;

      setFile(files[0]);
      setIsUploading(true);

      const key = pathFormatter(files[0].name);

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
                setUrl(getImageUrl(key));
                onSuccess && onSuccess(getImageUrl(key));
              })
              .catch((err) => {
                console.log(err);
                toast({
                  variant: "destructive",
                  title: "Failed to upload image",
                  description: "Something went wrong. Please try again.",
                });
              })
              .finally(() => setIsUploading(false));
          },
          onError: (err) => {
            setUrl(null);
            setFile(null);
            setIsUploading(false);

            onError && onError(err);

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

  return {
    ...dropzone,
    url,
    file,
    setFile,
    isUploading,
  };
};

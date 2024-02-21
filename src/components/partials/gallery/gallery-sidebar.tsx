"use client";

import { AvatarIcon } from "@/components/icons/avatar-icon";
import { CalendarIcon } from "@/components/icons/calendar-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type EventWithOwner } from "@/types";
import { Share1Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  DownloadIcon,
  MapPinIcon,
  ShareIcon,
  SparklesIcon,
  TrashIcon,
  UploadCloudIcon,
} from "lucide-react";
import Image from "next/image";
import { type Key, useState } from "react";
import { useDropzone } from "react-dropzone";

interface GallerySidebarProps {
  event: EventWithOwner;
}

export const GallerySidebar = ({ event }: GallerySidebarProps) => (
  <div className="space-y-3">
    <DetailsWidget event={event} />
    <ImageUploadWidget />
    <ActionsWidget />
  </div>
);

const DetailsWidget = ({ event }: { event: EventWithOwner }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">{event.name}</CardTitle>
      {event.owner && (
        <CardDescription>Hosted by {event.owner.name}</CardDescription>
      )}
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="flex items-center gap-3">
        <CalendarIcon date={event.date} />
        <div className="flex flex-col text-xl font-medium">
          <span>{format(event.date, "eeee, d MMMM")}</span>
          <span className="text-sm text-muted-foreground">
            {event.date.getFullYear()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-md border">
          <MapPinIcon />
        </div>
        <div>
          <p className="text-xl font-medium">{event.location}</p>
          <span className="text-sm text-muted-foreground">
            {event.location}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ImageUploadWidget = () => {
  const [file, setFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    maxSize: 10 * 1000 * 1000,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    onDropAccepted: (files) => setFile(files[0] ?? null),
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upload Your Image</CardTitle>
        <CardDescription>
          We utilize facial recognition to find all your images
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        {!file && (
          <AnimateFade motionKey="upload" isVisible={!file}>
            <div
              className="flex h-[220px] w-full flex-col justify-evenly rounded-lg"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!isDragActive && !file && (
                <div className="flex cursor-pointer flex-col items-center gap-3">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-muted-foreground">
                    <AvatarIcon className="h-24 w-24 fill-muted-foreground" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-center text-sm text-muted-foreground">
                      Drag &apos;n&apos; drop some image, or click to select
                      image
                    </p>
                    <p className="text-center text-xs text-muted-foreground">
                      Only *.jpg and *.png images will be accepted. <br /> Files
                      over 10MB are ignored.
                    </p>
                  </div>
                </div>
              )}
              {isDragActive && (
                <div className="flex h-[280px] w-full items-center justify-center border-muted-foreground">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <UploadCloudIcon className="h-16 w-16" />
                    <p className="text-xs font-bold uppercase">
                      Drop your selfie image here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </AnimateFade>
        )}
        {file && (
          <AnimateFade motionKey="selfie" isVisible={!!file}>
            <div className=" flex h-[220px] w-full items-center justify-evenly">
              <div className="flex flex-col items-center justify-center gap-3">
                <Image
                  src={URL.createObjectURL(file)}
                  alt=""
                  width={128}
                  height={128}
                  className="h-32 w-32 rounded-full"
                />
                <Button
                  disabled={!file}
                  className="w-full"
                  size="sm"
                  variant="destructive"
                  onClick={() => setFile(null)}
                >
                  <TrashIcon className="mr-1.5 h-4 w-4" />
                  Remove
                </Button>
              </div>
              <div className="flex w-44 flex-col gap-3">
                <Button
                  disabled={!file}
                  size="sm"
                  className="w-full"
                  onClick={() => alert(`File: ${file?.name}`)}
                >
                  <SparklesIcon className="mr-1.5 h-4 w-4" />
                  Find My Images
                </Button>
                <Button
                  disabled={true}
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => alert(`File: ${file?.name}`)}
                >
                  <DownloadIcon className="mr-1.5 h-4 w-4" />
                  Download My Images
                </Button>
                <Button
                  disabled={true}
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => alert(`File: ${file?.name}`)}
                >
                  <Share1Icon className="mr-1.5 h-4 w-4" />
                  Share My Images
                </Button>
              </div>
            </div>
          </AnimateFade>
        )}
      </CardContent>
    </Card>
  );
};

const ActionsWidget = () => (
  <Card className="flex justify-evenly p-3">
    <Button size="icon" variant="secondary" className="rounded-full ">
      <DownloadIcon className="h-4 w-4" />
    </Button>
    <Button size="icon" variant="secondary" className="rounded-full">
      <ShareIcon className="h-4 w-4" />
    </Button>
    <Button size="icon" variant="secondary" className="rounded-full">
      <DownloadIcon className="h-4 w-4" />
    </Button>
    <Button size="icon" variant="secondary" className="rounded-full">
      <ShareIcon className="h-4 w-4" />
    </Button>
    <Button size="icon" variant="secondary" className="rounded-full">
      <DownloadIcon className="h-4 w-4" />
    </Button>
    <Button size="icon" variant="secondary" className="rounded-full">
      <ShareIcon className="h-4 w-4" />
    </Button>
  </Card>
);

const AnimateFade = ({
  children,
  isVisible,
  initial = true,
  motionKey,
}: {
  children: React.ReactNode;
  isVisible: boolean;
  initial?: boolean;
  motionKey: Key;
}) => (
  <AnimatePresence mode="wait" initial={initial}>
    {isVisible && (
      <motion.div
        key={motionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
        className="w-full"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
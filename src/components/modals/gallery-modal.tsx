"use client";

import { useModal } from "@/hooks/use-modal-store";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useMemo } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { variants } from "@/lib/animationVariants";
import { motion } from "framer-motion";
import { images } from "@/lib/data";
import { ScrollArea } from "../ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { Button } from "../ui/button";
import {
  ArrowUpRightFromCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  XIcon,
} from "lucide-react";

export const GalleryModal = () => {
  const { isOpen, type, onClose, data } = useModal();

  const isModalOpen = isOpen && type === "event-gallery";

  const { gallery } = data;

  const image = useMemo(() => {
    return gallery?.images.find((image) => image.id === gallery.currenImage);
  }, [gallery]);

  if (!gallery ?? !gallery?.images ?? !gallery?.currenImage) return null;

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={onClose} modal>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="absolute inset-0 z-30">
          <div className="fixed left-[50%] top-[50%] flex h-fit w-full max-w-7xl translate-x-[-50%] translate-y-[-50%] items-center outline-none">
            <AspectRatio ratio={3 / 2} className="relative">
              <MotionConfig
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <AnimatePresence initial={false} custom={-1}>
                  <motion.div
                    custom={-1}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute"
                  >
                    {image && (
                      <Image
                        src={image.src}
                        width={1280}
                        height={853}
                        priority
                        alt={`Gallery Image ${gallery?.currenImage}`}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </MotionConfig>

              <div className="absolute left-3 top-[calc(50%-32px)]">
                <Button className="h-14 w-14 rounded-full bg-accent-foreground/80 p-0">
                  <ChevronLeftIcon className="h-8 w-8 text-accent/90" />
                </Button>
              </div>
              <div className="absolute right-3 top-[calc(50%-32px)]">
                <Button className="h-14 w-14 rounded-full bg-accent-foreground/80 p-0">
                  <ChevronRightIcon className="h-8 w-8 text-accent/90" />
                </Button>
              </div>

              <div className="absolute right-3 top-3 space-x-3 md:top-10">
                <Button className="h-10 w-10 rounded-full bg-accent-foreground/80 p-0">
                  <ArrowUpRightFromCircleIcon className="h-4 w-4 text-accent/90" />
                </Button>
                <Button className="h-10 w-10 rounded-full bg-accent-foreground/80 p-0">
                  <DownloadIcon className="h-4 w-4 text-accent/90" />
                </Button>
              </div>

              <div className="absolute left-3 top-3 md:top-10">
                <Button
                  className="h-10 w-10 rounded-full bg-accent-foreground/80 p-0"
                  onClick={onClose}
                >
                  <XIcon className="h-4 w-4 text-accent/90" />
                </Button>
              </div>
            </AspectRatio>
          </div>
          <div className="fixed inset-x-0 bottom-0 flex h-32 items-center outline-none">
            <ScrollArea>
              <div className="flex w-max">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="cursor-pointer brightness-50 transition duration-200 hover:scale-110 hover:brightness-110"
                  >
                    <Image
                      src={image.src}
                      alt="small image"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <Scrollbar orientation="horizontal" />
            </ScrollArea>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

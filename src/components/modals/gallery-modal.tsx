import { useModal } from "@/hooks/use-modal-store";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { useMemo } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { variants } from "@/lib/animationVariants";
import { motion } from "framer-motion";

export const GalleryModal = () => {
  const { isOpen, type, onClose, data } = useModal();

  const isModalOpen = isOpen && type === "event-gallery";

  const { gallery } = data;

  const image = useMemo(() => {
    return gallery?.images.find((image) => image.id === gallery.currenImage);
  }, [gallery]);

  if (!gallery ?? !gallery?.images ?? !gallery?.currenImage) return null;

  return (
    <DialogPrimitive.Root open={isModalOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-30 flex h-fit w-full max-w-7xl translate-x-[-50%] translate-y-[-50%] items-center outline-none">
          <AspectRatio ratio={3 / 2}>
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
          </AspectRatio>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

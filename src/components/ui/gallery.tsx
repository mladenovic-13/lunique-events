"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import Image from "next/image";

import "@/styles/gallery.css";

import image1 from "@/public/images/1.webp";
import image2 from "@/public/images/2.webp";
import image3 from "@/public/images/3.webp";
import image4 from "@/public/images/4.webp";
import image5 from "@/public/images/5.webp";
import { ChevronLeft, ChevronRight, Download, Share, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const images = [
  image1.src,
  image2.src,
  image3.src,
  image4.src,
  image5.src,
  image1.src,
  image2.src,
  image3.src,
  image4.src,
  image5.src,
  image1.src,
  image2.src,
  image3.src,
  image4.src,
  image5.src,
  image1.src,
  image2.src,
  image3.src,
  image4.src,
  image5.src,
];

export type GalleryOptions = {
  close?: boolean;
  chevrons?: boolean;
  share?: boolean;
  download?: boolean;
};
export type GalleryHandlers = {
  onClose?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
};

type GalleryProps = GalleryOptions & GalleryHandlers;

export const Gallery = ({
  chevrons = true,
  close,
  download,
  share,
  onClose,
  onDownload,
  onShare,
}: GalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mainCarouselRef, mainCarouselApi] = useEmblaCarousel();
  const [thumbCarouselRef, thumbCarouselApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainCarouselApi || !thumbCarouselApi) return;

      mainCarouselApi.scrollTo(index);
    },
    [mainCarouselApi, thumbCarouselApi],
  );

  const onSelect = useCallback(() => {
    if (!mainCarouselApi || !thumbCarouselApi) return;
    setSelectedIndex(mainCarouselApi.selectedScrollSnap());
    thumbCarouselApi.scrollTo(mainCarouselApi.selectedScrollSnap());
  }, [mainCarouselApi, thumbCarouselApi, setSelectedIndex]);

  useEffect(() => {
    if (!mainCarouselApi) return;
    onSelect();
    mainCarouselApi.on("select", onSelect);
    mainCarouselApi.on("reInit", onSelect);
  }, [mainCarouselApi, onSelect]);

  const handleClose = () => {
    if (onClose) onClose();
  };
  const handleDownload = () => {
    if (onDownload) onDownload();
  };
  const handleShare = () => {
    if (onShare) onShare();
  };

  const handleLeft = () => {
    mainCarouselApi?.scrollPrev();
  };
  const handleRight = () => {
    mainCarouselApi?.scrollNext();
  };

  return (
    <div className="relative bg-primary">
      {/* CONTROLS */}
      <div className="absolute right-3 top-3 z-10 flex gap-3 md:right-5 md:top-5 md:gap-5">
        {download && (
          <button
            className="rounded-full bg-white/20 p-2 transition duration-200 hover:scale-110 hover:bg-white/20"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 text-primary-foreground" />
          </button>
        )}

        {share && (
          <button
            className="rounded-full bg-white/20 p-2 transition duration-200 hover:scale-110 hover:bg-white/20"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 text-primary-foreground" />
          </button>
        )}
        {close && (
          <button
            className="rounded-full bg-white/20 p-2 transition duration-200 hover:scale-110 hover:bg-white/20"
            onClick={handleClose}
          >
            <X className="h-4 w-4 text-primary-foreground" />
          </button>
        )}
      </div>

      {chevrons && (
        <>
          <button
            className="group absolute left-0 top-[calc(50%-256px)] z-20 flex h-64 w-12 translate-y-[50%] items-center justify-center transition duration-200 hover:bg-white/5 md:left-5 md:w-20"
            onClick={handleLeft}
          >
            <ChevronLeft className="h-6 w-6 bg-clip-content text-primary-foreground transition duration-200 group-hover:scale-110 md:h-10 md:w-10" />
          </button>
          <button
            className="group absolute right-0 top-[calc(50%-256px)] z-20 flex h-64 w-12 translate-y-[50%] items-center justify-center transition duration-200 hover:bg-white/5 md:right-5 md:w-20"
            onClick={handleRight}
          >
            <ChevronRight className="h-6 w-6 bg-clip-content text-primary-foreground transition duration-200 group-hover:scale-110 md:h-10 md:w-10" />
          </button>
        </>
      )}

      <div className="overflow-hidden" ref={mainCarouselRef}>
        <div className="flex touch-pan-y gap-1.5">
          {images.map((src, idx) => (
            <div
              style={{
                flex: "0 0 100%",
              }}
              className="relative h-screen"
              key={idx}
            >
              <Image
                src={src}
                fill
                className="absolute object-cover blur-2xl brightness-75"
                alt=""
              />
              <div className="flex h-full w-full items-center justify-center">
                <div className="relative h-[500px] w-full lg:h-[800px]">
                  <Image src={src} fill alt="" className="object-contain" />
                </div>
                I
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 z-10 flex w-full items-center justify-center">
        <Thumbs
          carouselRef={thumbCarouselRef}
          onThumbClick={onThumbClick}
          selectedIndex={selectedIndex}
        />
      </div>
    </div>
  );
};

type ThumbsProps = {
  onThumbClick: (index: number) => void;
  carouselRef: UseEmblaCarouselType["0"];
  selectedIndex: number;
};

const Thumbs = ({ carouselRef, onThumbClick, selectedIndex }: ThumbsProps) => {
  return (
    <div className="overflow-hidden" ref={carouselRef}>
      <div className="flex gap-0.5">
        {images.map((src, idx) => (
          <ThumbButton
            key={idx}
            index={idx}
            selected={idx === selectedIndex}
            onClick={() => onThumbClick(idx)}
            src={src}
          />
        ))}
      </div>
    </div>
  );
};

type ThumbButtonProps = {
  onClick: (index: number) => void;
  selected: boolean;
  index: number;
  src: string;
};

const ThumbButton = ({ index, selected, src, onClick }: ThumbButtonProps) => (
  <button
    onClick={() => onClick(index)}
    className={cn(
      "w-1/5 flex-none flex-shrink-0 flex-grow-0 rounded-sm transition duration-200 md:w-[8%]",
      !selected && "scale-90 opacity-25 hover:opacity-50",
    )}
  >
    <Image
      src={src}
      width={120}
      height={60}
      alt=""
      className="rounded-sm object-contain"
    />
  </button>
);

"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import "@/styles/gallery.css";

import image1 from "@/public/images/1.webp";
import image2 from "@/public/images/2.webp";
import image3 from "@/public/images/3.webp";
import image4 from "@/public/images/4.webp";
import image5 from "@/public/images/5.webp";
import { ChevronLeft, ChevronRight, Download, Share, X } from "lucide-react";

export const images = [
  image1.src,
  image2.src,
  image3.src,
  image4.src,
  image5.src,
];

export const Gallery = () => {
  const [emblaRef] = useEmblaCarousel();

  const handleClose = () => {
    alert("CLOSE GALLERY");
  };
  const handleLeft = () => {
    alert("SWIPE LEFT");
  };
  const handleRight = () => {
    alert("SWIPE RIGHT");
  };

  return (
    <div className="relative bg-primary">
      {/* CONTROLS */}
      <div className="absolute right-3 top-3 z-10 flex gap-3 md:right-5 md:top-5 md:gap-5">
        <button
          className="rounded-full bg-white/20 p-2 transition duration-200 hover:scale-110 hover:bg-white/20"
          onClick={handleClose}
        >
          <Download className="h-4 w-4 text-primary-foreground" />
        </button>

        <button
          className="rounded-full bg-white/20 p-2 transition duration-200 hover:scale-110 hover:bg-white/20"
          onClick={handleClose}
        >
          <Share className="h-4 w-4 text-primary-foreground" />
        </button>
        <button
          className="rounded-full bg-white/20 p-2 transition duration-200 hover:scale-110 hover:bg-white/20"
          onClick={handleClose}
        >
          <X className="h-4 w-4 text-primary-foreground" />
        </button>
      </div>

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

      <div className="overflow-hidden" ref={emblaRef}>
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
    </div>
  );
};

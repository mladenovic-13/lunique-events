import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { awsImageLoader } from "@/lib/image-loader";
import { isAwsImage } from "@/lib/is-aws-image";
import { cn } from "@/lib/utils";
import createAccountImg from "@/public/images/landing-page-images/create-account.webp";
import createEventImgDark from "@/public/images/landing-page-images/create-event-dark.webp";
import createEventImgLight from "@/public/images/landing-page-images/create-event-light.webp";
import personalizeEventImgDark from "@/public/images/landing-page-images/personalize-event.webp";

import StepCard from "./step-card";

interface OnboardingStepsProps {
  props?: string;
}
const OnboardingSteps = ({}: OnboardingStepsProps) => {
  const { theme } = useTheme();
  return (
    <section className="flex flex-col items-center justify-center gap-6 md:w-[1280px]">
      <h1 className="text-3xl font-semibold md:text-5xl">
        How It{" "}
        <strong className="bg-gradient-to-r from-rose-800 to-red-500 bg-clip-text font-bold capitalize text-transparent">
          Works
        </strong>{" "}
      </h1>
      <p className="w-1/2 text-center text-accent-foreground/60">
        Follow these steps to create your first event that everyone will love.
        Our intuitive platform makes event planning simple and enjoyable.
      </p>
      <div className="flex size-full flex-col gap-4">
        <StepCard
          title="Create Your Account ✨"
          description="Sign up quickly and easily using just your email address. You will
              receive a Magic Link that will create your profile and log you
              into the platform with just one click."
          step={1}
          image={createAccountImg.src}
          className="flex-col md:flex-row"
        />
        <div className="flex flex-col items-start justify-center gap-4 md:flex-row">
          <StepCard
            title="Create Your First Event 🥳"
            description="After registration, users can immediately start creating their first event. They can customize every detail, from the event name to the date and time."
            step={2}
            className="flex flex-col"
            image={
              theme === "light"
                ? createEventImgDark.src
                : theme === "dark"
                  ? createEventImgLight.src
                  : createEventImgLight.src
            }
          />
          <StepCard
            title="Personalize Your Event Page 🪄"
            description="Users can customize the look and feel of their event page, add images, descriptions, and personalized messages for guests."
            step={3}
            className="flex h-full flex-col"
            image={personalizeEventImgDark.src}
          />
        </div>
      </div>
    </section>
  );
};

export default OnboardingSteps;

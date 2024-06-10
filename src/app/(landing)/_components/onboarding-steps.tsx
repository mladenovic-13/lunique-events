import React from "react";

import createAccountImg from "@/public/images/landing-page-images/create-account.webp";
import createEventImg from "@/public/images/landing-page-images/create-event.webp";
import eventLandingImg from "@/public/images/landing-page-images/event-landing-page.webp";
import inviteGuestsImg from "@/public/images/landing-page-images/invite-guests.webp";

import StepCard from "./step-card";

interface OnboardingStepsProps {
  props?: string;
}
const OnboardingSteps = ({}: OnboardingStepsProps) => {
  return (
    <section className="flex flex-col items-center justify-center gap-6 px-4 pt-10 md:w-[1280px] md:px-0 md:pt-0">
      <h1 className="text-3xl font-semibold md:text-5xl">
        How It{" "}
        <strong className="bg-gradient-to-r from-rose-800 to-red-500 bg-clip-text font-bold capitalize text-transparent">
          Works
        </strong>{" "}
      </h1>
      <p className="w-full text-center font-light text-accent-foreground/60 md:w-1/2  md:text-xl">
        Follow these steps to create your first event that everyone will love.
        Our intuitive platform makes event planning simple and enjoyable.
      </p>
      {/* <div className="flex size-full flex-col gap-4">
        <StepCard
          title="Create Your Account ✨"
          description="Sign up quickly and easily using just your email address. You will
              receive a Magic Link that will create your profile and log you
              into the platform with just one click."
          step={1}
          image={createAccountImg.src}
          // className="flex-col gap-12 md:flex-row md:gap-0"
          className=""
        />
        <div className="flex h-fit flex-col items-start justify-center gap-4 md:flex-row">
          <StepCard
            title="Create Your First Event 🥳"
            description="After registration, users can immediately start creating their first event. They can customize every detail, from the event name to the date and time."
            step={2}
            className="flex flex-col"
            image={createEventImg.src}
          />
          <StepCard
            title="Personalize Your Event Page 🪄"
            description="Users can customize the look and feel of their event page, add images, descriptions, and personalized messages for guests."
            step={3}
            className="flex flex-col"
            image={eventLandingImg.src}
          />
        </div>
        <StepCard
          title="Invite Your Guests 📨"
          description="Invite guests quickly and easily via email, social media, or by sharing a unique link. Keep track of who has confirmed attendance and who is still considering, so you're always up to date with the number of attendees."
          step={4}
          className="flex-col gap-12 md:flex-row-reverse md:gap-0"
          image={inviteGuestsImg.src}
        />
      </div> */}
      <div className="flex w-full flex-col space-y-3">
        <div className="flex w-full flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0">
          <StepCard
            title="Create Your Account ✨"
            description="Sign up quickly and easily using just your email address. You will
              receive a Magic Link that will create your profile and log you
              into the platform with just one click."
            step={1}
            image={createAccountImg.src}
          />
          <StepCard
            title="Create Your First Event 🥳"
            description="After registration, users can immediately start creating their first event. They can customize every detail, from the event name to the date and time."
            step={2}
            image={createEventImg.src}
          />
          <StepCard
            title="Personalize Your Event Page 🪄"
            description="Users can customize the look and feel of their event page, add images, descriptions, and personalized messages for guests."
            step={3}
            image={eventLandingImg.src}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-between md:flex-row">
          <StepCard
            title="Invite Your Guests 📨"
            description="Invite guests quickly and easily via email, social media, or by sharing a unique link. Keep track of who has confirmed attendance and who is still considering, so you're always up to date with the number of attendees."
            step={4}
            image={inviteGuestsImg.src}
            className="w-full"
          />
          <StepCard
            title="Invite Your Guests 📨"
            description="Invite guests quickly and easily via email, social media, or by sharing a unique link. Keep track of who has confirmed attendance and who is still considering, so you're always up to date with the number of attendees."
            step={4}
            image={inviteGuestsImg.src}
            className="w-full flex-1"
          />
        </div>
      </div>
    </section>
  );
};

export default OnboardingSteps;

import React from "react";
import { useTheme } from "next-themes";

import createAccountDarkImg from "@/public/images/landing-page-images/create-account-dark.webp";
import createAccountLightImg from "@/public/images/landing-page-images/create-account-light.webp";
import createEventDarkImg from "@/public/images/landing-page-images/create-event-dark.webp";
import createEventLightImg from "@/public/images/landing-page-images/create-event-light.webp";
import inviteGuestsDarkImg from "@/public/images/landing-page-images/invite-guests-dark.webp";
import inviteGuestsLightImg from "@/public/images/landing-page-images/invite-guests-light.webp";
import { paths } from "@/routes/paths";

import StepCard from "./step-card";
interface OnboardingStepsProps {
  props?: string;
}
const OnboardingSteps = ({}: OnboardingStepsProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <section className="flex w-full max-w-screen-xl flex-col items-center justify-center gap-6 px-4 pt-10 md:px-0 md:pt-0">
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
      <div className="flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0">
        <StepCard
          title="Create Your Account"
          description="Enter your email and sign in with Magic Link 🪄"
          step={1}
          image={
            resolvedTheme === "light"
              ? createAccountLightImg.src
              : createAccountDarkImg.src
          }
          href={paths.signin.root}
        />
        <div className="hidden w-32 p-0 md:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
          >
            <g
              strokeWidth="19"
              stroke="hsl(347, 77%, 50%)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="matrix(0.7313537016191707,-0.6819983600624983,0.6819983600624983,0.7313537016191707,-184.34082467266762,382.25786337733103)"
            >
              <path
                d="M221.92139434814453 169Q-129.07860565185547 271 683.9213943481445 631 "
                markerEnd="url(#SvgjsMarker2236)"
              ></path>
            </g>
            <defs>
              <marker
                markerWidth="4"
                markerHeight="4"
                refX="2"
                refY="2"
                viewBox="0 0 4 4"
                orient="auto"
                id="SvgjsMarker2236"
              >
                <polygon
                  points="0,4 0,0 4,2"
                  fill="hsl(347, 77%, 50%)"
                ></polygon>
              </marker>
            </defs>
          </svg>
        </div>
        <StepCard
          title="Create Your First Event"
          description="Customize every detail, from the event name to the date and time ✨"
          step={2}
          image={
            resolvedTheme === "light"
              ? createEventLightImg.src
              : createEventDarkImg.src
          }
          href={paths.event.create}
        />
        <div className="hidden w-32 p-0 md:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
          >
            <g
              strokeWidth="19"
              stroke="hsl(347, 77%, 50%)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="matrix(0.7313537016191707,-0.6819983600624983,0.6819983600624983,0.7313537016191707,-184.34082467266762,382.25786337733103)"
            >
              <path
                d="M167.4549560546875 169Q670.4549560546875 271 629.4549560546875 631 "
                markerEnd="url(#SvgjsMarker2447)"
              ></path>
            </g>
            <defs>
              <marker
                markerWidth="4"
                markerHeight="4"
                refX="2"
                refY="2"
                viewBox="0 0 4 4"
                orient="auto"
                id="SvgjsMarker2447"
              >
                <polygon
                  points="0,4 0,0 4,2"
                  fill="hsl(347, 77%, 50%)"
                ></polygon>
              </marker>
            </defs>
          </svg>
        </div>
        <StepCard
          title="Invite Your Guests. Now!"
          description="Easily invite guests via email, social media, or by sharing a unique link 📨"
          step={2}
          image={
            resolvedTheme === "light"
              ? inviteGuestsLightImg.src
              : inviteGuestsDarkImg.src
          }
          href={paths.signin.root}
        />
      </div>
    </section>
  );
};

export default OnboardingSteps;

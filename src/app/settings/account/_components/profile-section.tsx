import React from "react";

import Section from "../../_components/section";

import { NameAndBio } from "./name-and-bio";
import { ProfilePicture } from "./profile-picture";
import { SocialLinks } from "./social-links";

const EditProfile = () => {
  return (
    <section className="flex flex-col space-y-6">
      <Section
        title="Your Profile"
        description="Choose how you are displayed as a host or guest."
      />
      <div className="flex justify-start space-x-20">
        <NameAndBio />
        <ProfilePicture />
      </div>
      <SocialLinks />
    </section>
  );
};

export default EditProfile;

"use client";
import React from "react";

import { MainPage } from "@/components/layout/main-page";

import FunctionalityOverview from "./_components/app-overview";
import ContactForm from "./_components/contact-form";
import Heading from "./_components/heading";

const ContactPage = () => {
  return (
    <MainPage>
      <Heading />
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <ContactForm />
        <FunctionalityOverview />
      </div>
    </MainPage>
  );
};

export default ContactPage;

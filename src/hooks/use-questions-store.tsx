import { create } from "zustand";

import { type QuestionAnswer } from "@/types";

type QuestionStore = {
  qas: QuestionAnswer[];
};
const useQuestionsStore = create<QuestionStore>(() => ({
  qas: [
    {
      category: "event",
      faqs: [
        {
          question: "How to create a new event",
          answer:
            "To create a new event, navigate to the Events section in the Lunique Events application. Click on the Create Event button, fill in the necessary details such as event name, date, time, and description, and then click Save to finalize the creation of your event",
        },
        {
          question: "Setting up and managing event schedules?",
          answer:
            "To set up and manage event schedules, go to the specific event you have created in the Events section. Click on the Schedule tab, where you can add new sessions, specify start and end times, assign locations, and manage the sequence of activities. You can also edit or delete existing schedule entries as needed.",
        },
        {
          question: "Adding and editing locations and times?",
          answer:
            "To add or edit locations and times for an event, access the event details page and navigate to the Locations tab. Here you can add new locations by providing the name and address. To edit times, go to the Schedule tab and click on the session you wish to modify. Update the start and end times as required and save your changes.",
        },
      ],
    },
    {
      category: "account",
      faqs: [
        {
          question: "How do I create a new account?",
          answer:
            "To create a new account, go to the Lunique Events application homepage and click on the Sign Up button. Fill in the required details, such as your name, email address, and password, then click Create Account. You will receive a confirmation email to verify your account.",
        },
        {
          question: "How do I update my profile information?",
          answer:
            "To update your profile information, log in to your account and navigate to the Profile section. Here you can edit your personal details such as your name, email address, and profile picture. Make sure to save your changes before exiting the page.",
        },
        {
          question: "How do I change my email notification settings?",
          answer:
            "To change your email notification settings, log in to your account and go to the Notification Settings section. Here you can customize which types of email notifications you want to receive, such as event reminders and promotional offers. Save your preferences before leaving the page.",
        },
      ],
    },
    {
      category: "billing",
      faqs: [
        {
          question: "How do I view my billing history?",
          answer:
            "To view your billing history, log in to your account and navigate to the Billing section. Click on Billing History to see a detailed list of all your past transactions, including dates, amounts, and descriptions of the charges.",
        },
        {
          question: "How do I update my payment information?",
          answer:
            "To update your payment information, log in to your account and go to the Billing section. Click on Payment Methods and then Add New Payment Method. Enter your new payment details and save the changes. You can also edit or remove existing payment methods from this section.",
        },
        {
          question: "How do I download my invoices?",
          answer:
            "To download your invoices, go to the Billing section after logging in to your account. In the Billing History tab, you will see a list of your transactions. Click on the Download button next to the invoice you wish to download. Invoices are usually available in PDF format.",
        },
        {
          question: "What should I do if I see an incorrect charge?",
          answer:
            "If you notice an incorrect charge on your account, please contact our support team immediately. You can reach out to us via the Contact Support link in the Billing section or email us directly at support@lunique.com. Provide details about the charge in question, and we will investigate and resolve the issue as quickly as possible.",
        },
      ],
    },
    {
      category: "premium-packet",
      faqs: [
        {
          question: "What features are included in the Premium Package?",
          answer:
            "The Premium Package includes advanced features such as unlimited event creation, priority customer support, enhanced analytics, and additional customization options for your events. For a full list of features, please visit our Premium Package page on the Lunique Events website.",
        },
        {
          question: "How do I upgrade to the Premium Package?",
          answer:
            " To upgrade to the Premium Package, log in to your account and go to the Premium section. Click on Upgrade Now and follow the prompts to enter your payment details. Once the payment is processed, your account will be upgraded immediately.",
        },
        {
          question: "Is there a free trial for the Premium Package?",
          answer:
            "Yes, we offer a 14-day free trial for the Premium Package. To start your free trial, go to the Premium section and click on Start Free Trial. Enter your payment information, and you will not be charged until the trial period ends. You can cancel at any time during the trial to avoid charges.",
        },
      ],
    },
  ],
}));

export const useFAQuestions = () => useQuestionsStore((state) => state.qas);

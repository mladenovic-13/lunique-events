import { create } from "zustand";

import { upcomingAndPastEvents } from "@/lib/mock-events";
import { type InviteGuestStep } from "@/types";

type GuestStore = {
  emails: string[];
  step: InviteGuestStep;
  guestCapacity: number;
  eventGuests: string[];
  userEvents: object[];
  actions: {
    addEmail: (email: string) => void;
    removeEmail: (email: string) => void;
    addEmails: (emails: Array<string>) => void;
    emailExists: (email: string) => boolean;
    setStep: (step: InviteGuestStep) => void;
    setGuestCapacity: () => void;
  };
};

const useGuestStore = create<GuestStore, [["zustand/persist", unknown]]>(
  (set, get) => ({
    emails: [],
    step: "addEmails",
    guestCapacity: 10,
    eventGuests: [],
    userEvents: upcomingAndPastEvents.upcoming as object[],
    actions: {
      addEmail: (email) => {
        if (get().guestCapacity > 0 && !get().actions.emailExists(email)) {
          set((state) => ({
            emails: [...state.emails, email],
            guestCapacity: state.guestCapacity - 1,
          }));
        }
      },
      removeEmail: (email) => {
        set((state) => ({
          emails: state.emails.includes(email)
            ? [...state.emails.filter((guestEmail) => guestEmail !== email)]
            : state.emails,
          guestCapacity: state.guestCapacity + 1,
        }));
      },
      addEmails: (emails) => {
        // @TODO wip
        const newEmails: Array<string> = [];
        emails.forEach((email) => {
          if (!get().actions.emailExists(email)) {
            newEmails.push(email);
          }
        });
        if (get().guestCapacity >= newEmails.length) {
          set((state) => ({
            emails: [...state.emails, ...newEmails],
            guestCapacity: get().guestCapacity - newEmails.length,
          }));
        }
      },
      setStep: (step) => {
        set((state) => ({
          step: state.step !== step ? step : state.step,
        }));
      },
      setGuestCapacity: () => {
        set((state) => ({
          guestCapacity:
            state.guestCapacity - state.emails.length < 0
              ? 0
              : state.guestCapacity - state.emails.length,
        }));
      },
      emailExists: (email) => {
        return get().emails.includes(email);
      },
    },
  }),
);

export const useGuestEmails = () => useGuestStore((state) => state.emails);
export const useInviteStep = () => useGuestStore((state) => state.step);
export const useGuestCapacity = () =>
  useGuestStore((state) => state.guestCapacity);
export const useUserEvents = () => useGuestStore((state) => state.userEvents);
export const useInviteGuestActions = () =>
  useGuestStore((state) => state.actions);

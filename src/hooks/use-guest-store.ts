import { create } from "zustand";

import { type InviteGuestStep } from "@/types";

type GuestStore = {
  emails: string[];
  step: InviteGuestStep;
  guestCapacity: number;
  selectedEventId: string | null;
  eventGuests: string[];
  emailSending: boolean;
  actions: {
    addEmail: (email: string) => void;
    removeEmail: (email: string) => void;
    addEmails: (emails: Array<string>) => void;
    removeEmails: (emails: Array<string>) => void;
    resetStore: () => void;
    emailExists: (email: string) => boolean;
    setStep: (step: InviteGuestStep) => void;
    setGuestCapacity: () => void;
    setSelectedEventId: (eventName: string) => void;
    setEventGuests: (guests: string[]) => void;
    setEmailSending: (sending: boolean) => void;
  };
};

const useGuestStore = create<GuestStore, [["zustand/persist", unknown]]>(
  (set, get) => ({
    emails: [],
    step: "add-emails",
    guestCapacity: 30,
    selectedEventId: null,
    eventGuests: [],
    userEvents: [],
    emailSending: false,
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
      removeEmails: (emails) => {
        const newEmails: Array<string> = [];
        emails.forEach((email) => {
          if (get().actions.emailExists(email)) {
            newEmails.push(email);
          }
        });
        if (get().guestCapacity >= newEmails.length) {
          set((state) => ({
            emails: [
              ...state.emails.filter((email) => !newEmails.includes(email)),
            ],
            guestCapacity: get().guestCapacity + newEmails.length,
          }));
        }
      },
      resetStore: () => {
        set((state) => ({
          emails: [],
          step: "add-emails",
          guestCapacity: state.guestCapacity + state.emails.length,
          selectedEventId: null,
          emailSending: false,
        }));
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
      setSelectedEventId: (eventName) => {
        set(() => ({
          selectedEventId: eventName,
        }));
      },
      setEventGuests: (guests) => {
        set(() => ({
          eventGuests: guests,
        }));
      },
      setEmailSending: (sending) => {
        set(() => ({
          emailSending: sending,
        }));
      },
    },
  }),
);

export const useGuestEmails = () => useGuestStore((state) => state.emails);
export const useInviteStep = () => useGuestStore((state) => state.step);
export const useGuestCapacity = () =>
  useGuestStore((state) => state.guestCapacity);
export const useGuestSelectedEvent = () =>
  useGuestStore((state) => state.selectedEventId);
export const useEventGuests = () => useGuestStore((state) => state.eventGuests);
export const useGuestEmailSending = () =>
  useGuestStore((state) => state.emailSending);
export const useInviteGuestActions = () =>
  useGuestStore((state) => state.actions);

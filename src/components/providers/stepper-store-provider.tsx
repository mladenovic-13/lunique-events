"use client";

import React from "react";
import { createStore, type StoreApi } from "zustand";

type State = {
  eventId: string | null;
};

type Actions = {
  updateEventId: (id: string) => void;
};

export type StepperStore = State & { actions: Actions };

export const StepperStoreContext =
  React.createContext<StoreApi<StepperStore> | null>(null);

export const StepperStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [store] = React.useState(() =>
    createStore<StepperStore>((set) => ({
      eventId: null,
      actions: {
        updateEventId: (id) => set({ eventId: id }),
      },
    })),
  );

  return (
    <StepperStoreContext.Provider value={store}>
      {children}
    </StepperStoreContext.Provider>
  );
};

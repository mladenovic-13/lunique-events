import React from "react";
import { useStore } from "zustand";

import {
  type StepperStore,
  StepperStoreContext,
} from "@/components/providers/stepper-store-provider";

export const useStepperStore = (selector: (state: StepperStore) => unknown) => {
  const store = React.useContext(StepperStoreContext);
  if (!store) {
    throw new Error("Missing StepperStoreProvider");
  }
  return useStore(store, selector);
};

export const useStepperEventId = () =>
  useStepperStore((state) => state.eventId);

export const useStepperActions = () =>
  useStepperStore((state) => state.actions);

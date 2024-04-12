import { ThemeMode } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  organization: string | undefined;
  mode: ThemeMode;
};

type Action = {
  updateOrganization: (id: State["organization"]) => void;
  updateMode: (mode: State["mode"]) => void;
};

type Store = State & Action;

export const useConfig = create<Store, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      mode: ThemeMode.SYSTEM,
      organization: undefined,
      updateMode: (mode) => set({ mode }),
      updateOrganization: (id) => set({ organization: id }),
    }),
    {
      name: "config-storage",
    },
  ),
);

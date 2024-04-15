import { ThemeMode } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  organizationId: string | undefined;
  mode: ThemeMode;
};
type Actions = {
  updateOrganizationId: (id: State["organizationId"]) => void;
  updateMode: (mode: State["mode"]) => void;
};
type Store = State & Actions;

const useConfig = create<Store, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      mode: ThemeMode.SYSTEM,
      organizationId: undefined,
      updateMode: (mode) => set({ mode }),
      updateOrganizationId: (id) => set({ organizationId: id }),
    }),
    {
      name: "config-storage",
    },
  ),
);

export const useOrganizationId = () =>
  useConfig((state) => state.organizationId);
export const useThemeMode = () => useConfig((state) => state.mode);
export const useConfigActions = () =>
  useConfig((state) => ({
    updateOrganizationId: state.updateOrganizationId,
    updateMode: state.updateMode,
  }));

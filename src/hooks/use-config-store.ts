import { ThemeMode } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  organizationId: string | undefined;
  mode: ThemeMode;
  actions: Actions;
};
type Actions = {
  updateOrganizationId: (id: Store["organizationId"]) => void;
  updateMode: (mode: Store["mode"]) => void;
};

const useConfig = create<Store, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      mode: ThemeMode.SYSTEM,
      organizationId: undefined,
      actions: {
        updateMode: (mode) => set({ mode }),
        updateOrganizationId: (id) => set({ organizationId: id }),
      },
    }),
    {
      name: "config-storage",
    },
  ),
);

export const useOrganizationId = () =>
  useConfig((state) => state.organizationId);
export const useThemeMode = () => useConfig((state) => state.mode);
export const useConfigActions = () => useConfig((state) => state.actions);

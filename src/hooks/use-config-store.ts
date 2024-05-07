import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  organizationId: string | undefined;
};
type Actions = {
  updateOrganizationId: (id: State["organizationId"]) => void;
};
type Store = State & Actions;

const useConfig = create<Store, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      organizationId: undefined,
      updateOrganizationId: (id) => set({ organizationId: id }),
    }),
    {
      name: "config-storage",
    },
  ),
);

export const useOrganizationId = () =>
  useConfig((state) => state.organizationId);
export const useConfigActions = () =>
  useConfig((state) => ({
    updateOrganizationId: state.updateOrganizationId,
  }));

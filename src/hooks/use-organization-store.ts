import { useContext } from "react";
import { useStore } from "zustand";

import {
  type OrganizationStore,
  OrganizationStoreContext,
} from "@/components/providers/organization-provider";

const useOrganizationStore = <T>(selector: (store: OrganizationStore) => T) => {
  const store = useContext(OrganizationStoreContext);

  if (!store) {
    throw new Error("Missing OrganizationStoreProvider");
  }

  return useStore(store, selector);
};

export const useOrganization = () =>
  useOrganizationStore((store) => store.data);

export const useOrganizationActions = () =>
  useOrganizationStore((store) => store.actions);

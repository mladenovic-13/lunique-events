import { useContext } from "react";
import { useStore } from "zustand";

import {
  type OrganizationStore,
  OrganizationStoreContext,
} from "@/components/providers/organization-provider";

const useOrganizationStore = (
  selector: (state: OrganizationStore) => unknown,
) => {
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

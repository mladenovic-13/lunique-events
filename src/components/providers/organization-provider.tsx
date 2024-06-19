"use client";

import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createStore, type StoreApi } from "zustand";

import { api } from "@/trpc/react";

export type OrganizationStore = {
  data: {
    id: string | null;
    name: string | null;
    ownerId: string | null;
  };
  actions: StoreActions;
};

type StoreActions = {
  update: (id: string, name: string, owner: string) => void;
};

export const OrganizationStoreContext =
  createContext<StoreApi<OrganizationStore> | null>(null);

export const OrganizationStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shouldSet, setShouldSet] = useState(true);

  const [store] = useState(() =>
    createStore<OrganizationStore>((set) => ({
      data: {
        id: null,
        name: null,
        ownerId: null,
      },
      actions: {
        update: (id: string, name: string, ownerId: string) =>
          set({ data: { id, name, ownerId } }),
      },
    })),
  );

  const { data: session } = useSession();

  const { data: personalOrganization } =
    api.organization.getPersonalOrganization.useQuery(undefined, {
      enabled: !!session?.user.id,
    });

  useEffect(() => {
    if (!personalOrganization || !shouldSet) return;

    store.setState(() => ({
      data: {
        id: personalOrganization.id,
        name: personalOrganization.name,
        ownerId: personalOrganization.ownerId,
      },
    }));

    setShouldSet(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalOrganization, session]);

  return (
    <OrganizationStoreContext.Provider value={store}>
      {children}
    </OrganizationStoreContext.Provider>
  );
};

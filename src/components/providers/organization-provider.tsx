"use client";

import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createStore } from "zustand";

type OrganizationStore = {
  id: string | null;
  name: string | null;
  owner: string | null;
};

const OrganizationContext = createContext(null);

//  useEffect(() => {
//    // TODO: Move organization fetch to store context privider
//    if (!orgs) return;

//    const personal = orgs.find((item) => item.isPersonal);
//    const current = orgs.find((item) => item.id === organizationId);

//    if (current) {
//      setOrganization(current);
//    }

//    if (!current) {
//      updateOrganizationId(personal?.id);
//    }
//  }, [organizationId, orgs, updateOrganizationId]);

//  const onNewOrganization = () => {
//    if (isPremiumUser) router.push(paths.organization.create);
//    if (!isPremiumUser) onOpen("get-now");
//  };

export const OrganizationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [store] = useState(() =>
    createStore<OrganizationStore>((set) => ({
      id: null,
      name: null,
      owner: null,
      actions: {
        update: (id: string, name: string, owner: string) =>
          set({ id, name, owner }),
      },
    })),
  );

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;

    const { user } = session;
  }, []);

  return (
    <OrganizationContext.Provider value={store}>
      {children}
    </OrganizationContext.Provider>
  );
};

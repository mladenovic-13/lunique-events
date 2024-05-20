import { eventRouter } from "@/server/api/routers/event";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { accountRouter } from "./routers/account";
import { billingRouter } from "./routers/billing";
import { contactRouter } from "./routers/contact";
import { exploreRouter } from "./routers/explore";
import { guestsRouter } from "./routers/guests";
import { inviteRouter } from "./routers/invite";
import { organizationRouter } from "./routers/organization";
import { s3Router } from "./routers/s3";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  s3: s3Router,
  billing: billingRouter,
  organization: organizationRouter,
  guest: guestsRouter,
  account: accountRouter,
  explore: exploreRouter,
  contact: contactRouter,
  invite: inviteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

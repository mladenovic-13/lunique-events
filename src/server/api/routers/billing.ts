import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { syncPlans } from "@/server/billing/sync";
import { listProducts } from "@lemonsqueezy/lemonsqueezy.js";

export const billingRouter = createTRPCRouter({
  getAllPlans: publicProcedure.query(async ({ ctx }) => {
    let plans = await ctx.db.plan.findMany();

    if (!plans.length) {
      plans = await syncPlans(ctx.db);
    }

    return plans;
  }),
  getLemonSqueezyData: protectedProcedure.query(async () => {
    const products = await listProducts({
      filter: { storeId: process.env.LEMONSQUEEZY_STORE_ID },
      include: ["variants"],
    });

    return products;
  }),
});

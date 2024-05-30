import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(50, "1 m"),
  analytics: true,
});

interface IRatelimitOpts {
  enabled: boolean;
  key: string;
}

export const ratelimit = async (opts: IRatelimitOpts) => {
  console.log("[RATELIMITER]: ratelimit fn called");

  if (!opts.enabled) return;

  console.log("[RATELIMITER]: ratelimit fn enabled");

  const { success } = await ratelimiter.limit(opts.key);

  if (!success) {
    console.log("[RATELIMITER]: fn ratelimited");
    throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  }

  console.log("[RATELIMITER]: ratelimit passed");
};

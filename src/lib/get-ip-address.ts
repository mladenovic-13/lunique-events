import { TRPCError } from "@trpc/server";

export const getIpAddress = (headers: Headers) => {
  const ip = headers.get("x-forwarded-for");
  if (!ip) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Failed to get IP address",
    });
  }

  return ip;
};

import { type PlanFeatures } from "@prisma/client";

export const DEFAULT_USER_AVATAR = "/images/avatar.png" as const;

type PlanType = "personal" | "professional";

export const PLAN_MAP: Record<PlanType, Omit<PlanFeatures, "id">> = {
  personal: {
    images: 50,
    branding: true,
  },
  professional: {
    images: 500,
    branding: false,
  },
} as const;

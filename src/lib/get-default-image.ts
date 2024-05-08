import { getRandomNumber } from "./get-random-number";

const MAX_INVITED_IMAGES = 15 as const;
const MAX_ORGANIZATION_COVER_IMAGES = 10 as const;
const IMAGE_EXTENSION = ".webp";

type ImageType = "organization-cover" | "event-thumbnail";

export const getDefaultImage = (type: ImageType) => {
  const max =
    type === "organization-cover"
      ? MAX_ORGANIZATION_COVER_IMAGES
      : MAX_INVITED_IMAGES;

  const prefix = type === "organization-cover" ? "cover" : "invited";

  return (
    "/images" +
    `/${prefix}` +
    `/${prefix}-${getRandomNumber(max)}${IMAGE_EXTENSION}`
  );
};

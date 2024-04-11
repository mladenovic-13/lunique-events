export const getGalleryImagePath = (
  userId: string,
  eventId: string,
  fileName: string,
) => {
  const date = new Date();
  const datePrefix = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  return `user-${userId}/event-${eventId}/${datePrefix}-${fileName}`;
};

export const getSelfieImagePath = (eventId: string, fileName: string) => {
  const date = new Date();
  const datePrefix = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  return `search-by-image/${datePrefix}-${fileName}`;
};

export const getThumbnailImagePath = (fileName: string) => {
  const date = new Date();
  const datePrefix = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  return `thumbnails/${datePrefix}-${fileName}`;
};

export const getCoverImagePath = (fileName: string) => {
  const date = new Date();
  const datePrefix = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  return `covers/${datePrefix}-${fileName}`;
};

export const getProfileImagePath = (fileName: string) => {
  const date = new Date();
  const datePrefix = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  return `profiles/${datePrefix}-${fileName}`;
};

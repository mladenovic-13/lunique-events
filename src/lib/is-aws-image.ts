const CDN = "cloudfront" as const;

export const isAwsImage = (url: string) => url.includes(CDN);

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["d3gfj4ev871o73.cloudfront.net", "lh3.googleusercontent.com"],
  },
};

export default config;

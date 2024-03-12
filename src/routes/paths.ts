export const paths = {
  root: "/",
  auth: {
    signIn: "/sign-in",
  },
  events: {
    root: "/events",
    event: (id: string) => `/events/${id}`,
    overview: (id: string) => `/events/${id}/overview`,
    guests: (id: string) => `/events/${id}/guests`,
    registration: (id: string) => `/events/${id}/registration`,
    emails: (id: string) => `/events/${id}/emails`,
    insights: (id: string) => `/events/${id}/insights`,
    images: (id: string) => `/events/${id}/images`,
    settings: (id: string) => `/events/${id}/settings`,
  },
  account: {
    root: "/account",
    settings: "/account/settings",
    usage: "/account/usage",
    billing: `/account/billing`,
  },
  gallery: {
    root: "/gallery",
    error: "/gallery/error",
  },
};

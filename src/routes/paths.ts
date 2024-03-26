const roots = {
  landing: "/",
  home: "/home",
  event: "/event",
  calendar: "/calendar",
  settings: "/settings",
  user: "/user",
  signin: "/sign-in",
};

export const paths = {
  landing: {
    root: roots.landing,
  },
  home: { root: "/home", calendars: roots.calendar + "/calendars" },
  event: {
    root: roots.event,
    landing: {
      root: (id: string) => roots.event + `/${id}`,
      gallery: (id: string) => roots.event + `/${id}` + "/gallery",
    },
    create: roots.event + "/create",
    manage: {
      emails: (id: string) => roots.event + "/manage" + `/${id}` + "/emails",
      guests: (id: string) => roots.event + "/manage" + `/${id}` + "/guests",
      insights: (id: string) =>
        roots.event + "/manage" + `/${id}` + "/insights",
      overview: (id: string) =>
        roots.event + "/manage" + `/${id}` + "/overview",
      photos: (id: string) => roots.event + "/manage" + `/${id}` + "/photos",
      registration: (id: string) =>
        roots.event + "/manage" + `/${id}` + "/registration",
      settings: (id: string) =>
        roots.event + "/manage" + `/${id}` + "/settings",
    },
  },
  calendar: {
    root: roots.calendar,
    landing: {
      root: (id: string) => roots.calendar + `/${id}`,
    },
    manage: {
      events: (id: string) => roots.calendar + "/manage" + `/${id}` + "/events",
      insights: (id: string) =>
        roots.calendar + "/manage" + `/${id}` + "/insights",
      newsletter: (id: string) =>
        roots.calendar + "/manage" + `/${id}` + "/newsletter",
      people: (id: string) => roots.calendar + "/manage" + `/${id}` + "/people",
      settings: {
        admins: (id: string) =>
          roots.calendar + "/manage" + `/${id}` + "/settings" + "/admins",
        display: (id: string) =>
          roots.calendar + "/manage" + `/${id}` + "/settings" + "/display",
        embed: (id: string) =>
          roots.calendar + "/manage" + `/${id}` + "/settings" + "/embed",
        options: (id: string) =>
          roots.calendar + "/manage" + `/${id}` + "/settings" + "/options",
        payment: (id: string) =>
          roots.calendar + "/manage" + `/${id}` + "/settings" + "/payment",
        plus: (id: string) =>
          roots.calendar + "/manage" + `/${id}` + "/settings" + "/plus",
        tags: (id: string) =>
          roots.calendar + "/manage" + `/${id}` + "/settings" + "/tags",
      },
    },
  },
  settings: {
    root: roots.settings,
    account: roots.settings + "/account",
    payment: roots.settings + "/payment",
    preferences: roots.settings + "/preferences",
  },
  user: { root: roots.user, landing: (id: string) => roots.user + `/${id}` },
  signin: { root: roots.signin },
};

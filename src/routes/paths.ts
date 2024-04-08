const roots = {
  landing: "/",
  home: "/home",
  event: "/event",
  organization: "/organization",
  settings: "/settings",
  user: "/user",
  signin: "/sign-in",
  explore: "/explore",
  pricing: "/pricing",
  help: "/help",
};

export const paths = {
  landing: {
    root: roots.landing,
  },
  home: { root: "/home", organizations: roots.home + "/organizations" },
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
  organization: {
    root: roots.organization,
    landing: {
      root: (id: string) => roots.organization + `/${id}`,
    },
    manage: {
      events: (id: string) =>
        roots.organization + "/manage" + `/${id}` + "/events",
      insights: (id: string) =>
        roots.organization + "/manage" + `/${id}` + "/insights",
      newsletter: (id: string) =>
        roots.organization + "/manage" + `/${id}` + "/newsletter",
      people: (id: string) =>
        roots.organization + "/manage" + `/${id}` + "/people",
      settings: {
        admins: (id: string) =>
          roots.organization + "/manage" + `/${id}` + "/settings" + "/admins",
        display: (id: string) =>
          roots.organization + "/manage" + `/${id}` + "/settings" + "/display",
        embed: (id: string) =>
          roots.organization + "/manage" + `/${id}` + "/settings" + "/embed",
        options: (id: string) =>
          roots.organization + "/manage" + `/${id}` + "/settings" + "/options",
        payment: (id: string) =>
          roots.organization + "/manage" + `/${id}` + "/settings" + "/payment",
        plus: (id: string) =>
          roots.organization + "/manage" + `/${id}` + "/settings" + "/plus",
        tags: (id: string) =>
          roots.organization + "/manage" + `/${id}` + "/settings" + "/tags",
      },
    },
  },
  settings: {
    root: roots.settings + "/account",
    account: roots.settings + "/account",
    payment: roots.settings + "/payment",
    preferences: roots.settings + "/preferences",
  },
  user: { root: roots.user, landing: (id: string) => roots.user + `/${id}` },
  signin: { root: roots.signin },
  explore: roots.explore,
  pricing: roots.pricing,
  help: roots.help,
};

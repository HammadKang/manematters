export const SITE = {
  name: "ManeMatters",
  tagline: "Curly, Straight & Hair Fall Care",
  description: "Tested remedies for curly, straight & hair fall problems.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://manematters.com").replace(/\/$/, ""),
  email: "aimanbabar196@gmail.com",
};

export const AUTHOR = {
  name: "Aiman Khan Babar",
  role: "Founder & Writer",
  bio: "Aiman Khan Babar is the founder and writer of ManeMatters. She has completed a cosmetology/beautician course and writes about curly hair, straight hair and hair fall, based on her training, her own hair care routines and careful research.",
};

/**
 * Google AdSense. Fill these in Vercel (Environment Variables) after AdSense approves the site.
 * While empty, the site shows clearly-labelled sample ads so you can see the layout.
 */
export const ADSENSE = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "", // e.g. ca-pub-1234567890123456
  slots: {
    homeTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP || "",
    belowTitle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BELOW_TITLE || "",
    inContent: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT || "",
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "",
  },
};

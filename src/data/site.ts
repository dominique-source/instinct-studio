// Centralized site configuration. Edit here rather than scattering copy across components.

export const site = {
  name: "INSTINCT STUDIO",
  legalLine: "Part of Studio by Dominique Soucy.",
  description:
    "Instinct Studio creates cinematic athlete films, branded short films and immersive sports experiences.",
  positioning:
    "Cinematic films, original concepts and immersive experiences centred on athletes.",
  signature: "THREE MINDS. ONE INSTINCT.",
  // Short homepage statement, distinct from the longer Studio-page positioning.
  statement: ["SPORT CREATES THE MOMENT.", "WE FIND THE STORY INSIDE IT."],
  // Domain is not yet assigned — set NEXT_PUBLIC_SITE_URL once one is.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://instinctstudio.studio",
  locations: ["Montréal", "Québec", "Worldwide"],
} as const;

// Primary navigation — kept short on purpose (Process stays reachable from
// the footer and from the homepage method section instead of the top nav).
export const nav = [
  { label: "FILMS", href: "/films" },
  { label: "STUDIO", href: "/studio" },
  { label: "CONTACT", href: "/collaborate" },
] as const;

export const footerNav = [
  { label: "Films", href: "/films" },
  { label: "Studio", href: "/studio" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/collaborate" },
] as const;

// PLACEHOLDER: fill in only once a real handle/URL exists. Footer hides any entry left empty.
export const socialLinks = {
  instagram: "",
  vimeo: "",
} as const;

// PLACEHOLDER: no contact form backend is configured yet. Set CONTACT_FORM_ENDPOINT
// (server-only env var, see README) to enable submissions. Until then the
// Collaborate page falls back to this email address.
export const contactEmail = "hello@instinctstudio.studio";

export const privacyPolicyHref = "/privacy";

// The homepage hero manifesto, below the hero title. Each entry is either a
// single-line paragraph, or a group of short lines meant to break within one
// paragraph (line breaks, not paragraph breaks). Exact wording, punctuation
// and line grouping are approved copy — do not shorten, rewrite or reorder.
export const heroManifesto = [
  "Every athlete has a story beneath the surface.",
  [
    "The choices no one sees.",
    "The setbacks that shape them.",
    "The split-second decisions that change everything.",
  ],
  [
    "It isn’t just talent.",
    "It isn’t just ambition.",
    "It’s something deeper. Instinct.",
  ],
  "Instinct Studios create powerful, human stories in short and long form that reveal what drives athletes, teams and the world of sport, from defining moments to the journeys behind them.",
  "Because the instinct that drives them is the same instinct that drives us.",
] as const;

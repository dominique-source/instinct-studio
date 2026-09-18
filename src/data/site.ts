// Centralized site configuration. Edit here rather than scattering copy across components.

export const site = {
  name: "INSTINCT STUDIO",
  legalLine: "Part of Studio by Dominique Soucy.",
  description:
    "Instinct Studio creates cinematic athlete films, branded short films and immersive sports experiences.",
  positioning:
    "Cinematic films, original concepts and immersive experiences centred on athletes.",
  signature: "THREE MINDS. ONE INSTINCT.",
  secondaryLine: "We film the instinct behind the athlete.",
  // PLACEHOLDER: replace with the production domain before launch.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://instinctstudio.studio",
  locations: ["Montréal", "Québec", "Worldwide"],
} as const;

export const nav = [
  { label: "FILMS", href: "/films" },
  { label: "STUDIO", href: "/studio" },
  { label: "PROCESS", href: "/process" },
  { label: "COLLABORATE", href: "/collaborate" },
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

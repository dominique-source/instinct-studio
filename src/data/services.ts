export const servicesTitle = "WHAT WE CREATE";
export const servicesHeadline = "STORIES BUILT TO MOVE PEOPLE.";
export const servicesSecondaryLine = "FILM. SPORT. CULTURE. HUMAN STORIES.";

// Kept for anywhere the plain list is still useful (e.g. non-visual contexts).
export const services: string[] = [
  "Cinematic athlete films",
  "Branded short films",
  "Original sports concepts",
  "Immersive sports experiences",
  "Campaign platforms",
  "Athlete-led storytelling",
  "Community sports narratives",
  "Visual worlds for new sports and properties",
];

export type FrameSize = "full" | "wide" | "tall" | "closing";
export type FrameDirection = "left" | "right" | "up";

export interface FilmWallFrame {
  number: number;
  title: string;
  description: string;
  /** Real image already used elsewhere on the site — never a generic stock placeholder. */
  image: string;
  imageAlt: string;
  size: FrameSize;
  direction: FrameDirection;
  connectorBefore?: boolean;
  overlap?: boolean;
}

const TOTAL_FRAMES = 8;

export const filmWallFrames: FilmWallFrame[] = [
  {
    number: 1,
    title: "Cinematic Athlete Films",
    description: "Athletes filmed with the eye of a feature film.",
    image: "/media/posters/prime-video-05.png",
    imageAlt: "",
    size: "full",
    direction: "left",
  },
  {
    number: 2,
    title: "Branded Short Films",
    description: "Brand stories built with real cinematic craft.",
    image: "/assets/hero/instinct-studio-hero.png",
    imageAlt: "",
    size: "full",
    direction: "right",
    connectorBefore: true,
  },
  {
    number: 3,
    title: "Original Sports Concepts",
    description: "New formats invented from scratch.",
    image: "/media/posters/prime-video-04.png",
    imageAlt: "",
    size: "wide",
    direction: "left",
  },
  {
    number: 4,
    title: "Immersive Sports Experiences",
    description: "Live worlds built for people to step into.",
    image: "/media/posters/prime-video-03.png",
    imageAlt: "",
    size: "tall",
    direction: "right",
  },
  {
    number: 5,
    title: "Campaign Platforms",
    description: "Ideas built to run across every channel.",
    image: "/media/posters/prime-video-06.png",
    imageAlt: "",
    size: "full",
    direction: "up",
  },
  {
    number: 6,
    title: "Athlete-Led Storytelling",
    description: "The athlete's own voice, front and centre.",
    image: "/media/posters/prime-video-01.png",
    imageAlt: "",
    size: "tall",
    direction: "left",
    connectorBefore: true,
  },
  {
    number: 7,
    title: "Community Sports Narratives",
    description: "The culture around the game, not just the game.",
    image: "/media/posters/prime-video-02.png",
    imageAlt: "",
    size: "wide",
    direction: "right",
    overlap: true,
  },
  {
    number: 8,
    title: "Visual Worlds for New Sports and Properties",
    description: "A visual identity built for something new.",
    image: "/media/posters/prime-video-05.png",
    imageAlt: "",
    size: "closing",
    direction: "up",
  },
];

export const filmWallTotal = TOTAL_FRAMES;

/** Frames 1–2 render before the Stef Szary chapter; the rest render after it. */
export const filmWallBeforeStef = filmWallFrames.filter((frame) => frame.number <= 2);
export const filmWallAfterStef = filmWallFrames.filter((frame) => frame.number > 2);

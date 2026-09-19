/**
 * "Four Minds. One Frequency." — the homepage Team section.
 * Source of truth: instinct-team-four-minds-assets/00-maquette/ and
 * 05-reference/. Real portraits are the ones already used sitewide
 * (src/data/team.ts) — the ZIP's portrait-*-reference.png crops are
 * composition references only and are never used in production.
 */

export const teamEyebrow = "PEOPLE × STORY × MOTION";
export const teamHeadlineLine1 = "FOUR MINDS.";
export const teamHeadlineLine2 = "ONE FREQUENCY.";
export const teamSupportingStatement = "Different perspectives. A higher frequency.";
export const teamCompletionLine = "DIFFERENT MINDS. ONE CREATIVE FORCE.";

const FILM = "/media/team-frequency/film";
const NOTES = "/media/team-frequency/notes";

export interface FrequencyAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
  decorative?: boolean;
  rotate?: number;
}

export interface TeamFrequencyMember {
  id: "dominique" | "stefan" | "neil" | "youri";
  name: string;
  archetype: string;
  roleLabel?: string;
  shortStatement: string;
  description: string;
  /** Live prompt revealed only on activation — see integration-concept.md's per-person layer. */
  activationPrompt: string;
  portraitSrc: string;
  portraitWidth: number;
  portraitHeight: number;
  film: FrequencyAsset;
  extraFilm?: FrequencyAsset;
  note: FrequencyAsset;
  extraNote?: FrequencyAsset;
}

export const teamFrequencyMembers: TeamFrequencyMember[] = [
  {
    id: "dominique",
    name: "Dominique Soucy",
    archetype: "THE INSTINCT",
    shortStatement: "Find the tension.",
    description: "Dominique finds the human tension and invents the world around it.",
    activationPrompt: "What is the tension?",
    portraitSrc: "/assets/team/dominique-soucy.png",
    portraitWidth: 2000,
    portraitHeight: 2000,
    film: {
      src: `${FILM}/film-action-left.png`,
      width: 405,
      height: 250,
      alt: "Athlete in motion, a sports movement film still",
    },
    extraFilm: {
      src: `${FILM}/film-eye-bottom.png`,
      width: 430,
      height: 220,
      alt: "Close contact-sheet fragment of an eye",
      rotate: -2,
    },
    note: {
      src: `${NOTES}/text-find-the-tension.png`,
      width: 190,
      height: 130,
      alt: "",
      decorative: true,
      rotate: -3,
    },
  },
  {
    id: "stefan",
    name: "Stefan Szary",
    archetype: "THE IMAGE",
    shortStatement: "Build the image.",
    description: "Stefan finds the human truth, then builds its cinematic language.",
    activationPrompt: "Same truth. A sharper frame.",
    portraitSrc: "/assets/team/stefan-szary.jpeg",
    portraitWidth: 401,
    portraitHeight: 401,
    film: {
      src: `${FILM}/film-landscape-stefan.png`,
      width: 340,
      height: 220,
      alt: "Dramatic cinematic landscape film still",
    },
    note: {
      src: `${NOTES}/text-build-the-image.png`,
      width: 210,
      height: 135,
      alt: "",
      decorative: true,
      rotate: 2,
    },
  },
  {
    id: "neil",
    name: "Neil Frisby",
    archetype: "THE SIGNAL",
    shortStatement: "Make it clear.",
    description: "Neil turns complex thinking into the idea people remember.",
    activationPrompt: "One idea. No noise.",
    portraitSrc: "/assets/team/neil-frisby.png",
    portraitWidth: 2000,
    portraitHeight: 2000,
    film: {
      src: `${FILM}/film-city-neil.png`,
      width: 330,
      height: 300,
      alt: "City skyline film still",
    },
    note: {
      src: `${NOTES}/text-make-it-clear.png`,
      width: 190,
      height: 130,
      alt: "",
      decorative: true,
      rotate: -2,
    },
  },
  {
    id: "youri",
    name: "Youri Hainz",
    archetype: "THE DISRUPTION",
    roleLabel: "ART DIRECTOR IN RESIDENCE",
    shortStatement: "Break the frame.",
    description: "Youri introduces the unexpected visual direction that moves the idea forward.",
    activationPrompt: "Same idea. New shape.",
    portraitSrc: "/assets/team/youri-hainz.jpeg",
    portraitWidth: 800,
    portraitHeight: 800,
    film: {
      src: `${FILM}/film-parkour-top-right.png`,
      width: 430,
      height: 285,
      alt: "Parkour athlete jumping between rooftops, a movement film still",
    },
    extraFilm: {
      src: `${FILM}/film-silhouette-youri.png`,
      width: 255,
      height: 320,
      alt: "Silhouette portrait study",
      rotate: 2,
    },
    note: {
      src: `${NOTES}/text-break-the-frame.png`,
      width: 205,
      height: 145,
      alt: "",
      decorative: true,
      rotate: 3,
    },
    extraNote: {
      src: `${NOTES}/text-creative-discipline.png`,
      width: 190,
      height: 175,
      alt: "",
      decorative: true,
      rotate: -2,
    },
  },
];

/** Extra film reserved for Youri's right-side column at desktop only. */
export const youriRunnerFragment: FrequencyAsset = {
  src: `${FILM}/film-runner-bottom-right.png`,
  width: 460,
  height: 245,
  alt: "Runner film still",
  rotate: -2,
};

/** Section-wide decorative flourishes, not tied to one person. */
export const teamSignatureNotes: {
  position: "top-left" | "center" | "bottom-left" | "bottom-right";
  asset: FrequencyAsset;
}[] = [
  {
    position: "top-left",
    asset: { src: `${NOTES}/text-people-story-motion.png`, width: 320, height: 70, alt: "", decorative: true },
  },
  {
    position: "top-left",
    asset: { src: `${NOTES}/text-different-perspectives.png`, width: 330, height: 150, alt: "", decorative: true, rotate: -2 },
  },
  {
    position: "center",
    asset: { src: `${NOTES}/text-art-sport-story-human.png`, width: 210, height: 210, alt: "", decorative: true, rotate: 2 },
  },
  {
    position: "bottom-left",
    asset: { src: `${NOTES}/text-more-than-a-team.png`, width: 330, height: 115, alt: "", decorative: true },
  },
  {
    position: "bottom-right",
    asset: { src: `${NOTES}/text-same-frequency.png`, width: 230, height: 170, alt: "", decorative: true, rotate: -2 },
  },
];

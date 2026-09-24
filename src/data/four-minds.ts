/**
 * "Three Minds. One Instinct." — the homepage Team section.
 * Source of truth: the approved maquette and animation-concept archived at
 * public/media/team-frequency/reference/. Real portraits and the essential
 * name/role/description copy come from src/data/team.ts (the same source
 * the Studio page uses) — the ZIP's portrait-*-reference.png crops
 * (archived at public/media/team-frequency/profiles/) are composition
 * references only and are never used in production.
 *
 * The third "mind" is not a named individual — it represents the
 * world-class art directors the studio collaborates with on a project
 * basis (see fourMindsCollective below). It renders with no portrait, no
 * personal name and no founder/employee framing, in the same visual slot
 * a third founder previously occupied.
 *
 * Youri Hainz is temporarily out of this section (not the site — his data
 * stays in src/data/team.ts and his visuals entry stays below) while the
 * composition runs as Dominique -> Art Directors -> Neil. Re-adding him
 * later is just adding "youri-hainz" back to FourMindsSection.tsx's member
 * list and extending the signal path/positions.
 */

export const fourMindsEyebrow = "PEOPLE × STORY × MOTION";
export const fourMindsHeadlineLine1 = "THREE MINDS.";
export const fourMindsHeadlineLine2 = "ONE INSTINCT.";
export const fourMindsSupportingStatement = "Different perspectives. A higher frequency.";
export const fourMindsCompletionLine = "DIFFERENT MINDS. ONE CREATIVE FORCE.";

const CINEMATIC = "/media/team-frequency/cinematic";
const NOTES = "/media/team-frequency/notes";

export interface FrequencyAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
  decorative?: boolean;
  rotate?: number;
}

export type FourMindsMemberId = "dominique-soucy" | "neil-frisby" | "youri-hainz";

/** The generic, non-personal third slot — see the file-level comment above. */
export interface FourMindsCollective {
  eyebrow: string;
  title: string;
  body: string;
  activationPrompt: string;
}

export const fourMindsCollective: FourMindsCollective = {
  eyebrow: "Collaborators",
  title: "World-Class Art Directors",
  body: "We work with art directors who give each idea its own visual world.",
  activationPrompt: "A new eye, every project.",
};

/**
 * Presentation/interaction layer only — keyed by src/data/team.ts's member
 * ids. Name, title (role) and shortText (description) stay single-sourced
 * from that file instead of being duplicated here.
 */
export interface FourMindsVisuals {
  /** Intrinsic size of the portrait file at src/data/team.ts's portraitSrc, for next/image. */
  portraitWidth: number;
  portraitHeight: number;
  /** Live prompt revealed only on activation — see reference/animation-concept.md's per-person layer. */
  activationPrompt: string;
  film: FrequencyAsset;
  extraFilm?: FrequencyAsset;
  note: FrequencyAsset;
  extraNote?: FrequencyAsset;
}

export const fourMindsVisualsById: Record<FourMindsMemberId, FourMindsVisuals> = {
  "dominique-soucy": {
    portraitWidth: 2000,
    portraitHeight: 2000,
    activationPrompt: "What is the tension?",
    film: {
      src: `${CINEMATIC}/film-action-left.png`,
      width: 405,
      height: 250,
      alt: "Athlete in motion, a sports movement film still",
    },
    extraFilm: {
      src: `${CINEMATIC}/film-eye-bottom.png`,
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
  "neil-frisby": {
    portraitWidth: 2000,
    portraitHeight: 2000,
    activationPrompt: "One idea. No noise.",
    film: {
      src: `${CINEMATIC}/film-city-neil.png`,
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
  "youri-hainz": {
    portraitWidth: 800,
    portraitHeight: 800,
    activationPrompt: "Same idea. New shape.",
    film: {
      src: `${CINEMATIC}/film-parkour-top-right.png`,
      width: 430,
      height: 285,
      alt: "Parkour athlete jumping between rooftops, a movement film still",
    },
    extraFilm: {
      src: `${CINEMATIC}/film-silhouette-youri.png`,
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
};

/** Section-wide decorative flourishes, not tied to one person. */
export const fourMindsSignatureNotes: {
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

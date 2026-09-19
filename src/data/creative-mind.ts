/**
 * "Inside the Creative Mind" — the homepage's "How We Think" section.
 * Source of truth: instinct-creative-mind-assets/00-maquette/ and
 * 04-reference/integration-notes.md. Assets live in
 * public/media/creative-mind/{film,notes}/; every individual film, paper
 * and handwritten-note asset supplied is used somewhere below (some only
 * from `--is-space` tablet/desktop breakpoints up, via `minBreakpoint`).
 */

export const creativeMindEyebrow = "HOW WE THINK";
export const creativeMindHeadline = "INSIDE THE CREATIVE MIND";
export const creativeMindSecondaryLine = "IDEAS / PEOPLE / MOTION / CULTURE";

export const instinctWord = "INSTINCT";
export const instinctSupportingLine = "INTUITION CREATES A BRIGHTER TOMORROW.";

export interface CreativeAsset {
  src: string;
  width: number;
  height: number;
  /** Only "film"/"paper"/"storyboard" assets carry meaning worth describing to AT users. */
  alt: string;
  /** Handwritten/typographic notes are always decorative — aria-hidden with a text equivalent elsewhere. */
  decorative?: boolean;
  /** 2–4deg paper-note rotation, sign gives direction. Omit for straight film stills. */
  rotate?: number;
  /** Only rendered from this breakpoint up — keeps mobile/tablet DOM light without duplicate requests. */
  minBreakpoint?: "tablet" | "desktop";
}

export interface CreativeMindStage {
  id: "human-truth" | "signal" | "visual-language" | "cultural-impact";
  number: string;
  title: string;
  description: string;
  /** Desktop collage zone, per the maquette's balance. */
  zone: "left" | "upper-center" | "lower-center" | "right";
  mainVisual: CreativeAsset;
  secondaryVisual: CreativeAsset;
  extraVisuals: CreativeAsset[];
  notes: CreativeAsset[];
  /** Screen-reader-only expansion of the decorative handwritten notes' meaning. */
  notesSummary: string;
}

const FILM = "/media/creative-mind/film";
const NOTES = "/media/creative-mind/notes";

export const creativeMindStages: CreativeMindStage[] = [
  {
    id: "human-truth",
    number: "01",
    title: "HUMAN TRUTH",
    description: "Find the human or sporting tension.",
    zone: "left",
    mainVisual: {
      src: `${FILM}/film-athlete-portrait.png`,
      width: 285,
      height: 430,
      alt: "Close, intense portrait of an athlete mid-effort",
    },
    secondaryVisual: {
      src: `${FILM}/film-track-start.png`,
      width: 325,
      height: 205,
      alt: "Athlete crouched at a track starting position under stadium lights",
      rotate: -2,
    },
    extraVisuals: [],
    notes: [
      { src: `${NOTES}/text-what-is-the-tension.png`, width: 220, height: 130, alt: "", decorative: true, rotate: -3 },
      { src: `${NOTES}/text-pressure-desire-list.png`, width: 190, height: 200, alt: "", decorative: true, rotate: 2 },
      { src: `${NOTES}/text-real-people-real-moments.png`, width: 190, height: 250, alt: "", decorative: true, rotate: -2, minBreakpoint: "desktop" },
    ],
    notesSummary:
      "Working notes: what is the tension? Pressure, desire, failure, comeback, belonging, more. Real people, real moments, greater meaning.",
  },
  {
    id: "signal",
    number: "02",
    title: "SIGNAL",
    description: "Reduce complexity to one clear idea.",
    zone: "upper-center",
    mainVisual: {
      src: `${FILM}/storyboard-athlete-sequence.png`,
      width: 150,
      height: 310,
      alt: "Hand-drawn storyboard sequence of an athlete running and starting",
    },
    secondaryVisual: {
      src: `${FILM}/paper-human-truth-diagram.png`,
      width: 300,
      height: 270,
      alt: "Hand-drawn diagram: three overlapping circles labelled human truth, simple idea and cultural impact",
      rotate: 3,
    },
    extraVisuals: [],
    notes: [
      { src: `${NOTES}/text-reduce-to-one-idea.png`, width: 180, height: 110, alt: "", decorative: true, rotate: -2 },
      { src: `${NOTES}/text-same-idea-different-angles.png`, width: 175, height: 140, alt: "", decorative: true, rotate: 2 },
      { src: `${NOTES}/text-sport-humanity-culture.png`, width: 175, height: 160, alt: "", decorative: true, rotate: -3, minBreakpoint: "desktop" },
    ],
    notesSummary:
      "Working notes: reduce to one idea. Same idea, different angles. Sport, humanity, culture, always.",
  },
  {
    id: "visual-language",
    number: "03",
    title: "VISUAL LANGUAGE",
    description: "Find the frame.",
    zone: "lower-center",
    mainVisual: {
      src: `${FILM}/film-contact-sheet.png`,
      width: 470,
      height: 180,
      alt: "Movement contact sheet: three film frames of an athlete, a dribble and a basketball hoop",
    },
    secondaryVisual: {
      src: `${FILM}/paper-camera-moves-people.png`,
      width: 200,
      height: 215,
      alt: "Hand-drawn camera framing sketch captioned camera moves people",
      rotate: -3,
    },
    extraVisuals: [
      { src: `${FILM}/film-runner-strip.png`, width: 205, height: 220, alt: "Runner film contact strip, two frames", rotate: 2, minBreakpoint: "desktop" },
      { src: `${FILM}/film-hands-closeup.png`, width: 230, height: 215, alt: "Close-up of an athlete's taped hands", minBreakpoint: "desktop" },
    ],
    notes: [
      { src: `${NOTES}/text-find-the-frame.png`, width: 190, height: 145, alt: "", decorative: true, rotate: 2 },
      { src: `${NOTES}/text-light-movement-texture.png`, width: 190, height: 140, alt: "", decorative: true, rotate: -2 },
      { src: `${NOTES}/text-camera-moves-people.png`, width: 190, height: 190, alt: "", decorative: true, rotate: 3, minBreakpoint: "desktop" },
    ],
    notesSummary:
      "Working notes: find the frame. Light, movement, texture, rhythm, emotion. Camera moves people.",
  },
  {
    id: "cultural-impact",
    number: "04",
    title: "CULTURAL IMPACT",
    description: "Make people feel.",
    zone: "right",
    mainVisual: {
      src: `${FILM}/film-athlete-back.png`,
      width: 420,
      height: 250,
      alt: "Backlit athlete seen from behind, facing a lit stadium",
    },
    secondaryVisual: {
      src: `${FILM}/film-stadium-frame.png`,
      width: 405,
      height: 190,
      alt: "Camera monitor frame recording raised hands in a lit stadium",
      rotate: 2,
    },
    extraVisuals: [
      { src: `${FILM}/film-crowd-hands.png`, width: 190, height: 260, alt: "Crowd with raised hands in a stadium", rotate: -2, minBreakpoint: "desktop" },
    ],
    notes: [
      { src: `${NOTES}/text-make-people-feel.png`, width: 195, height: 125, alt: "", decorative: true, rotate: -2 },
      { src: `${NOTES}/text-this-feels-bigger.png`, width: 180, height: 120, alt: "", decorative: true, rotate: 2 },
      { src: `${NOTES}/text-film-campaign-movement.png`, width: 185, height: 170, alt: "", decorative: true, rotate: -3, minBreakpoint: "desktop" },
    ],
    notesSummary:
      "Working notes: this feels bigger. Make people feel. A film, a campaign, a movement, a brighter tomorrow.",
  },
];

/** Small studio statements that frame the whole section, not tied to one stage. */
export const creativeMindSignature: {
  position: "top" | "bottom-left" | "bottom-right";
  asset: CreativeAsset;
}[] = [
  {
    position: "top",
    asset: { src: `${NOTES}/text-more-than-film.png`, width: 280, height: 65, alt: "", decorative: true },
  },
  {
    position: "bottom-left",
    asset: { src: `${NOTES}/text-sport-lives-in-people.png`, width: 330, height: 45, alt: "", decorative: true },
  },
  {
    position: "bottom-right",
    asset: { src: `${NOTES}/text-ideas-move-the-world.png`, width: 335, height: 45, alt: "", decorative: true },
  },
];

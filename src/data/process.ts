export const processTitle = "HOW WE THINK";
export const processStatement = "FROM RAW INSTINCT TO CULTURAL SIGNAL.";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "INSIGHT",
    description: "Find the human or sporting tension.",
  },
  {
    number: "02",
    title: "SIGNAL",
    description: "Reduce complexity to one clear idea.",
  },
  {
    number: "03",
    title: "IMAGE",
    description: "Build its cinematic visual language.",
  },
  {
    number: "04",
    title: "EXPERIENCE",
    description: "Turn the idea into a film, campaign or live world.",
  },
];

export interface CaseStudyStage {
  step: string;
  label: string;
  detail: string;
}

// PLACEHOLDER: illustrative walk-through of the process using PürInstinct as
// the reference project, until a documented case study replaces it.
export const purInstinctCaseStudy: CaseStudyStage[] = [
  {
    step: "Tension",
    label: "A sporting tension",
    detail: "Traditional sport rewards outcome over experience, and leaves little room for play, invention or connection.",
  },
  {
    step: "Idea",
    label: "An idea",
    detail: "Rebuild sport as a creative language — a format where instinct and invention matter as much as the score.",
  },
  {
    step: "Sentence",
    label: "A sentence",
    detail: "“Sport is not the destination. Sport is the path.”",
  },
  {
    step: "Storyboard",
    label: "A storyboard",
    detail: "The arena, the athletes and the format are sketched frame by frame before a camera ever rolls.",
  },
  {
    step: "Film",
    label: "A film or experience",
    detail: "The idea becomes PürInstinct — a live competition format captured on film for athletes, brands and audiences.",
  },
];

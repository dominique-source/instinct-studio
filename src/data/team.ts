export type TeamRole = "founder" | "resident";

export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole;
  title: string;
  shortText: string;
  longText: string;
  quote: string[];
  /** Path under /public. Rendered only if the file actually exists on disk. */
  portraitSrc: string;
}

export const founders: TeamMember[] = [
  {
    id: "dominique-soucy",
    name: "Dominique Soucy",
    role: "founder",
    title: "Sports Artist, Inventor and Founder",
    shortText: "Dominique finds the human tension and invents the world around it.",
    longText:
      "Dominique Soucy sees sport as a creative language. A former professional basketball player, sports inventor and father of four, he has spent his life exploring how sport shapes identity, learning and community. He created PürInstinct and authored The Sports Art Manifesto, a study of the limitations of traditional sport and the opportunities to rebuild sport around play, connection and human development. Dominique does not treat sport as a destination. He sees sport as a path toward something larger.",
    quote: ["SPORT IS NOT THE DESTINATION.", "SPORT IS THE PATH."],
    portraitSrc: "/assets/team/dominique-soucy.png",
  },
  {
    id: "neil-frisby",
    name: "Neil Frisby",
    role: "founder",
    title: "Immersive Sports Director and Creative Translator",
    shortText: "Neil turns complex thinking into the idea people remember.",
    longText:
      "Neil Frisby turns complex creative thinking into clear cultural signals. He listens, absorbs and identifies the sentence, word or gesture capable of carrying an entire experience. Working across immersive entertainment, sport, storytelling and live experiences, Neil connects creative ambition with the way an audience will feel, understand and remember an idea.",
    quote: ["THIRTY HOURS OF THINKING.", "ONE IDEA PEOPLE REMEMBER."],
    portraitSrc: "/assets/team/neil-frisby.png",
  },
];

export const resident: TeamMember = {
  id: "youri-hainz",
  name: "Youri Hainz",
  role: "resident",
  title: "Art Director in Residence",
  shortText: "Youri transforms active projects into living visual stories.",
  longText: "Youri transforms active projects into living visual stories.",
  quote: [],
  portraitSrc: "/assets/team/youri-hainz.jpeg",
};

export const team: TeamMember[] = [...founders, resident];

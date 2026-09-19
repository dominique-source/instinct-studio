export interface Credit {
  role: string;
  name: string;
}

export interface Film {
  id: string;
  slug: string;
  title: string;
  /** Project type, shown as a label (e.g. "Official trailer"). */
  subtitle: string;
  language?: "English" | "French";
  year?: number;
  category: string;
  duration?: string;
  athlete?: string;
  client?: string;
  synopsis: string;
  /** Instinct Studio's role on the project. Our own claim, not a third-party credit. */
  studioRole: string;
  /** Confirmed external credits only — leave empty rather than inventing names. */
  credits: Credit[];
  /** Real poster image under /public, or "" to fall back to a video preview frame. */
  poster: string;
  /** Real, playable video URL under /public or a hosted CDN, or "" while unreleased. */
  videoUrl: string;
  featured: boolean;
  order: number;
  /** Original file name in the source Drive folder, kept for traceability while media is migrated. */
  sourceFile: string;
}

export const films: Film[] = [
  {
    id: "purinstinct-games",
    slug: "purinstinct-games",
    title: "PürInstinct Games",
    subtitle: "Official trailer",
    category: "Official trailer",
    synopsis:
      "The official trailer for the PürInstinct Games — a first look at the competition, the arena and the athletes who bring it to life.",
    studioRole:
      "Instinct Studio conceived and produced this trailer to introduce the PürInstinct Games to a new audience.",
    credits: [],
    poster: "",
    videoUrl: "",
    featured: false,
    order: 1,
    sourceFile: "PurInstinct Games Official Trailer.mov",
  },
  {
    id: "purinstinct-x-manmade",
    slug: "purinstinct-x-manmade",
    title: "PürInstinct × Manmade",
    subtitle: "Branded short film",
    category: "Branded short film",
    synopsis:
      "A branded short film built with Manmade, exploring the instinct behind athletic performance through a distinct visual language.",
    studioRole:
      "Instinct Studio directed this branded short film in collaboration with Manmade.",
    credits: [],
    poster: "",
    videoUrl: "",
    featured: false,
    order: 2,
    sourceFile: "Pürinsctinct - Manmade.mp4",
  },
  {
    id: "learn-purinstinct",
    slug: "learn-purinstinct",
    title: "Learn PürInstinct",
    subtitle: "Three-minute explainer",
    language: "French",
    category: "Explainer",
    duration: "3 min",
    synopsis:
      "A three-minute explainer designed to teach the rules and spirit of PürInstinct to a new audience.",
    studioRole:
      "Instinct Studio produced this explainer to make PürInstinct's rules and spirit clear in three minutes.",
    credits: [],
    poster: "",
    videoUrl: "",
    featured: false,
    order: 3,
    sourceFile: "Apprendre PurInstinct en 3 minutes.MOV",
  },
  {
    id: "purinstinct-festival",
    slug: "purinstinct-festival",
    title: "PürInstinct Festival",
    subtitle: "Event film",
    category: "Event film",
    synopsis:
      "A record of the PürInstinct Festival, capturing the atmosphere of a live event built around sport and community.",
    studioRole:
      "Instinct Studio filmed and edited this event film on location at the PürInstinct Festival.",
    credits: [],
    poster: "",
    videoUrl: "",
    featured: false,
    order: 4,
    sourceFile: "FestivalV2_Final_Correction.MP4",
  },
  {
    id: "instinct-en",
    slug: "instinct-en",
    title: "INSTINCT",
    subtitle: "AI concept film",
    language: "English",
    category: "AI concept film",
    synopsis:
      "An AI-assisted concept film exploring instinct as a cinematic idea, in English.",
    studioRole:
      "Instinct Studio directed this concept film as an exploration of AI-assisted image-making.",
    credits: [],
    poster: "",
    videoUrl: "",
    featured: false,
    order: 5,
    sourceFile: "INSTINCT - video ai (anglais).mp4",
  },
  {
    id: "instinct-fr",
    slug: "instinct-fr",
    title: "INSTINCT",
    subtitle: "AI concept film",
    language: "French",
    category: "AI concept film",
    synopsis:
      "An AI-assisted concept film exploring instinct as a cinematic idea, in French.",
    studioRole:
      "Instinct Studio directed this concept film as an exploration of AI-assisted image-making.",
    credits: [],
    poster: "",
    videoUrl: "",
    featured: false,
    order: 6,
    sourceFile: "INSTINCT - video ai (francais).mp4",
  },
  {
    id: "purinstinct-pilot",
    slug: "purinstinct-pilot",
    title: "PürInstinct Pilot",
    subtitle: "Pilot film",
    category: "Pilot film",
    synopsis:
      "The pilot film for PürInstinct, establishing its visual language and competitive format.",
    studioRole:
      "Instinct Studio produced this pilot to establish PürInstinct's visual language on screen.",
    credits: [],
    poster: "",
    videoUrl: "",
    featured: false,
    order: 7,
    sourceFile: "Purinstinct_Pilot_v02.mp4",
  },
  {
    id: "purinstinct-session",
    slug: "purinstinct-session",
    title: "PürInstinct Session",
    subtitle: "Session film",
    category: "Session film",
    synopsis:
      "A session film documenting athletes training and competing within the PürInstinct format.",
    studioRole:
      "Instinct Studio filmed this session to document athletes inside the PürInstinct format.",
    credits: [],
    poster: "",
    videoUrl: "",
    featured: false,
    order: 8,
    sourceFile: "Purinstinct_Session_26022024_v03.mp4",
  },
  {
    id: "un-sport-pur",
    slug: "un-sport-pur",
    title: "Un Sport Pur",
    subtitle: "Teaser",
    language: "French",
    category: "Teaser",
    synopsis: "A teaser introducing the idea of Un Sport Pur.",
    studioRole: "Instinct Studio produced this teaser to introduce Un Sport Pur.",
    credits: [],
    poster: "",
    videoUrl: "",
    featured: false,
    order: 9,
    sourceFile: "UN_SPORT_PUR_TEASER_V1.mp4",
  },
  {
    id: "festival-x-kaz",
    slug: "festival-x-kaz",
    title: "Festival × Kaz",
    subtitle: "Festival capsule",
    category: "Festival capsule",
    synopsis:
      "A short festival capsule made in collaboration with Kaz, capturing a moment from the event.",
    studioRole:
      "Instinct Studio produced this capsule in collaboration with Kaz.",
    credits: [],
    poster: "",
    videoUrl: "/media/videos/festival-kaz.mp4",
    featured: true,
    order: 10,
    sourceFile: "Video Festival - Kaz.MP4",
  },
];

/**
 * A film only appears anywhere on the public site once it has real media —
 * a playable video and/or a real poster image. Everything else stays in
 * this file, ready to activate, but stays out of listings, sitemaps and
 * direct routes until then. See README "Adding a new film".
 */
export function isPublished(film: Film): boolean {
  return Boolean(film.videoUrl) || Boolean(film.poster);
}

export const filmsByOrder = [...films].sort((a, b) => a.order - b.order);
export const publishedFilms = filmsByOrder.filter(isPublished);
export const featuredFilms = publishedFilms.filter((film) => film.featured);
export const secondaryFilms = publishedFilms.filter((film) => !film.featured);

export function getFilmBySlug(slug: string): Film | undefined {
  return publishedFilms.find((film) => film.slug === slug);
}

export function getNextFilm(current: Film): Film | undefined {
  if (publishedFilms.length < 2) return undefined;
  const index = publishedFilms.findIndex((film) => film.id === current.id);
  return publishedFilms[(index + 1) % publishedFilms.length];
}

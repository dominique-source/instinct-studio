/**
 * Prime Videos — the only films visible on the public site.
 *
 * Every video is hosted on YouTube, with a custom local poster image. This
 * file is the single source of truth: add, remove, reorder or re-feature a
 * video here and the homepage, films index, film detail routes and
 * sitemap all follow automatically. See README "Prime Videos" for the
 * full guide, including the poster-to-video mapping table.
 */

export const primeVideoIds = [
  "yczX4OfLZEE",
  "hPLfmAOFkKc",
  "jeLplJNxUiQ",
  "KDz1gF3xGPE",
  "N4ec8bJfsoc",
  "JgSlbz9942M",
] as const;

export type PrimeVideoId = (typeof primeVideoIds)[number];

/**
 * Which video is "featured" (shown larger on the homepage). Must be one
 * of the IDs in `primeVideoIds` above.
 */
export const featuredVideoId: PrimeVideoId = primeVideoIds[0];

/**
 * Real YouTube titles, used only where reliably confirmed. `null` means
 * the title could not be reliably confirmed, so the site falls back to
 * "Prime Video 0N" instead of guessing — never invent a title, client,
 * athlete, credit or date.
 */
const confirmedTitles: Record<PrimeVideoId, string | null> = {
  yczX4OfLZEE:
    "High School QB Sensation: Watch Him Dominate in PürInstinct Multi-Sport Challenge",
  hPLfmAOFkKc: null,
  jeLplJNxUiQ: "Festival Arts Sportifs — 20 juillet 2024",
  KDz1gF3xGPE: null,
  N4ec8bJfsoc: null,
  JgSlbz9942M: null,
};

/**
 * Custom cinematic posters under /public, mapped 1:1 to each video. See
 * README "Prime Videos" for which original uploaded file each came from.
 */
const posters: Record<PrimeVideoId, string> = {
  yczX4OfLZEE: "/media/posters/prime-video-01.png",
  hPLfmAOFkKc: "/media/posters/prime-video-02.png",
  jeLplJNxUiQ: "/media/posters/prime-video-03.png",
  KDz1gF3xGPE: "/media/posters/prime-video-04.png",
  N4ec8bJfsoc: "/media/posters/prime-video-05.png",
  JgSlbz9942M: "/media/posters/prime-video-06.png",
};

export interface PrimeVideo {
  youtubeId: PrimeVideoId;
  /** Route slug under /films — the YouTube ID itself, guaranteed unique and stable. */
  slug: string;
  title: string;
  /** Local cinematic poster under /public — always used in place of a YouTube-generated thumbnail. */
  poster: string;
  order: number;
  featured: boolean;
}

export const primeVideos: PrimeVideo[] = primeVideoIds.map((youtubeId, index) => {
  const order = index + 1;
  return {
    youtubeId,
    slug: youtubeId,
    title: confirmedTitles[youtubeId] ?? `Prime Video ${String(order).padStart(2, "0")}`,
    poster: posters[youtubeId],
    order,
    featured: youtubeId === featuredVideoId,
  };
});

export const featuredPrimeVideos = primeVideos.filter((video) => video.featured);
export const secondaryPrimeVideos = primeVideos.filter((video) => !video.featured);

export function getPrimeVideoBySlug(slug: string): PrimeVideo | undefined {
  return primeVideos.find((video) => video.slug === slug);
}

export function getNextPrimeVideo(current: PrimeVideo): PrimeVideo | undefined {
  if (primeVideos.length < 2) return undefined;
  const index = primeVideos.findIndex((video) => video.youtubeId === current.youtubeId);
  return primeVideos[(index + 1) % primeVideos.length];
}

export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1`;
}

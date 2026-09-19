/**
 * Selected director's work — four films from Stef Szary's own directing
 * portfolio, hosted on Vimeo. These are his films, not Instinct Studio
 * productions: every presentation of them must carry the
 * "Directed by Stef Szary" / "Selected director's work" credit.
 *
 * Titles: Vimeo's oEmbed endpoint (https://vimeo.com/api/oembed.json) could
 * not be reached from this environment (network policy blocks vimeo.com),
 * so no title, duration or thumbnail could be confirmed for any of the
 * four. Per spec, none are guessed — each uses the required "Film 0N"
 * fallback. See README "Selected Director's Work" for how to fill these in
 * once real metadata is available.
 */

export interface StefFilm {
  vimeoId: string;
  order: number;
  title: string;
  /** Minutes:seconds from Vimeo oEmbed, when confirmed. */
  duration?: string;
  /** Intended local path once a real Vimeo thumbnail is downloaded — see README. */
  poster: string;
}

export const stefFilms: StefFilm[] = [
  {
    vimeoId: "1137745395",
    order: 1,
    title: "Film 01",
    poster: "/media/stef-selected-work/stef-film-01.jpg",
  },
  {
    vimeoId: "1070832290",
    order: 2,
    title: "Film 02",
    poster: "/media/stef-selected-work/stef-film-02.jpg",
  },
  {
    vimeoId: "423787947",
    order: 3,
    title: "Film 03",
    poster: "/media/stef-selected-work/stef-film-03.jpg",
  },
  {
    vimeoId: "1036039287",
    order: 4,
    title: "Film 04",
    poster: "/media/stef-selected-work/stef-film-04.jpg",
  },
];

export function vimeoEmbedUrl(vimeoId: string): string {
  return `https://player.vimeo.com/video/${vimeoId}`;
}

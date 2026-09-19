# Instinct Studio

A premium contemporary sports storytelling studio. Cinematic branded short
films centred on athletes. Built with Next.js (App Router) and TypeScript —
no external CMS or database, all content lives in `src/data/*`.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- Plain CSS: design tokens in `src/app/globals.css`, CSS Modules per
  component/page. No UI framework or CSS-in-JS.
- Fonts loaded via `next/font/google` — self-hosted at build time, no
  render-blocking external font requests:
  - **Archivo** (weights 700–900) — all display/headline typography.
  - **Inter** — body copy and interface text (nav, buttons, form fields).
  - **IBM Plex Mono** — metadata (eyebrows, film year/duration, process
    step numbers).
- No database: all content is TypeScript data under `src/data/`.

## Design system

- **Palette** — deep black/graphite, white/silver, with electric blue as a
  single deliberate signal color. Tokens in `src/app/globals.css`:
  `--is-black`, `--is-black-soft`, `--is-graphite`, `--is-white`,
  `--is-silver`, `--is-silver-dim`, `--is-blue`, `--is-blue-bright`,
  `--is-line`, `--is-line-strong`. No serif type anywhere; no brown/orange.
- **Typography** — uppercase, heavy-weight Archivo for every headline (`.display`,
  `.display--xl/lg/md`), Inter for body/UI, IBM Plex Mono for metadata
  (`.eyebrow`, `.meta`).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (next/core-web-vitals + TypeScript)
```

There is no automated test suite (no Jest/Vitest/Playwright installed).
`npm run lint` and `npm run build` (which runs the TypeScript compiler) are
the current correctness checks; see "QA" below for the manual pass done on
this redesign.

## Project structure

```
src/
  app/
    page.tsx              home (Hero -> Prime Videos -> statement -> team -> creative mind -> services -> contact)
    films/page.tsx        films index — the six Prime Videos, in order
    films/[slug]/page.tsx film detail — generateStaticParams(primeVideos), notFound() for anything else
    studio/page.tsx
    process/page.tsx
    collaborate/
      page.tsx
      actions.ts          server action for the contact form
    sitemap.ts, robots.ts — built from primeVideos only
    layout.tsx            fonts, nav/footer, global metadata, JSON-LD
    globals.css           design tokens + base styles
  components/
    Hero.tsx / .module.css     full-bleed cinematic homepage hero
    Nav.tsx / .module.css      transparent-to-solid scroll nav, full-screen mobile panel
    Footer.tsx
    FilmCard.tsx                Prime Video card: local poster, title, "Prime Video" label, play icon
    FilmPlayer.tsx               click-to-play: poster + play button until clicked, then the embed
    TeamMemberCard.tsx           real portraits, hides gracefully if a file is missing
    ProcessStep.tsx
    ContactForm.tsx
    Reveal.tsx                   scroll-triggered fade-up (respects prefers-reduced-motion)
    ServicesFilmWall.tsx         "What We Create" — the Moving Film Wall (see below)
    FilmFrame.tsx / .module.css  reusable asymmetric wall frame: entrance reveal + parallax + hover
    StefChapter.tsx / .module.css       "Selected Director's Work" chapter intro + sequence
    StefFilmFrame.tsx / .module.css     one Stef Szary film frame (number, title, credit, play)
    VimeoModal.tsx / .module.css        accessible on-site Vimeo playback modal
    creative-mind/               "Inside the Creative Mind" — see below
      CreativeMindSection.tsx / .module.css   top-level section: intro, signature notes, collage
      StageBlock.tsx / .module.css            one of the four stages (number, title, visuals, notes)
      InstinctNucleus.tsx / .module.css       the central "INSTINCT" word + glow
      ConnectorPath.tsx / .module.css         electric-blue connector (SVG desktop / line mobile)
  data/
    prime-videos.ts        the six YouTube videos — see "Prime Videos" below
    team.ts, services.ts, process.ts, site.ts
    stef-films.ts           the four Stef Szary Vimeo films — see "Moving Film Wall" below
    creative-mind.ts        "Inside the Creative Mind" copy + per-stage asset data
  lib/media.ts             publicFileExists() — used to hide (never placeholder) missing media
  lib/motion.ts            prefersReducedMotion() — shared reduced-motion check
  lib/useInView.ts         shared one-shot IntersectionObserver reveal hook
public/
  assets/hero/             instinct-studio-hero.png (live), instinct-studio-hero-reference.png (composition reference only, never rendered)
  assets/team/             real portraits: dominique-soucy.png, stefan-szary.jpeg, neil-frisby.png, youri-hainz.jpeg
  media/creative-mind/     film/paper stills + handwritten notes for "Inside the Creative Mind" — see below
  media/posters/           prime-video-01..06.png — the six custom cinematic posters (see mapping table below)
  media/stef-selected-work/  intended home for the 4 real Vimeo thumbnails (not yet added — see below)
  media/videos/            festival-kaz.mp4 — kept in the repo but never loaded, linked or
                           displayed by the site; the six Prime Videos are YouTube-hosted only
```

## Editing content

- **Films (Prime Videos)** — `src/data/prime-videos.ts`.
- **Team** — `src/data/team.ts` (three founders + the Art Director in
  Residence).
- **Services / Moving Film Wall** — `src/data/services.ts`.
- **Selected Director's Work (Stef Szary films)** — `src/data/stef-films.ts`.
- **Inside the Creative Mind** — `src/data/creative-mind.ts`.
- **Process / method** — `src/data/process.ts`.
- **Site-wide config** (name, taglines, nav, social links, contact email) —
  `src/data/site.ts`.

## Prime Videos

The site shows **exactly six films, all hosted on YouTube** — no local
video files, no other films, no placeholders. Everything is driven by one
file:

```ts
// src/data/prime-videos.ts
export const primeVideoIds = [
  "yczX4OfLZEE",
  "hPLfmAOFkKc",
  "jeLplJNxUiQ",
  "KDz1gF3xGPE",
  "N4ec8bJfsoc",
  "JgSlbz9942M",
] as const;
```

That array is the single source of truth. `primeVideos` (derived from it)
drives the homepage "Prime Videos" section, the `/films` index, every
`/films/[slug]` route (statically generated, one per ID), and
`sitemap.xml` — nothing else is reachable through any of those. Requesting
an ID that isn't in the array (including every previous film's old slug,
e.g. `/films/festival-x-kaz`) renders the site's standard not-found page.

**No YouTube API key is required.** Playback uses the public
`youtube-nocookie.com/embed/<id>` URL directly — a plain HTTPS request, not
an API call. Thumbnails are custom local images (below), not
YouTube-generated ones.

### Poster mapping

Each video's thumbnail is a real cinematic photo — not a YouTube-generated
frame — copied from the originally uploaded file into a stable path:

| Prime Video | YouTube ID | Original thumb file | Public poster path |
| ----------- | ---------- | -------------------- | ------------------- |
| 01 | `yczX4OfLZEE` | `thumb 1.png` | `public/media/posters/prime-video-01.png` |
| 02 | `hPLfmAOFkKc` | `thumb 2.png` | `public/media/posters/prime-video-02.png` |
| 03 | `jeLplJNxUiQ` | `thumb 3.png` | `public/media/posters/prime-video-03.png` |
| 04 | `KDz1gF3xGPE` | `thumb 4.png` | `public/media/posters/prime-video-04.png` |
| 05 | `N4ec8bJfsoc` | `thumb 5.png` | `public/media/posters/prime-video-05.png` |
| 06 | `JgSlbz9942M` | `thumb 6.png` | `public/media/posters/prime-video-06.png` |

The original `thumb N.png` files are still at the repository root,
untouched — the files under `public/media/posters/` are copies. The
mapping (and every other per-video field) lives in the `posters` map in
`src/data/prime-videos.ts`.

### How it renders

- **Cards** (homepage + `/films` index) show only the static local poster
  (`FilmCard.tsx`), the title, a "Prime Video" label and a play icon on
  hover/focus — never a video element or iframe. No YouTube player ever
  loads from a card; clicking one navigates to that film's own page.
- **The film page** (`/films/[slug]`) shows the same poster full-size with
  a persistent play button (`FilmPlayer.tsx`) until the visitor clicks it.
  Only then does it mount the real embed, replacing the poster in the same
  16:9, border-free frame — so nothing shifts and no player exists in the
  page until that explicit click:
  ```tsx
  <iframe
    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&playsinline=1`}
    title={`${title} — full film`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
  ```
  No `autoplay` parameter is set either, so playback only ever starts from
  a visitor's own click inside the embedded player — audio never starts on
  its own, and the visitor is never redirected to youtube.com.

### Replacing a video

Edit `primeVideoIds` in `src/data/prime-videos.ts` — swap the ID at the
position you want to change, then add a matching entry for that new ID in
both the `confirmedTitles` map (the real title if known, otherwise `null`
to show "Prime Video 0N" — never invent one) and the `posters` map (a real
image under `public/media/posters/`, never a placeholder).

### Changing the order

The array order in `primeVideoIds` **is** the display order everywhere
(cards, `/films`, sitemap, and the next-project link at the bottom of each
film page cycles through the six in this same order).

### Selecting the featured video

```ts
// src/data/prime-videos.ts
export const featuredVideoId: PrimeVideoId = primeVideoIds[0];
```

Set this to any of the six IDs to make that one the larger "featured" card
on the homepage; the other five render in the secondary grid.

## Moving Film Wall ("What We Create")

The homepage services section (`ServicesFilmWall.tsx`) is an asymmetric wall of
`FilmFrame` components — alternating full/wide/tall sizes, directional
scroll-reveal, a slight image parallax, a grayscale→color hover, a static
film-grain overlay, and a "0N/08" frame number. Frame content lives in
`src/data/services.ts` (`filmWallFrames`, split into `filmWallBeforeStef` /
`filmWallAfterStef`). Each frame's image is a real photo already used
elsewhere on the site (the hero photo and the six Prime Video posters) —
never a generic stock placeholder.

### Selected Director's Work — Stef Szary chapter

After the first two service frames, `StefChapter.tsx` presents four films
from **Stef Szary's own directing portfolio** (not Instinct Studio
productions) hosted on Vimeo. Every film frame (`StefFilmFrame.tsx`) carries
the mandatory credit — "Selected Director's Work" / "Directed by Stef
Szary" — and playback opens in an accessible on-site modal
(`VimeoModal.tsx`: focus-trapped, Escape closes, focus restores to the
trigger, unmounts on close so playback stops, never autoplays, never
redirects to vimeo.com).

Film data lives in `src/data/stef-films.ts`. Posters are real frames
supplied directly (not fetched from Vimeo) and copied into stable public
paths, one per film, each with its own `objectPosition` tuned so the
subject is never cropped:

```ts
export const stefFilms: StefFilm[] = [
  { vimeoId: "1137745395", order: 1, title: "Film 01", poster: "/media/stef-selected-work/stef-film-01-georgia-ellenwood.png", objectPosition: "center center" },
  { vimeoId: "1070832290", order: 2, title: "Film 02", poster: "/media/stef-selected-work/stef-film-02-snowmobile.png",        objectPosition: "center center" },
  { vimeoId: "423787947",  order: 3, title: "Film 03", poster: "/media/stef-selected-work/stef-film-03-desert.png",            objectPosition: "65% center" },
  { vimeoId: "1036039287", order: 4, title: "Film 04", poster: "/media/stef-selected-work/stef-film-04-helly-hansen.png",      objectPosition: "70% center" },
];
```

Each poster is shown in full color at all times (no grayscale, no strong
overlay) via `next/image` with `fill` + `object-fit: cover`, a consistent
16:9 aspect ratio across all four frames, and a light bottom scrim only for
text legibility. `StefFilmFrame` still checks `publicFileExists()` and
falls back to a plain "Film 0N" text panel — never a broken image or a
generic placeholder — if a poster file is ever missing.

**Known gap — Vimeo titles/durations.** This environment's network policy
blocks `vimeo.com` (confirmed via both `WebFetch` and a raw `curl` CONNECT,
`403`), so Vimeo's oEmbed endpoint
(`https://vimeo.com/api/oembed.json?url=...`) could not be reached to
confirm real titles or durations for any of the four films. Per spec,
nothing was guessed: each film shows the required "Film 0N" fallback title
and no duration badge. To finish this from a machine that can reach Vimeo,
fetch `https://vimeo.com/api/oembed.json?url=<vimeo-url>` for each film and
update `title` (and `duration`, formatted `m:ss`) in `stef-films.ts` for any
whose real title was confirmed — leave any unconfirmed one on its "Film 0N"
fallback rather than guessing.

## Inside the Creative Mind ("How We Think")

The homepage's "How We Think" section (previously a plain four-column
"From Raw Instinct to Cultural Signal" list) is now a layered, interactive
composition — `CreativeMindSection.tsx` — built from real film/paper stills
and handwritten creative notes, following an approved maquette supplied as
`Instinct_Studio_Inside_The_Creative_Mind_Assets.zip` (kept at the repo
root as the permanent source reference; the maquette and layout-reference
compositions inside it are never loaded in production — only the 11
individual film/paper assets and 15 handwritten-note assets under
`public/media/creative-mind/` are).

**Structure** — one `INSTINCT` nucleus (live text, central) plus four
stages, each with a number, title and description (all live HTML text),
a main visual, a secondary visual, 0–2 extra visuals and 1–3 decorative
handwritten notes:

| Stage | Zone (desktop) | Main visual | Secondary visual |
| --- | --- | --- | --- |
| 01 Human Truth | Left | athlete portrait | track start |
| 02 Signal | Upper centre | storyboard sequence | human-truth diagram |
| 03 Visual Language | Lower centre | movement contact sheet | camera-sketch note |
| 04 Cultural Impact | Right | backlit athlete | stadium camera frame |

Three more notes ("More than film.", "Sport lives in people.", "Ideas move
the world.") frame the section itself, not tied to one stage.

**Responsive strategy** — a single DOM tree (no duplicated markup per
breakpoint) with `CreativeMindSection.module.css`'s `.collage` switching
`grid-template-areas`: a plain vertical stack on mobile (intro → INSTINCT →
Human Truth → Signal → Visual Language → Cultural Impact), a two-row 2-column
editorial grid on tablet (Human Truth+Signal, then INSTINCT full-width, then
Visual Language+Cultural Impact), and an asymmetric 12-column grid on desktop
(Human Truth and Cultural Impact as tall side columns, Signal/INSTINCT/Visual
Language stacked in the center). A handful of secondary film stills and notes
carry `minBreakpoint: "desktop"` in `creative-mind.ts` and are `display:none`
below 1024px — since Next.js images lazy-load on intersection, a hidden image
never fetches, so there are no duplicate or wasted requests across
breakpoints.

**Motion** — each stage and the nucleus fade/slide in once via
`useInView` (`src/lib/useInView.ts`), matching `Reveal.tsx`'s existing
one-shot `IntersectionObserver` pattern. `ConnectorPath.tsx` draws three
electric-blue SVG segments (Human Truth→Signal→Visual Language→Cultural
Impact) as each next stage scrolls into view; below 1024px it swaps to a
single always-visible vertical line running the length of the sequence.
Paper notes carry a fixed 2–4° rotation (`rotate` in the data); hovering
any visual on desktop brings it forward, brightens it and reveals its stage
name as a small label. Everything respects `prefers-reduced-motion`
(reveals render fully visible immediately, the SVG path is pre-drawn).

**Accessibility** — the 15 handwritten-note images and the 3 section-framing
statements are `aria-hidden` with empty `alt`; each stage's actual meaning is
carried by its live title/description plus a `sr-only` `notesSummary`
paragraph transcribing its notes' text. The 11 film/paper stills carry
real descriptive `alt` text (they're informative, not decorative). Nothing
in the section is a link or button — it's read as prose/imagery, not a
navigation menu, so keyboard Tab passes over it without stopping.

### `festival-kaz.mp4`

The file stays in the repository at `public/media/videos/festival-kaz.mp4`
for reference, but nothing in the app imports, links to or serves it — it
is not part of the Prime Videos system and is unreachable from the public
site.

### Adding/replacing a portrait

Drop the file at the path already referenced in `src/data/team.ts`
(`portraitSrc`, e.g. `/assets/team/dominique-soucy.png`) — any raster format
works. `TeamMemberCard`, `ResidentStrip` and the Studio page all call
`publicFileExists()` (`src/lib/media.ts`) at render time and **hide the
portrait area entirely** (never a placeholder graphic) if the file isn't
there yet. All four real portraits are currently in place.

### Configuring the contact form

`src/app/collaborate/actions.ts` is a Next.js Server Action. It reads
`CONTACT_FORM_ENDPOINT` **server-side only** (never `NEXT_PUBLIC_*`) and
POSTs the form as JSON when it's set:

```bash
CONTACT_FORM_ENDPOINT=https://your-intake-service.example.com/inquiries
```

If unset, the form still renders and validates, but submitting shows a
message pointing to the fallback email in `src/data/site.ts`
(`contactEmail`) — the site never posts to a non-existent destination.

## Environment variables

See `.env.example`:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No (has a fallback) | Base URL used in metadata, Open Graph tags and `sitemap.xml`. Not yet set to a real domain. |
| `CONTACT_FORM_ENDPOINT` | No | Server-only. If set, the Collaborate form POSTs JSON here. If unset, the form shows an email fallback instead. |

## Deployment

Standard Next.js app — deploy anywhere that supports it (Vercel, or any
Node host via `npm run build && npm run start`). Set the environment
variables above in your hosting provider's dashboard.

## SEO

- Per-page `<title>`/description via the Metadata API. Each film page's
  Open Graph image is that video's own local poster; the site-wide default
  is the real hero photo (`/assets/hero/instinct-studio-hero.png`).
- `src/app/sitemap.ts` and `src/app/robots.ts` are generated from
  `primeVideos`, so the sitemap's `/films/*` entries are exactly the six
  Prime Video routes — nothing else.
- `ProfessionalService` JSON-LD structured data in the root layout.
- Favicon (`src/app/icon.svg`) is a temporary "IS" monogram in the brand
  blue, since no studio logo exists in the repo.

## What's still open

- **Stef Szary Vimeo titles/durations** — see "Moving Film Wall" above.
  `vimeo.com` is blocked by this environment's network egress policy, so all
  four films still show the "Film 0N" fallback title (real posters are in
  place).
- Four of the six Prime Video titles couldn't be reliably confirmed
  (`hPLfmAOFkKc`, `KDz1gF3xGPE`, `N4ec8bJfsoc`, `JgSlbz9942M`) and show as
  "Prime Video 0N" rather than a guessed title. Add the real title to
  `confirmedTitles` in `src/data/prime-videos.ts` once it's confirmed.
- **`contactEmail`** in `src/data/site.ts` (`hello@instinctstudio.studio`)
  and **`NEXT_PUBLIC_SITE_URL`** are not yet the studio's real address/domain.
- **Instagram/Vimeo links** in `src/data/site.ts` (`socialLinks`) are empty
  on purpose — the footer only renders a link once a URL is filled in.
- Do not commit HD video files (e.g. re-adding local MP4s) to this
  repository — the Prime Videos system is YouTube-hosted specifically to
  avoid that; `public/media/videos/festival-kaz.mp4` is kept only as an
  inert reference file.
- `public/assets/hero/instinct-studio-hero-reference.png` is kept in the
  repo as the original composition reference only. It is never imported or
  linked anywhere in the app — the live hero uses
  `instinct-studio-hero.png`.

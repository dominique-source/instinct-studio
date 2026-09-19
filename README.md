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
    page.tsx              home (Hero -> Prime Videos -> statement -> team -> method -> services -> contact)
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
    FilmCard.tsx                Prime Video card: YouTube thumbnail, title, "Prime Video" label, play icon
    TeamMemberCard.tsx           real portraits, hides gracefully if a file is missing
    ProcessStep.tsx
    ContactForm.tsx
    Reveal.tsx                   scroll-triggered fade-up (respects prefers-reduced-motion)
  data/
    prime-videos.ts        the six YouTube videos — see "Prime Videos" below
    team.ts, services.ts, process.ts, site.ts
  lib/media.ts             publicFileExists() — used to hide (never placeholder) missing media
public/
  assets/hero/             instinct-studio-hero.png (live), instinct-studio-hero-reference.png (composition reference only, never rendered)
  assets/team/             real portraits: dominique-soucy.png, stefan-szary.jpeg, neil-frisby.png, youri-hainz.jpeg
  media/videos/            festival-kaz.mp4 — kept in the repo but never loaded, linked or
                           displayed by the site; the six Prime Videos are YouTube-hosted only
```

## Editing content

- **Films (Prime Videos)** — `src/data/prime-videos.ts`.
- **Team** — `src/data/team.ts` (three founders + the Art Director in
  Residence).
- **Services** — `src/data/services.ts`.
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
`youtube-nocookie.com/embed/<id>` URL directly; thumbnails use the public
`i.ytimg.com/vi/<id>/maxresdefault.jpg` URL directly. Both are plain HTTPS
requests, not API calls.

### How it renders

- **Cards** (homepage + `/films` index) show only a static YouTube
  thumbnail (`FilmCard.tsx`), the title, a "Prime Video" label and a play
  icon on hover/focus — never a video element or iframe. No YouTube player
  ever loads until a visitor clicks through to a film's own page.
- **Thumbnails** try `maxresdefault.jpg` first and fall back to
  `hqdefault.jpg` (which always exists) if the high-res one 404s, via the
  `onError` handler in `FilmCard.tsx`.
- **The film page** (`/films/[slug]`) embeds the real player in a 16:9,
  border-free frame:
  ```tsx
  <iframe
    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&playsinline=1`}
    title={`${title} — full film`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
  ```
  No `autoplay` parameter is set, so nothing plays until the visitor
  presses play inside the embedded player — audio never starts on its own.
  `next.config.ts` allowlists `i.ytimg.com` under `images.remotePatterns`
  so `next/image` can optimize the thumbnails.

### Replacing a video

Edit `primeVideoIds` in `src/data/prime-videos.ts` — swap the ID at the
position you want to change. If you know the real title, add it to the
`confirmedTitles` map keyed by that same ID; otherwise leave it `null` and
the site shows "Prime Video 0N" (never invent a title, client, athlete,
credit or date).

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
  Open Graph image is that video's own YouTube thumbnail; the site-wide
  default is the real hero photo (`/assets/hero/instinct-studio-hero.png`).
- `src/app/sitemap.ts` and `src/app/robots.ts` are generated from
  `primeVideos`, so the sitemap's `/films/*` entries are exactly the six
  Prime Video routes — nothing else.
- `ProfessionalService` JSON-LD structured data in the root layout.
- Favicon (`src/app/icon.svg`) is a temporary "IS" monogram in the brand
  blue, since no studio logo exists in the repo.

## What's still open

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

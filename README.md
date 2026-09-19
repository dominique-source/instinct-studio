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
    page.tsx              home (Hero -> films -> statement -> team -> method -> services -> contact)
    films/page.tsx        films index — publishedFilms only
    films/[slug]/page.tsx film detail — generateStaticParams(publishedFilms), notFound() otherwise
    studio/page.tsx
    process/page.tsx
    collaborate/
      page.tsx
      actions.ts          server action for the contact form
    sitemap.ts, robots.ts — built from publishedFilms
    layout.tsx            fonts, nav/footer, global metadata, JSON-LD
    globals.css           design tokens + base styles
  components/
    Hero.tsx / .module.css     full-bleed cinematic homepage hero
    Nav.tsx / .module.css      transparent-to-solid scroll nav, full-screen mobile panel
    Footer.tsx
    FilmCard.tsx                cinematic film card (poster or muted video preview)
    TeamMemberCard.tsx           real portraits, hides gracefully if a file is missing
    ProcessStep.tsx
    ContactForm.tsx
    Reveal.tsx                   scroll-triggered fade-up (respects prefers-reduced-motion)
  data/                    films.ts, team.ts, services.ts, process.ts, site.ts
  lib/media.ts             publicFileExists() — used to hide (never placeholder) missing media
public/
  assets/hero/             instinct-studio-hero.png (live), instinct-studio-hero-reference.png (composition reference only, never rendered)
  assets/team/             real portraits: dominique-soucy.png, stefan-szary.jpeg, neil-frisby.png, youri-hainz.jpeg
  media/videos/            festival-kaz.mp4 (the one published film)
```

## Editing content

- **Films** — `src/data/films.ts`.
- **Team** — `src/data/team.ts` (three founders + the Art Director in
  Residence).
- **Services** — `src/data/services.ts`.
- **Process / method** — `src/data/process.ts`.
- **Site-wide config** (name, taglines, nav, social links, contact email) —
  `src/data/site.ts`.

### How publishing works — no placeholders, ever

A film only appears in the films index, the homepage, `/films/[slug]`, and
the sitemap once it has **real media** — a `videoUrl` and/or a `poster`
image. This is computed automatically:

```ts
// src/data/films.ts
export function isPublished(film: Film): boolean {
  return Boolean(film.videoUrl) || Boolean(film.poster);
}
```

Everything else stays in the data file, unpublished, with no visible trace
on the site (no "coming soon" cards, no placeholder posters). Today only
**Festival × Kaz** (`festival-x-kaz`) is published — it has a real video at
`public/media/videos/festival-kaz.mp4`. The other nine entries are fully
written (title, category, synopsis, studio role) and ready — they just need
real media.

### Adding/activating a film

1. Find or add its entry in the `films` array in `src/data/films.ts`.
2. Add a real video and/or poster:
   - **Video**: drop a file under `public/media/videos/` and set
     `videoUrl: "/media/videos/<file>.mp4"`. Use a standard H.264/AAC MP4 —
     universally playable, no autoplay audio (the `<video>` element never
     sets `autoplay`).
   - **Poster**: drop an image under `public/media/posters/` (16:9, e.g.
     1600×900) and set `poster: "/media/posters/<file>.jpg"`.
3. The film immediately appears in `/films`, the homepage "Selected films"
   section (if `featured: true`), `/films/<slug>` (statically generated),
   and `sitemap.xml` — no other code changes needed.
4. Only fill in `athlete`, `client`, `year`, `duration` and `credits` once
   confirmed. The detail page only renders fields that have a value, so it
   never shows an invented fact.
5. **Card behavior**: if a film has a poster, the card shows it. If it has
   a video but no poster, the card shows the video itself — a static frame
   at rest (seeked to ~0.4s so something always renders, since a bare
   `<video>` paints black until told to show a frame), then plays muted on
   hover/focus (skipped entirely if the visitor prefers reduced motion).

### Adding/replacing a portrait

Drop the file at the path already referenced in `src/data/team.ts`
(`portraitSrc`, e.g. `/assets/team/dominique-soucy.png`) — any raster format
works. `TeamMemberCard`, `ResidentStrip` and the Studio page all call
`publicFileExists()` (`src/lib/media.ts`) at render time and **hide the
portrait area entirely** (never a placeholder graphic) if the file isn't
there yet. All four real portraits are currently in place.

### Connecting a hosted video (Vimeo/Mux/Cloudflare Stream/YouTube)

`videoUrl` on a `Film` is rendered as a native `<video src=... controls>` on
the detail page and as a hover-preview `<video>` on the card. For a
platform that doesn't expose a direct file URL:

- **Vimeo / YouTube (unlisted)**: embed via `<iframe>` instead — swap the
  `<video>` element in `src/app/films/[slug]/page.tsx` for an iframe embed
  when `videoUrl` is a platform URL rather than a direct file.
- **Mux / Cloudflare Stream**: use their direct playback URL as `videoUrl`
  (works as-is with the native `<video>` element), or embed their player
  the same way as above for adaptive bitrate.

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

- Per-page `<title>`/description via the Metadata API. Open Graph/Twitter
  image is the real hero photo (`/assets/hero/instinct-studio-hero.png`).
- `src/app/sitemap.ts` and `src/app/robots.ts` are generated from
  `publishedFilms`, so an unpublished film never gets indexed.
- `ProfessionalService` JSON-LD structured data in the root layout.
- Favicon (`src/app/icon.svg`) is a temporary "IS" monogram in the brand
  blue, since no studio logo exists in the repo.

## What's still open

- **Nine films remain unpublished** (no real video/poster yet): PürInstinct
  Games, PürInstinct × Manmade, Learn PürInstinct, PürInstinct Festival,
  INSTINCT (EN/FR), PürInstinct Pilot, PürInstinct Session, Un Sport Pur.
  They're fully written in `src/data/films.ts` — see "Adding/activating a
  film" above.
- **`contactEmail`** in `src/data/site.ts` (`hello@instinctstudio.studio`)
  and **`NEXT_PUBLIC_SITE_URL`** are not yet the studio's real address/domain.
- **Instagram/Vimeo links** in `src/data/site.ts` (`socialLinks`) are empty
  on purpose — the footer only renders a link once a URL is filled in.
- **Athlete/client/year/duration/credits** are intentionally blank across
  every film — none were confirmed, so none were invented.
- `public/assets/hero/instinct-studio-hero-reference.png` is kept in the
  repo as the original composition reference only. It is never imported or
  linked anywhere in the app — the live hero uses
  `instinct-studio-hero.png`.

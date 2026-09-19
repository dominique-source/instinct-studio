import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { publishedFilms, getFilmBySlug, getNextFilm } from "@/data/films";

export function generateStaticParams() {
  return publishedFilms.map((film) => ({ slug: film.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = getFilmBySlug(slug);

  if (!film) {
    return { title: "Film not found" };
  }

  return {
    title: film.title,
    description: film.synopsis,
    openGraph: {
      title: film.title,
      description: film.synopsis,
      ...(film.poster ? { images: [{ url: film.poster }] } : {}),
    },
  };
}

export default async function FilmPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = getFilmBySlug(slug);

  if (!film) {
    notFound();
  }

  const nextFilm = getNextFilm(film);

  const facts: Array<[string, string | undefined]> = [
    ["Category", film.category],
    ["Athlete", film.athlete],
    ["Client / organization", film.client],
    ["Language", film.language],
    ["Year", film.year ? String(film.year) : undefined],
    ["Duration", film.duration],
  ];

  return (
    <article className="section">
      <div className="container">
        <div className={styles.playerFrame}>
          {film.videoUrl ? (
            <video
              className={styles.playerVideo}
              src={film.videoUrl}
              poster={film.poster || undefined}
              controls
              playsInline
              preload="metadata"
              aria-label={`${film.title} — full film`}
            />
          ) : (
            film.poster && (
              <Image
                src={film.poster}
                alt=""
                className={styles.playerImage}
                fill
                sizes="100vw"
                priority
              />
            )
          )}
        </div>

        <header className={styles.header}>
          <div>
            <p className="eyebrow">{film.subtitle}</p>
            <h1 className={`display display--lg ${styles.title}`}>{film.title}</h1>
          </div>

          <dl className={styles.factList}>
            {facts
              .filter(([, value]) => Boolean(value))
              .map(([label, value]) => (
                <div className={styles.factItem} key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
        </header>

        <div className={styles.body}>
          <div>
            <h2 className="display display--md">Synopsis</h2>
            <p className={styles.synopsis}>{film.synopsis}</p>

            <div className={styles.roleBlock}>
              <h2 className="display display--md">Instinct Studio&apos;s role</h2>
              <p className={styles.synopsis}>{film.studioRole}</p>
            </div>
          </div>

          {film.credits.length > 0 && (
            <div>
              <h2 className="display display--md">Credits</h2>
              <ul className={styles.creditsList}>
                {film.credits.map((credit) => (
                  <li key={`${credit.role}-${credit.name}`}>
                    <span className="meta">{credit.role}</span>
                    <span>{credit.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {nextFilm && (
        <div className={styles.nextSection}>
          <div className="container">
            <Link href={`/films/${nextFilm.slug}`} className={styles.nextLink}>
              <div>
                <p className="eyebrow">Next project</p>
                <p className={`display display--md ${styles.nextTitle}`}>
                  {nextFilm.title}
                </p>
              </div>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}

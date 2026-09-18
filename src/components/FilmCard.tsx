import Link from "next/link";
import Image from "next/image";
import styles from "./FilmCard.module.css";
import type { Film } from "@/data/films";

export function FilmCard({
  film,
  featured = false,
}: {
  film: Film;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/films/${film.slug}`}
      className={`${styles.card} ${featured ? styles["card--featured"] : ""}`}
    >
      <div className={styles.mediaWrap}>
        <Image
          src={film.poster}
          alt=""
          className={styles.poster}
          width={1600}
          height={900}
          loading="lazy"
          unoptimized
        />
        {!film.videoUrl && <span className={styles.badge}>Film coming soon</span>}
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{film.title}</p>
        <p className={styles.category}>{film.subtitle}</p>
      </div>
    </Link>
  );
}

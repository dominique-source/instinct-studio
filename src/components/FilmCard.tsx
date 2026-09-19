import Link from "next/link";
import Image from "next/image";
import styles from "./FilmCard.module.css";
import type { PrimeVideo } from "@/data/prime-videos";

export function FilmCard({
  video,
  featured = false,
  priority = false,
}: {
  video: PrimeVideo;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/films/${video.slug}`}
      className={`${styles.card} ${featured ? styles["card--featured"] : ""}`}
    >
      <div className={styles.mediaWrap}>
        <Image
          src={video.poster}
          alt=""
          className={styles.media}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority={priority}
        />
        <span className={styles.playIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M5 3.5v11l10-5.5z" fill="currentColor" />
          </svg>
        </span>
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{video.title}</p>
        <p className={styles.subtitle}>Prime Video</p>
      </div>
    </Link>
  );
}

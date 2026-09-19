"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./FilmCard.module.css";
import type { Film } from "@/data/films";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function FilmCard({
  film,
  featured = false,
}: {
  film: Film;
  featured?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideoPreview = Boolean(film.videoUrl) && !film.poster;

  const STILL_FRAME_TIME = 0.4;

  const play = () => {
    if (prefersReducedMotion()) return;
    videoRef.current?.play().catch(() => {});
  };

  const pause = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = STILL_FRAME_TIME;
  };

  const showStillFrame: React.ReactEventHandler<HTMLVideoElement> = (event) => {
    event.currentTarget.currentTime = STILL_FRAME_TIME;
  };

  const metaLine = [film.year ? String(film.year) : null, film.duration]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/films/${film.slug}`}
      className={`${styles.card} ${featured ? styles["card--featured"] : ""}`}
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
    >
      <div className={styles.mediaWrap}>
        {film.poster ? (
          <Image
            src={film.poster}
            alt=""
            className={styles.media}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        ) : showVideoPreview ? (
          <video
            ref={videoRef}
            className={styles.media}
            src={film.videoUrl}
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={showStillFrame}
            aria-hidden="true"
          />
        ) : null}
        {Boolean(film.videoUrl) && (
          <span className={styles.playIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M5 3.5v11l10-5.5z" fill="currentColor" />
            </svg>
          </span>
        )}
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{film.title}</p>
        <p className={styles.subtitle}>{film.subtitle}</p>
        {metaLine && <p className={styles.meta}>{metaLine}</p>}
      </div>
    </Link>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./FilmPlayer.module.css";
import { youtubeEmbedUrl } from "@/data/prime-videos";

export function FilmPlayer({
  youtubeId,
  poster,
  title,
}: {
  youtubeId: string;
  poster: string;
  title: string;
}) {
  const [started, setStarted] = useState(false);

  return (
    <div className={styles.frame}>
      {started ? (
        <iframe
          className={styles.iframe}
          src={youtubeEmbedUrl(youtubeId)}
          title={`${title} — full film`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={poster}
            alt=""
            className={styles.poster}
            fill
            sizes="100vw"
            priority
          />
          <button
            type="button"
            className={styles.trigger}
            onClick={() => setStarted(true)}
            aria-label={`Play ${title}`}
          >
            <span className={styles.playIcon} aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 18 18">
                <path d="M5 3.5v11l10-5.5z" fill="currentColor" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
}

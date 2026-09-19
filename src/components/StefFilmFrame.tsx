"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./StefFilmFrame.module.css";
import type { StefFilm } from "@/data/stef-films";

const sizeClass: Record<"large" | "narrow" | "near-full" | "closing", string> = {
  large: styles.large,
  narrow: styles.narrow,
  "near-full": styles["near-full"],
  closing: styles.closing,
};

export function StefFilmFrame({
  film,
  size,
  hasPoster,
  onPlay,
}: {
  film: StefFilm;
  size: "large" | "narrow" | "near-full" | "closing";
  hasPoster: boolean;
  onPlay: () => void;
}) {
  const frameRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={frameRef}
      type="button"
      onClick={onPlay}
      className={[styles.frame, sizeClass[size], isVisible ? styles.isVisible : ""]
        .filter(Boolean)
        .join(" ")}
      aria-label={`Play ${film.title} — directed by Stef Szary`}
    >
      <span className={styles.number}>
        {String(film.order).padStart(2, "0")}/04
      </span>
      {film.duration && <span className={styles.duration}>{film.duration}</span>}

      {hasPoster ? (
        <Image
          src={film.poster}
          alt=""
          fill
          sizes="(min-width: 900px) 70vw, 100vw"
          className={styles.poster}
        />
      ) : (
        <div className={styles.fallback} aria-hidden="true">
          {film.title}
        </div>
      )}

      <div className={styles.scrim} aria-hidden="true" />

      <span className={styles.playIcon} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M5 3.5v11l10-5.5z" fill="currentColor" />
        </svg>
      </span>

      <div className={styles.content}>
        <span className={styles.eyebrowCredit}>Selected Director&rsquo;s Work</span>
        <h3 className={styles.title}>{film.title}</h3>
        <p className={styles.credit}>Directed by Stef Szary</p>
      </div>
    </button>
  );
}

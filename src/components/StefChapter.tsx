"use client";

import { useState } from "react";
import styles from "./StefChapter.module.css";
import { StefFilmFrame } from "./StefFilmFrame";
import { VimeoModal } from "./VimeoModal";
import { stefFilms } from "@/data/stef-films";

const sequenceSizes = ["large", "narrow", "near-full", "closing"] as const;

export function StefChapter({ posterFlags }: { posterFlags: boolean[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openFilm = openIndex !== null ? stefFilms[openIndex] : null;

  return (
    <section className={styles.chapter} aria-labelledby="stef-chapter-heading">
      <div className={styles.intro}>
        <p className="eyebrow">Selected Director&rsquo;s Work</p>
        <h2 id="stef-chapter-heading" className={`display display--md ${styles.headline}`}>
          Directed by Stef Szary
        </h2>
        <p className={styles.body}>
          Four films from Stef&rsquo;s directing portfolio. A view into the
          cinematic standard, visual precision and human storytelling he
          brings to Instinct Studio.
        </p>
      </div>

      <div className={styles.sequence}>
        {stefFilms.map((film, index) => (
          <div key={film.vimeoId} className={styles.item}>
            <StefFilmFrame
              film={film}
              size={sequenceSizes[index] ?? "large"}
              hasPoster={posterFlags[index] ?? false}
              onPlay={() => setOpenIndex(index)}
            />
          </div>
        ))}
      </div>

      {openFilm && (
        <VimeoModal
          vimeoId={openFilm.vimeoId}
          title={`${openFilm.title} — Directed by Stef Szary`}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}

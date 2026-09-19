import type { Metadata } from "next";
import styles from "./page.module.css";
import { FilmCard } from "@/components/FilmCard";
import { publishedFilms } from "@/data/films";

export const metadata: Metadata = {
  title: "Films",
  description:
    "Cinematic athlete films, branded short films and sports concepts from Instinct Studio.",
};

export default function FilmsPage() {
  return (
    <div className="section">
      <div className="container">
        <div className={styles.header}>
          <p className="eyebrow">Films</p>
          <h1 className="display display--md">The work, in order.</h1>
        </div>

        <div className={styles.grid}>
          {publishedFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      </div>
    </div>
  );
}

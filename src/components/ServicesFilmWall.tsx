import styles from "./ServicesFilmWall.module.css";
import { FilmFrame } from "./FilmFrame";
import { StefChapter } from "./StefChapter";
import { publicFileExists } from "@/lib/media";
import {
  servicesTitle,
  servicesHeadline,
  servicesSecondaryLine,
  filmWallBeforeStef,
  filmWallAfterStef,
} from "@/data/services";
import { stefFilms } from "@/data/stef-films";

export function ServicesFilmWall() {
  const posterFlags = stefFilms.map((film) => publicFileExists(film.poster));
  const [wideAndTall, standaloneFull, tallAndWide, closing] = [
    filmWallAfterStef.filter((f) => f.number === 3 || f.number === 4),
    filmWallAfterStef.filter((f) => f.number === 5),
    filmWallAfterStef.filter((f) => f.number === 6 || f.number === 7),
    filmWallAfterStef.filter((f) => f.number === 8),
  ];

  return (
    <section className="section" aria-labelledby="services-heading">
      <div className="container">
        <div className={styles.header}>
          <p className="eyebrow">{servicesTitle}</p>
          <h2 id="services-heading" className={`display display--md ${styles.headline}`}>
            {servicesHeadline}
          </h2>
          <p className={styles.secondaryLine}>{servicesSecondaryLine}</p>
        </div>

        <div className={styles.wall}>
          {filmWallBeforeStef.map((frame) => (
            <FilmFrame key={frame.number} frame={frame} href="/films" />
          ))}

          <StefChapter posterFlags={posterFlags} />

          <div className={styles.pair}>
            {wideAndTall.map((frame) => (
              <FilmFrame key={frame.number} frame={frame} href="/films" />
            ))}
          </div>

          {standaloneFull.map((frame) => (
            <FilmFrame key={frame.number} frame={frame} href="/films" />
          ))}

          <div className={styles.pair}>
            {tallAndWide.map((frame) => (
              <FilmFrame key={frame.number} frame={frame} href="/films" />
            ))}
          </div>

          {closing.map((frame) => (
            <FilmFrame key={frame.number} frame={frame} href="/films" />
          ))}
        </div>
      </div>
    </section>
  );
}

import styles from "./ServicesFilmWall.module.css";
import { FilmFrame } from "./FilmFrame";
import { servicesTitle, servicesHeadline, servicesSecondaryLine, filmWallFrames } from "@/data/services";

export function ServicesFilmWall() {
  const opening = filmWallFrames.filter((f) => f.number <= 2);
  const wideAndTall = filmWallFrames.filter((f) => f.number === 3 || f.number === 4);
  const standaloneFull = filmWallFrames.filter((f) => f.number === 5);
  const tallAndWide = filmWallFrames.filter((f) => f.number === 6 || f.number === 7);
  const closing = filmWallFrames.filter((f) => f.number === 8);

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
          {opening.map((frame) => (
            <FilmFrame key={frame.number} frame={frame} href="/films" />
          ))}

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

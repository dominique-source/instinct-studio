import Link from "next/link";
import styles from "./page.module.css";
import { Hero } from "@/components/Hero";
import { FilmCard } from "@/components/FilmCard";
import { Reveal } from "@/components/Reveal";
import { ServicesFilmWall } from "@/components/ServicesFilmWall";
import { CreativeMindSection } from "@/components/creative-mind/CreativeMindSection";
import { FourMindsSection } from "@/components/team/FourMindsSection";
import { site } from "@/data/site";
import { featuredPrimeVideos, secondaryPrimeVideos } from "@/data/prime-videos";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section" aria-labelledby="films-heading">
        <div className="container">
          <div className={styles.filmsHeader}>
            <div>
              <p className="eyebrow">Prime Videos</p>
              <h2 id="films-heading" className="display display--md">
                Six selected films
              </h2>
            </div>
            <Link href="/films" className="btn btn--ghost">
              All films →
            </Link>
          </div>

          {featuredPrimeVideos.length > 0 && (
            <div className={styles.featuredGrid}>
              {featuredPrimeVideos.map((video) => (
                <FilmCard key={video.youtubeId} video={video} featured />
              ))}
            </div>
          )}

          {secondaryPrimeVideos.length > 0 && (
            <div className={styles.secondaryGrid}>
              {secondaryPrimeVideos.map((video) => (
                <FilmCard key={video.youtubeId} video={video} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={`section ${styles.statement}`}>
        <div className="container">
          <Reveal>
            <p className={`display display--lg ${styles.statementText}`}>
              {site.statement.map((line) => (
                <span key={line} className={styles.statementLine}>
                  {line}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>

      <FourMindsSection />

      <CreativeMindSection />

      <ServicesFilmWall />

      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <p className="eyebrow">Collaborate</p>
          <p className={`display display--lg ${styles.ctaStatement}`}>
            BRING US AN ATHLETE, A TENSION OR AN UNFINISHED IDEA. WE WILL FIND
            ITS INSTINCT.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/collaborate" className="btn btn--primary">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

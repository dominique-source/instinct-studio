import Link from "next/link";
import styles from "./page.module.css";
import { ShowreelPlayer } from "@/components/ShowreelPlayer";
import { FilmCard } from "@/components/FilmCard";
import { TeamMemberCard, ResidentStrip } from "@/components/TeamMemberCard";
import { ProcessStepGrid } from "@/components/ProcessStep";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";
import { featuredFilms, secondaryFilms, filmsByOrder } from "@/data/films";
import { founders, resident } from "@/data/team";
import { processTitle, processStatement, processSteps } from "@/data/process";
import { servicesTitle, servicesSubtitle, services } from "@/data/services";

export default function HomePage() {
  const showreelPoster = filmsByOrder[0]?.poster ?? "/media/posters/purinstinct-games.svg";

  return (
    <>
      <section className={styles.hero}>
        <svg
          className={styles.heroLines}
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={i * 220}
              y1="0"
              x2={i * 220 - 260}
              y2="900"
              stroke="var(--is-steel-dim)"
              strokeWidth="1"
            />
          ))}
        </svg>

        <div className={`container ${styles.heroInner}`}>
          <p className="eyebrow">A creative sports house</p>
          <h1 className="display display--xl">
            THREE MINDS.
            <br />
            ONE INSTINCT.
          </h1>
          <p className="lede">{site.positioning}</p>

          <div className={styles.heroActions}>
            <ShowreelPlayer
              videoUrl=""
              posterUrl={showreelPoster}
              title={site.name}
              triggerLabel="Play the showreel"
            />
            <Link
              href="/films"
              className={`btn btn--ghost ${styles.heroSecondary}`}
            >
              View our films →
            </Link>
          </div>
        </div>
      </section>

      <section className={`section ${styles.statement}`}>
        <div className="container">
          <Reveal>
            <p className={`display display--lg ${styles.statementText}`}>
              ATHLETES ARE MORE THAN PERFORMANCE. WE FILM THE INSTINCT BEHIND
              THE ATHLETE.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="films-heading">
        <div className="container">
          <div className={styles.filmsHeader}>
            <div>
              <p className="eyebrow">Selected films</p>
              <h2 id="films-heading" className="display display--md">
                The work
              </h2>
            </div>
            <Link href="/films" className="btn btn--ghost">
              All films →
            </Link>
          </div>

          <div className={styles.featuredGrid}>
            {featuredFilms.map((film) => (
              <FilmCard key={film.id} film={film} featured />
            ))}
          </div>

          <div className={styles.secondaryGrid}>
            {secondaryFilms.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="team-heading">
        <div className="container">
          <p className="eyebrow">Three minds. One instinct.</p>
          <h2 id="team-heading" className={`display display--md ${styles.teamIntro}`}>
            A founding team built from sport, image and translation.
          </h2>

          <div className={styles.teamGrid}>
            {founders.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          <ResidentStrip member={resident} />
        </div>
      </section>

      <section className="section" aria-labelledby="method-heading">
        <div className="container">
          <p className="eyebrow">{processTitle}</p>
          <h2 id="method-heading" className={`display display--md ${styles.methodHeader}`}>
            {processStatement}
          </h2>

          <ProcessStepGrid steps={processSteps} />

          <div className={styles.methodVisual}>
            <svg viewBox="0 0 400 300" role="img" aria-label="Storyboard sketch placeholder">
              <rect width="400" height="300" fill="var(--is-charcoal-2)" />
              <g stroke="var(--is-steel-dim)" strokeWidth="1" fill="none">
                <rect x="24" y="24" width="160" height="100" />
                <rect x="216" y="24" width="160" height="100" />
                <rect x="24" y="150" width="160" height="100" />
                <rect x="216" y="150" width="160" height="100" />
              </g>
              <g stroke="var(--is-orange)" strokeWidth="2">
                <line x1="60" y1="60" x2="140" y2="90" />
                <line x1="252" y1="90" x2="340" y2="60" />
              </g>
            </svg>
            <p className={styles.methodVisualCaption}>
              Storyboards, notes and camera plans placeholder — real research
              boards will replace this frame as projects are documented.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <div className={styles.servicesHeader}>
            <p className="eyebrow">{servicesTitle}</p>
            <h2 id="services-heading" className="display display--md">
              {servicesSubtitle}
            </h2>
          </div>

          <ul className={styles.servicesList}>
            {services.map((serviceItem) => (
              <li key={serviceItem} className={styles.serviceItem}>
                {serviceItem}
              </li>
            ))}
          </ul>
        </div>
      </section>

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

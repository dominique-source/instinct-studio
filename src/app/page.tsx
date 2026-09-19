import Link from "next/link";
import styles from "./page.module.css";
import { Hero } from "@/components/Hero";
import { FilmCard } from "@/components/FilmCard";
import { TeamMemberCard, ResidentStrip } from "@/components/TeamMemberCard";
import { ProcessStepGrid } from "@/components/ProcessStep";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";
import { featuredFilms, secondaryFilms } from "@/data/films";
import { founders, resident } from "@/data/team";
import { processTitle, processStatement, processSteps } from "@/data/process";
import { servicesTitle, servicesSubtitle, services } from "@/data/services";

export default function HomePage() {
  return (
    <>
      <Hero />

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

          {featuredFilms.length > 0 && (
            <div className={styles.featuredGrid}>
              {featuredFilms.map((film) => (
                <FilmCard key={film.id} film={film} featured />
              ))}
            </div>
          )}

          {secondaryFilms.length > 0 && (
            <div className={styles.secondaryGrid}>
              {secondaryFilms.map((film) => (
                <FilmCard key={film.id} film={film} />
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

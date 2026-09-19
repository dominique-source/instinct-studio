import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.mediaWrap}>
        <Image
          src="/assets/hero/instinct-studio-hero.png"
          alt="An athlete sits between takes on a film set, a mountain backdrop projected behind him and storyboard sketches pinned nearby."
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <h1 className={`display display--xl ${styles.headline} ${styles.enter}`}>
          WE FILM THE <span className={styles.highlight}>INSTINCT</span>
          <br />
          BEHIND THE ATHLETE.
        </h1>
        <p
          className={`${styles.supporting} ${styles.enter}`}
          style={{ animationDelay: "120ms" }}
        >
          Cinematic stories built around athletes.
        </p>
        <div className={`${styles.actions} ${styles.enter}`} style={{ animationDelay: "220ms" }}>
          <Link href="/films" className="btn btn--primary">
            View films
          </Link>
          <Link href="/studio" className="btn">
            Meet the studio
          </Link>
        </div>
      </div>
    </section>
  );
}

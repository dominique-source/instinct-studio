import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";
import { heroManifesto } from "@/data/site";

export function Hero() {
  return (
    <>
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
          <h1 className={`display ${styles.headline} ${styles.enter}`}>
            TELLING THE STORIES BEHIND ATHLETES &amp; SPORTS.
            <br />
            THE <span className={styles.highlight}>INSTINCT</span> THAT DRIVES THEM, DRIVES US.
          </h1>
        </div>
      </section>

      <section className={styles.manifesto} aria-label="Instinct Studio manifesto">
        <div className={`container ${styles.manifestoInner}`}>
          {heroManifesto.map((block, i) => (
            <p key={i} className={styles.manifestoParagraph}>
              {Array.isArray(block)
                ? block.map((line, j) => (
                    <Fragment key={j}>
                      {line}
                      {j < block.length - 1 && <br />}
                    </Fragment>
                  ))
                : block}
            </p>
          ))}

          <div className={styles.actions}>
            <Link href="/films" className="btn btn--primary">
              View films
            </Link>
            <Link href="/studio" className="btn">
              Meet the studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

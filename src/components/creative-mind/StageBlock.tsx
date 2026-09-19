"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./StageBlock.module.css";
import { useInView } from "@/lib/useInView";
import type { CreativeMindStage } from "@/data/creative-mind";

function rotateStyle(rotate?: number): CSSProperties | undefined {
  return rotate ? ({ "--rotate": `${rotate}deg` } as CSSProperties) : undefined;
}

export function StageBlock({
  stage,
  direction,
}: {
  stage: CreativeMindStage;
  direction: "left" | "right";
}) {
  const { ref, inView } = useInView<HTMLElement>(0.15);

  return (
    <article
      ref={ref}
      id={stage.id}
      data-stage={stage.id}
      className={[styles.stage, styles[`from-${direction}`], inView ? styles.isVisible : ""]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={`${stage.id}-title`}
    >
      <div className={styles.header}>
        <span className={styles.number} aria-hidden="true">
          {stage.number}
        </span>
        <h3 id={`${stage.id}-title`} className={styles.title}>
          {stage.title}
        </h3>
        <p className={styles.description}>{stage.description}</p>
      </div>

      <div className={styles.visuals}>
        <figure className={`${styles.visualWrap} ${styles.mainVisual}`}>
          <Image
            src={stage.mainVisual.src}
            width={stage.mainVisual.width}
            height={stage.mainVisual.height}
            alt={stage.mainVisual.alt}
            className={styles.visualImage}
            sizes="(min-width: 1024px) 26vw, (min-width: 768px) 34vw, 68vw"
          />
          <span className={styles.hoverLabel} aria-hidden="true">
            {stage.title}
          </span>
        </figure>

        <figure
          className={`${styles.visualWrap} ${styles.secondaryVisual}`}
          style={rotateStyle(stage.secondaryVisual.rotate)}
        >
          <Image
            src={stage.secondaryVisual.src}
            width={stage.secondaryVisual.width}
            height={stage.secondaryVisual.height}
            alt={stage.secondaryVisual.alt}
            className={styles.visualImage}
            sizes="(min-width: 1024px) 18vw, (min-width: 768px) 24vw, 48vw"
          />
          <span className={styles.hoverLabel} aria-hidden="true">
            {stage.title}
          </span>
        </figure>

        {stage.extraVisuals.map((extra) => (
          <figure
            key={extra.src}
            className={[
              styles.visualWrap,
              styles.extraVisual,
              extra.minBreakpoint === "desktop" ? styles.minDesktop : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={rotateStyle(extra.rotate)}
          >
            <Image
              src={extra.src}
              width={extra.width}
              height={extra.height}
              alt={extra.alt}
              className={styles.visualImage}
              sizes="(min-width: 1024px) 14vw, 32vw"
            />
          </figure>
        ))}

        {stage.notes.map((note) => (
          <div
            key={note.src}
            className={[styles.note, note.minBreakpoint === "desktop" ? styles.minDesktop : ""]
              .filter(Boolean)
              .join(" ")}
            style={rotateStyle(note.rotate)}
            aria-hidden="true"
          >
            <Image
              src={note.src}
              width={note.width}
              height={note.height}
              alt=""
              aria-hidden="true"
              className={styles.noteImage}
              sizes="(min-width: 1024px) 12vw, 30vw"
            />
          </div>
        ))}
      </div>

      <p className="sr-only">{stage.notesSummary}</p>
    </article>
  );
}

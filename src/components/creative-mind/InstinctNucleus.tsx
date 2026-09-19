"use client";

import styles from "./InstinctNucleus.module.css";
import { useInView } from "@/lib/useInView";
import { instinctWord, instinctSupportingLine } from "@/data/creative-mind";

export function InstinctNucleus() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  return (
    <div
      ref={ref}
      className={`${styles.nucleus} ${inView ? styles.isVisible : ""}`}
    >
      <div className={styles.glow} aria-hidden="true" />
      <p className={styles.word}>{instinctWord}</p>
      <p className={styles.supporting}>{instinctSupportingLine}</p>
    </div>
  );
}

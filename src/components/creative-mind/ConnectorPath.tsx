"use client";

import { useEffect, useState } from "react";
import styles from "./ConnectorPath.module.css";

/**
 * Electric-blue path linking the four stages. Desktop draws each segment
 * progressively as the visitor scrolls to the next stage; mobile/tablet get
 * a simpler always-visible line (see integration-notes.md: the connector
 * only needs to stay visible through the mobile sequence, not redraw).
 */
export function ConnectorPath() {
  const [drawn, setDrawn] = useState({ toSignal: false, toVisualLanguage: false, toCulturalImpact: false });

  useEffect(() => {
    const targets: [string, keyof typeof drawn][] = [
      ["signal", "toSignal"],
      ["visual-language", "toVisualLanguage"],
      ["cultural-impact", "toCulturalImpact"],
    ];

    const observers = targets.map(([id, key]) => {
      const node = document.getElementById(id);
      if (!node) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setDrawn((prev) => ({ ...prev, [key]: true }));
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(node);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      <svg
        className={styles.desktopPath}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className={`${styles.segment} ${drawn.toSignal ? styles.isDrawn : ""}`}
          pathLength={1}
          d="M17,50 Q35,16 54,12"
        />
        <path
          className={`${styles.segment} ${drawn.toVisualLanguage ? styles.isDrawn : ""}`}
          pathLength={1}
          d="M54,12 Q72,50 54,88"
        />
        <path
          className={`${styles.segment} ${drawn.toCulturalImpact ? styles.isDrawn : ""}`}
          pathLength={1}
          d="M54,88 Q74,80 88,50"
        />
      </svg>
      <div className={styles.mobileLine} aria-hidden="true" />
    </>
  );
}

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
        {/* Straight segments read as one unbroken path at any aspect ratio —
            a gentle quadratic curve here goes tangent-flat near its
            endpoints once the viewBox is stretched non-uniformly
            (preserveAspectRatio="none"), which made the line look like
            disconnected fragments instead of one continuous progression. */}

        {/* Human Truth -> Signal, both near the top of the wall. */}
        <path
          className={`${styles.segment} ${drawn.toSignal ? styles.isDrawn : ""}`}
          pathLength={1}
          d="M14,8 L50.5,8"
        />
        {/* Signal -> past the INSTINCT nucleus (renders behind it, so the
            line never crosses visibly over the word) -> Visual Language,
            directly below in the same center column. */}
        <path
          className={`${styles.segment} ${drawn.toVisualLanguage ? styles.isDrawn : ""}`}
          pathLength={1}
          d="M50.5,8 L54,74 L49,88"
        />
        {/* Visual Language gestures onward toward Cultural Impact — a short,
            restrained line rather than a long diagonal across the wall. */}
        <path
          className={`${styles.segment} ${drawn.toCulturalImpact ? styles.isDrawn : ""}`}
          pathLength={1}
          d="M49,88 L74,58"
        />
      </svg>
      <div className={styles.mobileLine} aria-hidden="true" />
    </>
  );
}

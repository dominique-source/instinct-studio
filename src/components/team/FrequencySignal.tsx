"use client";

import styles from "./FrequencySignal.module.css";
import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { ActiveMemberId } from "./FourMindsSection";

// viewBox is 0 0 160 90, matching the desktop collage's fixed 16:9 aspect
// ratio exactly — no preserveAspectRatio stretching, so the stroke and its
// joints render true instead of the non-uniform-scale artifacts a "none"
// viewBox mapping produces. Three stops now: Dominique -> Art Directors ->
// Neil (Youri's leg of the path is removed with him — see four-minds.ts).
// Points sampled from each slot's actual rendered position in
// FourMindsSection's three-slot desktop layout (left/centre/right).
const PATH_D = "M17.9,57.3 L68.2,50.3 L135.7,47.4";

// Real geometric length of PATH_D in user units (sum of its two segments).
// Two pitfalls made this render as scattered dashes instead of one line:
// `pathLength`-based dasharray normalization doesn't reliably apply when
// stroke-dasharray is set via CSS/inline style rather than an SVG
// presentation attribute; and React appends "px" to bare numeric style
// values, which (since the viewBox is scaled ~7x relative to its rendered
// size) resolves to a dash only a fraction of the path's real length,
// repeating several times. Passing the *string* "118.35" (interpolated
// below) keeps it unitless — real SVG user units, matching getTotalLength().
const PATH_LENGTH = 118.35;

const OFFSET_BY_ID: Record<ActiveMemberId, string> = {
  "dominique-soucy": "0%",
  "art-directors": "50%",
  "neil-frisby": "100%",
};

const PULSE_CLASS_BY_ID: Record<ActiveMemberId, string> = {
  "dominique-soucy": "roughen",
  "art-directors": "aperture",
  "neil-frisby": "",
};

export function FrequencySignal({
  activeId,
  flashCompletion,
  gravityRef,
}: {
  activeId: ActiveMemberId | null;
  flashCompletion: boolean;
  gravityRef?: (node: SVGSVGElement | null) => void;
}) {
  const { ref, inView } = useInView<SVGSVGElement>(0.15);
  const reduced = usePrefersReducedMotion();
  const drawn = inView || reduced;

  const setRefs = (node: SVGSVGElement | null) => {
    ref.current = node;
    gravityRef?.(node);
  };

  return (
    <>
      <svg ref={setRefs} className={styles.svg} viewBox="0 0 160 90" aria-hidden="true">
        <filter id="frequency-roughen">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" />
        </filter>

        <path
          className={`${styles.path} ${flashCompletion ? styles.completing : ""}`}
          style={{
            strokeDasharray: `${PATH_LENGTH}`,
            strokeDashoffset: `${drawn ? 0 : PATH_LENGTH}`,
          }}
          d={PATH_D}
        />

        {activeId === "neil-frisby" && (
          <path
            className={styles.path}
            d="M122.9,47.4 L126.1,43.8 L129.3,51 L132.5,42 L135.7,52.8 L138.9,45.6 L142.1,47.4 L148.5,47.4"
            style={{ stroke: "var(--is-white)", strokeDasharray: "none", strokeDashoffset: 0, opacity: 0.9 }}
          />
        )}

        {activeId && (
          <circle
            className={[styles.pulse, styles.isActive, styles[PULSE_CLASS_BY_ID[activeId]] || ""]
              .filter(Boolean)
              .join(" ")}
            style={{ offsetDistance: OFFSET_BY_ID[activeId] }}
            r="1.4"
          />
        )}
      </svg>
      <div className={styles.mobileLine} aria-hidden="true" />
    </>
  );
}

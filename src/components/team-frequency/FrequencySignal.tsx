"use client";

import styles from "./FrequencySignal.module.css";
import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { TeamFrequencyMember } from "@/data/team-frequency";

// viewBox is 0 0 160 90, matching the desktop collage's fixed 16:9 aspect
// ratio exactly — no preserveAspectRatio stretching, so the stroke and its
// joints render true instead of the non-uniform-scale artifacts a "none"
// viewBox mapping produces.
const PATH_D = "M20.8,73.8 L73.6,14.4 L86.4,48.6 L137.6,21.6";

// Real geometric length of PATH_D in user units (sum of its three segments).
// Two pitfalls made this render as scattered dashes instead of one line:
// `pathLength`-based dasharray normalization doesn't reliably apply when
// stroke-dasharray is set via CSS/inline style rather than an SVG
// presentation attribute; and React appends "px" to bare numeric style
// values, which (since the viewBox is scaled ~7x relative to its rendered
// size) resolves to a dash only a fraction of the path's real length,
// repeating several times. Passing the *string* "173.9" (interpolated
// below) keeps it unitless — real SVG user units, matching getTotalLength().
const PATH_LENGTH = 173.9;

const OFFSET_BY_ID: Record<TeamFrequencyMember["id"], string> = {
  dominique: "0%",
  stefan: "35%",
  neil: "62%",
  youri: "100%",
};

const PULSE_CLASS_BY_ID: Record<TeamFrequencyMember["id"], string> = {
  dominique: "roughen",
  stefan: "aperture",
  neil: "",
  youri: "split",
};

export function FrequencySignal({
  activeId,
  flashCompletion,
  gravityRef,
}: {
  activeId: TeamFrequencyMember["id"] | null;
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

        {activeId === "neil" && (
          <path
            className={styles.path}
            d="M73.6,48.6 L76.8,45 L80,52.2 L83.2,43.2 L86.4,54 L89.6,46.8 L92.8,48.6 L99.2,48.6"
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

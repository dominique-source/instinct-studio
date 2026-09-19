"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./FrequencyLens.module.css";
import { prefersReducedMotion } from "@/lib/motion";
import { teamFrequencyMembers } from "@/data/team-frequency";
import sectionStyles from "./TeamFrequencySection.module.css";

/**
 * The pointer-controlled "process" layer: grayscale, high-contrast portrait
 * clones (same <img> src as the real ones, so no extra network request)
 * plus a few construction-line marks, revealed only inside a soft circular
 * mask that follows the pointer. Desktop/laptop only (>=900px); disabled
 * under prefers-reduced-motion.
 */
export function FrequencyLens({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer || prefersReducedMotion()) return;
    if (!window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;

    const setRadius = () => {
      const w = window.innerWidth;
      const radius = w >= 1440 ? 190 : w >= 1200 ? 165 : 130;
      layer.style.setProperty("--lens-radius", `${radius}px`);
    };
    setRadius();

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          layer.style.setProperty("--lens-x", `${x}px`);
          layer.style.setProperty("--lens-y", `${y}px`);
          layer.classList.add(styles.isActive);
        });
      }
    };

    const onLeave = () => {
      layer.classList.remove(styles.isActive);
    };

    window.addEventListener("resize", setRadius);
    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      window.removeEventListener("resize", setRadius);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionRef]);

  return (
    <div ref={layerRef} className={styles.processLayer} aria-hidden="true">
      {teamFrequencyMembers.map((member) => (
        <div key={member.id} data-member={member.id} className={sectionStyles.memberSlot}>
          <Image
            src={member.portraitSrc}
            width={member.portraitWidth}
            height={member.portraitHeight}
            alt=""
            aria-hidden="true"
            className={styles.portrait}
            sizes="20vw"
          />
        </div>
      ))}
      <svg className={styles.guides} viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="8" y="8" width="6" height="6" />
        <rect x="86" y="8" width="6" height="6" />
        <rect x="8" y="86" width="6" height="6" />
        <rect x="86" y="86" width="6" height="6" />
        <line x1="0" y1="50" x2="100" y2="50" strokeDasharray="0.6 1.2" />
        <line x1="50" y1="0" x2="50" y2="100" strokeDasharray="0.6 1.2" />
      </svg>
    </div>
  );
}

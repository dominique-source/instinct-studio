"use client";

import Image from "next/image";
import styles from "./TeamMember.module.css";
import sectionStyles from "./FourMindsSection.module.css";
import { useInView } from "@/lib/useInView";
import type { FourMindsCollective } from "@/data/four-minds";

/**
 * The third "mind" in the homepage collage — deliberately not a person.
 * Same interaction/gravity wiring as TeamMember (hover/focus reveals a
 * prompt, the portrait area feeds the pointer-field), but instead of a
 * single portrait it shows a dense contact sheet of cinematic frames —
 * several distinct visual voices at a glance, standing in for the roster
 * of art directors who join a project according to its story. Every frame
 * is decorative texture (see four-minds.ts) — never a credited or named
 * individual's portrait or portfolio.
 */
export function CollaboratorsMind({
  collective,
  isActive,
  onActivate,
  onDeactivate,
  gravityRef,
}: {
  collective: FourMindsCollective;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  gravityRef?: React.Ref<HTMLDivElement>;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      data-member="art-directors"
      className={[sectionStyles.memberSlot, styles.member, inView ? styles.isVisible : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className={styles.portraitButton}
        aria-pressed={isActive}
        aria-label={`${collective.title} — ${collective.eyebrow}. ${collective.body}`}
        onPointerEnter={onActivate}
        onPointerLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onClick={onActivate}
      >
        <div
          ref={gravityRef}
          className={`${styles.portraitWrap} ${styles.contactSheet}`}
          aria-hidden="true"
        >
          {collective.contactSheet.map((src, i) => (
            <div key={src} className={styles.contactFrame}>
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 14vw, 30vw"
                className={styles.contactImage}
              />
              <span className={styles.contactIndex}>{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </button>

      <div className={styles.info}>
        <p className={`${styles.archetype} ${isActive ? styles.emphasized : ""}`}>{collective.eyebrow}</p>
        <h3 className={styles.name}>{collective.title}</h3>
        <p className={styles.description}>{collective.body}</p>
        <p className={`${styles.prompt} ${isActive ? styles.promptVisible : ""}`} aria-hidden={!isActive}>
          {collective.activationPrompt}
        </p>
      </div>
    </div>
  );
}

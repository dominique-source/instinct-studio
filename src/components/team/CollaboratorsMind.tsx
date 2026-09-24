"use client";

import styles from "./TeamMember.module.css";
import sectionStyles from "./FourMindsSection.module.css";
import { useInView } from "@/lib/useInView";
import type { FourMindsCollective } from "@/data/four-minds";

/**
 * The third "mind" in the homepage collage — deliberately not a person.
 * Same interaction/gravity wiring as TeamMember (hover/focus reveals a
 * prompt, the portrait area feeds the pointer-field), but the portrait
 * slot renders a typographic mark instead of a photo, since there is no
 * individual to depict — see four-minds.ts's file-level comment.
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
        <div ref={gravityRef} className={`${styles.portraitWrap} ${styles.collectiveMark}`}>
          <span className={styles.collectiveGrain} aria-hidden="true" />
          <span className={`${styles.collectiveBracket} ${styles["collectiveBracket--tl"]}`} aria-hidden="true" />
          <span className={`${styles.collectiveBracket} ${styles["collectiveBracket--tr"]}`} aria-hidden="true" />
          <span className={`${styles.collectiveBracket} ${styles["collectiveBracket--bl"]}`} aria-hidden="true" />
          <span className={`${styles.collectiveBracket} ${styles["collectiveBracket--br"]}`} aria-hidden="true" />
          <p className={styles.collectiveWordmark} aria-hidden="true">
            ART
            <span>DIRECTORS</span>
          </p>
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

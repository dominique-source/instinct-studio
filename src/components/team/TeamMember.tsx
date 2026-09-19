"use client";

import Image from "next/image";
import styles from "./TeamMember.module.css";
import sectionStyles from "./FourMindsSection.module.css";
import { CreativeFragment } from "./CreativeFragment";
import { useInView } from "@/lib/useInView";
import type { FourMindsVisuals } from "@/data/four-minds";
import type { TeamMember as TeamMemberData } from "@/data/team";

export type FourMindsMember = TeamMemberData & FourMindsVisuals;

export function TeamMember({
  member,
  isActive,
  onActivate,
  onDeactivate,
  gravityRef,
  filmGravityRef,
  noteGravityRef,
}: {
  member: FourMindsMember;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  gravityRef?: React.Ref<HTMLDivElement>;
  filmGravityRef?: (node: HTMLDivElement | null) => void;
  noteGravityRef?: (node: HTMLDivElement | null) => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      data-member={member.id}
      className={[sectionStyles.memberSlot, styles.member, inView ? styles.isVisible : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className={styles.portraitButton}
        aria-pressed={isActive}
        aria-label={`${member.name} — ${member.title}. ${member.shortText}`}
        onPointerEnter={onActivate}
        onPointerLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onClick={onActivate}
      >
        <div ref={gravityRef} className={styles.portraitWrap}>
          <Image
            src={member.portraitSrc}
            width={member.portraitWidth}
            height={member.portraitHeight}
            alt={`Portrait of ${member.name}`}
            className={styles.portraitImage}
            sizes="(min-width: 1024px) 24vw, (min-width: 768px) 34vw, 60vw"
          />
        </div>
      </button>

      <div className={styles.info}>
        <p className={`${styles.archetype} ${isActive ? styles.emphasized : ""}`}>{member.title}</p>
        <h3 className={styles.name}>{member.name}</h3>
        <p className={styles.description}>{member.shortText}</p>
        <p className={`${styles.prompt} ${isActive ? styles.promptVisible : ""}`} aria-hidden={!isActive}>
          {member.activationPrompt}
        </p>
      </div>

      <CreativeFragment asset={member.film} gravityRef={filmGravityRef} className={styles.filmSlot} />
      {member.extraFilm && (
        <CreativeFragment
          asset={member.extraFilm}
          className={`${styles.extraFilmSlot} ${sectionStyles.extraPeripheral}`}
        />
      )}
      <CreativeFragment
        asset={member.note}
        gravityRef={noteGravityRef}
        className={`${styles.noteSlot} ${isActive ? styles.noteNear : ""}`}
      />
      {member.extraNote && (
        <CreativeFragment
          asset={member.extraNote}
          className={`${styles.extraNoteSlot} ${sectionStyles.extraPeripheral}`}
        />
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./TeamFrequencySection.module.css";
import { TeamMember } from "./TeamMember";
import { FrequencySignal } from "./FrequencySignal";
import { FrequencyLens } from "./FrequencyLens";
import { useInView } from "@/lib/useInView";
import { usePointerField } from "@/lib/usePointerField";
import {
  teamEyebrow,
  teamHeadlineLine1,
  teamHeadlineLine2,
  teamSupportingStatement,
  teamCompletionLine,
  teamFrequencyMembers,
  teamSignatureNotes,
  type TeamFrequencyMember,
} from "@/data/team-frequency";

export function TeamFrequencySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: introRef, inView: introVisible } = useInView<HTMLDivElement>(0.3);

  const [activeId, setActiveId] = useState<TeamFrequencyMember["id"] | null>(null);
  const activatedRef = useRef<Set<string>>(new Set());
  const [completed, setCompleted] = useState(false);
  const [flashCompletion, setFlashCompletion] = useState(false);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const registerGravity = usePointerField(sectionRef, 900);

  const activate = useCallback(
    (id: TeamFrequencyMember["id"]) => {
      setActiveId(id);
      if (completed) return;
      activatedRef.current.add(id);
      if (activatedRef.current.size === teamFrequencyMembers.length) {
        setCompleted(true);
        setFlashCompletion(true);
        flashTimeout.current = setTimeout(() => setFlashCompletion(false), 1000);
      }
    },
    [completed]
  );

  const deactivate = useCallback(() => setActiveId(null), []);

  // Stable per-member ref callbacks: registerGravity itself never changes
  // identity, so this only recomputes if the member list changes — not on
  // every activation-driven re-render (which would otherwise churn
  // register/cleanup on the pointer field for no reason).
  const gravityRefs = useMemo(() => {
    const entries = {} as Record<
      TeamFrequencyMember["id"],
      {
        portrait: (node: HTMLDivElement | null) => void;
        film: (node: HTMLDivElement | null) => void;
        note: (node: HTMLDivElement | null) => void;
      }
    >;
    for (const member of teamFrequencyMembers) {
      entries[member.id] = {
        portrait: (node) => registerGravity(node, 3),
        film: (node) => registerGravity(node, 6),
        note: (node) => registerGravity(node, 4, 2),
      };
    }
    return entries;
  }, [registerGravity]);

  const signalGravityRef = useMemo(
    () => (node: SVGSVGElement | null) => registerGravity(node, 5),
    [registerGravity]
  );

  useEffect(() => {
    return () => {
      if (flashTimeout.current) clearTimeout(flashTimeout.current);
    };
  }, []);

  const topSignature = teamSignatureNotes.filter((n) => n.position === "top-left");
  const centerSignature = teamSignatureNotes.find((n) => n.position === "center");
  const bottomLeft = teamSignatureNotes.find((n) => n.position === "bottom-left");
  const bottomRight = teamSignatureNotes.find((n) => n.position === "bottom-right");

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="team-frequency-heading"
    >
      <div className="container">
        <div ref={introRef} className={`${styles.intro} ${introVisible ? styles.isVisible : ""}`}>
          <p className="eyebrow">{teamEyebrow}</p>
          <h2 id="team-frequency-heading" className={`display ${styles.headline}`}>
            <span className={styles.line1}>{teamHeadlineLine1}</span>
            <span className={`${styles.line2} ${flashCompletion ? styles.flash : ""}`}>
              {teamHeadlineLine2}
            </span>
          </h2>
          <p className={styles.supportingLine}>{teamSupportingStatement}</p>
          <p className={`${styles.completionLine} ${completed ? styles.revealed : ""}`} aria-live="polite">
            {completed ? teamCompletionLine : ""}
          </p>
        </div>

        <div className={styles.signatureTopLeft}>
          {topSignature.map((s) => (
            <Image
              key={s.asset.src}
              src={s.asset.src}
              width={s.asset.width}
              height={s.asset.height}
              alt=""
              aria-hidden="true"
              style={{ width: "100%", height: "auto", transform: `rotate(${s.asset.rotate ?? 0}deg)` }}
            />
          ))}
        </div>

        <div className={styles.collage} data-active={activeId ?? undefined}>
          <FrequencySignal
            activeId={activeId}
            flashCompletion={flashCompletion}
            gravityRef={signalGravityRef}
          />
          <FrequencyLens sectionRef={sectionRef} />

          {teamFrequencyMembers.map((member) => (
            <TeamMember
              key={member.id}
              member={member}
              isActive={activeId === member.id}
              onActivate={() => activate(member.id)}
              onDeactivate={deactivate}
              gravityRef={gravityRefs[member.id].portrait}
              filmGravityRef={gravityRefs[member.id].film}
              noteGravityRef={gravityRefs[member.id].note}
            />
          ))}

          {centerSignature && (
            <Image
              src={centerSignature.asset.src}
              width={centerSignature.asset.width}
              height={centerSignature.asset.height}
              alt=""
              aria-hidden="true"
              className={styles.signatureCenter}
            />
          )}
        </div>

        <div className={styles.signatureBottom}>
          {bottomLeft && (
            <div className={styles.signatureBottomItem}>
              <Image
                src={bottomLeft.asset.src}
                width={bottomLeft.asset.width}
                height={bottomLeft.asset.height}
                alt=""
                aria-hidden="true"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )}
          {bottomRight && (
            <div className={styles.signatureBottomItem}>
              <Image
                src={bottomRight.asset.src}
                width={bottomRight.asset.width}
                height={bottomRight.asset.height}
                alt=""
                aria-hidden="true"
                style={{ width: "100%", height: "auto", transform: `rotate(${bottomRight.asset.rotate ?? 0}deg)` }}
              />
            </div>
          )}
        </div>

        <p className="sr-only">
          Four minds, one frequency: Dominique Soucy, the instinct; Stefan Szary, the image; Neil
          Frisby, the signal; and Youri Hainz, the disruption — different perspectives working at
          one creative frequency.
        </p>
      </div>
    </section>
  );
}

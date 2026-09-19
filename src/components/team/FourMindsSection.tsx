"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./FourMindsSection.module.css";
import { TeamMember, type FourMindsMember } from "./TeamMember";
import { FrequencySignal } from "./FrequencySignal";
import { FrequencyLens } from "./FrequencyLens";
import { useInView } from "@/lib/useInView";
import { usePointerField } from "@/lib/usePointerField";
import { founders, resident } from "@/data/team";
import {
  fourMindsEyebrow,
  fourMindsHeadlineLine1,
  fourMindsHeadlineLine2,
  fourMindsSupportingStatement,
  fourMindsCompletionLine,
  fourMindsVisualsById,
  fourMindsSignatureNotes,
  type FourMindsMemberId,
} from "@/data/four-minds";

// Dominique + Stefan + Neil (the founders) and Youri (the resident) belong
// to one composition — see the maquette: Youri is never a separate strip
// underneath the other three.
const fourMindsMembers: FourMindsMember[] = [...founders, resident].map((member) => ({
  ...member,
  ...fourMindsVisualsById[member.id as FourMindsMemberId],
}));

export function FourMindsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: introRef, inView: introVisible } = useInView<HTMLDivElement>(0.3);

  const [activeId, setActiveId] = useState<FourMindsMemberId | null>(null);
  const activatedRef = useRef<Set<string>>(new Set());
  const [completed, setCompleted] = useState(false);
  const [flashCompletion, setFlashCompletion] = useState(false);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const registerGravity = usePointerField(sectionRef, 900);

  const activate = useCallback(
    (id: FourMindsMemberId) => {
      setActiveId(id);
      if (completed) return;
      activatedRef.current.add(id);
      if (activatedRef.current.size === fourMindsMembers.length) {
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
      FourMindsMemberId,
      {
        portrait: (node: HTMLDivElement | null) => void;
        film: (node: HTMLDivElement | null) => void;
        note: (node: HTMLDivElement | null) => void;
      }
    >;
    for (const member of fourMindsMembers) {
      entries[member.id as FourMindsMemberId] = {
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

  const topSignature = fourMindsSignatureNotes.filter((n) => n.position === "top-left");
  const centerSignature = fourMindsSignatureNotes.find((n) => n.position === "center");
  const bottomLeft = fourMindsSignatureNotes.find((n) => n.position === "bottom-left");
  const bottomRight = fourMindsSignatureNotes.find((n) => n.position === "bottom-right");

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="four-minds-heading"
    >
      <div className="container">
        <div ref={introRef} className={`${styles.intro} ${introVisible ? styles.isVisible : ""}`}>
          <p className="eyebrow">{fourMindsEyebrow}</p>
          <h2 id="four-minds-heading" className={`display ${styles.headline}`}>
            <span className={styles.line1}>{fourMindsHeadlineLine1}</span>
            <span className={`${styles.line2} ${flashCompletion ? styles.flash : ""}`}>
              {fourMindsHeadlineLine2}
            </span>
          </h2>
          <p className={styles.supportingLine}>{fourMindsSupportingStatement}</p>
          <p className={`${styles.completionLine} ${completed ? styles.revealed : ""}`} aria-live="polite">
            {completed ? fourMindsCompletionLine : ""}
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
          <FrequencyLens sectionRef={sectionRef} members={fourMindsMembers} />

          {fourMindsMembers.map((member) => (
            <TeamMember
              key={member.id}
              member={member}
              isActive={activeId === member.id}
              onActivate={() => activate(member.id as FourMindsMemberId)}
              onDeactivate={deactivate}
              gravityRef={gravityRefs[member.id as FourMindsMemberId].portrait}
              filmGravityRef={gravityRefs[member.id as FourMindsMemberId].film}
              noteGravityRef={gravityRefs[member.id as FourMindsMemberId].note}
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
          Four minds, one frequency: {fourMindsMembers.map((m) => `${m.name}, ${m.title}`).join("; ")} —
          different perspectives working at one creative frequency.
        </p>
      </div>
    </section>
  );
}

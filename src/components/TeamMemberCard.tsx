import Image from "next/image";
import styles from "./TeamMemberCard.module.css";
import type { TeamMember } from "@/data/team";

export function TeamMemberCard({
  member,
  showLongText = false,
}: {
  member: TeamMember;
  showLongText?: boolean;
}) {
  const portraitSrc = `/assets/team/${member.portraitSlug}-placeholder.svg`;

  return (
    <article className={styles.card}>
      <div className={styles.portraitWrap}>
        <Image
          src={portraitSrc}
          alt={`Portrait of ${member.name}`}
          className={styles.portrait}
          width={900}
          height={1125}
          loading="lazy"
          unoptimized
        />
      </div>
      <div>
        <h3 className={styles.name}>{member.name}</h3>
        <p className={styles.title}>{member.title}</p>
        <p className={styles.short}>{member.shortText}</p>
        {showLongText && <p className={styles.long}>{member.longText}</p>}
        {showLongText && member.quote.length > 0 && (
          <blockquote className={styles.quote}>
            {member.quote.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </blockquote>
        )}
      </div>
    </article>
  );
}

export function ResidentStrip({ member }: { member: TeamMember }) {
  const portraitSrc = `/assets/team/${member.portraitSlug}-placeholder.svg`;

  return (
    <div className={styles.resident}>
      <div className={styles.residentPortraitWrap}>
        <Image
          src={portraitSrc}
          alt={`Portrait of ${member.name}`}
          className={styles.portrait}
          width={900}
          height={1125}
          loading="lazy"
          unoptimized
        />
      </div>
      <div>
        <p className="eyebrow">Art Director in Residence</p>
        <h3 className={styles.name} style={{ marginTop: 8 }}>
          {member.name}
        </h3>
        <p className={styles.short}>{member.shortText}</p>
      </div>
    </div>
  );
}

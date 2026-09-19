import Image from "next/image";
import styles from "./TeamMemberCard.module.css";
import type { TeamMember } from "@/data/team";
import { publicFileExists } from "@/lib/media";

export function TeamMemberCard({
  member,
  showLongText = false,
}: {
  member: TeamMember;
  showLongText?: boolean;
}) {
  const hasPortrait = publicFileExists(member.portraitSrc);

  return (
    <article className={styles.card}>
      {hasPortrait && (
        <div className={styles.portraitWrap}>
          <Image
            src={member.portraitSrc}
            alt={`Portrait of ${member.name}`}
            className={styles.portrait}
            width={900}
            height={900}
            loading="lazy"
          />
        </div>
      )}
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
  const hasPortrait = publicFileExists(member.portraitSrc);

  return (
    <div className={styles.resident}>
      {hasPortrait && (
        <div className={styles.residentPortraitWrap}>
          <Image
            src={member.portraitSrc}
            alt={`Portrait of ${member.name}`}
            className={styles.portrait}
            width={900}
            height={900}
            loading="lazy"
          />
        </div>
      )}
      <div>
        <p className="eyebrow">Art Director in Residence</p>
        <h3 className={`${styles.name} ${styles.residentName}`}>{member.name}</h3>
        <p className={styles.short}>{member.shortText}</p>
      </div>
    </div>
  );
}

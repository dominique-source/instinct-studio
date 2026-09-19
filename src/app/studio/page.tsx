import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import { ResidentStrip } from "@/components/TeamMemberCard";
import { founders, resident } from "@/data/team";
import { site } from "@/data/site";
import { publicFileExists } from "@/lib/media";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Instinct Studio is a creative sports house founded by Dominique Soucy, Stefan Szary and Neil Frisby.",
};

export default function StudioPage() {
  return (
    <div className="section">
      <div className="container">
        <p className="eyebrow">Studio</p>
        <h1 className={`display display--lg ${styles.intro}`}>
          {site.signature}
        </h1>
        <p className={`lede ${styles.positioning}`}>{site.positioning}</p>

        <div className={styles.foundersList}>
          {founders.map((member) => {
            const hasPortrait = publicFileExists(member.portraitSrc);
            return (
              <article key={member.id} className={styles.founder}>
                {hasPortrait && (
                  <div className={styles.portraitWrap}>
                    <Image
                      src={member.portraitSrc}
                      alt={`Portrait of ${member.name}`}
                      width={900}
                      height={900}
                      loading="lazy"
                    />
                  </div>
                )}
                <div>
                  <h2 className="display display--md">{member.name}</h2>
                  <p className={`meta ${styles.founderTitle}`}>{member.title}</p>
                  <p className={`lede ${styles.founderBio}`}>{member.longText}</p>
                  {member.quote.length > 0 && (
                    <blockquote className={styles.founderQuote}>
                      {member.quote.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </blockquote>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.residency}>
          <ResidentStrip member={resident} />
        </div>

        <div className={styles.philosophy}>
          <h2 className="display display--md">How we see it</h2>
          <p className="lede">
            Instinct Studio treats sport as a creative language rather than a
            results sheet. Every project starts from the human tension inside
            an athlete, a team or a community, and moves toward a cinematic
            image built to carry that tension to an audience.
          </p>
          <p className="lede">
            That approach draws on sport, art, community and technology in
            equal measure — using film, live experience and emerging tools to
            bring people back to movement, presence and genuine human
            connection.
          </p>
          <p className="lede">
            {site.legalLine} The studio grew out of PürInstinct and Dominique
            Soucy&apos;s work rebuilding sport around play, connection and
            human development, and now creates for athletes, brands, teams
            and broadcasters beyond it.
          </p>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import styles from "./CreativeMindSection.module.css";
import { StageBlock } from "./StageBlock";
import { InstinctNucleus } from "./InstinctNucleus";
import { ConnectorPath } from "./ConnectorPath";
import {
  creativeMindEyebrow,
  creativeMindHeadline,
  creativeMindSecondaryLine,
  creativeMindStages,
  creativeMindSignature,
} from "@/data/creative-mind";

const directionByStage: Record<string, "left" | "right"> = {
  "human-truth": "left",
  signal: "right",
  "visual-language": "left",
  "cultural-impact": "right",
};

export function CreativeMindSection() {
  const topSignature = creativeMindSignature.find((s) => s.position === "top");
  const bottomLeft = creativeMindSignature.find((s) => s.position === "bottom-left");
  const bottomRight = creativeMindSignature.find((s) => s.position === "bottom-right");

  const humanTruth = creativeMindStages.find((s) => s.id === "human-truth")!;
  const signal = creativeMindStages.find((s) => s.id === "signal")!;
  const visualLanguage = creativeMindStages.find((s) => s.id === "visual-language")!;
  const culturalImpact = creativeMindStages.find((s) => s.id === "cultural-impact")!;

  return (
    <section className={`section ${styles.section}`} aria-labelledby="creative-mind-heading">
      <div className="container">
        <div className={styles.intro}>
          <p className="eyebrow">{creativeMindEyebrow}</p>
          <h2 id="creative-mind-heading" className={`display ${styles.headline}`}>
            {creativeMindHeadline}
          </h2>
          <p className={styles.secondaryLine}>{creativeMindSecondaryLine}</p>
        </div>

        {topSignature && (
          <Image
            src={topSignature.asset.src}
            width={topSignature.asset.width}
            height={topSignature.asset.height}
            alt=""
            aria-hidden="true"
            className={styles.signatureTop}
          />
        )}

        <div className={styles.collage}>
          <ConnectorPath />
          <StageBlock stage={humanTruth} direction={directionByStage[humanTruth.id]} />
          <div className={styles.center}>
            <StageBlock stage={signal} direction={directionByStage[signal.id]} />
            <InstinctNucleus />
            <StageBlock stage={visualLanguage} direction={directionByStage[visualLanguage.id]} />
          </div>
          <StageBlock stage={culturalImpact} direction={directionByStage[culturalImpact.id]} />
        </div>

        <div className={styles.signatureBottom}>
          {bottomLeft && (
            <Image
              src={bottomLeft.asset.src}
              width={bottomLeft.asset.width}
              height={bottomLeft.asset.height}
              alt=""
              aria-hidden="true"
            />
          )}
          {bottomRight && (
            <Image
              src={bottomRight.asset.src}
              width={bottomRight.asset.width}
              height={bottomRight.asset.height}
              alt=""
              aria-hidden="true"
            />
          )}
        </div>

        <p className="sr-only">
          The studio&rsquo;s creative process moves through four stages toward one instinct:
          human truth, signal, visual language and cultural impact — more than film, a higher
          frequency for human potential.
        </p>
      </div>
    </section>
  );
}

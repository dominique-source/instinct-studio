import type { Metadata } from "next";
import styles from "./page.module.css";
import { ProcessStepGrid } from "@/components/ProcessStep";
import {
  processTitle,
  processStatement,
  processSteps,
  purInstinctCaseStudy,
} from "@/data/process";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Instinct Studio moves from raw instinct to a cinematic signal: insight, signal, image, experience.",
};

export default function ProcessPage() {
  return (
    <div className="section">
      <div className="container">
        <p className="eyebrow">{processTitle}</p>
        <h1 className={`display display--lg ${styles.intro}`}>
          {processStatement}
        </h1>

        <div className={styles.stepGrid}>
          <ProcessStepGrid steps={processSteps} />
        </div>

        <div className={styles.caseStudy}>
          <div className={styles.caseStudyHeader}>
            <p className="eyebrow">Case study — illustrative</p>
            <h2 className="display display--md">From tension to PürInstinct</h2>
            <p className={`lede ${styles.caseStudyLede}`}>
              A placeholder walk-through of the method, using PürInstinct to
              show how a sporting tension becomes a sentence, a storyboard and
              finally a film.
            </p>
          </div>

          <ol className={styles.stages}>
            {purInstinctCaseStudy.map((stage, index) => (
              <li key={stage.step} className={styles.stage}>
                <span className={styles.stageStep} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className={styles.stageLabel}>{stage.label}</p>
                  <p className={styles.stageDetail}>{stage.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

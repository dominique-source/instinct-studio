import type { Metadata } from "next";
import styles from "./page.module.css";
import { ProcessStepGrid } from "@/components/ProcessStep";
import { processTitle, processStatement, processSteps } from "@/data/process";

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
      </div>
    </div>
  );
}

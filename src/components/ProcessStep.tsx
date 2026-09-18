import styles from "./ProcessStep.module.css";
import type { ProcessStep as ProcessStepType } from "@/data/process";

export function ProcessStepGrid({ steps }: { steps: ProcessStepType[] }) {
  return (
    <ol className={styles.grid}>
      {steps.map((step) => (
        <li key={step.number} className={styles.step}>
          <p className={styles.number} aria-hidden="true">
            {step.number}
          </p>
          <p className={styles.title}>{step.title}</p>
          <p className={styles.description}>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

"use client";

import { useActionState } from "react";
import styles from "./ContactForm.module.css";
import { submitInquiry, type InquiryState } from "@/app/collaborate/actions";
import { contactEmail } from "@/data/site";

const initialState: InquiryState = { status: "idle" };

const budgetRanges = [
  "Not sure yet",
  "Under $25k",
  "$25k – $75k",
  "$75k – $150k",
  "$150k+",
];

const timelines = [
  "Flexible / exploring",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialState
  );

  return (
    <div>
      <form action={formAction} className={styles.form} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required autoComplete="name" />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="organization">Organization</label>
            <input id="organization" name="organization" type="text" />
          </div>
          <div className={styles.field}>
            <label htmlFor="project">Athlete, team or project</label>
            <input id="project" name="project" type="text" />
          </div>
        </div>

        <div className={`${styles.field} ${styles.feelingField}`}>
          <label htmlFor="feeling">
            What are you trying to make people feel?
          </label>
          <textarea id="feeling" name="feeling" required />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="budget">Budget range</label>
            <select id="budget" name="budget" defaultValue={budgetRanges[0]}>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="timeline">Timeline</label>
            <select id="timeline" name="timeline" defaultValue={timelines[0]}>
              {timelines.map((timeline) => (
                <option key={timeline} value={timeline}>
                  {timeline}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="links">Reference links</label>
          <textarea id="links" name="links" rows={3} />
        </div>

        <button type="submit" className="btn btn--primary" disabled={isPending}>
          {isPending ? "Sending…" : "Send inquiry"}
        </button>

        <div aria-live="polite">
          {state.status === "success" && (
            <p className={`${styles.status} ${styles["status--success"]}`}>
              Thank you — we received your inquiry and will be in touch.
            </p>
          )}
          {state.status === "error" && (
            <p className={styles.status}>{state.message}</p>
          )}
          {state.status === "no-endpoint" && (
            <p className={styles.status}>
              Our automated intake isn&apos;t connected yet. Please email the
              details above directly to{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          )}
        </div>
      </form>

      <p className={styles.fallback}>
        Prefer email? Reach us directly at{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import styles from "./page.module.css";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Collaborate",
  description:
    "Bring Instinct Studio an athlete, a tension or an unfinished idea. We will find its instinct.",
};

export default function CollaboratePage() {
  return (
    <div className="section">
      <div className="container">
        <p className="eyebrow">Collaborate</p>
        <h1 className={`display display--lg ${styles.intro}`}>
          BRING US AN ATHLETE, A TENSION OR AN UNFINISHED IDEA. WE WILL FIND
          ITS INSTINCT.
        </h1>

        <div className={styles.layout}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

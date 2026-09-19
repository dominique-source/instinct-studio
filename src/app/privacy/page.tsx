import type { Metadata } from "next";
import { contactEmail } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Instinct Studio handles information submitted through this site.",
};

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container container--narrow">
        <p className="eyebrow">Privacy policy</p>
        <h1 className="display display--md" style={{ marginTop: 16 }}>
          Privacy policy
        </h1>

        <div style={{ marginTop: 32, display: "grid", gap: 16 }}>
          <p className="lede">
            Instinct Studio does not store sensitive data in this
            website&apos;s frontend. Information submitted through the
            Collaborate form is only sent onward once a dedicated intake
            endpoint is configured, and is otherwise never transmitted
            anywhere.
          </p>
          <p className="lede">
            For questions about how your information is handled, contact{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

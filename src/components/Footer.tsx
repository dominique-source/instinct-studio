import Link from "next/link";
import styles from "./Footer.module.css";
import { footerNav, site, socialLinks, privacyPolicyHref } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.wordmark}>{site.name}</p>
          <p className={styles.locations}>
            {site.locations.map((location) => (
              <span key={location}>{location}</span>
            ))}
          </p>
          <p className={styles.legal}>{site.legalLine}</p>
        </div>

        <nav aria-label="Footer">
          <p className={styles.heading}>Studio</p>
          <div className={styles.links}>
            {footerNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <p className={styles.heading}>Elsewhere</p>
          <div className={styles.links}>
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            )}
            {socialLinks.vimeo && (
              <a href={socialLinks.vimeo} target="_blank" rel="noreferrer">
                Vimeo
              </a>
            )}
            <Link href={privacyPolicyHref}>Privacy policy</Link>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          © {year} {site.name}
        </span>
        <span>{site.legalLine}</span>
      </div>
    </footer>
  );
}
